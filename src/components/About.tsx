/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Shield, Award, CheckCircle, Leaf, Milestone, Star, Users, MapPin } from "lucide-react";
import { STATS, CERTIFICATIONS, TESTIMONIALS } from "../data";

interface AboutProps {
  showOnlyIntro?: boolean;
  onNavigate?: (tab: string) => void;
}

const CORE_VALUES = [
  {
    title: "Eco-Agricultural Sourcing",
    description: "Prioritizing non-GMO seeds, organic farming setups, and climate-safe procedures to preserve West African rural soil structures.",
    icon: Leaf
  },
  {
    title: "Absolute Quality Integrity",
    description: "Every shipment complies strictly with moisture, kernel sizing, extraction yield, and chemical thresholds verified by SGS.",
    icon: Shield
  },
  {
    title: "Empowering Rural Farms",
    description: "Over 15,000 smallholder growers earn fair market wages, pre-season equipment financing, and active crop training.",
    icon: Users
  },
  {
    title: "Prompt Sea Dispatch",
    description: "Handling customs, shipping manifests, and vessel coordination optimally to avoid port delays or sea transit spoiling.",
    icon: Milestone
  }
];

const LEADERSHIP_TEAM = [
  {
    name: "Alhaji Yusuf Shehu",
    role: "Founder & Chief Executive Officer",
    speech: "For over two decades, our standard has remained simple: to bridge local farming dedication with international raw material demands safely. Nigeria has some of the richest agricultural lands globally—it is our honour to package that quality correctly for global factories.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    experience: "Founder since 2002 | Commodity Trader"
  },
  {
    name: "Dr. Elizabeth Osondu",
    role: "Head of Global Quality & Standards",
    speech: "Quality isn't evaluated purely at the port of Apapa; it starts right at the farm clusters. We sample crops from Kaduna to Benue, putting them through moisture, fatty-acid, and purity inspection long before sacking.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    experience: "Ex-SGS Laboratory Director | PhD Agronomy"
  },
  {
    name: "Mr. Chinedu Okafor",
    role: "Chief Logistics & Port Operator",
    speech: "Moving thousands of metric tons from hinterlands to ships requires clockwork coordination. We manage our own transport and customs brokers, ensuring your Letters of Credit are loaded on time.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    experience: "15+ Years Handling Port Intricacies"
  }
];

export default function About({ showOnlyIntro = false, onNavigate }: AboutProps) {
  return (
    <div className="space-y-24 py-16">
      
      {/* 1. Company Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="block">
              <span className="text-[#C5A059] font-extrabold tracking-[0.25em] uppercase text-xs block mb-1">
                Harvesting Excellence, Exporting Trust
              </span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#1B2E21] tracking-tight leading-tight">
              Earthy Agricultural Sourcing <span className="font-bold not-italic text-[#8BA88E]">Built For Global Standards</span>
            </h2>

            <p className="text-[#1B2E21]/80 text-base sm:text-lg leading-relaxed font-light">
              Founded at the heart of West Africa’s agricultural trade, Lakeduck Integrated serves as the definitive bridge between diligent smallholder farmers in Nigeria, eco-friendly recycling operators, and premier industrial buyers worldwide. 
            </p>

            <p className="text-[#1B2E21]/75 text-sm sm:text-base leading-relaxed font-light">
              We specialize in organically harvested Cocoa, Shea products, machine-cleaned Sesame, high-strength sun-dried split Ginger, premium Raw Cashews, Soya, and Maize. Additionally, our dedicated recycling division recovers and processes end-of-life tires, post-consumer plastics, and sustainable materials. By maintaining strict quality control and seamless terminal logistics, we eliminate variables and support clean trading circles.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-[#1B2E21]/80 uppercase tracking-widest gap-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C5A059]" />
                SGS Inspected & Verified
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C5A059]" />
                ISO Clean-Room Sacking
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C5A059]" />
                Empowering Communities
              </div>
            </div>

            {onNavigate && (
              <div className="pt-2">
                <button
                  onClick={() => onNavigate("about")}
                  className="px-8 py-4 bg-[#1B2E21] hover:bg-[#C5A059] text-white font-sans text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg inline-flex items-center gap-2 cursor-pointer border-none"
                >
                  LEARN MORE ABOUT US
                  <span>→</span>
                </button>
              </div>
            )}
          </motion.div>

          {/* Right side collage with premium frames */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 w-full relative h-[260px] sm:h-[380px] lg:h-[450px] rounded-none overflow-hidden shadow-2xl border border-[#C5A059]/20"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1200')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E21] via-[#1B2E21]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
                <MapPin className="w-3.5 h-3.5" />
                Benue State, Nigeria
              </span>
              <p className="font-serif italic text-lg text-white">Sesame Harvest Cluster Zone</p>
              <p className="text-xs text-brand-100/80 font-light font-sans">Empowering dry-season farm cooperatives with sustainable agro forestry irrigation lines.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {showOnlyIntro ? null : (
        <>
          {/* 2. Statistics Bar */}
          <section className="bg-white border-y border-[#1B2E21]/10 py-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,rgba(27,46,33,0.15),transparent_60%)] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col justify-center items-center lg:border-r last:border-none border-[#1B2E21]/10 px-4 py-2"
                  >
                    <div className="text-4xl sm:text-5xl font-serif text-[#C5A059] italic font-semibold">
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest mt-2 font-bold text-[#1B2E21]/70 font-mono">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Core Values / Why Choose Us */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-widest block">
                Sustainable Principles
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light italic text-[#1B2E21] tracking-tight leading-tight">
                The Core Ideologies <span className="font-bold not-italic">Driving Our Sourcing</span>
              </h2>
              <p className="text-[#1B2E21]/70 text-sm font-light">
                How we maintain trade efficiency, sustainable environmental care, and pristine product standards for each shipping load.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CORE_VALUES.map((cv, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-[#1B2E21]/10 rounded-none p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#1B2E21]/5 text-[#1B2E21] flex items-center justify-center">
                    <cv.icon className="w-5 h-5 text-[#8BA88E]" />
                  </div>
                  <h3 className="font-serif italic text-lg text-[#1B2E21] font-semibold">{cv.title}</h3>
                  <p className="text-[#1B2E21]/70 text-xs sm:text-sm leading-relaxed font-light">{cv.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4. Executive Leadership Team */}
          <section className="bg-[#1B2E21]/5 py-16 border-y border-[#1B2E21]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-widest block">
                  Institutional Leadership
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light italic text-[#1B2E21] tracking-tight">
                  Governance <span className="font-bold not-italic">Committed to Quality</span>
                </h2>
                <p className="text-[#1B2E21]/70 text-sm font-light">
                  A team with profound domain expertise handling West African export codes and industrial food standards.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {LEADERSHIP_TEAM.map((lead, i) => (
                  <motion.div
                    key={i}
                    className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="p-6 space-y-4">
                      {/* Avatar */}
                      <div className="flex items-center gap-4">
                        <img 
                          src={lead.image} 
                          alt={lead.name} 
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#C5A059]/40"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h3 className="font-serif text-base italic text-[#1B2E21] font-semibold">{lead.name}</h3>
                          <p className="text-xs text-[#C5A059] font-bold tracking-wider uppercase">{lead.role}</p>
                        </div>
                      </div>
                      <p className="text-[#1B2E21]/80 italic text-xs leading-relaxed font-light">
                        &ldquo;{lead.speech}&rdquo;
                      </p>
                    </div>
                    <div className="px-6 py-4 bg-[#F8F5F0] border-t border-[#1B2E21]/10 font-mono text-[11px] text-[#1B2E21]/70">
                      {lead.experience}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Certifications Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
              <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-widest block">
                Verification & Licenses
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light italic text-[#1B2E21] tracking-tight">
                Accreditations <span className="font-bold not-italic">You Can Trust</span>
              </h2>
              <p className="text-[#1B2E21]/70 text-sm font-light">
                We satisfy state regulations and international auditing systems, ensuring frictionless Customs clearance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CERTIFICATIONS.map((cert) => (
                <motion.div
                  key={cert.id}
                  className="bg-white border border-[#1B2E21]/10 rounded-none p-6 hover:border-[#C5A059] transition-colors flex flex-col justify-between"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-[#1B2E21]/5 flex items-center justify-center text-[#8BA88E]">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif italic font-semibold text-[#1B2E21] text-base leading-snug">{cert.name}</h3>
                    <p className="text-xs text-[#1B2E21]/70 leading-relaxed font-light">{cert.description}</p>
                  </div>
                  <div className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider font-bold pt-4">
                    Issued by: {cert.issuer}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 6. Testimonials Section */}
          <section className="bg-[#1B2E21] text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_left_bottom,rgba(197,160,89,0.35),transparent_50%)] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-widest block">
                  International Reviews
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light italic text-white tracking-tight">
                  What Global Buyers <span className="font-bold not-italic">Say About Us</span>
                </h2>
                <p className="text-brand-100/90 text-sm font-light">
                  Honest feedback from grain processors, cocoa grinders, and pharmaceutical manufacturers across Asia, Europe and beyond.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {TESTIMONIALS.map((test, idx) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#233B29] border border-[#C5A059]/15 rounded-none p-6 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Rating stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: test.rating }).map((_, rIdx) => (
                          <Star key={rIdx} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                        ))}
                      </div>
                      <p className="text-brand-100/80 text-xs sm:text-sm leading-relaxed italic font-light">
                        &ldquo;{test.quote}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-[#1B2E21]/60">
                      <div className="w-8 h-8 rounded-full bg-[#1B2E21] flex items-center justify-center font-bold text-xs text-[#C5A059]">
                        {test.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white leading-none">{test.author}</p>
                        <p className="text-xs text-[#C5A059] font-bold tracking-wider mt-1">
                          {test.role}, <span className="text-brand-100 font-normal">{test.company}</span>
                        </p>
                        <p className="text-[10px] font-mono text-brand-200/55 mt-0.5">{test.country}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

    </div>
  );
}
