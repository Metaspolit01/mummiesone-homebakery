import { EmptyState } from "@/components/EmptyState";
import { Layout } from "@/components/Layout";
import { PageLoader } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateCustomRequest,
  useItem,
  usePlaceOrder,
} from "@/hooks/useBakery";
import type { OrderInput } from "@/types/bakery";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState } from "react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function formatDateLabel(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Disclaimer Banner ────────────────────────────────────────────────────────

function DisclaimerBanner() {
  return (
    <div
      data-ocid="disclaimer.panel"
      className="flex items-start gap-3 rounded-xl border border-amber-400/40 bg-amber-50 px-4 py-3 text-sm text-amber-800"
      role="note"
    >
      <AlertCircle
        className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
        aria-hidden="true"
      />
      <p>
        <strong>Important:</strong> Item price only includes product cost.{" "}
        <span className="font-semibold">
          Delivery charges will be paid separately to Rapido.
        </span>
      </p>
    </div>
  );
}

// ─── Order Summary Sidebar ────────────────────────────────────────────────────

interface SummaryProps {
  itemName: string;
  price: number | null;
  deliveryType: string;
  selectedDate: string;
  isCustom: boolean;
}

function OrderSummary({
  itemName,
  price,
  deliveryType,
  selectedDate,
  isCustom,
}: SummaryProps) {
  return (
    <aside
      data-ocid="order.summary.panel"
      className="rounded-2xl border border-border bg-card p-5 shadow-sm sticky top-4"
    >
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Order Summary
      </h3>
      <div className="divide-y divide-border">
        <div className="flex justify-between gap-2 py-2.5">
          <span className="text-sm text-muted-foreground">Item</span>
          <span className="text-right text-sm font-medium text-foreground max-w-[60%] break-words">
            {itemName}
          </span>
        </div>
        <div className="flex justify-between gap-2 py-2.5">
          <span className="text-sm text-muted-foreground">Price</span>
          {isCustom ? (
            <span className="text-sm text-muted-foreground italic">
              TBD by admin
            </span>
          ) : (
            <span className="text-sm font-semibold text-primary">
              {price !== null ? `₹${price.toFixed(2)}` : "—"}
            </span>
          )}
        </div>
        {deliveryType && (
          <div className="flex justify-between gap-2 py-2.5">
            <span className="text-sm text-muted-foreground">Delivery</span>
            <span className="text-sm font-medium text-foreground">
              {deliveryType === "door" ? "Door Delivery" : "Self Pickup"}
            </span>
          </div>
        )}
        {selectedDate && (
          <div className="flex justify-between gap-2 py-2.5">
            <span className="text-sm text-muted-foreground shrink-0">Date</span>
            <span className="text-right text-sm font-medium text-foreground">
              {formatDateLabel(selectedDate)}
            </span>
          </div>
        )}
      </div>
      {deliveryType === "door" && (
        <p className="mt-4 rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
          <Truck className="mb-0.5 mr-1 inline h-3 w-3" />
          Delivery via Rapido — pay driver directly.
        </p>
      )}
    </aside>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({
  orderId,
  isCustom,
}: {
  orderId: string;
  isCustom: boolean;
}) {
  return (
    <div
      data-ocid="order.success_state"
      className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
    >
      <CheckCircle2 className="h-14 w-14 text-primary" />
      <div>
        <h2 className="text-xl font-bold text-foreground">
          {isCustom ? "Custom Request Received!" : "Order Placed Successfully!"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isCustom
            ? "Admin will contact you to discuss details and pricing."
            : "Your order has been received. We'll confirm shortly."}
        </p>
      </div>
      <div className="rounded-lg bg-muted/50 px-4 py-2 text-sm">
        <span className="text-muted-foreground">Order ID: </span>
        <span className="font-mono font-semibold text-foreground">
          {orderId}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        Redirecting to home in 3 seconds…
      </p>
      <a
        href="tel:7013386529"
        data-ocid="order.call_link"
        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <Phone className="h-4 w-4" />
        Questions? Call: 7013386529
      </a>
    </div>
  );
}

// ─── Custom Cake Form ─────────────────────────────────────────────────────────

function CustomCakeForm() {
  const navigate = useNavigate();
  const createCustom = useCreateCustomRequest();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);

  const tomorrow = getTomorrowDate();

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(phone.trim()))
      errs.phone = "Enter a valid 10-digit phone number.";
    if (!description.trim())
      errs.description = "Please describe your custom cake.";
    if (!preferredDate) errs.preferredDate = "Please select a preferred date.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const input: OrderInput = {
      itemId: "custom",
      itemName: "Custom Cake",
      userName: name.trim(),
      phone: phone.trim(),
      address: "",
      deliveryType: "pickup",
      paymentMethod: "cod",
      deliveryDate:
        BigInt(new Date(`${preferredDate}T00:00:00`).getTime()) *
        BigInt(1_000_000),
      customDescription: description.trim(),
      isCustomRequest: true,
    };

    try {
      const order = await createCustom.mutateAsync(input);
      setSuccessOrderId(order.id);
      setTimeout(() => void navigate({ to: "/" }), 3000);
    } catch {
      // error shown via createCustom.isError
    }
  }

  if (successOrderId) {
    return <SuccessScreen orderId={successOrderId} isCustom />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="custom.form"
      noValidate
    >
      <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
        <strong>Custom Cake Request</strong> — Admin will contact you to discuss
        details and pricing after reviewing your request.
      </div>

      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="custom-name">Your Name *</Label>
        <Input
          id="custom-name"
          data-ocid="custom.name_input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p
            data-ocid="custom.name.field_error"
            className="text-xs text-destructive"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="custom-phone">Phone Number *</Label>
        <Input
          id="custom-phone"
          data-ocid="custom.phone_input"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="10-digit mobile number"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p
            data-ocid="custom.phone.field_error"
            className="text-xs text-destructive"
          >
            {errors.phone}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="custom-desc">Cake Description *</Label>
        <Textarea
          id="custom-desc"
          data-ocid="custom.description_textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your custom cake — size, flavour, design, occasion, any special requests…"
          rows={4}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p
            data-ocid="custom.description.field_error"
            className="text-xs text-destructive"
          >
            {errors.description}
          </p>
        )}
      </div>

      {/* Preferred Date */}
      <div className="space-y-1.5">
        <Label htmlFor="custom-date">Preferred Date *</Label>
        <Input
          id="custom-date"
          data-ocid="custom.date_input"
          type="date"
          value={preferredDate}
          min={tomorrow}
          onChange={(e) => setPreferredDate(e.target.value)}
          aria-invalid={!!errors.preferredDate}
        />
        {preferredDate && (
          <p className="text-xs text-muted-foreground">
            {formatDateLabel(preferredDate)}
          </p>
        )}
        {errors.preferredDate && (
          <p
            data-ocid="custom.date.field_error"
            className="text-xs text-destructive"
          >
            {errors.preferredDate}
          </p>
        )}
      </div>

      {createCustom.isError && (
        <p
          data-ocid="custom.error_state"
          className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          Something went wrong. Please try again or call us at{" "}
          <a href="tel:7013386529" className="font-semibold underline">
            7013386529
          </a>
          .
        </p>
      )}

      <Button
        type="submit"
        data-ocid="custom.submit_button"
        className="w-full"
        disabled={createCustom.isPending}
        size="lg"
      >
        {createCustom.isPending ? "Submitting…" : "Submit Custom Request"}
      </Button>
    </form>
  );
}

// ─── Regular Order Form ───────────────────────────────────────────────────────

interface RegularFormProps {
  itemId: string;
  itemName: string;
  price: number;
  onDeliveryTypeChange: (type: string) => void;
  onDateChange: (date: string) => void;
}

function RegularOrderForm({
  itemId,
  itemName,
  price,
  onDeliveryTypeChange,
  onDateChange,
}: RegularFormProps) {
  const navigate = useNavigate();
  const placeOrder = usePlaceOrder();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState<"pickup" | "door">("pickup");
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);

  const tomorrow = getTomorrowDate();

  function handleDeliveryChange(type: "pickup" | "door") {
    setDeliveryType(type);
    onDeliveryTypeChange(type);
  }

  function handleDateChange(date: string) {
    setDeliveryDate(date);
    onDateChange(date);
  }

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(phone.trim()))
      errs.phone = "Enter a valid 10-digit phone number.";
    if (deliveryType === "door" && !address.trim())
      errs.address = "Address is required for door delivery.";
    if (!deliveryDate) errs.deliveryDate = "Please select a delivery date.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const effectivePayment = deliveryType === "door" ? "rapido" : paymentMethod;

    const input: OrderInput = {
      itemId,
      itemName,
      userName: name.trim(),
      phone: phone.trim(),
      address: deliveryType === "door" ? address.trim() : "",
      deliveryType,
      paymentMethod: effectivePayment,
      deliveryDate:
        BigInt(new Date(`${deliveryDate}T00:00:00`).getTime()) *
        BigInt(1_000_000),
      customDescription: "",
      isCustomRequest: false,
    };

    try {
      const order = await placeOrder.mutateAsync(input);
      setSuccessOrderId(order.id);
      setTimeout(() => void navigate({ to: "/" }), 3000);
    } catch {
      // error shown via placeOrder.isError
    }
  }

  if (successOrderId) {
    return <SuccessScreen orderId={successOrderId} isCustom={false} />;
  }

  return (
    <div className="space-y-6">
      <DisclaimerBanner />

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        data-ocid="order.form"
        noValidate
      >
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name">Your Name *</Label>
          <Input
            id="name"
            data-ocid="order.name_input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p
              data-ocid="order.name.field_error"
              className="text-xs text-destructive"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            data-ocid="order.phone_input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p
              data-ocid="order.phone.field_error"
              className="text-xs text-destructive"
            >
              {errors.phone}
            </p>
          )}
        </div>

        {/* Delivery Type */}
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-foreground">
            Delivery Type *
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                {
                  value: "pickup",
                  label: "Self Pickup",
                  sub: "UPI or Cash on Delivery",
                  Icon: ShoppingBag,
                },
                {
                  value: "door",
                  label: "Door Delivery",
                  sub: "Via Rapido (charges extra)",
                  Icon: Truck,
                },
              ] as const
            ).map(({ value, label, sub, Icon }) => (
              <label
                key={value}
                data-ocid={`order.delivery_${value}.radio`}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 px-4 py-3 transition-colors ${
                  deliveryType === value
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <input
                  type="radio"
                  name="deliveryType"
                  value={value}
                  checked={deliveryType === value}
                  onChange={() => handleDeliveryChange(value)}
                  className="sr-only"
                />
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Address — door delivery only */}
        {deliveryType === "door" && (
          <div className="space-y-1.5" data-ocid="order.address.panel">
            <Label htmlFor="address">Delivery Address *</Label>
            <Textarea
              id="address"
              data-ocid="order.address_textarea"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House/flat no., street, landmark, area, city"
              rows={3}
              aria-invalid={!!errors.address}
            />
            {errors.address && (
              <p
                data-ocid="order.address.field_error"
                className="text-xs text-destructive"
              >
                {errors.address}
              </p>
            )}
          </div>
        )}

        {/* Date */}
        <div className="space-y-1.5">
          <Label htmlFor="date">
            {deliveryType === "door" ? "Delivery" : "Pickup"} Date *{" "}
            <span className="font-normal text-muted-foreground">
              (minimum 1 day advance)
            </span>
          </Label>
          <Input
            id="date"
            data-ocid="order.date_input"
            type="date"
            value={deliveryDate}
            min={tomorrow}
            onChange={(e) => handleDateChange(e.target.value)}
            aria-invalid={!!errors.deliveryDate}
          />
          {deliveryDate && (
            <p className="text-xs text-muted-foreground">
              {formatDateLabel(deliveryDate)}
            </p>
          )}
          {errors.deliveryDate && (
            <p
              data-ocid="order.date.field_error"
              className="text-xs text-destructive"
            >
              {errors.deliveryDate}
            </p>
          )}
        </div>

        {/* Payment */}
        {deliveryType === "door" ? (
          <div
            data-ocid="order.rapido.panel"
            className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm"
          >
            <Truck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Payment via Rapido</p>
              <p className="mt-0.5 text-muted-foreground">
                Pay Rapido driver separately for delivery charges. Item cost
                collected on delivery by our team.
              </p>
            </div>
          </div>
        ) : (
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-foreground">
              Payment Method *
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  {
                    value: "upi",
                    label: "UPI",
                    sub: "UPI ID: upi@bakery",
                  },
                  {
                    value: "cod",
                    label: "Pay on Delivery",
                    sub: "Cash at pickup",
                  },
                ] as const
              ).map(({ value, label, sub }) => (
                <label
                  key={value}
                  data-ocid={`order.payment_${value}.radio`}
                  className={`flex cursor-pointer flex-col gap-0.5 rounded-xl border-2 px-4 py-3 transition-colors ${
                    paymentMethod === value
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={() => setPaymentMethod(value)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                  <span className="text-xs text-muted-foreground">{sub}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {placeOrder.isError && (
          <p
            data-ocid="order.error_state"
            className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            Something went wrong. Please try again or call{" "}
            <a href="tel:7013386529" className="font-semibold underline">
              7013386529
            </a>
            .
          </p>
        )}

        <Button
          type="submit"
          data-ocid="order.submit_button"
          className="w-full"
          disabled={placeOrder.isPending}
          size="lg"
        >
          {placeOrder.isPending
            ? "Placing Order…"
            : `Place Order — ₹${price.toFixed(2)}`}
        </Button>
      </form>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderPage() {
  const { itemId } = useParams({ from: "/order/$itemId" });
  const navigate = useNavigate();
  const isCustom = itemId === "custom";

  const { data: item, isLoading } = useItem(isCustom ? "" : itemId);

  // Sidebar sync state
  const [sidebarDelivery, setSidebarDelivery] = useState("pickup");
  const [sidebarDate, setSidebarDate] = useState("");

  if (!isCustom && isLoading) {
    return (
      <Layout>
        <div
          className="flex min-h-[50vh] items-center justify-center"
          data-ocid="order.loading_state"
        >
          <PageLoader />
        </div>
      </Layout>
    );
  }

  if (!isCustom && !item) {
    return (
      <Layout>
        <EmptyState
          icon="🔍"
          title="Item not found"
          description="This item may no longer be available."
          action={{ label: "Browse Menu", href: "/products" }}
        />
      </Layout>
    );
  }

  const itemName = isCustom ? "Custom Cake" : (item?.name ?? "Unknown Item");
  const itemPrice = isCustom ? null : (item?.price ?? null);

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back nav */}
        <button
          type="button"
          onClick={() => void navigate({ to: "/products" })}
          data-ocid="order.back_button"
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </button>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* Main form column */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {isCustom ? "Custom Cake Request" : "Place Your Order"}
              </h1>
              {!isCustom && item && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Ordering:{" "}
                  <span className="font-medium text-foreground">
                    {item.name}
                  </span>
                  {itemPrice !== null && (
                    <span className="ml-2 font-semibold text-primary">
                      ₹{itemPrice.toFixed(2)}
                    </span>
                  )}
                </p>
              )}
            </div>

            {isCustom ? (
              <CustomCakeForm />
            ) : (
              <RegularOrderForm
                itemId={itemId}
                itemName={itemName}
                price={itemPrice ?? 0}
                onDeliveryTypeChange={setSidebarDelivery}
                onDateChange={setSidebarDate}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <OrderSummary
              itemName={itemName}
              price={itemPrice}
              deliveryType={sidebarDelivery}
              selectedDate={sidebarDate}
              isCustom={isCustom}
            />

            {/* Call CTA */}
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <p className="mb-3 text-xs text-muted-foreground">
                Need help with your order?
              </p>
              <a
                href="tel:7013386529"
                data-ocid="order.call_button"
                className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <Phone className="h-4 w-4" />
                Call: 7013386529
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
