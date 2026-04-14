import List "mo:core/List";
import CategoryTypes "../types/categories";
import CategoryLib "../lib/categories";

mixin (categories : List.List<CategoryTypes.Category>) {
  // Public: get all categories
  public query func getCategories() : async [CategoryTypes.Category] {
    CategoryLib.getAll(categories);
  };

  // Admin: add category
  public shared func addCategory(input : CategoryTypes.CategoryInput) : async CategoryTypes.Category {
    CategoryLib.add(categories, input);
  };

  // Admin: update category
  public shared func updateCategory(id : Text, input : CategoryTypes.CategoryInput) : async ?CategoryTypes.Category {
    CategoryLib.update(categories, id, input);
  };

  // Admin: delete category
  public shared func deleteCategory(id : Text) : async Bool {
    CategoryLib.remove(categories, id);
  };
};
