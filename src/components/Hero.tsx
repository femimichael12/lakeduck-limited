/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe } from "lucide-react";
import cocoaImage from "../assets/images/cocoa_beans_sack_1781379631375.jpg";
import smallholderImage from "../assets/images/smallholder_growers_1781380254740.jpg";
import sortingImage from "../assets/images/sgs_audited_sorting_1781380273472.jpg";

interface HeroProps {
  onNavigate: (tab: string) => void;
  onOpenQuoteModal: () => void;
}

const HERO_SLIDES = [
  {
    image: cocoaImage,
    subtitle: "PREMIUM AGRO-COMMODITIES & BIO-RECYCLING EXPORT",
    description: "Lakeduck Integrated exports Grade 1 Cocoa, Shea products, premium Sesame seeds, raw Cashew Nuts, Soya, Maize, and recycled materials like plastics and end-of-life tires to global manufacturing industries."
  },
  {
    image: smallholderImage,
    subtitle: "RIGID TRACEABILITY & INTEGRITY",
    description: "Partnering hand-in-hand with over 15,000 smallholder growers to provide pre-season seeds, financial aid, and modern agronomical guidelines ensuring superior yield standards."
  },
  {
    image: sortingImage,
    subtitle: "SGS AUDITED PURITY DEVIATION UNDER 0.4%",
    description: "Processing sesame and grains via pneumatic air-separators and gravity destoners to guarantee supreme pure food specs satisfying global quarantine gates."
  }
];

export default function Hero({ onNavigate, onOpenQuoteModal }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-[#132017] overflow-hidden h-screen min-h-[650px] flex items-center">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
          />
        </AnimatePresence>
        {/* Ambient Dark Premium Overlay Grid */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#132017] via-[#132017]/95 to-[#132017]/65 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(197,160,89,0.15),transparent_50%)]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white pt-12">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block"
          >
            <div className="flex items-center gap-2 bg-white/5 border border-[#C5A059]/30 px-3.5 py-1.5 rounded-none">
              <Globe className="w-3.5 h-3.5 text-[#C5A059] animate-spin-slow" />
              <span className="text-[#C5A059] font-mono font-extrabold tracking-[0.25em] text-[10px] uppercase">
                {HERO_SLIDES[currentSlide].subtitle}
              </span>
            </div>
          </motion.div>

          {/* Static requested pristine headline */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight italic tracking-tight leading-[1.08] text-white"
            >
              Connecting <span className="text-[#C5A059] not-italic font-bold">African Excellence</span> to Global Markets
            </motion.h1>
          </div>

          {/* Slide description */}
          <div className="min-h-[60px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed font-sans font-light"
              >
                {HERO_SLIDES[currentSlide].description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Call to Actions - explicitly customized exact buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={onOpenQuoteModal}
              className="px-8 py-4 bg-[#C5A059] hover:bg-[#b5924f] text-[#1B2E21] font-sans text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-xl flex items-center gap-3 cursor-pointer border-none"
            >
              Get Quote
              <span className="text-sm font-semibold">→</span>
            </button>

            <button
              onClick={() => onNavigate("products")}
              className="px-8 py-4 border border-white/40 text-white bg-transparent hover:bg-white hover:text-[#1B2E21] font-sans text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
            >
              Explore Products
            </button>
          </motion.div>

          {/* Trust metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5 max-w-xl"
          >
            <div>
              <span className="block text-xl font-serif italic text-[#C5A059]">SGS & CAC</span>
              <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">Compliant Cargo</span>
            </div>
            <div>
              <span className="block text-xl font-serif italic text-[#C5A059]">100% Trace</span>
              <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">Verified Sourcing</span>
            </div>
            <div>
              <span className="block text-xl font-serif italic text-[#C5A059]">L/C Sight</span>
              <span className="block text-[9px] font-mono text-[#C5A059] uppercase tracking-widest mt-0.5">Secure Despatch</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation bullets */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? "w-6 bg-[#C5A059]" : "bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
