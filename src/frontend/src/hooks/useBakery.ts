import { createActor } from "@/backend";
import type {
  Category,
  CategoryInput,
  Item,
  ItemInput,
  Order,
  OrderInput,
} from "@/types/bakery";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Items ─────────────────────────────────────────────────────────────────

export function useItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getItems() as Promise<Item[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Item[]>({
    queryKey: ["items", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllItems() as Promise<Item[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useItemsByCategory(category: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Item[]>({
    queryKey: ["items", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getItemsByCategory(category) as Promise<Item[]>;
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useItem(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Item | null>({
    queryKey: ["item", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getItem(id) as Promise<Item | null>;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useAddItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Item, Error, ItemInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addItem(input) as Promise<Item>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useUpdateItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Item | null, Error, { id: string; input: ItemInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateItem(id, input) as Promise<Item | null>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useDeleteItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteItem(id) as Promise<boolean>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useToggleItemAvailability() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Item | null, Error, string>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.toggleItemAvailability(id) as Promise<Item | null>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

// ─── Categories ─────────────────────────────────────────────────────────────

export function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories() as Promise<Category[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCategory() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Category, Error, CategoryInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addCategory(input) as Promise<Category>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    Category | null,
    Error,
    { id: string; input: CategoryInput }
  >({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateCategory(id, input) as Promise<Category | null>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteCategory(id) as Promise<boolean>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

// ─── Orders ─────────────────────────────────────────────────────────────────

export function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders() as Promise<Order[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Order, Error, OrderInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createOrder(input) as Promise<Order>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useCreateCustomRequest() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Order, Error, OrderInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createCustomRequest(input) as Promise<Order>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Order | null, Error, { id: string; status: string }>({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateOrderStatus(id, status) as Promise<Order | null>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export function useAdminLogin() {
  const { actor } = useActor(createActor);
  return useMutation<string, Error, { username: string; password: string }>({
    mutationFn: async ({ username, password }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.adminLogin(username, password);
      if ("ok" in result) return result.ok as string;
      throw new Error(result.err as string);
    },
  });
}
