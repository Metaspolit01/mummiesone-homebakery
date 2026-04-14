import { u as useNavigate, d as useAdminAuth, r as reactExports, j as jsxRuntimeExports, e as ue } from "./index-BrrYKXKQ.js";
import { c as createLucideIcon, h as useAdminLogin, B as Button } from "./useBakery-TYl0_4a8.js";
import { I as Input } from "./input-CV3sBkO0.js";
import { L as Label } from "./label-DCXVKviS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7", key: "ztvudi" }],
  ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", key: "1b2hhj" }],
  ["path", { d: "M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4", key: "2ebpfo" }],
  ["path", { d: "M2 7h20", key: "1fcdvo" }],
  [
    "path",
    {
      d: "M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7",
      key: "6c3vgh"
    }
  ]
];
const Store = createLucideIcon("store", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdminAuth();
  const adminLogin = useAdminLogin();
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  if (isAuthenticated) {
    void navigate({ to: "/admin/dashboard" });
    return null;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const token = await adminLogin.mutateAsync({ username, password });
      login(token);
      ue.success("Welcome back, Admin!");
      void navigate({ to: "/admin/dashboard" });
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-16 h-16 rounded-2xl gradient-primary items-center justify-center mb-4 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-8 h-8 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl text-foreground font-bold", children: "Mummies One" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body mt-1", children: "Bakery Admin Panel" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-elevated border border-border p-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5 pb-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground font-body", children: "Secure Login" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => void handleSubmit(e),
          className: "flex flex-col gap-4",
          "data-ocid": "admin_login.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", className: "font-body text-sm", children: "Username" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "username",
                    value: username,
                    onChange: (e) => setUsername(e.target.value),
                    placeholder: "admin",
                    required: true,
                    autoComplete: "username",
                    className: "pl-10 font-body",
                    "data-ocid": "admin_login.username_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "font-body text-sm", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "password",
                    type: "password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    placeholder: "••••••••",
                    required: true,
                    autoComplete: "current-password",
                    className: "pl-10 font-body",
                    "data-ocid": "admin_login.password_input"
                  }
                )
              ] })
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 font-body",
                "data-ocid": "admin_login.error_state",
                children: error
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                size: "lg",
                disabled: adminLogin.isPending,
                className: "gradient-primary text-primary-foreground border-0 font-body w-full mt-1 hover:opacity-90 transition-smooth",
                "data-ocid": "admin_login.submit_button",
                children: adminLogin.isPending ? "Signing in…" : "Sign In"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground text-xs font-body mt-5", children: "Authorized staff only." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-5 font-body", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ".",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "underline hover:text-foreground transition-colors",
          children: "Built with caffeine.ai"
        }
      )
    ] })
  ] }) });
}
export {
  AdminLoginPage as default
};
