import { b as useParams, u as useNavigate, r as reactExports, j as jsxRuntimeExports, P as PageLoader } from "./index-BrrYKXKQ.js";
import { E as EmptyState } from "./EmptyState-D_NYXDFa.js";
import { L as Layout, P as Phone, S as ShoppingBag } from "./Layout-DweZArJf.js";
import { c as createLucideIcon, e as useItem, f as useCreateCustomRequest, B as Button, g as usePlaceOrder } from "./useBakery-TYl0_4a8.js";
import { I as Input } from "./input-CV3sBkO0.js";
import { L as Label } from "./label-DCXVKviS.js";
import { T as Textarea } from "./textarea-CZyyUwpd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
function getTomorrowDate() {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}
function formatDateLabel(dateStr) {
  if (!dateStr) return "";
  const d = /* @__PURE__ */ new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function DisclaimerBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "disclaimer.panel",
      className: "flex items-start gap-3 rounded-xl border border-amber-400/40 bg-amber-50 px-4 py-3 text-sm text-amber-800",
      role: "note",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CircleAlert,
          {
            className: "mt-0.5 h-4 w-4 shrink-0 text-amber-600",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Important:" }),
          " Item price only includes product cost.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Delivery charges will be paid separately to Rapido." })
        ] })
      ]
    }
  );
}
function OrderSummary({
  itemName,
  price,
  deliveryType,
  selectedDate,
  isCustom
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "aside",
    {
      "data-ocid": "order.summary.panel",
      className: "rounded-2xl border border-border bg-card p-5 shadow-sm sticky top-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Item" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right text-sm font-medium text-foreground max-w-[60%] break-words", children: itemName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Price" }),
            isCustom ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground italic", children: "TBD by admin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-primary", children: price !== null ? `₹${price.toFixed(2)}` : "—" })
          ] }),
          deliveryType && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Delivery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: deliveryType === "door" ? "Door Delivery" : "Self Pickup" })
          ] }),
          selectedDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground shrink-0", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right text-sm font-medium text-foreground", children: formatDateLabel(selectedDate) })
          ] })
        ] }),
        deliveryType === "door" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "mb-0.5 mr-1 inline h-3 w-3" }),
          "Delivery via Rapido — pay driver directly."
        ] })
      ]
    }
  );
}
function SuccessScreen({
  orderId,
  isCustom
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "order.success_state",
      className: "flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-14 w-14 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: isCustom ? "Custom Request Received!" : "Order Placed Successfully!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isCustom ? "Admin will contact you to discuss details and pricing." : "Your order has been received. We'll confirm shortly." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 px-4 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Order ID: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: orderId })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Redirecting to home in 3 seconds…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "tel:7013386529",
            "data-ocid": "order.call_link",
            className: "flex items-center gap-1.5 text-sm font-medium text-primary hover:underline",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
              "Questions? Call: 7013386529"
            ]
          }
        )
      ]
    }
  );
}
function CustomCakeForm() {
  const navigate = useNavigate();
  const createCustom = useCreateCustomRequest();
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [preferredDate, setPreferredDate] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const [successOrderId, setSuccessOrderId] = reactExports.useState(null);
  const tomorrow = getTomorrowDate();
  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(phone.trim()))
      errs.phone = "Enter a valid 10-digit phone number.";
    if (!description.trim())
      errs.description = "Please describe your custom cake.";
    if (!preferredDate) errs.preferredDate = "Please select a preferred date.";
    return errs;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const input = {
      itemId: "custom",
      itemName: "Custom Cake",
      userName: name.trim(),
      phone: phone.trim(),
      address: "",
      deliveryType: "pickup",
      paymentMethod: "cod",
      deliveryDate: BigInt((/* @__PURE__ */ new Date(`${preferredDate}T00:00:00`)).getTime()) * BigInt(1e6),
      customDescription: description.trim(),
      isCustomRequest: true
    };
    try {
      const order = await createCustom.mutateAsync(input);
      setSuccessOrderId(order.id);
      setTimeout(() => void navigate({ to: "/" }), 3e3);
    } catch {
    }
  }
  if (successOrderId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessScreen, { orderId: successOrderId, isCustom: true });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-5",
      "data-ocid": "custom.form",
      noValidate: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Custom Cake Request" }),
          " — Admin will contact you to discuss details and pricing after reviewing your request."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "custom-name", children: "Your Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "custom-name",
              "data-ocid": "custom.name_input",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Enter your full name",
              "aria-invalid": !!errors.name
            }
          ),
          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "custom.name.field_error",
              className: "text-xs text-destructive",
              children: errors.name
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "custom-phone", children: "Phone Number *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "custom-phone",
              "data-ocid": "custom.phone_input",
              type: "tel",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "10-digit mobile number",
              "aria-invalid": !!errors.phone
            }
          ),
          errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "custom.phone.field_error",
              className: "text-xs text-destructive",
              children: errors.phone
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "custom-desc", children: "Cake Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "custom-desc",
              "data-ocid": "custom.description_textarea",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              placeholder: "Describe your custom cake — size, flavour, design, occasion, any special requests…",
              rows: 4,
              "aria-invalid": !!errors.description
            }
          ),
          errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "custom.description.field_error",
              className: "text-xs text-destructive",
              children: errors.description
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "custom-date", children: "Preferred Date *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "custom-date",
              "data-ocid": "custom.date_input",
              type: "date",
              value: preferredDate,
              min: tomorrow,
              onChange: (e) => setPreferredDate(e.target.value),
              "aria-invalid": !!errors.preferredDate
            }
          ),
          preferredDate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDateLabel(preferredDate) }),
          errors.preferredDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "custom.date.field_error",
              className: "text-xs text-destructive",
              children: errors.preferredDate
            }
          )
        ] }),
        createCustom.isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            "data-ocid": "custom.error_state",
            className: "rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive",
            children: [
              "Something went wrong. Please try again or call us at",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:7013386529", className: "font-semibold underline", children: "7013386529" }),
              "."
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            "data-ocid": "custom.submit_button",
            className: "w-full",
            disabled: createCustom.isPending,
            size: "lg",
            children: createCustom.isPending ? "Submitting…" : "Submit Custom Request"
          }
        )
      ]
    }
  );
}
function RegularOrderForm({
  itemId,
  itemName,
  price,
  onDeliveryTypeChange,
  onDateChange
}) {
  const navigate = useNavigate();
  const placeOrder = usePlaceOrder();
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [deliveryType, setDeliveryType] = reactExports.useState("pickup");
  const [address, setAddress] = reactExports.useState("");
  const [deliveryDate, setDeliveryDate] = reactExports.useState("");
  const [paymentMethod, setPaymentMethod] = reactExports.useState("upi");
  const [errors, setErrors] = reactExports.useState({});
  const [successOrderId, setSuccessOrderId] = reactExports.useState(null);
  const tomorrow = getTomorrowDate();
  function handleDeliveryChange(type) {
    setDeliveryType(type);
    onDeliveryTypeChange(type);
  }
  function handleDateChange(date) {
    setDeliveryDate(date);
    onDateChange(date);
  }
  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(phone.trim()))
      errs.phone = "Enter a valid 10-digit phone number.";
    if (deliveryType === "door" && !address.trim())
      errs.address = "Address is required for door delivery.";
    if (!deliveryDate) errs.deliveryDate = "Please select a delivery date.";
    return errs;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const effectivePayment = deliveryType === "door" ? "rapido" : paymentMethod;
    const input = {
      itemId,
      itemName,
      userName: name.trim(),
      phone: phone.trim(),
      address: deliveryType === "door" ? address.trim() : "",
      deliveryType,
      paymentMethod: effectivePayment,
      deliveryDate: BigInt((/* @__PURE__ */ new Date(`${deliveryDate}T00:00:00`)).getTime()) * BigInt(1e6),
      customDescription: "",
      isCustomRequest: false
    };
    try {
      const order = await placeOrder.mutateAsync(input);
      setSuccessOrderId(order.id);
      setTimeout(() => void navigate({ to: "/" }), 3e3);
    } catch {
    }
  }
  if (successOrderId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessScreen, { orderId: successOrderId, isCustom: false });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DisclaimerBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "space-y-5",
        "data-ocid": "order.form",
        noValidate: true,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Your Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "name",
                "data-ocid": "order.name_input",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Enter your full name",
                "aria-invalid": !!errors.name
              }
            ),
            errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "order.name.field_error",
                className: "text-xs text-destructive",
                children: errors.name
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "phone",
                "data-ocid": "order.phone_input",
                type: "tel",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                placeholder: "10-digit mobile number",
                "aria-invalid": !!errors.phone
              }
            ),
            errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "order.phone.field_error",
                className: "text-xs text-destructive",
                children: errors.phone
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-sm font-medium text-foreground", children: "Delivery Type *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
              {
                value: "pickup",
                label: "Self Pickup",
                sub: "UPI or Cash on Delivery",
                Icon: ShoppingBag
              },
              {
                value: "door",
                label: "Door Delivery",
                sub: "Via Rapido (charges extra)",
                Icon: Truck
              }
            ].map(({ value, label, sub, Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                "data-ocid": `order.delivery_${value}.radio`,
                className: `flex cursor-pointer items-start gap-3 rounded-xl border-2 px-4 py-3 transition-colors ${deliveryType === value ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "deliveryType",
                      value,
                      checked: deliveryType === value,
                      onChange: () => handleDeliveryChange(value),
                      className: "sr-only"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: sub })
                  ] })
                ]
              },
              value
            )) })
          ] }),
          deliveryType === "door" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", "data-ocid": "order.address.panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", children: "Delivery Address *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "address",
                "data-ocid": "order.address_textarea",
                value: address,
                onChange: (e) => setAddress(e.target.value),
                placeholder: "House/flat no., street, landmark, area, city",
                rows: 3,
                "aria-invalid": !!errors.address
              }
            ),
            errors.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "order.address.field_error",
                className: "text-xs text-destructive",
                children: errors.address
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "date", children: [
              deliveryType === "door" ? "Delivery" : "Pickup",
              " Date *",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(minimum 1 day advance)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "date",
                "data-ocid": "order.date_input",
                type: "date",
                value: deliveryDate,
                min: tomorrow,
                onChange: (e) => handleDateChange(e.target.value),
                "aria-invalid": !!errors.deliveryDate
              }
            ),
            deliveryDate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDateLabel(deliveryDate) }),
            errors.deliveryDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "order.date.field_error",
                className: "text-xs text-destructive",
                children: errors.deliveryDate
              }
            )
          ] }),
          deliveryType === "door" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "order.rapido.panel",
              className: "flex items-start gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Payment via Rapido" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-muted-foreground", children: "Pay Rapido driver separately for delivery charges. Item cost collected on delivery by our team." })
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-sm font-medium text-foreground", children: "Payment Method *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
              {
                value: "upi",
                label: "UPI",
                sub: "UPI ID: upi@bakery"
              },
              {
                value: "cod",
                label: "Pay on Delivery",
                sub: "Cash at pickup"
              }
            ].map(({ value, label, sub }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                "data-ocid": `order.payment_${value}.radio`,
                className: `flex cursor-pointer flex-col gap-0.5 rounded-xl border-2 px-4 py-3 transition-colors ${paymentMethod === value ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "paymentMethod",
                      value,
                      checked: paymentMethod === value,
                      onChange: () => setPaymentMethod(value),
                      className: "sr-only"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: sub })
                ]
              },
              value
            )) })
          ] }),
          placeOrder.isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              "data-ocid": "order.error_state",
              className: "rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive",
              children: [
                "Something went wrong. Please try again or call",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:7013386529", className: "font-semibold underline", children: "7013386529" }),
                "."
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              "data-ocid": "order.submit_button",
              className: "w-full",
              disabled: placeOrder.isPending,
              size: "lg",
              children: placeOrder.isPending ? "Placing Order…" : `Place Order — ₹${price.toFixed(2)}`
            }
          )
        ]
      }
    )
  ] });
}
function OrderPage() {
  const { itemId } = useParams({ from: "/order/$itemId" });
  const navigate = useNavigate();
  const isCustom = itemId === "custom";
  const { data: item, isLoading } = useItem(isCustom ? "" : itemId);
  const [sidebarDelivery, setSidebarDelivery] = reactExports.useState("pickup");
  const [sidebarDate, setSidebarDate] = reactExports.useState("");
  if (!isCustom && isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex min-h-[50vh] items-center justify-center",
        "data-ocid": "order.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {})
      }
    ) });
  }
  if (!isCustom && !item) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "🔍",
        title: "Item not found",
        description: "This item may no longer be available.",
        action: { label: "Browse Menu", href: "/products" }
      }
    ) });
  }
  const itemName = isCustom ? "Custom Cake" : (item == null ? void 0 : item.name) ?? "Unknown Item";
  const itemPrice = isCustom ? null : (item == null ? void 0 : item.price) ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => void navigate({ to: "/products" }),
        "data-ocid": "order.back_button",
        className: "mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          "Back to Products"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1fr_280px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: isCustom ? "Custom Cake Request" : "Place Your Order" }),
          !isCustom && item && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            "Ordering:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: item.name }),
            itemPrice !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 font-semibold text-primary", children: [
              "₹",
              itemPrice.toFixed(2)
            ] })
          ] })
        ] }),
        isCustom ? /* @__PURE__ */ jsxRuntimeExports.jsx(CustomCakeForm, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          RegularOrderForm,
          {
            itemId,
            itemName,
            price: itemPrice ?? 0,
            onDeliveryTypeChange: setSidebarDelivery,
            onDateChange: setSidebarDate
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OrderSummary,
          {
            itemName,
            price: itemPrice,
            deliveryType: sidebarDelivery,
            selectedDate: sidebarDate,
            isCustom
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "Need help with your order?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "tel:7013386529",
              "data-ocid": "order.call_button",
              className: "flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
                "Call: 7013386529"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
export {
  OrderPage as default
};
