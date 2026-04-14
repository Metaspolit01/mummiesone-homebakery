import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItems, createItem, updateItem, deleteItem, toggleItemAvailability } from "../api/items";
import { getCategories } from "../api/categories";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Item } from "../types/admin";

const EMPTY_FORM: Omit<Item, "_id"> = {
  name: "", category: "", subcategory: "", price: 0,
  description: "", imageUrl: "", available: true,
};

export default function Items() {
  const qc = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState<Omit<Item, "_id">>(EMPTY_FORM);
  const [search, setSearch] = useState("");

  const { data: items = [], isLoading } = useQuery({ queryKey: ["items"], queryFn: getItems });
  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  const selectedCategory = categories.find((c) => c.name === form.category);

  const createMut = useMutation({
    mutationFn: createItem,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["items"] }); closeModal(); },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Item> }) => updateItem(id, payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["items"] }); closeModal(); },
  });
  const deleteMut = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["items"] }),
  });
  const toggleMut = useMutation({
    mutationFn: toggleItemAvailability,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["items"] }),
  });

  function openAdd() { setEditing(null); setForm(EMPTY_FORM); setShowModal(true); }
  function openEdit(item: Item) {
    setEditing(item);
    setForm({ name: item.name, category: item.category, subcategory: item.subcategory ?? "", price: item.price, description: item.description, imageUrl: item.imageUrl ?? "", available: item.available });
    setShowModal(true);
  }
  function closeModal() { setShowModal(false); setEditing(null); setForm(EMPTY_FORM); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateMut.mutate({ id: editing._id, payload: form });
    } else {
      createMut.mutate(form);
    }
  }

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-64" data-ocid="items.loading_state"><LoadingSpinner size="lg" label="Loading items…" /></div>;
  }

  return (
    <div data-ocid="items.page" className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary-foreground">Items</h2>
          <p className="text-sm text-sidebar-muted">{items.length} total items</p>
        </div>
        <button type="button" onClick={openAdd} data-ocid="items.add_button" className="btn-primary flex items-center gap-2">
          <span>+</span> Add Item
        </button>
      </div>

      {/* Search */}
      <label htmlFor="items-search" className="sr-only">Search items</label>
      <input
        id="items-search"
        type="search"
        placeholder="Search items…"
        className="form-input max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        data-ocid="items.search_input"
      />

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card text-center py-12" data-ocid="items.empty_state">
          <p className="text-4xl mb-3">🧁</p>
          <p className="font-semibold text-primary-foreground">No items found</p>
          <p className="text-sm text-sidebar-muted mt-1">Add your first bakery item to get started.</p>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full" data-ocid="items.table">
            <thead>
              <tr>
                <th className="table-th">Item</th>
                <th className="table-th">Category</th>
                <th className="table-th text-right">Price</th>
                <th className="table-th text-center">Available</th>
                <th className="table-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item._id} data-ocid={`items.item.${i + 1}`} className="hover:bg-surface-muted/40">
                  <td className="table-td">
                    <div className="flex items-center gap-3">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-9 h-9 rounded-lg object-cover border border-surface-border" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center text-lg">🧁</div>
                      )}
                      <div>
                        <p className="font-medium text-sm text-primary-foreground">{item.name}</p>
                        {item.subcategory && <p className="text-xs text-sidebar-muted">{item.subcategory}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="table-td text-sm">{item.category}</td>
                  <td className="table-td text-right font-medium">₹{item.price}</td>
                  <td className="table-td text-center">
                    <button
                      type="button"
                      onClick={() => toggleMut.mutate(item._id)}
                      aria-label={item.available ? "Mark unavailable" : "Mark available"}
                      data-ocid={`items.toggle.${i + 1}`}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${item.available ? "bg-primary" : "bg-gray-300"}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${item.available ? "translate-x-4" : "translate-x-1"}`} />
                    </button>
                  </td>
                  <td className="table-td text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => openEdit(item)} data-ocid={`items.edit_button.${i + 1}`} className="text-xs btn-secondary py-1 px-2.5">Edit</button>
                      <button type="button" onClick={() => { if (confirm("Delete this item?")) deleteMut.mutate(item._id); }} data-ocid={`items.delete_button.${i + 1}`} className="text-xs btn-danger py-1 px-2.5">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" data-ocid="items.dialog">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
              <h3 className="font-semibold text-primary-foreground">{editing ? "Edit Item" : "Add New Item"}</h3>
              <button type="button" onClick={closeModal} data-ocid="items.close_button" className="text-sidebar-muted hover:text-primary-foreground text-xl leading-none">×</button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="item-name" className="form-label">Name *</label>
                  <input id="item-name" className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required data-ocid="items.name_input" />
                </div>
                <div>
                  <label htmlFor="item-price" className="form-label">Price (₹) *</label>
                  <input id="item-price" type="number" min="0" className="form-input" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required data-ocid="items.price_input" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="item-category" className="form-label">Category *</label>
                  <select id="item-category" className="form-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: "" })} required data-ocid="items.category_select">
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="item-subcategory" className="form-label">Subcategory</label>
                  <select id="item-subcategory" className="form-input" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} data-ocid="items.subcategory_select">
                    <option value="">None</option>
                    {selectedCategory?.subcategories.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="item-description" className="form-label">Description</label>
                <textarea id="item-description" className="form-input resize-none" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} data-ocid="items.description_textarea" />
              </div>

              <div>
                <label htmlFor="item-image" className="form-label">Image URL</label>
                <input id="item-image" type="url" className="form-input" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://…" data-ocid="items.image_input" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer" htmlFor="item-available">
                <input id="item-available" type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="rounded" data-ocid="items.available_checkbox" />
                <span className="text-sm font-medium text-primary-foreground">Available for order</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1" disabled={createMut.isPending || updateMut.isPending} data-ocid="items.submit_button">
                  {createMut.isPending || updateMut.isPending ? "Saving…" : editing ? "Save Changes" : "Add Item"}
                </button>
                <button type="button" onClick={closeModal} className="btn-secondary" data-ocid="items.cancel_button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
