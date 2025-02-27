import { createFileRoute } from '@tanstack/react-router';
import Products from '../../pages/ProductItem';

const mockFetchProduct = async (id: string) => {
  console.log(`Fetching product #${id}`);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id,
    name: `Product ${id}`,
    price: Math.floor(Math.random() * 100) + 10,
    description: `This is the description for product ${id}`,
    inStock: Math.random() > 0.3,
  };
};

export const Route = createFileRoute('/products/$productId')({
  loader: async ({ params }) => {
    return await mockFetchProduct(params.productId);
  },
  component: Products,
});
