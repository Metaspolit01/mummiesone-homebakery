import AuthTypes "../types/auth";

module {
  public type LoginResult = AuthTypes.LoginResult;

  let ADMIN_USERNAME : Text = "admin";
  let ADMIN_PASSWORD : Text = "admin";
  let ADMIN_TOKEN : Text = "admin-session-token";

  public func login(username : Text, password : Text) : LoginResult {
    if (username == ADMIN_USERNAME and password == ADMIN_PASSWORD) {
      #ok(ADMIN_TOKEN);
    } else {
      #err("Invalid username or password");
    };
  };

  public func validateToken(token : Text) : Bool {
    token == ADMIN_TOKEN;
  };
};
