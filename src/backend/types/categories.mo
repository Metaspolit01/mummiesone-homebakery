module {
  public type Category = {
    id : Text;
    name : Text;
    subcategories : [Text];
  };

  public type CategoryInput = {
    name : Text;
    subcategories : [Text];
  };
};
