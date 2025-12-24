"use client";

import { motion, Variants } from "framer-motion";
import { Sparkles, MessageSquare, PieChart, MousePointer2, Users, Target, UserPlus, Zap, Activity, CheckCircle2 } from "lucide-react";
import AuditForm from "@/components/AuditForm";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FeatureFocus from "@/components/marketing/FeatureFocus";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const performanceGaps = [
  {
    title: "The Budget Burn",
    description: "Targeting 'broad' interests instead of local high-intent behaviors leads to 40% waste in ad spend.",
    icon: PieChart
  },
  {
    title: "Static Creatives",
    description: "Using generic stock photos instead of local, authentic content results in high scroll-past rates and low engagement.",
    icon: MessageSquare
  },
  {
    title: "Pixel Blindness",
    description: "Running ads without a properly configured Conversions API (CAPI) means Facebook is 'guessing' who your buyers are.",
    icon: MousePointer2
  }
];

const features = [
  {
    title: "Hyper-Local Targeting",
    description: "We don't just target 'interest'. We target ZIP codes and behavioral data specific to your local service area.",
    icon: Target
  },
  {
    title: "UGC & Authentic Creatives",
    description: "We help you deploy high-performing 'User Generated Content' styles that feel native to the feed, not like an ad.",
    icon: UserPlus
  },
  {
    title: "Full-Funnel Retargeting",
    description: "We follow up with interested prospects who didn't convert, keeping your brand top-of-mind until they're ready.",
    icon: Zap
  },
  {
    title: "Advanced CAPI Integration",
    description: "Deep technical setup to ensure Facebook's algorithm gets 100% accurate conversion data for better optimization.",
    icon: Activity
  }
];

const bullets = [
  "Cost-Per-Lead (CPL) Optimization",
  "Local Market Audience Mining",
  "Real-Time ROI Dashboard"
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
    title: "Audience Mining",
    description: "We identify your most profitable customer segments within a 15-mile radius of your business."
  },
  {
    step: "02",
    title: "The Creative Engine",
    description: "We launch dynamic ad variations to find the 'Winner' that generates the lowest Cost Per Lead (CPL)."
  },
  {
    step: "03",
    title: "Scaling & Integration",
    description: "Once we hit your target ROI, we integrate the campaign into your 7-day acquisition machine for steady growth."
  }
];

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

const transition = { duration: 0.6, ease: "easeOut" };

export default function FacebookAdsPage() {
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
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-[#1877F2]/10 text-[#1877F2] mb-6 border border-[#1877F2]/20">
              <Users className="w-3 h-3 mr-2" />
              Facebook Ads
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-none uppercase">
              Local Facebook Ads <br />
              <span className="text-[#1877F2]">Built to Convert.</span>
            </h1>
            <p className="text-xl text-muted mb-10 leading-relaxed font-medium">
              We don&apos;t just manage ads; we build demand-generation systems. 
              Turn social scrolling into steady customer flow in just 7 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-[#1877F2] text-white rounded-xl font-bold hover:bg-[#1877F2]/90 transition-all shadow-lg shadow-[#1877F2]/20"
              >
                Audit My FB Campaign
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#1877F2]/20 blur-[100px] rounded-full" />
            <div className="relative glass-card aspect-[9/16] max-w-[300px] mx-auto flex flex-col p-4 border-white/10 overflow-hidden bg-black">
               <div className="flex items-center space-x-2 mb-4">
                 <div className="w-8 h-8 rounded-full bg-white/10" />
                 <div className="flex-1">
                   <div className="h-2 bg-white/20 rounded-full w-24 mb-1" />
                   <div className="h-1 bg-white/10 rounded-full w-12" />
                 </div>
               </div>
               <div className="flex-1 bg-gradient-to-br from-white/10 to-white/5 rounded-lg mb-4 flex items-center justify-center">
                 <Sparkles className="w-12 h-12 text-[#1877F2]/40" />
               </div>
               <div className="space-y-2 mb-4">
                 <div className="h-2 bg-white/20 rounded-full w-full" />
                 <div className="h-2 bg-white/20 rounded-full w-3/4" />
               </div>
               <div className="h-10 bg-[#1877F2] rounded-lg flex items-center justify-between px-4">
                 <span className="text-[10px] font-bold text-white uppercase">Learn More</span>
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
              Why Meta Ads fail local businesses.
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Most agencies &apos;boost posts&apos; and hope for the best. We build conversion-first architectures that capture high-intent demand.
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
                <gap.icon className="w-10 h-10 text-[#1877F2] mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">{gap.title}</h3>
                <p className="text-muted leading-relaxed">{gap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeatureFocus 
        title="Predictable Social Acquisition."
        subtitle="Stop guessing and start growing. Our Facebook Ads strategy is built on data, local market knowledge, and relentless testing."
        features={features}
        bullets={bullets}
        accentColor="#1877F2"
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
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6 uppercase text-[#1877F2]">FB ADS FOR <br /><span className="text-white uppercase">YOUR INDUSTRY.</span></h2>
            <p className="text-muted text-lg max-w-xl font-medium">Industry-specific ad campaigns optimized for local demand generation.</p>
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
                <CheckCircle2 className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-100 transition-opacity text-[#1877F2]" />
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
              The 7-Day Creative Sprint.
            </h2>
            <p className="text-muted text-lg">We move from concept to live, high-performing ads in just one week.</p>
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
                <div className="w-16 h-16 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-black text-xl mb-8 shadow-xl shadow-[#1877F2]/20">
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
            className="glass-card bg-gradient-to-br from-[#1877F2]/20 via-transparent to-[#1877F2]/10 p-12 lg:p-24 text-center border-[#1877F2]/20"
          >
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-none uppercase text-white">
              Ready to scale <br />your social reach?
            </h2>
            <p className="text-xl text-muted mb-12 max-w-xl mx-auto font-medium">
              Our Free Facebook Ads Audit will analyze your current performance and show you exactly where you&apos;re losing money.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-6 bg-white text-black rounded-2xl font-black text-xl hover:bg-[#1877F2] hover:text-white transition-all hover:scale-105 shadow-2xl"
            >
              LAUNCH ADS AUDIT
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
        title="FB Ads Performance Audit"
      >
        <AuditForm onSuccess={() => setTimeout(() => setIsModalOpen(false), 3000)} />
      </Modal>
    </div>
  );
}
