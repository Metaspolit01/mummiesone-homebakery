import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../api/categories";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Category } from "../types/admin";

export default function Categories() {
  const qc = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [subInput, setSubInput] = useState("");
  const [subcategories, setSubcategories] = useState<string[]>([]);

  const { data: categories = [], isLoading } = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  const createMut = useMutation({
    mutationFn: createCategory,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["categories"] }); closeModal(); },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Omit<Category, "_id">> }) => updateCategory(id, payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["categories"] }); closeModal(); },
  });
  const deleteMut = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });

  function openAdd() { setEditing(null); setName(""); setSubcategories([]); setSubInput(""); setShowModal(true); }
  function openEdit(cat: Category) { setEditing(cat); setName(cat.name); setSubcategories([...cat.subcategories]); setSubInput(""); setShowModal(true); }
  function closeModal() { setShowModal(false); setEditing(null); setName(""); setSubcategories([]); setSubInput(""); }

  function addSub() {
    const val = subInput.trim();
    if (val && !subcategories.includes(val)) {
      setSubcategories([...subcategories, val]);
      setSubInput("");
    }
  }

  function removeSub(s: string) {
    setSubcategories(subcategories.filter((x) => x !== s));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateMut.mutate({ id: editing._id, payload: { name, subcategories } });
    } else {
      createMut.mutate({ name, subcategories });
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64" data-ocid="categories.loading_state"><LoadingSpinner size="lg" label="Loading categories…" /></div>;
  }

  return (
    <div data-ocid="categories.page" className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary-foreground">Categories</h2>
          <p className="text-sm text-sidebar-muted">{categories.length} categories</p>
        </div>
        <button type="button" onClick={openAdd} data-ocid="categories.add_button" className="btn-primary flex items-center gap-2">
          <span>+</span> Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="card text-center py-12" data-ocid="categories.empty_state">
          <p className="text-4xl mb-3">📂</p>
          <p className="font-semibold text-primary-foreground">No categories yet</p>
          <p className="text-sm text-sidebar-muted mt-1">Add categories to organise your bakery items.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-ocid="categories.list">
          {categories.map((cat, i) => (
            <div key={cat._id} data-ocid={`categories.item.${i + 1}`} className="card flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📂</span>
                  <h3 className="font-semibold text-primary-foreground">{cat.name}</h3>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit(cat)} data-ocid={`categories.edit_button.${i + 1}`} className="text-xs btn-secondary py-1 px-2.5">Edit</button>
                  <button
                    type="button"
                    onClick={() => { if (confirm(`Delete "${cat.name}"?`)) deleteMut.mutate(cat._id); }}
                    data-ocid={`categories.delete_button.${i + 1}`}
                    className="text-xs btn-danger py-1 px-2.5"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {cat.subcategories.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {cat.subcategories.map((s) => (
                    <span key={s} className="text-xs bg-primary-light text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-sidebar-muted italic">No subcategories</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" data-ocid="categories.dialog">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
              <h3 className="font-semibold text-primary-foreground">{editing ? "Edit Category" : "Add Category"}</h3>
              <button type="button" onClick={closeModal} data-ocid="categories.close_button" className="text-sidebar-muted hover:text-primary-foreground text-xl leading-none">×</button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label htmlFor="cat-name" className="form-label">Category Name *</label>
                <input id="cat-name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Cakes" data-ocid="categories.name_input" />
              </div>

              <div>
                <label htmlFor="cat-sub" className="form-label">Subcategories</label>
                <div className="flex gap-2">
                  <input
                    id="cat-sub"
                    className="form-input flex-1"
                    value={subInput}
                    onChange={(e) => setSubInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSub(); } }}
                    placeholder="Type and press Enter"
                    data-ocid="categories.subcategory_input"
                  />
                  <button type="button" onClick={addSub} className="btn-secondary px-3">Add</button>
                </div>
                {subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {subcategories.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1 text-xs bg-primary-light text-primary-foreground px-2 py-0.5 rounded-full">
                        {s}
                        <button type="button" onClick={() => removeSub(s)} className="hover:text-red-600 font-bold leading-none" aria-label={`Remove ${s}`}>×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1" disabled={createMut.isPending || updateMut.isPending} data-ocid="categories.submit_button">
                  {createMut.isPending || updateMut.isPending ? "Saving…" : editing ? "Save Changes" : "Add Category"}
                </button>
                <button type="button" onClick={closeModal} className="btn-secondary" data-ocid="categories.cancel_button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
