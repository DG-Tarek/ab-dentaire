export interface Item {
  id?: string;
  ref: string;
  image: string;
  name: string;
  description: string;
  mark: string;
  category: string;
  price: number;
  new_price?: number;
  stock: number;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem {
  itemId: string;
  ref: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  userId?: string;
  items: CartItem[];
  total: number;
  createdAt: Date;
  updatedAt?: Date;
} 