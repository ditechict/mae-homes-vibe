import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { SiteShell } from "@/components/site-shell";
import { properties, propertyStatuses, propertyTypes } from "@/lib/properties";

const PAGE_SIZE = 6;

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  city: fallback(z.string(), "All").default("All"),
  status: fallback(z.string(), "All").default("All"),
  type: fallback(z.string(), "All").default("All"),
  beds: fallback(z.number(), 0).default(0),
  maxPrice: fallback(z.number(), 0).default(0),
  sort: fallback(z.string(), "featured").default("featured"),
  page: fallback(z.number().int(), 1).default(1),
});

export const Route = createFileRoute("/properties/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Property Catalogue — Lagos & Abuja Homes and Land | Mae & Homes" },
      { name: "description", content: "Search Mae & Homes listings in Lagos and Abuja by neighbourhood, reference, type, status, bedrooms and budget." },
      { property: "og:title", content: "Property Catalogue — Mae & Homes" },
      { property: "og:description", content: "Search homes, apartments and land across Lagos and Abuja." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalogue,
});

const priceOptions = [
  { v: 0, l: "Any budget" },
  { v: 200_000_000, l: "Up to ₦200M" },
  { v: 500_000_000, l: "Up to ₦500M" },
  { v: 800_000_000, l: "Up to ₦800M" },
];

const fieldCls = "w-full rounded-sm border border-cocoa-deep/20 bg-card px-3 py-2.5 text-sm text-cocoa-deep focus:border-gold focus:outline-none";
const labelCls = "text-[10px] uppercase tracking-[0.2em] text-cocoa";

function Catalogue() {
  const s = Route.useSearch();
  const navigate = Route.useNavigate();
  const set = (patch: Partial<typeof s>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch, page: patch.page ?? 1 }), replace: true });

  const results = useMemo(() => {
    const q = s.q.trim().toLowerCase();
    let list = properties.filter((p) => {
      if (q && ![p.name, p.location, p.city, p.ref].some((f) => f.toLowerCase().includes(q))) return false;
      if (s.city === "Land" ? p.type !== "Land" : s.city !== "All" && p.city !== s.city) return false;
      if (s.status !== "All" && p.status !== s.status) return false;
      if (s.type !== "All" && p.type !== s.type) return false;
      if (s.beds > 0 && p.beds < s.beds) return false;
      if (s.maxPrice > 0 && p.priceValue > s.maxPrice) return false;
      return true;
    });
    if (s.sort === "price-asc") list = [...list].sort((a, b) => a.priceValue - b.priceValue);
    if (s.sort === "price-desc") list = [...list].sort((a, b) => b.priceValue - a.priceValue);
    if (s.sort === "beds") list = [...list].sort((a, b) => b.beds - a.beds);
    return list;
  }, [s]);

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, s.page), pages);
  const shown = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="text-xs uppercase tracking-[0.3em] text-cocoa">— Catalogue</div>
        <h1 className="mt-4 font-display text-4xl text-cocoa-deep md:text-6xl">Find your next address.</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Search by neighbourhood, city, property name or listing reference. Listings marked “awaiting verification” are samples pending owner confirmation.
        </p>

        <div className="mt-10 grid gap-4 rounded-sm border border-cocoa-deep/10 bg-sand/40 p-5 md:grid-cols-4 lg:grid-cols-7">
          <label className="md:col-span-4 lg:col-span-2">
            <span className={labelCls}>Search</span>
            <input className={fieldCls} value={s.q} placeholder="e.g. Lekki, Maitama, MH-LG-001" onChange={(e) => set({ q: e.target.value })} />
          </label>
          <label><span className={labelCls}>City</span>
            <select className={fieldCls} value={s.city} onChange={(e) => set({ city: e.target.value })}>
              {["All", "Lagos", "Abuja", "Land"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label><span className={labelCls}>Status</span>
            <select className={fieldCls} value={s.status} onChange={(e) => set({ status: e.target.value })}>
              {["All", ...propertyStatuses].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label><span className={labelCls}>Type</span>
            <select className={fieldCls} value={s.type} onChange={(e) => set({ type: e.target.value })}>
              {["All", ...propertyTypes].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label><span className={labelCls}>Bedrooms</span>
            <select className={fieldCls} value={s.beds} onChange={(e) => set({ beds: Number(e.target.value) })}>
              {[0, 3, 4, 5, 6].map((b) => <option key={b} value={b}>{b ? `${b}+` : "Any"}</option>)}
            </select>
          </label>
          <label><span className={labelCls}>Budget</span>
            <select className={fieldCls} value={s.maxPrice} onChange={(e) => set({ maxPrice: Number(e.target.value) })}>
              {priceOptions.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="text-cocoa-deep" aria-live="polite">{results.length} {results.length === 1 ? "property" : "properties"}</div>
          <div className="flex items-center gap-4">
            <select aria-label="Sort" className="rounded-sm border border-cocoa-deep/20 bg-card px-3 py-2 text-sm" value={s.sort} onChange={(e) => set({ sort: e.target.value })}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="beds">Most bedrooms</option>
            </select>
            <Link to="/properties" search={{}} className="gold-underline text-xs uppercase tracking-[0.18em] text-cocoa-deep">Reset</Link>
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="mt-12 rounded-sm border border-dashed border-cocoa-deep/20 p-16 text-center text-muted-foreground">
            No listings match these filters. Try widening your budget or <a href="/#contact" className="gold-underline text-cocoa-deep">tell us what you're looking for</a>.
          </div>
        ) : (
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <Link key={p.id} to="/properties/$id" params={{ id: p.id }} className="group block">
                <div className="relative overflow-hidden rounded-sm bg-sand">
                  <img src={p.img} alt={`${p.name} — ${p.location}`} loading="lazy" decoding="async" width={1200} height={1400}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cocoa-deep">{p.status}</span>
                  {!p.verified && <span className="absolute bottom-4 left-4 rounded-full bg-cocoa-deep/85 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-cream">Awaiting verification</span>}
                  {p.illustrative && <span className="absolute bottom-4 right-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-cocoa-deep">Illustrative photo</span>}
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-cocoa/70">{p.ref}</div>
                    <h2 className="font-display text-2xl text-cocoa-deep">{p.name}</h2>
                    <div className="text-sm text-muted-foreground">{p.location}, {p.city}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.15em] text-cocoa/80">{p.specs}</div>
                  </div>
                  <div className="font-display text-2xl text-gold">{p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {pages > 1 && (
          <nav className="mt-12 flex justify-center gap-2" aria-label="Pagination">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => set({ page: n })} aria-current={n === page ? "page" : undefined}
                className={`h-10 w-10 rounded-full border text-sm ${n === page ? "border-cocoa-deep bg-cocoa-deep text-cream" : "border-cocoa-deep/20 text-cocoa-deep"}`}>{n}</button>
            ))}
          </nav>
        )}
      </section>
    </SiteShell>
  );
}
