import type { Category, Item } from "../types/bakery";

export const CATEGORIES: Category[] = [
  {
    _id: "cakes",
    name: "Cakes",
    subcategories: [
      "Tea time cakes",
      "Normal cakes",
      "Cup cakes",
      "Bento cakes",
      "Cool cakes",
      "Ice cream cake",
      "Jar cakes",
    ],
  },
  {
    _id: "chocolates",
    name: "Chocolates",
    subcategories: ["Homemade", "Bouquets", "Hampers"],
  },
  { _id: "brownies", name: "Brownies", subcategories: [] },
  { _id: "cookies", name: "Cookies", subcategories: [] },
  { _id: "donuts", name: "Donuts", subcategories: [] },
];

export const ITEMS: Item[] = [
  {
    _id: "chocolate-truffle-cake",
    name: "Chocolate Truffle Cake",
    category: "Cakes",
    subcategory: "Custom",
    price: 599,
    description: "Rich chocolate cake with truffle frosting",
    available: true,
  },
  {
    _id: "dark-chocolate-box",
    name: "Dark Chocolate Box",
    category: "Chocolates",
    subcategory: "Homemade",
    price: 299,
    description: "Handcrafted dark chocolates",
    available: true,
  },
  {
    _id: "fudge-brownies",
    name: "Fudge Brownies",
    category: "Brownies",
    price: 199,
    description: "Chewy fudge brownies, baked fresh",
    available: true,
  },
  {
    _id: "butter-cookies",
    name: "Butter Cookies",
    category: "Cookies",
    price: 149,
    description: "Melt-in-mouth butter cookies",
    available: true,
  },
];
