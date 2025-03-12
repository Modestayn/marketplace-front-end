import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

export default function CartPage() {
  const { t } = useTranslation();
  const { cartItems, updateQuantity, removeItem } = useCart();

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const formatPrice = (price: number) => `$${Number(price).toFixed(2)}`;

  return (
    <div className='w-full  bg-background flex justify-center px-4 py-10'>
      <div className='p-6 ' style={{ width: '900px' }}>
        <h1 className='text-3xl font-bold mb-8'>{t('cart.yourCart', { itemCount })}</h1>

        {cartItems.length === 0 ? (
          <div className='text-center text-muted-foreground text-lg'>{t('cart.emptyCart')}</div>
        ) : (
          <>
            <div className='space-y-6 p-2'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center gap-4 p-4 border rounded-xl bg-card shadow-sm mb-4'
                >
                  <div className='w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='text-lg font-medium truncate'>{item.name}</div>
                    <div className='text-muted-foreground text-sm'>{formatPrice(item.price)}</div>
                    <div className='flex items-center mt-3 gap-2'>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className='h-4 w-4' />
                      </Button>
                      <span className='w-8 text-center text-base'>{item.quantity}</span>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='ml-auto h-8 w-8 text-muted-foreground hover:text-destructive'
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className='h-5 w-5' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className='my-8' />

            <div className='flex justify-between text-xl font-semibold mb-6'>
              <span>{t('cart.subtotal')}:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className=' flex justify-between'>
              <Button asChild variant='outline' style={{ width: '200px' }}>
                <Link to='/products'>{t('cart.continueShopping')}</Link>
              </Button>
              <Button asChild style={{ width: '200px' }}>
                <Link to='/checkout'>{t('cart.checkout')}</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
