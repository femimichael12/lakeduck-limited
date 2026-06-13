/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, FileCheck, Ship, Scale, ChevronRight, FileText, Check, ShieldAlert, Award, TrendingUp } from "lucide-react";
import { SERVICES } from "../data";

const WORKFLOW_STEPS = [
  {
    stepNum: "01",
    phase: "Agronomy & Sourcing",
    title: "Eco-Cooperative Sourcing",
    description: "Our staff checks moisture and pesticide use right in crop fields across Kaduna, Ondo, and Benue before packaging.",
    detail: "We set pre-harvest purchase prices to maintain farm worker stability and avoid intermediate merchant markups, ensuring authentic commodities."
  },
  {
    stepNum: "02",
    phase: "Clean & Sifting",
    title: "Double Sifting & Sieve Sorting",
    description: "Sifting raw white sesame seeds and peeling cashew shells using multi-ply mechanical gravity destoners.",
    detail: "This reduces total extraneous debris, weeds, or seed chaff to less than 0.5% average prior to the packaging phase."
  },
  {
    stepNum: "03",
    phase: "Independent Testing",
    title: "Third Party Labs & SGS Sealing",
    description: "Sampling bags in designated depots to check exact oil indices, kernel outturn ratios, and moisture.",
    detail: "Done alongside SGS, Cotecna, or Bureau Veritas field supervisors, ensuring certified Phytosanitary Release passes."
  },
  {
    stepNum: "04",
    phase: "Customs Bonding",
    title: "Customs Brokerage & Port Escrow",
    description: "Handling terminal loading and clearing, fumigating containers, and drafting Export Declarations.",
    detail: "Liaising with the Nigerian Customs Service, terminal operators, and the port authority at Apapa or Onne."
  },
  {
    stepNum: "05",
    phase: "Container Vessel Dispatch",
    title: "Vessel Ocean Loading & Liners",
    description: "Closing high-barrier vacuum seal bags and embarking on Maersk/MSC lines with temperature logs.",
    detail: "Once vessel docks out, we secure the ocean Bill of Lading, Certificate of Weight and Quality, and Certificate of Origin immediately."
  }
];

export default function Services() {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  return (
    <div className="py-16 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#C5A059] font-extrabold tracking-[0.25em] uppercase text-xs block mb-1">
          Enterprise Solutions
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#1B2E21] tracking-tight leading-tight">
          Sourcing & Freight Brokerage <span className="font-bold not-italic text-[#8BA88E]">Tailored to Your Factory</span>
        </h2>
        <p className="text-[#1B2E21]/70 text-sm sm:text-base font-light font-sans">
          From farm gates in West Africa directly to ocean vessel berths, we deliver a seamless, risk-insured logistics stack for global import transactions.
        </p>
      </div>

      {/* 2. Structured Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES.map((srv, idx) => (
          <motion.div
            key={srv.id}
            id={`service-${srv.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-[#1B2E21]/15 rounded-none p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-transform group"
          >
            <div className="space-y-6">
              {/* Header inside header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#1B2E21]/5 text-[#1B2E21] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  {srv.iconName === "Leaf" && <Leaf className="w-6 h-6 text-[#8BA88E]" />}
                  {srv.iconName === "FileCheck" && <FileCheck className="w-6 h-6 text-[#8BA88E]" />}
                  {srv.iconName === "Ship" && <Ship className="w-6 h-6 text-[#8BA88E]" />}
                  {srv.iconName === "Briefcase" && <FileText className="w-6 h-6 text-[#8BA88E]" />}
                </div>
                <div>
                  <h3 className="font-serif italic text-xl text-[#1B2E21] font-semibold group-hover:text-[#C5A059] transition-colors leading-tight">
                    {srv.title}
                  </h3>
                  <span className="font-mono text-[9px] tracking-widest text-[#C5A059] font-bold uppercase block mt-0.5">
                    Verified Execution
                  </span>
                </div>
              </div>

              {/* Narratives */}
              <p className="text-[#1B2E21]/85 text-sm leading-relaxed font-sans font-light">
                {srv.detailedDescription}
              </p>

              {/* Bullet list checklist */}
              <div className="space-y-2 pt-2 border-t border-[#1B2E21]/10">
                <p className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Services Highlights</p>
                {srv.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#1B2E21]/80 font-light font-sans">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1B2E21]/10 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>SLA RATING: 99.8%</span>
              <span className="text-[#1B2E21] font-bold group-hover:text-[#C5A059] group-hover:translate-x-1.5 transition-all inline-flex items-center gap-1 cursor-pointer">
                Inquire Service
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Interactive Stepping Flow Chart: Farm-To-Vessel Trade Workflow */}
      <section className="bg-[#1B2E21] text-white rounded-none p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-[#C5A059]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_top,rgba(197,160,89,0.1),transparent_40%)]" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-widest block">
              Execution Traceability
            </span>
            <h3 className="font-serif font-light italic text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Our Rigid Sea Cargo <span className="font-bold not-italic">Handling Workflow Loop</span>
            </h3>
            <p className="text-brand-100/80 text-sm leading-relaxed font-sans font-light">
              We monitor every grain, cashew nut kernel, and cocoa sack from farm gates directly to final marine ocean containers. Click the interactive step tabs to review our operations.
            </p>

            {/* Stepper buttons (Vertical on desktop) */}
            <div className="space-y-2 pt-4">
              {WORKFLOW_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveWorkflowStep(idx)}
                  className={`w-full text-left px-4 py-3.5 rounded-none transition-all flex items-center justify-between cursor-pointer border ${
                    activeWorkflowStep === idx
                      ? "bg-[#C5A059] border-[#C5A059] text-[#1B2E21] font-bold shadow-md"
                      : "bg-[#233B29]/70 border-[#C5A059]/10 text-gray-300 hover:bg-[#233B29]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs">{step.stepNum}</span>
                    <span className="text-xs sm:text-sm font-sans tracking-wide leading-none">{step.phase}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#233B29] p-6 sm:p-8 rounded-none border border-[#C5A059]/15 shadow-inner min-h-[300px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWorkflowStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono">
                  <span className="text-xs text-[#C5A059] uppercase tracking-wider font-bold">
                    PHASE {WORKFLOW_STEPS[activeWorkflowStep].stepNum} SPECIFICATIONS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-none bg-[#1B2E21] border border-[#C5A059]/10 text-[10px] text-brand-100 font-mono">
                    Audited Cycle
                  </span>
                </div>

                <h4 className="font-serif italic font-semibold text-xl text-white">
                  {WORKFLOW_STEPS[activeWorkflowStep].title}
                </h4>

                <p className="text-brand-100/90 text-sm leading-relaxed font-sans font-light">
                  {WORKFLOW_STEPS[activeWorkflowStep].description}
                </p>

                <p className="text-brand-100/80 text-xs sm:text-sm leading-relaxed p-4 bg-[#1B2E21]/40 rounded-none border border-[#C5A059]/10 italic font-sans font-light">
                  &ldquo;{WORKFLOW_STEPS[activeWorkflowStep].detail}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-[#C5A059] font-mono font-bold">
              <span className="inline-flex items-center gap-1 text-xs">
                <TrendingUp className="w-4 h-4" />
                Continuously Audited via ISO 9001
              </span>
              <span className="text-white">100% Insured</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
