import client from "./client";
import type { Item } from "../types/admin";

export async function getItems(): Promise<Item[]> {
  const { data } = await client.get<Item[]>("/admin/items");
  return data;
}

export async function createItem(payload: Omit<Item, "_id">): Promise<Item> {
  const { data } = await client.post<Item>("/admin/items", payload);
  return data;
}

export async function updateItem(id: string, payload: Partial<Item>): Promise<Item> {
  const { data } = await client.put<Item>(`/admin/items/${id}`, payload);
  return data;
}

export async function deleteItem(id: string): Promise<void> {
  await client.delete(`/admin/items/${id}`);
}

export async function toggleItemAvailability(id: string): Promise<Item> {
  const { data } = await client.patch<Item>(`/admin/items/${id}/toggle`);
  return data;
}
