import { j as jsxRuntimeExports, c as cn, L as Link } from "./index-BrrYKXKQ.js";
import { S as Slot, d as cva, c as createLucideIcon, B as Button } from "./useBakery-TYl0_4a8.js";
import { T as Tag } from "./tag-CYen8E-y.js";
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode);
function ItemCard({ item, index = 0 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-lg shadow-warm border border-border overflow-hidden flex flex-col transition-smooth hover:shadow-elevated hover:-translate-y-0.5 group",
      "data-ocid": `item.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] bg-muted overflow-hidden", children: [
          item.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.imageUrl,
              alt: item.name,
              className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🎂" }) }),
          !item.available && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-destructive text-destructive-foreground text-xs font-body font-semibold px-3 py-1 rounded-full", children: "Unavailable" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "text-xs font-body bg-card/90 text-foreground border-0",
              "data-ocid": `item.category_badge.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 mr-1" }),
                item.subcategory || item.category
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-4 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-foreground text-base font-semibold leading-snug line-clamp-1", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body leading-relaxed line-clamp-2 flex-1", children: item.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-accent font-bold text-lg", children: [
              "₹",
              item.price.toFixed(2)
            ] }),
            item.available ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/order/$itemId",
                params: { itemId: item.id },
                "data-ocid": `item.order_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "gradient-accent text-primary-foreground border-0 hover:opacity-90 transition-smooth font-body",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 mr-1" }),
                      "Order"
                    ]
                  }
                )
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                disabled: true,
                className: "font-body",
                "data-ocid": `item.unavailable_button.${index + 1}`,
                children: "Unavailable"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ItemCard as I
};
