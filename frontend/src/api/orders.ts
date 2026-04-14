import apiClient from "./client";
import type { Order, OrderInput } from "../types/bakery";

export async function createOrder(data: OrderInput): Promise<Order> {
  const { data: order } = await apiClient.post<Order>("/orders", data);
  return order;
}
