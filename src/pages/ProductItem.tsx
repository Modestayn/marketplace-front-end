import { useParams, useLoaderData } from '@tanstack/react-router';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

export default function Product() {
  const { productId } = useParams({ from: '/products/$productId' });

  const product = useLoaderData({ from: '/products/$productId' }) as Product;

  return (
    <div className='text-center mt-5'>
      <h1>{product.name}</h1>
      <p className='text-gray-500 mb-4'>Product ID: {productId}</p>

      <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
        <p className='text-lg font-semibold text-green-600'>
          ${product.price.toFixed(2)}
        </p>

        <p className='my-4 text-left'>{product.description}</p>

        <p className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </p>

        <button
          className='mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400'
          disabled={!product.inStock}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}