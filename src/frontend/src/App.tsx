import { PageLoader } from "@/components/LoadingSpinner";
import { Toaster } from "@/components/ui/sonner";
import { AdminAuthContext, useAdminAuthState } from "@/hooks/useAdminAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/Home"));
const ProductsPage = lazy(() => import("@/pages/Products"));
const OrderPage = lazy(() => import("@/pages/Order"));
const AdminLoginPage = lazy(() => import("@/pages/AdminLogin"));
const AdminDashboardPage = lazy(() => import("@/pages/AdminDashboard"));

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductsPage,
});

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order/$itemId",
  component: OrderPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => <Navigate to="/admin/login" />,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: AdminDashboardPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  orderRoute,
  adminRoute,
  adminLoginRoute,
  adminDashboardRoute,
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      retry: 1,
    },
  },
});

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAdminAuthState();
  return (
    <AdminAuthContext.Provider value={auth}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}
