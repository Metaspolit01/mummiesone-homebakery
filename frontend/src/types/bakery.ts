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

export interface Order {
  _id: string;
  itemId: string;
  itemName: string;
  userName: string;
  phone: string;
  address?: string;
  deliveryType: "door" | "pickup";
  paymentMethod: "UPI" | "COD";
  orderDate: string;
  deliveryDate: string;
  status: "Pending" | "Accepted" | "Completed" | "Cancelled";
  customDescription?: string;
}

export interface OrderInput {
  itemId: string;
  itemName: string;
  userName: string;
  phone: string;
  address?: string;
  deliveryType: "door" | "pickup";
  paymentMethod: "UPI" | "COD";
  deliveryDate: string;
  customDescription?: string;
}
