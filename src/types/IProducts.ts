export type Product = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  category_id: number;
  price: string;
  is_available: number;
  created_at: string;
  updated_at: string;
};

export type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type ProductsResponse = {
  data: Product[];
  meta: PaginationMeta;
};
