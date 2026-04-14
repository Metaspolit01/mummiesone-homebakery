import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getItems } from "../api/items";
import { getCategories } from "../api/categories";
import { getOrders } from "../api/orders";
import LoadingSpinner from "../components/LoadingSpinner";
import type { OrderStatus } from "../types/admin";

const STATUS_BADGE: Record<OrderStatus, string> = {
  Pending: "badge-pending",
  Accepted: "badge-accepted",
  Completed: "badge-completed",
  Cancelled: "badge-cancelled",
};

export default function Dashboard() {
  const { data: items = [], isLoading: loadingItems } = useQuery({ queryKey: ["items"], queryFn: getItems });
  const { data: categories = [], isLoading: loadingCats } = useQuery({ queryKey: ["categories"], queryFn: getCategories });
  const { data: orders = [], isLoading: loadingOrders } = useQuery({ queryKey: ["orders"], queryFn: getOrders });

  const loading = loadingItems || loadingCats || loadingOrders;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const recentOrders = [...orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).slice(0, 5);

  const stats = [
    { label: "Total Items", value: items.length, icon: "🧁", link: "/items", color: "bg-primary-light text-primary-foreground" },
    { label: "Categories", value: categories.length, icon: "📂", link: "/categories", color: "bg-blue-50 text-blue-800" },
    { label: "Total Orders", value: orders.length, icon: "📋", link: "/orders", color: "bg-purple-50 text-purple-800" },
    { label: "Pending Orders", value: pendingOrders, icon: "⏳", link: "/orders", color: "bg-yellow-50 text-yellow-800" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" data-ocid="dashboard.loading_state">
        <LoadingSpinner size="lg" label="Loading dashboard…" />
      </div>
    );
  }

  return (
    <div data-ocid="dashboard.page" className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary-foreground">Dashboard</h2>
        <p className="text-sm text-sidebar-muted mt-0.5">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-ocid="dashboard.stats_section">
        {stats.map((stat, i) => (
          <Link
            key={stat.label}
            to={stat.link}
            data-ocid={`dashboard.stat_card.${i + 1}`}
            className="card hover:shadow-md transition-shadow duration-200 flex flex-col gap-3 no-underline"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
              <p className="text-xs text-sidebar-muted font-medium mt-0.5">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="card" data-ocid="dashboard.recent_orders_section">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-primary-foreground">Recent Orders</h3>
          <Link to="/orders" className="text-sm text-primary-dark hover:underline font-medium">
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-8 text-sidebar-muted" data-ocid="dashboard.orders.empty_state">
            <p className="text-3xl mb-2">📋</p>
            <p className="text-sm">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-th rounded-tl-lg">Customer</th>
                  <th className="table-th">Item</th>
                  <th className="table-th">Delivery</th>
                  <th className="table-th">Date</th>
                  <th className="table-th rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={order._id} data-ocid={`dashboard.order_row.${i + 1}`} className="hover:bg-surface-muted/50">
                    <td className="table-td font-medium">{order.userName}</td>
                    <td className="table-td">{order.itemName}</td>
                    <td className="table-td capitalize">{order.deliveryType}</td>
                    <td className="table-td">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                    <td className="table-td">
                      <span className={STATUS_BADGE[order.status]}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-4" data-ocid="dashboard.quick_links_section">
        {[
          { to: "/items", label: "Manage Items", icon: "🧁", desc: "Add, edit or remove bakery items" },
          { to: "/categories", label: "Manage Categories", icon: "📂", desc: "Organise item categories" },
          { to: "/orders", label: "Manage Orders", icon: "📋", desc: "Update order statuses" },
        ].map((link, i) => (
          <Link
            key={link.to}
            to={link.to}
            data-ocid={`dashboard.quick_link.${i + 1}`}
            className="card hover:shadow-md transition-shadow duration-200 flex gap-3 items-start no-underline"
          >
            <span className="text-2xl mt-0.5">{link.icon}</span>
            <div>
              <p className="font-semibold text-sm text-primary-foreground">{link.label}</p>
              <p className="text-xs text-sidebar-muted mt-0.5">{link.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
