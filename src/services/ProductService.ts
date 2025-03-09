import { ProductsResponse } from '../types/IProducts';
import { API_CONFIG } from '../config/api';

export const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(`${API_CONFIG.baseURL}/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
