import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, P as PageLoader, a as useSearch } from "./index-BrrYKXKQ.js";
import { E as EmptyState } from "./EmptyState-D_NYXDFa.js";
import { I as ItemCard } from "./ItemCard-Dkt9VjRu.js";
import { L as Layout, X } from "./Layout-DweZArJf.js";
import { I as Input } from "./input-CV3sBkO0.js";
import { a as useCategories, u as useItems, b as useItemsByCategory } from "./useBakery-TYl0_4a8.js";
import { S as Search } from "./search-Mxbs8YUh.js";
import "./tag-CYen8E-y.js";
const CATEGORY_ICONS = {
  All: "🛒",
  Cakes: "🎂",
  Chocolates: "🍫",
  Brownies: "🍫",
  Cookies: "🍪",
  Donuts: "🍩"
};
function useProductSearch() {
  const raw = useSearch({ strict: false });
  return {
    activeCategory: (raw == null ? void 0 : raw.category) ?? "All",
    searchQuery: (raw == null ? void 0 : raw.q) ?? ""
  };
}
function ProductsPage() {
  const navigate = useNavigate({ from: "/products" });
  const { activeCategory, searchQuery } = useProductSearch();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: allItems = [], isLoading: allLoading } = useItems();
  const { data: categoryItems = [], isLoading: categoryLoading } = useItemsByCategory(activeCategory !== "All" ? activeCategory : "");
  const isLoading = categoriesLoading || (activeCategory === "All" ? allLoading : categoryLoading);
  const sourceItems = activeCategory === "All" ? allItems : categoryItems;
  const filteredItems = reactExports.useMemo(() => {
    if (!searchQuery) return sourceItems;
    const q = searchQuery.toLowerCase();
    return sourceItems.filter(
      (item) => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.subcategory.toLowerCase().includes(q)
    );
  }, [sourceItems, searchQuery]);
  const allCategories = ["All", ...categories.map((c) => c.name)];
  function setCategory(cat) {
    const newSearch = {};
    if (cat !== "All") newSearch.category = cat;
    if (searchQuery) newSearch.q = searchQuery;
    void navigate({ search: newSearch });
  }
  function setSearch(q) {
    const newSearch = {};
    if (activeCategory !== "All") newSearch.category = activeCategory;
    if (q) newSearch.q = q;
    void navigate({ search: newSearch });
  }
  function clearSearch() {
    const newSearch = {};
    if (activeCategory !== "All") newSearch.category = activeCategory;
    void navigate({ search: newSearch });
  }
  function clearAll() {
    void navigate({ search: {} });
  }
  const itemCount = filteredItems.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "gradient-primary py-12 text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold mb-2", children: "Our Menu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 font-body text-base", children: "Freshly baked to order — browse and place your request" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative mb-6 max-w-md",
          "data-ocid": "products.search_input",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by name, type…",
                value: searchQuery,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-10 pr-10 font-body",
                "aria-label": "Search products"
              }
            ),
            searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: clearSearch,
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                "aria-label": "Clear search",
                "data-ocid": "products.clear_search_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide",
          role: "tablist",
          "aria-label": "Filter by category",
          "data-ocid": "products.category_tabs",
          children: allCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const icon = CATEGORY_ICONS[cat] ?? "🍰";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": isActive,
                onClick: () => setCategory(cat),
                "data-ocid": `products.category_filter.${cat.toLowerCase().replace(/\s+/g, "_")}`,
                className: [
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium",
                  "whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "gradient-primary text-primary-foreground shadow-warm" : "bg-muted text-foreground hover:bg-primary/10 hover:text-primary"
                ].join(" "),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: icon }),
                  cat
                ]
              },
              cat
            );
          })
        }
      ),
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-body mb-4", children: [
        itemCount === 0 ? "No items found" : `${itemCount} item${itemCount !== 1 ? "s" : ""} found`,
        activeCategory !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          " ",
          "in",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: activeCategory })
        ] }),
        searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          " ",
          'for "',
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: searchQuery }),
          '"'
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}) : filteredItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: "🔍",
          title: "No items found",
          description: searchQuery ? `No results for "${searchQuery}". Try a different search or browse all categories.` : activeCategory !== "All" ? `Nothing in ${activeCategory} yet. Check back soon!` : "No items available right now. Check back soon!",
          action: {
            label: "View All Items",
            onClick: clearAll
          }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
          "data-ocid": "products.items_list",
          children: filteredItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ItemCard, { item, index: i }, item.id))
        }
      )
    ] })
  ] });
}
export {
  ProductsPage as default
};
