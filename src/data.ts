/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Commodity, Service, Project, BlogPost, Certification, StatItem, Testimonial } from "./types";
import cocoaImage from "./assets/images/cocoa_beans_sack_1781379631375.jpg";
import sesameImage from "./assets/images/sesame_seeds_1781380009175.jpg";
import gingerImage from "./assets/images/dried_split_ginger_1781380024680.jpg";
import cashewImage from "./assets/images/raw_cashew_nuts_1781379992836.jpg";
import hibiscusImage from "./assets/images/dried_hibiscus_calyces_1781380305516.jpg";
import soyImage from "./assets/images/yellow_soybeans_1781380321668.jpg";
import maizeImage from "./assets/images/premium_maize_grains_1781380340535.jpg";
import groundnutImage from "./assets/images/selected_groundnuts_1781380355134.jpg";
import sheaNutsImage from "./assets/images/organic_shea_nuts_1781380369402.jpg";
import sheaButterImage from "./assets/images/raw_shea_butter_1781380384368.jpg";
import eolTiresImage from "./assets/images/shredded_tire_chips_1781380400790.jpg";
import recycledPlasticsImage from "./assets/images/recycled_pet_flakes_1781380422624.jpg";

export const COMMODITIES: Commodity[] = [
  {
    id: "cocoa-beans",
    name: "Premium Cocoa Beans (Grade 1)",
    category: "Cocoa & Coffee",
    tagline: "High-grade fermented beans from Nigeria's richest rainforest soils.",
    description: "Our Grade 1 cocoa beans are properly fermented, thoroughly dried, and strictly compliant with FCC (Federation of Cocoa Commerce) international standards.",
    detailedDescription: "Sourced primarily from selected smallholder cooperatives in Ondo, Cross River, and Osun states, our cocoa beans are direct beneficiaries of traditional sun-drying methods and artisanal fermentation cycles. This guarantees rich chocolate notes, high fat content (cocoa butter), and minimal bean defects, desired by top-tier European, Asian, and American chocolatiers.",
    image: cocoaImage,
    gallery: [
      cocoaImage,
      "https://images.unsplash.com/photo-1548907040-4d42b5211514?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "7.0% - 7.5% maximum",
    purityLevel: "98.5% minimum",
    exportDestinations: ["Rotterdam (Netherlands)", "Hamburg (Germany)", "Genoa (Italy)", "New York (USA)"],
    packagingOptions: [
      "64kg single-vented hydrocarbon-free Jute bags",
      "Custom single-ply food-grade hessian sacks"
    ],
    hsCode: "1801.00.00",
    origin: "Ondo, Cross River, Osun (Nigeria)",
    minimumOrder: "25 Metric Tons (1 x 20ft Container)",
    packaging: "64kg single-vented hydrocarbon-free Jute bags",
    harvestPeriod: "Main Crop: October - March | Light Crop: May - August",
    specs: [
      { label: "Bean Count", value: "95 to 105 beans per 100 grams" },
      { label: "Moisture Content", value: "7.0% - 7.5% maximum" },
      { label: "Mouldy Beans", value: "3% maximum" },
      { label: "Slaty Beans", value: "3% maximum" },
      { label: "Insect-damaged / Germinated", value: "3% maximum" },
      { label: "Total Defects", value: "Less than 5% total" },
      { label: "Cocoa Butter Content", value: "52% - 54% average" }
    ]
  },
  {
    id: "sesame-seeds",
    name: "Premium Natural Sesame Seeds",
    category: "Grains & Seeds",
    tagline: "Golden and white seeds processed to over 99.5% purity.",
    description: "Highly nutritious seeds sourced from Jigawa and Benue, cleaned and sorted to satisfy stringent food and confectionery standards in Japan and Europe.",
    detailedDescription: "Nigeria is a global powerhouse in premium Sesame production. Our raw, unhulled sesame seeds are strictly double-cleaned using advanced gravity separators and destoners. This process achieves a pristine purity profile making them suitable for direct oil crushing or culinary, confectionery, and seed-milling processes across Asia and Europe.",
    image: sesameImage,
    gallery: [
      sesameImage,
      "https://images.unsplash.com/photo-1621447504864-d8686e1d681c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582401656496-9d75f95f9018?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "5.0% - 6.0% maximum",
    purityLevel: "99.5% minimum",
    exportDestinations: ["Nagoya (Japan)", "Qingdao (China)", "Izmir (Turkey)", "Rotterdam (Netherlands)"],
    packagingOptions: [
      "50kg new, multi-ply printed PP bags",
      "Custom 1,000kg bulk shipping big-bags"
    ],
    hsCode: "1207.40.00",
    origin: "Benue, Gombe, Jigawa, Kano (Nigeria)",
    minimumOrder: "19 Metric Tons (1 x 20ft Container)",
    packaging: "50kg new, multi-ply printed PP bags",
    harvestPeriod: "October - December",
    specs: [
      { label: "Purity", value: "99.5% minimum" },
      { label: "Admixture", value: "0.5% maximum" },
      { label: "Moisture Content", value: "5.0% - 6.0% maximum" },
      { label: "Oil Content", value: "51.5% - 53.0% minimum" },
      { label: "Free Fatty Acids (FFA)", value: "1.5% - 2.0% maximum" },
      { label: "Color", value: "Whitish / Light Creamy white" },
      { label: "Salmonella / E-Coli", value: "Absent / Negative" }
    ]
  },
  {
    id: "ginger-dried",
    name: "Sun-Dried Split Ginger",
    category: "Spices",
    tagline: "Bold, highly aromatic ginger splits with intense heat.",
    description: "Known globally for its high volatile oil concentration, split ginger is sun-dried under rigid hygiene standards in Kaduna state.",
    detailedDescription: "Nigerian dried ginger is esteemed globally for its rich, pungent aroma, sweet spiciness, and extremely potent essential gingerol oils. We source directly from local farmers in Kachia, Kaduna state—the ginger capital of West Africa. Our split ginger is thoroughly washed, sliced, and sun-dried on clean concrete slab tiers, preventing any soil or insect contamination before final automated sifting.",
    image: gingerImage,
    gallery: [
      gingerImage,
      "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "8.0% - 9.0% maximum",
    purityLevel: "98.0% minimum",
    exportDestinations: ["Hamburg (Germany)", "Felixstowe (UK)", "Newark (USA)", "Jebel Ali (UAE)"],
    packagingOptions: [
      "40kg / 50kg woven PP bags, well-ventilated",
      "Custom jute woven meshes with inner paper liners"
    ],
    hsCode: "0910.11.00",
    origin: "Kaduna, Gombe (Nigeria)",
    minimumOrder: "14 Metric Tons (1 x 20ft Container)",
    packaging: "40kg / 50kg woven PP bags, well-ventilated",
    harvestPeriod: "November - March",
    specs: [
      { label: "Moisture Content", value: "8.0% - 9.0% maximum" },
      { label: "Admixture", value: "1.5% - 2.0% maximum" },
      { label: "Volatile Essential Oil", value: "1.8% - 2.5% minimum" },
      { label: "Extraneous Matter", value: "1.0% maximum" },
      { label: "Mould & Mildew", value: "Strictly absent" },
      { label: "Sieve Sizing", value: "Well-washed split tubers, uniform grading" }
    ]
  },
  {
    id: "cashew-nuts",
    name: "Raw Cashew Nuts (RCN)",
    category: "Nuts",
    tagline: "Excellent Kernel Outturn Ratio (KOR) for reliable processing.",
    description: "Premium cashew nuts with optimum moisture and high nut-count counts, ideal for crushing, sorting, and shelling factories.",
    detailedDescription: "We supply premium-grade Raw Cashew Nuts (RCN) harvested from fertile woodlands in Kogi, Kwara, and Oyo states. Tested meticulously before shipment, our cashews boast superior Kernel Outturn Ratios (KOR) exceeding 48 lbs, ensuring high processing yields and minimal moisture loss during voyages. This makes us a trusted vendor to processing hubs in Vietnam and India.",
    image: cashewImage,
    gallery: [
      cashewImage,
      "https://images.unsplash.com/photo-1626125313941-ab77224f79c4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "8.0% - 10.0% maximum",
    purityLevel: "98.5% minimum",
    exportDestinations: ["Haiphong (Vietnam)", "Tuticorin (India)", "Qingdao (China)", "Klang (Malaysia)"],
    packagingOptions: [
      "80kg heavy jute fiber baskets with moisture protection",
      "Custom 50kg dry canvas sacks"
    ],
    hsCode: "0801.31.00",
    origin: "Kogi, Kwara, Oyo, Enugu (Nigeria)",
    minimumOrder: "17 Metric Tons (1 x 20ft Container) / Bulk available",
    packaging: "80kg dry Jute bags with adequate venting",
    harvestPeriod: "February - May",
    specs: [
      { label: "Kernel Outturn Ratio (KOR)", value: "48 to 52 lbs minimum per 80kg bag" },
      { label: "Nut Count", value: "180 to 200 nuts per kilogram maximum" },
      { label: "Moisture Content", value: "8.0% - 10.0% maximum" },
      { label: "Foreign Matter / Trash", value: "0.25% - 0.5% maximum" },
      { label: "Defective Seeds", value: "5.0% maximum" },
      { label: "Floaters", value: "Strictly under 3%" }
    ]
  },
  {
    id: "hibiscus-flower",
    name: "Dried Calyces Hibiscus (Sorrel)",
    category: "Spices",
    tagline: "Brilliant dark-red calyces prized in teas and food colorings.",
    description: "Whole dried hibiscus flowers sourced from northern Nigeria, sorted for export to beverage and health product giants in North America and Europe.",
    detailedDescription: "Our dried hibiscus calyces are hand-picked, sorted to isolate whole sieved petals, and carefully packed. Known locally as Zobo, Nigerian hibiscus is coveted globally for its intense crimson hue, rich fruity tartness, and dense antioxidant payload. It is actively utilized by tea factories, pharmaceutical industries, and food coloring processors internationally.",
    image: hibiscusImage,
    gallery: [
      hibiscusImage,
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "11.0% - 12.0% maximum",
    purityLevel: "98.5% minimum",
    exportDestinations: ["Houston (USA)", "Hamburg (Germany)", "Manzanillo (Mexico)", "Le Havre (France)"],
    packagingOptions: [
      "20kg - 25kg tightly knit pressed woven sacks",
      "30kg craft paper multi-wall sacks"
    ],
    hsCode: "1211.90.00",
    origin: "Jigawa, Kano, Kastina, Borno (Nigeria)",
    minimumOrder: "12 Metric Tons (1 x 40ft High Cube Container)",
    packaging: "20kg - 25kg tightly knit pressed woven sacks",
    harvestPeriod: "November - January",
    specs: [
      { label: "Moisture Content", value: "11.0% - 12.0% maximum" },
      { label: "Foreign Matter", value: "1.5% - 2.0% maximum (Sifted / sieved)" },
      { label: "Color", value: "Deep Dark Crimson Red" },
      { label: "Mouldy Calyces", value: "Zero tolerance" },
      { label: "Insects & Larvae", value: "Strictly Negative (Fumigated prior to sealing)" },
      { label: "State", value: "Whole flower calyces, minimal broken crumbs" }
    ]
  },
  {
    id: "soybeans",
    name: "Premium Yellow Soybeans (Grade A)",
    category: "Grains & Seeds",
    tagline: "Gluten-free, non-GMO golden soybeans with high protein and oil levels.",
    description: "Sourced from the fertile plains of northern Nigeria, meticulously cleaned and graded for premium human consumption and animal feed crushing.",
    detailedDescription: "Nigeria is a primary non-GMO soybean cultivation hub. Our Soybeans are double-cleaned, sorted with optical gravity filters to separate split grains from whole yellow seeds, and packed under absolute dry humidity. Famous for high raw protein content (exceeding 38%) and high lipid content (approx 19.5%), they are ideal for food processors, oil mills, and premium high-protein agricultural feed plants globally.",
    image: soyImage,
    gallery: [
      soyImage,
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1628359355624-855775b5c9c8?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "10.0% - 11.5% maximum",
    purityLevel: "99% minimum Grade A",
    exportDestinations: ["Guangzhou (China)", "Klang (Malaysia)", "Rotterdam (Netherlands)", "Chiba (Japan)"],
    packagingOptions: [
      "50kg new, printed PP woven bags with heavy stitch",
      "Custom 1,000kg bulk shipping big-bags"
    ],
    hsCode: "1201.90.00",
    origin: "Kaduna, Benue, Taraba (Nigeria)",
    minimumOrder: "20 Metric Tons (1 x 20ft Container)",
    packaging: "50kg new, printed PP woven bags with heavy stitch",
    harvestPeriod: "October - January",
    specs: [
      { label: "Protein Content", value: "38.0% - 41.5% minimum" },
      { label: "Oil/Lipid Content", value: "19.5% - 21.0% minimum" },
      { label: "Purity & Grade", value: "99% minimum Grade A" },
      { label: "Moisture Content", value: "10.0% - 11.5% maximum" },
      { label: "Admixture", value: "1.0% maximum" },
      { label: "Foreign Matter", value: "0.5% maximum" },
      { label: "Size & Integrity", value: "Whole yellow grains, fully cleaned" }
    ]
  },
  {
    id: "maize",
    name: "Premium White & Yellow Maize",
    category: "Grains & Seeds",
    tagline: "Phytosanitary cleared grains, high density feed & milling grade.",
    description: "Finely cleaned yellow and white corn seeds sourced from top farm cooperatives, boasting zero aflatoxin levels for elite grain milling.",
    detailedDescription: "Cultivated in Kaduna and Katsina states, our premium maize grains are double-passed through pneumatic air aspirators to separate dust and lightweight residues. We ensure an extremely low percentage of broken kernels and absolute organic safety, which is ideal for food processing plants, cornstarch production, and premium livestock feed mills internationally.",
    image: maizeImage,
    gallery: [
      maizeImage,
      "https://images.unsplash.com/photo-1530076881881-3f1435e1f002?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1628359355624-855775b5c9c8?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "12.0% - 13.5% maximum",
    purityLevel: "99.0% Grade A",
    exportDestinations: ["Alexandria (Egypt)", "Casablanca (Morocco)", "Mombasa (Kenya)", "Las Palmas (Spain)"],
    packagingOptions: [
      "50kg printed PP bags",
      "Bulk in standard containers with thermal liners"
    ],
    hsCode: "1005.90.00",
    origin: "Kaduna, Katsina, Gombe (Nigeria)",
    minimumOrder: "24 Metric Tons (1 x 20ft Container)",
    packaging: "50kg new, printed PP woven bags with heavy stitch",
    harvestPeriod: "September - December",
    specs: [
      { label: "Purity & Cleaning", value: "99.0% minimum Grade A" },
      { label: "Moisture Content", value: "13.0% maximum" },
      { label: "Aflatoxin Levels", value: "Less than 10 ppb (Strictly Monitored)" },
      { label: "Broken Kernels", value: "1.5% maximum" },
      { label: "Weevil Damaged Grains", value: "1.0% maximum" },
      { label: "Foreign Admixture", value: "0.5% maximum" }
    ]
  },
  {
    id: "groundnuts",
    name: "Hand-Picked Selected Groundnuts",
    category: "Nuts",
    tagline: "Premium hand-picked kernels (HPS) with high oil yield and minimal aflatoxin.",
    description: "Unshelled and shelled premium Nigerian peanuts, machine sifted and optical sensor sorted to achieve superior size and food safety indices.",
    detailedDescription: "Nigerian groundnuts are legendary for their high fat index and sweet taste. Sourced from smallholder unions across Kano and Katsina, our peanuts undergo careful shelling followed by an intensive dual hand-sorting cycle to exclude any uneven or damaged nuts. We guarantee zero aflatoxin spikes and high lipid profiles, making them excellent for dry snack roasting, oil crushing, or peanut butter factories.",
    image: groundnutImage,
    gallery: [
      groundnutImage,
      "https://images.unsplash.com/photo-1534119396591-5998ee6f2a04?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "6.0% - 7.0% maximum",
    purityLevel: "99.2% minimum HP grade",
    exportDestinations: ["Rotterdam (Netherlands)", "Felixstowe (UK)", "Algeciras (Spain)", "Qingdao (China)"],
    packagingOptions: [
      "25kg/50kg high-grade mesh jute bags",
      "Custom 25kg multiwall heavy craft sacks"
    ],
    hsCode: "1202.42.00",
    origin: "Kano, Kaduna, Katsina (Nigeria)",
    minimumOrder: "18 Metric Tons (1 x 20ft Container)",
    packaging: "40kg/50kg clean, strong Jute woven sacks",
    harvestPeriod: "October - January",
    specs: [
      { label: "Oil/Lipid Content", value: "48% - 51% minimum" },
      { label: "Moisture Content", value: "6.5% maximum" },
      { label: "Aflatoxin count", value: "Less than 4 ppb (USDA compliant)" },
      { label: "Admixture & Trash", value: "0.4% maximum" },
      { label: "Purity Grade", value: "99.2% HPS Hand Picked Selected" },
      { label: "Size Grading", value: "70/80 or 80/90 counts per ounce" }
    ]
  },
  {
    id: "shea-nuts",
    name: "Premium Organic Shea Nuts",
    category: "Nuts",
    tagline: "High oil-yielding wild-harvested shea nuts from the savannah plains.",
    description: "Hand-picked, boiled, and sun-dried organic shea nuts with oil content exceeding 48% and low FFA levels.",
    detailedDescription: "Sourced directly from women cooperatives in Niger, Kwara, and Oyo states, our organic shea nuts are processed under strict traditional sun-drying and roasting guidelines. Highly prized in Europe and North America for cosmetics manufacturing and chocolate formulations.",
    image: sheaNutsImage,
    gallery: [
      sheaNutsImage,
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "6.0% maximum",
    purityLevel: "98.5% minimum",
    exportDestinations: ["Ghent (Belgium)", "Hamburg (Germany)", "Marseille (France)", "New York (USA)"],
    packagingOptions: [
      "50kg clean jute sacks",
      "80kg well-ventilated woven fiber bags"
    ],
    hsCode: "1207.92.00",
    origin: "Niger, Kwara, Oyo (Nigeria)",
    minimumOrder: "20 Metric Tons (1 x 20ft Container)",
    packaging: "55kg heavy jute sacks with moisture protection",
    harvestPeriod: "May - August",
    specs: [
      { label: "Oil/Fat Content", value: "48% - 50% minimum" },
      { label: "Free Fatty Acids (FFA)", value: "Less than 4.5%" },
      { label: "Moisture Content", value: "6.0% maximum" },
      { label: "Impurity Ratio", value: "Less than 1.5%" }
    ]
  },
  {
    id: "shea-butter",
    name: "Raw Unrefined Shea Butter",
    category: "Nuts",
    tagline: "Premium organic unrefined butter whipped for cosmetic and edible grade formulations.",
    description: "Handcrafted grade-A unrefined shea butter with rich creamy texture, nutty aroma, and excellent skin-healing attributes.",
    detailedDescription: "Our grade-A organic unrefined shea butter is extracted using traditional, chemical-free filtration processes. By boiling and kneading the shea nut kernels, women-led cooperatives in western Nigeria yield a pristine butter loaded with active vitamins A, E, and F, free of synthetic additives, perfect for premium beauty formulas.",
    image: sheaButterImage,
    gallery: [
      sheaButterImage,
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "0.1% maximum",
    purityLevel: "99.9% filtration purity",
    exportDestinations: ["Chicago (USA)", "Le Havre (France)", "Yokohama (Japan)", "Antwerp (Belgium)"],
    packagingOptions: [
      "25kg durable carton boxes with inner food-grade linage",
      "200kg steel drums for bulk soap factories"
    ],
    hsCode: "1515.90.80",
    origin: "Kwara, Niger (Nigeria)",
    minimumOrder: "15 Metric Tons (1 x 20ft Container)",
    packaging: "25kg food-grade blocks inside double-layered poly-cartons",
    harvestPeriod: "All Year Round (Processed post-harvest)",
    specs: [
      { label: "Color", value: "Ivory / Soft Creamy Yellow" },
      { label: "Free Fatty Acids (FFA)", value: "Less than 1.0%" },
      { label: "Peroxide Value", value: "Less than 2.0 meq/Kg" },
      { label: "Insoluble Impurities", value: "0.05% maximum" }
    ]
  },
  {
    id: "eol-tires",
    name: "End-of-Life Tires (Shredded Rubber & Casings)",
    category: "Recycled Materials",
    tagline: "High-density recycled tire shredding chips and whole casings for bio-fuel and pyrolysis processing.",
    description: "Sorted end-of-life tire shreds prepared for industrial feedstock, rubberized asphalt, and high-efficiency pyrolysis reactors.",
    detailedDescription: "We collect municipal and commercial end-of-life vehicle tires, sorting them at our Lagos recycling hub. Our automated shredders cut the tires into uniform TDA (Tire Derived Aggregate) chips sized from 50mm to 100mm. Perfect for pyrogenation oil cracking, high-thermal cement kilns, or eco-friendly playground surfacing projects globally.",
    image: eolTiresImage,
    gallery: [
      eolTiresImage,
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "0.5% maximum",
    purityLevel: "Free of wire debris (Magnetic separated)",
    exportDestinations: ["Incheon (South Korea)", "Chennai (India)", "Istanbul (Turkey)", "Genoa (Italy)"],
    packagingOptions: [
      "Bulk in open top shipping containers",
      "1,200kg heavy woven ballast bulk bags"
    ],
    hsCode: "4004.00.00",
    origin: "Lagos City Waste Collect Depots (Nigeria)",
    minimumOrder: "25 Metric Tons (1 x 40ft Container)",
    packaging: "Bulk loaded with custom stabilization ties or big bags",
    harvestPeriod: "All Year Round (Continuous collection)",
    specs: [
      { label: "Chip Sizes", value: "50mmx50mm up to 100mmx100mm" },
      { label: "Steel Wire Content", value: "98% magnetic pulled / Less than 2%" },
      { label: "Calorific Multiplier", value: "32,000 kJ/kg average" },
      { label: "Moisture Content", value: "0.5% maximum" }
    ]
  },
  {
    id: "recycled-plastics",
    name: "Recycled PET Cleaned Flakes (Grade A)",
    category: "Recycled Materials",
    tagline: "Premium hot-washed, color-sorted PET bottle flakes for synthetic fiber and strapping factories.",
    description: "High-density cleaned post-consumer PET flakes (clear, light blue) sorted with sensory air-nozzles for immediate melt-spinning.",
    detailedDescription: "Lakeduck Integrated runs a state-of-the-art plastic recycling center recovering waste plastic beverage containers. Hot-washed inside caustic detergent streams at 85°C, our PET flakes are fully cleared of glue, paper labels, and PVC rings. This ensures an ultra-low contamination index exceeding global standards for polyester staple fiber and mechanical strapping extrusion lines.",
    image: recycledPlasticsImage,
    gallery: [
      recycledPlasticsImage,
      "https://images.unsplash.com/photo-1582408921715-18e7806367c1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "0.8% maximum",
    purityLevel: "99.9% clean of labels & PVC residues",
    exportDestinations: ["Qingdao (China)", "Hai Phong (Vietnam)", "Klang (Malaysia)", "Hamburg (Germany)"],
    packagingOptions: [
      "1,100kg UV-stabilized heavy PP bulk sacks",
      "25kg heavy paper bags packed on heat-treated pallets"
    ],
    hsCode: "3915.90.00",
    origin: "Lagos Recycle Processing Desk (Nigeria)",
    minimumOrder: "22 Metric Tons (1 x 40ft HQ Container)",
    packaging: "1100kg heavy woven PP bulk sacks",
    harvestPeriod: "All Year Round (Daily recycling lines)",
    specs: [
      { label: "Flake Sizing", value: "8mm to 12mm filtered mesh" },
      { label: "PVC Contamination", value: "Less than 50 ppm" },
      { label: "Moisture Content", value: "0.8% or less" },
      { label: "Melting Point", value: "248°C - 252°C" }
    ]
  },
  {
    id: "hardwood-charcoal",
    name: "Premium Hardwood Ayin Charcoal",
    category: "Solid Minerals",
    tagline: "High-density carbon-rich Ayin hardwood lump charcoal for premium heating.",
    description: "Naturally harvested seasoned Ayin hardwood charcoal with high calorific yield, long-burning lifecycle, and very low gas/smoke omissions.",
    detailedDescription: "Lakeduck manufactures and exports premium-grade Hardwood lump charcoal made using carbonisation of Ayin (Anogeissus leiocarpus) wood branches. Famously dense, our charcoal burns over 4-6 hours with zero spark hazard, extreme heat output exceeding 7400 kcal/kg, and negligible ash residuals, loaded inside heavy export-grade bags directly to ports.",
    image: "https://images.unsplash.com/photo-1594911774802-8822a707cbb3?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1594911774802-8822a707cbb3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1473210113405-f3f1e9447e1d?auto=format&fit=crop&q=80&w=800"
    ],
    moistureContent: "5.0% - 6.0% maximum",
    purityLevel: "Carbon Content > 78%",
    exportDestinations: ["Rotterdam (Netherlands)", "Jebel Ali (UAE)", "Antwerp (Belgium)", "Hamburg (Germany)"],
    packagingOptions: [
      "25kg multi-ply printed paper sacks",
      "Bulk container loose packing with custom cargo barriers"
    ],
    specs: [
      { label: "Fixed Carbon", value: "78% - 82% minimum" },
      { label: "Calorific Value", value: "7400 - 8000 Kcal/kg" },
      { label: "Moisture Content", value: "5.0% - 6.0% maximum" },
      { label: "Ash Content", value: "2.5% - 4.0% maximum" },
      { label: "Volatile Matter", value: "5.0% - 10.0% max" },
      { label: "Sparking & Odor", value: "Absolutely absent / sparkless" },
      { label: "Size Grading", value: "20mm to 120mm natural lump cuts" }
    ],
    hsCode: "4402.90.00",
    origin: "Kwara, Oyo, Kogi (Nigeria)",
    minimumOrder: "20 Metric Tons (1 x 40ft Container)",
    packaging: "25kg strong multi-ply paper or polypropylene sacks",
    harvestPeriod: "All Year Round (Dry Season peak)"
  }
];

export const SERVICES: Service[] = [
  {
    id: "commodity-sourcing",
    title: "Eco-Agricultural Sourcing",
    iconName: "Leaf",
    shortDescription: "Sourcing premium commodities directly from rural farm cooperatives with extreme transparency and fair pricing.",
    detailedDescription: "We maintain direct, continuous ties with over 15,000 smallholder farmer networks throughout Nigeria’s major fertile zones. By running active agronomist programs, we enable farmers with pre-season financing, quality seeds, and organic practices, guaranteeing raw goods quality at the roots.",
    benefits: [
      "100% trace-to-farm transparent supply chain mapping.",
      "Fair Trade practices guaranteeing stable farming communities.",
      "Custom pre-season organic cultivation contracts."
    ]
  },
  {
    id: "quality-assurance",
    title: "Rigid Quality Inspection",
    iconName: "FileCheck",
    shortDescription: "Multi-point modern labs testing moisture, purity, organic composition, and packing standards.",
    detailedDescription: "Quality is our signature. We operate modern, fully-equipped testing rooms in various warehouse depots. From moisture tests matching digital meters to microbiological profiling, every bag is sampled, sealed, and audited in conjunction with global certifiers like SGS or Bureau Veritas before final stacking.",
    benefits: [
      "Mandatory SGS or Bureau Veritas inspection for all shipments.",
      "In-house digital grain sorting, optical separators, and pneumatic cleaning.",
      "Active fumigation certificates compliant with WTO phytosanitary rules."
    ]
  },
  {
    id: "international-logistics",
    title: "Global Logistics & Sea Freight",
    iconName: "Ship",
    shortDescription: "Seamless marine transport booking, customs brokerage, and heavy container tracking from Apapa & Onne Ports.",
    detailedDescription: "We handle complex multi-modal agricultural shipping safely. From warehousing near Apapa or Onne ports to quick vessel bookings on leading shipping lines, our dedicated customs and logistics dispatch ensures your order is quickly boarded, vacuum closed to prevent moisture entry, and securely sealed.",
    benefits: [
      "Premium partnerships with MSC, Maersk, and CMA CGM for competitive sea rates.",
      "Fast-track customs clearance minimizing terminal demurrage.",
      "Real-time GPS container tracking from departure port to destination."
    ]
  },
  {
    id: "custom-packaging",
    title: "Customized Bulk Packaging",
    iconName: "Briefcase",
    shortDescription: "Durable Jute bags, multi-ply PP woven bags, or thermal vacuum liners tailored to your exact factory needs.",
    detailedDescription: "Packaging dictates commodity protection during long maritime journeys. We customize branding print, bag material weight, ventilation slots, and protective liners (such as aluminum-coated desiccated plastics) to safeguard seeds and logs indefinitely against tropical humidity.",
    benefits: [
      "Custom design and logo high-definition bag-printing services.",
      "Certified single-vent, mold-preventative hydrocarbon-free Jute.",
      "Available bulk bulk-liners and big-bags up to 1,000kg load capacity."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Premium Sesame Seed Shipment to Nagoya",
    commodityName: "Natural Sesame Seeds",
    volumeTons: 500,
    destination: "Nagoya, Japan",
    destinationCountryCode: "JP",
    year: 2026,
    status: "Completed",
    narrative: "Sourced, machine-cleaned, and packed 500 MT of pure white organic sesame seeds to satisfy Japan's strict 0.01ppm pesticide threshold. Delivered flawlessly on-schedule."
  },
  {
    id: "p2",
    title: "West African Cocoa Cargo to Rotterdam",
    commodityName: "Grade 1 Cocoa Beans",
    volumeTons: 1200,
    destination: "Rotterdam Port, Netherlands",
    destinationCountryCode: "NL",
    year: 2026,
    status: "Completed",
    narrative: "An extensive supply of premium sun-dried cocoa beans to leading European chocolate chocolate mills. Achieved optimal moisture levels, ensuring zero mold upon receipt."
  },
  {
    id: "p3",
    title: "Raw Cashew Nut Consignment to Haiphong",
    commodityName: "Raw Cashew Nuts (RCN)",
    volumeTons: 850,
    destination: "Haiphong Port, Vietnam",
    destinationCountryCode: "VN",
    year: 2025,
    status: "Completed",
    narrative: "Supplied RCN with high KOR (51 lbs average) to shell processing conglomerates in Vietnam, boosting their kernel extraction yield by 4.2% above general country grade."
  },
  {
    id: "p4",
    title: "Aromatic Sun-Dried Split Ginger to Hamburg",
    commodityName: "Sun-Dried Split Ginger",
    volumeTons: 350,
    destination: "Hamburg, Germany",
    destinationCountryCode: "DE",
    year: 2026,
    status: "In Transit",
    narrative: "Currently shipping 350 metric tons of highly aromatic split ginger splits for natural tea flavoring and pharmaceuticals in northern Europe, equipped with continuous temperature tracking."
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: "blog-cashew-guide",
    title: "The Ultimate Guide to Exporting West African Raw Cashew Nuts (RCN)",
    summary: "From choosing farms with high Kernel Outturn Ratio (KOR) to moisture controls and port logistics, we dissect the step-by-step export pipeline.",
    category: "Export Guides",
    date: "June 08, 2026",
    author: "Alhaji Farouk Bello (Chief Operations)",
    readingTime: "8 min read",
    image: cashewImage,
    content: "Exporting raw cashew nuts requires absolute precision. Quality parameters dictate pricing in international processing hubs like India and Vietnam. Two key factors measure standard quality: Kernel Outturn Ratio (KOR) and Nut Count.\n\nFirst, secure nuts with a KOR of at least 48 lbs (preferably above 50 lbs) and a nut count below 200 per kilogram. Higher numbers guarantee better processing yields. Second, handle moisture content extremely carefully; it must remain sub 10%. Sun-drying raw cashews on clean concrete floors before storage is mandatory to prevent intermediate moisture deterioration during transit. Pack only in well-ventilated woven Jute bags to facilitate optimal airflow on ocean voyages.",
    featured: true
  },
  {
    id: "blog-lagos-port-june",
    title: "West African Port Logistics Report: Vessel Schedules & Congestion Updates",
    summary: "As the main crop harvest progresses, we outline customs clearance times at Apapa and Onne ports, plus maritime freight indices.",
    category: "Market Reports",
    date: "June 01, 2026",
    author: "Elizabeth Osondu (Global Food Liaison)",
    readingTime: "5 min read",
    image: sesameImage,
    content: "Lagos port facilities (Apapa/Tin Can) are experiencing moderate terminal traffic this week as seed shipments peak. Average customs processing times for agricultural cargo have stabilised at 6 to 9 days, supported by fast-track green channels for perishable crops.\n\nContainer bookings on major ocean freight lines to Northern Europe and East Asia must be scheduled at least three weeks before warehousing. We advise cargo consolidators to perform pre-clearance procedures at inward depots to avoid terminal storage surcharges and demurrage fees."
  },
  {
    id: "blog-cocoa-price-analysis",
    title: "Global Cocoa & Sesame Price Index: Q2 2026 Trends Analysis",
    summary: "Analysis of global FOB prices for premium fermented cocoa beans and cleaned sesame seeds in secondary and primary markets.",
    category: "Commodity Prices",
    date: "May 24, 2026",
    author: "Elizabeth Osondu (Global Food Liaison)",
    readingTime: "6 min read",
    image: cocoaImage,
    content: "Cocoa price indicators continue to show robust premiums on the London terminal due to tight global stocks. Grade 1 fermented cocoa beans command substantial premiums over standard delivery contracts. Meanwhile, natural sesame seeds maintain stable trading levels at $1,420 to $1,480 FOB Lagos.\n\nIncreased demand from direct cold-press oil manufacturers in secondary markets has fueled high bid-ask activity. Farmers are holding seeds in anticipation of late-season price adjustments, urging sourcing coordinators to secure purchase contracts early with integrated smallholder cooperatives."
  },
  {
    id: "blog-phytosanitary-wto",
    title: "New Phytosanitary Guidelines Enforced by WTO for Split Ginger",
    summary: "Critical regulatory update: the WHO and WTO enforce revised maximum organic residue and moisture ceilings for split ginger split exports.",
    category: "Agriculture News",
    date: "May 10, 2026",
    author: "Dr. Ibrahim Kure (Senior Agronomist)",
    readingTime: "4 min read",
    image: gingerImage,
    content: "The World Trade Organization has adopted revised agricultural food safety regulations concerning sun-dried split ginger. Under the newly enacted frameworks, the moisture ceiling is reduced from 12% down to 9% maximum for Europe-bound cargo.\n\nThis measure targets eliminating storage mould on long voyages. Exporters must utilize digital moisture analyzers prior to sifting and packing, accompanied by accredited phytosanitary certificates confirming the absence of agricultural pesticide residues. Our cleaning facilities have already integrated these protocols."
  },
  {
    id: "blog-germany-trade-channels",
    title: "Bilateral Agro-Trade Channels Open Direct Routes to Hamburg Port",
    summary: "New trade agreements create preferential customs pathways for West African oilseed and organic spice suppliers shipping to Northern Europe.",
    category: "Trade Opportunities",
    date: "April 18, 2026",
    author: "Alhaji Farouk Bello (Chief Operations)",
    readingTime: "7 min read",
    image: groundnutImage,
    content: "A newly negotiated bilateral agreement with European trade groups offers streamlined customs clearance and tariff concessions for high-purity agricultural exports shipped directly to Hamburg.\n\nThis framework removes dual-inspection requirements for sesame seeds with audited purities over 99.5%, as certified by recognized global superintendents like SGS. Lakeduck Integrated Limited has established priority delivery channels to directly link West African cooperatives with food-ingredient manufacturers in Germany."
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-cac",
    name: "Corporate Affairs Commission (CAC)",
    issuer: "Federal Republic of Nigeria",
    description: "Legally registered and licensed corporate body enabling agricultural export and global cargo dispatch operations."
  },
  {
    id: "cert-nepc",
    name: "Nigerian Export Promotion Council (NEPC)",
    issuer: "Federal Ministry of Trade & Investment",
    description: "Active premium license enabling certified export of high-grade agricultural goods and seeds from Nigeria."
  },
  {
    id: "cert-haccp",
    name: "Hazard Analysis Critical Control Point (HACCP)",
    issuer: "International Food Standards Board",
    description: "Ensures strict chemical, biological, and hazard analyses are strictly enforced throughout sorting, cleaning, and bag packing."
  },
  {
    id: "cert-iso",
    name: "ISO 22000 Food Safety Standards",
    issuer: "SGS International Standards Auditing",
    description: "Meets international benchmarks for food safety management, storage ventilation, and trace-to-farm crop purity audits."
  }
];

export const STATS: StatItem[] = [
  {
    id: "s1",
    value: "10+",
    numberValue: 10,
    suffix: "+",
    label: "Years Experience",
    iconName: "Container"
  },
  {
    id: "s2",
    value: "50+",
    numberValue: 50,
    suffix: "+",
    label: "Countries Served",
    iconName: "Globe"
  },
  {
    id: "s3",
    value: "1000+",
    numberValue: 1000,
    suffix: "+",
    label: "Shipments Completed",
    iconName: "Ship"
  },
  {
    id: "s4",
    value: "500+",
    numberValue: 500,
    suffix: "+",
    label: "Global Clients",
    iconName: "Users"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Sourcing Natural Sesame Seeds from Nigeria used to be plagued by variable purity ratings. This company's double-cleaning process changed our standard completely—achieving a consistent 99.8% purity index with flawless documentation.",
    author: "Hiroshi Takahashi",
    role: "Senior Raw Materials Buyer",
    company: "Aichi Food Oils Corp.",
    country: "Nagoya, Japan",
    rating: 5
  },
  {
    id: "t2",
    quote: "Our cocoa mills command a specific low-acid flavor profile. Their timber-crate fermented beans delivered an incredible butter content while maintaining moisture below 7.5% through a 24-day voyage.",
    author: "Jean-Pierre Laurent",
    role: "Head of Ingredient Sourcing",
    company: "Chocolatier de Paris",
    country: "Paris, France",
    rating: 5
  },
  {
    id: "t3",
    quote: "As pharmaceutical ingredients manufacturers, microchemical purity is non-negotiable. The dried split ginger we received from Kachia had outstanding volatile oil numbers, packed in well-ventilated bags that kept it crisp.",
    author: "Annika Meyer",
    role: "Lead Quality Sourcing",
    company: "Hanseatic Botanicals GmbH",
    country: "Hamburg, Germany",
    rating: 5
  }
];
