"use client";

import { motion, Variants } from "framer-motion";
import { Search, MousePointerClick, TrendingUp, Filter, Key, Zap, Target, ShieldCheck, CheckCircle2 } from "lucide-react";
import AuditForm from "@/components/AuditForm";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FeatureFocus from "@/components/marketing/FeatureFocus";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const performanceGaps = [
  {
    title: "The Click Drain",
    description: "Paying for generic keywords like 'plumber' instead of local, high-intent phrases like 'emergency plumber near me' wastes 30%+ of your budget.",
    icon: MousePointerClick
  },
  {
    title: "Low Quality Score",
    description: "Mismatch between your ad copy and your landing page causes Google to charge you more per click and lower your rank.",
    icon: TrendingUp
  },
  {
    title: "Blind Bidding",
    description: "Running broad match campaigns without a solid 'Negative Keyword' list means you're paying for clicks from people who aren't ready to buy.",
    icon: Filter
  }
];

const features = [
  {
    title: "High-Intent Keyword Mining",
    description: "We identify the exact search terms your customers use when they are ready to buy, not just when they are researching.",
    icon: Key
  },
  {
    title: "Dynamic Search Ads",
    description: "AI-powered ad variations that automatically adapt to what the user is searching for, increasing CTR by up to 2x.",
    icon: Zap
  },
  {
    title: "Landing Page Synchronization",
    description: "We ensure your landing page is perfectly aligned with your ad, leading to higher Quality Scores and lower costs.",
    icon: Target
  },
  {
    title: "Negative Keyword Shield",
    description: "Robust filters that block your ads from appearing on irrelevant searches, protecting every dollar of your budget.",
    icon: ShieldCheck
  }
];

const bullets = [
  "Real-Time Negative Keyword Filtering",
  "Dynamic Local Ad Extensions",
  "Cost-Per-Acquisition (CPA) Focus"
];

const industries = [
  { name: "Plumbers" },
  { name: "Roofers" },
  { name: "HVAC" },
  { name: "Dentists" },
  { name: "Boat Rentals" },
  { name: "Car Rentals" },
];

const steps = [
  {
    step: "01",
    title: "Inventory Audit",
    description: "We audit your current campaigns and identify the exact 'leaks' where your budget is being wasted on poor keywords."
  },
  {
    step: "02",
    title: "Search Machine Setup",
    description: "We build your new campaign structure focused on high-intent 'Buyer Keywords' and local Geo-targeting."
  },
  {
    step: "03",
    title: "Bidding Optimization",
    description: "We manage your bids in real-time to ensure you're always in the 'Sweet Spot' for maximum ROI."
  }
];

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

const transition = { duration: 0.6, ease: "easeOut" };

export default function GoogleAdsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative overflow-hidden bg-[#121212] pt-20">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-[#4285F4]/10 text-[#4285F4] mb-6 border border-[#4285F4]/20">
              <Search className="w-3 h-3 mr-2" />
              Google Ads
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-none uppercase">
              High-Intent <br />
              <span className="text-[#FBBC05]">Google Ads Strategy.</span>
            </h1>
            <p className="text-xl text-muted mb-10 leading-relaxed font-medium">
              We capture customers exactly when they are searching for your service. 
              No guesswork. Just high-intent leads delivered to your inbox in 7 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-[#4285F4] text-white rounded-xl font-bold hover:bg-[#4285F4]/90 transition-all shadow-lg shadow-[#4285F4]/20"
              >
                Audit My Google Ads
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#4285F4]/20 blur-[100px] rounded-full" />
            <div className="relative glass-card aspect-video flex flex-col p-6 border-white/10 overflow-hidden bg-[#121212]">
               <div className="flex items-center space-x-2 mb-6">
                 <div className="w-12 h-4 bg-white/10 rounded-full" />
                 <div className="flex-1 h-8 bg-white/5 border border-white/10 rounded-full flex items-center px-4">
                   <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                 </div>
               </div>
               <div className="space-y-6">
                 <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5">
                   <div className="flex items-center space-x-2 mb-2">
                     <span className="text-[10px] font-bold text-white/40 uppercase">Sponsored</span>
                     <div className="w-24 h-1 bg-[#4285F4] rounded-full" />
                   </div>
                   <div className="h-4 bg-white/20 rounded-full w-3/4 mb-3" />
                   <div className="h-2 bg-white/10 rounded-full w-full" />
                 </div>
                 <div className="p-4 opacity-30">
                   <div className="h-4 bg-white/10 rounded-full w-2/3 mb-3" />
                   <div className="h-2 bg-white/5 rounded-full w-full" />
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agitation Section */}
      <section className="py-24 bg-[#0d0d0d] px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              initial: fadeInUp.initial as any,
              visible: { ...fadeInUp.whileInView, transition } as any
            }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6 uppercase">
              Why most PPC campaigns fail.
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Paying for clicks is easy. Turning those clicks into phone calls is where most businesses lose the battle.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {performanceGaps.map((gap, idx) => (
              <motion.div
                key={gap.title}
                initial="initial"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  initial: fadeInUp.initial as any,
                  visible: { ...fadeInUp.whileInView, transition: { ...transition, delay: idx * 0.1 } } as any
                }}
                className="glass-card p-10 border-none bg-white/[0.02] hover:bg-white/[0.04]"
              >
                <gap.icon className="w-10 h-10 text-[#FBBC05] mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">{gap.title}</h3>
                <p className="text-muted leading-relaxed">{gap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeatureFocus 
        title="A Smarter PPC Engine."
        subtitle="Our Google Ads strategy is focused on 'Intent Capture'. We don't just buy traffic; we buy customers."
        features={features}
        bullets={bullets}
        accentColor="#4285F4"
      />

      <section className="py-24 bg-[#0d0d0d] px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              initial: fadeInUp.initial as any,
              visible: { ...fadeInUp.whileInView, transition } as any
            }}
            className="mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6 uppercase">GOOGLE ADS FOR <br /><span className="text-[#FBBC05] uppercase">YOUR INDUSTRY.</span></h2>
            <p className="text-muted text-lg max-w-xl font-medium">High-intent search campaigns tailored to your specific local service niche.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {industries.map((industry, idx) => (
              <motion.div
                key={industry.name}
                initial="initial"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  initial: fadeInUp.initial as any,
                  visible: { ...fadeInUp.whileInView, transition: { ...transition, delay: idx * 0.05 } } as any
                }}
                className="flex items-center justify-center px-4 py-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all group cursor-default"
              >
                <CheckCircle2 className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-100 transition-opacity text-[#FBBC05]" />
                <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors truncate">
                  {industry.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#121212] px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              initial: fadeInUp.initial as any,
              visible: { ...fadeInUp.whileInView, transition } as any
            }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6 uppercase">
              The 7-Day PPC Launch.
            </h2>
            <p className="text-muted text-lg">We move from audit to active lead generation in exactly one week.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0" />
            
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial="initial"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  initial: fadeInUp.initial as any,
                  visible: { ...fadeInUp.whileInView, transition: { ...transition, delay: idx * 0.2 } } as any
                }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#4285F4] flex items-center justify-center text-white font-black text-xl mb-8 shadow-xl shadow-[#4285F4]/20">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              initial: fadeInUp.initial as any,
              visible: { ...fadeInUp.whileInView, transition } as any
            }}
            className="glass-card bg-gradient-to-br from-[#4285F4]/20 via-transparent to-[#FBBC05]/10 p-12 lg:p-24 text-center border-[#4285F4]/20"
          >
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-none uppercase text-white">
              Ready to capture <br />market intent?
            </h2>
            <p className="text-xl text-muted mb-12 max-w-xl mx-auto font-medium">
              Our Free Google Ads Audit will show you exactly how much budget you&apos;re currently wasting and how to fix it.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-6 bg-white text-black rounded-2xl font-black text-xl hover:bg-[#4285F4] hover:text-white transition-all hover:scale-105 shadow-2xl"
            >
              LAUNCH PPC AUDIT
            </button>
          </motion.div>
        </div>
      </section>

      {/* Separate Breadcrumbs Section */}
      <section className="bg-[#0a0a0a] border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
        </div>
      </section>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Google Ads Gap Analysis"
      >
        <AuditForm onSuccess={() => setTimeout(() => setIsModalOpen(false), 3000)} />
      </Modal>
    </div>
  );
}
