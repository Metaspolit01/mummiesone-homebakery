import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "../api/items";
import type { Item, OrderInput } from "../types/bakery";
import LoadingSpinner from "../components/LoadingSpinner";
import { contact } from "../config/contact";

function getMinDeliveryDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

function formatItemSizeLabel(item: Item): string | null {
  const kg = item.KG ?? item.kg;
  if (typeof kg === "number" && Number.isFinite(kg) && kg > 0) return `${kg} kg`;

  const gm = item.gm;
  if (typeof gm === "number" && Number.isFinite(gm) && gm > 0) return `${gm} gm`;

  const jar = item.jar;
  if (typeof jar === "number" && Number.isFinite(jar) && jar > 0)
    return `${jar} ${jar === 1 ? "jar" : "jars"}`;

  const pieces = item.pieces ?? item.piece ?? item.pieace;
  if (typeof pieces === "number" && Number.isFinite(pieces) && pieces > 0)
    return `${pieces} ${pieces === 1 ? "piece" : "pcs"}`;

  return null;
}

export default function Order() {
  const { itemId } = useParams<{ itemId: string }>();

  const [form, setForm] = useState<Omit<OrderInput, "itemId" | "itemName">>({
    userName: "",
    phone: "",
    address: "",
    deliveryType: "pickup",
    paymentMethod: "COD",
    deliveryDate: getMinDeliveryDate(),
    customDescription: "",
  });

  const [success, setSuccess] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);

  const { data: item, isLoading, isError } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getItem(itemId!),
    enabled: !!itemId,
  });

  const sizeLabel = item ? formatItemSizeLabel(item) : null;

  function buildWhatsAppMessage(
    input: OrderInput,
    price: number,
    sizeLabel?: string | null,
  ): string {
    const lines: string[] = [];
    lines.push("Hi Mummies One 👋");
    lines.push("");
    lines.push("I would like to place an order:");
    lines.push(`• Item: ${input.itemName}`);
    if (sizeLabel) {
      lines.push(`• Size: ${sizeLabel}`);
    }
    lines.push(`• Price: ₹${price}`);
    lines.push(`• Delivery: ${input.deliveryType === "pickup" ? "Self Pickup" : "Door Delivery"}`);
    lines.push(`• Delivery date: ${input.deliveryDate}`);
    lines.push(`• Payment: ${input.paymentMethod}`);
    lines.push("");
    lines.push("Customer details:");
    lines.push(`• Name: ${input.userName}`);
    lines.push(`• Phone: ${input.phone}`);
    if (input.deliveryType === "door") {
      lines.push(`• Address: ${input.address ?? ""}`);
    }
    if (input.customDescription?.trim()) {
      lines.push(`• Instructions: ${input.customDescription.trim()}`);
    }
    return lines.join("\n");
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!item) return;
    const input: OrderInput = {
      itemId: item._id,
      itemName: item.name,
      ...form,
    };

    const message = buildWhatsAppMessage(input, item.price, formatItemSizeLabel(item));
    const url = `https://wa.me/${contact.whatsAppNumberE164}?text=${encodeURIComponent(message)}`;
    setWhatsAppUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSuccess(true);
  }

  if (isLoading) return <LoadingSpinner message="Loading item details..." />;

  if (isError || !item) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">😔</p>
        <h2
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "Fraunces, serif", color: "oklch(0.18 0.02 130)" }}
        >
          Item not found
        </h2>
        <Link
          to="/products"
          className="text-sm font-medium"
          style={{ color: "oklch(0.30 0.12 130)" }}
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div
        data-ocid="order.success_state"
        className="max-w-lg mx-auto px-4 py-20 text-center"
      >
        <div className="text-6xl mb-6">🎉</div>
        <h2
          className="text-3xl font-bold mb-3"
          style={{ fontFamily: "Fraunces, serif", color: "oklch(0.18 0.02 130)" }}
        >
          Ready on WhatsApp
        </h2>
        <p className="mb-2" style={{ color: "oklch(0.35 0.04 130)" }}>
          We opened WhatsApp with your order details for <strong>{item.name}</strong>.
        </p>
        <p className="mb-8 text-sm" style={{ color: "oklch(0.45 0.04 130)" }}>
          Just tap <strong>Send</strong> in WhatsApp to confirm your order. You can also call us at{" "}
          <a
            href={contact.phoneTelHref}
            style={{ color: "oklch(0.25 0.10 130)" }}
          >
            {contact.phoneDisplay}
          </a>{" "}
          for any questions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {whatsAppUrl && (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl text-sm font-medium"
              style={{
                backgroundColor: "oklch(0.22 0.10 130)",
                color: "oklch(0.95 0.04 130)",
                textDecoration: "none",
              }}
            >
              Open WhatsApp
            </a>
          )}
          <Link
            to="/products"
            className="px-6 py-3 rounded-xl text-sm font-medium"
            style={{
              backgroundColor: "oklch(0.72 0.15 130)",
              color: "oklch(0.15 0.03 130)",
              textDecoration: "none",
            }}
          >
            Browse More
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl text-sm font-medium border"
            style={{
              backgroundColor: "transparent",
              borderColor: "oklch(0.80 0.08 130)",
              color: "oklch(0.30 0.06 130)",
              textDecoration: "none",
            }}
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Back */}
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6"
        style={{ color: "oklch(0.30 0.12 130)", textDecoration: "none" }}
        data-ocid="order.back_link"
      >
        ← Back to Products
      </Link>

      {/* Item summary */}
      <div
        className="flex items-center gap-4 p-4 rounded-2xl mb-8 border"
        style={{
          backgroundColor: "oklch(0.99 0.005 130)",
          borderColor: "oklch(0.88 0.05 130)",
          boxShadow: "0 2px 8px -2px rgb(0 0 0 / 0.06)",
        }}
      >
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden"
          style={{ backgroundColor: "oklch(0.88 0.10 130)" }}
        >
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>🧁</span>
          )}
        </div>
        <div className="min-w-0">
          <h2
            className="font-bold text-lg leading-tight"
            style={{ fontFamily: "Fraunces, serif", color: "oklch(0.18 0.02 130)" }}
          >
            {item.name}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "oklch(0.45 0.04 130)" }}>
            {item.category}
            {item.subcategory ? ` · ${item.subcategory}` : ""}
            {sizeLabel ? ` · ${sizeLabel}` : ""}
          </p>
          <p
            className="text-xl font-bold mt-1"
            style={{ fontFamily: "Fraunces, serif", color: "oklch(0.22 0.10 130)" }}
          >
            ₹{item.price}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div
        className="flex items-start gap-2 p-4 rounded-xl mb-8 text-sm border"
        style={{
          backgroundColor: "oklch(0.95 0.05 80)",
          borderColor: "oklch(0.88 0.08 80)",
          color: "oklch(0.35 0.08 80)",
        }}
      >
        <span className="mt-0.5 flex-shrink-0">⚠️</span>
        <p>
          <strong>Note:</strong> Item price only includes product cost. Delivery charges will be paid separately to Rapido.
        </p>
      </div>

      {/* Order Form */}
      <form
        onSubmit={handleSubmit}
        data-ocid="order.form"
        className="space-y-5"
      >
        <h3
          className="text-xl font-bold"
          style={{ fontFamily: "Fraunces, serif", color: "oklch(0.18 0.02 130)" }}
        >
          Your Details
        </h3>

        {/* Name */}
        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "oklch(0.28 0.04 130)" }}
          >
            Full Name *
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            required
            value={form.userName}
            onChange={handleChange}
            placeholder="Your name"
            data-ocid="order.name_input"
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200"
            style={{
              backgroundColor: "oklch(0.99 0.005 130)",
              border: "1.5px solid oklch(0.85 0.06 130)",
              color: "oklch(0.18 0.02 130)",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "oklch(0.60 0.15 130)";
              (e.currentTarget as HTMLInputElement).style.boxShadow =
                "0 0 0 3px oklch(0.72 0.15 130 / 0.20)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "oklch(0.85 0.06 130)";
              (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
            }}
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "oklch(0.28 0.04 130)" }}
          >
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            data-ocid="order.phone_input"
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200"
            style={{
              backgroundColor: "oklch(0.99 0.005 130)",
              border: "1.5px solid oklch(0.85 0.06 130)",
              color: "oklch(0.18 0.02 130)",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "oklch(0.60 0.15 130)";
              (e.currentTarget as HTMLInputElement).style.boxShadow =
                "0 0 0 3px oklch(0.72 0.15 130 / 0.20)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "oklch(0.85 0.06 130)";
              (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
            }}
          />
        </div>

        {/* Delivery type */}
        <div>
          <p className="block text-sm font-medium mb-2" style={{ color: "oklch(0.28 0.04 130)" }}>
            Delivery Type *
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(["pickup", "door"] as const).map((type) => (
              <label
                key={type}
                htmlFor={`delivery_${type}`}
                className="flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor:
                    form.deliveryType === type
                      ? "oklch(0.88 0.10 130)"
                      : "oklch(0.99 0.005 130)",
                  borderColor:
                    form.deliveryType === type
                      ? "oklch(0.60 0.15 130)"
                      : "oklch(0.85 0.06 130)",
                }}
              >
                <input
                  id={`delivery_${type}`}
                  type="radio"
                  name="deliveryType"
                  value={type}
                  checked={form.deliveryType === type}
                  onChange={handleChange}
                  data-ocid={`order.delivery_${type}_radio`}
                  className="sr-only"
                />
                <span className="text-lg">{type === "pickup" ? "🏪" : "🚪"}</span>
                <span className="text-sm font-medium" style={{ color: "oklch(0.22 0.06 130)" }}>
                  {type === "pickup" ? "Self Pickup" : "Door Delivery"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Address — only for door delivery */}
        {form.deliveryType === "door" && (
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium mb-1.5"
              style={{ color: "oklch(0.28 0.04 130)" }}
            >
              Delivery Address *
            </label>
            <textarea
              id="address"
              name="address"
              required={form.deliveryType === "door"}
              value={form.address}
              onChange={handleChange}
              placeholder="Full address with landmark"
              rows={3}
              data-ocid="order.address_input"
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none transition-all duration-200"
              style={{
                backgroundColor: "oklch(0.99 0.005 130)",
                border: "1.5px solid oklch(0.85 0.06 130)",
                color: "oklch(0.18 0.02 130)",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                  "oklch(0.60 0.15 130)";
                (e.currentTarget as HTMLTextAreaElement).style.boxShadow =
                  "0 0 0 3px oklch(0.72 0.15 130 / 0.20)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                  "oklch(0.85 0.06 130)";
                (e.currentTarget as HTMLTextAreaElement).style.boxShadow = "none";
              }}
            />
          </div>
        )}

        {/* Payment method */}
        <div>
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "oklch(0.28 0.04 130)" }}
          >
            Payment Method *
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            required
            data-ocid="order.payment_select"
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
            style={{
              backgroundColor: "oklch(0.99 0.005 130)",
              border: "1.5px solid oklch(0.85 0.06 130)",
              color: "oklch(0.18 0.02 130)",
            }}
          >
            <option value="COD">Cash on Delivery / Pickup</option>
            <option value="UPI">UPI Payment</option>
          </select>
        </div>

        {/* Delivery date */}
        <div>
          <label
            htmlFor="deliveryDate"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "oklch(0.28 0.04 130)" }}
          >
            Delivery Date * <span className="font-normal text-xs" style={{ color: "oklch(0.50 0.04 130)" }}>(minimum 1 day in advance)</span>
          </label>
          <input
            id="deliveryDate"
            name="deliveryDate"
            type="date"
            required
            min={getMinDeliveryDate()}
            value={form.deliveryDate}
            onChange={handleChange}
            data-ocid="order.date_input"
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200"
            style={{
              backgroundColor: "oklch(0.99 0.005 130)",
              border: "1.5px solid oklch(0.85 0.06 130)",
              color: "oklch(0.18 0.02 130)",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "oklch(0.60 0.15 130)";
              (e.currentTarget as HTMLInputElement).style.boxShadow =
                "0 0 0 3px oklch(0.72 0.15 130 / 0.20)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "oklch(0.85 0.06 130)";
              (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
            }}
          />
        </div>

        {/* Custom description */}
        <div>
          <label
            htmlFor="customDescription"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "oklch(0.28 0.04 130)" }}
          >
            Special Instructions <span className="font-normal text-xs" style={{ color: "oklch(0.55 0.04 130)" }}>(optional)</span>
          </label>
          <textarea
            id="customDescription"
            name="customDescription"
            value={form.customDescription}
            onChange={handleChange}
            placeholder="Any customizations or special requests..."
            rows={3}
            data-ocid="order.notes_textarea"
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none transition-all duration-200"
            style={{
              backgroundColor: "oklch(0.99 0.005 130)",
              border: "1.5px solid oklch(0.85 0.06 130)",
              color: "oklch(0.18 0.02 130)",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                "oklch(0.60 0.15 130)";
              (e.currentTarget as HTMLTextAreaElement).style.boxShadow =
                "0 0 0 3px oklch(0.72 0.15 130 / 0.20)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                "oklch(0.85 0.06 130)";
              (e.currentTarget as HTMLTextAreaElement).style.boxShadow = "none";
            }}
          />
        </div>

        {/* Error state */}
        {/* Submit */}
        <button
          type="submit"
          disabled={false}
          data-ocid="order.submit_button"
          className="w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "oklch(0.72 0.15 130)",
            color: "oklch(0.15 0.03 130)",
            boxShadow: "0 4px 14px oklch(0.72 0.15 130 / 0.35)",
          }}
        >
          {`Place Order on WhatsApp — ₹${item.price}`}
        </button>
      </form>
    </div>
  );
}
