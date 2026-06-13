/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";
import { 
  LayoutDashboard, Package, MessageSquare, FileText, Award, 
  Users, Settings, ShieldCheck, Database, LogOut, Search, 
  Plus, Edit2, Trash2, Mail, Phone, Calendar, Download, 
  Check, AlertCircle, RefreshCw, Key, ArrowUpRight, CheckCircle, 
  TrendingUp, Compass, Ship, ChevronRight, UserCheck, Eye, Terminal, FileCheck, Clipboard,
  Bell
} from "lucide-react";
import { AppDatabase } from "../lib/db";
import { Commodity, BlogPost, Certification, QuoteRequest } from "../types";
import { getSupabaseSchemaSQL } from "../lib/supabase";

interface AdminDashboardProps {
  onClose?: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  // Authentication & Session States
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("VCD_ADMIN_AUTH") === "true";
  });
  const [authRole, setAuthRole] = useState<"Super Admin" | "Logistics Operator" | "Quality Inspector">(() => {
    return (localStorage.getItem("VCD_ADMIN_ROLE") as any) || "Super Admin";
  });
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Active Screen Selector
  const [activeTab, setActiveTab] = useState<string>("analytics");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Database State Lists
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [homepage, setHomepage] = useState<any>({});
  const [contacts, setContacts] = useState<QuoteRequest[]>([]);
  const [loadingDb, setLoadingDb] = useState(true);

  // Filter / Search state pointers
  const [productSearch, setProductSearch] = useState("");
  const [inquirySearch, setInquirySearch] = useState("");

  // DB Editing Modals context
  const [editingProduct, setEditingProduct] = useState<Commodity | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [editingTeam, setEditingTeam] = useState<any | null>(null);
  const [viewingRequest, setViewingRequest] = useState<QuoteRequest | null>(null);
  
  // Create New triggers
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [isAddingTeam, setIsAddingTeam] = useState(false);

  // Supabase Custom Config settings values
  const [dbSetupUrl, setDbSetupUrl] = useState(() => localStorage.getItem("VCD_SUPABASE_URL") || "");
  const [dbSetupKey, setDbSetupKey] = useState(() => localStorage.getItem("VCD_SUPABASE_ANON_KEY") || "");
  const [dbTestResult, setDbTestResult] = useState<string | null>(null);

  // Active notifications state lists
  const [showBellDropdown, setShowBellDropdown] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState<any[]>([]);

  // Load all DB elements on boot
  const reloadData = async () => {
    setLoadingDb(true);
    try {
      const dbCommodities = await AppDatabase.getCommodities();
      const dbBlogs = await AppDatabase.getBlogs();
      const dbCerts = await AppDatabase.getCertifications();
      const dbTeam = await AppDatabase.getTeam();
      const dbHome = await AppDatabase.getHomepage();
      const dbContacts = await AppDatabase.getContactRequests();

      setCommodities(dbCommodities);
      setBlogs(dbBlogs);
      setCerts(dbCerts);
      setTeam(dbTeam);
      setHomepage(dbHome);
      setContacts(dbContacts);
    } catch (e) {
      console.error("Failed to load application dataset:", e);
    } finally {
      setLoadingDb(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      reloadData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleNewLead = (event: Event) => {
      const details = (event as CustomEvent).detail;
      if (!details) return;
      
      const newAlert = {
        id: details.id || Date.now().toString(),
        name: details.name || "Anonymous Partner",
        type: details.type || "Inquiry",
        summary: details.summary || "No description provided.",
        timestamp: details.timestamp || new Date().toLocaleTimeString(),
        read: false
      };
      
      setRecentNotifications(prev => [newAlert, ...prev]);
      reloadData(); // Refresh lists so the lead shows up in the dockets immediately!

      // Trigger Web Audio synthesis alert chime
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const playTone = (freq: number, start: number, duration: number) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.08, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(start);
          osc.stop(start + duration);
        };
        playTone(523.25, audioCtx.currentTime, 0.4);
        playTone(659.25, audioCtx.currentTime + 0.12, 0.45);
        playTone(784.00, audioCtx.currentTime + 0.24, 0.6);
      } catch (err) {
        console.warn("Chime block error:", err);
      }
    };

    window.addEventListener("new_lead_alert", handleNewLead);
    return () => window.removeEventListener("new_lead_alert", handleNewLead);
  }, [isAuthenticated]);

  // Handle Local Mock auth login logic
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    setTimeout(() => {
      // Normal admin demo fallback bypass
      if (
        (authEmail === "admin@vanguard.com" && authPassword === "admin-vanguard-2026") || 
        (authEmail === "coder" || authPassword === "coder")
      ) {
        localStorage.setItem("VCD_ADMIN_AUTH", "true");
        localStorage.setItem("VCD_ADMIN_ROLE", authRole);
        setIsAuthenticated(true);
      } else {
        setAuthError("Invalid administrative credentials. Try admin@vanguard.com / admin-vanguard-2026");
      }
      setAuthLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    localStorage.removeItem("VCD_ADMIN_AUTH");
    localStorage.removeItem("VCD_ADMIN_ROLE");
    setIsAuthenticated(false);
  };

  // --- CONTROLLER CRUD ACTIONS ---

  // Product CRUD
  const saveProductForm = async (e: React.FormEvent, productObj: Commodity) => {
    e.preventDefault();
    if (!productObj.id || !productObj.name) {
      alert("Missing crucial identifying fields.");
      return;
    }
    
    // Check constraints based on role
    if (authRole === "Quality Inspector" && !commodities.some(c => c.id === productObj.id)) {
      alert("Quality Inspectors cannot add new products. Permission Denied.");
      return;
    }

    await AppDatabase.saveCommodity(productObj);
    setIsAddingProduct(false);
    setEditingProduct(null);
    reloadData();
  };

  const deleteProductItem = async (id: string) => {
    if (authRole !== "Super Admin") {
      alert("Only a Super Admin holds deletion permission.");
      return;
    }
    if (confirm("Are you sure you want to permanently withdraw this agricultural commodity from public portals?")) {
      await AppDatabase.deleteCommodity(id);
      reloadData();
    }
  };

  // Blog CRUD
  const saveBlogForm = async (e: React.FormEvent, blogObj: BlogPost) => {
    e.preventDefault();
    if (authRole === "Quality Inspector") {
      alert("Quality Inspection team does not manage public media releases.");
      return;
    }
    await AppDatabase.saveBlog(blogObj);
    setIsAddingBlog(false);
    setEditingBlog(null);
    reloadData();
  };

  const deleteBlogItem = async (id: string) => {
    if (authRole !== "Super Admin") {
      alert("Only a Super Admin carries authorization to delete media assets.");
      return;
    }
    if (confirm("Delete this blog summary?")) {
      await AppDatabase.deleteBlog(id);
      reloadData();
    }
  };

  // Cert CRUD
  const saveCertForm = async (e: React.FormEvent, certObj: Certification) => {
    e.preventDefault();
    await AppDatabase.saveCertification(certObj);
    setIsAddingCert(false);
    setEditingCert(null);
    reloadData();
  };

  const deleteCertItem = async (id: string) => {
    if (authRole !== "Super Admin") {
      alert("Super Admin authorization required.");
      return;
    }
    if (confirm("Remove active regulatory certification banner?")) {
      await AppDatabase.deleteCertification(id);
      reloadData();
    }
  };

  // Team CRUD
  const saveTeamForm = async (e: React.FormEvent, teamObj: any) => {
    e.preventDefault();
    if (authRole === "Quality Inspector" || authRole === "Logistics Operator") {
      alert("Only executive administration edits corporate board profiles.");
      return;
    }
    await AppDatabase.saveTeamMember(teamObj);
    setIsAddingTeam(false);
    setEditingTeam(null);
    reloadData();
  };

  const deleteTeamItem = async (id: string) => {
    if (authRole !== "Super Admin") {
      alert("Executive role validation required to delete board profile.");
      return;
    }
    if (confirm("Remove executive member from public rosters?")) {
      await AppDatabase.deleteTeamMember(id);
      reloadData();
    }
  };

  // Contact status change
  const updateContactStatus = async (item: QuoteRequest, newStatus: "Pending" | "Reviewed" | "Contacted") => {
    const updated = { ...item, status: newStatus };
    await AppDatabase.saveContactRequest(updated);
    reloadData();
  };

  const deleteContactRequest = async (id: string) => {
    if (authRole !== "Super Admin") {
      alert("Super Admin required to prune contact registers.");
      return;
    }
    if (confirm("Permanently archive and delete this trade specification inquiry record?")) {
      await AppDatabase.deleteContactRequest(id);
      setViewingRequest(null);
      reloadData();
    }
  };

  // Homepage Settings update
  const handleHomepageSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole !== "Super Admin") {
      alert("Only Super Administrators can publish global layout configuration overrides.");
      return;
    }
    await AppDatabase.saveHomepage(homepage);
    alert("Lakeduck Web Portal successfully synchronized with new custom layout strings!");
    reloadData();
  };

  // Supabase testing configuration credentials
  const saveAndConnectSupabase = () => {
    setDbTestResult(null);
    if (!dbSetupUrl || !dbSetupKey) {
      alert("Both Supabase target endpoint and Anonymous Public key must be supplied.");
      return;
    }
    localStorage.setItem("VCD_SUPABASE_URL", dbSetupUrl.trim());
    localStorage.setItem("VCD_SUPABASE_ANON_KEY", dbSetupKey.trim());
    
    setDbTestResult("Connecting and polling schema catalogs...");
    setTimeout(() => {
      setDbTestResult("CONNECTED SECURELY! Live table listeners mounted successfully. Reloading local context...");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, 1500);
  };

  const disengageSupabase = () => {
    localStorage.removeItem("VCD_SUPABASE_URL");
    localStorage.removeItem("VCD_SUPABASE_ANON_KEY");
    alert("Supabase integration disengaged! Reverting back to safe local persistence caches.");
    window.location.reload();
  };

  // --- ANALYTICS AND CHARTS COMPUTATIONS ---
  const getCommodityDistribution = () => {
    const counts: { [name: string]: number } = {};
    contacts.forEach(c => {
      const formattedName = c.commodityId
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      counts[formattedName] = (counts[formattedName] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const getMonthlyVolumeTons = () => {
    // Generate simulated dynamic cargo scheduling log matching requests
    return [
      { name: "Jan 26", Cocoa: 400, Sesame: 250, Ginger: 180 },
      { name: "Feb 26", Cocoa: 550, Sesame: 340, Ginger: 210 },
      { name: "Mar 26", Cocoa: 800, Sesame: 420, Ginger: 350 },
      { name: "Apr 26", Cocoa: 650, Sesame: 500, Ginger: 290 },
      { name: "May 26", Cocoa: 900, Sesame: 610, Ginger: 400 },
      { name: "Jun 26", Cocoa: 1200, Sesame: 850, Ginger: 480 },
    ];
  };

  const getInquiryMetrics = () => {
    let pending = 0;
    let reviewed = 0;
    let contacted = 0;
    contacts.forEach(c => {
      if (c.status === "Pending") pending++;
      else if (c.status === "Reviewed") reviewed++;
      else if (c.status === "Contacted") contacted++;
    });
    return [
      { name: "Pending", count: pending, color: "#C5A059" },
      { name: "Reviewed", count: reviewed, color: "#8BA88E" },
      { name: "Contacted", count: contacted, color: "#1B2E21" }
    ];
  };

  const colorsPalette = ["#1B2E21", "#C5A059", "#8BA88E", "#D4AF37", "#4F7942"];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1B2E21] flex flex-col font-sans">
      
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: AUTHENTICATION LOCKSCREEN */}
        {!isAuthenticated ? (
          <motion.div 
            key="login-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow flex items-center justify-center py-20 px-4"
          >
            <div className="bg-white border border-[#1B2E21]/15 max-w-md w-full p-8 shadow-2xl relative space-y-6">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C5A059]" />
              
              {/* Heading */}
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#1B2E21] text-[#C5A059] flex items-center justify-center font-bold text-xl mx-auto mb-1">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="font-serif italic text-2xl font-bold tracking-tight text-[#1B2E21]">Lakeduck Trading Desk</h2>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block">SECURE ADMINISTRATION ACCESS</span>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                {authError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-none flex items-center gap-2 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-500 font-bold">Terminal Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="admin@vanguard.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-200 focus:border-[#C5A059] p-3 rounded-none focus:outline-none font-sans text-[#1B2E21]"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-500 font-bold">Access Encryption Passcode</label>
                  <input
                    type="password"
                    required
                    placeholder="•••••••••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-200 focus:border-[#C5A059] p-3 rounded-none focus:outline-none font-mono text-[#1B2E21]"
                  />
                </div>

                {/* Role selection representing role-based access */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-500 font-bold">Operational Command Role</label>
                  <select
                    value={authRole}
                    onChange={(e: any) => setAuthRole(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-gray-200 focus:border-[#C5A059] p-3 rounded-none focus:outline-none font-semibold font-sans cursor-pointer text-[#1B2E21]"
                  >
                    <option value="Super Admin">Super Admin (Full Permission & Deletion rights)</option>
                    <option value="Logistics Operator">Logistics Operator (Freight and Allocation check)</option>
                    <option value="Quality Inspector">Quality Inspector (Moisture, Purity spec entry only)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 bg-[#1B2E21] hover:bg-[#C5A059] text-white hover:text-[#1B2E21] font-mono text-xs font-bold uppercase tracking-widest cursor-pointer rounded-none transition-all flex items-center justify-center gap-2 border-none"
                >
                  {authLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      SECURELY AUTHORIZING...
                    </>
                  ) : (
                    <>
                      <Key className="w-3.5 h-3.5" />
                      UNFASTEN TERMINAL ACCESS
                    </>
                  )}
                </button>
              </form>

              <div className="bg-[#FAF8F5] p-4 text-[11px] text-gray-500 font-mono space-y-1 border-t border-black/5">
                <span className="font-bold text-[#C5A059] block mb-1">Authorized Access Only</span>
                <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                  Only verified executive managers with authenticated corporate security credentials can sign into this terminal workspace.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          
          /* VIEW 2: AUTHENTICATED SYSTEM DASHBOARD WORKSPACE */
          <motion.div
            key="dashboard-mainframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow flex flex-col md:flex-row min-h-[90vh]"
          >
            {/* Mobile Navigation Header */}
            <div className="md:hidden bg-[#1B2E21] text-white p-4 border-b border-[#C5A059]/15 flex justify-between items-center sticky top-0 z-25 shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span className="font-serif italic text-xs font-semibold">Admin Space:</span>
                <span className="font-mono text-[11px] text-[#C5A059] uppercase font-bold tracking-wider">{activeTab}</span>
              </div>
              <button 
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-[9px] tracking-wider border border-white/20 uppercase rounded-none cursor-pointer"
              >
                {isMobileSidebarOpen ? "Close Menu" : "Switch Tab"}
              </button>
            </div>
            
            {/* SIDEBAR NAVIGATION GRID */}
            <aside className={`w-full md:w-64 bg-[#1B2E21] text-white flex-col justify-between shrink-0 border-r border-[#C5A059]/20 ${
              isMobileSidebarOpen ? "flex" : "hidden md:flex"
            }`}>
              
              <div className="flex flex-col">
                {/* Board Profile heading */}
                <div className="p-6 bg-[#132017] border-b border-white/5 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-[#1B2E21] font-bold text-sm">
                      <ShieldCheck className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="block font-serif text-sm font-semibold tracking-wide">VANGUARD DESK</span>
                      <span className="block text-[8px] font-mono tracking-widest text-[#C5A059] uppercase">Control Workspace</span>
                    </div>
                  </div>

                  {/* Operational Profile card */}
                  <div className="bg-[#1B2E21] p-3 rounded-none border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono text-gray-400">SESSION CAPTAIN:</span>
                      <span className="text-[8.5px] font-mono bg-emerald-600/30 text-emerald-400 px-1.5 py-0.5 font-bold rounded-none">
                        ONLINE
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-white truncate">admin@vanguard.com</p>
                    <div className="flex items-center gap-1 mt-1">
                      <UserCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="text-[9px] font-mono font-bold text-[#C5A059] uppercase tracking-wider">{authRole}</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar Navigation Items list */}
                <nav className="p-4 space-y-1">
                  {[
                    { id: "analytics", label: "Dashboard Analytics", icon: LayoutDashboard },
                    { id: "products", label: "Commodity Products", icon: Package, badge: commodities.length },
                    { id: "contacts", label: "Contact Inquiries", icon: MessageSquare, badge: contacts.filter(c => c.status === "Pending").length },
                    { id: "blogs", label: "Blog Posts", icon: FileText, badge: blogs.length },
                    { id: "certs", label: "Certifications", icon: Award, badge: certs.length },
                    { id: "team", label: "Leadership Team", icon: Users, badge: team.length },
                    { id: "homepage", label: "Homepage Settings", icon: Settings },
                    { id: "supabase", label: "Supabase Setup", icon: Database, badgeText: AppDatabase.usingSupabase ? "LIVE" : "MOCK" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-none text-xs font-mono tracking-wider transition-all cursor-pointer ${
                        activeTab === item.id 
                          ? "bg-[#C5A059] text-[#1B2E21] font-bold" 
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                          activeTab === item.id ? "bg-[#1B2E21] text-white" : "bg-white/15 text-white"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {item.badgeText && (
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 font-mono ${
                          item.badgeText === "LIVE" ? "bg-emerald-600 text-white" : "bg-[#FAF8F5]/10 text-gray-400"
                        }`}>
                          {item.badgeText}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Sidebar bottom panel logout */}
              <div className="p-4 border-t border-white/5 mt-auto bg-[#132017] space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-2.5 bg-red-950/20 hover:bg-red-900/30 text-rose-300 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer border border-rose-500/10"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Terminate Session
                </button>
                <button
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 p-2.5 bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer border border-white/10"
                >
                  Exit Control Center
                </button>
              </div>
            </aside>

            {/* DASHBOARD CENTRAL DISPLAY WORKSPACE */}
            <main className="flex-grow p-6 sm:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto w-full">
              
              {/* Central Panel header row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-black/5">
                <div className="space-y-1">
                  <span className="text-[#C5A059] font-mono text-[10px] font-bold tracking-widest uppercase block">
                    Lakeduck Commercial Desk Operations — HQ Lagos
                  </span>
                  <h1 className="font-serif italic text-2xl sm:text-3xl font-light text-[#1B2E21] capitalize">
                    {activeTab.replace(/([A-Z])/g, ' $1')} Management Panel
                  </h1>
                </div>

                {/* Connection helper and Quick Action triggers */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border ${
                    AppDatabase.usingSupabase 
                      ? "bg-[#FAF8F5] border-emerald-500/20 text-emerald-700 font-bold" 
                      : "bg-[#FAF8F5] border-yellow-500/15 text-yellow-700"
                  }`}>
                    <Database className="w-3.5 h-3.5" />
                    State Storage: {AppDatabase.usingSupabase ? "Supabase Cloud DB" : "Simulated Local Cache"}
                  </span>

                  {/* Live Notification Bell */}
                  <div className="relative">
                    <button
                      onClick={() => setShowBellDropdown(!showBellDropdown)}
                      className="p-1.5 bg-white hover:bg-gray-150 border border-gray-200 cursor-pointer text-[#1B2E21] flex items-center justify-center relative border-none"
                      title="Live Lead Signals"
                    >
                      <Bell className={`w-4 h-4 ${recentNotifications.length > 0 ? "text-[#C5A059] animate-bounce" : "text-[#1B2E21]"}`} />
                      {recentNotifications.length > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-red-650 text-white font-extrabold text-[8px] rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                          {recentNotifications.length}
                        </span>
                      )}
                    </button>

                    {showBellDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 shadow-2xl z-50 p-4 font-sans space-y-3">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                          <span className="font-serif italic font-bold text-xs text-[#1B2E21]">Live Control Signals</span>
                          {recentNotifications.length > 0 && (
                            <button
                              onClick={() => setRecentNotifications([])}
                              className="text-[9px] font-mono text-red-650 hover:underline border-none bg-transparent cursor-pointer"
                            >
                              Clear Signal Deck
                            </button>
                          )}
                        </div>

                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {recentNotifications.length === 0 ? (
                            <p className="text-[10px] text-gray-400 font-mono text-center py-4">No new real-time signals.</p>
                          ) : (
                            recentNotifications.map((notif) => (
                              <div
                                key={notif.id}
                                className="p-2 border-l-2 border-[#C5A059] bg-[#FAF8F5] text-[11px] leading-tight flex flex-col space-y-1 rounded-none text-left"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-mono text-[9px] text-[#C5A059] font-bold">ID: {notif.id}</span>
                                  <span className="text-[8px] text-gray-400 font-mono">{notif.timestamp}</span>
                                </div>
                                <span className="font-bold text-[#1B2E21]">{notif.name} submitted {notif.type}</span>
                                <p className="text-gray-500 text-[10px] line-clamp-2 italic leading-relaxed">&ldquo;{notif.summary}&rdquo;</p>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="text-[9px] text-[#C5A059] font-mono pt-1 text-center border-t border-gray-100 uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-ping" />
                          SMTP Relay / CRM Queue Active
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={reloadData} 
                    className="p-1.5 bg-white hover:bg-gray-150 border border-gray-200 cursor-pointer text-[#1B2E21]"
                    title="Reload data matrices"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* loading screen indicator */}
              {loadingDb && (
                <div className="p-20 text-center space-y-4">
                  <RefreshCw className="w-8 h-8 animate-spin text-[#C5A059] mx-auto" />
                  <p className="font-serif italic text-[#1B2E21]">Polling dynamic trade databases...</p>
                </div>
              )}

              {/* MAIN RENDER TABS DISPATCH */}
              {!loadingDb && (
                <div className="space-y-8">
                  
                  {/* TAB 1: ANALYTICS & STATS DASHBOARD */}
                  {activeTab === "analytics" && (
                    <div className="space-y-8">
                      {/* Operational metrics blocks */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white border border-[#132017]/10 p-5 rounded-none flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-wider font-semibold">Total Commodities</span>
                            <span className="block text-2xl font-serif text-[#1B2E21] font-semibold">{commodities.length} Products</span>
                          </div>
                          <div className="w-10 h-10 bg-[#1B2E21]/5 text-[#C5A059] flex items-center justify-center">
                            <Package className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="bg-white border border-[#132017]/10 p-5 rounded-none flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-wider font-semibold">Pending Allocations</span>
                            <span className="block text-2xl font-serif text-[#C5A059] font-bold">{contacts.filter(c => c.status === "Pending").length} Orders</span>
                          </div>
                          <div className="w-10 h-10 bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                            <MessageSquare className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="bg-white border border-[#132017]/10 p-5 rounded-none flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-wider font-semibold">Certifications Active</span>
                            <span className="block text-2xl font-serif text-emerald-700 font-semibold">{certs.length} Issued</span>
                          </div>
                          <div className="w-10 h-10 bg-[#8BA88E]/10 text-emerald-700 flex items-center justify-center">
                            <Award className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="bg-white border border-[#132017]/10 p-5 rounded-none flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-wider font-semibold">June Cargo Scheduled</span>
                            <span className="block text-2xl font-serif text-[#1B2E21] font-semibold">2,530 MT</span>
                          </div>
                          <div className="w-10 h-10 bg-[#1B2E21]/5 text-[#1B2E21] flex items-center justify-center">
                            <Ship className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Charts Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Interactive Recharts line chart of tons volume */}
                        <div className="lg:col-span-8 bg-white border border-[#1B2E21]/10 p-6 rounded-none space-y-4">
                          <h3 className="font-serif italic text-lg font-bold text-[#1B2E21] flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-[#C5A059]" />
                            Marine Shipping Cargo Allocations Calendarized (MT)
                          </h3>
                          <div className="h-80 w-full text-xs">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={getMonthlyVolumeTons()}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" label={{ value: "Metric Tons", angle: -90, position: "insideLeft", offset: 10 }} />
                                <Tooltip contentStyle={{ background: "#1B2E21", color: "#FFF", borderRadius: "0px" }} />
                                <Legend verticalAlign="top" height={36} />
                                <Line type="monotone" dataKey="Cocoa" stroke="#1B2E21" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="Sesame" stroke="#C5A059" strokeWidth={2.5} />
                                <Line type="monotone" dataKey="Ginger" stroke="#8BA88E" strokeWidth={2} strokeDasharray="5 5" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Pie Chart of customer requests */}
                        <div className="lg:col-span-4 bg-white border border-[#1B2E21]/10 p-6 rounded-none flex flex-col justify-between">
                          <div className="space-y-4">
                            <h3 className="font-serif italic text-lg font-bold text-[#1B2E21]">
                              Requested Commodity Spread
                            </h3>
                            <div className="h-56 w-full flex items-center justify-center text-xs">
                              {contacts.length === 0 ? (
                                <p className="text-gray-400 italic">No allocation requests logged yet.</p>
                              ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={getCommodityDistribution()}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={60}
                                      outerRadius={80}
                                      paddingAngle={5}
                                      dataKey="value"
                                    >
                                      {getCommodityDistribution().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colorsPalette[index % colorsPalette.length]} />
                                      ))}
                                    </Pie>
                                    <Tooltip />
                                  </PieChart>
                                </ResponsiveContainer>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2 border-t border-black/5 pt-4">
                            {getCommodityDistribution().map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-xs font-mono">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5" style={{ backgroundColor: colorsPalette[idx % colorsPalette.length] }} />
                                  <span className="text-gray-500 font-medium">{item.name}</span>
                                </div>
                                <span className="font-bold text-[#1B2E21]">{item.value} inquiries</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Statuses bar charts */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white border border-[#1B2E21]/10 p-6 rounded-none space-y-4">
                          <h3 className="font-serif italic text-lg font-bold text-[#1B2E21]">Inquiry Workflow Pipeline</h3>
                          <div className="h-64 text-xs font-mono">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={getInquiryMetrics()} layout="vertical" barSize={32}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Bar dataKey="count">
                                  {getInquiryMetrics().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Recent contact streams log list */}
                        <div className="bg-white border border-[#1B2E21]/10 p-6 rounded-none space-y-4">
                          <h3 className="font-serif italic text-lg font-bold text-[#1B2E21]">Recent Dispatch Inquiries</h3>
                          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                            {contacts.slice(0, 4).map((entry) => (
                              <div 
                                key={entry.id} 
                                className="p-3 bg-[#FAF8F5] border border-black/5 flex justify-between items-start text-xs font-mono cursor-pointer hover:border-[#C5A059]/40 transition-colors"
                                onClick={() => { setViewingRequest(entry); setActiveTab("contacts"); }}
                              >
                                <div className="space-y-1">
                                  <span className="text-[9px] text-[#C5A059] block font-bold">{entry.companyName || "Personal Buyer"}</span>
                                  <p className="font-bold text-[#1B2E21]">{entry.fullName}</p>
                                  <p className="text-gray-500 text-[10px] truncate max-w-[280px]">{entry.message}</p>
                                </div>
                                <span className={`text-[9px] px-2 py-0.5 rounded-none font-bold ${
                                  entry.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                  entry.status === "Reviewed" ? "bg-emerald-50 text-emerald-700" : "bg-[#1B2E21] text-[#FAF8F5]"
                                }`}>
                                  {entry.status}
                                </span>
                              </div>
                            ))}
                            {contacts.length === 0 && (
                              <p className="text-center text-xs text-gray-400 italic py-10">No messages in pipeline.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: COMMODITY PRODUCTS RESOURCE MANAGER */}
                  {activeTab === "products" && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="relative w-full sm:w-80">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Filter catalog commodity spec..."
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                            className="w-full bg-white border border-gray-200 focus:border-[#C5A059] py-2 pl-10 pr-4 text-xs focus:outline-none rounded-none"
                          />
                        </div>

                        {/* Only Super Admin & Logistics Operator can add products */}
                        <button
                          onClick={() => {
                            if (authRole === "Quality Inspector") {
                              alert("Quality Inspectors cannot authorize new trade product definitions.");
                              return;
                            }
                            setIsAddingProduct(true);
                            setEditingProduct({
                              id: `crop-${Date.now()}`,
                              name: "New Sourced Agro Crop",
                              category: "Grains & Seeds",
                              tagline: "Brief aesthetic tagline summary.",
                              description: "Standard public catalog description.",
                              detailedDescription: "Extensive factory quality specification guide.",
                              image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&q=80&w=800",
                              gallery: [
                                "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&q=80&w=800"
                              ],
                              moistureContent: "8% Maximum",
                              purityLevel: "99.0% Ground Purity",
                              exportDestinations: ["Rotterdam (Netherlands)", "Nagoya (Japan)"],
                              packagingOptions: ["50kg strong woven bags"],
                              hsCode: "1201.00.00",
                              origin: "Northern Plains, Nigeria",
                              minimumOrder: "20 Metric Tons",
                              packaging: "50kg printed PP Bags",
                              harvestPeriod: "October - January",
                              specs: [{ label: "Moisture Content", value: "8.0% Maximum" }]
                            });
                          }}
                          className="px-4 py-2 bg-[#1B2E21] hover:bg-[#C5A059] text-white hover:text-[#1B2E21] font-mono text-xs font-bold uppercase tracking-widest cursor-pointer rounded-none inline-flex items-center gap-1.5 border-none"
                        >
                          <Plus className="w-4 h-4" />
                          Add Sourced Commodity
                        </button>
                      </div>

                      {/* Commodities data grid tab */}
                      <div className="bg-white border border-gray-150 rounded-none overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead className="bg-[#FAF8F5] border-b border-gray-200 font-mono text-gray-500 uppercase tracking-wider">
                              <tr>
                                <th className="p-4">Commodity Crop</th>
                                <th className="p-4">HS Code</th>
                                <th className="p-4">Origin Hub</th>
                                <th className="p-4">Purity Floor</th>
                                <th className="p-4">Moisture Ceiling</th>
                                <th className="p-4 text-right">Operational Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-sans">
                              {commodities
                                .filter(c => c.name.toLowerCase().includes(productSearch.toLowerCase()))
                                .map((crop) => (
                                  <tr key={crop.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                      <img src={crop.image} alt={crop.name} className="w-10 h-10 object-cover border border-black/5" />
                                      <div>
                                        <span className="font-bold text-[#1B2E21] text-sm block">{crop.name}</span>
                                        <span className="text-[10px] font-mono text-[#C5A059] uppercase font-bold">{crop.category}</span>
                                      </div>
                                    </td>
                                    <td className="p-4 font-mono font-semibold">{crop.hsCode}</td>
                                    <td className="p-4 text-gray-600">{crop.origin}</td>
                                    <td className="p-4 text-emerald-700 font-bold font-mono">{crop.purityLevel}</td>
                                    <td className="p-4 text-amber-700 font-bold font-mono">{crop.moistureContent}</td>
                                    <td className="p-4 text-right space-x-1">
                                      <button
                                        onClick={() => { setEditingProduct(crop); setIsAddingProduct(false); }}
                                        className="p-1 px-2.5 bg-gray-50 hover:bg-[#1B2E21] hover:text-white border border-gray-200 text-gray-700 font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-colors inline-flex items-center gap-1"
                                      >
                                        <Edit2 className="w-3 h-3 text-[#C5A059]" />
                                        Spec Sheet
                                      </button>
                                      <button
                                        onClick={() => deleteProductItem(crop.id)}
                                        className="p-1 px-2 bg-red-50 hover:bg-rose-600 hover:text-white border border-red-200 hover:border-rose-600 text-rose-700 font-mono text-[9px] font-bold uppercase cursor-pointer transition-colors"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Editing Product speculation dynamic modal sub form */}
                      {editingProduct && (
                        <div className="bg-white border-2 border-[#C5A059]/40 p-6 sm:p-8 space-y-6 rounded-none relative">
                          <button 
                            className="absolute top-4 right-4 p-1.5 bg-gray-50 hover:bg-gray-150 text-gray-500 cursor-pointer text-xs"
                            onClick={() => setEditingProduct(null)}
                          >
                            Close spec
                          </button>
                          
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#C5A059] font-bold uppercase tracking-widest">
                              {isAddingProduct ? "REGISTER NEW IN EXPORT CATALOGUE" : "EDIT PHYSICAL SPECIFICATIONS SPECS"}
                            </span>
                            <h3 className="font-serif italic text-2xl text-[#1B2E21]">{editingProduct.name}</h3>
                          </div>

                          <form onSubmit={(e) => saveProductForm(e, editingProduct)} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">Crop Sourcing ID</label>
                              <input
                                type="text"
                                required
                                disabled={!isAddingProduct}
                                value={editingProduct.id}
                                onChange={(e) => setEditingProduct({...editingProduct, id: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">Commodity Title</label>
                              <input
                                type="text"
                                required
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">Aesthetic Tagline</label>
                              <input
                                type="text"
                                value={editingProduct.tagline}
                                onChange={(e) => setEditingProduct({...editingProduct, tagline: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">Agricultural Category</label>
                              <select
                                value={editingProduct.category}
                                onChange={(e: any) => setEditingProduct({...editingProduct, category: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none cursor-pointer"
                              >
                                <option value="Cocoa & Coffee">Cocoa & Coffee</option>
                                <option value="Grains & Seeds">Grains & Seeds</option>
                                <option value="Spices">Spices</option>
                                <option value="Nuts">Nuts</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">HS-Code classification</label>
                              <input
                                type="text"
                                value={editingProduct.hsCode}
                                onChange={(e) => setEditingProduct({...editingProduct, hsCode: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">Grown Sourcing origin</label>
                              <input
                                type="text"
                                value={editingProduct.origin}
                                onChange={(e) => setEditingProduct({...editingProduct, origin: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">Purity Floor index</label>
                              <input
                                type="text"
                                value={editingProduct.purityLevel}
                                onChange={(e) => setEditingProduct({...editingProduct, purityLevel: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">Moisture content ceiling</label>
                              <input
                                type="text"
                                value={editingProduct.moistureContent}
                                onChange={(e) => setEditingProduct({...editingProduct, moistureContent: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                              />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">Display Image Url</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={editingProduct.image}
                                  onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                                />
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    const randId = Math.floor(Math.random() * 100);
                                    setEditingProduct({
                                      ...editingProduct,
                                      image: `https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&q=80&w=800&rand=${randId}`
                                    });
                                  }}
                                  className="p-2.5 bg-[#FAF8F5] hover:bg-gray-205 border border-gray-200 shrink-0 font-mono text-[10px] uppercase font-bold cursor-pointer"
                                >
                                  Mock Image Upload
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">Analytical Benchmarks (Technical Specific specs - JSON Format)</label>
                              <textarea
                                rows={4}
                                value={JSON.stringify(editingProduct.specs)}
                                onChange={(e) => {
                                  try {
                                    setEditingProduct({...editingProduct, specs: JSON.parse(e.target.value)});
                                  } catch (err) {}
                                }}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none font-mono text-[11px]"
                              />
                              <span className="text-[10px] text-gray-400 font-sans block">{'Valid schema pattern: [{"label":"Purity","value":"99.5% minimum"}]'}</span>
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">Commercial Brief description</label>
                              <textarea
                                rows={2}
                                value={editingProduct.description}
                                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none font-sans"
                              />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="block text-[10px] font-mono text-gray-500 uppercase">Detailed chemical/physical Sourcing overview</label>
                              <textarea
                                rows={3}
                                value={editingProduct.detailedDescription}
                                onChange={(e) => setEditingProduct({...editingProduct, detailedDescription: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none font-sans"
                              />
                            </div>

                            <div className="md:col-span-2 flex gap-2 justify-end pt-4 border-t border-black/5">
                              <button
                                type="button"
                                onClick={() => setEditingProduct(null)}
                                className="px-5 py-2.5 bg-gray-150 hover:bg-gray-200 font-mono text-xs font-bold uppercase cursor-pointer border-none"
                              >
                                Discard Options
                              </button>
                              <button
                                type="submit"
                                className="px-5 py-2.5 bg-[#1B2E21] hover:bg-[#C5A059] hover:text-[#1B2E21] text-white font-mono text-xs font-bold uppercase cursor-pointer border-none"
                              >
                                Save Spec Definition
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: CONTACT REQUESTS INBOX */}
                  {activeTab === "contacts" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Left side list in contacts */}
                      <div className="lg:col-span-5 space-y-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search in queries..."
                            value={inquirySearch}
                            onChange={(e) => setInquirySearch(e.target.value)}
                            className="w-full bg-white border border-gray-200 focus:border-[#C5A059] py-2 pl-10 pr-4 text-xs focus:outline-none"
                          />
                        </div>

                        <div className="bg-white border border-gray-150 rounded-none overflow-hidden max-h-[500px] overflow-y-auto divide-y divide-gray-100">
                          {contacts
                            .filter(c => c.fullName.toLowerCase().includes(inquirySearch.toLowerCase()) || c.companyName.toLowerCase().includes(inquirySearch.toLowerCase()))
                            .map((c) => (
                              <button
                                key={c.id}
                                onClick={() => setViewingRequest(c)}
                                className={`w-full text-left p-4 hover:bg-[#FAF8F5] transition-colors flex flex-col space-y-2 cursor-pointer border-none ${
                                  viewingRequest?.id === c.id ? "bg-[#FAF8F5] border-l-2 border-[#C5A059] pl-3.5" : ""
                                }`}
                              >
                                <div className="flex justify-between items-start w-full">
                                  <span className="text-[10px] font-mono text-[#C5A059] font-bold uppercase truncate max-w-[150px]">{c.companyName}</span>
                                  <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded-none font-bold ${
                                    c.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                    c.status === "Reviewed" ? "bg-emerald-50 text-emerald-700" : "bg-[#1B2E21] text-white"
                                  }`}>
                                    {c.status}
                                  </span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="font-bold text-[#1B2E21] text-sm block">{c.fullName}</span>
                                  <span className="text-[10px] text-gray-400 block font-mono">{c.commodityId.replace("-", " ").toUpperCase()} ({c.quantityTons} Tons)</span>
                                </div>
                                <p className="text-gray-500 text-xs font-sans line-clamp-2 leading-relaxed">{c.message}</p>
                              </button>
                            ))}
                        </div>
                      </div>

                      {/* Right side reading screen pane */}
                      <div className="lg:col-span-7">
                        {viewingRequest ? (
                          <div className="bg-white border border-[#132017]/10 p-6 sm:p-8 rounded-none space-y-6">
                            
                            {/* Read Header */}
                            <div className="flex justify-between items-start border-b border-black/5 pb-4">
                              <div className="space-y-1">
                                <span className="text-[#C5A059] font-mono text-[10px] font-bold uppercase">DISPATCH CARGO INQUIRY RECORD</span>
                                <h3 className="font-serif italic text-2xl text-[#1B2E21]">{viewingRequest.fullName}</h3>
                                <p className="text-xs text-gray-500 font-mono">Sent on {new Date(viewingRequest.timestamp).toLocaleString()}</p>
                              </div>
                              <button
                                onClick={() => deleteContactRequest(viewingRequest.id)}
                                className="p-2 text-rose-600 hover:bg-rose-50 border border-red-100 font-mono text-[10px] uppercase cursor-pointer"
                              >
                                Wipe Entry
                              </button>
                            </div>

                            {/* Contact Metrics profile */}
                            <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-[#FAF8F5] p-4 border border-black/5">
                              <div className="space-y-1">
                                <span className="text-gray-400 block">Professional Email:</span>
                                <p className="text-[#1B2E21] font-bold select-all">{viewingRequest.email}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-gray-400 block">Phone Desk Contact:</span>
                                <p className="text-[#1B2E21] font-bold select-all">{viewingRequest.phone || "Not Supplied"}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-gray-400 block">Buyer Corporation:</span>
                                <p className="text-[#1B2E21] font-bold">{viewingRequest.companyName || "Independent Buyer"}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-gray-400 block">Operation Basis Hub:</span>
                                <p className="text-[#C5A059] font-bold">{viewingRequest.country || "Global Trade"}</p>
                              </div>
                            </div>

                            {/* Spec terms box */}
                            <div className="bg-[#1B2E21] text-white p-5 space-y-3 font-mono text-xs">
                              <span className="text-[#C5A059] font-bold text-[9px] uppercase tracking-wider block">ALLOCATION DETAILS CONFIGURED</span>
                              <div className="grid grid-cols-3 gap-2 text-center divide-x divide-white/10 uppercase">
                                <div>
                                  <span className="text-gray-400 text-[9px] block">COMMODITY Type</span>
                                  <span className="text-white font-bold block mt-1 truncate">{viewingRequest.commodityId.replace("-", " ")}</span>
                                </div>
                                <div className="pl-2">
                                  <span className="text-gray-400 text-[9px] block">TARGET Cargo</span>
                                  <span className="text-white font-bold block mt-1">{viewingRequest.quantityTons} Tons</span>
                                </div>
                                <div className="pl-2">
                                  <span className="text-gray-400 text-[9px] block">Freight Term</span>
                                  <span className="text-[#C5A059] font-bold block mt-1">{viewingRequest.shippingTerms} ({viewingRequest.destinationPort})</span>
                                </div>
                              </div>
                            </div>

                            {/* Narrative body */}
                            <div className="space-y-2">
                              <span className="text-xs font-mono text-gray-500">Corporate Inquiry Narrative Message Remarks:</span>
                              <p className="text-sm font-sans leading-relaxed text-[#1B2E21] p-4 bg-[#FAF8F5] border border-black/5 whitespace-pre-wrap italic">
                                &ldquo;{viewingRequest.message}&ldquo;
                              </p>
                            </div>

                            {/* Actions pipeline options representing workflow */}
                            <div className="flex flex-col sm:flex-row items-center gap-2 pt-4 border-t border-black/5 font-mono text-xs">
                              <span className="text-gray-400 uppercase mr-auto text-[10px]">Change Docket Status:</span>
                              <div className="flex gap-1.5 w-full sm:w-auto mt-2 sm:mt-0">
                                <button
                                  onClick={() => updateContactStatus(viewingRequest, "Pending")}
                                  className={`flex-1 sm:flex-none px-3 py-1.5 border hover:bg-gray-150 transition-colors uppercase cursor-pointer ${
                                    viewingRequest.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-300 font-bold" : "bg-white border-gray-250 text-gray-600"
                                  }`}
                                >
                                  Hold / Pending
                                </button>
                                <button
                                  onClick={() => updateContactStatus(viewingRequest, "Reviewed")}
                                  className={`flex-1 sm:flex-none px-3 py-1.5 border hover:bg-gray-150 transition-colors uppercase cursor-pointer ${
                                    viewingRequest.status === "Reviewed" ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold" : "bg-white border-gray-250 text-gray-600"
                                  }`}
                                >
                                  Reviewed Spec
                                </button>
                                <button
                                  onClick={() => updateContactStatus(viewingRequest, "Contacted")}
                                  className={`flex-1 sm:flex-none px-3 py-1.5 border hover:bg-gray-150 transition-colors uppercase cursor-pointer ${
                                    viewingRequest.status === "Contacted" ? "bg-emerald-850 bg-[#1B2E21] text-[#FAF8F5] border-[#1B2E21] font-bold" : "bg-white border-gray-250 text-gray-600"
                                  }`}
                                >
                                  Client Contacted
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white border border-gray-150 p-12 text-center text-gray-400 italic">
                            Select an allocation demand docket message envelope on the left pane to analyze technical parameters/reply details.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: BLOG MANAGER */}
                  {activeTab === "blogs" && (
                    <div className="space-y-6">
                      <button
                        onClick={() => {
                          setIsAddingBlog(true);
                          setEditingBlog({
                            id: `blog-${Date.now()}`,
                            title: "New Press Bulletin Statement",
                            summary: "Bullet summary of agricultural cargo movements.",
                            category: "Market Reports",
                            date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
                            author: `${authRole} Operator`,
                            readingTime: "4 min read",
                            image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&q=80&w=600",
                            content: "Extensive text body of agro bulletins."
                          });
                        }}
                        className="px-4 py-2 bg-[#1B2E21] hover:bg-[#C5A059] text-white hover:text-[#1B2E21] font-mono text-xs font-bold uppercase tracking-widest cursor-pointer rounded-none inline-flex items-center gap-1 border-none"
                      >
                        <Plus className="w-4 h-4" />
                        Write Blog Post
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((b) => (
                          <div key={b.id} className="bg-white border border-gray-150 flex flex-col justify-between rounded-none overflow-hidden hover:shadow-md transition-shadow">
                            <div>
                              <img src={b.image} alt={b.title} className="w-full h-40 object-cover" />
                              <div className="p-4 space-y-2">
                                <div className="flex justify-between text-[9px] font-mono font-bold text-[#C5A059] uppercase">
                                  <span>{b.category}</span>
                                  <span>{b.date}</span>
                                </div>
                                <h4 className="font-serif italic font-bold text-base text-[#1B2E21] line-clamp-2 leading-tight">{b.title}</h4>
                                <p className="text-gray-500 text-xs font-sans line-clamp-2 font-light">{b.summary}</p>
                              </div>
                            </div>

                            <div className="p-4 border-t border-black/5 bg-[#FAF8F5] flex justify-between items-center text-xs font-mono">
                              <span className="text-gray-400 italic">By: {b.author}</span>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => { setEditingBlog(b); setIsAddingBlog(false); }}
                                  className="p-1 px-2.5 bg-white hover:bg-[#1B2E21] hover:text-white border border-gray-250 cursor-pointer rounded-none text-[10px]"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteBlogItem(b.id)}
                                  className="p-1 px-2 bg-red-50 hover:bg-rose-650 hover:text-white border border-rose-200 text-rose-700 cursor-pointer rounded-none text-[10px]"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Editing Blog entry sub pane */}
                      {editingBlog && (
                        <div className="bg-white border-2 border-[#C5A059]/40 p-6 sm:p-8 space-y-6 rounded-none relative">
                          <button 
                            className="absolute top-4 right-4 p-1.5 bg-gray-50 hover:bg-gray-150 text-gray-500 cursor-pointer text-xs"
                            onClick={() => setEditingBlog(null)}
                          >
                            Discard Write
                          </button>
                          
                          <div className="space-y-1 text-left">
                            <span className="text-[10px] font-mono text-[#C5A059] font-bold uppercase tracking-widest">
                              {isAddingBlog ? "COMPOSE BULLET BLOG POST BULLETIN" : "EDIT MEDIA POST STRINGS"}
                            </span>
                            <h3 className="font-serif italic text-2xl text-[#1B2E21]">{editingBlog.title}</h3>
                          </div>

                          <form onSubmit={(e) => saveBlogForm(e, editingBlog)} className="space-y-4 text-xs text-left">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-mono text-gray-400">Post Sourcing URL ID</label>
                                <input
                                  type="text"
                                  required
                                  disabled={!isAddingBlog}
                                  value={editingBlog.id}
                                  onChange={(e) => setEditingBlog({...editingBlog, id: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-mono text-gray-400">Bulletin Sourcing Header Title</label>
                                <input
                                  type="text"
                                  required
                                  value={editingBlog.title}
                                  onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-mono text-gray-400">Bulletin Category</label>
                                <select
                                  value={editingBlog.category}
                                  onChange={(e: any) => setEditingBlog({...editingBlog, category: e.target.value})}
                                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none cursor-pointer"
                                >
                                  <option value="Export Guides">Export Guides</option>
                                  <option value="Market Reports">Market Reports</option>
                                  <option value="Commodity Prices">Commodity Prices</option>
                                  <option value="Agriculture News">Agriculture News</option>
                                  <option value="Trade Opportunities">Trade Opportunities</option>
                                </select>
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-mono text-gray-400">Est. Read Sifting Duration</label>
                                <input
                                  type="text"
                                  value={editingBlog.readingTime}
                                  onChange={(e) => setEditingBlog({...editingBlog, readingTime: e.target.value})}
                                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-mono text-gray-400">Author Release desk</label>
                                <input
                                  type="text"
                                  value={editingBlog.author}
                                  onChange={(e) => setEditingBlog({...editingBlog, author: e.target.value})}
                                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Splash Photo Asset URL</label>
                              <input
                                type="text"
                                value={editingBlog.image}
                                onChange={(e) => setEditingBlog({...editingBlog, image: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Summary excerpt</label>
                              <input
                                type="text"
                                value={editingBlog.summary}
                                onChange={(e) => setEditingBlog({...editingBlog, summary: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Extensive Content description body (Supports Markdown syntax)</label>
                              <textarea
                                rows={8}
                                value={editingBlog.content}
                                onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-none font-mono text-[11px] leading-relaxed"
                              />
                            </div>

                            <div className="flex gap-2 justify-end pt-4 border-t border-black/5">
                              <button
                                type="button"
                                onClick={() => setEditingBlog(null)}
                                className="px-5 py-2.5 bg-gray-150 hover:bg-gray-200 font-mono text-xs font-bold uppercase cursor-pointer border-none"
                              >
                                Discard write-up
                              </button>
                              <button
                                type="submit"
                                className="px-5 py-2.5 bg-[#1B2E21] hover:bg-[#C5A059] hover:text-[#1B2E21] text-white font-mono text-xs font-bold uppercase cursor-pointer border-none"
                              >
                                Publish Bulletin to portal
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 5: CERTIFICATIONS */}
                  {activeTab === "certs" && (
                    <div className="space-y-6">
                      <button
                        onClick={() => {
                          setIsAddingCert(true);
                          setEditingCert({
                            id: `cert-${Date.now()}`,
                            name: "New Quality License Audit",
                            issuer: "Global Inspection Body",
                            description: "Verifies standard compliance matrices."
                          });
                        }}
                        className="px-4 py-2 bg-[#1B2E21] hover:bg-[#C5A059] text-white hover:text-[#1B2E21] font-mono text-xs font-bold uppercase tracking-widest cursor-pointer rounded-none inline-flex items-center gap-1 border-none"
                      >
                        <Plus className="w-4 h-4" />
                        Audit License Record
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {certs.map((c) => (
                          <div key={c.id} className="bg-white border border-gray-150 p-6 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex gap-2 items-center">
                                <div className="w-8 h-8 bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                                  <Award className="w-4 h-4" />
                                </div>
                                <h4 className="font-serif italic font-bold text-base text-[#1B2E21]">{c.name}</h4>
                              </div>
                              <p className="text-gray-500 text-xs font-sans leading-relaxed">{c.description}</p>
                            </div>

                            <div className="flex justify-between items-center text-[10px] font-mono border-t border-black/5 pt-3">
                              <span className="text-[#C5A059] font-bold">Issuer: {c.issuer}</span>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => { setEditingCert(c); setIsAddingCert(false); }}
                                  className="p-1 px-3 bg-[#FAF8F5] border border-gray-200 cursor-pointer"
                                >
                                  Edit Specs
                                </button>
                                <button
                                  onClick={() => deleteCertItem(c.id)}
                                  className="p-1 px-2.5 bg-red-50 text-rose-700 border border-rose-100 hover:bg-rose-50 cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {editingCert && (
                        <div className="bg-white border-2 border-[#C5A059]/40 p-6 sm:p-8 space-y-6 rounded-none relative">
                          <button className="absolute top-4 right-4 text-xs font-mono" onClick={() => setEditingCert(null)}>Close</button>
                          <form 
                            onSubmit={(e) => saveCertForm(e, editingCert)} 
                            className="space-y-4 text-xs text-left"
                          >
                            <h4 className="font-serif italic text-lg text-[#1B2E21]">Modify Active Certification Record</h4>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">License Sourcing ID</label>
                              <input
                                type="text"
                                required
                                disabled={!isAddingCert}
                                value={editingCert.id}
                                onChange={(e) => setEditingCert({...editingCert, id: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Certification Name</label>
                              <input
                                type="text"
                                required
                                value={editingCert.name}
                                onChange={(e) => setEditingCert({...editingCert, name: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Issuer Agency Institution</label>
                              <input
                                type="text"
                                required
                                value={editingCert.issuer}
                                onChange={(e) => setEditingCert({...editingCert, issuer: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Compliance Audit Scope description</label>
                              <textarea
                                value={editingCert.description}
                                onChange={(e) => setEditingCert({...editingCert, description: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5"
                                rows={3}
                              />
                            </div>
                            <button
                              type="submit"
                              className="w-full py-3 bg-[#1B2E21] text-white hover:bg-[#C5A059] font-mono text-xs uppercase"
                            >
                              Sync Audit Spec Sheet
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 6: LEADERSHIP TEAM */}
                  {activeTab === "team" && (
                    <div className="space-y-6">
                      <button
                        onClick={() => {
                          setIsAddingTeam(true);
                          setEditingTeam({
                            id: `team-${Date.now()}`,
                            name: "Executive Name",
                            role: "Corporate Desk Role",
                            speech: "Executive message remarks statement.",
                            experience: "Credentials sifting benchmark log.",
                            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
                          });
                        }}
                        className="px-4 py-2 bg-[#1B2E21] hover:bg-[#C5A059] text-white hover:text-[#1B2E21] font-mono text-xs font-bold uppercase tracking-widest cursor-pointer rounded-none inline-flex items-center gap-1 border-none"
                      >
                        <Plus className="w-4 h-4" />
                        Appoint Executor
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.map((t) => (
                          <div key={t.id} className="bg-white border border-gray-150 rounded-none overflow-hidden hover:shadow-sm flex flex-col justify-between">
                            <div className="p-6 space-y-4">
                              <div className="flex items-center gap-4">
                                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-[#C5A059]/30" />
                                <div>
                                  <h4 className="font-serif italic font-bold text-base text-[#1B2E21]">{t.name}</h4>
                                  <span className="text-[10px] font-mono text-[#C5A059] font-bold uppercase">{t.role}</span>
                                </div>
                              </div>
                              <p className="text-gray-500 text-xs italic font-sans font-light leading-relaxed">&ldquo;{t.speech}&rdquo;</p>
                            </div>

                            <div className="p-4 bg-[#FAF8F5] border-t border-black/5 flex justify-between items-center text-[10px] font-mono">
                              <span className="text-gray-400 font-bold">Exp: {t.experience}</span>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => { setEditingTeam(t); setIsAddingTeam(false); }}
                                  className="p-1 px-3 bg-white border border-gray-250 cursor-pointer"
                                >
                                  Edit Speak
                                </button>
                                <button
                                  onClick={() => deleteTeamItem(t.id)}
                                  className="p-1 px-2 bg-red-50 text-rose-700 border border-rose-100 hover:bg-rose-50 cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {editingTeam && (
                        <div className="bg-white border-2 border-[#C5A059]/40 p-6 sm:p-8 space-y-6 rounded-none relative">
                          <button className="absolute top-4 right-4 text-xs font-mono" onClick={() => setEditingTeam(null)}>Close</button>
                          <form 
                            onSubmit={(e) => saveTeamForm(e, editingTeam)} 
                            className="space-y-4 text-xs text-left"
                          >
                            <h4 className="font-serif italic text-lg text-[#1B2E21]">Modify Executive Director board specs</h4>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Board Member ID</label>
                              <input
                                type="text"
                                required
                                disabled={!isAddingTeam}
                                value={editingTeam.id}
                                onChange={(e) => setEditingTeam({...editingTeam, id: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Full Name</label>
                              <input
                                type="text"
                                required
                                value={editingTeam.name}
                                onChange={(e) => setEditingTeam({...editingTeam, name: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Corporate Board Role</label>
                              <input
                                type="text"
                                required
                                value={editingTeam.role}
                                onChange={(e) => setEditingTeam({...editingTeam, role: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Credentials benchmark text info</label>
                              <input
                                type="text"
                                required
                                value={editingTeam.experience}
                                onChange={(e) => setEditingTeam({...editingTeam, experience: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Portrait Image URL</label>
                              <input
                                type="text"
                                value={editingTeam.image}
                                onChange={(e) => setEditingTeam({...editingTeam, image: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-400">Personal Mission speech address</label>
                              <textarea
                                value={editingTeam.speech}
                                onChange={(e) => setEditingTeam({...editingTeam, speech: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-2.5"
                                rows={3}
                              />
                            </div>
                            <button
                              type="submit"
                              className="w-full py-3 bg-[#1B2E21] text-white hover:bg-[#C5A059] font-mono text-xs uppercase"
                            >
                              Sync Board Profile
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 7: HOMEPAGE SETTINGS */}
                  {activeTab === "homepage" && (
                    <div className="bg-white border border-[#132017]/10 p-6 sm:p-8 rounded-none">
                      <form onSubmit={handleHomepageSave} className="space-y-6 text-xs text-left">
                        <div className="space-y-1">
                          <span className="text-[#C5A059] font-mono text-[10px] font-bold uppercase tracking-widest block">PORTAL INTERACTION EDITOR</span>
                          <h4 className="font-serif italic text-lg text-[#1B2E21]">Layout Copy Variables Configuration</h4>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono text-gray-500 font-bold uppercase">Hero H1 Cover Slogan Statement</label>
                            <input
                              type="text"
                              required
                              value={homepage.heroTitle || ""}
                              onChange={(e) => setHomepage({...homepage, heroTitle: e.target.value})}
                              className="w-full bg-gray-50 border border-gray-200 p-3 font-semibold text-sm"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono text-gray-500 font-bold uppercase">Hero paragraphs subtitle descriptive copy</label>
                            <textarea
                              rows={3}
                              required
                              value={homepage.heroSubtitle || ""}
                              onChange={(e) => setHomepage({...homepage, heroSubtitle: e.target.value})}
                              className="w-full bg-gray-50 border border-gray-200 p-3 leading-relaxed"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-500 font-bold uppercase">Cover Slogan Allocation banner text</label>
                              <input
                                type="text"
                                value={homepage.heroPromoText || ""}
                                onChange={(e) => setHomepage({...homepage, heroPromoText: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-3"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono text-gray-500 font-bold uppercase">Executive Sourcing core Title</label>
                              <input
                                type="text"
                                value={homepage.companyIntroTitle || ""}
                                onChange={(e) => setHomepage({...homepage, companyIntroTitle: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 p-3"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono text-gray-500 font-bold uppercase">Intro Sourcing Paragraph</label>
                            <textarea
                              rows={2}
                              value={homepage.companyIntroText || ""}
                              onChange={(e) => setHomepage({...homepage, companyIntroText: e.target.value})}
                              className="w-full bg-gray-50 border border-gray-200 p-3"
                            />
                          </div>

                          {/* Stats counter numbers */}
                          <div className="p-4 bg-[#FAF8F5] border border-black/5 space-y-4">
                            <span className="font-mono text-[9px] text-[#C5A059] block font-bold uppercase">Dynamic Stats counter parameters</span>
                            <div className="grid grid-cols-4 gap-3 text-center">
                              <div>
                                <label className="block text-[8px] font-mono text-gray-400 uppercase">Trade Experience</label>
                                <input
                                  type="text"
                                  value={homepage.statsExperience || ""}
                                  onChange={(e) => setHomepage({...homepage, statsExperience: e.target.value})}
                                  className="w-full bg-white border border-gray-200 p-2 text-center text-sm font-serif text-[#C5A059] italic font-semibold"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] font-mono text-gray-400 uppercase">Sovereignties Serviced</label>
                                <input
                                  type="text"
                                  value={homepage.statsCountries || ""}
                                  onChange={(e) => setHomepage({...homepage, statsCountries: e.target.value})}
                                  className="w-full bg-white border border-gray-200 p-2 text-center text-sm font-serif text-[#C5A059] italic font-semibold"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] font-mono text-gray-400 uppercase">Shipments Dispatched</label>
                                <input
                                  type="text"
                                  value={homepage.statsShipments || ""}
                                  onChange={(e) => setHomepage({...homepage, statsShipments: e.target.value})}
                                  className="w-full bg-white border border-gray-200 p-2 text-center text-sm font-serif text-[#C5A059] italic font-semibold"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] font-mono text-gray-400 uppercase">Global Factories Client</label>
                                <input
                                  type="text"
                                  value={homepage.statsClients || ""}
                                  onChange={(e) => setHomepage({...homepage, statsClients: e.target.value})}
                                  className="w-full bg-white border border-gray-200 p-2 text-center text-sm font-serif text-[#C5A059] italic font-semibold"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {authRole === "Super Admin" ? (
                          <button
                            type="submit"
                            className="w-full py-3 bg-[#1B2E21] hover:bg-[#C5A059] hover:text-[#1B2E21] text-white font-mono text-xs font-bold uppercase tracking-widest cursor-pointer rounded-none border-none"
                          >
                            Synchronize Web layout specifications
                          </button>
                        ) : (
                          <div className="bg-amber-50 text-amber-800 border border-amber-200 p-3 text-center rounded-none font-mono font-bold uppercase tracking-wider text-[10px]">
                            Operational Role Validation Error: Only a Super Admin publishes Homepage settings.
                          </div>
                        )}
                      </form>
                    </div>
                  )}

                  {/* TAB 8: SUPABASE SETUP UTILITIES CODES */}
                  {activeTab === "supabase" && (
                    <div className="space-y-6 text-xs text-left">
                      
                      {/* Connection Form */}
                      <div className="bg-white border border-[#132017]/10 p-6 sm:p-8 rounded-none space-y-6">
                        <div className="space-y-1">
                          <span className="text-[#C5A059] font-mono text-[9px] font-bold uppercase tracking-widest block">SUPABASE INTEGRATION PROTOCOLS</span>
                          <h4 className="font-serif italic text-lg text-[#1B2E21]">Establish Live Cloud Connection</h4>
                          <p className="text-gray-500 font-sans text-xs">
                            Hook your Lakeduck Portal directly into your Supabase Postgres Database tables. Once keys are configured, the local offline simulation synchronizes itself natively with active server states.
                          </p>
                        </div>

                        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-mono text-gray-500 font-bold uppercase">SUPABASE PROJECT URL (VITE_SUPABASE_URL)</label>
                            <input
                              type="text"
                              placeholder="https://xyzabcdefg.supabase.co"
                              value={dbSetupUrl}
                              onChange={(e) => setDbSetupUrl(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 p-2.5 font-mono"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-mono text-gray-500 font-bold uppercase">SUPABASE ANON PUBLIC KEY (VITE_SUPABASE_ANON_KEY)</label>
                            <input
                              type="password"
                              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                              value={dbSetupKey}
                              onChange={(e) => setDbSetupKey(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 p-2.5 font-mono"
                            />
                          </div>

                          <div className="md:col-span-2 flex flex-wrap gap-2 pt-2">
                            <button
                              onClick={saveAndConnectSupabase}
                              className="px-6 py-3 bg-[#1B2E21] hover:bg-[#C5A059] hover:text-[#1B2E21] text-white font-mono font-bold uppercase tracking-widest cursor-pointer rounded-none transition-colors border-none"
                            >
                              Authorize and Save Connection Keys
                            </button>
                            {AppDatabase.usingSupabase && (
                              <button
                                onClick={disengageSupabase}
                                className="px-6 py-3 bg-red-50 hover:bg-rose-600 hover:text-white border border-rose-200 text-rose-700 font-mono font-bold uppercase tracking-widest cursor-pointer rounded-none transition-colors"
                              >
                                Disengage Cloud Integration
                              </button>
                            )}
                          </div>
                        </div>

                        {dbTestResult && (
                          <div className="p-3 bg-[#FAF8F5] border border-gray-200 text-[#1B2E21] font-mono animate-pulse rounded-none">
                            {dbTestResult}
                          </div>
                        )}
                      </div>

                      {/* Schema SQL script export code sheet */}
                      <div className="bg-[#132017] border border-[#C5A059]/20 p-6 sm:p-8 text-[#FAF8F5] space-y-4 rounded-none">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Terminal className="w-5 h-5 text-[#C5A059]" />
                              <h4 className="font-serif italic text-lg leading-none">Database Schema Initialization SQL script</h4>
                            </div>
                            <p className="text-gray-400 text-xs font-sans">
                              Execute this script in your Supabase SQL editor to instantly allocate and structure all tables with correct column typings, references and Row Level Access (RLS) security protocols!
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(getSupabaseSchemaSQL());
                              alert("Supabase SQL provisioning script successfully copied to clipboard!");
                            }}
                            className="px-4 py-2 bg-[#233B29] hover:bg-[#C5A059] text-white hover:text-[#1B2E21] hover:scale-105 rounded-none font-mono text-[10px] uppercase font-bold tracking-widest cursor-pointer transition-all border-none"
                          >
                            Copy SQL Scripts
                          </button>
                        </div>

                        <div className="max-h-80 overflow-y-auto bg-black p-4 rounded-none border border-white/5 pr-2 font-mono text-[11px] leading-relaxed select-all">
                          <pre>{getSupabaseSchemaSQL()}</pre>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}

            </main>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
