"use client";

import { motion, Variants } from "framer-motion";
import { Layout, Gauge, Search, MousePointerClick, Code2, Server, Globe2, BellRing, ArrowRight, CheckCircle2 } from "lucide-react";
import AuditForm from "@/components/AuditForm";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FeatureFocus from "@/components/marketing/FeatureFocus";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const performanceGaps = [
  {
    title: "The Speed Trap",
    description: "Most local sites load in 4+ seconds, losing 53% of mobile visitors before the first image even appears.",
    icon: Gauge
  },
  {
    title: "Conversion Ghosting",
    description: "Beautiful designs that lack 'Conversion Architecture' fail to guide users toward the phone call or form submission.",
    icon: MousePointerClick
  },
  {
    title: "The Invisible Wall",
    description: "Sites built without modern SEO schema are invisible to Google's local search algorithm, no matter how good they look.",
    icon: Search
  }
];

const features = [
  {
    title: "Conversion-First Architecture",
    description: "Every pixel is placed with one goal: turning a stranger into a lead. We optimize the path to purchase.",
    icon: Code2
  },
  {
    title: "Ultra-Fast Edge Delivery",
    description: "Built on Next.js 15 for sub-second load times. Speed isn&apos;t just a luxury; it&apos;s a ranking factor.",
    icon: Server
  },
  {
    title: "Local SEO Integration",
    description: "Deep-linking and schema markup are baked into the code, not added as an afterthought.",
    icon: Globe2
  },
  {
    title: "Automated Lead Routing",
    description: "Instant notification systems that ensure you never let a hot lead go cold.",
    icon: BellRing
  }
];

const bullets = [
  "Lighthouse Score 90+ Guaranteed",
  "Mobile-First Conversion UI",
  "Integrated Local Schema"
];

const industries = [
  { name: "Plumbers", slug: "web-dev-plumbers-miami" },
  { name: "Roofers", slug: "web-dev-roofers-austin" },
  { name: "HVAC", slug: "web-dev-hvac-houston" },
  { name: "Dentists", slug: "web-dev-dentists-dallas" },
  { name: "Boat Rentals", slug: "web-dev-boat-rentals-miami" },
  { name: "Car Rentals", slug: "web-dev-car-rentals-vegas" },
];

const steps = [
  {
    step: "01",
    title: "Blueprint & Audit",
    description: "We analyze your local competitors and map out the exact conversion path your customers expect."
  },
  {
    step: "02",
    title: "The 7-Day Build",
    description: "Our proprietary AI-workflow allows us to build, test, and launch your high-performance engine in 168 hours."
  },
  {
    step: "03",
    title: "Optimization Loop",
    description: "We don&apos;t just launch and leave. We monitor heatmaps and conversion data to bridge every performance gap."
  }
];

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

const transition = { duration: 0.6, ease: "easeOut" };

export default function WebDevPage() {
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
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-primary/10 text-primary mb-6 border border-primary/20">
              <Layout className="w-3 h-3 mr-2" />
              Web Development
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-none uppercase">
              Web Development <br />
              <span className="text-primary">Designed to Scale.</span>
            </h1>
            <p className="text-xl text-muted mb-10 leading-relaxed font-medium">
              We don&apos;t just build websites; we integrate them into your 7-day acquisition machine 
              to ensure every click has a purpose and every visitor has a path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Audit My Web Setup
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <div className="relative glass-card aspect-video flex items-center justify-center border-white/10 overflow-hidden group text-white">
               <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02] flex flex-col p-6">
                 <div className="flex items-center space-x-2 mb-8">
                   <div className="w-3 h-3 rounded-full bg-red-500/50" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                   <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 </div>
                 <div className="space-y-4">
                   <div className="h-8 bg-white/10 rounded-lg w-3/4 animate-pulse" />
                   <div className="h-4 bg-white/5 rounded-lg w-full animate-pulse delay-75" />
                   <div className="h-4 bg-white/5 rounded-lg w-5/6 animate-pulse delay-150" />
                   <div className="grid grid-cols-3 gap-4 pt-8">
                     <div className="aspect-square bg-primary/20 rounded-xl animate-pulse" />
                     <div className="aspect-square bg-primary/20 rounded-xl animate-pulse delay-75" />
                     <div className="aspect-square bg-primary/20 rounded-xl animate-pulse delay-150" />
                   </div>
                 </div>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
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
            className="text-center mb-20 text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6 uppercase">
              Why most local sites fail.
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              A pretty website is a liability if it doesn&apos;t convert. We fix the three major gaps that drain your marketing budget.
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
                className="glass-card p-10 border-none bg-white/[0.02] hover:bg-white/[0.04] text-white"
              >
                <gap.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">{gap.title}</h3>
                <p className="text-muted leading-relaxed">{gap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeatureFocus 
        title="A Smarter Approach to Web."
        subtitle="We built our framework around the specific needs of local businesses: speed, trust, and frictionless lead generation."
        features={features}
        bullets={bullets}
        accentColor="#3B82F6"
      />

      <section className="py-24 bg-[#0d0d0d] px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              initial: fadeInUp.initial as any,
              visible: { ...fadeInUp.whiteInView, transition } as any
            }}
            className="mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6 uppercase text-white">WEB DEV FOR <br /><span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase">YOUR INDUSTRY.</span></h2>
            <p className="text-muted text-lg max-w-xl font-medium">Industry-specific web engines optimized for your local service area.</p>
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
                className="flex items-center justify-center px-4 py-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all group cursor-default text-white"
              >
                <CheckCircle2 className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-100 transition-opacity text-primary" />
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
            className="text-center mb-20 text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6 uppercase">
              The 7-Day Web Sprint.
            </h2>
            <p className="text-muted text-lg">From zero to a high-converting acquisition engine in one week.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative text-white">
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
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl mb-8 shadow-xl shadow-primary/20">
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
            className="glass-card bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 p-12 lg:p-24 text-center border-primary/20 text-white"
          >
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-none uppercase">
              Ready to fix <br />your web gaps?
            </h2>
            <p className="text-xl text-muted mb-12 max-w-xl mx-auto font-medium">
              Our Free Web Audit will show you exactly where you&apos;re losing customers and how to bridge the gap.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-6 bg-white text-black rounded-2xl font-black text-xl hover:bg-primary hover:text-white transition-all hover:scale-105 shadow-2xl"
            >
              LAUNCH WEB AUDIT
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
        title="Web Conversion Audit"
      >
        <AuditForm onSuccess={() => setTimeout(() => setIsModalOpen(false), 3000)} />
      </Modal>
    </div>
  );
}
