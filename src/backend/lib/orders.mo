import List "mo:core/List";
import Time "mo:core/Time";
import OrderTypes "../types/orders";

module {
  public type Order = OrderTypes.Order;
  public type OrderInput = OrderTypes.OrderInput;

  public func getAll(orders : List.List<Order>) : [Order] {
    orders.toArray();
  };

  public func getById(orders : List.List<Order>, id : Text) : ?Order {
    orders.find(func(order) { order.id == id });
  };

  public func create(orders : List.List<Order>, input : OrderInput) : Order {
    let newId = "order-" # (orders.size() + 1).toText();
    let order : Order = {
      id = newId;
      itemId = input.itemId;
      itemName = input.itemName;
      userName = input.userName;
      phone = input.phone;
      address = input.address;
      deliveryType = input.deliveryType;
      paymentMethod = input.paymentMethod;
      orderDate = Time.now();
      deliveryDate = input.deliveryDate;
      status = "pending";
      isCustomRequest = input.isCustomRequest;
      customDescription = input.customDescription;
    };
    orders.add(order);
    order;
  };

  public func updateStatus(orders : List.List<Order>, id : Text, status : Text) : ?Order {
    var found : ?Order = null;
    orders.mapInPlace(
      func(order) {
        if (order.id == id) {
          let updated : Order = { order with status = status };
          found := ?updated;
          updated;
        } else {
          order;
        };
      }
    );
    found;
  };
};
