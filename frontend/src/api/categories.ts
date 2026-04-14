import apiClient from "./client";
import type { Category } from "../types/bakery";

export async function getCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>("/categories");
  return data;
}
