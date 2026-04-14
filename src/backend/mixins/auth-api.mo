import AuthTypes "../types/auth";
import AuthLib "../lib/auth";

mixin () {
  // Admin login — returns session token on success
  public shared func adminLogin(username : Text, password : Text) : async AuthTypes.LoginResult {
    AuthLib.login(username, password);
  };

  // Validate admin token
  public query func validateAdminToken(token : Text) : async Bool {
    AuthLib.validateToken(token);
  };
};
