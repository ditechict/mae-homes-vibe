import { Link } from "@tanstack/react-router";
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

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 border-b border-cocoa-deep/10 bg-cream/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" aria-label="Mae & Homes home"><SiteLogo /></Link>
          <nav className="flex items-center gap-6 text-sm md:gap-9">
            <a href="/#about" className={navCls}>About</a>
            <a href="/#services" className={navCls}>Services</a>
            <Link to="/properties" className={navCls} activeProps={{ className: "text-cocoa-deep gold-underline" }}>Properties</Link>
            <Link to="/insights" className={navCls} activeProps={{ className: "text-cocoa-deep gold-underline" }}>Insights</Link>
          </nav>
          <a href="/#contact" className="hidden rounded-full bg-cocoa-deep px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-cream transition hover:bg-cocoa md:inline-flex">
            Consult
          </a>
        </div>
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
