"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight, Sparkles, TrendingUp, Users, Target } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const stories = [
  {
    client: "Elite Plumbing",
    industry: "Plumbing",
    result: "+240% Lead Volume",
    quote: "Scaling SMB built our engine in 6 days. We went from chasing leads to answering non-stop calls.",
    slug: "elite-plumbing-case-study",
    metrics: ["60% lower CPL", "12 new contracts/mo", "7-day implementation"]
  },
  {
    client: "Texas Roof Masters",
    industry: "Roofing",
    result: "4.2x ROI on Ads",
    quote: "The predictable acquisition system actually works. Our cost per lead dropped by 60% in the first month.",
    slug: "texas-roof-masters-case-study",
    metrics: ["4.2x Return on Spend", "Top 3 Map Pack", "Automated Routing"]
  },
  {
    client: "Bright Smile Dental",
    industry: "Healthcare",
    result: "85 New Patients/mo",
    quote: "We had a pretty site that did nothing. Now we have a machine that brings in high-value patients every day.",
    slug: "bright-smile-dental-case-study",
    metrics: ["85+ new leads/mo", "Sub-second load time", "Map Pack Dominance"]
  }
];

export default function SuccessStoriesPage() {
  return (
    <div className="relative overflow-hidden bg-[#121212] pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase bg-primary/10 text-primary mb-6 border border-primary/20">
            <TrendingUp className="w-3 h-3 mr-2" />
            Social Proof
          </div>
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter mb-8 leading-none">
            PROVEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">OUTCOMES.</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl font-medium leading-relaxed">
            Real data from real local businesses. No vanity metrics, just predictable customer acquisition engines that deliver measurable ROI.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {stories.map((story, idx) => (
            <motion.div
              key={story.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/success-stories/${story.slug}`} className="group block h-full">
                <div className="glass-card h-full p-10 border-white/5 hover:border-primary/20 transition-all flex flex-col relative overflow-hidden bg-white/[0.01]">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Quote className="w-16 h-16 text-white" />
                  </div>
                  
                  <div className="mb-8">
                    <div className="inline-flex items-center px-2 py-1 rounded bg-primary/10 text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                      {story.industry}
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2">{story.result}</h3>
                    <p className="text-lg font-bold text-muted">{story.client}</p>
                  </div>

                  <p className="text-white/70 italic mb-8 flex-grow">
                    &quot;{story.quote}&quot;
                  </p>

                  <div className="space-y-3 mb-8">
                    {story.metrics.map(m => (
                      <div key={m} className="flex items-center text-xs font-bold text-muted uppercase tracking-tight">
                        <Target className="w-3 h-3 mr-2 text-primary/50" />
                        {m}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-50 group-hover:opacity-100 transition-all group-hover:gap-4">
                    Full Case Study <ArrowRight className="ml-2 w-3 h-3" />
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
