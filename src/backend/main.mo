import List "mo:core/List";
import ItemTypes "types/items";
import OrderTypes "types/orders";
import CategoryTypes "types/categories";
import ItemLib "lib/items";
import CategoryLib "lib/categories";
import ItemsApi "mixins/items-api";
import OrdersApi "mixins/orders-api";
import CategoriesApi "mixins/categories-api";
import AuthApi "mixins/auth-api";

actor {
  let items = List.empty<ItemTypes.Item>();
  let orders = List.empty<OrderTypes.Order>();
  let categories = List.empty<CategoryTypes.Category>();

  // Seed initial data on first deploy
  do {
    ItemLib.seedItems(items);
    CategoryLib.seedCategories(categories);
  };

  include ItemsApi(items);
  include OrdersApi(orders);
  include CategoriesApi(categories);
  include AuthApi();
};
