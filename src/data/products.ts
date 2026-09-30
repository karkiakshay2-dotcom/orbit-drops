export interface Product {
  id: string;
  name: string;
  code: string;
  tagline: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  description: string;
  specs: string[];
  materials: string[];
  stockLeft: number;
  totalStock: number;
  sizes: string[];
  weight: string;
  colorway: string;
  collection: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "drop-01",
    name: "Orbit Apex Cobalt Puffer",
    code: "APX-700-BLU",
    tagline: "Hydro-repellent down insulation with bonded membrane shell",
    price: 280,
    originalPrice: 360,
    image: "/products/cobalt_puffer.jpg",
    category: "Outerwear / Technical Puffer",
    description: "Architectural two-tone technical puffer crafted with a storm-grade breathable membrane and 750-fill power water-resistant down insulation. Engineered for sub-zero urban navigation and variable atmospheric pressure. Features magnetic storm flap and concealed dual storm pockets.",
    specs: [
      "750-fill RDS-certified hydrophobic down cluster fill",
      "Gore-Tex Infinium™ 3-layer windproof shell with DWR finish",
      "Ergonomic storm-hood with dual-point cohort cinching",
      "Bonded seam taping throughout for wind and precipitation lockout"
    ],
    materials: [
      "Cobalt 3-Layer Performance Nylon",
      "Midnight Hydrophobic Micro-Ripstop",
      "AquaGuard® Matte Water-Repellent Zippers",
      "Thermal Mesh Internal Lining"
    ],
    stockLeft: 8,
    totalStock: 50,
    sizes: ["S", "M", "L", "XL"],
    weight: "740g",
    colorway: "Cobalt / Deep Midnight",
    collection: "COLLECTION 04: HYDRO-DRIFT"
  },
  {
    id: "drop-02",
    name: "Hydro-Shield Modular Vest",
    code: "HSM-420-NVY",
    tagline: "Laser-cut modular utility chest rig with quick-release clasps",
    price: 190,
    originalPrice: 250,
    image: "/products/utility_vest.jpg",
    category: "Vests / Modular Rigging",
    description: "Precision-tailored tactical chest harness crafted from 1000D Cordura® ballistic weave. Features modular quick-release German Fidlock® buckles, laser-perforated airflow panels, and electromagnetic-shielded device sleeves.",
    specs: [
      "Laser-cut modular attachment grid for accessory integration",
      "Matte black German Fidlock® quick-dock magnetic chest clasps",
      "Weather-sealed device pocket with audio routing port",
      "Breathable 3D spacer mesh rear panel for thermal dispersion"
    ],
    materials: [
      "1000D Cordura® Ballistic Nylon",
      "Fidlock® V-Buckle 25mm",
      "Anodized Aluminum Carabiner Anchor D-Rings",
      "Reinforced Bar-Tack Seams"
    ],
    stockLeft: 6,
    totalStock: 35,
    sizes: ["S", "M", "L"],
    weight: "420g",
    colorway: "Midnight Obsidian",
    collection: "COLLECTION 04: HYDRO-DRIFT"
  },
  {
    id: "drop-03",
    name: "Zero-G Utility Cargo",
    code: "ZGC-310-DKN",
    tagline: "Articulated ripstop pants with zero-drag cinch cords",
    price: 160,
    originalPrice: 220,
    image: "/products/cargo_pant.jpg",
    category: "Pants / Technical Cargo",
    description: "Ergonomically cut cargo pants constructed with an abrasion-resistant Kevlar® ripstop blend. Featuring 8 functional compartments, modular calf tension adjusters, and magnetic cargo flaps for kinetic mobility.",
    specs: [
      "8 low-profile cargo pockets with magnetic flap closure",
      "Articulated multi-panel knee darts for uninhibited flex",
      "Integrated webbing belt with quick-release buckle",
      "Hydrophobic DWR coating with 4-way mechanical stretch"
    ],
    materials: [
      "Kevlar® / Nylon Ripstop Blend",
      "German Fidlock® Tension Buckles",
      "Matte AquaGuard® Zips",
      "Reinforced Seat & Ankle Cuffs"
    ],
    stockLeft: 11,
    totalStock: 45,
    sizes: ["S", "M", "L", "XL"],
    weight: "480g",
    colorway: "Deep Midnight Navy",
    collection: "COLLECTION 04: HYDRO-DRIFT"
  },
  {
    id: "drop-04",
    name: "Magnetic Fidlock Beanie",
    code: "MFB-090-CBL",
    tagline: "Merino-blend ribbed knit with matte magnetic Fidlock latch",
    price: 45,
    originalPrice: 65,
    image: "/products/fidlock_beanie.jpg",
    category: "Headwear / Technical Knit",
    description: "Low-profile rib-knit watch cap woven from ultra-fine Merino wool and technical acrylic. Features a functional matte black German Fidlock® magnetic buckle mounted on the fold, allowing rapid tethering to jackets or bags.",
    specs: [
      "100% fine-gauge Merino wool blend with temperature regulation",
      "Integrated matte German Fidlock® magnetic side latch",
      "Double-layered fold cuff with contrasting cobalt edge detail",
      "Comfort seam construction preventing forehead friction"
    ],
    materials: [
      "50% Extra-fine Merino Wool, 50% Recycled Technical Acrylic",
      "Fidlock® Magnetic Buckle Mount",
      "Tonal Embroidered Logo"
    ],
    stockLeft: 14,
    totalStock: 60,
    sizes: ["ONE SIZE"],
    weight: "68g",
    colorway: "Deep Navy / Cobalt Trim",
    collection: "COLLECTION 04: HYDRO-DRIFT"
  }
];
