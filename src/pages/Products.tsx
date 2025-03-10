import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/ProductService';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loading } from '@/components/ui/products/Loading';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';

export default function Products() {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className='flex justify-center items-center h-64'>
        <p className='text-red-500'>
          {error instanceof Error ? error.message : t('products.loading_error')}
        </p>
      </div>
    );
  }

  if (!data?.data.length) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500'>{t('products.empty')}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-2xl font-bold mb-6'>{t('products.title')}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {data.data.map((product) => (
          <Card key={product.id} className='h-full flex flex-col'>
            <CardHeader>
              <img
                src={product.image_url}
                alt={product.name}
                className='w-full h-48 object-cover rounded-t-lg mb-2'
              />
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
              <p className='text-sm text-gray-600'>
                {product.is_available ? t('products.in_stock') : t('products.out_of_stock')}
              </p>
            </CardContent>
            <CardFooter className='border-t pt-4 mt-auto'>
              <div className='w-full flex justify-between items-center'>
                <span className='font-bold text-lg'>
                  $
                  {Number(product.price).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <button
                  className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
                  onClick={() => addToCart(product)}
                >
                  {t('products.add_to_cart')}
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
