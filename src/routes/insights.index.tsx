import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { faqs, insights } from "@/lib/insights";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Property Insights & Buyer Guides — Mae & Homes" },
      { name: "description", content: "Practical guidance on rental income, neighbourhood selection, Lagos locations, kitchens and buying property in Nigeria." },
      { property: "og:title", content: "Property Insights & Buyer Guides — Mae & Homes" },
      { property: "og:description", content: "Grounded advice for buyers and investors in Lagos, Abuja and the diaspora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="text-xs uppercase tracking-[0.3em] text-cocoa">— Insights</div>
        <h1 className="mt-4 font-display text-4xl text-cocoa-deep md:text-6xl">Start wisely.</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Guidance from Mae &amp; Homes for buyers, investors and homeowners.</p>
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((i) => (
            <Link key={i.slug} to="/insights/$slug" params={{ slug: i.slug }} className="group flex flex-col border-t border-cocoa-deep/20 pt-6">
              {i.image && (
                <div className="mb-6 overflow-hidden rounded-sm bg-sand">
                  <img src={i.image.src} alt={i.image.alt} width={i.image.width} height={i.image.height} loading="lazy" decoding="async"
                    className="aspect-square w-full object-contain transition duration-700 group-hover:scale-[1.02]" />
                </div>
              )}
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{i.category}</div>
              <h2 className="mt-2 font-display text-2xl text-cocoa-deep">{i.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{i.summary}</p>
              <span className="mt-4 text-xs uppercase tracking-[0.2em] text-cocoa-deep group-hover:text-gold">Read →</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="border-t border-cocoa-deep/10 bg-sand/40">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-xs uppercase tracking-[0.3em] text-cocoa">— Buyer FAQs</div>
          <h2 className="mt-4 font-display text-4xl text-cocoa-deep">Before you commit.</h2>
          <div className="mt-10 divide-y divide-cocoa-deep/15">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none font-display text-xl text-cocoa-deep">{f.q}<span className="float-right text-gold group-open:rotate-45 transition">+</span></summary>
                <p className="mt-3 text-sm leading-relaxed text-cocoa-deep/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
