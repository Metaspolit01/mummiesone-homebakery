import client from "./client";
import type { Order, OrderStatus } from "../types/admin";

export async function getOrders(): Promise<Order[]> {
  const { data } = await client.get<Order[]>("/admin/orders");
  return data;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const { data } = await client.patch<Order>(`/admin/orders/${id}/status`, { status });
  return data;
}

export async function deleteOrder(id: string): Promise<void> {
  await client.delete(`/admin/orders/${id}`);
}
