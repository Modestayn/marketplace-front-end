import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Link } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

export default function Cart() {
  const { t } = useTranslation();
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='icon' className='relative'>
          <ShoppingCart className='h-5 w-5' />
          {itemCount > 0 && (
            <Badge
              className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0'
              variant='destructive'
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-100 p-0' align='end'>
        <div className='p-4 font-medium'>{t('cart.yourCart', { itemCount })}</div>
        <Separator />

        {cartItems.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground'>{t('cart.emptyCart')}</div>
        ) : (
          <>
            <div className='max-h-[300px] overflow-auto py-2'>
              {cartItems.map((item) => (
                <div key={item.id} className='flex items-start gap-3 p-4'>
                  <div className='w-16 h-16 rounded overflow-hidden flex-shrink-0'>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='font-medium truncate'>{item.name}</div>
                    <div className='text-muted-foreground'>{formatPrice(item.price)}</div>
                    <div className='flex items-center mt-2'>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-7 w-7'
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className='h-3 w-3' />
                      </Button>
                      <span className='w-8 text-center'>{item.quantity}</span>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-7 w-7'
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className='h-3 w-3' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-7 w-7 ml-auto text-muted-foreground hover:text-destructive'
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className='p-4'>
              <div className='flex justify-between mb-4'>
                <span>{t('cart.subtotal')}:</span>
                <span className='font-medium'>{formatPrice(subtotal)}</span>
              </div>

              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  className='flex-1'
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link to='/cart'>{t('cart.viewCart')}</Link>
                </Button>
                <Button className='flex-1' onClick={() => setIsOpen(false)} asChild>
                  <Link to='/checkout'>{t('cart.checkout')}</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
