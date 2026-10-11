import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getInsight, insights } from "@/lib/insights";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const insight = getInsight(params.slug);
    if (!insight) throw notFound();
    return { insight };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found — Mae & Homes" }, { name: "robots", content: "noindex" }] };
    const i = loaderData.insight;
    return {
      meta: [
        { title: `${i.title} — Mae & Homes Insights` }, { name: "description", content: i.summary },
        { property: "og:title", content: i.title }, { property: "og:description", content: i.summary },
        { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell><div className="py-32 text-center"><h1 className="font-display text-4xl text-cocoa-deep">Article not found.</h1>
      <Link to="/insights" className="mt-6 inline-block gold-underline text-cocoa-deep">All insights →</Link></div></SiteShell>
  ),
  component: InsightPage,
});

function InsightPage() {
  const { insight: i } = Route.useLoaderData();
  const others = insights.filter((o) => o.slug !== i.slug).slice(0, 3);
  const wa = `https://wa.me/2348029026160?text=${encodeURIComponent(`Hi Mae & Homes, I read your article and would like advice on ${i.topic}.`)}`;
  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <Link to="/insights" className="text-xs uppercase tracking-[0.2em] text-cocoa hover:text-gold">← All insights</Link>
        <div className="mt-8 text-[10px] uppercase tracking-[0.25em] text-gold">{i.category}</div>
        <h1 className="mt-3 font-display text-4xl leading-tight text-cocoa-deep md:text-5xl">{i.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{i.summary}</p>
        {i.image && (
          <figure className="mt-10">
            <img src={i.image.src} alt={i.image.alt} width={i.image.width} height={i.image.height} decoding="async"
              className="mx-auto max-h-[560px] w-auto rounded-sm" />
            <figcaption className="mt-3 text-center text-xs text-muted-foreground">{i.image.caption}</figcaption>
          </figure>
        )}
        <div className="mt-10 space-y-8 leading-relaxed text-cocoa-deep/85">
          {i.sections.map((s, idx) => (
            <section key={idx}>
              {s.h && <h2 className="mb-3 font-display text-2xl text-cocoa-deep">{s.h}</h2>}
              {s.p.map((p) => <p key={p} className="mb-3">{p}</p>)}
              {s.list && <ul className="mt-2 space-y-2">{s.list.map((l) => <li key={l} className="flex gap-2"><span className="text-gold">✦</span>{l}</li>)}</ul>}
            </section>
          ))}
        </div>
        <p className="mt-10 border-t border-cocoa-deep/15 pt-6 text-xs text-muted-foreground">General guidance only — not legal or financial advice. Property values and returns are not guaranteed.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={wa} target="_blank" rel="noreferrer" className="rounded-full bg-cocoa-deep px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-cream hover:bg-cocoa">Ask about {i.topic}</a>
          <Link to="/properties" className="rounded-full border border-cocoa-deep/30 px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-cocoa-deep hover:border-gold hover:text-gold">Browse properties</Link>
        </div>
      </article>
      <section className="mx-auto max-w-7xl border-t border-cocoa-deep/10 px-6 py-16">
        <div className="text-xs uppercase tracking-[0.3em] text-cocoa">— Keep reading</div>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} to="/insights/$slug" params={{ slug: o.slug }} className="group">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{o.category}</div>
              <h3 className="mt-2 font-display text-xl text-cocoa-deep group-hover:text-cocoa">{o.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
