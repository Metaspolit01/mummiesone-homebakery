import type { Item } from "../types/bakery";
import { ITEMS } from "../data/catalog";

export async function getItems(): Promise<Item[]> {
  return ITEMS;
}

export async function getItemsByCategory(category: string): Promise<Item[]> {
  return ITEMS.filter((item) => item.category === category);
}

export async function getItem(id: string): Promise<Item> {
  const item = ITEMS.find((i) => i._id === id);
  if (!item) {
    throw new Error("Item not found");
  }
  return item;
}
