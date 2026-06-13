/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, Calendar, User, Clock, ChevronRight, X, Sparkles, 
  Send, CheckCircle2, Search, Share2, Copy, Twitter, Linkedin, 
  MessageSquare, ArrowRight, Eye, RefreshCw, FileText, Globe, Check
} from "lucide-react";
import { AppDatabase } from "../lib/db";
import { BlogPost } from "../types";

export default function Blog() {
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  
  // Newsletter Variables
  const [subEmail, setSubEmail] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  // Social Sharing & Copy Toast indicators
  const [copiedLink, setCopiedLink] = useState(false);

  // SEO Target Keyword State for manual interaction matching
  const [seoKeyword, setSeoKeyword] = useState("exports");

  const categories = [
    "All",
    "Export Guides",
    "Market Reports",
    "Commodity Prices",
    "Agriculture News",
    "Trade Opportunities"
  ];

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await AppDatabase.getBlogs();
      setBlogsList(data);
    } catch (e) {
      console.error("Failed to load blog posts:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter & Search logic
  const filteredBlogs = blogsList.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) return matchesCategory;

    const matchesSearch = 
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query);
    
    return matchesCategory && matchesSearch;
  });

  // Extract primary featured article (first one matching featured flag, or fallback to chronological first)
  const featuredArticle = filteredBlogs.find(p => p.featured) || filteredBlogs[0];
  
  // Feed list excluding the featured hero article to avoid double rendering
  const feedBlogs = featuredArticle 
    ? filteredBlogs.filter(p => p.id !== featuredArticle.id)
    : filteredBlogs;

  // Find related articles (same category or others, excluding current active)
  const getRelatedArticles = (current: BlogPost) => {
    const matched = blogsList.filter(p => p.id !== current.id && p.category === current.category);
    if (matched.length > 0) return matched.slice(0, 3);
    // fallback to latest ignoring category
    return blogsList.filter(p => p.id !== current.id).slice(0, 3);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subEmail.trim()) {
      setSubSuccess(true);
      setTimeout(() => {
        setSubEmail("");
        setSubSuccess(false);
      }, 3000);
    }
  };

  // Social share utils
  const copyToClipboard = (id: string) => {
    const dummyUrl = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(dummyUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Real helper calculations for SEO health check panel
  const calculateSeoScore = (post: BlogPost, keyword: string) => {
    let score = 50; // base score
    const title = post.title.toLowerCase();
    const body = post.content.toLowerCase();
    const summary = post.summary.toLowerCase();
    const kw = keyword.toLowerCase().trim();

    if (!kw) return 70;

    // Title length (optimal 45 - 65 chars)
    if (post.title.length >= 45 && post.title.length <= 65) {
      score += 10;
    } else if (post.title.length > 65 && post.title.length < 85) {
      score += 5;
    }

    // Title contains keyword
    if (title.includes(kw)) {
      score += 10;
    }

    // Meta Description length (optimal 110 - 160 chars)
    if (post.summary.length >= 110 && post.summary.length <= 160) {
      score += 10;
    } else if (post.summary.length > 160) {
      score += 5;
    }

    // Keyword density in Body
    const matches = (body.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length;
    const bodyWords = post.content.split(/\s+/).length || 1;
    const density = (matches / bodyWords) * 100;
    
    if (density >= 1.0 && density <= 2.5) {
      score += 10;
    } else if (density > 0 && density < 1.0) {
      score += 5;
    }

    // First paragraph contains keyword
    const paragraphs = post.content.split("\n\n");
    if (paragraphs[0] && paragraphs[0].toLowerCase().includes(kw)) {
      score += 10;
    }

    return Math.min(score, 100);
  };

  return (
    <div id="agro_export_blog_root" className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Dynamic Header */}
      <div className="space-y-4 border-b border-[#1B2E21]/10 pb-8">
        <span className="text-[#C5A059] font-mono tracking-[0.25em] uppercase text-xs font-bold block mb-1">
          International Trade intelligence Desk
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#1B2E21] tracking-tight leading-tight">
          Lakeduck Integrated <span className="font-bold not-italic text-[#8BA88E]">Export & Recycling Chronicles</span>
        </h2>
        <p className="text-[#1B2E21]/70 text-sm sm:text-base max-w-3xl leading-relaxed font-light font-sans">
          Access premium market studies, maritime logistics checklists, real-time commodity price tracking, compliance advisories, and WTO specifications curated by our trading specialists.
        </p>
      </div>

      {/* Primary Search Controls & Category Filter */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input Bar */}
          <div className="md:col-span-4 relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="blog_search_input"
              type="text"
              placeholder="Search guides, reports & commodity indicators..."
              value={searchQuery === " " ? "" : searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#1B2E21]/10 focus:border-[#C5A059] focus:outline-none pl-10 pr-4 py-3 text-xs font-sans tracking-wide shadow-sm"
            />
            {(searchQuery.trim() !== "") && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 p-1 text-[#1B2E21] hover:text-[#C5A059] text-[10px] uppercase font-mono font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sourcing Category Tabs selector */}
          <div className="md:col-span-8 flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                id={`blog_cat_tab_${cat.toLowerCase().replace(/\s+/g, "_")}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-200 border cursor-pointer border-[#1B2E21]/15 ${
                  selectedCategory === cat
                    ? "bg-[#1B2E21] text-[#FAF8F5] border-[#1B2E21]"
                    : "bg-white text-gray-500 hover:text-[#1B2E21] hover:bg-[#1B2E21]/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Dynamic Data Content Area */}
      {loading ? (
        <div className="py-24 text-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin text-[#C5A059] mx-auto" />
          <p className="font-serif italic text-gray-500">Retrieving cargo bulletins and trade files...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-24 text-center bg-white border border-[#1B2E21]/15 p-12 space-y-4">
          <FileText className="w-12 h-12 text-[#C5A059] mx-auto" />
          <h3 className="font-serif italic text-xl text-[#1B2E21]">No Bulletins Found Matching Parameters</h3>
          <p className="text-gray-500 text-xs font-sans max-w-md mx-auto">
            Try adjusting your global keywords or reset category filters to view our full trading desk archive.
          </p>
          <button
            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
            className="px-5 py-2.5 bg-[#1B2E21] text-white hover:bg-[#C5A059] font-mono text-xs uppercase tracking-widest transition-colors font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Feed Sector (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* FEATURED HERO ARTICLE PANEL (Only shown when filter has results) */}
            {selectedCategory === "All" && featuredArticle && (
              <motion.div
                id={`blog_featured_post_hero`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-[#C5A059]/35 overflow-hidden shadow-md group relative flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 relative aspect-video md:aspect-auto min-h-[280px]">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 text-[9px] font-mono font-bold tracking-wider uppercase bg-[#C5A059] text-white px-3 py-1 bg-opacity-95 z-10">
                    Featured Guide
                  </span>
                </div>
                
                <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredArticle.date}
                      </span>
                      <span className="flex items-center gap-1 text-[#C5A059] font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredArticle.readingTime}
                      </span>
                    </div>

                    <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-[#1B2E21] tracking-tight group-hover:text-[#C5A059] transition-colors leading-tight">
                      {featuredArticle.title}
                    </h3>

                    <p className="text-[#1B2E21]/85 text-xs font-light font-sans leading-relaxed line-clamp-4">
                      {featuredArticle.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1B2E21]/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] text-gray-500 font-bold">Author: {featuredArticle.author.split(" ")[0]}</span>
                    <button
                      onClick={() => setActiveArticle(featuredArticle)}
                      className="text-[#1B2E21] font-bold hover:text-[#C5A059] flex items-center gap-1 scroll-smooth cursor-pointer"
                    >
                      Analyze Standard
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SECONDARY STANDARD BLOG TIMELINE GRID */}
            <div className="space-y-6">
              <h3 className="font-serif italic text-lg text-[#1B2E21] border-b border-black/5 pb-2">
                {selectedCategory === "All" ? "Latest Sifting Releases" : `${selectedCategory} Archive`}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedBlogs.map((post) => (
                  <motion.article
                    id={`blog_post_card_${post.id}`}
                    key={post.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white border border-[#1B2E21]/10 overflow-hidden shadow-sm flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-4 left-4 text-[8px] font-mono font-bold tracking-wider uppercase bg-[#1B2E21] text-white px-2 py-0.5">
                          {post.category}
                        </span>
                      </div>

                      {/* Info and title */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readingTime}
                          </span>
                        </div>

                        <h4 className="font-serif italic font-bold text-base text-[#1B2E21] group-hover:text-[#C5A059] transition-colors leading-snug">
                          {post.title}
                        </h4>

                        <p className="text-gray-500 text-xs leading-relaxed font-sans font-light line-clamp-3">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    {/* Bottom read triggered anchor */}
                    <div className="p-5 pt-3 border-t border-black/5 bg-[#FAF8F5] flex items-center justify-between text-[11px] font-mono text-gray-400">
                      <span className="text-[9px]">By: {post.author.split(" ")[0]}</span>
                      <button
                        onClick={() => setActiveArticle(post)}
                        className="text-[#1B2E21] font-bold hover:text-[#C5A059] inline-flex items-center gap-0.5 cursor-pointer"
                      >
                        Read Post
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </motion.article>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar Columns (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Sourcing Newsletter Box */}
            <div className="bg-[#1B2E21] text-white p-6 sm:p-8 space-y-4 border border-[#C5A059]/15 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[#C5A059] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>

              <h3 className="font-serif italic font-semibold text-xl text-white">
                Commodity Trade Updates
              </h3>

              <p className="text-[#FAF8F5]/80 text-xs leading-relaxed font-sans font-light">
                Secure real-time FOB price trend tables (Lagos, Hamburg, Rotterdam), vessel backlog notifications, and crop output reports directly in your mail list.
              </p>

              {subSuccess ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-[#142218] p-4 text-center space-y-1 text-[#C5A059] border border-[#C5A059]/30"
                >
                  <CheckCircle2 className="w-5 h-5 mx-auto text-[#8BA88E]" />
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider">Subscribed Successfully!</p>
                  <p className="text-[9px] text-gray-400 font-sans">You will receive the next weekly report.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3 font-sans">
                  <input
                    type="email"
                    required
                    placeholder="Enter corporate email..."
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    className="w-full bg-[#142218] border border-white/10 text-white focus:border-[#C5A059] text-xs px-4 py-2.5 focus:outline-none placeholder-gray-500 rounded-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#C5A059] hover:bg-[#b5924d] text-[#1B2E21] font-mono text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2 transition-all border-none"
                  >
                    Subscribe Now
                    <Send className="w-3 h-3 text-[#1B2E21]" />
                  </button>
                </form>
              )}
            </div>

            {/* Trading Guidelines Info Block */}
            <div className="bg-white border border-[#1B2E21]/15 p-6 space-y-4 shadow-sm">
              <h4 className="font-serif italic font-bold text-base text-[#1B2E21] border-b border-black/5 pb-2">
                Operational Compliance
              </h4>
              <div className="space-y-3 font-sans text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-[#1B2E21] block">SGS Inspections</span>
                  <p className="text-gray-500 font-light leading-relaxed">
                    SGS inspects every export consignment at our warehouses to verify chemical composition, purity indices, and bag seals before port delivery.
                  </p>
                </div>
                <div className="space-y-1 pt-3 border-t border-dashed border-black/5">
                  <span className="font-bold text-[#1B2E21] block">Trade Desk Operations</span>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Lakeduck Commodity brokers arrange Letter of Credit terms through Tier 1 financial institutions, securing shipments on FOB terms.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* DETAILED ARTICLE READER DIALOG OVERLAY */}
      <AnimatePresence>
        {activeArticle && (
          <div id="blog_reader_overlay font-sans" className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-[#FAF8F5] rounded-none max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh] border border-[#C5A059]/40"
            >
              {/* Header Splash banner */}
              <div className="h-48 sm:h-64 relative shrink-0">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E21] via-[#1B2E21]/60 to-transparent" />
                
                {/* Close trigger button */}
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/85 text-[#C5A059] border border-[#C5A059]/30 transition-colors cursor-pointer z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1.5">
                  <span className="px-2.5 py-0.5 bg-[#C5A059] text-[#1B2E21] text-[9px] uppercase font-bold tracking-widest font-mono inline-block">
                    {activeArticle.category}
                  </span>
                  <h3 className="font-serif italic font-bold text-lg sm:text-2xl md:text-3xl leading-tight text-white drop-shadow-sm">
                    {activeArticle.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Panel Area */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-grow">
                
                {/* Meta details strip and Social Sharing Toolbar */}
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-gray-400 gap-4 border-b border-black/5 pb-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                    <span className="flex items-center gap-1 font-bold text-[#1B2E21]">
                      <User className="w-4 h-4 text-[#8BA88E] shrink-0" />
                      {activeArticle.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {activeArticle.date}
                    </span>
                    <span className="flex items-center gap-1 text-[#C5A059] font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      {activeArticle.readingTime}
                    </span>
                  </div>

                  {/* Social sharing actions strip */}
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-gray-500">Share Report:</span>
                    
                    {/* Copy Link button */}
                    <button
                      onClick={() => copyToClipboard(activeArticle.id)}
                      className="p-1.5 bg-white text-gray-500 hover:text-[#C5A059] border border-gray-200 transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                      title="Copy specific post link"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? "Copied!" : "Copy URL"}</span>
                    </button>

                    {/* Twitter/X share button */}
                    <button
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this premium market briefing from Lakeduck Integrated: ${activeArticle.title}`)}&url=${encodeURIComponent(window.location.origin + '/blog/' + activeArticle.id)}`, '_blank')}
                      className="p-1.5 bg-white text-gray-500 hover:text-sky-500 border border-gray-200 cursor-pointer"
                      title="Share report on X"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </button>

                    {/* LinkedIn share button */}
                    <button
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/blog/' + activeArticle.id)}`, '_blank')}
                      className="p-1.5 bg-white text-gray-500 hover:text-blue-700 border border-gray-200 cursor-pointer"
                      title="Share audit on LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </button>

                    {/* WhatsApp share button */}
                    <button
                      onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${activeArticle.title} - ${activeArticle.summary} Read at: ${window.location.origin}/blog/${activeArticle.id}`)}`, '_blank')}
                      className="p-1.5 bg-white text-gray-500 hover:text-emerald-600 border border-gray-200 cursor-pointer"
                      title="Forward report via WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Main Text Content Paragraphs */}
                <div className="text-[#1B2E21]/85 text-sm sm:text-base space-y-4 leading-relaxed font-sans font-light prose max-w-none">
                  {activeArticle.content.split("\n\n").map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Trading Opinion block */}
                <div className="bg-white border-l-2 border-[#C5A059] p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-[10px] font-bold text-[#1B2E21] uppercase tracking-wider font-mono">Expert Trade Desk Briefing</span>
                  </div>
                  <p className="text-xs text-gray-500 italic font-sans leading-relaxed">
                    Phytosanitary reports, SGS sealing audits, and ocean freight logistics schedules represent vital vectors for maritime risk prevention. For detailed questions, speak to a desk broker via trade@lakeduckcommodities.com.
                  </p>
                </div>

                {/* INTERACTIVE SEO OPTIMIZATION ANALYSIS PANEL */}
                <div className="bg-[#FAF8F5] border border-[#1B2E21]/15 p-5 space-y-5">
                  <div className="flex items-center justify-between border-b border-[#1B2E21]/10 pb-2">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4.5 h-4.5 text-[#8BA88E]" />
                      <span className="text-xs font-mono font-bold text-[#1B2E21] uppercase tracking-wider">
                        SEO Sifter Inspector Panel
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#C5A059] uppercase bg-[#C5A059]/10 px-2 py-0.5">
                      Live Assessment Check
                    </span>
                  </div>

                  {/* Google Desktop SERP Simulator */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Google SERP Snippet Preview:</span>
                    <div className="bg-white border border-gray-200 p-4 space-y-1 shadow-xs">
                      <span className="text-[11px] text-gray-500 block truncate font-sans">
                        lakeduckcommodities.com/blog/{activeArticle.id}
                      </span>
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-[14px] leading-tight text-[#1a0dab] hover:underline font-medium block font-sans">
                        {activeArticle.title.length > 60 ? `${activeArticle.title.substring(0, 58)}...` : activeArticle.title} | Lakeduck Integrated
                      </a>
                      <span className="text-[11.5px] text-[#4d5156] font-light leading-snug block font-sans line-clamp-2">
                        {activeArticle.summary.length > 155 ? `${activeArticle.summary.substring(0, 152)}...` : activeArticle.summary}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Keyword Density input analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-4">
                      <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Audit Focus Keyword:</label>
                      <input
                        type="text"
                        value={seoKeyword}
                        onChange={(e) => setSeoKeyword(e.target.value)}
                        placeholder="exports"
                        className="w-full bg-white border border-[#1B2E21]/10 px-3 py-1.5 focus:outline-none text-xs text-[#1B2E21]"
                      />
                    </div>
                    
                    <div className="md:col-span-8 flex justify-between items-center bg-white border border-gray-200 p-3">
                      <div>
                        <span className="text-[9px] font-mono text-[#1B2E21] uppercase block font-bold">SEO Health Score</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-serif font-bold text-emerald-700">
                            {calculateSeoScore(activeArticle, seoKeyword)}/100
                          </span>
                          <span className="text-[9px] font-mono uppercase font-bold text-gray-400">
                            (Excellent Range)
                          </span>
                        </div>
                      </div>
                      
                      {/* Active density indicator */}
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-gray-400 block uppercase">Keyword Density:</span>
                        <span className="font-mono text-xs font-bold text-[#1B2E21]">
                          {((activeArticle.content.toLowerCase().match(new RegExp(`\\b${seoKeyword.toLowerCase().trim() || 'null'}\\b`, 'g')) || []).length / activeArticle.content.split(/\s+/).length * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet checklist checks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-mono">
                    <div className="bg-white p-3 border border-gray-150 flex items-center justify-between">
                      <span className="text-gray-500">Title Length ({activeArticle.title.length} chars)</span>
                      {activeArticle.title.length >= 45 && activeArticle.title.length <= 65 ? (
                        <span className="text-emerald-700 bg-emerald-50 px-1 py-0.5">Optimal</span>
                      ) : (
                        <span className="text-amber-700 bg-amber-50 px-1 py-0.5">Unsuited</span>
                      )}
                    </div>
                    <div className="bg-white p-3 border border-gray-150 flex items-center justify-between">
                      <span className="text-gray-500">Meta Summary ({activeArticle.summary.length} chars)</span>
                      {activeArticle.summary.length >= 110 && activeArticle.summary.length <= 160 ? (
                        <span className="text-emerald-700 bg-emerald-50 px-1 py-0.5">Optimal</span>
                      ) : (
                        <span className="text-amber-700 bg-amber-50 px-1 py-0.5">Adjust Length</span>
                      )}
                    </div>
                    <div className="bg-white p-3 border border-gray-150 flex items-center justify-between">
                      <span className="text-gray-500">Keyword in Title</span>
                      {activeArticle.title.toLowerCase().includes(seoKeyword.toLowerCase().trim()) ? (
                        <span className="text-emerald-700 bg-emerald-50 px-1 py-0.5">Present</span>
                      ) : (
                        <span className="text-amber-700 bg-amber-50 px-1 py-0.5">Missing</span>
                      )}
                    </div>
                    <div className="bg-white p-3 border border-gray-150 flex items-center justify-between">
                      <span className="text-gray-500">Word Count ({activeArticle.content.split(/\s+/).length} words)</span>
                      {activeArticle.content.split(/\s+/).length >= 100 ? (
                        <span className="text-emerald-700 bg-emerald-50 px-1 py-0.5">SEO Compliant</span>
                      ) : (
                        <span className="text-red-700 bg-red-50 px-1 py-0.5">Too Short</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* RELATED ARTICLES LOG PANEL (Recommends up to 3 posts) */}
                <div className="space-y-4 pt-4 border-t border-black/5">
                  <h4 className="font-serif italic font-bold text-lg text-[#1B2E21]">
                    Related Insights & Bulletins
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {getRelatedArticles(activeArticle).map(post => (
                      <div 
                        id={`related_blog_${post.id}`}
                        key={post.id}
                        onClick={() => { setActiveArticle(post); }}
                        className="bg-white border border-[#1B2E21]/10 p-4 space-y-3 hover:border-[#C5A059] transition-colors cursor-pointer group flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <img src={post.image} alt={post.title} className="aspect-video w-full object-cover shrink-0" />
                          <span className="text-[8px] font-mono font-bold text-[#C5A059] uppercase block">{post.category}</span>
                          <h5 className="font-serif italic font-semibold text-xs text-[#1B2E21] group-hover:text-[#C5A059] transition-colors leading-tight line-clamp-2">
                            {post.title}
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 block pt-2 flex items-center gap-0.5 font-bold">
                          Read bulletin <ArrowRight className="w-3 h-3 text-[#1B2E21] group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Reader panel bottom actions controls footer bar */}
              <div className="bg-[#1B2E21]/5 border-t border-black/10 p-5 flex justify-between items-center text-xs font-mono shrink-0">
                <span className="text-gray-500">Lakeduck Integrated Limited &copy; 2026</span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 bg-[#1B2E21] text-white hover:bg-[#C5A059] transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider"
                >
                  Close Document
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
