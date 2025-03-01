import { Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Search,
  ShoppingCart,
  Menu,
  LogIn,
  UserPlus,
  Home,
  Package,
  Grid,
  ChevronDown,
} from 'lucide-react';
import CartButton from '@/components/Cart.tsx';

// Layout component to handle the navbar and content spacing
export const Layout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow pt-16 md:pt-20'>{children}</main>
    </div>
  );
};

// Sample category data
const categories = [
  {
    name: 'Electronics',
    description: 'Gadgets, phones, computers and more',
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Accessories'],
  },
  {
    name: 'Home & Kitchen',
    description: 'Everything for your living space',
    subcategories: ['Furniture', 'Appliances', 'Decor', 'Cookware'],
  },
  {
    name: 'Fashion',
    description: 'Clothing, shoes, and accessories',
    subcategories: ["Men's", "Women's", 'Kids', 'Footwear'],
  },
  {
    name: 'Beauty & Health',
    description: 'Personal care and wellness products',
    subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fitness'],
  },
];

const Navbar = () => {
  const isRegistered = false;
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all py-3 duration-300 border-b bg-background ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link to='/' className='flex items-center'>
            <ShoppingCart className='h-5 w-5 mr-2 text-primary' />
            <span className='font-bold text-xl text-foreground'>MarketPlace</span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center'>
            <nav className='flex items-center space-x-8 h-10'>
              {/* Home Link */}
              <Link
                to='/'
                className='flex items-center text-base font-medium text-foreground hover:text-primary transition-colors'
              >
                Home
              </Link>

              {/* Products Link */}
              <Link
                to='/products'
                className='flex items-center text-base font-medium text-foreground hover:text-primary transition-colors'
              >
                Products
              </Link>

              {/* Categories Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className='flex items-center text-base font-medium text-foreground hover:text-primary transition-colors -ml-5'>
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className='grid grid-cols-2 gap-3 p-4 w-[500px]'>
                        {categories.map((category) => (
                          <div key={category.name} className='space-y-2'>
                            <Link
                              to={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
                              className='font-medium text-base hover:text-primary transition-colors block'
                            >
                              {category.name}
                            </Link>
                            <p className='text-xs text-muted-foreground'>{category.description}</p>
                            <div className='space-y-1'>
                              {category.subcategories.map((subcategory) => (
                                <Link
                                  key={subcategory}
                                  to={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}/${subcategory.toLowerCase().replace(/ /g, '-')}`}
                                  className='text-sm hover:text-primary transition-colors block'
                                >
                                  {subcategory}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='bg-muted/50 p-2 flex justify-end'>
                        <Link
                          to='/categories'
                          className='text-sm text-muted-foreground hover:text-primary flex items-center'
                        >
                          View all categories
                          <ChevronDown className='h-4 w-4 ml-1 rotate-270' />
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>

          {/* Desktop Search */}
          <div className='hidden md:flex relative max-w-sm w-full mx-4'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input placeholder='Search products...' className='pl-9' />
          </div>

          {/* Desktop Auth and Cart */}
          <div className='hidden md:flex items-center gap-2'>
            {isRegistered ? (
              <Button variant='outline' size='sm' asChild>
                <Link to='/login' className='flex items-center'>
                  <LogIn className='w-4 h-4 mr-2' />
                  Login
                </Link>
              </Button>
            ) : (
              <>
                <Button variant='outline' size='sm' asChild>
                  <Link to='/login' className='flex items-center'>
                    <LogIn className='w-4 h-4 mr-2' />
                    Login
                  </Link>
                </Button>
                <Button size='sm' asChild>
                  <Link to='/register' className='flex items-center'>
                    <UserPlus className='w-4 h-4 mr-2' />
                    Register
                  </Link>
                </Button>
              </>
            )}

            {/* Cart - Replace with CartButton component */}
            <CartButton />
          </div>

          {/* Mobile Menu */}
          <div className='md:hidden flex items-center gap-2'>
            <CartButton />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[300px] sm:w-[380px] pt-10 pb-5 px-4'>
                <div className='flex flex-col h-full'>
                  <div>
                    <div className='relative'>
                      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                      <Input placeholder='Search products...' className='pl-9' />
                    </div>
                  </div>

                  <div className='space-y-1 py-4'>
                    <Link
                      to='/'
                      className='flex items-center py-2 text-foreground hover:text-primary transition-colors'
                    >
                      <Home className='w-4 h-4 mr-2' />
                      Home
                    </Link>
                    <Link
                      to='/products'
                      className='flex items-center py-2 text-foreground hover:text-primary transition-colors'
                    >
                      <Package className='w-4 h-4 mr-2' />
                      Products
                    </Link>

                    {/* Categories in mobile */}
                    <div className='pt-2 pb-1'>
                      <div className='flex items-center py-2 text-foreground'>
                        <Grid className='w-4 h-4 mr-2' />
                        <span className='font-medium'>Categories</span>
                      </div>
                      <div className='ml-6 border-l pl-2 border-border/50'>
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            to={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
                            className='flex items-center py-1.5 text-foreground hover:text-primary transition-colors text-sm'
                          >
                            {category.name}
                          </Link>
                        ))}
                        <Link
                          to='/categories'
                          className='flex items-center py-1.5 text-muted-foreground hover:text-primary transition-colors text-sm font-medium'
                        >
                          View all categories
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className='mt-auto space-y-4 pt-4 border-t'>
                    {isRegistered ? (
                      <Button variant='outline' className='w-full' asChild>
                        <Link to='/login' className='flex items-center justify-center'>
                          <LogIn className='w-4 h-4 mr-2' />
                          Login
                        </Link>
                      </Button>
                    ) : (
                      <>
                        <Button variant='outline' className='w-full' asChild>
                          <Link to='/login' className='flex items-center justify-center'>
                            <LogIn className='w-4 h-4 mr-2' />
                            Login
                          </Link>
                        </Button>
                        <Button className='w-full' asChild>
                          <Link to='/register' className='flex items-center justify-center'>
                            <UserPlus className='w-4 h-4 mr-2' />
                            Register
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
