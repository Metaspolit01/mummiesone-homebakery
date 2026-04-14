module {
  public type Order = {
    id : Text;
    itemId : Text;
    itemName : Text;
    userName : Text;
    phone : Text;
    address : Text;
    deliveryType : Text; // door | pickup
    paymentMethod : Text; // upi | cod
    orderDate : Int;
    deliveryDate : Int;
    status : Text; // pending | accepted | completed | cancelled
    isCustomRequest : Bool;
    customDescription : Text;
  };

  public type OrderInput = {
    itemId : Text;
    itemName : Text;
    userName : Text;
    phone : Text;
    address : Text;
    deliveryType : Text;
    paymentMethod : Text;
    deliveryDate : Int;
    isCustomRequest : Bool;
    customDescription : Text;
  };
};
