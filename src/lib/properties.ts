import livingLuxeAsset from "@/assets/living-luxe.jpg.asset.json";
import livingClassicAsset from "@/assets/living-classic.jpg.asset.json";
import bedroomBeigeAsset from "@/assets/bedroom-beige.jpg.asset.json";
import exteriorModernAsset from "@/assets/exterior-modern.jpg.asset.json";
import exteriorWhiteAsset from "@/assets/exterior-white.jpg.asset.json";
import landParcel from "@/assets/land-parcel.jpg";

export type PropertyStatus = "For Sale" | "For Lease" | "Off-Plan";
export type PropertyType = "Detached" | "Terrace" | "Apartment" | "Villa" | "Penthouse" | "Land";

export type Property = {
  id: string;
  ref: string;
  img: string;
  /** True when the photo is illustrative, not of the actual property. */
  illustrative?: boolean;
  name: string;
  city: "Lagos" | "Abuja";
  location: string;
  price: string;
  priceValue: number; // naira, for sorting/filtering
  pricePeriod?: "per year";
  specs: string;
  status: PropertyStatus;
  type: PropertyType;
  beds: number;
  landSqm?: number;
  description: string;
  features: string[];
  /** Owner verification state. Unverified listings are flagged on every view. */
  verified: boolean;
};

export const properties: Property[] = [
  {
    id: "ikota-residence", ref: "MH-LG-001", img: exteriorModernAsset.url,
    name: "The Ikota Residence", city: "Lagos", location: "Megamound Estate, Lekki",
    price: "₦550M", priceValue: 550_000_000, specs: "5 Bed · Detached Duplex · BQ · Pool",
    status: "For Sale", type: "Detached", beds: 5, verified: false,
    description: "A quietly grand five-bedroom detached duplex set behind mature landscaping in Megamound. Double-height living, a chef's kitchen, and a private pool courtyard designed for slow evenings.",
    features: ["Private pool", "Chef's kitchen", "Staff quarters", "Smart security", "24/7 estate power", "Governor's Consent"],
  },
  {
    id: "maitama-terrace", ref: "MH-AB-001", img: exteriorWhiteAsset.url,
    name: "Maitama Terrace", city: "Abuja", location: "Maitama District",
    price: "₦480M", priceValue: 480_000_000, specs: "4 Bed · Contemporary · Smart Home",
    status: "For Sale", type: "Terrace", beds: 4, verified: false,
    description: "A contemporary four-bedroom terrace in the heart of Maitama. Warm oak joinery, integrated smart-home controls, and a north-facing garden that stays cool through the harmattan.",
    features: ["Smart home", "Solar backup", "Fitted wardrobes", "Landscaped garden", "CofO", "Gated cluster"],
  },
  {
    id: "oniru-serviced", ref: "MH-LG-002", img: bedroomBeigeAsset.url,
    name: "Oniru Serviced Apartment", city: "Lagos", location: "Oniru, Victoria Island",
    price: "₦85M/yr", priceValue: 85_000_000, pricePeriod: "per year", specs: "3 Bed · Fully Furnished · Concierge",
    status: "For Lease", type: "Apartment", beds: 3, verified: false,
    description: "A fully furnished three-bedroom serviced apartment moments from Landmark. Concierge, gym, and a rooftop lounge — designed for executives and long-stay diaspora clients.",
    features: ["Fully furnished", "Concierge", "Gym & pool", "Backup power", "Short & long lease"],
  },
  {
    id: "asokoro-villa", ref: "MH-AB-002", img: livingClassicAsset.url,
    name: "Asokoro Garden Villa", city: "Abuja", location: "Asokoro",
    price: "₦720M", priceValue: 720_000_000, specs: "6 Bed · Villa · Cinema · Staff Wing",
    status: "For Sale", type: "Villa", beds: 6, verified: false,
    description: "A six-bedroom garden villa on a quiet Asokoro cul-de-sac. Formal and family living wings, a private cinema, and a dedicated staff block with separate entry.",
    features: ["Private cinema", "Formal dining", "Staff wing", "Borehole", "Mature garden", "CofO"],
  },
  {
    id: "ikoyi-penthouse", ref: "MH-LG-003", img: livingLuxeAsset.url,
    name: "Old Ikoyi Penthouse", city: "Lagos", location: "Bourdillon, Ikoyi",
    price: "₦1.2B", priceValue: 1_200_000_000, specs: "4 Bed · Penthouse · Private Lift",
    status: "Off-Plan", type: "Penthouse", beds: 4, verified: false,
    description: "A rare full-floor penthouse on Bourdillon with private lift lobby, wraparound terrace and lagoon views. Delivery timeline to be confirmed on enquiry.",
    features: ["Private lift", "Wraparound terrace", "Lagoon views", "Concierge", "Off-plan pricing"],
  },
  {
    id: "katampe-land", ref: "MH-AB-003", img: landParcel, illustrative: true,
    name: "Katampe Ext. Land Parcel", city: "Abuja", location: "Katampe Extension",
    price: "₦180M", priceValue: 180_000_000, specs: "1,200 sqm · CofO · Corner Piece",
    status: "For Sale", type: "Land", beds: 0, landSqm: 1200, verified: false,
    description: "A 1,200 sqm corner parcel in one of Abuja's growth corridors. Title documents are shared for independent verification before any commitment.",
    features: ["1,200 sqm", "Corner piece", "CofO (to be verified)", "Tarred road"],
  },
];

export const propertyTypes: PropertyType[] = ["Detached", "Terrace", "Apartment", "Villa", "Penthouse", "Land"];
export const propertyStatuses: PropertyStatus[] = ["For Sale", "For Lease", "Off-Plan"];

export const getProperty = (id: string) => properties.find((p) => p.id === id);

export const whatsappFor = (p: Property) =>
  `https://wa.me/2348029026160?text=${encodeURIComponent(`Hi Mae & Homes, I'd like to know more about ${p.name} (ref ${p.ref}, ${p.location}).`)}`;
