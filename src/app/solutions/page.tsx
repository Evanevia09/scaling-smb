"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layout, Users, Search, MapIcon } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const coreSolutions = [
  { 
    name: "Web Development", 
    href: "/solutions/web-development", 
    icon: Layout, 
    desc: "Conversion-first engineering for high-growth businesses.",
    color: "#3B82F6"
  },
  { 
    name: "Facebook Ads", 
    href: "/solutions/facebook-ads", 
    icon: Users, 
    desc: "Targeted demand generation and social local dominance.",
    color: "#1877F2"
  },
  { 
    name: "Google Ads", 
    href: "/solutions/google-ads", 
    icon: Search, 
    desc: "Intent-based acquisition for immediate lead flow.",
    color: "#FBBC05"
  },
  { 
    name: "Local SEO", 
    href: "/solutions/local-seo", 
    icon: MapIcon, 
    desc: "Neighborhood authority and Map Pack optimization.",
    color: "#34A853"
  },
];

const industryPlaceholders = [
  { industry: "Plumbers", service: "Google Ads", city: "Miami", slug: "google-ads-plumbers-miami" },
  { industry: "Roofers", service: "Facebook Ads", city: "Austin", slug: "facebook-ads-roofers-austin" },
  { industry: "HVAC", service: "Local SEO", city: "Houston", slug: "local-seo-hvac-houston" },
  { industry: "Dentists", service: "Web Development", city: "Dallas", slug: "web-dev-dentists-dallas" },
];

export default function SolutionsPage() {
  return (
    <div className="relative overflow-hidden bg-[#121212] pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase bg-primary/10 text-primary mb-6 border border-primary/20">
            <Sparkles className="w-3 h-3 mr-2" />
            The Acquisition Library
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-none">
            SCALABLE <br />
            <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SOLUTIONS.</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl font-medium leading-relaxed">
            Explore our high-performance acquisition engines tailored for local industry dominance. 
            From core infrastructure to hyper-local search coverage.
          </p>
        </motion.div>

        {/* Core Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {coreSolutions.map((solution, idx) => (
            <motion.div
              key={solution.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={solution.href} className="group block h-full">
                <div className="glass-card h-full p-8 border-white/5 hover:border-primary/30 transition-all flex flex-col items-start bg-white/[0.02]">
                  <div 
                    className="p-3 rounded-xl mb-6 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${solution.color}1a` }}
                  >
                    <solution.icon className="w-6 h-6" style={{ color: solution.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{solution.name}</h3>
                  <p className="text-sm text-muted mb-8 flex-grow">{solution.desc}</p>
                  <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-2 transition-all">
                    View Framework <ArrowRight className="ml-2 w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Industry Spokes Section (Placeholders) */}
        <div className="pt-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4">SPECIFIC INDUSTRIES.</h2>
              <p className="text-muted font-medium">Dynamically generated acquisition spokes for local niche dominance.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryPlaceholders.map((spoke, idx) => (
              <motion.div
                key={spoke.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={`/solutions/${spoke.slug}`} className="group block">
                  <div className="p-6 rounded-2xl border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 opacity-50">{spoke.service}</p>
                    <h4 className="text-lg font-bold text-white mb-1">For {spoke.industry}</h4>
                    <p className="text-xs text-muted font-medium mb-4">in {spoke.city}</p>
                    <div className="w-full h-px bg-white/5 group-hover:bg-primary/20 transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumbs Section */}
      <section className="bg-[#0a0a0a] border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
        </div>
      </section>
    </div>
  );
}
