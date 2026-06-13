/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, Trash2, 
  HelpCircle, FileText, Globe, Ship, MessageSquare, ArrowRight,
  ExternalLink, Bell, Check, Sparkles, Smartphone, AlertCircle
} from "lucide-react";
import { COMMODITIES } from "../data";
import { QuoteRequest } from "../types";
import { AppDatabase } from "../lib/db";

interface ContactProps {
  initialCommodityId?: string;
  onCloseModal?: () => void;
  isModalMode?: boolean;
}

export default function Contact({ initialCommodityId = "", onCloseModal, isModalMode = false }: ContactProps) {
  // Tabs: "quote" for Request Quote Form, "general" for Contact Form
  const [activeForm, setActiveForm] = useState<"quote" | "general">("quote");
  
  // Interactive office selection for dynamic Google Maps loading
  const [selectedOffice, setSelectedOffice] = useState<"lagos" | "abuja">("lagos");

  // Quote form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [commodityId, setCommodityId] = useState(initialCommodityId || "cocoa-beans");
  const [quantityTons, setQuantityTons] = useState(50);
  const [packagingType, setPackagingType] = useState("Standard Venting Jute");
  const [shippingTerms, setShippingTerms] = useState<"FOB" | "CIF" | "CFR">("FOB");
  const [destinationPort, setDestinationPort] = useState("");
  const [message, setMessage] = useState("");

  // General inquiry states
  const [genName, setGenName] = useState("");
  const [genEmail, setGenEmail] = useState("");
  const [genCompany, setGenCompany] = useState("");
  const [genPhone, setGenPhone] = useState("");
  const [genSubject, setGenSubject] = useState("");
  const [genMsg, setGenMsg] = useState("");

  // Newsletter states
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSuccess, setNewsSuccess] = useState(false);

  // Submission signals
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Email simulation toast track
  const [simulatedEmailSent, setSimulatedEmailSent] = useState<any | null>(null);

  // Loaded inquiries from Supabase/LocalStorage for local CRM view
  const [savedInquiries, setSavedInquiries] = useState<QuoteRequest[]>([]);

  useEffect(() => {
    if (initialCommodityId) {
      setCommodityId(initialCommodityId);
    }
  }, [initialCommodityId]);

  const loadInquiries = async () => {
    try {
      const dbData = await AppDatabase.getContactRequests();
      setSavedInquiries(dbData);
    } catch (err) {
      console.error("Failed to sync inquiries repository:", err);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  // Submit Bulk Quote
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !destinationPort) return;
    
    setSubmitting(true);
    
    const quoteId = "VQD-" + Date.now().toString().slice(-6);
    
    const newRequest: QuoteRequest = {
      id: quoteId,
      fullName,
      email,
      companyName: companyName || "N/A",
      phone,
      country: country || "Nigeria",
      commodityId,
      quantityTons,
      packagingType,
      shippingTerms,
      destinationPort,
      message: message || "No special messaging provided.",
      status: "Pending",
      timestamp: new Date().toISOString()
    };

    try {
      // 1. Store in Supabase + local database engine
      await AppDatabase.saveContactRequest(newRequest);
      
      // 2. Dispatch real-time DOM Event for any listening Admin Panel tabs
      window.dispatchEvent(new CustomEvent("new_lead_alert", {
        detail: {
          id: quoteId,
          name: fullName,
          type: "Bulk Quote",
          summary: `${quantityTons} Tons of ${commodityId.replace("-", " ").toUpperCase()} under ${shippingTerms} conditions to ${destinationPort}.`,
          timestamp: new Date().toLocaleTimeString()
        }
      }));

      // 3. Trigger Email Simulation dispatch logs
      setSimulatedEmailSent({
        recipient: "admin@vanguardcommodities.com",
        cc: "global@vanguardcommodities.com",
        sender: email,
        title: `[NEW QUOTE LEAD #${quoteId}] - ${fullName} (${companyName || 'Individual'})`,
        body: `A new bulk import quote request has been saved in the system.\n\nCommodity: ${commodityId}\nVolume: ${quantityTons} Metric Tons\nPackaging: ${packagingType}\nTerms: ${shippingTerms} to ${destinationPort}\n\nPhone: ${phone}\nComments: ${message || 'None'}`
      });

      // Reload lists
      await loadInquiries();
      
      // Reset form variables
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSimulatedEmailSent(null);
        setFullName("");
        setEmail("");
        setCompanyName("");
        setPhone("");
        setCountry("");
        setDestinationPort("");
        setMessage("");
        if (onCloseModal) onCloseModal();
      }, 5000);

    } catch (error) {
      console.error("Error storing quote lead:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Submit General inquiry
  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genName || !genEmail || !genMsg) return;

    setSubmitting(true);
    
    const generalId = "GN-" + Date.now().toString().slice(-6);
    
    // Maps general message safely to standard QuoteRequest schema structure
    const generalLead: QuoteRequest = {
      id: generalId,
      fullName: genName,
      email: genEmail,
      companyName: genCompany || "N/A",
      phone: genPhone || "N/A",
      country: "N/A",
      commodityId: "general", // marks as general
      quantityTons: 0,
      packagingType: "N/A",
      shippingTerms: "FOB", // dummy required
      destinationPort: genSubject || "General Support",
      message: genMsg,
      status: "Pending",
      timestamp: new Date().toISOString()
    };

    try {
      // 1. Store in Supabase / LocalStorage
      await AppDatabase.saveContactRequest(generalLead);

      // 2. Dispatch real-time DOM Event
      window.dispatchEvent(new CustomEvent("new_lead_alert", {
        detail: {
          id: generalId,
          name: genName,
          type: "General Call",
          summary: `Subject: ${genSubject || 'Inquiry'} message: ${genMsg.substring(0, 75)}...`,
          timestamp: new Date().toLocaleTimeString()
        }
      }));

      // 3. Trigger Email Simulation
      setSimulatedEmailSent({
        recipient: "info@vanguardcommodities.com",
        cc: "desk@vanguardcommodities.com",
        sender: genEmail,
        title: `[CONTACT INQUIRY #${generalId}] - ${genName}`,
        body: `An inquiry from a potential trade associate has been logged.\n\nSubject: ${genSubject || 'General Sourcing Enquiry'}\nCompany: ${genCompany || 'Individual'}\nPhone: ${genPhone || 'N/A'}\n\nMessage Detail:\n${genMsg}`
      });

      await loadInquiries();

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSimulatedEmailSent(null);
        setGenName("");
        setGenEmail("");
        setGenCompany("");
        setGenPhone("");
        setGenSubject("");
        setGenMsg("");
        if (onCloseModal) onCloseModal();
      }, 5000);

    } catch (error) {
      console.error("Error storing contact message:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Newsletter submit
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      // Store list
      const subs = JSON.parse(localStorage.getItem("VCD_NEWSLETTER_SUBSCRIBERS") || "[]");
      if (!subs.includes(newsEmail)) {
        subs.push(newsEmail);
        localStorage.setItem("VCD_NEWSLETTER_SUBSCRIBERS", JSON.stringify(subs));
      }
      setNewsSuccess(true);
      setTimeout(() => {
        setNewsEmail("");
        setNewsSuccess(false);
      }, 3500);
    }
  };

  const clearSavedQuotes = async () => {
    if (confirm("Are you sure you want to clear your local user query history? This logs you off the local tracker view but preserves active database records.")) {
      localStorage.removeItem("vanguard_export_quotes");
      localStorage.removeItem("VCD_CONTACTS");
      setSavedInquiries([]);
      await loadInquiries();
    }
  };

  // Dynamic Google Maps locations list mapping 
  const officeLocations = {
    lagos: {
      title: "Lagos Corporate HQ",
      address: "King’s Towers, 9th Floor, Glover Road, Ikoyi, Lagos, Nigeria.",
      phone: "+234 (1) 820-2010",
      email: "corporate@vanguardcommodities.com",
      mapUrl: "https://maps.google.com/maps?q=Kings%20Towers,%20Glover%20Road,%20Ikoyi,%2520Lagos,%2520Nigeria&t=&z=14&ie=UTF8&iwloc=&output=embed"
    },
    abuja: {
      title: "Northern Crop Trade Desk",
      address: "Central Business Area, Grand Plaza Chambers, Abuja, Nigeria.",
      phone: "+234 (9) 554-1022",
      email: "northdesk@vanguardcommodities.com",
      mapUrl: "https://maps.google.com/maps?q=Abuja%20Central%20Business%20District,%20Nigeria&t=&z=14&ie=UTF8&iwloc=&output=embed"
    }
  };

  return (
    <div id="contact-and-leads-system" className={`py-12 ${isModalMode ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20"}`}>
      
      {/* 1. Header (Omitted in clean modal focus state) */}
      {!isModalMode && (
        <div className="space-y-4 border-b border-[#1B2E21]/10 pb-8">
          <span className="text-[#C5A059] font-mono tracking-[0.25em] uppercase text-xs font-bold block mb-1">
            Global Trade Communications and Integration Hub
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#1B2E21] tracking-tight leading-tight">
            Initiate Your <span className="font-bold not-italic text-[#8BA88E]">Import Allocation</span>
          </h2>
          <p className="text-[#1B2E21]/70 text-sm sm:text-base max-w-3xl leading-relaxed font-light font-sans">
            Whether establishing structured trade lines on verified Letters of Credit, requesting Sun-dried Split Ginger purity samples, or looking for general local sourcing channels, our compliance desk is prepared to assist you.
          </p>
        </div>
      )}

      {/* Instant Notification Logs overlay when a submission is simulated */}
      <AnimatePresence>
        {simulatedEmailSent && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-4 right-4 md:left-auto md:right-8 md:w-[450px] bg-white border-2 border-[#C5A059] shadow-2xl z-50 p-5 p-r font-mono text-[11px] text-[#1B2E21] space-y-3"
          >
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2 text-[#8BA88E] font-bold">
              <Bell className="w-4 h-4 text-[#C5A059] animate-bounce" />
              <span>[SYSTEM INTERCEPT] Instant Notification Outbox</span>
            </div>
            <p className="text-gray-500 text-[10px] leading-relaxed">
              *The system has successfully dispatched the following instant notification details to the trade operations queue:*
            </p>
            <div className="bg-gray-50 p-3 space-y-1.5 border border-gray-200">
              <div><span className="text-gray-400">SMTP Server:</span> secure-relay.vax-internal</div>
              <div><span className="text-gray-400">Recipient:</span> {simulatedEmailSent.recipient}</div>
              <div><span className="text-gray-400">CC Alert:</span> {simulatedEmailSent.cc}</div>
              <div><span className="text-gray-400">Reply-To:</span> {simulatedEmailSent.sender}</div>
              <div className="font-semibold text-gray-800 pt-1">Subject: {simulatedEmailSent.title}</div>
            </div>
            <div className="text-[10px] text-[#C5A059] text-right font-sans font-semibold">
              Live database records synchronized successfully.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Structured Multi-Column Grid */}
      <div className={`grid grid-cols-1 ${isModalMode ? "" : "lg:grid-cols-12 gap-12"}`}>
        
        {/* Left Side Section: Interactive Lead Acquisition Cards (8 columns in full page mode) */}
        <div className={`${isModalMode ? "col-span-full" : "lg:col-span-8"} space-y-6`}>
          
          {success ? (
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#1B2E21] border-2 border-[#C5A059] text-white p-8 space-y-4 shadow-xl font-sans"
            >
              <CheckCircle2 className="w-12 h-12 text-[#C5A059]" />
              <div className="space-y-2">
                <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-white">Consignment Docket Logged</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                  Thank you! Your inquiries have been securely saved and dispatched. An active freight supervisor has been notified automatically via internal email alerts. We verify laboratory parameters (KOR count, moisture thresholds) and prepare cargo allocations inside 12 hours.
                </p>
              </div>
              <div className="pt-2 border-t border-white/10 font-mono text-[10px] text-[#C5A059] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Instant alert and DB entry logged to Supabase standard table container.</span>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white border border-[#1B2E21]/15 p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Form Switching Tabs Selector */}
              <div className="flex flex-wrap border-b border-[#1B2E21]/10 pb-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveForm("quote")}
                  className={`px-4 py-2.5 text-[10px] font-mono font-extrabold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                    activeForm === "quote"
                      ? "bg-[#1B2E21] text-white"
                      : "text-gray-400 hover:text-[#1B2E21] hover:bg-[#1B2E21]/5"
                  }`}
                >
                  Bulk Import Quote Form (EXPORTER SLA)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveForm("general")}
                  className={`px-4 py-2.5 text-[10px] font-mono font-extrabold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                    activeForm === "general"
                      ? "bg-[#1B2E21] text-white"
                      : "text-gray-400 hover:text-[#1B2E21] hover:bg-[#1B2E21]/5"
                  }`}
                >
                  General Contact Form
                </button>
              </div>

              {/* ACTION A: BULK EXPORT QUOTE REQUEST FORM */}
              {activeForm === "quote" && (
                <form onSubmit={handleQuoteSubmit} className="space-y-6 font-sans">
                  
                  <div className="bg-[#FAF8F5] border border-[#1B2E21]/5 p-4 rounded-none space-y-2">
                    <span className="text-[10px] font-mono text-[#C5A059] uppercase font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Exporter Verification Service
                    </span>
                    <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                      Commodities are sun-dried, cleaned, magnetic-separated, and stored under strict cargo regulations in our warehouses at Lagos and Kano.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Contact Person Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Annika Meyer"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                      />
                    </div>

                    {/* Business Email */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. procurement@pharmagmbh.de"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Registered Company</label>
                      <input
                        type="text"
                        placeholder="e.g. Hanseatic Spiceimport GmbH"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Business Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +49 40 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                      />
                    </div>

                    {/* Destination Country */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Buyer Country *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Germany"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                      />
                    </div>

                    {/* Target raw commodity */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Commodity Type *</label>
                      <select
                        value={commodityId}
                        onChange={(e) => setCommodityId(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white cursor-pointer"
                      >
                        {COMMODITIES.map((crop) => (
                          <option key={crop.id} value={crop.id}>
                            {crop.name} ({crop.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Cargo Tonnage Size */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Required Volume (Tons) *</label>
                        <span className="text-[#C5A059] font-mono text-xs font-bold">{quantityTons} MT</span>
                      </div>
                      <input
                        type="number"
                        min="10"
                        max="20000"
                        required
                        value={quantityTons}
                        onChange={(e) => setQuantityTons(Number(e.target.value))}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                      />
                    </div>

                    {/* Bagging Style */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Sealed Packaging Bags</label>
                      <select
                        value={packagingType}
                        onChange={(e) => setPackagingType(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white cursor-pointer"
                      >
                        <option value="64kg Jute Bags">64kg hydrocarbon-free Jute bags (Cocoa bean spec)</option>
                        <option value="50kg PP heavy weave">50kg woven multi-ply PP sacks (Sesame seed spec)</option>
                        <option value="40kg mesh venting">40kg open mesh split sacks (Split Ginger spec)</option>
                        <option value="80kg coarse venting Jute">80kg coarse-mesh venting Jute sacks (Raw Cashew RCN spec)</option>
                        <option value="Custom bulk big bags">1000kg bulk shipping big bags</option>
                      </select>
                    </div>

                    {/* Ocean trade shipping conditions */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Ocean Incoterm Condition *</label>
                      <select
                        value={shippingTerms}
                        onChange={(e) => setShippingTerms(e.target.value as any)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white cursor-pointer"
                      >
                        <option value="FOB">FOB On Board Vessel (Lagos Apapa / Port of Onne)</option>
                        <option value="CIF">CIF (Cost, Maritime Insurance & Ocean Freight Included)</option>
                        <option value="CFR">CFR (Cost & Ocean Freight only, Buyer arranges Insurance)</option>
                      </select>
                    </div>

                    {/* Ocean port of delivery */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Discharging Port *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Port of Rotterdam, Hamburg or Port of Tokyo"
                        value={destinationPort}
                        onChange={(e) => setDestinationPort(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                      />
                    </div>

                  </div>

                  {/* Specifications text */}
                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Cargo Specifications & SGS Lab Mandates</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Input requested moisture levels (e.g. cocoa < 7.5%, cashew RCN < 8%), admixture margins (e.g. sesame < 0.5%), preferred shipment month, target L/C terms, or pre-shipping laboratory sampling requirements."
                      className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-6 py-4 bg-[#1B2E21] hover:bg-[#C5A059] text-white text-[11px] font-mono font-extrabold tracking-widest uppercase cursor-pointer disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Synchronizing lead queue...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        Submit Allocation Request
                      </>
                    )}
                  </button>

                </form>
              )}

              {/* ACTION B: GENERAL INQUIRY CONTACT FORM */}
              {activeForm === "general" && (
                <form onSubmit={handleGeneralSubmit} className="space-y-6 font-sans">
                  
                  <div className="bg-[#FAF8F5] border border-[#1B2E21]/5 p-4 rounded-none space-y-1">
                    <span className="text-[10px] font-mono text-[#8BA88E] uppercase font-bold flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> General Bilateral Desk
                    </span>
                    <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                      For corporate partnerships, joint ventures, agricultural research assistance, or smallholder direct supply relations, route your query below.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chinedu Okafor"
                        value={genName}
                        onChange={(e) => setGenName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Email address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. contact@chinedu.org"
                        value={genEmail}
                        onChange={(e) => setGenEmail(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Associated Corporate Unit</label>
                      <input
                        type="text"
                        placeholder="e.g. West African Agritech Co"
                        value={genCompany}
                        onChange={(e) => setGenCompany(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Telephone Liaison</label>
                      <input
                        type="tel"
                        placeholder="e.g. +234 80 5510294"
                        value={genPhone}
                        onChange={(e) => setGenPhone(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                      />
                    </div>

                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Inquiry Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Joint Venture Crop Research or Bulk Packing partnership"
                      value={genSubject}
                      onChange={(e) => setGenSubject(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white"
                    />
                  </div>

                  {/* Message body */}
                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase font-mono font-bold text-[#1B2E21]">Detailed Message Description *</label>
                    <textarea
                      rows={5}
                      required
                      value={genMsg}
                      onChange={(e) => setGenMsg(e.target.value)}
                      placeholder="Please present your communication outline clearly. For bulk supply allocations, refer exclusively to our trade desk SLA quote tab."
                      className="w-full bg-[#FAF8F5] border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none py-2.5 px-3.5 text-xs outline-none text-[#1B2E21] focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-6 py-4 bg-[#1B2E21] hover:bg-[#C5A059] text-white text-[11px] font-mono font-extrabold tracking-widest uppercase cursor-pointer disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Saving contact...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        Dispatch General Message
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          )}

          {/* DYNAMIC GOOGLE MAPS PANEL */}
          {!isModalMode && (
            <div className="bg-white border border-[#1B2E21]/15 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B2E21]/10 pb-4">
                <div>
                  <h3 className="font-serif italic font-semibold text-lg text-[#1B2E21] flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#C5A059]" />
                    Interactive Geographical Desk Map
                  </h3>
                  <p className="text-gray-500 text-xs font-light">
                    Highlight a physical office cluster from the right pane to adjust the global satellite navigation positioning.
                  </p>
                </div>

                {/* Office Select pill widgets */}
                <div className="flex gap-2 font-mono text-[10px]">
                  <button
                    onClick={() => setSelectedOffice("lagos")}
                    className={`px-3 py-1 cursor-pointer font-bold uppercase transition-colors rounded-none border ${
                      selectedOffice === "lagos" 
                        ? "bg-[#1B2E21] text-white border-[#1B2E21]" 
                        : "bg-white text-[#1B2E21] border-gray-200"
                    }`}
                  >
                    Lagos HQ
                  </button>
                  <button
                    onClick={() => setSelectedOffice("abuja")}
                    className={`px-3 py-1 cursor-pointer font-bold uppercase transition-colors rounded-none border ${
                      selectedOffice === "abuja" 
                        ? "bg-[#1B2E21] text-white border-[#1B2E21]" 
                        : "bg-white text-[#1B2E21] border-gray-200"
                    }`}
                  >
                    Abuja Desk
                  </button>
                </div>
              </div>

              {/* Dynamic Google Maps embed Frame */}
              <div className="aspect-[21/9] bg-[#F8F5F0] border border-gray-200 relative overflow-hidden group shadow-sm min-h-[280px]">
                <iframe
                  id="google_maps_iframe"
                  title="Lakeduck Office Google Maps Location"
                  src={officeLocations[selectedOffice].mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Location stats indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-[11px] text-gray-500">
                <div className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-800 uppercase block">Active coordinates:</span>
                    <span className="font-light">{selectedOffice === "lagos" ? "6.4526° N, 3.4475° E" : "9.0579° N, 7.4951° E"}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-4 h-4 text-[#8BA88E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-800 uppercase block">Support phone:</span>
                    <span className="font-light">{officeLocations[selectedOffice].phone}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Side Column Sector: Address Cards, WhatsApp deep-link & Newsletter Signups */}
        {!isModalMode && (
          <div className="lg:col-span-4 space-y-6">
            
            {/* Interactive Location Selectors (Lagos & Abuja Cards) */}
            <div className="space-y-4">
              <h4 className="font-serif italic font-bold text-base text-[#1B2E21]">
                Lakeduck Corporate Offices
              </h4>

              {/* Lagos Cards selector */}
              <button
                type="button"
                onClick={() => setSelectedOffice("lagos")}
                className={`w-full text-left bg-white p-5 border shadow-xs transition-all duration-305 cursor-pointer block border-none ${
                  selectedOffice === "lagos" 
                    ? "border-2 border-[#C5A059] bg-[#FAF8F5] ring-1 ring-[#C5A059]" 
                    : "border-gray-200 hover:border-[#1B2E21]/30"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 font-bold ${
                    selectedOffice === "lagos" ? "bg-[#1B2E21] text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    HQ Container Space
                  </span>
                  {selectedOffice === "lagos" && <Check className="w-4 h-4 text-[#C5A059]" />}
                </div>
                <h4 className="font-serif italic font-semibold text-[#1B2E21] text-base mt-2">Lagos Headquarters</h4>
                <p className="text-[#1B2E21]/70 text-xs mt-1 leading-relaxed font-sans font-light">
                  King’s Towers, 9th Floor, Glover Road, Ikoyi, Lagos, Nigeria.
                </p>
                <div className="flex items-center gap-1.5 mt-2.5 text-[10px] font-mono text-gray-400">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+234 (1) 820-2010</span>
                </div>
              </button>

              {/* Abuja Cards selector */}
              <button
                type="button"
                onClick={() => setSelectedOffice("abuja")}
                className={`w-full text-left bg-white p-5 border shadow-xs transition-all duration-305 cursor-pointer block border-none ${
                  selectedOffice === "abuja" 
                    ? "border-2 border-[#C5A059] bg-[#FAF8F5] ring-1 ring-[#C5A059]" 
                    : "border-gray-200 hover:border-[#1B2E21]/30"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 font-bold ${
                    selectedOffice === "abuja" ? "bg-[#1B2E21] text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    Northern Crop Hub
                  </span>
                  {selectedOffice === "abuja" && <Check className="w-4 h-4 text-[#C5A059]" />}
                </div>
                <h4 className="font-serif italic font-semibold text-[#1B2E21] text-base mt-2">Abuja Crop Sieve Desk</h4>
                <p className="text-[#1B2E21]/70 text-xs mt-1 leading-relaxed font-sans font-light">
                  Central Business District, Grand Plaza Chambers, Abuja, Nigeria.
                </p>
                <div className="flex items-center gap-1.5 mt-2.5 text-[10px] font-mono text-gray-400">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+234 (9) 554-1022</span>
                </div>
              </button>
            </div>

            {/* INTEGRATION WHATSAPP DEEP-LINK CARD */}
            <div className="bg-[#E7F3EF] border border-[#8BA88E]/25 p-5 space-y-4 font-sans">
              <div className="w-8 h-8 bg-[#8BA88E] text-white flex items-center justify-center">
                <Smartphone className="w-4.5 h-4.5" />
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif italic font-semibold text-[#1B2E21] text-sm">Submit via WhatsApp (Beta)</h4>
                <p className="text-gray-500 text-xs leading-relaxed font-light">
                  Establish a dynamic chat room directly with a raw materials logistics coordinator on our team. Secure instant commodity updates on your phone.
                </p>
              </div>

              <a
                href={`https://api.whatsapp.com/send?phone=2348202010&text=${encodeURIComponent("Hello Lakeduck Trade Desk, we are interested in checking stock allocations of agricultural crops and recycled materials.")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-[#1B2E21] hover:bg-[#8BA88E] text-white font-mono text-[10px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-all"
              >
                Launch Whatsapp Agent
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </a>
            </div>

            {/* INTEGRATION NEWSLETTER SIGNUP CARD */}
            <div className="bg-[#1B2E21] text-white p-6 space-y-4 border border-[#C5A059]/15 shadow-md">
              <span className="font-mono text-[9px] bg-white/5 border border-white/10 text-[#C5A059] px-2.5 py-0.5 rounded-none font-bold uppercase tracking-wider">
                Weekly Trade Sifter
              </span>

              <h4 className="font-serif italic font-semibold text-lg text-white">Newsletter Briefing</h4>
              <p className="text-gray-300 text-xs leading-relaxed font-sans font-light">
                Secure real-time FOB pricing matrices, ocean vessel congestions, customs clearance updates, and WTO phytosanitary regulatory amendments in your inbox.
              </p>

              {newsSuccess ? (
                <div className="bg-[#142218] p-4 text-center border border-[#C5A059]/20 text-[#C5A059] space-y-1">
                  <CheckCircle2 className="w-4 h-4 mx-auto text-[#C5A059]" />
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Subscribed!</span>
                  <p className="text-[9px] text-gray-400 font-sans">Corporate email logged inside database.</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSignup} className="space-y-2.5 font-sans">
                  <input
                    type="email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="Enter business email..."
                    className="w-full bg-[#142218] border border-white/10 text-xs text-white focus:outline-none focus:border-[#C5A059] px-3.5 py-2.5 rounded-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#C5A059] hover:bg-[#b5924d] text-[#1B2E21] text-[10px] font-mono font-bold uppercase tracking-widest cursor-pointer border-none"
                  >
                    Subscribe Alerts
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

      </div>

      {/* 3. Personal Submission ledger local container */}
      {!isModalMode && savedInquiries.length > 0 && (
        <section className="bg-[#FAF8F5] border border-[#1B2E21]/15 p-6 sm:p-8 space-y-6 font-sans">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B2E21]/10 pb-4">
            <div className="space-y-0.5">
              <h3 className="font-serif italic font-semibold text-lg text-[#1B2E21] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C5A059]" />
                Live Sourced Lead Ledger
              </h3>
              <p className="text-gray-500 text-xs font-sans font-light">
                Below are active inquiries tracked in this current browser. They reflect both quote dockets and general messaging dockets saved in your CRM.
              </p>
            </div>

            <button
              onClick={clearSavedQuotes}
              className="px-3.5 py-1.5 border border-red-350 text-red-650 hover:bg-red-50 rounded-none text-xs font-semibold tracking-wider font-mono uppercase transition-colors shrink-0 cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
              Clear Screen History
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedInquiries.map((iq) => {
              const matchedCommodity = COMMODITIES.find((c) => c.id === iq.commodityId);
              const isGeneral = iq.commodityId === "general";
              
              return (
                <div key={iq.id} className="bg-white border border-gray-150 p-5 space-y-3 relative overflow-hidden shadow-xs">
                  
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2.5 text-xs font-mono">
                    <span className="text-gray-400 font-bold uppercase">
                      ID: {iq.id}
                    </span>
                    <span className={`px-2 py-0.25 font-bold uppercase text-[9px] ${
                      isGeneral ? "bg-[#E7F3EF] text-emerald-800" : "bg-[#FAF2E5] text-[#1B2E21]"
                    }`}>
                      {isGeneral ? "CONTACT DESK" : "ALLOCATION SLOTS"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400">
                    <div>
                      <span>BUYER ASSOCIATE</span>
                      <p className="font-sans font-bold text-[#1B2E21] mt-0.5">{iq.fullName}</p>
                    </div>
                    <div>
                      <span>{isGeneral ? "SUBJECT" : "COMMODITY TYPE"}</span>
                      <p className="font-sans font-bold text-gray-800 mt-0.5">
                        {isGeneral ? iq.destinationPort : (matchedCommodity?.name || iq.commodityId)}
                      </p>
                    </div>

                    {!isGeneral && (
                      <>
                        <div className="pt-2">
                          <span>TONNAGE VOLUME</span>
                          <p className="font-sans font-bold text-gray-800 mt-0.5">{iq.quantityTons} Metric Tons</p>
                        </div>
                        <div className="pt-2">
                          <span>INCOTERM SPEC</span>
                          <p className="font-sans font-bold text-[#C5A059] mt-0.5 flex items-center gap-1">
                            <Ship className="w-3.5 h-3.5" />
                            {iq.shippingTerms} to {iq.destinationPort}
                          </p>
                        </div>
                      </>
                    )}
                    
                    {isGeneral && (
                      <>
                        <div className="pt-2">
                          <span>COMPANY UNIT</span>
                          <p className="font-sans font-bold text-gray-800 mt-0.5">{iq.companyName}</p>
                        </div>
                        <div className="pt-2">
                          <span>METRIC STATE</span>
                          <p className="font-sans font-semibold text-emerald-700 mt-0.5 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Lead Captured
                          </p>
                        </div>
                      </>
                    )}

                  </div>

                  <div className="bg-gray-50 border border-gray-100 p-3 rounded-none text-[11px] text-gray-500 leading-relaxed font-sans italic">
                    &ldquo;{iq.message}&rdquo;
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 pt-2 border-t border-gray-100">
                    <span>Broker state: Assigning agent...</span>
                    <span>Saved: {new Date(iq.timestamp).toLocaleString()}</span>
                  </div>

                </div>
              );
            })}
          </div>

        </section>
      )}

    </div>
  );
}
