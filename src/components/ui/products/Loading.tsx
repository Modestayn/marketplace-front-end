import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

export const Loading = () => {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-2xl font-bold mb-6'>Products</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[...Array(6)].map((_, i) => (
          <Card key={i} className='h-full flex flex-col'>
            <CardHeader>
              <Skeleton className='w-full h-48 rounded-t-lg mb-2' />
              <Skeleton className='h-6 w-3/4 mb-2' />
              <Skeleton className='h-4 w-full' />
            </CardHeader>
            <CardContent className='flex-grow'>
              <Skeleton className='h-4 w-1/3' />
            </CardContent>
            <CardFooter className='border-t pt-4 mt-auto'>
              <div className='w-full flex justify-between items-center'>
                <Skeleton className='h-6 w-20' />
                <Skeleton className='h-10 w-24' />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
