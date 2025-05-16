import { Product } from './productTypes';

export interface CartItem {
  id: number;
  brand: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  thumbnail?: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}

export interface PayloadCart {
  product: Product;
  quantity: number;
}
