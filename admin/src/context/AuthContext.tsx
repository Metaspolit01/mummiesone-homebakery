import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { login as apiLogin } from "../api/auth";

interface AuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("admin_token")
  );

  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      localStorage.setItem("admin_token", token);
    } else {
      localStorage.removeItem("admin_token");
    }
  }, [token]);

  async function login(username: string, password: string) {
    const res = await apiLogin({ username, password });
    setToken(res.token);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("admin_token");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
