import { useState, type FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials. Try admin / admin");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-surface-muted to-white p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-3xl mb-4 shadow-lg">
            🎂
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground">Mummies One</h1>
          <p className="text-sm text-sidebar-muted mt-1">Bakery Admin Panel</p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-primary-foreground mb-6">Sign In</h2>

          {error && (
            <div
              data-ocid="login.error_state"
              className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                required
                data-ocid="login.username_input"
              />
            </div>

            <div>
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                autoComplete="current-password"
                required
                data-ocid="login.password_input"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-2.5 mt-2 flex items-center justify-center gap-2"
              disabled={loading}
              data-ocid="login.submit_button"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-sidebar-muted">
            Default: <span className="font-mono bg-surface-muted px-1 rounded">admin</span> /{" "}
            <span className="font-mono bg-surface-muted px-1 rounded">admin</span>
          </p>
        </div>
      </div>
    </div>
  );
}
