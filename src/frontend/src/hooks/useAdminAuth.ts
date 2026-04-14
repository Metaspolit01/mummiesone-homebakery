import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const ADMIN_TOKEN_KEY = "mummies_admin_token";

export interface AdminAuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export function useAdminAuthState(): AdminAuthState {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(ADMIN_TOKEN_KEY),
  );

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem(ADMIN_TOKEN_KEY));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = useCallback((newToken: string) => {
    localStorage.setItem(ADMIN_TOKEN_KEY, newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
  }, []);

  return {
    isAuthenticated: !!token,
    token,
    login,
    logout,
  };
}

export const AdminAuthContext = createContext<AdminAuthState>({
  isAuthenticated: false,
  token: null,
  login: () => {},
  logout: () => {},
});

export function useAdminAuth(): AdminAuthState {
  return useContext(AdminAuthContext);
}
