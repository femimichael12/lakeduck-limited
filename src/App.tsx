/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Compass, Ship, FileText, X, Leaf, Award, ArrowUpRight, 
  HelpCircle, Star, MessageSquare, Phone, Briefcase, ShieldCheck, 
  MapPin, CheckCircle, ChevronRight, Globe
} from "lucide-react";

// Sub-components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";

// Data
import { COMMODITIES, SERVICES, BLOGS, STATS, CERTIFICATIONS, TESTIMONIALS } from "./data";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  
  // Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preSelectedCommodityId, setPreSelectedCommodityId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Hidden Administrative Gatekeeper State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminKeyInput, setAdminKeyInput] = useState("");
  const [adminKeyError, setAdminKeyError] = useState("");
  const [copyrightClickCount, setCopyrightClickCount] = useState(0);

  // Listen for keyboard secret shortcut: Ctrl + Shift + A or Cmd + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsAdminModalOpen(true);
        setAdminKeyInput("");
        setAdminKeyError("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyrightClick = () => {
    setCopyrightClickCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setIsAdminModalOpen(true);
        setAdminKeyInput("");
        setAdminKeyError("");
        return 0; // Reset
      }
      return next;
    });
  };

  const handleAdminKeySubmit = (e: any) => {
    e.preventDefault();
    if (adminKeyInput.trim() === "vanguard777") {
      setIsAdminModalOpen(false);
      setAdminKeyInput("");
      setAdminKeyError("");
      setCurrentTab("admin");
    } else {
      setAdminKeyError("Invalid security credential key. Access Denied.");
    }
  };

  const handleOpenQuoteModal = (commodityId?: string) => {
    if (commodityId) {
      setPreSelectedCommodityId(commodityId);
    } else {
      setPreSelectedCommodityId("cocoa-beans"); // default
    }
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  // Scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentTab]);

  if (currentTab === "admin") {
    return <AdminDashboard onClose={() => setCurrentTab("home")} />;
  }

  return (
    <div className="bg-[#F8F5F0] min-h-screen text-[#1B2E21] flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#F8F5F0]">
      
      {/* Sticky Header and Top Info banner */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
        onSelectProduct={(productId) => {
          setSelectedProductId(productId);
          setCurrentTab("products");
        }}
        onSelectService={(serviceId) => {
          setSelectedServiceId(serviceId);
          setCurrentTab("services");
        }}
      />

      {/* Main Content routing framework */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {currentTab === "home" && (
              <div className="space-y-24 pb-12">
                {/* 1. Hero Section */}
                <Hero onNavigate={setCurrentTab} onOpenQuoteModal={() => handleOpenQuoteModal()} />
                
                {/* 2. Company Introduction */}
                <About showOnlyIntro={true} onNavigate={setCurrentTab} />

                {/* 3. Featured Products Section */}
                <section className="bg-white py-24 border-y border-[#1B2E21]/10">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#132017]/5 pb-8">
                      <div className="space-y-3">
                        <span className="text-[#C5A059] font-mono text-xs font-bold tracking-[0.25em] uppercase block">
                          Premium agricultural export catalogue
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl italic font-light text-[#1B2E21] tracking-tight">
                          Featured <span className="text-[#8BA88E] font-bold not-italic">Commodities</span>
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base max-w-xl font-sans font-light">
                          Independently graded, machine-sorted, and packed under temperature-controlled protocols to prevent shipping cycle degradation.
                        </p>
                      </div>

                      <button
                        onClick={() => setCurrentTab("products")}
                        className="px-6 py-3.5 bg-[#F8F5F0] hover:bg-[#1B2E21] hover:text-white text-[#1B2E21] rounded-none text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer border border-[#1B2E21]/20 font-mono"
                      >
                        Explore Complete specs
                        <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
                      </button>
                    </div>

                    {/* Rich 6-crop responsive grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {COMMODITIES.map((crop) => (
                        <div
                          key={crop.id}
                          className="bg-[#F8F5F0] border border-[#1B2E21]/10 rounded-none overflow-hidden flex flex-col justify-between group hover:border-[#C5A059]/40 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          <div>
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#1B2E21]/5">
                              <img
                                src={crop.image}
                                alt={crop.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-4 left-4 bg-[#1B2E21] border border-[#C5A059]/25 px-2.5 py-0.5 rounded-none">
                                <span className="text-[9px] font-mono text-[#C5A059] font-extrabold uppercase tracking-widest">
                                  {crop.category}
                                </span>
                              </div>
                            </div>

                            <div className="p-6 space-y-4">
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-[#C5A059] tracking-wider uppercase font-semibold">
                                  HS CODE: {crop.hsCode}
                                </span>
                                <h3 className="font-serif italic text-lg sm:text-xl font-semibold text-[#1B2E21]">
                                  {crop.name}
                                </h3>
                              </div>

                              <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed font-sans font-light">
                                {crop.tagline}
                              </p>


                            </div>
                          </div>

                          <div className="p-6 pt-0 flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedProductId(crop.id);
                                setCurrentTab("products");
                              }}
                              className="flex-grow text-center py-2.5 bg-transparent hover:bg-[#1B2E21]/5 text-[#1B2E21] text-[10px] font-mono font-bold uppercase tracking-wider rounded-none transition-colors border border-[#1B2E21]/15 cursor-pointer"
                            >
                              Technical Sheet
                            </button>
                            <button
                              onClick={() => handleOpenQuoteModal(crop.id)}
                              className="px-5 py-2.5 bg-[#1B2E21] hover:bg-[#C5A059] text-white hover:text-[#1B2E21] rounded-none text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border-none"
                            >
                              Quote
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 4. Why Choose Us Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                  <div className="text-center max-w-3xl mx-auto space-y-4">
                    <span className="text-[#C5A059] font-mono text-xs font-semibold uppercase tracking-widest block">
                      Guaranteed Marine Safe Operations
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl italic font-light text-[#1B2E21] tracking-tight">
                      Why <span className="text-[#8BA88E] font-bold not-italic">Choose Us</span>
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base font-sans font-light leading-relaxed">
                      We optimize variables in West African maritime commerce, ensuring safe freight execution, honest grading, and absolute transparency from farm cluster to discharge port.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-white border border-[#1B2E21]/10 p-6 space-y-4 shadow-sm hover:border-[#C5A059]/40 transition-all rounded-none"
                    >
                      <div className="w-12 h-12 rounded-none bg-[#1B2E21]/5 flex items-center justify-center text-[#C5A059]">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif italic font-semibold text-[#1B2E21] text-lg">Export Expertise</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans font-light">
                        Over a decade coordinating complex customs clearance, legal cargo brokerage, and shipping manifests to secure seamless ocean freight voyages.
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-white border border-[#1B2E21]/10 p-6 space-y-4 shadow-sm hover:border-[#C5A059]/40 transition-all rounded-none"
                    >
                      <div className="w-12 h-12 rounded-none bg-[#1B2E21]/5 flex items-center justify-center text-[#C5A059]">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif italic font-semibold text-[#1B2E21] text-lg">Certified Quality</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans font-light">
                        Every single container undergoes strict pre-shipment sampling, laboratory purity validation, and SGS/Bureau Veritas moisture certification.
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-white border border-[#1B2E21]/10 p-6 space-y-4 shadow-sm hover:border-[#C5A059]/40 transition-all rounded-none"
                    >
                      <div className="w-12 h-12 rounded-none bg-[#1B2E21]/5 flex items-center justify-center text-[#C5A059]">
                        <Ship className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif italic font-semibold text-[#1B2E21] text-lg">Global Logistics</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans font-light">
                        Strategic operations at Apapa and Onne ports enabling rapid shipping container bookings to factories across Asia, Europe, and GCC markets.
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-white border border-[#1B2E21]/10 p-6 space-y-4 shadow-sm hover:border-[#C5A059]/40 transition-all rounded-none"
                    >
                      <div className="w-12 h-12 rounded-none bg-[#1B2E21]/5 flex items-center justify-center text-[#C5A059]">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif italic font-semibold text-[#1B2E21] text-lg">Sustainable Sourcing</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans font-light">
                        Direct outgrower programs supplying premium seeds and dry-season agricultural support to over 15,000 family farm clusters in rural Nigeria.
                      </p>
                    </motion.div>
                  </div>
                </section>

                {/* 5. Statistics Section */}
                <section className="bg-[#1B2E21] text-white py-14 relative overflow-hidden border-y border-[#C5A059]/25">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08),transparent_70%)]" />
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                      {STATS.map((stat) => (
                        <div key={stat.id} className="space-y-1">
                          <span className="block text-3xl sm:text-5xl font-serif font-light text-[#C5A059]">
                            {stat.value}
                          </span>
                          <span className="block text-[10px] sm:text-xs font-mono text-gray-300 uppercase tracking-widest leading-none">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 6. Certifications Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[#C5A059] font-mono text-xs font-semibold uppercase tracking-widest block">
                      Licensed regulatory compliance
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl italic font-light text-[#1B2E21] tracking-tight">
                      Accredited <span className="text-[#8BA88E] font-bold not-italic">Certifications</span>
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm font-sans font-light">
                      Frictionless clearance across sovereign customs check-points. We conform to international health, phytosanitary, and legal trade rules.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CERTIFICATIONS.map((cert) => (
                      <div
                        key={cert.id}
                        className="bg-white border border-[#1B2E21]/10 p-6 flex flex-col justify-between space-y-6 hover:border-[#C5A059]/40 transition-all rounded-none"
                      >
                        <div className="space-y-3">
                          <div className="w-10 h-10 rounded-none bg-[#1B2E21]/5 flex items-center justify-center text-[#8BA88E]">
                            <Award className="w-5 h-5 text-[#C5A059]" />
                          </div>
                          <h3 className="font-serif italic font-semibold text-base text-[#1B2E21] leading-tight">
                            {cert.name}
                          </h3>
                          <p className="text-gray-600 text-xs leading-relaxed font-sans font-light">
                            {cert.description}
                          </p>
                        </div>
                        <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest border-t border-black/5 pt-3">
                          Issuer: {cert.issuer}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>



                {/* 8. Contact CTA Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-[#1B2E21] border border-[#C5A059]/25 p-8 sm:p-12 md:p-16 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 rounded-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(197,160,89,0.1),transparent_55%)]" />
                    
                    <div className="space-y-4 relative z-10 max-w-2xl text-center md:text-left">
                      <span className="text-[#C5A059] font-mono text-xs font-bold tracking-[0.2em] uppercase block">
                        Trade desk allocation window open
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl italic font-light text-white tracking-tight leading-none">
                        Secure Your Premium Cargo Allocation
                      </h2>
                      <p className="text-gray-300 text-xs sm:text-sm font-sans font-light leading-relaxed">
                        Work with Nigeria’s most meticulous agricultural exporter. Contact our trading office directly to verify spot cargo availability, examine specifications sheets, or establish long-term shipping contracts.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto shrink-0 justify-center">
                      <button
                        onClick={() => handleOpenQuoteModal()}
                        className="px-8 py-4 bg-[#C5A059] hover:bg-[#b5924f] text-[#1B2E21] font-sans text-xs font-bold uppercase tracking-widest rounded-none shadow-xl transition-all hover:scale-[1.03] active:scale-95 text-center cursor-pointer border-none"
                      >
                        Request a Quote
                      </button>

                      <a
                        href="https://api.whatsapp.com/send?phone=2348202010&text=Hello%20Lakeduck%20Integrated%20Desk%2C%20I%20would%20like%2520to%20inquire%20about%20agricultural%20and%20recycled%20commodities."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border border-white text-white hover:bg-white hover:text-[#1B2E21] font-sans text-xs font-bold uppercase tracking-widest rounded-none transition-all hover:scale-[1.03] active:scale-95 text-center inline-flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4 fill-current text-white hover:text-[#1B2E21]" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {currentTab === "about" && <About />}
            {currentTab === "products" && (
              <Products 
                onOpenQuoteModal={handleOpenQuoteModal} 
                initialProductId={selectedProductId}
                onClearInitialProduct={() => setSelectedProductId(null)}
              />
            )}
            {currentTab === "services" && (
              <Services 
                initialServiceId={selectedServiceId}
                onClearInitialService={() => setSelectedServiceId(null)}
                onOpenQuoteModal={handleOpenQuoteModal}
              />
            )}
            {currentTab === "projects" && <Projects />}
            {currentTab === "blog" && <Blog />}
            {currentTab === "contact" && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global persistent Footer widget */}
      <Footer 
        onNavigate={setCurrentTab} 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
        onAdminTrigger={handleCopyrightClick}
        onSelectProduct={(productId) => {
          setSelectedProductId(productId);
          setCurrentTab("products");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* WhatsApp active messaging floating bubble desk */}
      <WhatsAppButton />

      {/* Global Interactive Quotation modal backdrop */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#F8F5F0] rounded-none max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh] border border-[#C5A059]/20"
            >
              {/* Header */}
              <div className="bg-[#1B2E21] p-6 text-white flex justify-between items-start border-b border-[#C5A059]/15">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] bg-[#C5A059]/25 border border-[#C5A059]/35 px-2.5 py-0.5 rounded-none text-[#C5A059] font-bold uppercase tracking-widest inline-block">
                    Lakeduck Trading Desk
                  </span>
                  <h3 className="font-serif italic font-semibold text-xl sm:text-2xl text-white">Configure Marine Quote</h3>
                  <p className="text-xs text-[#C5A059] font-mono font-bold uppercase tracking-wide">Accepting Letters of Credit (L/C) at sight</p>
                </div>
                <button
                  id="quote-modal-close-button"
                  onClick={handleCloseQuoteModal}
                  className="p-1.5 rounded-none bg-black/15 hover:bg-black/30 text-[#C5A059] cursor-pointer border-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable form */}
              <div className="p-6 overflow-y-auto bg-[#F8F5F0]">
                <Contact 
                  initialCommodityId={preSelectedCommodityId} 
                  onCloseModal={handleCloseQuoteModal}
                  isModalMode={true} 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Secret Admin Passcode Modal Gateway */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#F8F5F0] border border-[#C5A059]/30 rounded-none max-w-md w-full p-6 text-[#1B2E21] shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-none hover:bg-black/5 text-gray-500 hover:text-black cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#1B2E21] text-[#C5A059] flex items-center justify-center font-bold text-xl mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif italic text-xl font-bold text-[#1B2E21]">Administrative Key Verification</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  Operational Sourcing Terminal Protocol
                </p>
              </div>

              <form onSubmit={handleAdminKeySubmit} className="space-y-4">
                {adminKeyError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 text-xs font-mono rounded-none">
                    {adminKeyError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-500 font-bold">
                    Executive Sourcing Passcode
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={adminKeyInput}
                    onChange={(e) => setAdminKeyInput(e.target.value)}
                    className="w-full bg-white border border-gray-200 focus:border-[#C5A059] p-3 rounded-none focus:outline-none font-mono text-center text-lg tracking-widest text-[#1B2E21]"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1B2E21] hover:bg-[#C5A059] text-white hover:text-[#1B2E21] font-mono text-xs font-bold uppercase tracking-widest cursor-pointer rounded-none transition-all flex items-center justify-center gap-2 border-none"
                >
                  Verify Access Key
                </button>
              </form>

              <p className="text-[10px] text-gray-400 text-center font-mono leading-relaxed max-w-xs mx-auto">
                Secure connection will be closed immediately upon failed attempts.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
