import List "mo:core/List";
import ItemTypes "../types/items";

module {
  public type Item = ItemTypes.Item;
  public type ItemInput = ItemTypes.ItemInput;

  public func getAll(items : List.List<Item>) : [Item] {
    items.toArray();
  };

  public func getAvailable(items : List.List<Item>) : [Item] {
    items.filter(func(item) { item.available }).toArray();
  };

  public func getByCategory(items : List.List<Item>, category : Text) : [Item] {
    items.filter(func(item) { item.available and item.category == category }).toArray();
  };

  public func getById(items : List.List<Item>, id : Text) : ?Item {
    items.find(func(item) { item.id == id });
  };

  public func add(items : List.List<Item>, input : ItemInput) : Item {
    let newId = "item-" # (items.size() + 1).toText();
    let item : Item = {
      id = newId;
      name = input.name;
      category = input.category;
      subcategory = input.subcategory;
      price = input.price;
      description = input.description;
      imageUrl = input.imageUrl;
      available = input.available;
    };
    items.add(item);
    item;
  };

  public func update(items : List.List<Item>, id : Text, input : ItemInput) : ?Item {
    var found : ?Item = null;
    items.mapInPlace(
      func(item) {
        if (item.id == id) {
          let updated : Item = { item with
            name = input.name;
            category = input.category;
            subcategory = input.subcategory;
            price = input.price;
            description = input.description;
            imageUrl = input.imageUrl;
            available = input.available;
          };
          found := ?updated;
          updated;
        } else {
          item;
        };
      }
    );
    found;
  };

  public func remove(items : List.List<Item>, id : Text) : Bool {
    let sizeBefore = items.size();
    let filtered = items.filter(func(item) { item.id != id });
    items.clear();
    items.append(filtered);
    items.size() < sizeBefore;
  };

  public func toggleAvailability(items : List.List<Item>, id : Text) : ?Item {
    var found : ?Item = null;
    items.mapInPlace(
      func(item) {
        if (item.id == id) {
          let updated : Item = { item with available = not item.available };
          found := ?updated;
          updated;
        } else {
          item;
        };
      }
    );
    found;
  };

  // Seed example items (called once on first use)
  public func seedItems(items : List.List<Item>) {
    let seeds : [ItemInput] = [
      { name = "Chocolate Truffle Cake"; category = "Cakes"; subcategory = "Normal"; price = 650.0; description = "Rich chocolate layers with ganache frosting"; imageUrl = ""; available = true },
      { name = "Red Velvet Bento Cake"; category = "Cakes"; subcategory = "Bento"; price = 350.0; description = "Individual red velvet cake box with cream cheese frosting"; imageUrl = ""; available = true },
      { name = "Homemade Chocolate Box"; category = "Chocolates"; subcategory = "Homemade"; price = 299.0; description = "Assorted handmade chocolates in a gift box"; imageUrl = ""; available = true },
      { name = "Fudge Brownies"; category = "Brownies"; subcategory = ""; price = 180.0; description = "Dense, fudgy chocolate brownies (6 pieces)"; imageUrl = ""; available = true },
      { name = "Butter Cookies Tin"; category = "Cookies"; subcategory = ""; price = 220.0; description = "Classic butter cookies in a decorative tin (12 pieces)"; imageUrl = ""; available = true },
    ];
    for (input in seeds.vals()) {
      ignore add(items, input);
    };
  };
};
