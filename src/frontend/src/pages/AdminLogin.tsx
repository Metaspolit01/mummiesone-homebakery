import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useAdminLogin } from "@/hooks/useBakery";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Store, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdminAuth();
  const adminLogin = useAdminLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    void navigate({ to: "/admin/dashboard" });
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const token = await adminLogin.mutateAsync({ username, password });
      login(token);
      toast.success("Welcome back, Admin!");
      void navigate({ to: "/admin/dashboard" });
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl gradient-primary items-center justify-center mb-4 shadow-elevated">
            <Store className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl text-foreground font-bold">
            Mummies One
          </h1>
          <p className="text-muted-foreground text-sm font-body mt-1">
            Bakery Admin Panel
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl shadow-elevated border border-border p-7">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground font-body">
              Secure Login
            </span>
          </div>

          <form
            onSubmit={(e) => void handleSubmit(e)}
            className="flex flex-col gap-4"
            data-ocid="admin_login.form"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username" className="font-body text-sm">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoComplete="username"
                  className="pl-10 font-body"
                  data-ocid="admin_login.username_input"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="font-body text-sm">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="pl-10 font-body"
                  data-ocid="admin_login.password_input"
                />
              </div>
            </div>

            {error && (
              <p
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 font-body"
                data-ocid="admin_login.error_state"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={adminLogin.isPending}
              className="gradient-primary text-primary-foreground border-0 font-body w-full mt-1 hover:opacity-90 transition-smooth"
              data-ocid="admin_login.submit_button"
            >
              {adminLogin.isPending ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-xs font-body mt-5">
            Authorized staff only.
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5 font-body">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Built with caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
