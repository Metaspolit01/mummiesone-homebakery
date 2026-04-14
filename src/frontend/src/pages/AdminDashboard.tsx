import { Layout } from "@/components/Layout";
import { PageLoader } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  useAddCategory,
  useAddItem,
  useAllItems,
  useCategories,
  useDeleteCategory,
  useDeleteItem,
  useOrders,
  useToggleItemAvailability,
  useUpdateCategory,
  useUpdateItem,
  useUpdateOrderStatus,
} from "@/hooks/useBakery";
import type { Category, Item, Order } from "@/types/bakery";
import { useNavigate } from "@tanstack/react-router";
import {
  LogOut,
  Package,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Status helpers ──────────────────────────────────────────────────────────

const STATUS_OPTIONS = ["Pending", "Accepted", "Completed", "Cancelled"];

function statusBadge(status: string) {
  const map: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Accepted: "bg-blue-100 text-blue-800 border-blue-300",
    Completed: "bg-green-100 text-green-800 border-green-300",
    Cancelled: "bg-red-100 text-red-800 border-red-300",
  };
  return map[status] ?? "bg-muted text-foreground border-border";
}

function formatDate(ts: bigint) {
  if (!ts) return "—";
  const ms = Number(ts);
  return new Date(ms > 1e12 ? ms : ms * 1000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Order Detail Modal ──────────────────────────────────────────────────────

function OrderDetailModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const updateStatus = useUpdateOrderStatus();
  const [status, setStatus] = useState(order.status);

  async function handleSave() {
    try {
      await updateStatus.mutateAsync({ id: order.id, status });
      toast.success(`Status updated to ${status}`);
      onClose();
    } catch {
      toast.error("Failed to update status");
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="orders.detail_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 text-sm font-body">
          <div className="grid grid-cols-2 gap-3">
            <Detail label="Order ID" value={`${order.id.slice(0, 8)}…`} />
            <Detail
              label="Status"
              value={
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${statusBadge(order.status)}`}
                >
                  {order.status}
                </span>
              }
            />
            <Detail label="Customer" value={order.userName} />
            <Detail label="Phone" value={order.phone} />
            <Detail
              label="Delivery"
              value={
                order.deliveryType === "door" ? "Door Delivery" : "Self Pickup"
              }
            />
            <Detail label="Payment" value={order.paymentMethod.toUpperCase()} />
            <Detail label="Order Date" value={formatDate(order.orderDate)} />
            <Detail
              label="Delivery Date"
              value={formatDate(order.deliveryDate)}
            />
          </div>
          {order.address && (
            <Detail label="Address" value={order.address} full />
          )}
          <Detail label="Item" value={order.itemName} full />
          {order.isCustomRequest && order.customDescription && (
            <Detail
              label="Custom Request"
              value={order.customDescription}
              full
            />
          )}
          <div className="border-t border-border pt-3 mt-1">
            <Label className="font-body text-sm mb-1.5 block">
              Update Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger
                className="font-body"
                data-ocid="orders.status_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s} className="font-body">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="font-body"
            data-ocid="orders.detail_cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => void handleSave()}
            disabled={updateStatus.isPending || status === order.status}
            className="gradient-primary text-primary-foreground border-0 font-body"
            data-ocid="orders.detail_save_button"
          >
            {updateStatus.isPending ? "Saving…" : "Save Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Detail({
  label,
  value,
  full,
}: {
  label: string;
  value: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-foreground font-medium break-words">{value}</p>
    </div>
  );
}

// ─── Item Form Modal ─────────────────────────────────────────────────────────

interface ItemFormData {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: string;
  imageUrl: string;
  available: boolean;
}

const EMPTY_ITEM: ItemFormData = {
  name: "",
  description: "",
  category: "",
  subcategory: "",
  price: "",
  imageUrl: "",
  available: true,
};

function ItemFormModal({
  initial,
  title,
  onSave,
  onClose,
  isPending,
  categories,
}: {
  initial: ItemFormData;
  title: string;
  onSave: (data: ItemFormData) => void;
  onClose: () => void;
  isPending: boolean;
  categories: Category[];
}) {
  const [form, setForm] = useState<ItemFormData>(initial);

  function set(key: keyof ItemFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="items.form_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="font-body text-sm">Item Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                placeholder="e.g. Chocolate Bento Cake"
                className="font-body"
                data-ocid="items.name_input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-body text-sm">Category *</Label>
              {categories.length > 0 ? (
                <Select
                  value={form.category}
                  onValueChange={(v) => set("category", v)}
                >
                  <SelectTrigger
                    className="font-body"
                    data-ocid="items.category_select"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem
                        key={c.id}
                        value={c.name}
                        className="font-body"
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  required
                  placeholder="e.g. Cakes"
                  className="font-body"
                  data-ocid="items.category_input"
                />
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-body text-sm">Subcategory</Label>
              <Input
                value={form.subcategory}
                onChange={(e) => set("subcategory", e.target.value)}
                placeholder="e.g. Bento Cake"
                className="font-body"
                data-ocid="items.subcategory_input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-body text-sm">Price (₹) *</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                required
                placeholder="0"
                className="font-body"
                data-ocid="items.price_input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-body text-sm">Image URL</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) => set("imageUrl", e.target.value)}
                placeholder="https://…"
                className="font-body"
                data-ocid="items.image_url_input"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="font-body text-sm">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Brief description of the item…"
                rows={3}
                className="font-body resize-none"
                data-ocid="items.description_textarea"
              />
            </div>

            <div className="col-span-2 flex items-center gap-3">
              <Switch
                checked={form.available}
                onCheckedChange={(v) => set("available", v)}
                id="available-toggle"
                data-ocid="items.available_switch"
              />
              <Label
                htmlFor="available-toggle"
                className="font-body text-sm cursor-pointer"
              >
                Available for ordering
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="font-body"
              data-ocid="items.form_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="gradient-primary text-primary-foreground border-0 font-body"
              data-ocid="items.form_submit_button"
            >
              {isPending ? "Saving…" : "Save Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Confirm Delete Dialog ───────────────────────────────────────────────────

function ConfirmDeleteDialog({
  label,
  onConfirm,
  onClose,
  isPending,
}: {
  label: string;
  onConfirm: () => void;
  onClose: () => void;
  isPending: boolean;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm" data-ocid="items.delete_dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Delete {label}?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground font-body">
          This action cannot be undone. The item will be permanently removed.
        </p>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="font-body"
            data-ocid="items.delete_cancel_button"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            className="font-body"
            data-ocid="items.delete_confirm_button"
          >
            {isPending ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Category Form ───────────────────────────────────────────────────────────

function CategoryRow({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const updateCat = useUpdateCategory();
  const deleteCat = useDeleteCategory();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [subInput, setSubInput] = useState("");
  const [subs, setSubs] = useState<string[]>(category.subcategories);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleSave() {
    try {
      await updateCat.mutateAsync({
        id: category.id,
        input: { name, subcategories: subs },
      });
      toast.success("Category updated");
      setEditing(false);
    } catch {
      toast.error("Failed to update category");
    }
  }

  async function handleDelete() {
    try {
      await deleteCat.mutateAsync(category.id);
      toast.success("Category deleted");
      setConfirmDelete(false);
    } catch {
      toast.error("Failed to delete category");
    }
  }

  function addSub() {
    const trimmed = subInput.trim();
    if (trimmed && !subs.includes(trimmed)) {
      setSubs([...subs, trimmed]);
      setSubInput("");
    }
  }

  function removeSub(sub: string) {
    setSubs(subs.filter((s) => s !== sub));
  }

  return (
    <>
      <div
        className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3"
        data-ocid={`categories.item.${index + 1}`}
      >
        <div className="flex items-start justify-between gap-2">
          {editing ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-body font-semibold max-w-xs"
              data-ocid={`categories.name_input.${index + 1}`}
            />
          ) : (
            <p className="font-display font-semibold text-foreground text-base">
              {category.name}
            </p>
          )}
          <div className="flex gap-1.5 flex-shrink-0">
            {editing ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditing(false);
                    setName(category.name);
                    setSubs(category.subcategories);
                  }}
                  className="font-body text-xs"
                  data-ocid={`categories.cancel_edit_button.${index + 1}`}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => void handleSave()}
                  disabled={updateCat.isPending}
                  className="gradient-primary text-primary-foreground border-0 font-body text-xs"
                  data-ocid={`categories.save_button.${index + 1}`}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditing(true)}
                  aria-label="Edit category"
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid={`categories.edit_button.${index + 1}`}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setConfirmDelete(true)}
                  aria-label="Delete category"
                  className="text-destructive hover:text-destructive"
                  data-ocid={`categories.delete_button.${index + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Subcategories */}
        <div className="flex flex-wrap gap-1.5">
          {subs.map((sub) => (
            <span
              key={sub}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full text-xs font-body text-muted-foreground"
            >
              {sub}
              {editing && (
                <button
                  type="button"
                  onClick={() => removeSub(sub)}
                  className="hover:text-destructive transition-colors ml-0.5"
                  aria-label={`Remove ${sub}`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
          {subs.length === 0 && (
            <span className="text-xs text-muted-foreground font-body italic">
              No subcategories
            </span>
          )}
        </div>

        {editing && (
          <div className="flex gap-2">
            <Input
              value={subInput}
              onChange={(e) => setSubInput(e.target.value)}
              placeholder="Add subcategory"
              className="font-body text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSub();
                }
              }}
              data-ocid={`categories.sub_input.${index + 1}`}
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addSub}
              className="font-body flex-shrink-0"
              data-ocid={`categories.add_sub_button.${index + 1}`}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {confirmDelete && (
        <ConfirmDeleteDialog
          label={`"${category.name}"`}
          onConfirm={() => void handleDelete()}
          onClose={() => setConfirmDelete(false)}
          isPending={deleteCat.isPending}
        />
      )}
    </>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

function AdminDashboardContent() {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const { data: items = [], isLoading: itemsLoading } = useAllItems();
  const { data: categories = [] } = useCategories();
  const { data: orders = [], isLoading: ordersLoading } = useOrders();

  const deleteItem = useDeleteItem();
  const toggleAvail = useToggleItemAvailability();
  const addItem = useAddItem();
  const updateItem = useUpdateItem();
  const addCategory = useAddCategory();

  // Orders state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderSearch, setOrderSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Items state
  const [itemFormMode, setItemFormMode] = useState<
    "add" | { item: Item } | null
  >(null);
  const [deleteItemTarget, setDeleteItemTarget] = useState<Item | null>(null);

  // Categories state
  const [newCatName, setNewCatName] = useState("");
  const [newCatSubs, setNewCatSubs] = useState("");
  const addCategory_ = addCategory;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  function handleLogout() {
    logout();
    void navigate({ to: "/admin/login" });
    toast.info("Logged out.");
  }

  // ── Order filtering ──────────────────────────────────────────────────────
  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      !orderSearch ||
      o.userName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pendingCount = orders.filter((o) => o.status === "Pending").length;

  // ── Item handlers ────────────────────────────────────────────────────────
  async function handleAddItem(data: ItemFormData) {
    try {
      await addItem.mutateAsync({
        ...data,
        price: Number.parseFloat(data.price),
      });
      toast.success("Item added!");
      setItemFormMode(null);
    } catch {
      toast.error("Failed to add item");
    }
  }

  async function handleUpdateItem(data: ItemFormData) {
    if (!itemFormMode || itemFormMode === "add") return;
    try {
      await updateItem.mutateAsync({
        id: itemFormMode.item.id,
        input: { ...data, price: Number.parseFloat(data.price) },
      });
      toast.success("Item updated!");
      setItemFormMode(null);
    } catch {
      toast.error("Failed to update item");
    }
  }

  async function handleDeleteItem(item: Item) {
    try {
      await deleteItem.mutateAsync(item.id);
      toast.success("Item deleted.");
      setDeleteItemTarget(null);
    } catch {
      toast.error("Failed to delete item");
    }
  }

  async function handleToggle(id: string) {
    try {
      await toggleAvail.mutateAsync(id);
    } catch {
      toast.error("Failed to toggle availability");
    }
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const subcategories = newCatSubs
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    try {
      await addCategory_.mutateAsync({
        name: newCatName.trim(),
        subcategories,
      });
      toast.success("Category added!");
      setNewCatName("");
      setNewCatSubs("");
    } catch {
      toast.error("Failed to add category");
    }
  }

  return (
    <Layout hideNav>
      {/* Admin Header */}
      <header className="gradient-primary shadow-warm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <span className="font-display text-primary-foreground text-xl font-bold">
              Mummies One
            </span>
            <span className="text-primary-foreground/60 text-sm font-body ml-2">
              Admin
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-primary-foreground hover:bg-primary-foreground/10 font-body"
            data-ocid="admin.logout_button"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Items",
              value: items.length,
              icon: Package,
              highlight: false,
            },
            {
              label: "Categories",
              value: categories.length,
              icon: Tag,
              highlight: false,
            },
            {
              label: "Total Orders",
              value: orders.length,
              icon: ShoppingBag,
              highlight: false,
            },
            {
              label: "Pending",
              value: pendingCount,
              icon: ShoppingBag,
              highlight: pendingCount > 0,
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-card rounded-xl p-4 border shadow-warm flex items-center gap-3 ${stat.highlight ? "border-yellow-300" : "border-border"}`}
              data-ocid={`admin.stat.${i + 1}`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.highlight ? "gradient-accent" : "gradient-primary"}`}
              >
                <stat.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-foreground text-2xl font-bold leading-none">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs font-body mt-0.5 truncate">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6 font-body" data-ocid="admin.tabs">
            <TabsTrigger value="orders" data-ocid="admin.orders_tab">
              Orders
              {pendingCount > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold leading-none">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="items" data-ocid="admin.items_tab">
              Items
            </TabsTrigger>
            <TabsTrigger value="categories" data-ocid="admin.categories_tab">
              Categories
            </TabsTrigger>
          </TabsList>

          {/* ── Orders Tab ─────────────────────────────────────────────── */}
          <TabsContent value="orders">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-5">
              <div className="relative flex-1 min-w-48 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search by name or order ID…"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="pl-10 font-body"
                  data-ocid="orders.search_input"
                />
              </div>
              <div
                className="flex gap-1.5 flex-wrap"
                data-ocid="orders.status_filters"
              >
                {["All", ...STATUS_OPTIONS].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-body font-medium border transition-smooth ${
                      statusFilter === s
                        ? "gradient-primary text-primary-foreground border-transparent"
                        : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                    }`}
                    data-ocid={`orders.filter_${s.toLowerCase()}_tab`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {ordersLoading ? (
              <PageLoader />
            ) : filteredOrders.length === 0 ? (
              <div
                className="text-center py-16 text-muted-foreground font-body"
                data-ocid="orders.empty_state"
              >
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-semibold text-foreground">No orders found</p>
                <p className="text-sm">
                  {orderSearch || statusFilter !== "All"
                    ? "Try adjusting your filters"
                    : "Orders will appear here once customers place them."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm font-body min-w-[640px]">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                        Phone
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                        Delivery Date
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, i) => (
                      <tr
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            setSelectedOrder(order);
                        }}
                        tabIndex={0}
                        className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-smooth"
                        data-ocid={`orders.row.${i + 1}`}
                      >
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                          {order.id.slice(0, 8)}…
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {order.userName}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {order.phone}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {order.itemName}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {formatDate(order.deliveryDate)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${statusBadge(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedOrder && (
              <OrderDetailModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
              />
            )}
          </TabsContent>

          {/* ── Items Tab ──────────────────────────────────────────────── */}
          <TabsContent value="items">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-foreground text-lg font-semibold">
                Menu Items
              </h2>
              <Button
                size="sm"
                className="gradient-primary text-primary-foreground border-0 font-body"
                onClick={() => setItemFormMode("add")}
                data-ocid="admin.add_item_button"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </Button>
            </div>

            {itemsLoading ? (
              <PageLoader />
            ) : items.length === 0 ? (
              <div
                className="text-center py-16 text-muted-foreground font-body"
                data-ocid="items.empty_state"
              >
                <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-semibold text-foreground">No items yet</p>
                <p className="text-sm mb-4">Add your first menu item.</p>
                <Button
                  size="sm"
                  className="gradient-primary text-primary-foreground border-0 font-body"
                  onClick={() => setItemFormMode("add")}
                  data-ocid="items.add_first_button"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add First Item
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm font-body min-w-[700px]">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                        Subcategory
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-muted-foreground">
                        Price
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-muted-foreground">
                        Available
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr
                        key={item.id}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                        data-ocid={`items.row.${i + 1}`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-border"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 text-lg">
                                🎂
                              </div>
                            )}
                            <span className="font-medium text-foreground truncate max-w-[160px]">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {item.category}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {item.subcategory || "—"}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-foreground tabular-nums">
                          ₹{item.price}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Switch
                            checked={item.available}
                            onCheckedChange={() => void handleToggle(item.id)}
                            aria-label={
                              item.available ? "Disable item" : "Enable item"
                            }
                            data-ocid={`items.available_toggle.${i + 1}`}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setItemFormMode({ item })}
                              aria-label="Edit item"
                              className="text-muted-foreground hover:text-foreground"
                              data-ocid={`items.edit_button.${i + 1}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeleteItemTarget(item)}
                              aria-label="Delete item"
                              className="text-destructive hover:text-destructive"
                              data-ocid={`items.delete_button.${i + 1}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Item Form Modal */}
            {itemFormMode !== null && (
              <ItemFormModal
                title={itemFormMode === "add" ? "Add New Item" : "Edit Item"}
                initial={
                  itemFormMode === "add"
                    ? EMPTY_ITEM
                    : {
                        name: itemFormMode.item.name,
                        description: itemFormMode.item.description,
                        category: itemFormMode.item.category,
                        subcategory: itemFormMode.item.subcategory,
                        price: String(itemFormMode.item.price),
                        imageUrl: itemFormMode.item.imageUrl,
                        available: itemFormMode.item.available,
                      }
                }
                categories={categories}
                onSave={
                  itemFormMode === "add"
                    ? (d) => void handleAddItem(d)
                    : (d) => void handleUpdateItem(d)
                }
                onClose={() => setItemFormMode(null)}
                isPending={
                  itemFormMode === "add"
                    ? addItem.isPending
                    : updateItem.isPending
                }
              />
            )}

            {/* Delete Confirm */}
            {deleteItemTarget && (
              <ConfirmDeleteDialog
                label={`"${deleteItemTarget.name}"`}
                onConfirm={() => void handleDeleteItem(deleteItemTarget)}
                onClose={() => setDeleteItemTarget(null)}
                isPending={deleteItem.isPending}
              />
            )}
          </TabsContent>

          {/* ── Categories Tab ─────────────────────────────────────────── */}
          <TabsContent value="categories">
            {/* Add Category */}
            <form
              onSubmit={(e) => void handleAddCategory(e)}
              className="bg-card border border-border rounded-xl p-5 mb-6 flex flex-col gap-3 max-w-lg"
              data-ocid="categories.add_form"
            >
              <p className="font-display font-semibold text-foreground">
                Add New Category
              </p>
              <div className="flex flex-col gap-1.5">
                <Label className="font-body text-sm">Category Name *</Label>
                <Input
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Cakes"
                  required
                  className="font-body"
                  data-ocid="categories.name_input"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="font-body text-sm">
                  Subcategories{" "}
                  <span className="text-muted-foreground">
                    (comma-separated)
                  </span>
                </Label>
                <Input
                  value={newCatSubs}
                  onChange={(e) => setNewCatSubs(e.target.value)}
                  placeholder="e.g. Tea time, Bento, Cup cakes"
                  className="font-body"
                  data-ocid="categories.subs_input"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="gradient-primary text-primary-foreground border-0 font-body self-start"
                disabled={addCategory_.isPending}
                data-ocid="categories.add_button"
              >
                <Plus className="w-4 h-4 mr-1" />
                {addCategory_.isPending ? "Adding…" : "Add Category"}
              </Button>
            </form>

            {/* Category List */}
            {categories.length === 0 ? (
              <div
                className="text-center py-12 text-muted-foreground font-body"
                data-ocid="categories.empty_state"
              >
                <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-semibold text-foreground">
                  No categories yet
                </p>
                <p className="text-sm">Add categories to organize your menu.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3" data-ocid="categories.list">
                {categories.map((cat, i) => (
                  <CategoryRow key={cat.id} category={cat} index={i} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border mt-12 py-4 text-center text-xs text-muted-foreground font-body">
        © {new Date().getFullYear()}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          Built with love using caffeine.ai
        </a>
      </footer>
    </Layout>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
