"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Sparkles, Newspaper, Search, Filter } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const categories = ["All", "Strategy", "SEO", "Ads", "Web Dev"];

const blogPosts = [
  {
    title: "Why Local SMBs are switching to Lead-Gen sites in 2025",
    category: "Strategy",
    date: "May 12, 2024",
    slug: "why-local-smbs-switching-lead-gen-2025",
    excerpt: "The traditional brochure website is dead. Discover why local giants are moving towards conversion-first engineering."
  },
  {
    title: "Dominating the Google Map Pack: A 7-Day Guide",
    category: "SEO",
    date: "May 10, 2024",
    slug: "dominating-google-map-pack-guide",
    excerpt: "Everything you need to know about climbing the local search rankings without paying for expensive clicks."
  },
  {
    title: "The Facebook Ads Gap: Why your campaigns are burning budget",
    category: "Ads",
    date: "May 08, 2024",
    slug: "facebook-ads-budget-gap",
    excerpt: "Are you paying for likes or for leads? We break down the technical errors most agencies make in social ads."
  },
  {
    title: "Automated Lead Routing: The secret to 100% ROI",
    category: "Strategy",
    date: "May 05, 2024",
    slug: "automated-lead-routing-secret",
    excerpt: "How to ensure every hot lead is contacted within 5 minutes, significantly increasing your closing rate."
  }
];

export default function BlogPage() {
  return (
    <div className="relative overflow-hidden bg-[#121212] pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase bg-primary/10 text-primary mb-6 border border-primary/20">
            <Newspaper className="w-3 h-3 mr-2" />
            Acquisition Library
          </div>
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter mb-8 leading-none">
            INSIGHTS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase">FOR GROWTH.</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl font-medium leading-relaxed">
            Relentless data and high-performance strategies for local market dominance.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 border-y border-white/5 py-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button 
                key={cat}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${cat === "All" ? "bg-primary text-white" : "glass text-muted hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="SEARCH INSIGHTS..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="glass-card p-10 border-white/5 hover:border-primary/20 transition-all h-full flex flex-col bg-white/[0.01]">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{post.category}</span>
                    <div className="flex items-center text-[10px] text-muted font-bold">
                      <Calendar className="w-3 h-3 mr-2" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black mb-6 group-hover:text-primary transition-colors leading-tight uppercase">
                    {post.title}
                  </h3>
                  <p className="text-muted leading-relaxed font-medium mb-10 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="pt-8 border-t border-white/5 flex items-center text-xs font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white transition-colors">
                    Read Analysis <ArrowRight className="ml-2 w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Navigation */}
        <section className="mt-20 pt-12 border-t border-white/5">
          <Breadcrumbs />
        </section>
      </div>
    </div>
  );
}
