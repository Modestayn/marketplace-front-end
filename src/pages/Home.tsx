import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { UserIcon, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Link } from '@tanstack/react-router';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className='container mx-auto flex py-10 items-center justify-center'>
      <Card className='min-w-[30vw]'>
        <CardHeader>
          <CardTitle>{t('welcome')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='border rounded-lg p-4'>
            <div className='flex items-start gap-4'>
              <div className='p-2 rounded-full bg-primary/10'>
                <UserIcon className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h3 className='font-medium'>{t('profile.title')}</h3>
                <p className='text-sm text-muted-foreground mt-1'>{t('profile.personal_info')}</p>
                <Link to='/profile' className='flex items-center cursor-pointer'>
                  <Button size='sm' variant='outline' className='mt-3'>
                    {t('profile.account_management')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className='border rounded-lg p-4'>
            <div className='flex items-start gap-4'>
              <div className='p-2 rounded-full bg-primary/10'>
                <ShoppingBag className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h3 className='font-medium'>{t('products.title')}</h3>
                <p className='text-sm text-muted-foreground mt-1'>
                  {t('products.see_all_products')}
                </p>
                <Link to='/products' className='flex items-center cursor-pointer'>
                  <Button size='sm' variant='outline' className='mt-3'>
                    {t('products.see_all_products')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
