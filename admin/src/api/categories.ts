import client from "./client";
import type { Category } from "../types/admin";

export async function getCategories(): Promise<Category[]> {
  const { data } = await client.get<Category[]>("/admin/categories");
  return data;
}

export async function createCategory(payload: Omit<Category, "_id">): Promise<Category> {
  const { data } = await client.post<Category>("/admin/categories", payload);
  return data;
}

export async function updateCategory(id: string, payload: Partial<Omit<Category, "_id">>): Promise<Category> {
  const { data } = await client.put<Category>(`/admin/categories/${id}`, payload);
  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  await client.delete(`/admin/categories/${id}`);
}
