import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import heroLiving from "@/assets/hero-living.jpg";
import livingLuxeAsset from "@/assets/living-luxe.jpg.asset.json";
import livingClassicAsset from "@/assets/living-classic.jpg.asset.json";
import bedroomBeigeAsset from "@/assets/bedroom-beige.jpg.asset.json";
import exteriorModernAsset from "@/assets/exterior-modern.jpg.asset.json";
import exteriorWhiteAsset from "@/assets/exterior-white.jpg.asset.json";
import landParcel from "@/assets/land-parcel.jpg";
import principalAsset from "@/assets/principal.jpg.asset.json";

const principal = principalAsset.url;
const livingLuxe = livingLuxeAsset.url;
const livingClassic = livingClassicAsset.url;
const bedroomBeige = bedroomBeigeAsset.url;
const exteriorModern = exteriorModernAsset.url;
const exteriorWhite = exteriorWhiteAsset.url;

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Mae & Homes — Real Estate & Interior Design | Lagos & Abuja" },
      { name: "description", content: "Trusted real estate and interior design partner across Lagos, Abuja and the Diaspora. Browse curated properties, land and investment opportunities." },
      { property: "og:title", content: "Mae & Homes — Real Estate & Interior Design | Lagos & Abuja" },
      { property: "og:description", content: "Boutique real estate and interior design firm in Lagos and Abuja. Land, residential, commercial and considered interiors." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroLiving },
      { name: "twitter:title", content: "Mae & Homes — Real Estate & Interior Design" },
      { name: "twitter:description", content: "Curated homes, land and interiors across Lagos & Abuja." },
      { name: "twitter:image", content: heroLiving },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});


function Monogram({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-sm border border-gold/60 bg-cocoa-deep text-gold">
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 26V10l10-6 10 6v16" />
          <path d="M6 26h20" />
          <path d="M13 26v-7h6v7" />
        </svg>
      </span>
      <span className="font-display text-lg tracking-wide">
        Mae <span className="text-gold">&amp;</span> Homes
      </span>
    </span>
  );
}

function Nav() {
  const [propsOpen, setPropsOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cocoa-deep/10 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-cocoa-deep"><Monogram /></a>
        <nav className="hidden items-center gap-9 text-sm text-cocoa-deep/80 md:flex">
          <a href="#about" className="hover:text-cocoa-deep">About</a>
          <a href="#services" className="hover:text-cocoa-deep">Services</a>
          <div
            className="relative"
            onMouseEnter={() => setPropsOpen(true)}
            onMouseLeave={() => setPropsOpen(false)}
          >
            <a href="#properties" className="hover:text-cocoa-deep" onClick={() => setPropsOpen(false)}>
              Properties <span className="text-cocoa/50">▾</span>
            </a>
            {propsOpen && (
              <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                <div className="min-w-[220px] rounded-sm border border-cocoa-deep/10 bg-cream shadow-elegant">
                  {[
                    { h: "#properties", l: "All Properties" },
                    { h: "#properties-lagos", l: "Lagos" },
                    { h: "#properties-abuja", l: "Abuja" },
                    { h: "#properties-land", l: "Land Parcels" },
                  ].map((i) => (
                    <a
                      key={i.h}
                      href={i.h}
                      onClick={() => setPropsOpen(false)}
                      className="block border-b border-cocoa-deep/10 px-5 py-3 text-xs uppercase tracking-[0.18em] text-cocoa-deep transition last:border-b-0 hover:bg-sand hover:text-gold"
                    >
                      {i.l}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-cocoa-deep px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-cream transition hover:bg-cocoa md:inline-flex"
        >
          Book a Consultation
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-cocoa-deep text-cream">
      <img
        src={heroLiving}
        alt="Warm modern living room interior with leather sofa and brass pendant lighting"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        width={1600}
        height={1200}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa-deep/70 via-cocoa-deep/50 to-cocoa-deep/95" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-16 pt-40 md:pb-24">
        <div className="mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold-soft">
          <span className="h-px w-10 bg-gold" />
          Real Estate · Interior Design · Investment
        </div>

        <h1 className="max-w-5xl font-display text-5xl leading-[1.02] text-balance sm:text-6xl md:text-7xl lg:text-[7.5rem]">
          Building spaces.
          <br />
          <em className="not-italic text-gold">Creating value.</em>
          <br />
          Elevating lives.
        </h1>

        <div className="mt-12 grid gap-10 border-t border-cream/15 pt-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-cream/80">
            A boutique real estate and interior design firm operating across Lagos, Abuja
            and the Diaspora. We negotiate the right deal, source the right land, and
            design the rooms that make a house feel like home.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#properties" className="rounded-full bg-gold px-7 py-4 text-xs uppercase tracking-[0.2em] text-cocoa-deep transition hover:bg-gold-soft">
              View Portfolio
            </a>
            <a href="#contact" className="rounded-full border border-cream/40 px-7 py-4 text-xs uppercase tracking-[0.2em] text-cream transition hover:border-gold hover:text-gold">
              Speak With Us
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-cream/15 pt-8 text-cream/80 md:grid-cols-4">
          {[
            ["12+", "Years in market"],
            ["₦40B+", "Property placed"],
            ["300+", "Homes styled"],
            ["2", "Cities · Lagos & Abuja"],
          ].map(([k, v]) => (
            <div key={v}>
              <div className="font-display text-3xl text-gold md:text-4xl">{k}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em]">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Land", "Residential", "Commercial", "Investments", "Interior Design", "Diaspora Advisory", "Property Management"];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-cocoa-deep/10 bg-cream py-6">
      <div className="marquee-track flex w-max gap-16 whitespace-nowrap px-6 font-display text-2xl text-cocoa-deep/70">
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-16">
            {it}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <span id="approach" className="sr-only" aria-hidden="true" />
      <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-cocoa">— Our Approach</div>
          <h2 className="mt-6 font-display text-4xl leading-tight text-cocoa-deep md:text-5xl lg:text-6xl">
            Real estate that <em className="text-gold not-italic">respects</em> the people
            who live in it.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            We started Mae &amp; Homes because too many Nigerian buyers were being sold
            square footage instead of a life. Every mandate we take on — from a plot in
            Lekki to a family home in Maitama — starts with a conversation, not a listing.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Then we design. Rooms that hold light. Kitchens that make everyday life feel
            easier. Investments that quietly compound.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <a href="#contact" className="gold-underline text-sm uppercase tracking-[0.2em] text-cocoa-deep">
              Start a conversation →
            </a>
          </div>
        </div>

        <div className="relative">
          <img
            src={principal}
            alt="Principal of Mae & Homes"
            className="aspect-[4/5] w-full rounded-sm object-cover shadow-elegant"
            loading="lazy"
            width={1000}
            height={1300}
          />
          <div className="absolute -bottom-8 -left-8 hidden max-w-xs bg-cream p-8 shadow-soft md:block">
            <div className="font-display text-2xl text-cocoa-deep">
              "Before you give up on a property, talk to me."
            </div>
            <div className="mt-4 text-xs uppercase tracking-[0.2em] text-cocoa">
              — Principal, Mae &amp; Homes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    n: "01",
    t: "Property Sales & Acquisition",
    d: "Residential, commercial, and off-plan opportunities across Lagos and Abuja — vetted, negotiated, closed with your name on the deed.",
    tags: ["Lekki", "Ikoyi", "Maitama", "Wuse II"],
  },
  {
    n: "02",
    t: "Land & Investment Advisory",
    d: "The right piece of land in the right corridor at the right time. We map the growth zones and structure entries that compound.",
    tags: ["CofO", "Governor's Consent", "Diaspora"],
  },
  {
    n: "03",
    t: "Interior Design & Styling",
    d: "From empty shell to fully considered home. Warm, functional interiors that respect the way you actually live.",
    tags: ["Full Fit-Out", "Restyle", "Furnishing"],
  },
  {
    n: "04",
    t: "Property & Rental Management",
    d: "Tenanting, servicing, and stewarding your asset so rental income shows up on time and the property keeps its value.",
    tags: ["Short-let", "Long-let", "Facility"],
  },
];

function Services() {
  return (
    <section id="services" className="bg-cocoa-deep py-28 text-cream md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold-soft">— Services</div>
            <h2 className="mt-6 max-w-3xl font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Four practices, one <em className="not-italic text-gold">standard of care</em>.
            </h2>
          </div>
          <p className="max-w-md text-cream/70">
            Whether you're buying your first plot or restyling a duplex, the process is
            the same: listen first, advise honestly, execute quietly.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-cream/10 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.n} className="group relative bg-cocoa-deep p-10 transition hover:bg-cocoa md:p-12">
              <div className="flex items-start justify-between">
                <span className="font-display text-sm text-gold">({s.n})</span>
                <span className="text-cream/40 transition group-hover:text-gold">→</span>
              </div>
              <h3 className="mt-8 font-display text-3xl text-cream md:text-4xl">{s.t}</h3>
              <p className="mt-4 max-w-md text-cream/70">{s.d}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full border border-cream/20 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-cream/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Property = {
  id: string;
  img: string;
  name: string;
  city: "Lagos" | "Abuja";
  location: string;
  price: string;
  specs: string;
  status: "For Sale" | "For Lease" | "Off-Plan";
  beds: number;
  description: string;
  features: string[];
};

const properties: Property[] = [
  {
    id: "ikota-residence",
    img: exteriorModern,
    name: "The Ikota Residence",
    city: "Lagos",
    location: "Megamound Estate, Lekki",
    price: "₦550M",
    specs: "5 Bed · Detached Duplex · BQ · Pool",
    status: "For Sale",
    beds: 5,
    description:
      "A quietly grand five-bedroom detached duplex set behind mature landscaping in Megamound. Double-height living, a chef's kitchen, and a private pool courtyard designed for slow evenings.",
    features: ["Private pool", "Chef's kitchen", "Staff quarters", "Smart security", "24/7 estate power", "Governor's Consent"],
  },
  {
    id: "maitama-terrace",
    img: exteriorWhite,
    name: "Maitama Terrace",
    city: "Abuja",
    location: "Maitama District",
    price: "₦480M",
    specs: "4 Bed · Contemporary · Smart Home",
    status: "For Sale",
    beds: 4,
    description:
      "A contemporary four-bedroom terrace in the heart of Maitama. Warm oak joinery, integrated smart-home controls, and a north-facing garden that stays cool through the harmattan.",
    features: ["Smart home", "Solar backup", "Fitted wardrobes", "Landscaped garden", "CofO", "Gated cluster"],
  },
  {
    id: "oniru-serviced",
    img: bedroomBeige,
    name: "Oniru Serviced Apartment",
    city: "Lagos",
    location: "Oniru, Victoria Island",
    price: "₦85M/yr",
    specs: "3 Bed · Fully Furnished · Concierge",
    status: "For Lease",
    beds: 3,
    description:
      "A fully furnished three-bedroom serviced apartment moments from Landmark. Concierge, gym, and a rooftop lounge — designed for executives and long-stay diaspora clients.",
    features: ["Fully furnished", "Concierge", "Gym & pool", "Backup power", "Short & long lease"],
  },
  {
    id: "asokoro-villa",
    img: livingClassic,
    name: "Asokoro Garden Villa",
    city: "Abuja",
    location: "Asokoro",
    price: "₦720M",
    specs: "6 Bed · Villa · Cinema · Staff Wing",
    status: "For Sale",
    beds: 6,
    description:
      "A six-bedroom garden villa on a quiet Asokoro cul-de-sac. Formal and family living wings, a private cinema, and a dedicated staff block with separate entry.",
    features: ["Private cinema", "Formal dining", "Staff wing", "Borehole", "Mature garden", "CofO"],
  },
  {
    id: "ikoyi-penthouse",
    img: livingLuxe,
    name: "Old Ikoyi Penthouse",
    city: "Lagos",
    location: "Bourdillon, Ikoyi",
    price: "₦1.2B",
    specs: "4 Bed · Penthouse · Private Lift",
    status: "Off-Plan",
    beds: 4,
    description:
      "A rare full-floor penthouse on Bourdillon with private lift lobby, wraparound terrace and lagoon views. Delivery Q3 next year — a considered investment position.",
    features: ["Private lift", "Wraparound terrace", "Lagoon views", "Concierge", "Off-plan pricing"],
  },
  {
    id: "katampe-land",
    img: landParcel,
    name: "Katampe Ext. Land Parcel",
    city: "Abuja",
    location: "Katampe Extension",
    price: "₦180M",
    specs: "1,200 sqm · CofO · Corner Piece",
    status: "For Sale",
    beds: 0,
    description:
      "A 1,200 sqm corner parcel in one of Abuja's most closely watched growth corridors. Fully documented with CofO — ready to build or hold.",
    features: ["1,200 sqm", "Corner piece", "CofO", "Tarred road", "Growth corridor"],
  },
];

type CityFilter = "All" | "Lagos" | "Abuja" | "Land";
const cityFilters: CityFilter[] = ["All", "Lagos", "Abuja", "Land"];

function filterFor(list: typeof properties, city: CityFilter) {
  if (city === "All") return list;
  if (city === "Land") return list.filter((p) => p.beds === 0);
  return list.filter((p) => p.city === city);
}

function Properties() {
  const [city, setCity] = useState<CityFilter>("All");
  const [active, setActive] = useState<Property | null>(null);

  const visible = useMemo(() => filterFor(properties, city), [city]);

  useEffect(() => {
    const applyHash = () => {
      const h = window.location.hash.toLowerCase();
      if (h === "#properties-lagos") setCity("Lagos");
      else if (h === "#properties-abuja") setCity("Abuja");
      else if (h === "#properties-land") setCity("Land");
      else if (h === "#properties") setCity("All");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);


  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <section id="properties" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-cocoa">— Featured Portfolio</div>
          <h2 className="mt-6 font-display text-4xl leading-tight text-cocoa-deep md:text-5xl lg:text-6xl">
            A quiet edit of what's on the market.
          </h2>
        </div>
        <a href="#contact" className="gold-underline text-sm uppercase tracking-[0.2em] text-cocoa-deep">
          Request the full list →
        </a>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        {cityFilters.map((c) => {
          const activeChip = city === c;
          const count = filterFor(properties, c).length;
          return (
            <button
              key={c}
              onClick={() => setCity(c)}
              aria-pressed={activeChip}
              className={`rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition ${
                activeChip
                  ? "border-cocoa-deep bg-cocoa-deep text-cream"
                  : "border-cocoa-deep/20 bg-transparent text-cocoa-deep hover:border-cocoa-deep/50"
              }`}
            >
              {c} <span className={activeChip ? "text-gold" : "text-cocoa/50"}>· {count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {visible.map((p) => (
          <article key={p.id} className="group cursor-pointer" onClick={() => setActive(p)}>
            <div className="relative overflow-hidden rounded-sm bg-sand">
              <img
                src={p.img}
                alt={`${p.name} — ${p.location}`}
                className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
                width={1200}
                height={1400}
              />
              <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cocoa-deep">
                {p.status}
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-cocoa-deep/85 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cream">
                {p.city}
              </span>
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-cocoa-deep/85 p-4 text-center text-[10px] uppercase tracking-[0.25em] text-cream transition group-hover:translate-y-0">
                View details →
              </div>
            </div>
            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl text-cocoa-deep">{p.name}</h3>
                <div className="mt-1 text-sm text-muted-foreground">{p.location}</div>
                <div className="mt-3 text-xs uppercase tracking-[0.15em] text-cocoa/80">{p.specs}</div>
              </div>
              <div className="text-right font-display text-2xl text-gold">{p.price}</div>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="mt-16 rounded-sm border border-dashed border-cocoa-deep/20 p-16 text-center text-muted-foreground">
          No listings match this filter right now — try another city.
        </div>
      )}

      {active && <PropertyModal property={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function PropertyModal({ property, onClose }: { property: Property; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={property.name}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-cocoa-deep/80 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-sm bg-cream shadow-elegant md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream/95 text-cocoa-deep transition hover:bg-gold"
        >
          ✕
        </button>
        <div className="relative md:w-1/2">
          <img
            src={property.img}
            alt={`${property.name} — ${property.location}`}
            className="h-64 w-full object-cover md:h-full"
          />
          <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cocoa-deep">
            {property.status}
          </span>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto p-8 md:p-10">
          <div className="text-xs uppercase tracking-[0.25em] text-cocoa">{property.city} · {property.status}</div>
          <h3 className="mt-3 font-display text-3xl text-cocoa-deep md:text-4xl">{property.name}</h3>
          <div className="mt-2 text-muted-foreground">{property.location}</div>
          <div className="mt-6 flex items-baseline justify-between border-y border-cocoa-deep/15 py-4">
            <div className="font-display text-3xl text-gold">{property.price}</div>
            <div className="text-xs uppercase tracking-[0.15em] text-cocoa/80">{property.specs}</div>
          </div>
          <p className="mt-6 leading-relaxed text-cocoa-deep/80">{property.description}</p>
          <div className="mt-8">
            <div className="text-xs uppercase tracking-[0.2em] text-cocoa">Features</div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-cocoa-deep">
              {property.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 text-gold">✦</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 rounded-full bg-cocoa-deep px-6 py-3.5 text-center text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-cocoa"
            >
              Request a viewing
            </a>
            <a
              href={`https://wa.me/2348029026160?text=${encodeURIComponent(`Hi Mae & Homes, I'd like to know more about ${property.name} (${property.location}).`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-full border border-cocoa-deep/30 px-6 py-3.5 text-center text-xs uppercase tracking-[0.2em] text-cocoa-deep transition hover:border-gold hover:text-gold"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


function SignatureWork() {
  return (
    <section id="signature" className="bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-cocoa">— Signature Work</div>
            <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight text-cocoa-deep md:text-5xl">
              A kitchen that <em className="not-italic text-gold">makes everyday life</em> feel easier.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Full fit-outs, restyles, and considered furnish packages. Neutral palettes,
            warm woods, brass hardware — the kind of rooms you actually want to come home to.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <img
            src={kitchenWarm}
            alt="Warm timber and marble kitchen with hidden pantry"
            className="aspect-[5/4] w-full rounded-sm object-cover shadow-soft"
            loading="lazy"
            width={1400}
            height={1120}
          />
          <img
            src={kitchenMarble}
            alt="Modern black and marble kitchen with cove lighting"
            className="aspect-[5/4] w-full rounded-sm object-cover shadow-soft"
            loading="lazy"
            width={1400}
            height={1120}
          />
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    q: "Sometimes the difference between owning a property and missing out is simply having someone negotiate on your behalf. Mae & Homes did exactly that for us.",
    n: "Adaeze O.",
    r: "Diaspora buyer · Lekki",
  },
  {
    q: "They turned an empty shell into a home in eight weeks. Same room, same floor — it just feels like a completely different life.",
    n: "Ifeoma & Tunde",
    r: "Homeowners · Ikoyi",
  },
  {
    q: "Honest advice, no pressure, and the paperwork was airtight. I finally understood what my land was actually worth.",
    n: "Musa A.",
    r: "Investor · Maitama, Abuja",
  },
];

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-cocoa">— In Their Words</div>
        <h2 className="mt-6 font-display text-4xl leading-tight text-cocoa-deep md:text-5xl lg:text-6xl">
          The clients we're built for.
        </h2>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.n} className="flex h-full flex-col justify-between border-t border-cocoa-deep/20 pt-8">
            <blockquote className="font-display text-2xl leading-snug text-cocoa-deep">
              "{t.q}"
            </blockquote>
            <figcaption className="mt-10">
              <div className="font-medium text-cocoa-deep">{t.n}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.r}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Cities() {
  return (
    <section className="bg-cocoa-deep py-24 text-cream">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
        {[
          { city: "Lagos", areas: ["Lekki", "Ikoyi", "Victoria Island", "Oniru", "Ajah", "Ikeja GRA"] },
          { city: "Abuja", areas: ["Maitama", "Asokoro", "Wuse II", "Jabi", "Katampe", "Gwarinpa"] },
        ].map((c) => (
          <div key={c.city}>
            <div className="text-xs uppercase tracking-[0.3em] text-gold-soft">— Where We Operate</div>
            <h3 className="mt-6 font-display text-6xl text-cream md:text-7xl">{c.city}</h3>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-cream/70">
              {c.areas.map((a) => (
                <span key={a} className="text-lg">{a}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <div className="grid gap-16 md:grid-cols-[1.1fr_1fr] md:gap-24">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-cocoa">— Contact</div>
          <h2 className="mt-6 font-display text-5xl leading-tight text-cocoa-deep md:text-6xl lg:text-7xl">
            Let's find the address that fits your life.
          </h2>
          <p className="mt-8 max-w-md text-lg text-muted-foreground">
            Book a private consultation. We'll listen first, then send back a shortlist
            worth your time.
          </p>

          <dl className="mt-12 space-y-6 text-cocoa-deep">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-cocoa">Phone</dt>
              <dd className="mt-1 font-display text-2xl">
                <a href="tel:+2348029026160" className="gold-underline">+234 802 902 6160</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-cocoa">Email</dt>
              <dd className="mt-1 font-display text-2xl">
                <a href="mailto:maeandhomes@gmail.com" className="gold-underline">maeandhomes@gmail.com</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-cocoa">Studios</dt>
              <dd className="mt-1 text-lg">Lagos · Abuja · By appointment</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); alert("Thank you — we'll be in touch within one business day."); }}
          className="rounded-sm border border-cocoa-deep/15 bg-cream p-8 shadow-soft md:p-10"
        >
          <div className="space-y-6">
            {[
              { l: "Full name", n: "name", t: "text" },
              { l: "Email", n: "email", t: "email" },
              { l: "Phone (optional)", n: "phone", t: "tel" },
            ].map((f) => (
              <div key={f.n}>
                <label className="text-xs uppercase tracking-[0.2em] text-cocoa">{f.l}</label>
                <input
                  required={f.n !== "phone"}
                  type={f.t}
                  name={f.n}
                  className="mt-2 w-full border-b border-cocoa-deep/30 bg-transparent py-3 text-cocoa-deep outline-none transition focus:border-gold"
                />
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-cocoa">I'm interested in</label>
              <select name="interest" className="mt-2 w-full border-b border-cocoa-deep/30 bg-transparent py-3 text-cocoa-deep outline-none focus:border-gold">
                <option>Buying property</option>
                <option>Selling / listing</option>
                <option>Land & investment advisory</option>
                <option>Interior design</option>
                <option>Property management</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-cocoa">Tell us a little more</label>
              <textarea name="message" rows={4} className="mt-2 w-full border-b border-cocoa-deep/30 bg-transparent py-3 text-cocoa-deep outline-none focus:border-gold" />
            </div>
            <button className="mt-4 w-full rounded-full bg-cocoa-deep py-4 text-xs uppercase tracking-[0.25em] text-cream transition hover:bg-cocoa">
              Request a Consultation
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-cocoa-deep/15 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="text-cocoa-deep"><Monogram /></div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Real Estate · Interior Design · Investment Advisory. Lagos, Nigeria &
              Abuja, FCT — serving clients at home and across the Diaspora.
            </p>
          </div>
          {[
            { h: "Company", l: ["Approach", "Services", "Careers", "Journal"] },
            { h: "Practice", l: ["Sales", "Land & Investment", "Interior Design", "Management"] },
            { h: "Contact", l: ["+234 802 902 6160", "maeandhomes@gmail.com", "@maeandhomes"] },
          ].map((c) => (
            <div key={c.h}>
              <div className="text-xs uppercase tracking-[0.2em] text-cocoa">{c.h}</div>
              <ul className="mt-4 space-y-2 text-sm text-cocoa-deep/80">
                {c.l.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-cocoa-deep/15 pt-8 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Mae &amp; Homes. All rights reserved.</div>
          <div className="uppercase tracking-[0.2em]">Building spaces · Creating value · Elevating lives</div>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main className="bg-cream">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Properties />
      <SignatureWork />
      <Testimonials />
      <Cities />
      <Contact />
      <Footer />
    </main>
  );
}
