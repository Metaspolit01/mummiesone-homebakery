export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  imageUrl: string;
  available: boolean;
}

export interface ItemInput {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  imageUrl: string;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export interface CategoryInput {
  name: string;
  subcategories: string[];
}

export interface Order {
  id: string;
  itemId: string;
  itemName: string;
  userName: string;
  phone: string;
  address: string;
  deliveryType: "pickup" | "door" | string;
  paymentMethod: "upi" | "cod" | string;
  deliveryDate: bigint;
  orderDate: bigint;
  status: "Pending" | "Accepted" | "Completed" | string;
  customDescription: string;
  isCustomRequest: boolean;
}

export interface OrderInput {
  itemId: string;
  itemName: string;
  userName: string;
  phone: string;
  address: string;
  deliveryType: string;
  paymentMethod: string;
  deliveryDate: bigint;
  customDescription: string;
  isCustomRequest: boolean;
}

export type OrderStatus = "Pending" | "Accepted" | "Completed";
