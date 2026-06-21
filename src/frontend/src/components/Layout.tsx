import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, Menu, Shield, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Hymns", path: "/hymns" },
  { label: "Bible", path: "/bible-readings" },
  { label: "Announcements", path: "/announcements" },
  { label: "Sunday Program", path: "/sunday-program" },
  { label: "Sermons", path: "/sermon-schedule" },
  { label: "Service Book", path: "/service-book" },
];

function AdminBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground border border-accent/40">
      <Shield size={10} />
      Admin
    </span>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    isAuthenticated,
    isAdmin,
    isInitializing,
    isLoggingIn,
    handleLogin,
    handleLogout,
  } = useAuth();

  const currentPath = useLocation({ select: (l) => l.pathname });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Header ── */}
      <header
        className="bg-primary text-primary-foreground border-b-2 border-accent sticky top-0 z-50 shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 no-underline text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center">
              <BookOpen size={18} className="text-accent" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-sm leading-none">
                St. James ACK
              </div>
              <div className="text-primary-foreground/70 text-xs">Malaba</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors no-underline ${
                  currentPath === link.path
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth controls */}
          <div className="flex items-center gap-2 shrink-0">
            {isAdmin && <AdminBadge />}
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden md:inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md text-accent border border-accent/40 hover:bg-accent/10 transition-colors no-underline font-medium"
              >
                <Shield size={12} /> Dashboard
              </Link>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={isAuthenticated ? handleLogout : handleLogin}
              disabled={isInitializing || isLoggingIn}
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground hover:border-primary-foreground/50 text-xs"
            >
              {isInitializing
                ? "Loading…"
                : isLoggingIn
                  ? "Logging in…"
                  : isAuthenticated
                    ? "Logout"
                    : "Admin Login"}
            </Button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden p-1.5 rounded-md text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav
            className="md:hidden bg-primary border-t border-primary-foreground/20 px-4 pb-4"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors ${
                    currentPath === link.path
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-accent hover:bg-primary-foreground/10 no-underline transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 bg-background">{children}</main>

      {/* ── Footer ── */}
      <footer className="bg-card border-t border-border py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-primary" />
            <span className="font-display font-medium text-foreground">
              St. James ACK Malaba
            </span>
            <span>— Digital Church System</span>
          </div>
          <div className="text-xs">
            © {new Date().getFullYear()} St. James ACK Malaba. All rights reserved.
          </div>
        </div>
      </footer>

      <Toaster richColors position="top-right" />
    </div>
  );
}
