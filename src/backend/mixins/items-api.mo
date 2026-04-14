import List "mo:core/List";
import ItemTypes "../types/items";
import ItemLib "../lib/items";

mixin (items : List.List<ItemTypes.Item>) {
  // Public: get all available items
  public query func getItems() : async [ItemTypes.Item] {
    ItemLib.getAvailable(items);
  };

  // Public: get available items filtered by category
  public query func getItemsByCategory(category : Text) : async [ItemTypes.Item] {
    ItemLib.getByCategory(items, category);
  };

  // Public: get a single item by id
  public query func getItem(id : Text) : async ?ItemTypes.Item {
    ItemLib.getById(items, id);
  };

  // Admin: get all items including unavailable
  public query func getAllItems() : async [ItemTypes.Item] {
    ItemLib.getAll(items);
  };

  // Admin: add new item
  public shared func addItem(input : ItemTypes.ItemInput) : async ItemTypes.Item {
    ItemLib.add(items, input);
  };

  // Admin: update existing item
  public shared func updateItem(id : Text, input : ItemTypes.ItemInput) : async ?ItemTypes.Item {
    ItemLib.update(items, id, input);
  };

  // Admin: delete item
  public shared func deleteItem(id : Text) : async Bool {
    ItemLib.remove(items, id);
  };

  // Admin: toggle item availability
  public shared func toggleItemAvailability(id : Text) : async ?ItemTypes.Item {
    ItemLib.toggleAvailability(items, id);
  };
};
