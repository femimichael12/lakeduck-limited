/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Specification {
  label: string;
  value: string;
}

export interface Commodity {
  id: string;
  name: string;
  category: "Grains & Seeds" | "Cocoa & Coffee" | "Spices" | "Nuts" | "Solid Minerals" | "Recycled Materials";
  tagline: string;
  description: string;
  detailedDescription: string;
  image: string;
  gallery: string[];
  moistureContent: string;
  purityLevel: string;
  exportDestinations: string[];
  packagingOptions: string[];
  specs: Specification[];
  hsCode: string;
  origin: string;
  minimumOrder: string;
  packaging: string;
  harvestPeriod: string;
}

export interface Service {
  id: string;
  title: string;
  iconName: string; // Used to dynamically map Lucide icon
  shortDescription: string;
  detailedDescription: string;
  benefits: string[];
}

export interface Project {
  id: string;
  title: string;
  commodityName: string;
  volumeTons: number;
  destination: string;
  destinationCountryCode: string; // for showing flag or code
  year: number;
  status: "Completed" | "In Transit";
  narrative: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  readingTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  logoUrl?: string;
  description: string;
}

export interface StatItem {
  id: string;
  value: string;
  numberValue: number;
  suffix: string;
  label: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  country: string;
  rating: number; // 1-5
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  phone: string;
  country: string;
  commodityId: string;
  quantityTons: number;
  packagingType: string;
  shippingTerms: "FOB" | "CIF" | "CFR";
  destinationPort: string;
  message: string;
  status: "Pending" | "Reviewed" | "Contacted";
  timestamp: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
