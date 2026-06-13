/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, ShieldCheck } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [chatMessage, setChatMessage] = useState("");

  useEffect(() => {
    // If they haven't opened yet, pulse attention
    const pulseTimer = setTimeout(() => {
      if (unreadCount > 0) {
        // can keep unread count pulsing
      }
    }, 4000);
    return () => clearTimeout(pulseTimer);
  }, [unreadCount]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      const templateText = encodeURIComponent(
        `Hello Lakeduck Integrated Desk, I would like to inquire about agricultural/recycled commodities. Msg: ${chatMessage}`
      );
      // Opens WhatsApp API Link safely
      const whatsappURL = `https://api.whatsapp.com/send?phone=2348202010&text=${templateText}`;
      window.open(whatsappURL, "_blank", "noopener,noreferrer");
      setChatMessage("");
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="mb-4 w-80 bg-[#F8F5F0] rounded-none overflow-hidden shadow-2xl border border-[#1B2E21]/20 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-[#1B2E21] text-white p-4 flex items-center justify-between border-b border-[#C5A059]/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#1B2E21] border border-[#C5A059]/35 flex items-center justify-center font-bold text-sm text-[#C5A059]">
                    LI
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#C5A059] border-2 border-[#1B2E21]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold leading-tight text-white flex items-center gap-1 font-serif italic">
                    Fatima Bello
                  </h4>
                  <p className="text-[10px] text-[#C5A059] font-mono uppercase tracking-wider font-semibold">Active Trade Desk Operator</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-none hover:bg-white/10 text-[#C5A059] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bubble contents */}
            <div className="p-4 bg-[#F2EDE4] min-h-[160px] flex flex-col justify-end gap-3 max-h-[220px] overflow-y-auto">
              <div className="bg-white p-3 rounded-none border-l-2 border-[#C5A059] text-xs text-gray-800 shadow-sm max-w-[85%] self-start relative">
                <p className="leading-relaxed">
                  Barka de yamma! Welcome to Lakeduck Integrated Desk. I’m online to support specifications, crop pricing matrices, and recycling/shredding bookings.
                </p>
                <p className="text-[9px] text-[#1B2E21]/50 font-mono mt-1.5 text-right">08:14 GMT+1</p>
              </div>

              <div className="bg-white p-3 rounded-none border-l-2 border-[#C5A059] text-xs text-gray-800 shadow-sm max-w-[85%] self-start relative">
                <p className="leading-relaxed">
                  How can I help you today? Simply type your commodity interest (Cocoa, Sesame, Ginger...) below to load our WhatsApp chat.
                </p>
                <p className="text-[9px] text-[#1B2E21]/50 font-mono mt-1.5 text-right">08:15 GMT+1</p>
              </div>
            </div>

            {/* Footer Form input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#1B2E21]/10 flex gap-2">
              <input
                type="text"
                placeholder="Type target commodity size..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-white border border-[#1B2E21]/15 focus:border-[#C5A059] rounded-none px-3.5 py-2 text-xs outline-none text-[#1B2E21]"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-none bg-[#1B2E21] hover:bg-[#C5A059] text-white flex items-center justify-center cursor-pointer shrink-0 shadow-sm border border-[#C5A059]/30 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <button
        onClick={handleOpenToggle}
        className="relative w-14 h-14 rounded-full bg-[#1B2E21] hover:bg-[#C5A059] text-white flex items-center justify-center cursor-pointer shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none border-2 border-[#C5A059]"
      >
        <MessageSquare className="w-6 h-6 fill-white/10 text-white" />
        
        {/* Unread notification badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5.5 h-5.5 rounded-full bg-[#C5A059] text-[#1B2E21] font-extrabold text-[10px] flex items-center justify-center shadow-md animate-pulse border border-[#1B2E21]"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
