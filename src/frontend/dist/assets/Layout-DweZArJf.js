import { i as useRouterState, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BrrYKXKQ.js";
import { c as createLucideIcon } from "./useBakery-TYl0_4a8.js";
function useLocation(opts) {
  return useRouterState({
    select: (state) => state.location
  });
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function BakeryLogo({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 48 48",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "24", cy: "14", r: "9", fill: "currentColor", opacity: "0.9" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "24", cy: "7", rx: "7", ry: "5", fill: "currentColor", opacity: "0.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "17",
            y: "5",
            width: "14",
            height: "3",
            rx: "1.5",
            fill: "currentColor",
            opacity: "0.6"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M14 26 Q14 22 24 22 Q34 22 34 26 L32 42 Q28 44 24 44 Q20 44 16 42 Z",
            fill: "currentColor",
            opacity: "0.75"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: "11",
            cy: "30",
            rx: "4",
            ry: "2.5",
            fill: "currentColor",
            opacity: "0.65"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: "37",
            cy: "30",
            rx: "4",
            ry: "2.5",
            fill: "currentColor",
            opacity: "0.65"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "16",
            y: "30",
            width: "16",
            height: "6",
            rx: "2",
            fill: "white",
            opacity: "0.9"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "18",
            y: "28",
            width: "12",
            height: "4",
            rx: "2",
            fill: "white",
            opacity: "0.85"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "23",
            y: "24",
            width: "2",
            height: "5",
            rx: "1",
            fill: "oklch(0.62 0.18 72)",
            opacity: "0.9"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: "24",
            cy: "24",
            rx: "1.5",
            ry: "2",
            fill: "oklch(0.85 0.18 72)",
            opacity: "0.9"
          }
        )
      ]
    }
  );
}
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Menu" }
];
function Layout({ children, hideNav = false }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    !hideNav && /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "gradient-primary shadow-elevated sticky top-0 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-16 md:h-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-3 group",
            "data-ocid": "nav.home_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 md:w-12 md:h-12 text-primary-foreground flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BakeryLogo, { className: "w-full h-full" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col leading-tight", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl md:text-2xl text-primary-foreground font-semibold tracking-tight", children: "Mummies One" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/70 text-xs tracking-widest uppercase font-body", children: "Homemade Bakery" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-1", children: [
          NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: link.href,
              "data-ocid": `nav.${link.label.toLowerCase()}_link`,
              className: `px-4 py-2 rounded-md text-sm font-body font-medium transition-smooth ${location.pathname === link.href ? "bg-primary-foreground/20 text-primary-foreground" : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"}`,
              children: link.label
            },
            link.href
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#contact",
              "data-ocid": "nav.contact_link",
              className: "px-4 py-2 rounded-md text-sm font-body font-medium transition-smooth text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
              children: "Contact"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "tel:7013386529",
              "data-ocid": "nav.call_button",
              className: "ml-2 flex items-center gap-2 px-4 py-2 rounded-md gradient-accent text-primary-foreground text-sm font-body font-medium transition-smooth hover:shadow-warm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                "Call Us"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "md:hidden text-primary-foreground p-2 rounded-md hover:bg-primary-foreground/10 transition-smooth",
            onClick: () => setMenuOpen(!menuOpen),
            "aria-label": menuOpen ? "Close menu" : "Open menu",
            "data-ocid": "nav.mobile_menu_toggle",
            children: menuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-6 h-6" })
          }
        )
      ] }),
      menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden pb-4 flex flex-col gap-1", children: [
        NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: link.href,
            onClick: () => setMenuOpen(false),
            "data-ocid": `nav.mobile_${link.label.toLowerCase()}_link`,
            className: `px-4 py-3 rounded-md text-sm font-body font-medium transition-smooth ${location.pathname === link.href ? "bg-primary-foreground/20 text-primary-foreground" : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"}`,
            children: link.label
          },
          link.href
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#contact",
            "data-ocid": "nav.mobile_contact_link",
            className: "px-4 py-3 rounded-md text-sm font-body font-medium transition-smooth text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
            children: "Contact"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "tel:7013386529",
            "data-ocid": "nav.mobile_call_button",
            className: "flex items-center gap-2 px-4 py-3 rounded-md gradient-accent text-primary-foreground text-sm font-body font-medium",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
              "Call: 7013386529"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    !hideNav && /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-muted/40 border-t border-border mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BakeryLogo, { className: "w-full h-full" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg text-foreground font-semibold", children: "Mummies One" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body leading-relaxed", children: "Homemade with love. Every bite tells a story." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-foreground font-semibold text-sm uppercase tracking-wider mb-1", children: "Quick Links" }),
          NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: link.href,
              className: "text-muted-foreground text-sm font-body hover:text-foreground transition-smooth",
              children: link.label
            },
            link.href
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-foreground font-semibold text-sm uppercase tracking-wider mb-1", children: "Contact Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "tel:7013386529",
              className: "flex items-center gap-2 text-accent font-body text-sm hover:text-accent/80 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 flex-shrink-0" }),
                "7013386529"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 flex-shrink-0" }),
            "Orders by advance booking only"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "© ",
          year,
          " Mummies One Homemade Bakery. All rights reserved."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary hover:underline",
              children: "caffeine.ai"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Layout as L,
  Phone as P,
  ShoppingBag as S,
  X
};
