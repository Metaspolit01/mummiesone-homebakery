import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Item {
    id: string;
    subcategory: string;
    name: string;
    description: string;
    available: boolean;
    imageUrl: string;
    category: string;
    price: number;
}
export interface CategoryInput {
    name: string;
    subcategories: Array<string>;
}
export interface ItemInput {
    subcategory: string;
    name: string;
    description: string;
    available: boolean;
    imageUrl: string;
    category: string;
    price: number;
}
export interface OrderInput {
    itemId: string;
    userName: string;
    paymentMethod: string;
    customDescription: string;
    deliveryDate: bigint;
    deliveryType: string;
    address: string;
    itemName: string;
    phone: string;
    isCustomRequest: boolean;
}
export type LoginResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface Order {
    id: string;
    status: string;
    itemId: string;
    userName: string;
    paymentMethod: string;
    customDescription: string;
    deliveryDate: bigint;
    orderDate: bigint;
    deliveryType: string;
    address: string;
    itemName: string;
    phone: string;
    isCustomRequest: boolean;
}
export interface Category {
    id: string;
    name: string;
    subcategories: Array<string>;
}
export interface backendInterface {
    addCategory(input: CategoryInput): Promise<Category>;
    addItem(input: ItemInput): Promise<Item>;
    adminLogin(username: string, password: string): Promise<LoginResult>;
    createCustomRequest(input: OrderInput): Promise<Order>;
    createOrder(input: OrderInput): Promise<Order>;
    deleteCategory(id: string): Promise<boolean>;
    deleteItem(id: string): Promise<boolean>;
    getAllItems(): Promise<Array<Item>>;
    getAllOrders(): Promise<Array<Order>>;
    getCategories(): Promise<Array<Category>>;
    getItem(id: string): Promise<Item | null>;
    getItems(): Promise<Array<Item>>;
    getItemsByCategory(category: string): Promise<Array<Item>>;
    toggleItemAvailability(id: string): Promise<Item | null>;
    updateCategory(id: string, input: CategoryInput): Promise<Category | null>;
    updateItem(id: string, input: ItemInput): Promise<Item | null>;
    updateOrderStatus(id: string, status: string): Promise<Order | null>;
    validateAdminToken(token: string): Promise<boolean>;
}
