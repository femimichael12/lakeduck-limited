/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Leaf, ArrowUp, Mail, ShieldAlert, Award, FileText } from "lucide-react";
import LakeduckLogo from "./Logo";

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenQuoteModal: () => void;
  onAdminTrigger?: () => void;
}

export default function Footer({ onNavigate, onOpenQuoteModal, onAdminTrigger }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#132017] text-white font-sans border-t border-[#C5A059]/10 pt-16 pb-8 relative overflow-hidden">
      
      {/* Background visual detail */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Global Call-to-Action section inside footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-white/5 mb-12">
        <div className="bg-gradient-to-r from-[#1B2E21] via-[#1B2E21]/90 to-[#132017] border border-[#C5A059]/15 rounded-none p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(197,160,89,0.06),transparent_50%)]" />
          
          <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
            <span className="font-mono text-[9px] bg-white/5 border border-[#C5A059]/30 text-[#C5A059] px-2.5 py-1 rounded-none uppercase font-bold tracking-widest inline-block">
              Ready to Secure Cocoa, Sesame, Ginger or Cashew?
            </span>
            <h3 className="font-serif italic font-semibold text-2xl sm:text-3xl text-white">
              Execute Your Global Supply Contracts Securely
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
              Contact our trade desks in Lagos and Abuja. We manage double-shredding, pre-shipment SGS analysis, custom sack printing, and port ocean logistics directly.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 bg-[#C5A059] hover:bg-[#b5924f] border-none text-[#1B2E21] rounded-none text-xs font-bold uppercase tracking-widest transition-all duration-305 hover:scale-[1.03] cursor-pointer shadow-md text-center"
            >
              Get Ocean Freight Quote
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="px-6 py-3 bg-transparent hover:bg-white/5 border border-[#C5A059]/30 text-[#C5A059] rounded-none text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer text-center"
            >
              Contact Trading Office
            </button>
          </div>
        </div>
      </div>

      {/* Footer major columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-sm">
        
        {/* Column 1: Brand & vision (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <button
            onClick={() => {
              onNavigate("home");
              scrollToTop();
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <LakeduckLogo className="w-9 h-9 shadow-md" dark={true} />
            <div>
              <span className="block font-serif italic font-semibold text-lg tracking-tight leading-none text-white">
                LAKEDUCK
              </span>
              <span className="block text-[8px] font-mono tracking-[1.5px] uppercase font-semibold text-[#C5A059]">
                INTEGRATED
              </span>
            </div>
          </button>

          <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-sans font-light">
            Lakeduck Integrated handles the end-to-end sourcing, cleaning, double-sifting, certification, packaging, recycling processing, and marine container shipping of agricultural products and recycled materials from West Africa to global factories.
          </p>

          <div className="flex gap-4 text-xs font-mono text-gray-500">
            <span>SGS Audit Approved</span>
            <span>|</span>
            <span>NEPC Registered Exporter</span>
          </div>
        </div>

        {/* Column 2: Commodities (2.5 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-serif italic text-gray-200 tracking-wider text-xs uppercase font-semibold">Sourced Graded Commodities</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>
              <button
                onClick={() => {
                  onNavigate("products");
                  setTimeout(() => {
                    const el = document.getElementById("commodity-cocoa-beans");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 150);
                }}
                className="hover:text-[#C5A059] transition-colors cursor-pointer text-left"
              >
                Grade 1 Cocoa Beans
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate("products");
                  setTimeout(() => {
                    const el = document.getElementById("commodity-sesame-seeds");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 150);
                }}
                className="hover:text-[#C5A059] transition-colors cursor-pointer text-left"
              >
                Golden White Sesame Seeds
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate("products");
                  setTimeout(() => {
                    const el = document.getElementById("commodity-ginger-dried");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 150);
                }}
                className="hover:text-[#C5A059] transition-colors cursor-pointer text-left"
              >
                Sun-Dried Split Ginger
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate("products");
                  setTimeout(() => {
                    const el = document.getElementById("commodity-cashew-nuts");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 150);
                }}
                className="hover:text-[#C5A059] transition-colors cursor-pointer text-left"
              >
                Raw Cashew Nuts (KOR 50-52)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate("products");
                  setTimeout(() => {
                    const el = document.getElementById("commodity-hibiscus-flower");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 150);
                }}
                className="hover:text-[#C5A059] transition-colors cursor-pointer text-left"
              >
                Dried Hibiscus Sorrel Flowers
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate("products");
                  setTimeout(() => {
                    const el = document.getElementById("commodity-hardwood-charcoal");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 150);
                }}
                className="hover:text-[#C5A059] transition-colors cursor-pointer text-left"
              >
                Premium Hardwood Ayin Charcoal
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Corporate Sections (2.5 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-serif italic text-gray-200 tracking-wider text-xs uppercase font-semibold">Corporate Navigation</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>
              <button onClick={() => onNavigate("home")} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                Return Home Desk
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("about")} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                Sustainable Agronomy & Team
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("services")} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                Quality Inspections & Liners
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("projects")} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                Maritime Despatched Ledgers
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("blog")} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                West African Market Intelligence
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("contact")} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                Ikoyi & Abuja Corporate Desks
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Quality assurances (2 cols) */}
        <div className="lg:col-span-2 space-y-4 text-xs font-mono text-gray-500">
          <h4 className="font-serif italic text-gray-200 tracking-wider text-xs uppercase font-semibold font-sans">Trading Security</h4>
          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <Award className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>SGS, Bureau Veritas & Cotecna compliant sealing</span>
            </div>
            <div className="flex gap-2 items-start">
              <FileText className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>Irrevocable Letters of Credit</span>
            </div>
            <div className="flex gap-2 items-start">
              <Mail className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>desk@lakeduckcommodities.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <div className="select-none">
          <span 
            onClick={onAdminTrigger}
            className="cursor-pointer transition-colors hover:text-[#C5A059]"
            title="Sourced with fairness"
          >
            &copy; {new Date().getFullYear()} Lakeduck Integrated & Export House. Sourced with fairness.
          </span>
        </div>
        <div className="flex gap-4">
          <span className="hover:text-[#C5A059] cursor-pointer">Terms of Sourcing</span>
          <span>|</span>
          <span className="hover:text-[#C5A059] cursor-pointer">Maritime Code Compliance</span>
          <span>|</span>
          <button onClick={scrollToTop} className="hover:text-[#C5A059] flex items-center gap-1 cursor-pointer">
            Back to Top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
}
