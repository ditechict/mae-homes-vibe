import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import heroLiving from "@/assets/hero-living.jpg";
import kitchen from "@/assets/interior-kitchen.jpg";
import bedroom from "@/assets/interior-bedroom.jpg";
import dining from "@/assets/interior-dining.jpg";
import propertyLekki from "@/assets/property-lekki.jpg";
import propertyAbuja from "@/assets/property-abuja.jpg";
import founder from "@/assets/founder.jpg";

const SITE_TITLE = "Mae & Homes — Real Estate & Interior Design | Lagos & Abuja";
const SITE_DESC = "Boutique real estate and interior design firm across Lagos, Abuja and the Diaspora. Land, residential, commercial, investments and considered interiors.";

// Contact constants — used by header CTA, floating buttons, and footer.
const PHONE_DISPLAY = "+234 802 902 6160";
const PHONE_TEL = "+2348029026160";
const WHATSAPP_NUMBER = "2348029026160";
const WHATSAPP_MSG = encodeURIComponent(
  "Hello Mae & Homes, I'd like to speak with an advisor about a property.",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
const TEL_URL = `tel:${PHONE_TEL}`;

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Mae & Homes" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
      { name: "keywords", content: "real estate Lagos, real estate Abuja, Lekki property, Maitama property, interior design Nigeria, land investment Nigeria, Mae and Homes" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "Mae & Homes",
          description: SITE_DESC,
          telephone: PHONE_DISPLAY,
          email: "maeandhomes@gmail.com",
          areaServed: ["Lagos", "Abuja", "Nigeria"],
          address: [
            { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
            { "@type": "PostalAddress", addressLocality: "Abuja", addressCountry: "NG" },
          ],
        }),
      },
    ],
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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cocoa-deep/10 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-cocoa-deep"><Monogram /></a>
        <nav className="hidden items-center gap-9 text-sm text-cocoa-deep/80 md:flex">
          <a href="#services" className="hover:text-cocoa-deep">Services</a>
          <a href="#properties" className="hover:text-cocoa-deep">Properties</a>
          <a href="#interiors" className="hover:text-cocoa-deep">Interiors</a>
          <a href="#approach" className="hover:text-cocoa-deep">Approach</a>
          <a href="#journal" className="hover:text-cocoa-deep">Journal</a>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={TEL_URL}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="inline-flex items-center gap-2 rounded-full border border-cocoa-deep/25 px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-cocoa-deep transition hover:border-cocoa-deep"
          >
            <span aria-hidden>☎</span> Call
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-cocoa-deep px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-cream transition hover:bg-cocoa"
          >
            Book a Consultation
          </a>
        </div>
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
    <section id="approach" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
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
            src={founder}
            alt="Founder of Mae & Homes"
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
  gallery: string[];
  name: string;
  city: "Lagos" | "Abuja";
  location: string;
  price: string;
  specs: string;
  status: "For Sale" | "For Lease";
  beds: number;
  baths: number;
  sqm: number;
  description: string;
  features: string[];
};

const properties: Property[] = [
  {
    id: "ikota",
    img: propertyLekki,
    gallery: [propertyLekki, kitchen, bedroom, dining],
    name: "The Ikota Residence",
    city: "Lagos",
    location: "Megamound Estate, Lekki, Lagos",
    price: "₦550M",
    specs: "5 Bed · Detached Duplex · BQ · Pool",
    status: "For Sale",
    beds: 5,
    baths: 6,
    sqm: 620,
    description:
      "A fully detached family duplex on a quiet lane in Megamound. Double-height entry, chef's kitchen, cinema, and a pool wrapped in mature landscaping.",
    features: ["Swimming pool", "Boys' quarters", "Fitted kitchen", "24/7 security", "Solar inverter", "CofO"],
  },
  {
    id: "maitama",
    img: propertyAbuja,
    gallery: [propertyAbuja, dining, kitchen, bedroom],
    name: "Maitama Terrace",
    city: "Abuja",
    location: "Maitama District, Abuja",
    price: "₦480M",
    specs: "4 Bed · Contemporary · Smart Home",
    status: "For Sale",
    beds: 4,
    baths: 5,
    sqm: 540,
    description:
      "A contemporary terrace inside Maitama's diplomatic belt. Full smart-home wiring, private elevator, and a rooftop lounge with views of Aso Rock.",
    features: ["Smart home", "Private elevator", "Rooftop lounge", "Governor's Consent", "Serviced estate"],
  },
  {
    id: "oniru",
    img: bedroom,
    gallery: [bedroom, heroLiving, kitchen, dining],
    name: "Oniru Serviced Apartment",
    city: "Lagos",
    location: "Oniru, Victoria Island, Lagos",
    price: "₦85M/yr",
    specs: "3 Bed · Fully Furnished · Concierge",
    status: "For Lease",
    beds: 3,
    baths: 4,
    sqm: 210,
    description:
      "A fully furnished three-bed inside a serviced tower. Concierge, gym, and pool downstairs; walk to the beach and VI's best restaurants.",
    features: ["Fully furnished", "Concierge", "Gym & pool", "Short-let ready", "Ocean adjacent"],
  },
  {
    id: "asokoro",
    img: dining,
    gallery: [dining, propertyAbuja, kitchen, bedroom],
    name: "Asokoro Garden Villa",
    city: "Abuja",
    location: "Asokoro, Abuja",
    price: "₦620M",
    specs: "6 Bed · Villa · Guest Chalet · Garden",
    status: "For Sale",
    beds: 6,
    baths: 7,
    sqm: 780,
    description:
      "A rare garden villa on a full plot in Asokoro. Guest chalet, staff quarters, and a wraparound lawn that rarely comes to market in this district.",
    features: ["Garden villa", "Guest chalet", "Staff quarters", "C of O", "Borehole", "Standby generator"],
  },
  {
    id: "ikoyi",
    img: kitchen,
    gallery: [kitchen, heroLiving, bedroom, dining],
    name: "Bourdillon Skyhome",
    city: "Lagos",
    location: "Bourdillon, Ikoyi, Lagos",
    price: "₦1.2B",
    specs: "4 Bed · Penthouse · Private Pool",
    status: "For Sale",
    beds: 4,
    baths: 5,
    sqm: 460,
    description:
      "A full-floor penthouse on Bourdillon with a private plunge pool, dedicated staff wing and 360° views of Ikoyi, Falomo bridge and the lagoon.",
    features: ["Private pool", "Full-floor penthouse", "Staff wing", "Lagoon views", "Concierge tower"],
  },
  {
    id: "jabi",
    img: heroLiving,
    gallery: [heroLiving, propertyAbuja, dining, kitchen],
    name: "Jabi Lakeview Apartment",
    city: "Abuja",
    location: "Jabi, Abuja",
    price: "₦45M/yr",
    specs: "2 Bed · Furnished · Lake View",
    status: "For Lease",
    beds: 2,
    baths: 3,
    sqm: 155,
    description:
      "A quiet two-bed overlooking Jabi Lake. Recently restyled by our design studio — warm oak, brass, and light-flooded living areas.",
    features: ["Lake view", "Restyled 2025", "Furnished", "Estate power", "Covered parking"],
  },
];

function PropertyModal({ p, onClose }: { p: Property; onClose: () => void }) {
  const [active, setActive] = useState(0);
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cocoa-deep/80 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={p.name}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-sm bg-cream shadow-elegant"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream text-cocoa-deep shadow-soft transition hover:bg-gold hover:text-cocoa-deep"
        >
          ✕
        </button>
        <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
          <div className="bg-sand">
            <img
              src={p.gallery[active]}
              alt={`${p.name} — view ${active + 1}`}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="grid grid-cols-4 gap-2 p-3">
              {p.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square overflow-hidden rounded-sm border-2 transition ${
                    i === active ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-cocoa">
              <span className="rounded-full bg-gold/20 px-3 py-1 text-cocoa-deep">{p.status}</span>
              <span>{p.city}</span>
            </div>
            <h3 className="mt-5 font-display text-3xl text-cocoa-deep md:text-4xl">{p.name}</h3>
            <div className="mt-2 text-sm text-muted-foreground">{p.location}</div>
            <div className="mt-4 font-display text-3xl text-gold">{p.price}</div>
            <div className="mt-6 grid grid-cols-3 gap-4 border-y border-cocoa-deep/15 py-5 text-center">
              {[
                ["Beds", p.beds],
                ["Baths", p.baths],
                ["SQM", p.sqm],
              ].map(([l, v]) => (
                <div key={l}>
                  <div className="font-display text-2xl text-cocoa-deep">{v}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-cocoa">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.2em] text-cocoa">Features</div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-cocoa-deep/20 px-3 py-1 text-xs text-cocoa-deep"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hello Mae & Homes, I'd like details on ${p.name} (${p.location}).`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:brightness-95"
              >
                WhatsApp Advisor
              </a>
              <a
                href={TEL_URL}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cocoa-deep px-5 py-3 text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-cocoa"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Properties() {
  const [city, setCity] = useState<"All" | "Lagos" | "Abuja">("All");
  const [active, setActive] = useState<Property | null>(null);

  const filtered = useMemo(
    () => (city === "All" ? properties : properties.filter((p) => p.city === city)),
    [city],
  );

  const filters: Array<"All" | "Lagos" | "Abuja"> = ["All", "Lagos", "Abuja"];

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

      <div className="mt-10 flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const count = f === "All" ? properties.length : properties.filter((p) => p.city === f).length;
          const on = city === f;
          return (
            <button
              key={f}
              onClick={() => setCity(f)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition ${
                on
                  ? "border-cocoa-deep bg-cocoa-deep text-cream"
                  : "border-cocoa-deep/20 bg-transparent text-cocoa-deep hover:border-cocoa-deep"
              }`}
              aria-pressed={on}
            >
              {f}
              <span className={on ? "text-gold" : "text-cocoa/60"}>({count})</span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {filtered.map((p) => (
          <article key={p.id} className="group cursor-pointer" onClick={() => setActive(p)}>
            <div className="relative overflow-hidden rounded-sm bg-sand">
              <img
                src={p.img}
                alt={p.name}
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
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-cocoa-deep/80 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <span className="text-xs uppercase tracking-[0.2em] text-cream">View details</span>
                <span className="text-gold">→</span>
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

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          No listings match this filter — request the full off-market list.
        </p>
      )}

      {active && <PropertyModal p={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Mae & Homes on WhatsApp"
        className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-elegant transition hover:brightness-95"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.9c0 2.1.55 4.14 1.6 5.94L0 24l6.32-1.66a11.87 11.87 0 0 0 5.74 1.46h.01c6.56 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.45-8.42ZM12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.65-.24-.38a9.9 9.9 0 1 1 18.4-5.26c0 5.46-4.45 9.9-10 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.34.44-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5l-.56-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.3 1.26.48 1.69.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.29.18-1.42-.08-.13-.28-.2-.58-.35Z" />
        </svg>
        <span className="hidden text-xs font-medium uppercase tracking-[0.15em] sm:inline">
          WhatsApp
        </span>
      </a>
      <a
        href={TEL_URL}
        aria-label={`Call Mae & Homes at ${PHONE_DISPLAY}`}
        className="inline-flex items-center gap-2 rounded-full bg-cocoa-deep px-4 py-3 text-cream shadow-elegant transition hover:bg-cocoa"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.5.6.6 0 1.1.5 1.1 1.1v3.5c0 .6-.5 1.1-1.1 1.1C10.6 21.2 2.8 13.4 2.8 3.9c0-.6.5-1.1 1.1-1.1h3.5c.6 0 1.1.5 1.1 1.1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1l-2.2 2.4Z" />
        </svg>
        <span className="hidden text-xs font-medium uppercase tracking-[0.15em] sm:inline">
          Call now
        </span>
      </a>
    </div>
  );
}

function Interiors() {
  return (
    <section id="interiors" className="bg-sand py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-[1fr_1fr] md:items-center md:gap-24">
          <div className="grid grid-cols-2 gap-4">
            <img src={kitchen} alt="Warm minimalist kitchen with arched pantry" className="col-span-2 aspect-[5/4] w-full rounded-sm object-cover shadow-soft" loading="lazy" width={1200} height={1400} />
            <img src={dining} alt="Elegant dining space" className="aspect-[4/5] w-full rounded-sm object-cover" loading="lazy" width={1200} height={1400} />
            <img src={bedroom} alt="Warm bedroom design" className="aspect-[4/5] w-full rounded-sm object-cover" loading="lazy" width={1200} height={1400} />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-cocoa">— Interiors</div>
            <h2 className="mt-6 font-display text-4xl leading-tight text-cocoa-deep md:text-5xl lg:text-6xl">
              A kitchen shouldn't just <em className="not-italic text-gold">impress guests</em>. It should make everyday life feel easier.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              Our design studio works on full fit-outs, restyles, and quick furnish
              packages for new owners. Neutral palettes, warm woods, brass hardware, and
              a lot of restraint — the kind of rooms you actually want to come home to.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-cocoa-deep/15 pt-8 text-sm text-cocoa-deep">
              {[
                ["Timeless Design", "Details that age well."],
                ["Thoughtful Living", "Space planned around routines."],
                ["Crafted With Care", "Local makers, considered sourcing."],
                ["Made For Home", "Not for the camera. For you."],
              ].map(([t, d]) => (
                <div key={t}>
                  <div className="font-display text-xl">{t}</div>
                  <div className="mt-1 text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
          </div>
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
      <Interiors />
      <Testimonials />
      <Cities />
      <Contact />
      <Footer />
      <FloatingContact />
    </main>
  );
}
