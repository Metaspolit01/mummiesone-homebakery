import type { Category } from "../types/bakery";
import { CATEGORIES } from "../data/catalog";

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}
