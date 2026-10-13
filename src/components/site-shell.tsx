import { Link } from "@tanstack/react-router";
import { useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import type { ReactNode } from "react";
import logoAsset from "@/assets/mae-logo.webp.asset.json";

export function SiteLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Mae & Homes — Real Estate, Interior Design, Intelligent Investments"
      width={828}
      height={461}
      decoding="async"
      className={`h-14 w-auto object-contain ${className}`}
    />
  );
}

const navCls = "text-cocoa-deep/70 transition hover:text-cocoa-deep";

function usePathActive(path: string) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return pathname === path || pathname.startsWith(`${path}/`);
}

function DesktopLink({ to, label }: { to: string; label: string }) {
  const active = usePathActive(to);
  return (
    <Link
      to={to}
      className={active ? "text-cocoa-deep gold-underline" : navCls}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

function MobileLink({ to, label, onNavigate }: { to: string; label: string; onNavigate: () => void }) {
  const active = usePathActive(to);
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={`rounded-md px-3 py-3 text-base transition ${
        active
          ? "bg-sand/70 font-medium text-cocoa-deep gold-underline"
          : "text-cocoa-deep/80 hover:bg-sand/50 hover:text-cocoa-deep"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 border-b border-cocoa-deep/10 bg-cream/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" aria-label="Mae & Homes home" onClick={closeMenu}><SiteLogo /></Link>

          <nav className="hidden items-center gap-6 text-sm md:flex md:gap-9" aria-label="Primary">
            <a href="/#about" className={navCls}>About</a>
            <a href="/#services" className={navCls}>Services</a>
            <DesktopLink to="/properties" label="Properties" />
            <DesktopLink to="/insights" label="Insights" />
          </nav>

          <a href="/#contact" className="hidden rounded-full bg-cocoa-deep px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-cream transition hover:bg-cocoa md:inline-flex">
            Consult
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-cocoa-deep transition hover:bg-sand/70 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-cocoa-deep/10 bg-cream md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-5 pt-3">
              <a href="/#about" onClick={closeMenu} className="rounded-md px-3 py-3 text-base text-cocoa-deep/80 transition hover:bg-sand/50 hover:text-cocoa-deep">
                About
              </a>
              <a href="/#services" onClick={closeMenu} className="rounded-md px-3 py-3 text-base text-cocoa-deep/80 transition hover:bg-sand/50 hover:text-cocoa-deep">
                Services
              </a>
              <MobileLink to="/properties" label="Properties" onNavigate={closeMenu} />
              <MobileLink to="/insights" label="Insights" onNavigate={closeMenu} />
              <a href="/#contact" onClick={closeMenu} className="mt-3 rounded-full bg-cocoa-deep px-5 py-3 text-center text-[11px] uppercase tracking-[0.18em] text-cream transition hover:bg-cocoa">
                Consult
              </a>
            </div>
          </nav>
        )}
      </header>
      {children}
      <footer className="border-t border-cocoa-deep/15">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-12 text-sm text-muted-foreground md:flex-row md:items-center">
          <SiteLogo />
          <div className="flex flex-wrap gap-6">
            <Link to="/properties" className={navCls}>Catalogue</Link>
            <Link to="/insights" className={navCls}>Insights</Link>
            <a href="tel:+2348029026160" className={navCls}>+234 802 902 6160</a>
            <a href="mailto:maeandhomes@gmail.com" className={navCls}>maeandhomes@gmail.com</a>
          </div>
          <div>© {new Date().getFullYear()} Mae &amp; Homes</div>
        </div>
      </footer>
    </main>
  );
}

export function VerificationNote({ className = "" }: { className?: string }) {
  return (
    <p className={`rounded-sm border border-gold/40 bg-sand/60 px-4 py-3 text-xs leading-relaxed text-cocoa-deep/80 ${className}`}>
      Sample listing — price, availability, title and specifications are awaiting owner verification.
      Always confirm details and inspect documents before any payment.
    </p>
  );
}
