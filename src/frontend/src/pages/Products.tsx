import { EmptyState } from "@/components/EmptyState";
import { ItemCard } from "@/components/ItemCard";
import { Layout } from "@/components/Layout";
import { PageLoader } from "@/components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { useCategories, useItems, useItemsByCategory } from "@/hooks/useBakery";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo } from "react";

const CATEGORY_ICONS: Record<string, string> = {
  All: "🛒",
  Cakes: "🎂",
  Chocolates: "🍫",
  Brownies: "🍫",
  Cookies: "🍪",
  Donuts: "🍩",
};

function useProductSearch() {
  const raw = useSearch({ strict: false }) as
    | Record<string, string>
    | undefined;
  return {
    activeCategory: raw?.category ?? "All",
    searchQuery: raw?.q ?? "",
  };
}

export default function ProductsPage() {
  const navigate = useNavigate({ from: "/products" });
  const { activeCategory, searchQuery } = useProductSearch();

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const { data: allItems = [], isLoading: allLoading } = useItems();
  const { data: categoryItems = [], isLoading: categoryLoading } =
    useItemsByCategory(activeCategory !== "All" ? activeCategory : "");

  const isLoading =
    categoriesLoading ||
    (activeCategory === "All" ? allLoading : categoryLoading);

  const sourceItems = activeCategory === "All" ? allItems : categoryItems;

  const filteredItems = useMemo(() => {
    if (!searchQuery) return sourceItems;
    const q = searchQuery.toLowerCase();
    return sourceItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.subcategory.toLowerCase().includes(q),
    );
  }, [sourceItems, searchQuery]);

  const allCategories = ["All", ...categories.map((c) => c.name)];

  function setCategory(cat: string) {
    const newSearch: Record<string, string> = {};
    if (cat !== "All") newSearch.category = cat;
    if (searchQuery) newSearch.q = searchQuery;
    void navigate({ search: newSearch });
  }

  function setSearch(q: string) {
    const newSearch: Record<string, string> = {};
    if (activeCategory !== "All") newSearch.category = activeCategory;
    if (q) newSearch.q = q;
    void navigate({ search: newSearch });
  }

  function clearSearch() {
    const newSearch: Record<string, string> = {};
    if (activeCategory !== "All") newSearch.category = activeCategory;
    void navigate({ search: newSearch });
  }

  function clearAll() {
    void navigate({ search: {} });
  }

  const itemCount = filteredItems.length;

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Our Menu
          </h1>
          <p className="text-primary-foreground/80 font-body text-base">
            Freshly baked to order — browse and place your request
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search bar */}
        <div
          className="relative mb-6 max-w-md"
          data-ocid="products.search_input"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by name, type…"
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-10 font-body"
            aria-label="Search products"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Clear search"
              data-ocid="products.clear_search_button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide"
          role="tablist"
          aria-label="Filter by category"
          data-ocid="products.category_tabs"
        >
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const icon = CATEGORY_ICONS[cat] ?? "🍰";
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategory(cat)}
                data-ocid={`products.category_filter.${cat.toLowerCase().replace(/\s+/g, "_")}`}
                className={[
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium",
                  "whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "gradient-primary text-primary-foreground shadow-warm"
                    : "bg-muted text-foreground hover:bg-primary/10 hover:text-primary",
                ].join(" ")}
              >
                <span aria-hidden="true">{icon}</span>
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results summary */}
        {!isLoading && (
          <p className="text-sm text-muted-foreground font-body mb-4">
            {itemCount === 0
              ? "No items found"
              : `${itemCount} item${itemCount !== 1 ? "s" : ""} found`}
            {activeCategory !== "All" && (
              <>
                {" "}
                in{" "}
                <span className="font-medium text-foreground">
                  {activeCategory}
                </span>
              </>
            )}
            {searchQuery && (
              <>
                {" "}
                for &quot;
                <span className="font-medium text-foreground">
                  {searchQuery}
                </span>
                &quot;
              </>
            )}
          </p>
        )}

        {/* Grid / states */}
        {isLoading ? (
          <PageLoader />
        ) : filteredItems.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No items found"
            description={
              searchQuery
                ? `No results for "${searchQuery}". Try a different search or browse all categories.`
                : activeCategory !== "All"
                  ? `Nothing in ${activeCategory} yet. Check back soon!`
                  : "No items available right now. Check back soon!"
            }
            action={{
              label: "View All Items",
              onClick: clearAll,
            }}
          />
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-ocid="products.items_list"
          >
            {filteredItems.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
