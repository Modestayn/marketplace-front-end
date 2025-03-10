export type CartItem = {
  id: number;
  name: string;
  price: number | string;
  quantity: number;
  image_url: string;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: number, change: number) => void;
  removeItem: (id: number) => void;
};
