import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/items", label: "Items", icon: "🧁" },
  { to: "/categories", label: "Categories", icon: "📂" },
  { to: "/orders", label: "Orders", icon: "📋" },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-muted">
      {/* Sidebar */}
      <aside className="w-60 flex flex-col bg-sidebar flex-shrink-0">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-sidebar-hover">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎂</span>
            <div>
              <p className="text-sidebar-text font-bold text-sm leading-tight">Mummies One</p>
              <p className="text-sidebar-muted text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1" data-ocid="admin.nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-ocid={`admin.nav.${item.label.toLowerCase()}_link`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-sidebar-active text-primary-foreground"
                    : "text-sidebar-text hover:bg-sidebar-hover"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-sidebar-hover">
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="admin.logout_button"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-muted hover:text-sidebar-text hover:bg-sidebar-hover transition-colors duration-150"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-surface-border px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-lg font-semibold text-primary-foreground">Mummies One Bakery</h1>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-primary-light text-primary-foreground px-2.5 py-1 rounded-full font-medium">
              Admin
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
