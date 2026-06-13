/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase, config } from "./supabase";
import { Commodity, BlogPost, Certification, Project, QuoteRequest } from "../types";
import { COMMODITIES, BLOGS, CERTIFICATIONS } from "../data";

// Initial leadership team data matching About.tsx
const INITIAL_TEAM = [
  {
    id: "lead-yusuf",
    name: "Alhaji Yusuf Shehu",
    role: "Founder & Chief Executive Officer",
    speech: "For over two decades, our standard has remained simple: to bridge local farming dedication with international raw material demands safely. Nigeria has some of the richest agricultural lands globally—it is our honour to package that quality correctly for global factories.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    experience: "Founder since 2002 | Commodity Trader"
  },
  {
    id: "lead-elizabeth",
    name: "Dr. Elizabeth Osondu",
    role: "Head of Global Quality & Standards",
    speech: "Quality isn't evaluated purely at the port of Apapa; it starts right at the farm clusters. We sample crops from Kaduna to Benue, putting them through moisture, fatty-acid, and purity inspection long before sacking.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    experience: "Ex-SGS Laboratory Director | PhD Agronomy"
  },
  {
    id: "lead-chinedu",
    name: "Mr. Chinedu Okafor",
    role: "Chief Logistics & Port Operator",
    speech: "Moving thousands of metric tons from hinterlands to ships requires clockwork coordination. We manage our own transport and customs brokers, ensuring your Letters of Credit are loaded on time.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    experience: "15+ Years Handling Port Intricacies"
  }
];

// Initial Homepage variables
const INITIAL_HOMEPAGE = {
  heroTitle: "SGS-Certified West African Agricultural Crops",
  heroSubtitle: "Connecting premium Nigerian Cocoa, Sesame, Split Ginger, and Cashew Nuts with global buyers. Cleaned, sorted, and dispatched under strict moisture control pipelines.",
  heroPromoText: "TRADE DESK ALLOCATION WINDOW OPEN — JUNE 2026",
  companyIntroTitle: "Earthy Agricultural Sourcing Built For Global Standards",
  companyIntroText: "Lakeduck Integrated Limited serves as the definitive bridge between diligent smallholder farmers in Nigeria, premium bio-recycling partners, and premier industrial buyers worldwide.",
  statsExperience: "10+",
  statsCountries: "50+",
  statsShipments: "1000+",
  statsClients: "500+"
};

// Initial Contact requests list
const INITIAL_CONTACTS: QuoteRequest[] = [
  {
    id: "VQD-2026-880291",
    fullName: "Jean Laurent",
    email: "buying@chocolatier.com",
    companyName: "Chocolatier de Paris",
    phone: "+33 1 42 68 53 00",
    country: "France",
    commodityId: "cocoa-beans",
    quantityTons: 150,
    packagingType: "64kg Jute bags",
    shippingTerms: "CIF",
    destinationPort: "Rotterdam (Netherlands)",
    message: "Requesting technical specification analysis for premium grade 1 cocoa bean cargo. Please advise on slot reservation terms for autumn shipping cycles.",
    status: "Contacted",
    timestamp: "2026-06-11T14:35:00Z"
  },
  {
    id: "VQD-2026-102943",
    fullName: "Hiroshi Takahashi",
    email: "takahashi@aichioils.co.jp",
    companyName: "Aichi Food Oils Corp.",
    phone: "+81 52 201 1111",
    country: "Japan",
    commodityId: "sesame-seeds",
    quantityTons: 400,
    packagingType: "50kg multi-ply PP bags",
    shippingTerms: "FOB",
    destinationPort: "Nagoya (Japan)",
    message: "Interested in the 99.5% natural white sesame seeds. Please quote current price per metric ton loaded at Apapa Port.",
    status: "Reviewed",
    timestamp: "2026-06-12T05:12:00Z"
  }
];

// LocalStorage Persistence utility
const loadFromLS = (key: string, defaultValue: any) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultValue;
  }
};

const saveToLS = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export class AppDatabase {
  // Check if we should execute real Supabase calls or use LocalStorage
  static get usingSupabase(): boolean {
    return config.isConfigured && supabase !== null;
  }

  // --- COMMODITIES CRUD ---
  static async getCommodities(): Promise<Commodity[]> {
    if (this.usingSupabase) {
      const { data, error } = await supabase!.from("commodities").select("*");
      if (!error && data) {
        return data.map(item => ({
          ...item,
          gallery: item.gallery || [],
          exportDestinations: item.export_destinations || [],
          packagingOptions: item.packaging_options || [],
          minimumOrder: item.minimum_order,
          harvestPeriod: item.harvest_period,
          hsCode: item.hs_code
        }));
      }
      console.warn("Supabase fetch failed, falling back to local storage:", error);
    }
    return loadFromLS("VCD_COMMODITIES", COMMODITIES);
  }

  static async saveCommodity(commodity: Commodity): Promise<void> {
    if (this.usingSupabase) {
      const dbObj = {
        id: commodity.id,
        name: commodity.name,
        category: commodity.category,
        tagline: commodity.tagline,
        description: commodity.description,
        detailed_description: commodity.detailedDescription,
        image: commodity.image,
        gallery: commodity.gallery,
        moisture_content: commodity.moistureContent,
        purity_level: commodity.purityLevel,
        export_destinations: commodity.exportDestinations,
        packaging_options: commodity.packagingOptions,
        hs_code: commodity.hsCode,
        origin: commodity.origin,
        minimum_order: commodity.minimumOrder,
        packaging: commodity.packaging,
        harvest_period: commodity.harvestPeriod,
        specs: commodity.specs
      };
      const { error } = await supabase!.from("commodities").upsert(dbObj);
      if (!error) return;
      console.error("Supabase upsert failed:", error);
    }
    const items = loadFromLS("VCD_COMMODITIES", COMMODITIES);
    const existingIndex = items.findIndex((c: Commodity) => c.id === commodity.id);
    if (existingIndex > -1) {
      items[existingIndex] = commodity;
    } else {
      items.push(commodity);
    }
    saveToLS("VCD_COMMODITIES", items);
  }

  static async deleteCommodity(id: string): Promise<void> {
    if (this.usingSupabase) {
      const { error } = await supabase!.from("commodities").delete().eq("id", id);
      if (!error) return;
      console.error("Supabase delete failed:", error);
    }
    const items = loadFromLS("VCD_COMMODITIES", COMMODITIES);
    const filtered = items.filter((c: Commodity) => c.id !== id);
    saveToLS("VCD_COMMODITIES", filtered);
  }

  // --- BLOG POSTS CRUD ---
  static async getBlogs(): Promise<BlogPost[]> {
    if (this.usingSupabase) {
      const { data, error } = await supabase!.from("blogs").select("*");
      if (!error && data) {
        return data.map(item => ({
          ...item,
          readingTime: item.reading_time
        }));
      }
    }
    return loadFromLS("VCD_BLOGS", BLOGS);
  }

  static async saveBlog(blog: BlogPost): Promise<void> {
    if (this.usingSupabase) {
      const dbObj = {
        id: blog.id,
        title: blog.title,
        summary: blog.summary,
        content: blog.content,
        date: blog.date,
        author: blog.author,
        reading_time: blog.readingTime,
        category: blog.category,
        image: blog.image
      };
      const { error } = await supabase!.from("blogs").upsert(dbObj);
      if (!error) return;
    }
    const items = loadFromLS("VCD_BLOGS", BLOGS);
    const existingIndex = items.findIndex((b: BlogPost) => b.id === blog.id);
    if (existingIndex > -1) {
      items[existingIndex] = blog;
    } else {
      items.push(blog);
    }
    saveToLS("VCD_BLOGS", items);
  }

  static async deleteBlog(id: string): Promise<void> {
    if (this.usingSupabase) {
      await supabase!.from("blogs").delete().eq("id", id);
    }
    const items = loadFromLS("VCD_BLOGS", BLOGS);
    const filtered = items.filter((b: BlogPost) => b.id !== id);
    saveToLS("VCD_BLOGS", filtered);
  }

  // --- CERTIFICATIONS CRUD ---
  static async getCertifications(): Promise<Certification[]> {
    if (this.usingSupabase) {
      const { data, error } = await supabase!.from("certifications").select("*");
      if (!error && data) {
        return data.map(item => ({
          id: item.id,
          name: item.name,
          issuer: item.issuer,
          description: item.description,
          logoUrl: item.logo_url
        }));
      }
    }
    return loadFromLS("VCD_CERTIFICATIONS", CERTIFICATIONS);
  }

  static async saveCertification(cert: Certification): Promise<void> {
    if (this.usingSupabase) {
      const dbObj = {
        id: cert.id,
        name: cert.name,
        issuer: cert.issuer,
        description: cert.description,
        logo_url: cert.logoUrl
      };
      await supabase!.from("certifications").upsert(dbObj);
    }
    const items = loadFromLS("VCD_CERTIFICATIONS", CERTIFICATIONS);
    const existingIndex = items.findIndex((c: Certification) => c.id === cert.id);
    if (existingIndex > -1) {
      items[existingIndex] = cert;
    } else {
      items.push(cert);
    }
    saveToLS("VCD_CERTIFICATIONS", items);
  }

  static async deleteCertification(id: string): Promise<void> {
    if (this.usingSupabase) {
      await supabase!.from("certifications").delete().eq("id", id);
    }
    const items = loadFromLS("VCD_CERTIFICATIONS", CERTIFICATIONS);
    const filtered = items.filter((c: Certification) => c.id !== id);
    saveToLS("VCD_CERTIFICATIONS", filtered);
  }

  // --- TEAM MEMBERS CRUD ---
  static async getTeam(): Promise<any[]> {
    if (this.usingSupabase) {
      const { data, error } = await supabase!.from("team_members").select("*");
      if (!error && data) return data;
    }
    return loadFromLS("VCD_TEAM", INITIAL_TEAM);
  }

  static async saveTeamMember(member: any): Promise<void> {
    if (this.usingSupabase) {
      await supabase!.from("team_members").upsert(member);
    }
    const items = loadFromLS("VCD_TEAM", INITIAL_TEAM);
    const existingIndex = items.findIndex((t: any) => t.id === member.id);
    if (existingIndex > -1) {
      items[existingIndex] = member;
    } else {
      items.push(member);
    }
    saveToLS("VCD_TEAM", items);
  }

  static async deleteTeamMember(id: string): Promise<void> {
    if (this.usingSupabase) {
      await supabase!.from("team_members").delete().eq("id", id);
    }
    const items = loadFromLS("VCD_TEAM", INITIAL_TEAM);
    const filtered = items.filter((t: any) => t.id !== id);
    saveToLS("VCD_TEAM", filtered);
  }

  // --- HOMEPAGE VARIABLES ---
  static async getHomepage(): Promise<any> {
    if (this.usingSupabase) {
      const { data, error } = await supabase!.from("homepage_content").select("*");
      if (!error && data && data.length > 0) {
        const homepage: any = {};
        data.forEach(item => {
          homepage[item.key] = item.value;
        });
        return { ...INITIAL_HOMEPAGE, ...homepage };
      }
    }
    return loadFromLS("VCD_HOMEPAGE", INITIAL_HOMEPAGE);
  }

  static async saveHomepage(dataObj: any): Promise<void> {
    if (this.usingSupabase) {
      const promises = Object.entries(dataObj).map(([key, value]) => {
        return supabase!.from("homepage_content").upsert({ key, value });
      });
      await Promise.all(promises);
    }
    saveToLS("VCD_HOMEPAGE", dataObj);
  }

  // --- CONTACTS & QUOTE REQUESTS ---
  static async getContactRequests(): Promise<QuoteRequest[]> {
    if (this.usingSupabase) {
      const { data, error } = await supabase!.from("contact_requests").select("*");
      if (!error && data) {
        return data.map(item => ({
          id: item.id,
          fullName: item.full_name,
          email: item.email,
          companyName: item.company_name,
          phone: item.phone,
          commodityId: item.commodity_id,
          quantityTons: Number(item.volume_tons),
          shippingTerms: item.shipping_terms,
          destinationPort: item.destination_port,
          message: item.message,
          status: item.status,
          timestamp: item.created_at,
          country: item.country || "Nigeria",
          packagingType: item.packaging_type || "Standard Jute bag"
        }));
      }
    }
    return loadFromLS("VCD_CONTACTS", INITIAL_CONTACTS);
  }

  static async saveContactRequest(req: QuoteRequest): Promise<void> {
    if (this.usingSupabase) {
      const dbObj = {
        full_name: req.fullName,
        email: req.email,
        company_name: req.companyName,
        phone: req.phone,
        commodity_id: req.commodityId,
        volume_tons: req.quantityTons,
        shipping_terms: req.shippingTerms,
        destination_port: req.destinationPort,
        message: req.message,
        status: req.status
      };
      await supabase!.from("contact_requests").insert(dbObj);
    }
    const items = loadFromLS("VCD_CONTACTS", INITIAL_CONTACTS);
    const existingIndex = items.findIndex((c: QuoteRequest) => c.id === req.id);
    if (existingIndex > -1) {
      items[existingIndex] = req;
    } else {
      items.unshift(req); // add newest first
    }
    saveToLS("VCD_CONTACTS", items);
  }

  static async deleteContactRequest(id: string): Promise<void> {
    if (this.usingSupabase) {
      await supabase!.from("contact_requests").delete().eq("id", id);
    }
    const items = loadFromLS("VCD_CONTACTS", INITIAL_CONTACTS);
    const filtered = items.filter((c: QuoteRequest) => c.id !== id);
    saveToLS("VCD_CONTACTS", filtered);
  }
}
