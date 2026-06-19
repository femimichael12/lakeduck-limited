/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Leaf, 
  FileCheck, 
  Ship, 
  FileText, 
  Check, 
  ChevronRight, 
  TrendingUp, 
  MessageSquare, 
  ShieldCheck, 
  Layers, 
  Award, 
  Package, 
  Clock, 
  ArrowRight
} from "lucide-react";
import { SERVICES } from "../data";

// Custom detailed metadata to augment the raw SERVICES array
const SERVICE_PAGES_META: Record<string, {
  image: string;
  badge: string;
  longNarrative: string;
  kpis: { label: string; value: string; desc: string }[];
  steps: { num: string; title: string; desc: string }[];
}> = {
  "commodity-sourcing": {
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200",
    badge: "Eco-Agricultural Certified Sourcing",
    longNarrative: "Lakeduck Integrated maintains direct, continuous, and ethical partnerships with over 15,000 smallholder farmer cooperatives throughout Nigeria's most fertile vegetative belts. By establishing structured field-gate agronomist columns, we assist local farming communities with pre-season micro-financing, organic soil cultivation training, and top-tier seed distribution. This secure foundation ensures pristine raw commodity cargo starting directly from the roots.",
    kpis: [
      { label: "Sourcing Footprint", value: "15,000+ Farmers", desc: "Smallholder networks engaged across Nigeria's crop belts" },
      { label: "Traceability Rating", value: "100% Farm-To-Port", desc: "Fully auditable origin tracking for every bulk container" },
      { label: "Crop Compliance", value: "Fully Organic / Fair", desc: "Ethical trade pricing that honors field labor standards" }
    ],
    steps: [
      { num: "01", title: "Cooperative Engagement", desc: "Establishing long-term purchase agreements directly with smallholder crop unions." },
      { num: "02", title: "Agronomy Training", desc: "Deploying site agronomists to teach pesticide-free sun-drying and soil care techniques." },
      { num: "03", title: "stabilization Sump", desc: "Issuing pre-season price capital to protect growers from local merchant markups." },
      { num: "04", title: "Direct Gate Loading", desc: "Procuring crops directly at the field-gates for zero intermediary manipulation." }
    ]
  },
  "quality-assurance": {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    badge: "SGS / Cotecna Accredited Lab Inspection",
    longNarrative: "Pristine physical standards are our absolute trademark. Every cargo lot passing into Lakeduck's custody undergoes strict double-stage sifting, laboratory evaluation, and third-party inspection. Our advanced regional cleaning depots employ gravity destoners, drum separators, and pneumatic wind sorters to reduce average extraneous admixture down to a negligible 0.5%. Perfect moisture levels are continuously audited via modern digital testers under watch of SGS, Bureau Veritas, or Cotecna.",
    kpis: [
      { label: "Admixture Average", value: "<0.5% Extraneous", desc: "Rigid sorting removes seed chaff, pebbles, and weeds" },
      { label: "Audit Standards", value: "ISO 9001 Compliant", desc: "Structured testing procedures for international compliance" },
      { label: "Moisture Guarantee", value: "7.0% - 9.0% Checked", desc: "Calculated precisely per product specifications to prevent mold" }
    ],
    steps: [
      { num: "01", title: "Random Sack Sampling", desc: "Testing ten percent of arriving bags with steel spears for core purity checks." },
      { num: "02", title: "Pneumatic Re-sorting", desc: "Sifting commodities using multiple mesh screens and magnetic particle filters." },
      { num: "03", title: "Laboratory Appraisal", desc: "Calculating exact Kernel Outturn Ratios (KOR) and free fatty acid (FFA) levels." },
      { num: "04", title: "Seal Authorization", desc: "Affixing tamper-proof global inspection seals onto target container locks." }
    ]
  },
  "international-logistics": {
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1200",
    badge: "Tier-1 Carrier Sea Freight Dispatch",
    longNarrative: "We handle complex multi-modal agricultural ocean supply chains flawlessly. With customs-bonded storage depots located near the Apapa Port in Lagos and Onne Port in Port Harcourt, we fast-track vessel bookings on leading international shipping lines. From container booking to phytosanitary declarations and commercial invoice clearing, we move ocean containers smoothly through terminal gates while tracking and logging continuous vessel temperature reports.",
    kpis: [
      { label: "Ocean Transit", value: "21 Days Avg Route", desc: "Expedited shipping lanes from Nigeria to major global ports" },
      { label: "Carrier Booking", value: "Priority Allocation", desc: "Strategic contracts with MSC, Maersk, and CMA CGM liners" },
      { label: "Cargo Risk", value: "100% Insured", desc: "Comprehensive maritime cargo insurance policies on all FOB/CIF items" }
    ],
    steps: [
      { num: "01", title: "Inland Drayage Dispatch", desc: "Commanding GPS-equipped cargo trucks from central depots directly to port locks." },
      { num: "02", title: "Customs Declarations", desc: "Expediting electronic export approvals and clearing local port terminal tax files." },
      { num: "03", title: "Ocean Vessel Slotting", desc: "Pre-reserving stable slots inside heavy vessels to bypass seasonal delay queues." },
      { num: "04", title: "B/L Documentation Delivery", desc: "Releasing original shipping papers, Phytosanitary clean passes, and origin files." }
    ]
  },
  "custom-packaging": {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    badge: "Hydrocarbon-Free Export Grade Bags",
    longNarrative: "Exquisite packaging guarantees commodity security during long maritime ocean journeys. We tailor cargo packaging to your unique processing facility specifications. Lakeduck supplies premium, hydrocarbon-free 60kg Jute bags, laminated block-bottom PP woven bags, or custom bulk big-bags that hold up to 1,000kg. Moisture-sensitive items like cocoa beans are protected with advanced aluminum-foil vacuum inner liners (desiccant barrier bags) to defend seeds indefinitely against tropical maritime humidity.",
    kpis: [
      { label: "Bag Material", value: "Hydrocarbon-Free Jute", desc: "Sourced strictly to prevent chemical contamination on food grades" },
      { label: "Logo Customization", value: "High-Definition Print", desc: "Direct factory branding, lot numbers, and HS codes labeled on bags" },
      { label: "Liner Defenses", value: "Thermo-Barrier Wrap", desc: "Optional inner vacuum shields to battle ocean air humidity" }
    ],
    steps: [
      { num: "01", title: "Technical Option Selection", desc: "Choosing bag sizes and air ventilation slots based on destination climates." },
      { num: "02", title: "High-Definition Screen Print", desc: "Inks are printed cleanly with destination codes, weights, and private logo files." },
      { num: "03", title: "Atmosphere Sealing", desc: "Integrating thick protective sleeves to halt moisture and salt air infiltration." },
      { num: "04", title: "Systematic Strapping", desc: "Strapping bags securely onto anti-fungal treated pallets for rapid wharf lifts." }
    ]
  }
};

interface ServicesProps {
  initialServiceId?: string | null;
  onClearInitialService?: () => void;
  onOpenQuoteModal?: (commodityId?: string) => void;
}

export default function Services({ 
  initialServiceId, 
  onClearInitialService, 
  onOpenQuoteModal 
}: ServicesProps) {
  // Local state to keep track of the active service page
  const [activeServiceId, setActiveServiceId] = useState<string>("commodity-sourcing");

  // Sync state if an initialId is passed from the parent navigation/redirects
  useEffect(() => {
    if (initialServiceId) {
      const match = SERVICES.find((s) => s.id === initialServiceId);
      if (match) {
        setActiveServiceId(match.id);
        if (onClearInitialService) {
          onClearInitialService();
        }
      }
    }
  }, [initialServiceId, onClearInitialService]);

  // Find active service object
  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];
  const meta = SERVICE_PAGES_META[activeService.id] || SERVICE_PAGES_META["commodity-sourcing"];

  // Helper to map icon names
  const renderServiceIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case "Leaf":
        return <Leaf className={`${className} text-[#8BA88E]`} />;
      case "FileCheck":
        return <FileCheck className={`${className} text-[#8BA88E]`} />;
      case "Ship":
        return <Ship className={`${className} text-[#8BA88E]`} />;
      case "Briefcase":
      default:
        return <FileText className={`${className} text-[#8BA88E]`} />;
    }
  };

  const handleInquireNow = () => {
    if (onOpenQuoteModal) {
      // Open quote modal pre-selections
      onOpenQuoteModal("cocoa-beans");
    }
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Lakeduck Trading Desk,\n\nWe would like to request specific commercial consultation and terms regarding:\n` +
      `• Service: ${activeService.title}\n` +
      `• Enterprise ID: ${activeService.id}\n\nPlease advise on our trade desk queue allocation rules.`
    );
    return `https://api.whatsapp.com/send?phone=234808202010&text=${text}`;
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* 1. Header Zone */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[#C5A059] font-mono text-xs font-bold tracking-[0.25em] uppercase block">
          Enterprise Services Profile
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#1B2E21] tracking-tight leading-tight">
          Operational Logistics <span className="font-bold not-italic text-[#8BA88E]">& Agri-Sourcing Pages</span>
        </h2>
        <p className="text-[#1B2E21]/70 text-xs sm:text-sm font-light font-sans max-w-2xl mx-auto">
          Choose a service below to access its individual operational page, quality parameters, trace timelines, and custom commercial inquiry terminals.
        </p>
      </div>

      {/* 2. Primary Page Container (Desktop-sidebar, Mobile-swipeable tabs) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-24">
          <div className="hidden lg:block bg-white/70 border border-[#1B2E21]/15 p-4 rounded-none">
            <h3 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              SELECT SERVICES PROFILE
            </h3>
            
            <div className="space-y-2">
              {SERVICES.map((srv) => {
                const isActive = activeServiceId === srv.id;
                return (
                  <button
                    key={srv.id}
                    onClick={() => setActiveServiceId(srv.id)}
                    className={`w-full text-left p-4 rounded-none transition-all flex items-start gap-4 border cursor-pointer ${
                      isActive
                        ? "bg-[#1B2E21] border-[#C5A059]/20 text-white shadow-md relative"
                        : "bg-white hover:bg-[#1B2E21]/5 border-[#1B2E21]/10 text-[#1B2E21]"
                    }`}
                  >
                    {/* Active Accent Tag */}
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C5A059]" />
                    )}
                    
                    <div className={`p-2 shrink-0 ${isActive ? "bg-white/10" : "bg-[#1B2E21]/5"} rounded-full`}>
                      {renderServiceIcon(srv.iconName, "w-5 h-5")}
                    </div>
                    
                    <div>
                      <h4 className={`font-serif italic text-base leading-tight font-semibold ${isActive ? "text-[#C5A059]" : "text-[#1B2E21]"}`}>
                        {srv.title}
                      </h4>
                      <p className={`text-xs line-clamp-2 mt-1 leading-snug ${isActive ? "text-gray-300" : "text-gray-500 font-light"}`}>
                        {srv.shortDescription}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Scrollable Horizontal Pills Indicator */}
          <div className="lg:hidden flex gap-2 pb-2 overflow-x-auto scrollbar-none snap-x snap-mandatory px-1">
            {SERVICES.map((srv) => {
              const isActive = activeServiceId === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveServiceId(srv.id)}
                  className={`snap-start shrink-0 px-5 py-3 border text-xs font-mono font-bold uppercase tracking-wider rounded-none cursor-pointer transition-colors ${
                    isActive
                      ? "bg-[#1B2E21] border-[#C5A059] text-white"
                      : "bg-white border-[#1B2E21]/15 text-[#1B2E21]/80 hover:bg-gray-50"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    {renderServiceIcon(srv.iconName, "w-3.5 h-3.5")}
                    {srv.title.split(" ")[srv.title.split(" ").length - 1]}
                  </span>
                </button>
              );
            })}
          </div>
          
          <div className="bg-[#FAF8F5] border border-[#1B2E21]/10 p-5 rounded-none space-y-3.5">
            <h4 className="font-mono text-xs font-bold text-[#1B2E21] tracking-wider uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C5A059]" />
              Trade Operations SLA
            </h4>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Lakeduck holds a guaranteed 99.8% shipping order execution rate. Each transactional step is audited under strict internal maritime rules.
            </p>
            <div className="text-[10px] font-mono text-[#C5A059] font-bold tracking-widest border-t border-[#1B2E21]/5 pt-2 flex justify-between">
              <span>ESTABLISHED 2018</span>
              <span>NXP AUDITED</span>
            </div>
          </div>
        </div>

        {/* Selected Service Detailed Page Content (lg:col-span-8) */}
        <div id="service-page-active-viewer" className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeServiceId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#1B2E21]/15 p-6 sm:p-8 lg:p-10 space-y-10 shadow-sm"
            >
              
              {/* Product Page cover image */}
              <div className="relative h-[250px] sm:h-[350px] overflow-hidden group">
                <img 
                  src={meta.image} 
                  alt={activeService.title} 
                  className="w-full h-full object-cover select-none transform group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 space-y-1 text-white">
                  <span className="inline-flex items-center px-2.5 py-0.5 bg-[#C5A059] text-[9px] font-mono font-bold tracking-wider uppercase">
                    {meta.badge}
                  </span>
                  <h3 className="font-serif italic text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight text-[#FAF8F5]">
                    {activeService.title} Operations
                  </h3>
                </div>
              </div>

              {/* Long Narrative Block */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] tracking-widest text-[#C5A059] font-bold uppercase block">
                  SERVICE DESIGN & ARCHITECTURE
                </span>
                <p className="text-[#1B2E21]/90 font-sans font-light leading-relaxed text-sm sm:text-base text-justify whitespace-normal">
                  {meta.longNarrative}
                </p>
              </div>

              {/* Technical KPIs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-[#1B2E21]/10 py-6">
                {meta.kpis.map((kpi, index) => (
                  <div key={index} id={`kpi-widget-${index}`} className="space-y-1">
                    <span className="block font-mono text-[10px] uppercase font-bold text-[#C5A059]">
                      {kpi.label}
                    </span>
                    <span className="block text-lg sm:text-xl font-serif italic text-[#1B2E21] font-bold leading-none">
                      {kpi.value}
                    </span>
                    <span className="block text-xs text-gray-500 font-light leading-snug">
                      {kpi.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Service Sourcing Steps / Process Route */}
              <div className="space-y-6">
                <h4 className="font-serif italic text-lg sm:text-xl font-bold text-[#1B2E21] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#8BA88E]" />
                  Operational Action Trace Pipeline
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {meta.steps.map((st) => (
                    <div 
                      key={st.num} 
                      className="border border-[#1B2E21]/5 bg-[#FAF8F5] p-5 relative overflow-hidden flex flex-col justify-between"
                    >
                      <span className="absolute right-3 top-2 text-2xl font-mono text-gray-200/90 font-black tracking-tighter select-none">
                        {st.num}
                      </span>
                      <div className="space-y-1.5 z-10">
                        <span className="px-2 py-0.5 border border-[#1B2E21]/15 text-[8px] font-mono text-[#1B2E21]/70 font-bold uppercase bg-white">
                          PHASE {st.num}
                        </span>
                        <h5 className="font-serif italic font-bold text-sm text-[#1B2E21] mt-1">
                          {st.title}
                        </h5>
                        <p className="text-xs text-gray-600 font-light leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights List */}
              <div id="service-specific-highlights" className="space-y-3.5 bg-gray-50/70 p-5 border border-dashed border-[#1B2E21]/10">
                <span className="block font-mono text-[10px] font-bold tracking-widest text-[#C5A059] uppercase">
                  ACTIVE CRUL INSTRUCTIONS & COMPLIANCE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {activeService.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#1B2E21]/80 font-light font-sans">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsive Call To Action Panel - Fixed and Highly Robust */}
              <div 
                id="inquiry-services-action-zone" 
                className="bg-[#1B2E21] border border-[#C5A059]/20 p-6 sm:p-8 text-[#FAF8F5] space-y-6 flex flex-col sm:flex-row items-center sm:justify-between sm:items-start gap-6"
              >
                <div className="space-y-2 text-center sm:text-left max-w-md">
                  <h4 className="font-serif italic text-xl font-bold text-[#C5A059]">
                    Inquire For {activeService.title}
                  </h4>
                  <p className="text-xs text-brand-100/90 font-light leading-relaxed">
                    Establish custom contract terms, NXP setup protocols, and target shipping allotments for your factory processing slots.
                  </p>
                </div>
                
                {/* Flex layout that stays responsive on both mobile and desktop screens */}
                <div className="w-full sm:w-auto flex flex-col gap-2.5 shrink-0 self-stretch sm:self-auto justify-end">
                  <button
                    onClick={handleInquireNow}
                    className="w-full sm:w-auto px-5 py-3 bg-[#C5A059] text-[#1B2E21] text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#FAF8F5] hover:text-[#1B2E21] active:translate-y-px transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    Request Contract Template
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 border border-[#C5A059]/40 bg-transparent text-[#C5A059] text-xs font-mono font-bold tracking-wider uppercase hover:bg-white/5 active:translate-y-px transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp Trading Desk
                  </a>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
