import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Item } from "@/types/bakery";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Tag } from "lucide-react";

interface ItemCardProps {
  item: Item;
  index?: number;
}

export function ItemCard({ item, index = 0 }: ItemCardProps) {
  return (
    <div
      className="bg-card rounded-lg shadow-warm border border-border overflow-hidden flex flex-col transition-smooth hover:shadow-elevated hover:-translate-y-0.5 group"
      data-ocid={`item.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-4xl">🎂</span>
          </div>
        )}
        {!item.available && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground text-xs font-body font-semibold px-3 py-1 rounded-full">
              Unavailable
            </span>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge
            variant="secondary"
            className="text-xs font-body bg-card/90 text-foreground border-0"
            data-ocid={`item.category_badge.${index + 1}`}
          >
            <Tag className="w-3 h-3 mr-1" />
            {item.subcategory || item.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-display text-foreground text-base font-semibold leading-snug line-clamp-1">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-sm font-body leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-mono text-accent font-bold text-lg">
            ₹{item.price.toFixed(2)}
          </span>
          {item.available ? (
            <Link
              to="/order/$itemId"
              params={{ itemId: item.id }}
              data-ocid={`item.order_button.${index + 1}`}
            >
              <Button
                size="sm"
                className="gradient-accent text-primary-foreground border-0 hover:opacity-90 transition-smooth font-body"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Order
              </Button>
            </Link>
          ) : (
            <Button
              size="sm"
              disabled
              className="font-body"
              data-ocid={`item.unavailable_button.${index + 1}`}
            >
              Unavailable
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
