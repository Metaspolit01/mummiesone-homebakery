import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories";
import { getItems } from "../api/items";
import ItemCard from "../components/ItemCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { contact } from "../config/contact";

const HIGHLIGHTS = [
  { icon: "🏡", label: "100% Homemade" },
  { icon: "📅", label: "1-Day Advance" },
  { icon: "✨", label: "Custom Orders" },
];

const CATEGORY_EMOJIS: Record<string, string> = {
  Cakes: "🎂",
  Chocolates: "🍫",
  Brownies: "🍩",
  Cookies: "🍪",
  Deserts: "🍩",
};

export default function Home() {
  const { data: categories = [], isLoading: catsLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const featuredItems = items.filter((i) => i.available).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section
        data-ocid="home.hero_section"
        className="min-h-[90vh] flex items-center justify-center px-4 py-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, oklch(0.88 0.12 130) 0%, oklch(0.93 0.07 130) 45%, oklch(0.97 0.03 130) 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ backgroundColor: "oklch(0.72 0.15 130)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-15"
          style={{ backgroundColor: "oklch(0.60 0.18 130)" }}
        />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          {/* Pill badge */}
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border"
              style={{
                backgroundColor: "rgba(255,255,255,0.35)",
                borderColor: "rgba(255,255,255,0.45)",
                color: "oklch(0.20 0.08 130)",
                backdropFilter: "blur(8px)",
              }}
            >
              ✨ Freshly baked with love
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="mb-4 leading-tight"
            style={{ fontFamily: "Fraunces, serif", color: "oklch(0.15 0.04 130)" }}
          >
            <span className="block text-6xl sm:text-7xl font-bold">Mummies</span>
            <span
              className="block text-5xl sm:text-6xl font-semibold italic"
              style={{ color: "oklch(0.22 0.10 130)" }}
            >
              One
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl mb-10 leading-relaxed text-balance"
            style={{ color: "oklch(0.28 0.06 130)" }}
          >
            Homemade treats crafted with the finest ingredients. Custom cakes, artisan chocolates &amp; more — delivered with love in Hyderabad.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              to="/products"
              data-ocid="home.order_now_button"
              className="px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-200"
              style={{
                backgroundColor: "oklch(0.22 0.10 130)",
                color: "oklch(0.95 0.04 130)",
                textDecoration: "none",
                boxShadow: "0 4px 14px oklch(0.22 0.10 130 / 0.35)",
              }}
            >
              Order Now
            </Link>
            <a
              href={contact.phoneTelHref}
              data-ocid="home.call_us_button"
              className="px-8 py-3.5 rounded-xl text-base font-semibold border-2 transition-all duration-200"
              style={{
                backgroundColor: "rgba(255,255,255,0.40)",
                borderColor: "oklch(0.22 0.10 130)",
                color: "oklch(0.20 0.08 130)",
                textDecoration: "none",
                backdropFilter: "blur(6px)",
              }}
            >
              📞 Call Us
            </a>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.40)",
                  borderColor: "oklch(0.80 0.10 130)",
                  color: "oklch(0.22 0.08 130)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <span>{h.icon}</span>
                <span>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="w-full overflow-hidden" style={{ maxHeight: 380 }}>
        <img
          src="/assets/generated/hero-bakery.dim_1200x600.jpg"
          alt="Fresh baked goods from Mummies One Bakery"
          className="w-full object-cover"
          style={{ maxHeight: 380 }}
        />
      </section>

      {/* Categories section */}
      <section
        data-ocid="home.categories_section"
        className="py-16 px-4"
        style={{ backgroundColor: "oklch(0.97 0.01 130)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: "Fraunces, serif", color: "oklch(0.18 0.02 130)" }}
            >
              Our Categories
            </h2>
            <p className="text-base" style={{ color: "oklch(0.45 0.04 130)" }}>
              Explore our full range of homemade baked goods
            </p>
          </div>

          {catsLoading ? (
            <LoadingSpinner message="Loading categories..." />
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  data-ocid={`home.category.${cat.name.toLowerCase()}_link`}
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all duration-200"
                  style={{
                    backgroundColor: "oklch(0.99 0.005 130)",
                    borderColor: "oklch(0.88 0.05 130)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                      "oklch(0.88 0.10 130)";
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(-3px)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 8px 20px -4px rgb(0 0 0 / 0.10)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                      "oklch(0.99 0.005 130)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  <span className="text-3xl">{CATEGORY_EMOJIS[cat.name] ?? "🧁"}</span>
                  <span
                    className="text-sm font-semibold text-center"
                    style={{ color: "oklch(0.22 0.06 130)" }}
                  >
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            /* Fallback static categories when API is loading/empty */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {["Cakes", "Chocolates", "Brownies", "Cookies", "Deserts"].map((name) => (
                <Link
                  key={name}
                  to={`/products?category=${encodeURIComponent(name)}`}
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all duration-200"
                  style={{
                    backgroundColor: "oklch(0.99 0.005 130)",
                    borderColor: "oklch(0.88 0.05 130)",
                    textDecoration: "none",
                  }}
                >
                  <span className="text-3xl">{CATEGORY_EMOJIS[name] ?? "🧁"}</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.22 0.06 130)" }}
                  >
                    {name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured items */}
      {!itemsLoading && featuredItems.length > 0 && (
        <section
          data-ocid="home.featured_section"
          className="py-16 px-4"
          style={{
            background: "linear-gradient(180deg, oklch(0.94 0.06 130) 0%, oklch(0.97 0.02 130) 100%)",
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "Fraunces, serif", color: "oklch(0.18 0.02 130)" }}
              >
                Popular Items
              </h2>
              <Link
                to="/products"
                data-ocid="home.view_all_link"
                className="text-sm font-medium"
                style={{ color: "oklch(0.30 0.12 130)", textDecoration: "none" }}
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item, idx) => (
                <ItemCard key={item._id} item={item} index={idx + 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA / Contact section */}
      <section
        data-ocid="home.contact_section"
        className="py-16 px-4 text-center"
        style={{ backgroundColor: "oklch(0.97 0.01 130)" }}
      >
        <div className="max-w-xl mx-auto">
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "Fraunces, serif", color: "oklch(0.18 0.02 130)" }}
          >
            Want a Custom Cake?
          </h2>
          <p className="mb-6 text-base" style={{ color: "oklch(0.40 0.04 130)" }}>
            We take custom orders for birthdays, anniversaries, and special occasions. Call us to discuss your dream cake!
          </p>
          <a
            href={contact.phoneTelHref}
            data-ocid="home.contact_call_button"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-200"
            style={{
              backgroundColor: "oklch(0.72 0.15 130)",
              color: "oklch(0.15 0.03 130)",
              textDecoration: "none",
              boxShadow: "0 4px 14px oklch(0.72 0.15 130 / 0.35)",
            }}
          >
            📞 Call {contact.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
