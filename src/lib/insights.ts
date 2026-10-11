import rentalImg from "@/assets/editorial-mae_2.webp";
import kitchenImg from "@/assets/editorial-mae_3.webp";
import habitsImg from "@/assets/editorial-mae_5.webp";
import neighbourhoodImg from "@/assets/editorial-mae_6.webp";

export type Insight = {
  slug: string;
  title: string;
  summary: string;
  category: "Investing" | "Buying" | "Location" | "Interiors";
  image?: { src: string; alt: string; width: number; height: number; caption: string };
  sections: { h?: string; p: string[]; list?: string[] }[];
  topic: string;
};

export const insights: Insight[] = [
  {
    slug: "rental-income-start-smart",
    title: "Rental income is possible. Start smart.",
    summary: "It's not about how much you have — it's about the decisions you make. A grounded starting point for first-time property investors.",
    category: "Investing",
    topic: "rental income",
    image: { src: rentalImg, alt: "Mae & Homes flyer: Rental Income Is Possible. Start Smart.", width: 499, height: 620, caption: "From the Mae & Homes “Start Smart” series." },
    sections: [
      { p: ["It's not about how much you have. It's about the decisions you make. Beginners who do well usually research first, explore their options, and identify a realistic budget before committing."] },
      { h: "Where rental income can begin", p: ["There is more than one entry point. Depending on budget and goals, a path might start with:"], list: ["A block of flats", "A luxury apartment", "Budget-level opportunities", "Land, held as a strategic long-term decision"] },
      { h: "A note on land", p: ["Vacant land does not earn rent by itself. It can be a sound long-term position, but income only follows development or leasing. Returns are never guaranteed — we walk through the realistic numbers with you before you commit."] },
      { p: ["The goal isn't to start big. The goal is to start wisely."] },
    ],
  },
  {
    slug: "choosing-the-right-neighbourhood",
    title: "Sometimes the neighbourhood matters more than the house.",
    summary: "The most expensive house isn't always the smartest purchase. What to check about a location before you fall for a property.",
    category: "Buying",
    topic: "choosing a neighbourhood",
    image: { src: neighbourhoodImg, alt: "Mae & Homes Property Insight: The most expensive house isn't always the smartest purchase. Sometimes the neighborhood matters more than the house.", width: 828, height: 823, caption: "Property Insight 07, Mae & Homes." },
    sections: [
      { p: ["The most expensive house isn't always the smartest purchase. A well-built home in the wrong location can be harder to live in, harder to let, and harder to resell."] },
      { h: "Practical checks before you buy", p: ["Before making an offer, we encourage every client to look at:"], list: ["Access — daily commute, road condition in the rainy season, and traffic at peak hours", "Title — the type of title, whether it covers the exact plot, and searches at the relevant land registry", "Infrastructure — drainage, power supply, water and security arrangements", "Condition — an independent inspection of structure, roofing and services", "Comparables — what similar properties nearby have genuinely sold or let for"] },
      { p: ["We help you gather this information, but we always recommend independent legal and survey checks before any payment."] },
    ],
  },
  {
    slug: "maryland-lagos-mainland",
    title: "Don't buy property in Lagos until you understand the location.",
    summary: "An introduction to Maryland on the Lagos Mainland — and why location knowledge comes before any purchase.",
    category: "Location",
    topic: "Maryland, Lagos",
    sections: [
      { p: ["Lagos is not one market. Two properties a few kilometres apart can differ widely in access, flooding risk, documentation and long-term demand. Understanding the location comes first."] },
      { h: "Maryland and the Mainland", p: ["Maryland sits on the Lagos Mainland, close to areas such as Ikeja, Ikeja GRA, Gbagada, Somolu and Yaba. Buyers considering the Mainland often weigh its connectivity against the specific street, title and condition of each property."] },
      { p: ["Our full Maryland location guide and video are being prepared. If you're considering the Lagos Mainland, ask us about Maryland and we'll share what we know about the specific streets you're looking at."] },
    ],
  },
  {
    slug: "kitchens-designed-for-everyday-life",
    title: "A kitchen should make everyday life feel easier.",
    summary: "A kitchen should not only impress guests. Our interior design principles for kitchens that work as hard as they look.",
    category: "Interiors",
    topic: "kitchen design",
    image: { src: kitchenImg, alt: "Mae & Homes graphic: a wood kitchen with the quote 'A kitchen should not only impress guests. It should make everyday life feel easier.'", width: 504, height: 548, caption: "Design inspiration from Mae & Homes." },
    sections: [
      { p: ["A kitchen should not only impress guests. It should make everyday life feel easier."] },
      { h: "What we design for", p: ["Before choosing finishes, we start with how the household actually cooks, stores and gathers:"], list: ["Clear paths between storage, preparation and cooking", "Enough worktop either side of the hob and sink", "Lighting for tasks, not just atmosphere", "Durable, easy-clean surfaces suited to the climate", "Storage planned for bulk shopping and appliances"] },
      { p: ["Talk to us about an interior design consultation for your kitchen or whole home."] },
    ],
  },
  {
    slug: "habits-that-build-property-readiness",
    title: "You become what you repeatedly do.",
    summary: "Success is built through daily habits. How consistent saving prepares you for your first property decision.",
    category: "Investing",
    topic: "preparing to buy",
    image: { src: habitsImg, alt: "Mae & Homes graphic: model house and piggy bank with 'You Become What You Repeatedly Do'.", width: 499, height: 725, caption: "From the Mae & Homes motivation series." },
    sections: [
      { p: ["Success is built through daily habits. Owning property rarely begins with a single big moment — it begins with repeated, deliberate choices."] },
      { h: "Building readiness", p: ["Habits that move you closer to your property goals include:"], list: ["Setting a clear target and timeline", "Saving a fixed amount on a regular schedule", "Learning the costs beyond the price — legal fees, agency fees, documentation and inspections", "Speaking to an adviser before you feel 'ready', not after"] },
      { p: ["Build habits that move you closer to your goals."] },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);

export const faqs = [
  { q: "How do I verify a property's title?", a: "We share title documents early so you can conduct an independent search at the relevant land registry with your own lawyer. We recommend never paying before that check is complete." },
  { q: "Should I get an inspection?", a: "Yes. An independent inspection of structure, roofing, plumbing and electrics is strongly advised, particularly for older or off-plan properties." },
  { q: "What costs should I budget for beyond the price?", a: "Typically legal fees, agency fees, documentation and registration costs, and inspection or survey fees. Ask us for an itemised estimate for a specific property." },
  { q: "Can you represent me if I live abroad?", a: "Yes — we work with diaspora clients and can arrange viewings, video walk-throughs and coordination with your lawyer. Agree a written scope with us before we act on your behalf." },
  { q: "What happens after I enquire?", a: "We contact you by your preferred channel to understand your brief, share matching options and documents, and arrange viewings when you're ready." },
];
