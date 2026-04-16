import { Link } from "react-router-dom";
import type { Item } from "../types/bakery";
import { contact } from "../config/contact";

interface ItemCardProps {
  item: Item;
  index?: number;
}

export default function ItemCard({ item, index = 1 }: ItemCardProps) {
  const isCustomized = normalize(item.category) === "customized cakes";
  const whatsAppHref = `https://wa.me/${contact.whatsAppNumberE164}?text=${encodeURIComponent(
    `Hi Mummies One, I want to enquire about ${item.name}.`,
  )}`;

  return (
    <div
      data-ocid={`products.item.${index}`}
      className="rounded-xl overflow-hidden flex flex-col transition-all duration-250"
      style={{
        backgroundColor: "oklch(0.99 0.005 130)",
        boxShadow: "0 4px 16px -2px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.04)",
        border: "1px solid oklch(0.88 0.05 130)",
        opacity: item.available ? 1 : 0.6,
      }}
      onMouseEnter={(e) => {
        if (item.available) {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 8px 24px -4px rgb(0 0 0 / 0.12), 0 4px 8px -4px rgb(0 0 0 / 0.06)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 16px -2px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.04)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-5xl"
            style={{ backgroundColor: "oklch(0.90 0.08 130)" }}
          >
            {getCategoryEmoji(item.category)}
          </div>
        )}
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "oklch(0.20 0.02 130 / 0.55)" }}>
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: "oklch(0.99 0.005 130)", color: "oklch(0.35 0.04 130)" }}
            >
              Unavailable
            </span>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: "oklch(0.72 0.15 130 / 0.90)",
              color: "oklch(0.15 0.03 130)",
            }}
          >
            {formatCategoryLabel(item.category)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-semibold text-base leading-snug mb-1"
          style={{ fontFamily: "Fraunces, serif", color: "oklch(0.18 0.02 130)" }}
        >
          {item.name}
        </h3>
        {item.subcategory && (
          <p className="text-xs mb-2" style={{ color: "oklch(0.50 0.04 130)" }}>
            {item.subcategory}
          </p>
        )}
        <p
          className="text-sm leading-relaxed flex-1 line-clamp-2"
          style={{ color: "oklch(0.40 0.04 130)" }}
        >
          {item.description}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          {isCustomized ? (
            item.available ? (
              <div className="flex items-center justify-end gap-2 w-full">
                <a
                  href={contact.phoneTelHref}
                  data-ocid={`products.customized.call_button.${index}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: "oklch(0.92 0.06 130)",
                    color: "oklch(0.18 0.02 130)",
                    textDecoration: "none",
                    border: "1px solid oklch(0.85 0.06 130)",
                  }}
                >
                  Call
                </a>
                <a
                  href={whatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`products.customized.whatsapp_button.${index}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: "oklch(0.72 0.15 130)",
                    color: "oklch(0.15 0.03 130)",
                    textDecoration: "none",
                  }}
                >
                  WhatsApp
                </a>
              </div>
            ) : (
              <span
                className="px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed ml-auto"
                style={{
                  backgroundColor: "oklch(0.88 0.04 130)",
                  color: "oklch(0.55 0.04 130)",
                }}
              >
                Unavailable
              </span>
            )
          ) : (
            <>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "Fraunces, serif", color: "oklch(0.22 0.10 130)" }}
              >
                ₹{item.price}
              </span>
              {item.available ? (
                <Link
                  to={`/order/${item._id}`}
                  data-ocid={`products.order_button.${index}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: "oklch(0.72 0.15 130)",
                    color: "oklch(0.15 0.03 130)",
                    textDecoration: "none",
                  }}
                >
                  Order Now
                </Link>
              ) : (
                <span
                  className="px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                  style={{
                    backgroundColor: "oklch(0.88 0.04 130)",
                    color: "oklch(0.55 0.04 130)",
                  }}
                >
                  Unavailable
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function formatCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    cakes: "Cakes",
    "customized cakes": "Customized Cakes",
    chocolates: "Chocolates",
    brownies: "Brownies",
    cookies: "Cookies",
    donuts: "Donuts",
  };
  return labels[normalize(category)] ?? category;
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    cakes: "🎂",
    "customized cakes": "🎨",
    chocolates: "🍫",
    brownies: "🍩",
    cookies: "🍪",
    donuts: "🍩",
  };
  return emojis[normalize(category)] ?? "🧁";
}
