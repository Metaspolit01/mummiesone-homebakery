import List "mo:core/List";
import OrderTypes "../types/orders";
import OrderLib "../lib/orders";

mixin (orders : List.List<OrderTypes.Order>) {
  // Public: place a new order
  public shared func createOrder(input : OrderTypes.OrderInput) : async OrderTypes.Order {
    OrderLib.create(orders, input);
  };

  // Public: create custom cake request
  public shared func createCustomRequest(input : OrderTypes.OrderInput) : async OrderTypes.Order {
    let customInput : OrderTypes.OrderInput = { input with isCustomRequest = true };
    OrderLib.create(orders, customInput);
  };

  // Admin: get all orders
  public query func getAllOrders() : async [OrderTypes.Order] {
    OrderLib.getAll(orders);
  };

  // Admin: update order status
  public shared func updateOrderStatus(id : Text, status : Text) : async ?OrderTypes.Order {
    OrderLib.updateStatus(orders, id, status);
  };
};
