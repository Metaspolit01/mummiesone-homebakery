import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItems, getItemsByCategory } from "../api/items";
import { getCategories } from "../api/categories";
import ItemCard from "../components/ItemCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

const ALL_CATEGORY = "All";
const ALL_SUBCATEGORY = "All";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") ?? ALL_CATEGORY;
  const initialSubcategory = searchParams.get("subcategory") ?? ALL_SUBCATEGORY;

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState<string>(initialSubcategory);

  const { data: categories = [], isLoading: catsLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const selectedCategory =
    activeCategory === ALL_CATEGORY
      ? undefined
      : categories.find(
          (c) => normalize(c.name) === normalize(activeCategory) || normalize(c._id) === normalize(activeCategory),
        );

  const subcategoryTabs = selectedCategory?.subcategories?.length
    ? [ALL_SUBCATEGORY, ...selectedCategory.subcategories]
    : [];

  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["items", activeCategory],
    queryFn: () =>
      activeCategory === ALL_CATEGORY ? getItems() : getItemsByCategory(activeCategory),
  });

  const visibleItems =
    activeCategory === ALL_CATEGORY || activeSubcategory === ALL_SUBCATEGORY
      ? items
      : items.filter(
          (item) => !!item.subcategory && normalize(item.subcategory) === normalize(activeSubcategory),
        );

  useEffect(() => {
    if (activeCategory === ALL_CATEGORY) {
      searchParams.delete("category");
      searchParams.delete("subcategory");
    } else {
      searchParams.set("category", activeCategory);
      if (activeSubcategory === ALL_SUBCATEGORY) {
        searchParams.delete("subcategory");
      } else {
        searchParams.set("subcategory", activeSubcategory);
      }
    }

    setSearchParams(searchParams, { replace: true });
  }, [activeCategory, activeSubcategory]);

  useEffect(() => {
    if (activeCategory === ALL_CATEGORY) {
      if (activeSubcategory !== ALL_SUBCATEGORY) {
        setActiveSubcategory(ALL_SUBCATEGORY);
      }
      return;
    }

    if (!selectedCategory?.subcategories?.length) {
      if (activeSubcategory !== ALL_SUBCATEGORY) {
        setActiveSubcategory(ALL_SUBCATEGORY);
      }
      return;
    }

    if (activeSubcategory === ALL_SUBCATEGORY) return;

    const stillValid = selectedCategory.subcategories.some(
      (s) => normalize(s) === normalize(activeSubcategory),
    );
    if (!stillValid) {
      setActiveSubcategory(ALL_SUBCATEGORY);
    }
  }, [activeCategory, activeSubcategory, selectedCategory]);

  const allTabs = [
    ALL_CATEGORY,
    ...categories.map((c) => c.name),
    // fallback tabs when API hasn't returned categories yet
    ...(!categories.length ? ["Cakes", "Chocolates", "Brownies", "Cookies", "Donuts"] : []),
  ];

  const activeCategoryLabel = selectedCategory?.name ?? activeCategory;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "oklch(0.97 0.01 130)" }}>
      {/* Page header */}
      <div
        className="py-10 px-4 text-center border-b"
        style={{
          background: "linear-gradient(160deg, oklch(0.90 0.10 130) 0%, oklch(0.96 0.04 130) 100%)",
          borderColor: "oklch(0.88 0.05 130)",
        }}
      >
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: "Fraunces, serif", color: "oklch(0.18 0.02 130)" }}
        >
          Our Baked Goods
        </h1>
        <p className="text-base" style={{ color: "oklch(0.38 0.05 130)" }}>
          Homemade with love — Hyderabad's favourite bakery
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category filter tabs */}
        {!catsLoading && (
          <div className="flex flex-wrap gap-2 mb-4" data-ocid="products.category_filter">
            {allTabs.map((cat) => {
              const isActive = normalize(cat) === normalize(activeCategory);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveSubcategory(ALL_SUBCATEGORY);
                  }}
                  data-ocid={`products.filter.${cat.toLowerCase()}_tab`}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive
                      ? "oklch(0.22 0.10 130)"
                      : "oklch(0.99 0.005 130)",
                    color: isActive ? "oklch(0.95 0.04 130)" : "oklch(0.35 0.05 130)",
                    border: `1.5px solid ${isActive ? "transparent" : "oklch(0.85 0.06 130)"}`,
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Subcategory filter tabs */}
        {activeCategory !== ALL_CATEGORY && subcategoryTabs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8" data-ocid="products.subcategory_filter">
            {subcategoryTabs.map((sub) => {
              const isActive = normalize(sub) === normalize(activeSubcategory);
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setActiveSubcategory(sub)}
                  data-ocid={`products.filter_sub.${sub.toLowerCase().split(" ").join("_")}_tab`}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive
                      ? "oklch(0.72 0.15 130)"
                      : "oklch(0.99 0.005 130)",
                    color: isActive ? "oklch(0.15 0.03 130)" : "oklch(0.35 0.05 130)",
                    border: `1.5px solid ${isActive ? "transparent" : "oklch(0.85 0.06 130)"}`,
                    cursor: "pointer",
                  }}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}

        {/* Items grid */}
        {itemsLoading ? (
          <LoadingSpinner message="Loading products..." />
        ) : visibleItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleItems.map((item, idx) => (
              <ItemCard key={item._id} item={item} index={idx + 1} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🧁"
            title={activeCategory === ALL_CATEGORY ? "No items available" : `No ${activeCategoryLabel} available`}
            description="Check back soon — we add new items regularly!"
            action={{ label: "Browse All", to: "/products" }}
          />
        )}
      </div>
    </div>
  );
}
