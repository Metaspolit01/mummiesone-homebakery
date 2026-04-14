import apiClient from "./client";
import type { Item } from "../types/bakery";

export async function getItems(): Promise<Item[]> {
  const { data } = await apiClient.get<Item[]>("/items");
  return data;
}

export async function getItemsByCategory(category: string): Promise<Item[]> {
  const { data } = await apiClient.get<Item[]>("/items", {
    params: { category },
  });
  return data;
}

export async function getItem(id: string): Promise<Item> {
  const { data } = await apiClient.get<Item>(`/items/${id}`);
  return data;
}
