/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from "@supabase/supabase-js";

// Retrieve configuration from environment or localStorage
const getSupabaseConfig = () => {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
  
  const localUrl = localStorage.getItem("VCD_SUPABASE_URL");
  const localKey = localStorage.getItem("VCD_SUPABASE_ANON_KEY");

  const url = (envUrl || localUrl || "").trim();
  const key = (envKey || localKey || "").trim();

  // Validate that the URL is a proper web URL to prevent createClient from throwing on malformed inputs
  const isValidHttpUrl = url.startsWith("http://") || url.startsWith("https://");

  return {
    url,
    key,
    isConfigured: isValidHttpUrl && !!key
  };
};

export const config = getSupabaseConfig();

// Initialize client if configured, otherwise export null and handle failures gracefully
let supabaseClient = null;
if (config.isConfigured) {
  try {
    supabaseClient = createClient(config.url, config.key);
  } catch (error) {
    console.error("Failed to initialize Supabase client with the provided credentials:", error);
  }
}

export const supabase = supabaseClient;

/**
 * Returns SQL scripts to provision a Supabase Database matching our schema.
 * This can be copy-pasted straight into the Supabase SQL editor.
 */
export const getSupabaseSchemaSQL = () => {
  return `-- Lakeduck Integrated Limited - Supabase Schema Setup
-- Run this in your Supabase SQL Editor to configure all tables.

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create CUSTOMERS & CONTACT REQUESTS table
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  commodity_id TEXT,
  volume_tons NUMERIC,
  shipping_terms TEXT,
  destination_port TEXT,
  message TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewed', 'Contacted')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create PRODUCTS / COMMODITIES table
CREATE TABLE IF NOT EXISTS commodities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  detailed_description TEXT NOT NULL,
  image TEXT NOT NULL,
  gallery TEXT[] NOT NULL,
  moisture_content TEXT NOT NULL,
  purity_level TEXT NOT NULL,
  export_destinations TEXT[] NOT NULL,
  packaging_options TEXT[] NOT NULL,
  hs_code TEXT NOT NULL,
  origin TEXT NOT NULL,
  minimum_order TEXT NOT NULL,
  packaging TEXT NOT NULL,
  harvest_period TEXT NOT NULL,
  specs JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create BLOG POSTS table
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL,
  reading_time TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create CERTIFICATIONS table
CREATE TABLE IF NOT EXISTS certifications (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create TEAM MEMBERS table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  speech TEXT NOT NULL,
  image TEXT NOT NULL,
  experience TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create HOMEPAGE CONTENT table
CREATE TABLE IF NOT EXISTS homepage_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE commodities ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- Create Policies (Anonymous read, Authenticated write/edit)
CREATE POLICY "Allow public read commodities" ON commodities FOR SELECT USING (true);
CREATE POLICY "Allow public read blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Allow public read certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "Allow public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read homepage_content" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Allow public insert contact_requests" ON contact_requests FOR INSERT WITH CHECK (true);

-- Authenticated Admin Policies
CREATE POLICY "Allow admin full-access contact_requests" ON contact_requests ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full-access commodities" ON commodities ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full-access blogs" ON blogs ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full-access certifications" ON certifications ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full-access team_members" ON team_members ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full-access homepage_content" ON homepage_content ALL USING (auth.role() = 'authenticated');
`;
};
