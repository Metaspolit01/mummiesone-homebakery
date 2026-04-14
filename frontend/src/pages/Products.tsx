import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItems, getItemsByCategory } from "../api/items";
import { getCategories } from "../api/categories";
import ItemCard from "../components/ItemCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

const ALL_CATEGORY = "All";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") ?? ALL_CATEGORY;
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  const { data: categories = [], isLoading: catsLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["items", activeCategory],
    queryFn: () =>
      activeCategory === ALL_CATEGORY ? getItems() : getItemsByCategory(activeCategory),
  });

  useEffect(() => {
    if (activeCategory === ALL_CATEGORY) {
      searchParams.delete("category");
    } else {
      searchParams.set("category", activeCategory);
    }
    setSearchParams(searchParams, { replace: true });
  }, [activeCategory]);

  const allTabs = [
    ALL_CATEGORY,
    ...categories.map((c) => c.name),
    // fallback tabs when API hasn't returned categories yet
    ...(!categories.length ? ["Cakes", "Chocolates", "Brownies", "Cookies", "Donuts"] : []),
  ];

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
          <div className="flex flex-wrap gap-2 mb-8" data-ocid="products.category_filter">
            {allTabs.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
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

        {/* Items grid */}
        {itemsLoading ? (
          <LoadingSpinner message="Loading products..." />
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, idx) => (
              <ItemCard key={item._id} item={item} index={idx + 1} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🧁"
            title={activeCategory === ALL_CATEGORY ? "No items available" : `No ${activeCategory} available`}
            description="Check back soon — we add new items regularly!"
            action={{ label: "Browse All", to: "/products" }}
          />
        )}
      </div>
    </div>
  );
}
