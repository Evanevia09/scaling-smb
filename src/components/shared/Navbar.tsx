"use client";

import Link from "next/link";
import { TrendingUp, Menu, X, Mail, Phone, ChevronDown, Layout, Users, Search, Map as MapIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal";
import AuditForm from "@/components/AuditForm";

const solutions = [
  { name: "Web Development", href: "/solutions/web-development", icon: Layout, desc: "High-performance websites" },
  { name: "Facebook Ads", href: "/solutions/facebook-ads", icon: Users, desc: "Local demand generation" },
  { name: "Google Ads", href: "/solutions/google-ads", icon: Search, desc: "High-intent search leads" },
  { name: "Local SEO", href: "/solutions/local-seo", icon: MapIcon, desc: "Map pack dominance" },
];

const navLinks = [
  { name: "Blog", href: "/blog" },
  { name: "Success Stories", href: "/success-stories" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-[#121212]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 group relative z-[60]">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Scaling <span className="text-primary">SMB</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10 text-white">
              <div 
                className="relative h-full py-2"
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
              >
                <Link 
                  href="/solutions"
                  className="flex items-center space-x-1 text-sm font-bold text-muted hover:text-white transition-all uppercase tracking-widest outline-none"
                >
                  <span>Solutions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180 text-primary' : ''}`} />
                </Link>

                <AnimatePresence>
                  {isSolutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] bg-[#1a1a1a] backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-2 grid grid-cols-1 gap-1"
                    >
                      {solutions.map((solution) => (
                        <Link
                          key={solution.name}
                          href={solution.href}
                          className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors group/item"
                        >
                          <div className="p-2 bg-primary/10 rounded-lg group-hover/item:bg-primary group-hover/item:text-white transition-colors text-primary">
                            <solution.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white mb-0.5">{solution.name}</p>
                            <p className="text-xs text-muted font-medium group-hover/item:text-white/70 transition-colors">{solution.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold text-muted hover:text-white transition-all relative group/link uppercase tracking-widest"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
                </Link>
              ))}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              >
                Get Free Audit
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative z-[60]">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile side drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] md:hidden"
              />
              
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-[#121212] z-[55] md:hidden flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-white/5"
              >
                <div className="flex-grow flex flex-col justify-center px-8 pt-20 pb-12 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Solutions Links */}
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 opacity-50">Solutions</p>
                      <div className="space-y-1">
                        {solutions.map((solution, idx) => (
                          <motion.div
                            key={solution.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                          >
                            <Link
                              href={solution.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 text-lg font-bold text-muted hover:text-primary transition-colors tracking-tight"
                            >
                              {solution.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Nav Links (Blog, Success Stories) */}
                    <div className="pt-6 border-t border-white/5">
                      <div className="space-y-4">
                        {navLinks.map((link, idx) => (
                          <motion.div
                            key={link.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className="block text-2xl font-black text-white hover:text-primary transition-colors tracking-tighter"
                            >
                              {link.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="pt-6"
                    >
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          setIsModalOpen(true);
                        }}
                        className="w-full py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20"
                      >
                        Get Free Audit
                      </button>
                    </motion.div>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="p-8 bg-white/[0.02] border-t border-white/5"
                >
                  <h4 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-6">Contact Us</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-muted">growth@scalingsmb.com</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-muted">+853 6275 0705</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Discover Your Scaling Potential"
      >
        <AuditForm onSuccess={() => setTimeout(() => setIsModalOpen(false), 3000)} />
      </Modal>
    </>
  );
}
