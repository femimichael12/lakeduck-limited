/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, SlidersHorizontal, Scale, Calendar, Landmark, HelpCircle, 
  ArrowUpRight, Check, X, ShieldAlert, ArrowLeft, Download, 
  Send, Globe, Package, Loader, Bookmark, ClipboardCheck, 
  Printer, CheckCircle, FileText, Info, Award, Share2, 
  MapPin, ExternalLink, MessageSquare, Flame, Droplet, ShieldCheck
} from "lucide-react";
import { COMMODITIES } from "../data";
import { Commodity } from "../types";

interface ProductsProps {
  onOpenQuoteModal?: (commodityId: string) => void;
  initialProductId?: string | null;
  onClearInitialProduct?: () => void;
}

export default function Products({ onOpenQuoteModal, initialProductId, onClearInitialProduct }: ProductsProps) {
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Commodity | null>(null);
  
  // Detailed Product Page State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Custom Local Quote Sourcing State
  const [quoteFormData, setQuoteFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    volumeTons: 0,
    shippingTerms: "FOB" as "FOB" | "CIF" | "CFR",
    packagingType: "",
    destinationPort: "",
    message: ""
  });
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteReceipt, setQuoteReceipt] = useState<any | null>(null);

  // Categories list based on our product range
  const categories = ["All", "Cocoa & Coffee", "Grains & Seeds", "Spices", "Nuts", "Solid Minerals", "Recycled Materials"];

  // Filter Commodities
  const filteredCommodities = COMMODITIES.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hsCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle Opening detailed page
  const handleOpenDetailedPage = (product: Commodity) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    setQuoteReceipt(null);
    setQuoteFormData({
      fullName: "",
      email: "",
      companyName: "",
      phone: "",
      volumeTons: parseInt(product.minimumOrder) || 20,
      shippingTerms: "FOB",
      packagingType: product.packagingOptions[0] || product.packaging,
      destinationPort: product.exportDestinations[0] || "",
      message: `Enquiry for ${product.name} standard shipment allocation.`
    });
  };

  // Direct redirection to specifications detail page from external views
  useEffect(() => {
    if (initialProductId) {
      const crop = COMMODITIES.find((item) => item.id === initialProductId);
      if (crop) {
        handleOpenDetailedPage(crop);
        if (onClearInitialProduct) {
          onClearInitialProduct();
        }
      }
    }
  }, [initialProductId]);

  // Printing Brochure
  const handlePrintBrochure = (product: Commodity) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to open the official export technical specification brochure.");
      return;
    }
    
    const specsHtml = product.specs.map(s => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #1B2E21/10; font-weight: 500; color: #1B2E21; font-family: sans-serif; font-size: 13px;">${s.label}</td>
        <td style="padding: 10px; border-bottom: 1px solid #1B2E21/10; text-align: right; font-weight: bold; color: #1B2E21; font-family: monospace; font-size: 13px;">${s.value}</td>
      </tr>
    `).join('');

    const destinationsHtml = product.exportDestinations.map(d => `
      <span style="display: inline-block; background: #eaeee9; color: #1B2E21; padding: 4px 10px; margin: 4px; font-family: monospace; font-size: 11px; border-radius: 2px;">${d}</span>
    `).join('');

    const packagingHtml = product.packagingOptions.map(p => `
      <li style="margin-bottom: 5px; color: #333; font-family: sans-serif; font-size: 13px;">${p}</li>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Lakeduck Commercial Desk - Technical Datasheet - ${product.name}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #121e15;
              line-height: 1.6;
              padding: 45px;
              background: #fff;
            }
            .header-strip {
              border-bottom: 3px double #1B2E21;
              padding-bottom: 24px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .title-area h1 {
              font-size: 26px;
              margin: 0;
              color: #1B2E21;
              font-family: Georgia, serif;
              letter-spacing: -0.5px;
            }
            .title-area p {
              margin: 6px 0 0 0;
              color: #C5A059;
              font-weight: 700;
              font-family: monospace;
              font-size: 12px;
              letter-spacing: 2px;
            }
            .badge-box {
              background: #1B2E21;
              color: #C5A059;
              padding: 10px 18px;
              font-size: 11px;
              font-weight: bold;
              font-family: monospace;
              border: 1px solid #C5A059;
            }
            .watermark-accent {
              background: #F8F5F0;
              padding: 24px;
              border-left: 4px solid #C5A059;
              margin: 30px 0;
            }
            .grid-container {
              display: grid;
              grid-template-cols: 1fr 1fr;
              gap: 25px;
              margin-bottom: 30px;
            }
            .property-container {
              border: 1px solid #e1e9e3;
              padding: 18px;
              background: #fafdfa;
            }
            .property-container h3 {
              margin-top: 0;
              margin-bottom: 12px;
              font-size: 13px;
              color: #C5A059;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              border-bottom: 1px solid #e1e9e3;
              padding-bottom: 4px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 25px 0;
            }
            th {
              background: #1B2E21;
              color: #fff;
              padding: 12px 14px;
              text-align: left;
              font-family: monospace;
              font-size: 12px;
              letter-spacing: 1px;
            }
            .footer-compliance {
              margin-top: 60px;
              border-top: 1px solid #ddd;
              padding-top: 25px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 11px;
              color: #666;
            }
            .approved-stamp {
              border: 2px solid #C5A059;
              color: #C5A059;
              font-weight: bold;
              text-transform: uppercase;
              padding: 8px 18px;
              transform: rotate(-4deg);
              display: inline-block;
              font-family: monospace;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="header-strip">
            <div class="title-area">
              <h1>VANGUARD AGRICULTURAL EXPORTS</h1>
              <p>EXPORT CERTIFIED TECHNICAL DOSSIER — HS: ${product.hsCode}</p>
            </div>
            <div class="badge-box">SGS GLOBAL APPROVED</div>
          </div>
          
          <h2 style="font-family: Georgia, serif; font-weight: normal; font-size: 26px; color: #1B2E21; margin: 30px 0 6px 0;">
            ${product.name} Specifications Sheet
          </h2>
          <p style="font-style: italic; color: #555; margin-top: 0; font-size: 14px;">"${product.tagline}"</p>

          <div class="watermark-accent">
            <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #1B2E21; font-family: monospace;">Commercial Profile</h3>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #222;">${product.detailedDescription}</p>
          </div>

          <div class="grid-container" style="display: block;">
            <div class="property-container">
              <h3>Analytical Benchmarks</h3>
              <p style="margin: 5px 0; font-size: 13px;"><strong>Moisture Index Ceiling:</strong> ${product.moistureContent}</p>
              <p style="margin: 5px 0; font-size: 13px;"><strong>Accredited Purity Ceiling:</strong> ${product.purityLevel}</p>
            </div>
          </div>

          <h3 style="font-family: Georgia, serif; color: #1B2E21; border-bottom: 2px solid #1B2E21; padding-bottom: 5px; margin-top: 35px; font-size: 18px;">
            Certified Laboratory Chemical & Physical Specifications
          </h3>
          <table>
            <thead>
              <tr>
                <th>LABORATORY DIRECTIVE PARAMETER</th>
                <th style="text-align: right;">CERTIFICATION BOUNDS</th>
              </tr>
            </thead>
            <tbody>
              ${specsHtml}
            </tbody>
          </table>

          <div class="grid-container" style="margin-top: 40px;">
            <div>
              <h3 style="font-size: 13px; text-transform: uppercase; color: #1B2E21; margin-bottom: 10px; font-family: monospace; border-bottom: 1px solid #e1e9e3; padding-bottom: 4px;">Standard Sacks Options</h3>
              <ul style="padding-left: 18px; margin: 0;">
                ${packagingHtml}
              </ul>
            </div>
            <div>
              <h3 style="font-size: 13px; text-transform: uppercase; color: #1B2E21; margin-bottom: 10px; font-family: monospace; border-bottom: 1px solid #e1e9e3; padding-bottom: 4px;">Sovereign Export Destinations</h3>
              <div><strong>FOB Seaports:</strong> Apapa, Onne Ports, Nigeria.</div>
              <div style="margin-top: 10px;">
                <strong>Key Discharge Terminals:</strong> <div style="margin-top: 6px;">${destinationsHtml}</div>
              </div>
            </div>
          </div>

          <div class="footer-compliance">
            <div>
              <p style="margin: 0;"><strong>Lakeduck Trading Desk Operations Division</strong></p>
              <p style="margin: 3px 0; color: #888;">Clearance Date: June 12, 2026</p>
              <p style="margin: 3px 0; color: #888;">Clearance Code: VCD-NIG-${product.id.toUpperCase()}-26</p>
            </div>
            <div class="approved-stamp">
              SGS EXPORT PASSED
            </div>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // WhatsApp Sourcing inquiry
  const handleWhatsAppInquiry = (product: Commodity) => {
    const phone = "234808202010"; // Official Lakeduck Commercial Line
    const text = encodeURIComponent(
      `Hello Lakeduck Trading Desk Personnel,\n\n` +
      `We would like to request technical specifications and allocation availability details for:\n` +
      `• Product: ${product.name}\n` +
      `• HS Code: ${product.hsCode}\n` +
      `• Moisture Standard: ${product.moistureContent}\n` +
      `• Target Purity: ${product.purityLevel}\n` +
      `• Default Packaging option requested: ${product.packagingOptions[0]}\n\n` +
      `Please let us know your current FOB spot price and delivery timeline estimates.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, "_blank");
  };

  // Submit local quote request
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteFormData.fullName || !quoteFormData.email || !quoteFormData.companyName) {
      alert("Please provide your name, professional email, and company name.");
      return;
    }

    setQuoteLoading(true);

    // Simulate Trade Desk automated allocation audit
    setTimeout(() => {
      const generatedId = `VQD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setQuoteReceipt({
        quoteId: generatedId,
        date: "2026-06-12",
        assignedDesk: selectedProduct?.category === "Nuts" ? "Premium Nuts & Kernels Desk" : 
                       selectedProduct?.category === "Spices" ? "West African Spices Desk" : 
                       selectedProduct?.category === "Cocoa & Coffee" ? "Beverage Crop Sourcing Desk" : 
                       "Grains & Oilseeds Trading Desk",
        estimatedClearance: "12-18 Business Hours",
        product: selectedProduct?.name,
        hsCode: selectedProduct?.hsCode,
        volume: quoteFormData.volumeTons,
        terms: quoteFormData.shippingTerms,
        port: quoteFormData.destinationPort || "To Be Advised",
        packaging: quoteFormData.packagingType
      });
      setQuoteLoading(false);
    }, 1500);
  };

  return (
    <div className="py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: PRODUCTS TABLE AND GRID LIST */}
        {!selectedProduct ? (
          <motion.div 
            key="list-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-12"
          >
            {/* Page Header */}
            <div className="space-y-4">
              <span className="text-[#C5A059] font-mono text-xs font-bold tracking-[0.25em] uppercase block">
                Standard Grading Portfolio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#1B2E21] tracking-tight leading-tight">
                SGS Grade-A <span className="font-bold not-italic text-[#8BA88E]">Premium Commodities</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-4xl leading-relaxed font-sans font-light">
                Explore our certified agricultural crop selections. Each item is strictly cleaned, double-sifted, and packed under rigorous moisture standards. Click any commodity card to access technical specification sheets, print brochure sheets, calculate draft allocations, or engage our trading desks.
              </p>
            </div>

            {/* Sourcing Stats bar on Catalogue */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#F8F5F0] border border-[#132017]/10 p-6 self-center text-center">
              <div>
                <span className="block text-2xl font-serif text-[#1B2E21] font-semibold">8 Premium</span>
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">Export crops</span>
              </div>
              <div className="border-l border-[#132017]/10">
                <span className="block text-2xl font-serif text-[#C5A059] font-semibold">99.5% Min</span>
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">Purity ceiling</span>
              </div>
              <div className="border-l border-[#132017]/10">
                <span className="block text-2xl font-serif text-[#1B2E21] font-semibold">Under 7.5%</span>
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">Moisture bounds</span>
              </div>
              <div className="border-l border-[#132017]/10">
                <span className="block text-2xl font-serif text-[#8BA88E] font-semibold">Apapa & Onne</span>
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">Authorized FOB exits</span>
              </div>
            </div>

            {/* Search & Filter Component */}
            <div className="bg-[#1B2E21] rounded-none p-4 sm:p-6 text-white grid grid-cols-1 md:grid-cols-12 gap-4 items-center shadow-md border border-[#C5A059]/10">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  id="trade-search-input"
                  type="text"
                  placeholder="Search harvest, seed or code (e.g. Kaduna, HS)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#132017] border border-[#C5A059]/20 focus:border-[#C5A059] rounded-none py-2.5 pl-11 pr-4 text-sm focus:outline-none placeholder-gray-400 transition-colors font-sans text-white focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div className="md:col-span-8 flex flex-wrap gap-2 justify-start md:justify-end">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-none text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                      selectedCategory === cat
                        ? "bg-[#C5A059] text-[#1B2E21] border-[#C5A059]"
                        : "bg-[#1B2E21] hover:bg-[#132017] text-gray-300 border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredCommodities.map((crop) => (
                  <motion.div
                    key={crop.id}
                    id={`commodity-${crop.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white border border-[#1B2E21]/15 rounded-none overflow-hidden flex flex-col justify-between group hover:border-[#C5A059]/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#1B2E21]/5">
                        <img
                          src={crop.image}
                          alt={crop.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-[#1B2E21] border border-[#C5A059]/35 px-2.5 py-0.5 rounded-none z-10">
                          <span className="text-[9px] font-mono text-[#C5A059] font-bold uppercase tracking-widest">
                            {crop.category}
                          </span>
                        </div>
                      </div>

                      {/* Info Content */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-[#C5A059] tracking-wider uppercase font-semibold">
                            HS Code: {crop.hsCode}
                          </span>
                          <h3 className="font-serif italic text-lg sm:text-xl font-semibold text-[#1B2E21]">
                            {crop.name}
                          </h3>
                        </div>

                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed font-sans font-light">
                          {crop.tagline}
                        </p>

                        {/* Specs Highlights */}
                        <div className="bg-[#F8F5F0]/60 p-4 border border-black/5 space-y-2 text-[11px] font-mono">
                          <div className="flex justify-between text-gray-500">
                            <span>Moisture Standard:</span>
                            <span className="text-[#1B2E21] font-bold text-emerald-700">{crop.moistureContent}</span>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>Purity Floor:</span>
                            <span className="text-[#C5A059] font-bold">{crop.purityLevel}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="p-6 pt-0 flex gap-2">
                      <button
                        onClick={() => handleOpenDetailedPage(crop)}
                        className="flex-grow text-center py-2.5 bg-transparent hover:bg-[#1B2E21] hover:text-white text-[#1B2E21] text-[10px] font-mono font-bold uppercase tracking-wider rounded-none transition-colors border border-[#1B2E21]/20 cursor-pointer"
                      >
                        Technical Specs Page
                      </button>
                      <button
                        onClick={() => handleOpenDetailedPage(crop)}
                        className="px-5 py-2.5 bg-[#1B2E21] hover:bg-[#C5A059] text-white hover:text-[#1B2E21] rounded-none text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none"
                      >
                        Allocate
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredCommodities.length === 0 && (
                <div className="col-span-full bg-[#F8F5F0] border border-[#1B2E21]/10 rounded-none p-12 text-center text-gray-500 space-y-3">
                  <ShieldAlert className="w-8 h-8 text-[#C5A059] mx-auto" />
                  <p className="font-serif italic text-lg text-[#1B2E21] font-semibold">No products match your criteria</p>
                  <p className="text-xs text-gray-600 font-light font-sans">Verify your search parameter spelling, or clear filters to look up other agricultural categories.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                    className="px-4 py-2 bg-[#1B2E21] text-white font-mono text-xs uppercase tracking-widest cursor-pointer"
                  >
                    Reset Portfolio Filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          
          /* VIEW 2: COMPREHENSIVE PRODUCT STANDALONE DETAIL WORKSPACE */
          <motion.div
            key="details-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-12"
          >
            {/* Back Button and action menu */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#1B2E21]/10">
              <button
                onClick={() => setSelectedProduct(null)}
                className="inline-flex items-center gap-2 text-[#1B2E21] hover:text-[#C5A059] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
                Back to Agriculture Catalogue
              </button>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handlePrintBrochure(selectedProduct)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-[#1B2E21]/15 text-[#1B2E21] font-mono text-xs font-semibold rounded-none cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
                  Download/Print PDF Brochure
                </button>
                <button
                  onClick={() => handleWhatsAppInquiry(selectedProduct)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-semibold rounded-none cursor-pointer transition-colors border-none"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  WhatsApp Inquiry
                </button>
              </div>
            </div>

            {/* Product Heading */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[9px] bg-[#C5A059]/10 text-[#C5A059] px-2.5 py-0.5 rounded-none font-bold uppercase tracking-wider">
                  SGS Standard Checked
                </span>
                <span className="font-mono text-[9px] bg-[#1B2E21] text-white px-2.5 py-0.5 rounded-none uppercase tracking-wider">
                  HS CODE: {selectedProduct.hsCode}
                </span>
              </div>
              <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-light text-[#1B2E21]">
                {selectedProduct.name}
              </h1>
            </div>

            {/* Layout Grid: Gallery Left, Stats Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Gallery Frame */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-white border border-[#132017]/10 p-2 rounded-none aspect-[4/3] relative overflow-hidden shadow-sm">
                  <motion.img
                    key={activeImageIndex}
                    src={selectedProduct.gallery[activeImageIndex] || selectedProduct.image}
                    alt={`${selectedProduct.name} spec sample`}
                    className="w-full h-full object-cover rounded-none"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                   referrerPolicy="no-referrer"
                  />
                  
                  {/* Image counter helper */}
                  <div className="absolute bottom-4 right-4 bg-[#1B2E21]/80 backdrop-blur-sm border border-[#C5A059]/30 text-white font-mono text-[10px] px-2.5 py-1">
                    Image {activeImageIndex + 1} of {selectedProduct.gallery.length}
                  </div>
                </div>

                {/* Thumbnails rail representation */}
                <div className="grid grid-cols-3 gap-3">
                  {selectedProduct.gallery.map((thumbUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`aspect-[4/3] rounded-none overflow-hidden border-2 cursor-pointer p-0.5 transition-all ${
                        activeImageIndex === idx 
                          ? "border-[#C5A059] bg-white" 
                          : "border-black/5 opacity-60 hover:opacity-100 hover:border-[#1B2E21]/20"
                      }`}
                    >
                      <img src={thumbUrl} alt="gallery thumbnail" className="w-full h-full object-cover"  referrerPolicy="no-referrer"/>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Descriptions & Dynamic specification meters */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Visual spec meters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Moisture dial */}
                  <div className="bg-[#F8F5F0] border border-[#132017]/10 p-5 rounded-none flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold">Moisture Content</span>
                      <span className="block text-2xl font-serif text-[#1B2E21] font-semibold">{selectedProduct.moistureContent}</span>
                      <span className="block text-[10px] text-[#C5A059] font-mono uppercase tracking-wider font-bold">Tested Standard: Maximum</span>
                    </div>
                    <div className="w-10 h-10 rounded-none bg-[#1B2E21]/5 text-[#C5A059] flex items-center justify-center">
                      <Droplet className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Purity meter */}
                  <div className="bg-[#F8F5F0] border border-[#132017]/10 p-5 rounded-none flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold">Purity Level</span>
                      <span className="block text-2xl font-serif text-[#1B2E21] font-semibold">{selectedProduct.purityLevel}</span>
                      <span className="block text-[10px] text-emerald-700 font-mono uppercase tracking-wider font-bold">SGS Approved Grade</span>
                    </div>
                    <div className="w-10 h-10 rounded-none bg-[#1B2E21]/5 text-emerald-700 flex items-center justify-center animate-pulse">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Narrative Profile */}
                <div className="bg-white border border-black/5 p-6 rounded-none space-y-4">
                  <h3 className="font-serif italic text-xl font-bold text-[#1B2E21] border-b border-black/5 pb-2">
                    Sourcing Profile
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans font-light">
                    {selectedProduct.detailedDescription}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-sans font-light italic bg-[#F8F5F0]/50 p-3.5 border-l-2 border-[#C5A059]">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Quick freight descriptors */}
                <div className="bg-[#1B2E21] text-white p-4 text-[10px] font-mono text-center">
                  <div>
                    <span className="text-gray-400 block uppercase">Sack Packaging</span>
                    <span className="text-[#C5A059] block font-semibold mt-1 font-sans text-sm">{selectedProduct.packaging}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Layout Grid: Specifications table left, packaging/quote right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Spec sheet checklist Column */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* SGS specification details */}
                <div className="space-y-4">
                  <span className="text-[#C5A059] font-mono text-xs font-bold tracking-[0.2em] uppercase block">
                    Accredited Laboratory Analysis
                  </span>
                  <h3 className="font-serif italic text-2xl font-light text-[#1B2E21]">
                    Chemical & Physical <span className="font-sans not-italic font-bold text-[#8BA88E]">Specs</span>
                  </h3>
                  
                  <div className="bg-white border border-[#132017]/10 rounded-none overflow-hidden divide-y divide-[#132017]/5 shadow-sm">
                    {selectedProduct.specs.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center px-4 py-3 text-xs sm:text-sm font-mono">
                        <span className="text-gray-500 font-medium">{item.label}</span>
                        <span className="text-[#1B2E21] font-bold text-right pl-2">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packaging detailed info */}
                <div className="bg-[#F8F5F0]/60 border border-[#132017]/10 p-6 space-y-4">
                  <h4 className="font-serif italic text-lg font-semibold text-[#1B2E21] inline-flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#C5A059]" />
                    Standard Sacks & Packaging Options
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProduct.packagingOptions.map((pack, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-sans font-light bg-white p-3 border border-black/5">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{pack}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Export destinations list */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Globe className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold">Verified Discharge Exits</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.exportDestinations.map((dest, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 bg-[#1B2E21]/5 border border-[#1B2E21]/10 text-[#1B2E21] px-3.5 py-1.5 rounded-none font-mono text-[11px] font-bold">
                        <MapPin className="w-3 h-3 text-[#C5A059]" />
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sourcing quotation panel Column */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Form header block */}
                <div className="bg-[#1B2E21] border border-[#C5A059]/25 p-6 sm:p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(197,160,89,0.06),transparent_65%)]" />

                  <AnimatePresence mode="wait">
                    {!quoteReceipt ? (
                      // Submission Form
                      <motion.form 
                        key="quote-form-element"
                        onSubmit={handleQuoteSubmit} 
                        className="space-y-4 relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="space-y-1">
                          <span className="text-[#C5A059] font-mono text-[10px] tracking-wider uppercase font-bold block">
                            Direct allocation request
                          </span>
                          <h4 className="font-serif italic text-xl text-white">
                            Compile Cargo Draft
                          </h4>
                        </div>

                        <div className="space-y-3 text-xs">
                          
                          {/* Full Name */}
                          <div className="space-y-1 text-left">
                            <label className="block text-gray-350 text-[10px] font-mono uppercase">Full Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Jean Laurent"
                              value={quoteFormData.fullName}
                              onChange={(e) => setQuoteFormData({...quoteFormData, fullName: e.target.value})}
                              className="w-full bg-[#132017] border border-white/15 focus:border-[#C5A059] focus:outline-none p-2.5 rounded-none text-white font-sans placeholder-gray-500"
                            />
                          </div>

                          {/* Email */}
                          <div className="space-y-1 text-left">
                            <label className="block text-gray-350 text-[10px] font-mono uppercase">Professional Email</label>
                            <input
                              type="email"
                              required
                              placeholder="e.g. buying@chocolatier.com"
                              value={quoteFormData.email}
                              onChange={(e) => setQuoteFormData({...quoteFormData, email: e.target.value})}
                              className="w-full bg-[#132017] border border-white/15 focus:border-[#C5A059] focus:outline-none p-2.5 rounded-none text-white font-sans placeholder-gray-500"
                            />
                          </div>

                          {/* Company Name */}
                          <div className="space-y-1 text-left">
                            <label className="block text-gray-350 text-[10px] font-mono uppercase">Company Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Aichi Oils Corp"
                              value={quoteFormData.companyName}
                              onChange={(e) => setQuoteFormData({...quoteFormData, companyName: e.target.value})}
                              className="w-full bg-[#132017] border border-white/15 focus:border-[#C5A059] focus:outline-none p-2.5 rounded-none text-white font-sans placeholder-gray-500"
                            />
                          </div>

                          {/* Cargo parameters Grid */}
                          <div className="grid grid-cols-2 gap-2 text-left">
                            <div>
                              <label className="block text-gray-350 text-[10px] font-mono uppercase">Volume Required (MT)</label>
                              <input
                                type="number"
                                required
                                min="10"
                                value={quoteFormData.volumeTons}
                                onChange={(e) => setQuoteFormData({...quoteFormData, volumeTons: parseInt(e.target.value) || 0})}
                                className="w-full bg-[#132017] border border-white/15 focus:border-[#C5A059] focus:outline-none p-2.5 rounded-none text-white font-mono placeholder-gray-500"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-350 text-[10px] font-mono uppercase">Freight Terms</label>
                              <select
                                value={quoteFormData.shippingTerms}
                                onChange={(e) => setQuoteFormData({...quoteFormData, shippingTerms: e.target.value as any})}
                                className="w-full bg-[#132017] border border-white/15 focus:border-[#C5A059] focus:outline-none p-2.5 rounded-none text-white font-mono cursor-pointer"
                              >
                                <option value="FOB">FOB (Port Apapa)</option>
                                <option value="CIF">CIF (Port Destination)</option>
                                <option value="CFR">CFR (Port Destination)</option>
                              </select>
                            </div>
                          </div>

                          {/* Packaging preferred option */}
                          <div className="space-y-1 text-left">
                            <label className="block text-gray-350 text-[10px] font-mono uppercase font-bold">Packaging Select</label>
                            <select
                              value={quoteFormData.packagingType}
                              onChange={(e) => setQuoteFormData({...quoteFormData, packagingType: e.target.value})}
                              className="w-full bg-[#132017] border border-white/15 focus:border-[#C5A059] focus:outline-none p-2.5 rounded-none text-white font-mono cursor-pointer"
                            >
                              {selectedProduct.packagingOptions.map((opt, idx) => (
                                <option key={idx} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>

                          {/* Outward Discharge Target Port */}
                          <div className="space-y-1 text-left">
                            <label className="block text-gray-350 text-[10px] font-mono uppercase">Discharge Port Destination</label>
                            <select
                              value={quoteFormData.destinationPort}
                              onChange={(e) => setQuoteFormData({...quoteFormData, destinationPort: e.target.value})}
                              className="w-full bg-[#132017] border border-white/15 focus:border-[#C5A059] focus:outline-none p-2.5 rounded-none text-white font-mono cursor-pointer"
                            >
                              {selectedProduct.exportDestinations.map((dst, idx) => (
                                <option key={idx} value={dst}>{dst}</option>
                              ))}
                              <option value="Other">Other / Request Sourcing Option</option>
                            </select>
                          </div>

                          {/* Message Remarks */}
                          <div className="space-y-1 text-left">
                            <label className="block text-gray-350 text-[10px] font-mono uppercase">Inquiry Message</label>
                            <textarea
                              rows={2}
                              value={quoteFormData.message}
                              onChange={(e) => setQuoteFormData({...quoteFormData, message: e.target.value})}
                              className="w-full bg-[#132017] border border-white/15 focus:border-[#C5A059] focus:outline-none p-2.5 rounded-none text-white font-sans text-xs placeholder-gray-500"
                            />
                          </div>

                        </div>

                        {/* Submit button */}
                        <button
                          type="submit"
                          disabled={quoteLoading}
                          className="w-full text-center py-3 bg-[#C5A059] hover:bg-[#a98544] text-[#1B2E21] font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer rounded-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-none mt-2"
                        >
                          {quoteLoading ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin text-[#1B2E21]" />
                              Auditing Contract Option...
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              Submit Allocation Quote
                            </>
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      // Interactive Clearance Receipt
                      <motion.div
                        key="quote-receipt-element"
                        className="space-y-4 relative z-10 text-[#F8F5F0]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="text-center pb-2 border-b border-white/15 space-y-2">
                          <CheckCircle className="w-10 h-10 text-[#C5A059] mx-auto animate-bounce" />
                          <h4 className="font-serif italic text-lg leading-none">Draft Allocation Received</h4>
                          <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-wider block">ID: {quoteReceipt.quoteId}</span>
                        </div>

                        <div className="space-y-3.5 text-xs font-mono bg-[#132017] p-4 border border-white/5">
                          <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-gray-400">Desk Assigned:</span>
                            <span className="text-[#C5A059] font-bold text-right">{quoteReceipt.assignedDesk}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-gray-400">Product:</span>
                            <span className="text-white font-bold truncate pl-2">{quoteReceipt.product}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-gray-400">HS Code:</span>
                            <span className="text-white">{quoteReceipt.hsCode}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-gray-400">Target Volume:</span>
                            <span className="text-white font-bold">{quoteReceipt.volume} Metric Tons</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-gray-400">Freight Basis:</span>
                            <span className="text-[#C5A059] font-bold">{quoteReceipt.terms} Terms</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-gray-400">Exit / Dest:</span>
                            <span className="text-white font-sans max-w-[150px] truncate text-right block">{quoteReceipt.port}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Clearance Turnaround:</span>
                            <span className="text-emerald-500 font-bold">{quoteReceipt.estimatedClearance}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-gray-300 font-sans font-light leading-relaxed text-center">
                          A regional sales director with the **{quoteReceipt.assignedDesk}** is analyzing physical reserves around Onne and Apapa warehouse centers. An official corporate proposal matching your parameters will arrive in your professional inbox shortly.
                        </p>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => {
                              setActiveImageIndex(0);
                              setQuoteReceipt(null);
                            }}
                            className="flex-1 text-center py-2.5 bg-white/10 hover:bg-white/15 text-white font-mono text-[10px] uppercase tracking-wider rounded-none cursor-pointer border-none transition-all"
                          >
                            Calculate New
                          </button>
                          <button
                            onClick={() => setSelectedProduct(null)}
                            className="flex-grow text-center py-2.5 bg-[#C5A059] hover:bg-[#a98544] text-[#1B2E21] font-mono text-[10px] uppercase tracking-widest rounded-none cursor-pointer transition-all border-none font-bold"
                          >
                            Close Workspace
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* Secure Trading Policy Banner */}
                <div className="bg-[#F8F5F0] border border-dashed border-[#1B2E21]/20 p-5 space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 text-amber-800 font-bold font-mono">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>Trading Regulations Notice</span>
                  </div>
                  <p className="text-gray-600 font-sans font-light leading-relaxed">
                    Sourcing allocations are allocated relative to physical crop season availability. Spot market prices shift based on London Liffe and ICC futures indexes. All custom contracts require validation of importer licensing, phytosanitary declarations, and standard LC bank guarantee agreements prior to ocean container vessel bookings.
                  </p>
                </div>

              </div>

            </div>

          </motion.div>
        )}
        
      </AnimatePresence>
      
    </div>
  );
}
