module {
  public type Item = {
    id : Text;
    name : Text;
    category : Text;
    subcategory : Text;
    price : Float;
    description : Text;
    imageUrl : Text;
    available : Bool;
  };

  public type ItemInput = {
    name : Text;
    category : Text;
    subcategory : Text;
    price : Float;
    description : Text;
    imageUrl : Text;
    available : Bool;
  };
};
