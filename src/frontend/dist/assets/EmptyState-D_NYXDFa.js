import { j as jsxRuntimeExports, L as Link, c as cn } from "./index-BrrYKXKQ.js";
import { B as Button } from "./useBakery-TYl0_4a8.js";
function EmptyState({
  icon,
  title,
  description,
  action,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
        className
      ),
      "data-ocid": "empty_state",
      children: [
        icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-2", children: icon }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "🎂" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-foreground text-xl font-semibold", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body max-w-xs leading-relaxed", children: description }),
        action && (action.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: action.href, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "gradient-accent text-primary-foreground border-0 mt-2 font-body",
            "data-ocid": "empty_state.action_button",
            children: action.label
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: action.onClick,
            className: "gradient-accent text-primary-foreground border-0 mt-2 font-body",
            "data-ocid": "empty_state.action_button",
            children: action.label
          }
        ))
      ]
    }
  );
}
export {
  EmptyState as E
};
