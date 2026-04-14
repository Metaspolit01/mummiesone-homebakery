import List "mo:core/List";
import CategoryTypes "../types/categories";

module {
  public type Category = CategoryTypes.Category;
  public type CategoryInput = CategoryTypes.CategoryInput;

  public func getAll(categories : List.List<Category>) : [Category] {
    categories.toArray();
  };

  public func getById(categories : List.List<Category>, id : Text) : ?Category {
    categories.find(func(cat) { cat.id == id });
  };

  public func add(categories : List.List<Category>, input : CategoryInput) : Category {
    let newId = "cat-" # (categories.size() + 1).toText();
    let cat : Category = {
      id = newId;
      name = input.name;
      subcategories = input.subcategories;
    };
    categories.add(cat);
    cat;
  };

  public func update(categories : List.List<Category>, id : Text, input : CategoryInput) : ?Category {
    var found : ?Category = null;
    categories.mapInPlace(
      func(cat) {
        if (cat.id == id) {
          let updated : Category = { cat with
            name = input.name;
            subcategories = input.subcategories;
          };
          found := ?updated;
          updated;
        } else {
          cat;
        };
      }
    );
    found;
  };

  public func remove(categories : List.List<Category>, id : Text) : Bool {
    let sizeBefore = categories.size();
    let filtered = categories.filter(func(cat) { cat.id != id });
    categories.clear();
    categories.append(filtered);
    categories.size() < sizeBefore;
  };

  // Seed default categories on first use
  public func seedCategories(categories : List.List<Category>) {
    let seeds : [CategoryInput] = [
      { name = "Cakes"; subcategories = ["Tea time", "Normal", "Cup", "Bento", "Cool", "Custom", "Ice cream", "Jar cakes"] },
      { name = "Chocolates"; subcategories = ["Homemade", "Bouquets", "Hampers"] },
      { name = "Brownies"; subcategories = [] },
      { name = "Cookies"; subcategories = [] },
      { name = "Donuts"; subcategories = [] },
    ];
    for (input in seeds.vals()) {
      ignore add(categories, input);
    };
  };
};
