import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell, VerificationNote } from "@/components/site-shell";
import { getProperty, whatsappFor } from "@/lib/properties";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = getProperty(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Listing not found — Mae & Homes" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.property;
    const title = `${p.name}, ${p.location} — ${p.price} | Mae & Homes`;
    const desc = `${p.specs}. ${p.status} in ${p.location}, ${p.city}. Ref ${p.ref}.`;
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ListingNotFound,
  component: PropertyDetail,
});

function ListingNotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl text-cocoa-deep">This listing is no longer available.</h1>
        <Link to="/properties" className="mt-8 inline-block gold-underline text-sm uppercase tracking-[0.2em] text-cocoa-deep">Browse the catalogue →</Link>
      </div>
    </SiteShell>
  );
}

function PropertyDetail() {
  const { property: p } = Route.useLoaderData();
  return (
    <SiteShell>
      <article className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <Link to="/properties" className="text-xs uppercase tracking-[0.2em] text-cocoa hover:text-gold">← Back to catalogue</Link>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <figure>
            <img src={p.img} alt={`${p.name} — ${p.location}`} width={1200} height={1400} decoding="async" fetchPriority="high"
              sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[4/3] w-full rounded-sm object-cover" />
            <figcaption className="mt-3 text-xs text-muted-foreground">
              {p.illustrative ? "Illustrative photo — not the actual plot. Site photos available on request." : "Additional photos and a video walk-through available on request."}
            </figcaption>
          </figure>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-cocoa">{p.ref} · {p.city} · {p.status}</div>
            <h1 className="mt-3 font-display text-4xl text-cocoa-deep md:text-5xl">{p.name}</h1>
            <div className="mt-2 text-muted-foreground">{p.location}, {p.city}</div>
            <div className="mt-6 flex items-baseline justify-between border-y border-cocoa-deep/15 py-4">
              <div className="font-display text-3xl text-gold">{p.price}</div>
              <div className="text-xs uppercase tracking-[0.15em] text-cocoa/80">{p.specs}</div>
            </div>
            {!p.verified && <VerificationNote className="mt-6" />}
            <p className="mt-6 leading-relaxed text-cocoa-deep/80">{p.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-[10px] uppercase tracking-[0.2em] text-cocoa">Type</dt><dd className="text-cocoa-deep">{p.type}</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.2em] text-cocoa">{p.landSqm ? "Land area" : "Bedrooms"}</dt><dd className="text-cocoa-deep">{p.landSqm ? `${p.landSqm.toLocaleString()} sqm` : p.beds}</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.2em] text-cocoa">Payment</dt><dd className="text-cocoa-deep">{p.pricePeriod ?? "Outright / plan on enquiry"}</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.2em] text-cocoa">Documents</dt><dd className="text-cocoa-deep">Shared for independent checks</dd></div>
            </dl>
            <div className="mt-8 text-xs uppercase tracking-[0.2em] text-cocoa">Features</div>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-cocoa-deep">
              {p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-gold">✦</span>{f}</li>)}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="/#contact" className="flex-1 rounded-full bg-cocoa-deep px-6 py-3.5 text-center text-xs uppercase tracking-[0.2em] text-cream hover:bg-cocoa">Request a viewing</a>
              <a href={whatsappFor(p)} target="_blank" rel="noreferrer" className="flex-1 rounded-full border border-cocoa-deep/30 px-6 py-3.5 text-center text-xs uppercase tracking-[0.2em] text-cocoa-deep hover:border-gold hover:text-gold">WhatsApp us</a>
            </div>
            <Link to="/insights/$slug" params={{ slug: "choosing-the-right-neighbourhood" }} className="mt-8 inline-block gold-underline text-sm text-cocoa-deep">
              Read: how to judge a neighbourhood before you buy →
            </Link>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
