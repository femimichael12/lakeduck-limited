/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ship, Globe, Anchor, CheckCircle, Calculator, ChevronRight, Scale, Search, Compass } from "lucide-react";
import { PROJECTS } from "../data";

export default function Projects() {
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  
  // Sea-freight estimator states
  const [estCommodity, setEstCommodity] = useState("cocoa-beans");
  const [estTons, setEstTons] = useState(20);

  const countries = ["All", "Japan", "Netherlands", "Vietnam", "Germany"];

  const filteredProjects = PROJECTS.filter((proj) => {
    return selectedCountry === "All" || proj.destination.includes(selectedCountry);
  });

  // Simple estimations based on standard packing
  const getCalculationStats = () => {
    let packagingWeight = 64; // Cocoa Jute Bag weight
    let containerVolume = 25; // 20ft Cargo capacity tons
    let titleSlug = "Grade 1 Cocoa Cocoa Sacks";

    if (estCommodity === "sesame-seeds") {
      packagingWeight = 50;
      containerVolume = 19;
      titleSlug = "Golden Sesame Seeds PP Bags";
    } else if (estCommodity === "ginger-dried") {
      packagingWeight = 40;
      containerVolume = 14;
      titleSlug = "Kaduna Split Ginger Sacks";
    } else if (estCommodity === "cashew-nuts") {
      packagingWeight = 80;
      containerVolume = 17;
      titleSlug = "Raw Cashew Jute Bags";
    } else if (estCommodity === "hibiscus-flower") {
      packagingWeight = 20;
      containerVolume = 12; // Light weight, bulk-liner
      titleSlug = "Hibiscus Calyces Bundled Sacks";
    } else if (estCommodity === "hardwood-charcoal") {
      packagingWeight = 25;
      containerVolume = 20;
      titleSlug = "Ayin Lump Charcoal Bags";
    }

    const calculatedBags = Math.ceil((estTons * 1000) / packagingWeight);
    const calculatedContainers = Math.ceil(estTons / containerVolume);

    return {
      bags: calculatedBags,
      containers: calculatedContainers,
      bagType: titleSlug,
      estStorageSqFt: Math.round(calculatedContainers * 160) // approx sq ft
    };
  };

  const currentCalc = getCalculationStats();

  return (
    <div className="py-16 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="space-y-4">
        <span className="text-[#C5A059] font-extrabold tracking-[0.25em] uppercase text-xs block mb-1">
          Global Logistics Footprint
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#1B2E21] tracking-tight leading-tight">
          Shipments Successfully <span className="font-bold not-italic text-[#8BA88E]">Dispatched Worldwide</span>
        </h2>
        <p className="text-[#1B2E21]/70 text-sm sm:text-base max-w-3xl leading-relaxed font-light font-sans">
          Review our track record of bulk agricultural commodity dispatch and logistics delivery. We fulfill container load requirements matching rigorous customs thresholds worldwide.
        </p>
      </div>

      {/* Grid: 2 Columns - Projects Ledger & Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Interactive Completed Deliveries list (8 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center border-b border-[#1B2E21]/10 pb-4">
            <h3 className="font-serif italic font-semibold text-xl text-[#1B2E21] flex items-center gap-2">
              <Anchor className="w-5 h-5 text-[#C5A059]" />
              Completed Sea Cargo Bilateral Ledger
            </h3>
            {/* Filter */}
            <div className="flex gap-1.5 flex-wrap">
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCountry(c)}
                  className={`px-3 py-1.5 rounded-none text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                    selectedCountry === c
                      ? "bg-[#1B2E21] text-white shadow-sm font-bold"
                      : "bg-[#F8F5F0] hover:bg-[#1B2E21]/15 text-[#1B2E21]/80 border border-[#1B2E21]/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Stack */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="bg-white border border-[#1B2E21]/15 rounded-none p-6 hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 h-full w-1.5 bg-[#C5A059] group-hover:w-2 transition-all" />
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-3 mb-4">
                    <div>
                      <span className="font-mono text-[9px] bg-[#1B2E21]/5 text-[#1B2E21] px-2 py-0.5 rounded-none uppercase font-bold tracking-widest inline-block">
                        {proj.commodityName}
                      </span>
                      <h4 className="font-serif italic text-[#1B2E21] font-semibold text-base sm:text-lg leading-tight mt-1.5">
                        {proj.title}
                      </h4>
                    </div>
                    
                    <span className="font-mono text-xs font-bold bg-[#1B2E21] text-[#C5A059] px-3 py-1.5 rounded-none shrink-0">
                      {proj.volumeTons} METRIC TONS
                    </span>
                  </div>

                  <p className="text-[#1B2E21]/80 text-xs sm:text-sm leading-relaxed mb-4 font-sans font-light">
                    {proj.narrative}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-500 pt-1">
                    <span className="flex items-center gap-1.5 font-semibold text-[#1B2E21]/80">
                      <Globe className="w-4 h-4 text-[#8BA88E] shrink-0" />
                      Dispatched to: {proj.destination}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#1B2E21]/5 text-[#1B2E21] px-2 py-1 border border-[#1B2E21]/10 rounded-none font-bold">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                      {proj.status === "Completed" ? `Arrived ${proj.year}` : "Sea Transit Active"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Sea Freight Metric Calculator (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#1B2E21]/15 rounded-none p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2 border-b border-[#1B2E21]/10 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#1B2E21]/5 text-[#C5A059] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-serif italic font-semibold text-xl text-[#1B2E21] tracking-tight">
              Pre-Freight Shipping Estimations
            </h3>
            <p className="text-[#1B2E21]/75 text-xs sm:text-sm font-sans font-light">
              Roughly evaluate sack volume quantities and 20ft maritime container allocations based on desired tonnage size guidelines.
            </p>
          </div>

          {/* Form input elements */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">
                Select Sourced Crop
              </label>
              <select
                value={estCommodity}
                onChange={(e) => setEstCommodity(e.target.value)}
                className="w-full bg-[#F8F5F0] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3 text-sm focus:outline-none text-gray-800 transition-colors cursor-pointer"
              >
                <option value="cocoa-beans">Cocoa Beans Grade 1 (64kg Sacks)</option>
                <option value="sesame-seeds">Natural Sesame Seeds (50kg Sacks)</option>
                <option value="ginger-dried">Dried Split Ginger (40kg Sacks)</option>
                <option value="cashew-nuts">Raw Cashew Nuts (80kg Sacks)</option>
                <option value="hibiscus-flower">Dried Hibiscus Sorrel (20kg Sacks)</option>
                <option value="hardwood-charcoal">Hardwood Lump Charcoal (25kg Sacks)</option>
              </select>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center font-mono">
                <label className="text-gray-400 uppercase tracking-wider font-bold">Target Weight Volume (MT)</label>
                <span className="font-bold text-[#1B2E21]">{estTons} MT</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={estTons}
                onChange={(e) => setEstTons(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-gray-100 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>10 MT (Min Load)</span>
                <span>500 MT</span>
              </div>
            </div>
          </div>

          {/* Sizing Outputs */}
          <div className="bg-[#1B2E21] text-white rounded-none p-5 border border-[#C5A059]/10 shadow-lg space-y-4 font-mono">
            <div className="flex justify-between items-center border-b border-white/5 pb-3 text-xs">
              <span className="text-gray-300">ESTIMATED PARAMETERS</span>
              <span className="text-[10px] bg-[#C5A059]/20 border border-[#C5A059]/35 text-[#C5A059] px-2 py-0.5 rounded-none font-bold">
                Standard ISO 20ft
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-0.5">
                <span className="text-xs text-gray-400">Export Quantity</span>
                <span className="text-sm font-bold text-[#C5A059]">{estTons} Tons ({estTons * 1000} Kg)</span>
              </div>
              <div className="flex justify-between items-start py-0.5">
                <span className="text-xs text-gray-400">Total Sack Quantities</span>
                <div className="text-right">
                  <span className="text-sm font-bold text-white block">{currentCalc.bags.toLocaleString()} Sacks</span>
                  <span className="text-[10px] text-gray-400 text-right block">{currentCalc.bagType}</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-xs text-gray-400">Containers Needed</span>
                <span className="text-sm font-bold text-white">{currentCalc.containers} Container(s)</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-xs text-gray-400">Suggested Depot Sq Ft</span>
                <span className="text-sm font-bold text-[#C5A059]">{currentCalc.estStorageSqFt} Sq Ft minimum</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 italic font-sans font-light leading-relaxed pt-2 border-t border-white/5">
              Disclaimer: Exact packing weights change slightly depending on customized bag design layout requests and moisture loss indices during transport.
            </p>
          </div>

          <div className="pt-2 text-center text-[10px] text-gray-400 font-mono">
            Inquiries: broker@vanguardcommodities.com
          </div>
        </div>

      </div>

    </div>
  );
}
