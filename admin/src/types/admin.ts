export interface Item {
  _id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  description: string;
  imageUrl?: string;
  available: boolean;
}

export interface Category {
  _id: string;
  name: string;
  subcategories: string[];
}

export type OrderStatus = "Pending" | "Accepted" | "Completed" | "Cancelled";
export type DeliveryType = "door" | "pickup";
export type PaymentMethod = "UPI" | "COD";

export interface Order {
  _id: string;
  itemId: string;
  itemName: string;
  userName: string;
  phone: string;
  address?: string;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  orderDate: string;
  deliveryDate: string;
  status: OrderStatus;
  customDescription?: string;
}

export interface DashboardStats {
  totalItems: number;
  totalCategories: number;
  totalOrders: number;
  pendingOrders: number;
  recentOrders: Order[];
}
