import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

function BakeryLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="24" cy="14" r="9" fill="currentColor" opacity="0.9" />
      {/* Chef hat */}
      <ellipse cx="24" cy="7" rx="7" ry="5" fill="currentColor" opacity="0.7" />
      <rect
        x="17"
        y="5"
        width="14"
        height="3"
        rx="1.5"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Body (apron shape) */}
      <path
        d="M14 26 Q14 22 24 22 Q34 22 34 26 L32 42 Q28 44 24 44 Q20 44 16 42 Z"
        fill="currentColor"
        opacity="0.75"
      />
      {/* Arms */}
      <ellipse
        cx="11"
        cy="30"
        rx="4"
        ry="2.5"
        fill="currentColor"
        opacity="0.65"
      />
      <ellipse
        cx="37"
        cy="30"
        rx="4"
        ry="2.5"
        fill="currentColor"
        opacity="0.65"
      />
      {/* Cake */}
      <rect
        x="16"
        y="30"
        width="16"
        height="6"
        rx="2"
        fill="white"
        opacity="0.9"
      />
      <rect
        x="18"
        y="28"
        width="12"
        height="4"
        rx="2"
        fill="white"
        opacity="0.85"
      />
      {/* Candle */}
      <rect
        x="23"
        y="24"
        width="2"
        height="5"
        rx="1"
        fill="oklch(0.62 0.18 72)"
        opacity="0.9"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="1.5"
        ry="2"
        fill="oklch(0.85 0.18 72)"
        opacity="0.9"
      />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "/" as const, label: "Home" },
  { href: "/products" as const, label: "Menu" },
];

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export function Layout({ children, hideNav = false }: LayoutProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      {!hideNav && (
        <header className="gradient-primary shadow-elevated sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              <Link
                to="/"
                className="flex items-center gap-3 group"
                data-ocid="nav.home_link"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground flex-shrink-0">
                  <BakeryLogo className="w-full h-full" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-xl md:text-2xl text-primary-foreground font-semibold tracking-tight">
                    Mummies One
                  </span>
                  <span className="text-primary-foreground/70 text-xs tracking-widest uppercase font-body">
                    Homemade Bakery
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    data-ocid={`nav.${link.label.toLowerCase()}_link`}
                    className={`px-4 py-2 rounded-md text-sm font-body font-medium transition-smooth ${
                      location.pathname === link.href
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="#contact"
                  data-ocid="nav.contact_link"
                  className="px-4 py-2 rounded-md text-sm font-body font-medium transition-smooth text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact
                </a>
                <a
                  href="tel:7013386529"
                  data-ocid="nav.call_button"
                  className="ml-2 flex items-center gap-2 px-4 py-2 rounded-md gradient-accent text-primary-foreground text-sm font-body font-medium transition-smooth hover:shadow-warm"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </nav>

              {/* Mobile menu toggle */}
              <button
                type="button"
                className="md:hidden text-primary-foreground p-2 rounded-md hover:bg-primary-foreground/10 transition-smooth"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                data-ocid="nav.mobile_menu_toggle"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Nav */}
            {menuOpen && (
              <div className="md:hidden pb-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
                    className={`px-4 py-3 rounded-md text-sm font-body font-medium transition-smooth ${
                      location.pathname === link.href
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="#contact"
                  data-ocid="nav.mobile_contact_link"
                  className="px-4 py-3 rounded-md text-sm font-body font-medium transition-smooth text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact
                </a>
                <a
                  href="tel:7013386529"
                  data-ocid="nav.mobile_call_button"
                  className="flex items-center gap-2 px-4 py-3 rounded-md gradient-accent text-primary-foreground text-sm font-body font-medium"
                >
                  <Phone className="w-4 h-4" />
                  Call: 7013386529
                </a>
              </div>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      {!hideNav && (
        <footer className="bg-muted/40 border-t border-border mt-auto">
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 text-primary">
                    <BakeryLogo className="w-full h-full" />
                  </div>
                  <span className="font-display text-lg text-foreground font-semibold">
                    Mummies One
                  </span>
                </div>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  Homemade with love. Every bite tells a story.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-foreground font-semibold text-sm uppercase tracking-wider mb-1">
                  Quick Links
                </h3>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-muted-foreground text-sm font-body hover:text-foreground transition-smooth"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-foreground font-semibold text-sm uppercase tracking-wider mb-1">
                  Contact Us
                </h3>
                <a
                  href="tel:7013386529"
                  className="flex items-center gap-2 text-accent font-body text-sm hover:text-accent/80 transition-smooth"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  7013386529
                </a>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                  Orders by advance booking only
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-body">
              <p>© {year} Mummies One Homemade Bakery. All rights reserved.</p>
              <p>
                Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
