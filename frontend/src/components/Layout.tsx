import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "DM Sans, sans-serif" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: "oklch(0.99 0.005 130)",
          borderColor: "oklch(0.88 0.05 130)",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Branding */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="header.logo_link"
            style={{ textDecoration: "none" }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold"
              style={{
                backgroundColor: "oklch(0.72 0.15 130)",
                color: "oklch(0.15 0.03 130)",
              }}
            >
              M
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="font-bold text-base"
                style={{ fontFamily: "Fraunces, serif", color: "oklch(0.18 0.02 130)" }}
              >
                Mummies One
              </span>
              <span className="text-xs" style={{ color: "oklch(0.45 0.04 130)" }}>
                Homemade Bakery
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.${link.label.toLowerCase()}_link`}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? "oklch(0.15 0.03 130)" : "oklch(0.35 0.04 130)",
                    backgroundColor: isActive ? "oklch(0.85 0.10 130)" : "transparent",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                        "oklch(0.92 0.06 130)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                        "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="tel:7013386529"
              data-ocid="nav.call_button"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: "oklch(0.72 0.15 130)",
                color: "oklch(0.15 0.03 130)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "oklch(0.64 0.16 130)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "oklch(0.72 0.15 130)";
              }}
            >
              📞 Call Us
            </a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1" style={{ backgroundColor: "oklch(0.97 0.01 130)" }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        className="border-t"
        style={{
          backgroundColor: "oklch(0.93 0.05 130)",
          borderColor: "oklch(0.88 0.05 130)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p
                className="font-bold text-base"
                style={{ fontFamily: "Fraunces, serif", color: "oklch(0.18 0.02 130)" }}
              >
                Mummies One Bakery
              </p>
              <p className="text-sm mt-0.5" style={{ color: "oklch(0.40 0.04 130)" }}>
                Homemade treats crafted with love in Hyderabad
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="tel:7013386529"
                data-ocid="footer.call_link"
                className="text-sm font-medium flex items-center gap-1.5 transition-colors duration-200"
                style={{ color: "oklch(0.25 0.10 130)", textDecoration: "none" }}
              >
                📞 7013386529
              </a>
            </div>
          </div>
          <div
            className="mt-6 pt-4 text-center text-xs border-t"
            style={{
              borderColor: "oklch(0.84 0.06 130)",
              color: "oklch(0.50 0.04 130)",
            }}
          >
            © {currentYear}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(0.35 0.10 130)" }}
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
