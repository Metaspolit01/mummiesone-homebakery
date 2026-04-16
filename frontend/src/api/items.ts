import type { Item } from "../types/bakery";
import { ITEMS } from "../data/catalog";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export async function getItems(): Promise<Item[]> {
  return ITEMS;
}

export async function getItemsByCategory(category: string): Promise<Item[]> {
  const target = normalize(category);
  return ITEMS.filter((item) => normalize(item.category) === target);
}

export async function getItem(id: string): Promise<Item> {
  const item = ITEMS.find((i) => i._id === id);
  if (!item) {
    throw new Error("Item not found");
  }
  return item;
}
