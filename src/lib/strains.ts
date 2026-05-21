export interface Strain {
  id: string;
  name: string;
  slug: string;
  type: "sativa" | "indica" | "hybrid" | "cbd";
  thc: number;
  cbd: number;
  terpenes: string[];
  effects: string[];
  flavors: string[];
  description: string;
  lineage: { parent1: string; parent2: string };
  growDifficulty: "easy" | "moderate" | "hard";
  flowerTime: string;
}

export interface InventoryUnit {
  id: string;
  strainId: string;
  dispensaryId: string;
  growHouseId: string;
  size: string;
  unit: string;
  price: number;
  wholesalePrice: number;
  quantity: number;
  batchId: string;
  harvestDate: string;
  testDate: string;
  thcTested: number;
  cbdTested: number;
  status: "available" | "low-stock" | "sold-out" | "coming-soon";
  coaId?: string;
}

export interface COA {
  id: string;
  batchId: string;
  growHouseId: string;
  strainId: string;
  labName: string;
  labLicense: string;
  testDate: string;
  expirationDate: string;
  fileName: string;
  fileUrl: string;
  results: {
    thc: number;
    thca: number;
    cbd: number;
    cbda: number;
    cbg: number;
    cbn: number;
    totalCannabinoids: number;
    totalTerpenes: number;
    topTerpenes: { name: string; percentage: number }[];
    moisture: number;
    passedPesticides: boolean;
    passedHeavyMetals: boolean;
    passedMicrobials: boolean;
    passedMycotoxins: boolean;
    passedResidualSolvents: boolean;
  };
  status: "verified" | "pending" | "expired" | "rejected";
  uploadedAt: string;
  uploadedBy: string;
}

export interface GrowHouseVolume {
  growHouseId: string;
  strainId: string;
  availableLbs: number;
  projectedLbs: number;
  nextHarvestDate: string;
  lastUpdated: string;
}

import { GrowHouse } from "./types";

export const growHouses: GrowHouse[] = [
  {
    id: "gh1",
    name: "Rocky Mountain Cultivators",
    slug: "rocky-mountain-cultivators",
    description:
      "State-of-the-art indoor cultivation facility specializing in premium flower. Climate-controlled rooms with proprietary LED lighting for maximum terpene expression.",
    address: "2800 Industrial Pkwy",
    city: "Denver",
    state: "CO",
    license: "GROW-CO-2024-0041",
    type: "indoor",
    certifications: ["Clean Green Certified", "GMP Compliant", "Pesticide-Free"],
    capacity: "25,000 sq ft",
    phone: "(303) 555-0310",
    email: "wholesale@rockymtncultivators.com",
    wholesale: true,
    minOrder: "1 lb",
    rating: 4.9,
    reviewCount: 87,
  },
  {
    id: "gh2",
    name: "Sun Valley Farms",
    slug: "sun-valley-farms",
    description:
      "Sustainable outdoor and greenhouse operation on 40 acres. Sun-grown cannabis with organic soil practices and natural pest management.",
    address: "18500 County Rd 7",
    city: "Pueblo",
    state: "CO",
    license: "GROW-CO-2024-0078",
    type: "greenhouse",
    certifications: ["Organic Certified", "Sun+Earth Certified", "Carbon Neutral"],
    capacity: "40 acres",
    phone: "(719) 555-0455",
    email: "orders@sunvalleyfarms.com",
    wholesale: true,
    minOrder: "5 lbs",
    rating: 4.7,
    reviewCount: 63,
  },
  {
    id: "gh3",
    name: "Peak Genetics Lab",
    slug: "peak-genetics-lab",
    description:
      "Research-driven cultivation focused on rare genetics and high-CBD strains. Small-batch, hand-trimmed flower with full COA on every harvest.",
    address: "440 Biotech Dr",
    city: "Boulder",
    state: "CO",
    license: "GROW-CO-2024-0112",
    type: "indoor",
    certifications: ["GMP Compliant", "ISO 17025 Lab Partner", "Pesticide-Free"],
    capacity: "8,000 sq ft",
    phone: "(720) 555-0589",
    email: "sales@peakgeneticslab.com",
    wholesale: true,
    minOrder: "0.5 lb",
    rating: 4.8,
    reviewCount: 41,
  },
  {
    id: "gh4",
    name: "High Plains Harvest Co.",
    slug: "high-plains-harvest",
    description:
      "Large-scale hybrid operation combining greenhouse and outdoor grows. Known for consistent bulk supply and competitive wholesale pricing.",
    address: "9200 Plains Blvd",
    city: "Aurora",
    state: "CO",
    license: "GROW-CO-2024-0156",
    type: "hybrid",
    certifications: ["Clean Green Certified", "GMP Compliant"],
    capacity: "60,000 sq ft + 20 acres",
    phone: "(303) 555-0722",
    email: "wholesale@highplainsharvest.com",
    wholesale: true,
    minOrder: "10 lbs",
    rating: 4.5,
    reviewCount: 52,
  },
];

export const strains: Strain[] = [
  {
    id: "s1",
    name: "Blue Dream",
    slug: "blue-dream",
    type: "hybrid",
    thc: 21,
    cbd: 0.1,
    terpenes: ["Myrcene", "Caryophyllene", "Pinene"],
    effects: ["Relaxed", "Creative", "Euphoric", "Happy"],
    flavors: ["Berry", "Sweet", "Herbal"],
    description:
      "A California classic. Blue Dream balances full-body relaxation with gentle cerebral invigoration. Perfect for daytime relief without heavy sedation.",
    lineage: { parent1: "Blueberry", parent2: "Haze" },
    growDifficulty: "easy",
    flowerTime: "9-10 weeks",
  },
  {
    id: "s2",
    name: "OG Kush",
    slug: "og-kush",
    type: "indica",
    thc: 24,
    cbd: 0.3,
    terpenes: ["Limonene", "Myrcene", "Linalool"],
    effects: ["Euphoric", "Sleepy", "Hungry", "Relaxed"],
    flavors: ["Earthy", "Pine", "Woody"],
    description:
      "The backbone of West Coast cannabis. OG Kush delivers heavy euphoria and stress relief with its signature earthy, pine aroma.",
    lineage: { parent1: "Chemdawg", parent2: "Hindu Kush" },
    growDifficulty: "moderate",
    flowerTime: "8-9 weeks",
  },
  {
    id: "s3",
    name: "Sour Diesel",
    slug: "sour-diesel",
    type: "sativa",
    thc: 22,
    cbd: 0.2,
    terpenes: ["Caryophyllene", "Limonene", "Myrcene"],
    effects: ["Energetic", "Creative", "Focused", "Uplifted"],
    flavors: ["Diesel", "Citrus", "Pungent"],
    description:
      "Fast-acting sativa with dreamy cerebral effects. Named for its pungent, diesel-like aroma. A go-to for daytime productivity.",
    lineage: { parent1: "Chemdawg 91", parent2: "Super Skunk" },
    growDifficulty: "moderate",
    flowerTime: "10-11 weeks",
  },
  {
    id: "s4",
    name: "Girl Scout Cookies",
    slug: "girl-scout-cookies",
    type: "hybrid",
    thc: 25,
    cbd: 0.1,
    terpenes: ["Caryophyllene", "Limonene", "Humulene"],
    effects: ["Euphoric", "Happy", "Relaxed", "Creative"],
    flavors: ["Sweet", "Earthy", "Mint"],
    description:
      "A potent hybrid with a sweet, earthy aroma. GSC launches you to euphoria before settling into full-body relaxation.",
    lineage: { parent1: "OG Kush", parent2: "Durban Poison" },
    growDifficulty: "hard",
    flowerTime: "9-10 weeks",
  },
  {
    id: "s5",
    name: "Granddaddy Purple",
    slug: "granddaddy-purple",
    type: "indica",
    thc: 20,
    cbd: 0.1,
    terpenes: ["Myrcene", "Pinene", "Caryophyllene"],
    effects: ["Sleepy", "Relaxed", "Hungry", "Euphoric"],
    flavors: ["Grape", "Berry", "Sweet"],
    description:
      "A famous indica cross known for its complex grape and berry aroma. Delivers a potent physical relaxation paired with cerebral euphoria.",
    lineage: { parent1: "Purple Urkle", parent2: "Big Bud" },
    growDifficulty: "easy",
    flowerTime: "8-11 weeks",
  },
  {
    id: "s6",
    name: "Jack Herer",
    slug: "jack-herer",
    type: "sativa",
    thc: 18,
    cbd: 0.1,
    terpenes: ["Terpinolene", "Pinene", "Myrcene"],
    effects: ["Creative", "Energetic", "Focused", "Happy"],
    flavors: ["Pine", "Earthy", "Spicy"],
    description:
      "Named after the cannabis activist, Jack Herer captures the cerebral elevation associated with sativas while producing heavy resin.",
    lineage: { parent1: "Haze", parent2: "Northern Lights #5 x Shiva Skunk" },
    growDifficulty: "moderate",
    flowerTime: "8-10 weeks",
  },
  {
    id: "s7",
    name: "Wedding Cake",
    slug: "wedding-cake",
    type: "hybrid",
    thc: 27,
    cbd: 0.1,
    terpenes: ["Limonene", "Caryophyllene", "Myrcene"],
    effects: ["Relaxed", "Euphoric", "Happy", "Sleepy"],
    flavors: ["Vanilla", "Sweet", "Earthy"],
    description:
      "A rich, tangy hybrid with relaxing and euphoric effects. Wedding Cake is known for its high THC content and dessert-like flavor profile.",
    lineage: { parent1: "Triangle Kush", parent2: "Animal Mints" },
    growDifficulty: "moderate",
    flowerTime: "7-9 weeks",
  },
  {
    id: "s8",
    name: "ACDC",
    slug: "acdc",
    type: "cbd",
    thc: 1,
    cbd: 20,
    terpenes: ["Myrcene", "Pinene", "Caryophyllene"],
    effects: ["Relaxed", "Focused", "Happy", "Pain Relief"],
    flavors: ["Earthy", "Woody", "Pine"],
    description:
      "A CBD-dominant strain with a remarkable THC:CBD ratio of 1:20. Ideal for patients seeking relief without intoxication.",
    lineage: { parent1: "Cannatonic", parent2: "Ruderalis" },
    growDifficulty: "easy",
    flowerTime: "9-10 weeks",
  },
  {
    id: "s9",
    name: "Gelato",
    slug: "gelato",
    type: "hybrid",
    thc: 23,
    cbd: 0.1,
    terpenes: ["Limonene", "Caryophyllene", "Humulene"],
    effects: ["Relaxed", "Euphoric", "Creative", "Uplifted"],
    flavors: ["Sweet", "Citrus", "Berry"],
    description:
      "A flavorful hybrid with a dessert-like aroma. Gelato offers a balanced high that relaxes the body while keeping the mind sharp.",
    lineage: { parent1: "Sunset Sherbet", parent2: "Thin Mint GSC" },
    growDifficulty: "hard",
    flowerTime: "8-9 weeks",
  },
  {
    id: "s10",
    name: "Northern Lights",
    slug: "northern-lights",
    type: "indica",
    thc: 18,
    cbd: 0.1,
    terpenes: ["Myrcene", "Caryophyllene", "Pinene"],
    effects: ["Sleepy", "Relaxed", "Happy", "Euphoric"],
    flavors: ["Earthy", "Pine", "Sweet"],
    description:
      "One of the most famous indicas of all time. Northern Lights packs a resinous punch with a fast, dreamy euphoria that settles into full-body calm.",
    lineage: { parent1: "Afghani", parent2: "Thai" },
    growDifficulty: "easy",
    flowerTime: "7-9 weeks",
  },
];

export const inventory: InventoryUnit[] = [
  // Green Valley Dispensary
  {
    id: "inv-1",
    strainId: "s1",
    dispensaryId: "1",
    growHouseId: "gh1",
    size: "1g",
    unit: "gram",
    price: 14,
    wholesalePrice: 8,
    quantity: 48,
    batchId: "GV-BD-2026-042",
    harvestDate: "2026-04-15",
    testDate: "2026-04-22",
    thcTested: 21.3,
    cbdTested: 0.08,
    status: "available",
    coaId: "coa-1",
  },
  {
    id: "inv-2",
    strainId: "s1",
    dispensaryId: "1",
    growHouseId: "gh1",
    size: "3.5g",
    unit: "eighth",
    price: 45,
    wholesalePrice: 26,
    quantity: 22,
    batchId: "GV-BD-2026-042",
    harvestDate: "2026-04-15",
    testDate: "2026-04-22",
    thcTested: 21.3,
    cbdTested: 0.08,
    status: "available",
    coaId: "coa-1",
  },
  {
    id: "inv-3",
    strainId: "s1",
    dispensaryId: "1",
    growHouseId: "gh1",
    size: "7g",
    unit: "quarter",
    price: 80,
    wholesalePrice: 48,
    quantity: 10,
    batchId: "GV-BD-2026-042",
    harvestDate: "2026-04-15",
    testDate: "2026-04-22",
    thcTested: 21.3,
    cbdTested: 0.08,
    status: "available",
    coaId: "coa-1",
  },
  {
    id: "inv-4",
    strainId: "s1",
    dispensaryId: "1",
    growHouseId: "gh1",
    size: "28g",
    unit: "ounce",
    price: 280,
    wholesalePrice: 160,
    quantity: 3,
    batchId: "GV-BD-2026-042",
    harvestDate: "2026-04-15",
    testDate: "2026-04-22",
    thcTested: 21.3,
    cbdTested: 0.08,
    status: "low-stock",
    coaId: "coa-1",
  },
  {
    id: "inv-5",
    strainId: "s2",
    dispensaryId: "1",
    growHouseId: "gh1",
    size: "3.5g",
    unit: "eighth",
    price: 50,
    wholesalePrice: 30,
    quantity: 35,
    batchId: "GV-OG-2026-039",
    harvestDate: "2026-04-01",
    testDate: "2026-04-08",
    thcTested: 24.1,
    cbdTested: 0.28,
    status: "available",
    coaId: "coa-2",
  },
  {
    id: "inv-6",
    strainId: "s2",
    dispensaryId: "1",
    growHouseId: "gh1",
    size: "7g",
    unit: "quarter",
    price: 90,
    wholesalePrice: 54,
    quantity: 12,
    batchId: "GV-OG-2026-039",
    harvestDate: "2026-04-01",
    testDate: "2026-04-08",
    thcTested: 24.1,
    cbdTested: 0.28,
    status: "available",
    coaId: "coa-2",
  },
  {
    id: "inv-7",
    strainId: "s4",
    dispensaryId: "1",
    growHouseId: "gh2",
    size: "3.5g",
    unit: "eighth",
    price: 55,
    wholesalePrice: 32,
    quantity: 0,
    batchId: "GV-GSC-2026-038",
    harvestDate: "2026-03-20",
    testDate: "2026-03-27",
    thcTested: 25.4,
    cbdTested: 0.09,
    status: "sold-out",
    coaId: "coa-3",
  },
  {
    id: "inv-8",
    strainId: "s7",
    dispensaryId: "1",
    growHouseId: "gh4",
    size: "3.5g",
    unit: "eighth",
    price: 58,
    wholesalePrice: 34,
    quantity: 0,
    batchId: "GV-WC-2026-044",
    harvestDate: "2026-05-01",
    testDate: "2026-05-08",
    thcTested: 27.2,
    cbdTested: 0.07,
    status: "coming-soon",
    coaId: "coa-5",
  },
  // Mountain High Cannabis
  {
    id: "inv-9",
    strainId: "s3",
    dispensaryId: "2",
    growHouseId: "gh2",
    size: "3.5g",
    unit: "eighth",
    price: 48,
    wholesalePrice: 28,
    quantity: 28,
    batchId: "MH-SD-2026-041",
    harvestDate: "2026-04-10",
    testDate: "2026-04-17",
    thcTested: 22.5,
    cbdTested: 0.18,
    status: "available",
    coaId: "coa-3",
  },
  {
    id: "inv-10",
    strainId: "s3",
    dispensaryId: "2",
    growHouseId: "gh2",
    size: "7g",
    unit: "quarter",
    price: 85,
    wholesalePrice: 50,
    quantity: 8,
    batchId: "MH-SD-2026-041",
    harvestDate: "2026-04-10",
    testDate: "2026-04-17",
    thcTested: 22.5,
    cbdTested: 0.18,
    status: "available",
    coaId: "coa-3",
  },
  {
    id: "inv-11",
    strainId: "s5",
    dispensaryId: "2",
    growHouseId: "gh4",
    size: "3.5g",
    unit: "eighth",
    price: 45,
    wholesalePrice: 26,
    quantity: 40,
    batchId: "MH-GDP-2026-040",
    harvestDate: "2026-04-05",
    testDate: "2026-04-12",
    thcTested: 20.8,
    cbdTested: 0.12,
    status: "available",
    coaId: "coa-6",
  },
  {
    id: "inv-12",
    strainId: "s6",
    dispensaryId: "2",
    growHouseId: "gh3",
    size: "3.5g",
    unit: "eighth",
    price: 42,
    wholesalePrice: 24,
    quantity: 5,
    batchId: "MH-JH-2026-037",
    harvestDate: "2026-03-15",
    testDate: "2026-03-22",
    thcTested: 18.9,
    cbdTested: 0.11,
    status: "low-stock",
  },
  {
    id: "inv-13",
    strainId: "s9",
    dispensaryId: "2",
    growHouseId: "gh1",
    size: "3.5g",
    unit: "eighth",
    price: 52,
    wholesalePrice: 30,
    quantity: 18,
    batchId: "MH-GL-2026-043",
    harvestDate: "2026-04-20",
    testDate: "2026-04-27",
    thcTested: 23.6,
    cbdTested: 0.06,
    status: "available",
  },
  // Sunset Wellness Co.
  {
    id: "inv-14",
    strainId: "s8",
    dispensaryId: "3",
    growHouseId: "gh3",
    size: "3.5g",
    unit: "eighth",
    price: 38,
    wholesalePrice: 22,
    quantity: 55,
    batchId: "SW-AC-2026-040",
    harvestDate: "2026-04-08",
    testDate: "2026-04-15",
    thcTested: 0.9,
    cbdTested: 20.4,
    status: "available",
    coaId: "coa-4",
  },
  {
    id: "inv-15",
    strainId: "s8",
    dispensaryId: "3",
    growHouseId: "gh3",
    size: "7g",
    unit: "quarter",
    price: 68,
    wholesalePrice: 40,
    quantity: 30,
    batchId: "SW-AC-2026-040",
    harvestDate: "2026-04-08",
    testDate: "2026-04-15",
    thcTested: 0.9,
    cbdTested: 20.4,
    status: "available",
    coaId: "coa-4",
  },
  {
    id: "inv-16",
    strainId: "s10",
    dispensaryId: "3",
    growHouseId: "gh2",
    size: "3.5g",
    unit: "eighth",
    price: 40,
    wholesalePrice: 22,
    quantity: 20,
    batchId: "SW-NL-2026-042",
    harvestDate: "2026-04-18",
    testDate: "2026-04-25",
    thcTested: 18.2,
    cbdTested: 0.09,
    status: "available",
  },
  {
    id: "inv-17",
    strainId: "s5",
    dispensaryId: "3",
    growHouseId: "gh4",
    size: "3.5g",
    unit: "eighth",
    price: 44,
    wholesalePrice: 25,
    quantity: 2,
    batchId: "SW-GDP-2026-041",
    harvestDate: "2026-04-12",
    testDate: "2026-04-19",
    thcTested: 19.5,
    cbdTested: 0.14,
    status: "low-stock",
  },
];

export const coas: COA[] = [
  {
    id: "coa-1",
    batchId: "GV-BD-2026-042",
    growHouseId: "gh1",
    strainId: "s1",
    labName: "Colorado Analytical Labs",
    labLicense: "LAB-CO-2024-0012",
    testDate: "2026-04-22",
    expirationDate: "2027-04-22",
    fileName: "COA-GV-BD-2026-042.pdf",
    fileUrl: "/coa/COA-GV-BD-2026-042.pdf",
    results: {
      thc: 21.3,
      thca: 24.1,
      cbd: 0.08,
      cbda: 0.12,
      cbg: 0.34,
      cbn: 0.02,
      totalCannabinoids: 25.86,
      totalTerpenes: 3.2,
      topTerpenes: [
        { name: "Myrcene", percentage: 1.2 },
        { name: "Caryophyllene", percentage: 0.9 },
        { name: "Pinene", percentage: 0.6 },
      ],
      moisture: 10.2,
      passedPesticides: true,
      passedHeavyMetals: true,
      passedMicrobials: true,
      passedMycotoxins: true,
      passedResidualSolvents: true,
    },
    status: "verified",
    uploadedAt: "2026-04-23T10:00:00Z",
    uploadedBy: "Rocky Mountain Cultivators",
  },
  {
    id: "coa-2",
    batchId: "GV-OG-2026-039",
    growHouseId: "gh1",
    strainId: "s2",
    labName: "Colorado Analytical Labs",
    labLicense: "LAB-CO-2024-0012",
    testDate: "2026-04-08",
    expirationDate: "2027-04-08",
    fileName: "COA-GV-OG-2026-039.pdf",
    fileUrl: "/coa/COA-GV-OG-2026-039.pdf",
    results: {
      thc: 24.1,
      thca: 27.3,
      cbd: 0.28,
      cbda: 0.35,
      cbg: 0.41,
      cbn: 0.05,
      totalCannabinoids: 28.4,
      totalTerpenes: 2.8,
      topTerpenes: [
        { name: "Limonene", percentage: 1.1 },
        { name: "Myrcene", percentage: 0.8 },
        { name: "Linalool", percentage: 0.5 },
      ],
      moisture: 9.8,
      passedPesticides: true,
      passedHeavyMetals: true,
      passedMicrobials: true,
      passedMycotoxins: true,
      passedResidualSolvents: true,
    },
    status: "verified",
    uploadedAt: "2026-04-09T14:30:00Z",
    uploadedBy: "Rocky Mountain Cultivators",
  },
  {
    id: "coa-3",
    batchId: "MH-SD-2026-041",
    growHouseId: "gh2",
    strainId: "s3",
    labName: "Green Scientific Labs",
    labLicense: "LAB-CO-2024-0027",
    testDate: "2026-04-17",
    expirationDate: "2027-04-17",
    fileName: "COA-MH-SD-2026-041.pdf",
    fileUrl: "/coa/COA-MH-SD-2026-041.pdf",
    results: {
      thc: 22.5,
      thca: 25.6,
      cbd: 0.18,
      cbda: 0.22,
      cbg: 0.29,
      cbn: 0.01,
      totalCannabinoids: 26.8,
      totalTerpenes: 3.5,
      topTerpenes: [
        { name: "Caryophyllene", percentage: 1.4 },
        { name: "Limonene", percentage: 1.0 },
        { name: "Myrcene", percentage: 0.7 },
      ],
      moisture: 11.0,
      passedPesticides: true,
      passedHeavyMetals: true,
      passedMicrobials: true,
      passedMycotoxins: true,
      passedResidualSolvents: true,
    },
    status: "verified",
    uploadedAt: "2026-04-18T09:15:00Z",
    uploadedBy: "Sun Valley Farms",
  },
  {
    id: "coa-4",
    batchId: "SW-AC-2026-040",
    growHouseId: "gh3",
    strainId: "s8",
    labName: "Peak Testing Services",
    labLicense: "LAB-CO-2024-0041",
    testDate: "2026-04-15",
    expirationDate: "2027-04-15",
    fileName: "COA-SW-AC-2026-040.pdf",
    fileUrl: "/coa/COA-SW-AC-2026-040.pdf",
    results: {
      thc: 0.9,
      thca: 1.1,
      cbd: 20.4,
      cbda: 23.1,
      cbg: 0.8,
      cbn: 0.01,
      totalCannabinoids: 25.42,
      totalTerpenes: 2.1,
      topTerpenes: [
        { name: "Myrcene", percentage: 0.9 },
        { name: "Pinene", percentage: 0.6 },
        { name: "Caryophyllene", percentage: 0.4 },
      ],
      moisture: 10.5,
      passedPesticides: true,
      passedHeavyMetals: true,
      passedMicrobials: true,
      passedMycotoxins: true,
      passedResidualSolvents: true,
    },
    status: "verified",
    uploadedAt: "2026-04-16T11:45:00Z",
    uploadedBy: "Peak Genetics Lab",
  },
  {
    id: "coa-5",
    batchId: "GV-WC-2026-044",
    growHouseId: "gh4",
    strainId: "s7",
    labName: "Colorado Analytical Labs",
    labLicense: "LAB-CO-2024-0012",
    testDate: "2026-05-08",
    expirationDate: "2027-05-08",
    fileName: "COA-GV-WC-2026-044.pdf",
    fileUrl: "/coa/COA-GV-WC-2026-044.pdf",
    results: {
      thc: 27.2,
      thca: 30.8,
      cbd: 0.07,
      cbda: 0.09,
      cbg: 0.52,
      cbn: 0.03,
      totalCannabinoids: 31.71,
      totalTerpenes: 3.8,
      topTerpenes: [
        { name: "Limonene", percentage: 1.5 },
        { name: "Caryophyllene", percentage: 1.1 },
        { name: "Myrcene", percentage: 0.8 },
      ],
      moisture: 9.5,
      passedPesticides: true,
      passedHeavyMetals: true,
      passedMicrobials: true,
      passedMycotoxins: true,
      passedResidualSolvents: true,
    },
    status: "pending",
    uploadedAt: "2026-05-09T08:00:00Z",
    uploadedBy: "High Plains Harvest Co.",
  },
  {
    id: "coa-6",
    batchId: "MH-GDP-2026-040",
    growHouseId: "gh4",
    strainId: "s5",
    labName: "Green Scientific Labs",
    labLicense: "LAB-CO-2024-0027",
    testDate: "2026-04-12",
    expirationDate: "2027-04-12",
    fileName: "COA-MH-GDP-2026-040.pdf",
    fileUrl: "/coa/COA-MH-GDP-2026-040.pdf",
    results: {
      thc: 20.8,
      thca: 23.5,
      cbd: 0.12,
      cbda: 0.15,
      cbg: 0.22,
      cbn: 0.04,
      totalCannabinoids: 24.03,
      totalTerpenes: 2.6,
      topTerpenes: [
        { name: "Myrcene", percentage: 1.0 },
        { name: "Pinene", percentage: 0.8 },
        { name: "Caryophyllene", percentage: 0.5 },
      ],
      moisture: 10.8,
      passedPesticides: true,
      passedHeavyMetals: true,
      passedMicrobials: true,
      passedMycotoxins: true,
      passedResidualSolvents: true,
    },
    status: "verified",
    uploadedAt: "2026-04-13T16:20:00Z",
    uploadedBy: "High Plains Harvest Co.",
  },
];

export const growHouseVolumes: GrowHouseVolume[] = [
  { growHouseId: "gh1", strainId: "s1", availableLbs: 42, projectedLbs: 65, nextHarvestDate: "2026-06-15", lastUpdated: "2026-05-20T08:00:00Z" },
  { growHouseId: "gh1", strainId: "s2", availableLbs: 28, projectedLbs: 40, nextHarvestDate: "2026-06-01", lastUpdated: "2026-05-20T08:00:00Z" },
  { growHouseId: "gh1", strainId: "s9", availableLbs: 15, projectedLbs: 30, nextHarvestDate: "2026-06-20", lastUpdated: "2026-05-20T08:00:00Z" },
  { growHouseId: "gh2", strainId: "s3", availableLbs: 85, projectedLbs: 120, nextHarvestDate: "2026-06-10", lastUpdated: "2026-05-20T08:00:00Z" },
  { growHouseId: "gh2", strainId: "s4", availableLbs: 0, projectedLbs: 55, nextHarvestDate: "2026-07-01", lastUpdated: "2026-05-20T08:00:00Z" },
  { growHouseId: "gh2", strainId: "s10", availableLbs: 60, projectedLbs: 60, nextHarvestDate: "2026-06-25", lastUpdated: "2026-05-20T08:00:00Z" },
  { growHouseId: "gh3", strainId: "s8", availableLbs: 18, projectedLbs: 25, nextHarvestDate: "2026-06-05", lastUpdated: "2026-05-20T08:00:00Z" },
  { growHouseId: "gh3", strainId: "s6", availableLbs: 8, projectedLbs: 20, nextHarvestDate: "2026-06-12", lastUpdated: "2026-05-20T08:00:00Z" },
  { growHouseId: "gh4", strainId: "s5", availableLbs: 120, projectedLbs: 150, nextHarvestDate: "2026-06-08", lastUpdated: "2026-05-20T08:00:00Z" },
  { growHouseId: "gh4", strainId: "s7", availableLbs: 0, projectedLbs: 45, nextHarvestDate: "2026-06-18", lastUpdated: "2026-05-20T08:00:00Z" },
  { growHouseId: "gh4", strainId: "s10", availableLbs: 95, projectedLbs: 95, nextHarvestDate: "2026-07-10", lastUpdated: "2026-05-20T08:00:00Z" },
];

export function getCoaByBatchId(batchId: string): COA | undefined {
  return coas.find((c) => c.batchId === batchId);
}

export function getCoasByGrowHouse(growHouseId: string): COA[] {
  return coas.filter((c) => c.growHouseId === growHouseId);
}

export function getVolumesByGrowHouse(growHouseId: string): GrowHouseVolume[] {
  return growHouseVolumes.filter((v) => v.growHouseId === growHouseId);
}

export function getStrainBySlug(slug: string): Strain | undefined {
  return strains.find((s) => s.slug === slug);
}

export function getInventoryByStrain(strainId: string): InventoryUnit[] {
  return inventory.filter((i) => i.strainId === strainId);
}

export function getInventoryByDispensary(dispensaryId: string): InventoryUnit[] {
  return inventory.filter((i) => i.dispensaryId === dispensaryId);
}

export function getLiveInventory(): InventoryUnit[] {
  return inventory.filter((i) => i.status !== "sold-out");
}

export function getGrowHouseBySlug(slug: string): GrowHouse | undefined {
  return growHouses.find((g) => g.slug === slug);
}

export function getInventoryByGrowHouse(growHouseId: string): InventoryUnit[] {
  return inventory.filter((i) => i.growHouseId === growHouseId);
}
