import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "../api/orders";
import LoadingSpinner from "../components/LoadingSpinner";
import type { OrderStatus } from "../types/admin";

const ALL_STATUSES: OrderStatus[] = ["Pending", "Accepted", "Completed", "Cancelled"];

const STATUS_BADGE: Record<OrderStatus, string> = {
  Pending: "badge-pending",
  Accepted: "badge-accepted",
  Completed: "badge-completed",
  Cancelled: "badge-cancelled",
};

export default function Orders() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<OrderStatus | "All">("All");

  const { data: orders = [], isLoading } = useQuery({ queryKey: ["orders"], queryFn: getOrders });

  const updateStatusMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => updateOrderStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });

  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

  if (isLoading) {
    return <div className="flex justify-center items-center h-64" data-ocid="orders.loading_state"><LoadingSpinner size="lg" label="Loading orders…" /></div>;
  }

  return (
    <div data-ocid="orders.page" className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary-foreground">Orders</h2>
          <p className="text-sm text-sidebar-muted">{orders.length} total · {orders.filter((o) => o.status === "Pending").length} pending</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap" data-ocid="orders.filter_tabs">
        {(["All", ...ALL_STATUSES] as const).map((s) => {
          const count = s === "All" ? orders.length : orders.filter((o) => o.status === s).length;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              data-ocid={`orders.filter.${s.toLowerCase()}_tab`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-white border border-surface-border text-sidebar-muted hover:text-primary-foreground"
              }`}
            >
              {s} <span className="ml-1 text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      {sorted.length === 0 ? (
        <div className="card text-center py-12" data-ocid="orders.empty_state">
          <p className="text-4xl mb-3">📋</p>
          <p className="font-semibold text-primary-foreground">No orders found</p>
          <p className="text-sm text-sidebar-muted mt-1">
            {filter !== "All" ? `No ${filter.toLowerCase()} orders` : "Orders will appear here once placed"}
          </p>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[780px]" data-ocid="orders.table">
            <thead>
              <tr>
                <th className="table-th">Customer</th>
                <th className="table-th">Item</th>
                <th className="table-th">Delivery</th>
                <th className="table-th">Payment</th>
                <th className="table-th">Delivery Date</th>
                <th className="table-th">Status</th>
                <th className="table-th text-right">Update</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((order, i) => (
                <tr key={order._id} data-ocid={`orders.item.${i + 1}`} className="hover:bg-surface-muted/40">
                  <td className="table-td">
                    <p className="font-medium text-sm text-primary-foreground">{order.userName}</p>
                    <a href={`tel:${order.phone}`} className="text-xs text-primary-dark hover:underline">{order.phone}</a>
                  </td>
                  <td className="table-td">
                    <p className="text-sm">{order.itemName}</p>
                    {order.customDescription && (
                      <p className="text-xs text-sidebar-muted mt-0.5 max-w-[160px] truncate" title={order.customDescription}>{order.customDescription}</p>
                    )}
                  </td>
                  <td className="table-td">
                    <span className="capitalize text-sm">{order.deliveryType}</span>
                    {order.address && order.deliveryType === "door" && (
                      <p className="text-xs text-sidebar-muted mt-0.5 max-w-[140px] truncate" title={order.address}>{order.address}</p>
                    )}
                  </td>
                  <td className="table-td text-sm">{order.paymentMethod}</td>
                  <td className="table-td text-sm">{new Date(order.deliveryDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td className="table-td">
                    <span className={STATUS_BADGE[order.status]}>{order.status}</span>
                  </td>
                  <td className="table-td text-right">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatusMut.mutate({ id: order._id, status: e.target.value as OrderStatus })}
                      data-ocid={`orders.status_select.${i + 1}`}
                      className="text-xs border border-surface-border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
