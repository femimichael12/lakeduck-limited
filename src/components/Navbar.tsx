/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, Leaf, Ship, ShieldCheck, HelpCircle, FileCheck, Award, FileText } from "lucide-react";
import { COMMODITIES, SERVICES } from "../data";
import LakeduckLogo from "./Logo";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenQuoteModal: (commodityId?: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab, onOpenQuoteModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"products" | "services" | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", tab: "home" },
    { name: "About Us", tab: "about" },
    { name: "Products", tab: "products", hasDropdown: true },
    { name: "Services", tab: "services", hasDropdown: true },
    { name: "Projects", tab: "projects" },
    { name: "Blog", tab: "blog" },
    { name: "Contact", tab: "contact" },
  ];

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    setIsOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Sticky Main Header */}
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F8F5F0]/95 backdrop-blur-md shadow-md py-3 text-[#1B2E21] border-b border-[#1B2E21]/10"
            : "bg-[#F8F5F0]/85 backdrop-blur-sm text-[#1B2E21] py-4 md:py-5 border-b border-[#1B2E21]/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              id="company-logo-home-button"
              onClick={() => handleTabClick("home")}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <LakeduckLogo className="w-10 h-10 shadow-md" dark={true} />
              <div>
                <span className="block font-display font-black text-lg sm:text-xl tracking-tight leading-none text-[#1B2E21]">
                  LAKEDUCK
                </span>
                <span className="block text-[8px] font-mono tracking-[1.5px] uppercase font-semibold text-[#C5A059]">
                  INTEGRATED LIMITED
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" className="hidden lg:flex items-center gap-1.5">
              {navItems.map((item) => (
                <div
                  key={item.tab}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.hasDropdown) {
                      setActiveDropdown(item.tab as "products" | "services");
                    } else {
                      setActiveDropdown(null);
                    }
                  }}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => {
                      if (!item.hasDropdown) {
                        handleTabClick(item.tab);
                      }
                    }}
                    className={`flex items-center gap-1 px-4 py-2 rounded-md font-sans text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      currentTab === item.tab
                        ? "text-[#C5A059] bg-[#1B2E21]/5 font-bold"
                        : "text-[#1B2E21]/80 hover:text-[#C5A059]"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-70" />}
                  </button>

                  {/* Dropdowns */}
                  <AnimatePresence>
                    {activeDropdown === item.tab && item.tab === "products" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-1 w-80 bg-[#F8F5F0] border border-[#1B2E21]/10 rounded-xl shadow-xl overflow-hidden py-2 text-[#1B2E21] z-50 animate-fade-in"
                      >
                        <div className="px-4 py-1.5 border-b border-[#1B2E21]/5 mb-1.5">
                          <p className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059]">Featured Commodities</p>
                        </div>
                        {COMMODITIES.map((commodity) => (
                          <button
                            key={commodity.id}
                            onClick={() => {
                              handleTabClick("products");
                              // Custom event to scroll to specific commodity
                              setTimeout(() => {
                                const el = document.getElementById(`commodity-${commodity.id}`);
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                              }, 100);
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-[#1B2E21]/5 flex items-start gap-3 transition-colors cursor-pointer group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 group-hover:scale-125 transition-transform" />
                            <div>
                              <p className="text-sm font-medium text-[#1B2E21] group-hover:text-[#C5A059] transition-colors">
                                {commodity.name}
                              </p>
                              <p className="text-xs text-[#1B2E21]/60 line-clamp-1">{commodity.tagline}</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {activeDropdown === item.tab && item.tab === "services" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-1 w-96 bg-[#F8F5F0] border border-[#1B2E21]/10 rounded-xl shadow-xl overflow-hidden py-2 text-[#1B2E21] z-50 animate-fade-in"
                      >
                        <div className="px-4 py-1.5 border-b border-[#1B2E21]/5 mb-1.5">
                          <p className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059]">Our Services & Solutions</p>
                        </div>
                        {SERVICES.map((srv) => (
                          <button
                            key={srv.id}
                            onClick={() => {
                              handleTabClick("services");
                              setTimeout(() => {
                                const el = document.getElementById(`service-${srv.id}`);
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                              }, 100);
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#1B2E21]/5 flex items-start gap-3.5 transition-colors cursor-pointer group"
                          >
                            <div className="w-8 h-8 rounded bg-[#1B2E21] text-[#C5A059] flex items-center justify-center shrink-0 group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                              {srv.iconName === "Leaf" && <Leaf className="w-4 h-4" />}
                              {srv.iconName === "FileCheck" && <FileCheck className="w-4 h-4" />}
                              {srv.iconName === "Ship" && <Ship className="w-4 h-4" />}
                              {srv.iconName === "Briefcase" && <FileText className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#1B2E21] group-hover:text-[#C5A059] transition-colors">
                                {srv.title}
                              </p>
                              <p className="text-xs text-[#1B2E21]/60 line-clamp-2">{srv.shortDescription}</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>



            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-hamburger-button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg cursor-pointer text-[#1B2E21] hover:bg-[#1B2E21]/5"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#F8F5F0] border-t border-[#1B2E21]/10 max-h-[calc(100vh-80px)] overflow-y-auto shadow-2xl z-40 relative text-[#1B2E21]"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                {navItems.map((item) => (
                  <div key={item.tab} className="border-b border-[#1B2E21]/5 pb-2 last:border-none">
                    <button
                      onClick={() => handleTabClick(item.tab)}
                      className={`w-full text-left px-3 py-2 rounded-none font-sans text-base font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                        currentTab === item.tab ? "text-[#C5A059] bg-[#1B2E21]/5 font-bold" : "text-[#1B2E21]/80 hover:bg-[#1B2E21]/5"
                      }`}
                    >
                      <span>{item.name}</span>
                    </button>

                    {/* Submenu lists for products and services on mobile so they load elegantly */}
                    {item.tab === "products" && (
                      <div className="pl-6 mt-1.5 space-y-1.5">
                        {COMMODITIES.map((commodity) => (
                          <button
                            key={commodity.id}
                            onClick={() => {
                              handleTabClick("products");
                              setTimeout(() => {
                                const el = document.getElementById(`commodity-${commodity.id}`);
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                              }, 150);
                            }}
                            className="w-full text-left py-1 text-sm text-[#1B2E21]/60 hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                            {commodity.name}
                          </button>
                        ))}
                      </div>
                    )}

                    {item.tab === "services" && (
                      <div className="pl-6 mt-1.5 space-y-1.5">
                        {SERVICES.map((srv) => (
                          <button
                            key={srv.id}
                            onClick={() => {
                              handleTabClick("services");
                              setTimeout(() => {
                                const el = document.getElementById(`service-${srv.id}`);
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                              }, 150);
                            }}
                            className="w-full text-left py-1 text-sm text-[#1B2E21]/60 hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                            {srv.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Extra Actions */}
                <div className="pt-3 flex flex-col gap-2">
                  <p className="text-center text-xs font-mono text-[#1B2E21]/60">
                    Trade Desk: desk@vanguardcommodities.com
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
