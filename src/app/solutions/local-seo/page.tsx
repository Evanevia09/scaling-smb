"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, Search, Star, Phone, Map, Newspaper, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import AuditForm from "@/components/AuditForm";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FeatureFocus from "@/components/marketing/FeatureFocus";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const performanceGaps = [
  {
    title: "The Map Pack Void",
    description: "64% of local customers use Google Maps to find businesses. If you aren't in the top 3, you are effectively invisible.",
    icon: MapPin
  },
  {
    title: "Keyword Irrelevance",
    description: "Ranking for national terms doesn't pay the bills. We focus on 'service + city' keywords that actually generate local calls.",
    icon: Search
  },
  {
    title: "Trust Deficiency",
    description: "Missing local citations and inconsistent business data (NAP) signals to Google that your business is unreliable.",
    icon: Star
  }
];

const features = [
  {
    title: "Map Pack Dominance",
    description: "We optimize your Google Business Profile to climb the local rankings and stay in the 'Golden 3' map pack.",
    icon: Map
  },
  {
    title: "Hyper-Local Content",
    description: "We create industry-specific landing pages for every city you serve, blanketing your local market in search results.",
    icon: Newspaper
  },
  {
    title: "Citation & NAP Cleanup",
    description: "We audit and synchronize your Name, Address, and Phone data across the web to build massive authority.",
    icon: ShieldCheck
  },
  {
    title: "Local Schema Markup",
    description: "We inject advanced JSON-LD code into your site to tell Google exactly what area you serve and what you offer.",
    icon: Zap
  }
];

const bullets = [
  "Google Map Pack Optimization",
  "Multi-City Hub Page Strategy",
  "Automated Citation Syncing"
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
    title: "Local Gap Analysis",
    description: "We audit your GBP and local citations against your top 3 competitors to find the 'Authority Gap'."
  },
  {
    step: "02",
    title: "The Foundation Build",
    description: "We clean up your local data and optimize your site architecture for city-specific keywords."
  },
  {
    step: "03",
    title: "Authority Scaling",
    description: "We deploy our city-hub content engine to expand your search footprint across your entire service area."
  }
];

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

const transition = { duration: 0.6, ease: "easeOut" };

export default function LocalSEOPage() {
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
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-[#34A853]/10 text-[#34A853] mb-6 border border-[#34A853]/20">
              <MapPin className="w-3 h-3 mr-2" />
              Local SEO
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-none uppercase">
              Dominate the <br />
              <span className="text-[#34A853]">Neighborhood Search.</span>
            </h1>
            <p className="text-xl text-muted mb-10 leading-relaxed font-medium">
              We move your business from digital invisibility to the top of Google Maps. 
              Be the first business your local customers see when they need help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-[#34A853] text-white rounded-xl font-bold hover:bg-[#34A853]/90 transition-all shadow-lg shadow-[#34A853]/20"
              >
                Audit My Local Rank
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#34A853]/20 blur-[100px] rounded-full" />
            <div className="relative glass-card flex flex-col p-6 border-white/10 overflow-hidden bg-[#121212]">
               <div className="flex items-center space-x-2 mb-6 border-b border-white/5 pb-4">
                 <div className="w-4 h-4 rounded-full bg-red-500/80" />
                 <div className="h-2 bg-white/20 rounded-full w-32" />
               </div>
               <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className={`p-3 rounded-xl border flex items-center justify-between transition-all ${i === 1 ? 'bg-[#34A853]/10 border-[#34A853]/30' : 'bg-white/[0.02] border-white/5 opacity-50'}`}>
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-xs">
                          {i}
                        </div>
                        <div>
                          <div className={`h-2 rounded-full w-24 mb-2 ${i === 1 ? 'bg-[#34A853]' : 'bg-white/20'}`} />
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-2 h-2 ${i === 1 ? 'text-yellow-500 fill-yellow-500' : 'text-white/10'}`} />)}
                          </div>
                        </div>
                     </div>
                     <Phone className={`w-4 h-4 ${i === 1 ? 'text-[#34A853]' : 'text-white/10'}`} />
                   </div>
                 ))}
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
              Why most local SEO fails.
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Ranking for &apos;plumbing&apos; doesn&apos;t matter if you aren&apos;t ranking in your own city. We fix the local signals that Google uses to rank you.
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
                <gap.icon className="w-10 h-10 text-[#34A853] mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">{gap.title}</h3>
                <p className="text-muted leading-relaxed">{gap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeatureFocus 
        title="A Smarter Local Engine."
        subtitle="We don&apos;t just track keywords. We track &apos;Proximity Dominance&apos;. Our goal is to make you the undeniable choice in your service area."
        features={features}
        bullets={bullets}
        accentColor="#34A853"
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
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6 uppercase text-[#34A853]">LOCAL SEO FOR <br /><span className="text-white uppercase">YOUR INDUSTRY.</span></h2>
            <p className="text-muted text-lg max-w-xl font-medium">Industry-specific map pack dominance strategies for local service businesses.</p>
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
                <CheckCircle2 className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-100 transition-opacity text-[#34A853]" />
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
              The 7-Day SEO Sprint.
            </h2>
            <p className="text-muted text-lg">We build your local foundation and start the authority scaling in just one week.</p>
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
                <div className="w-16 h-16 rounded-full bg-[#34A853] flex items-center justify-center text-white font-black text-xl mb-8 shadow-xl shadow-[#34A853]/20">
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
            className="glass-card bg-gradient-to-br from-[#34A853]/20 via-transparent to-[#34A853]/10 p-12 lg:p-24 text-center border-[#34A853]/20"
          >
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-none uppercase text-white">
              Ready to own <br />your neighborhood?
            </h2>
            <p className="text-xl text-muted mb-12 max-w-xl mx-auto font-medium">
              Our Free Local SEO Audit will show you exactly where you rank in your neighborhood and what it will take to be #1.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-6 bg-white text-black rounded-2xl font-black text-xl hover:bg-[#34A853] hover:text-white transition-all hover:scale-105 shadow-2xl"
            >
              LAUNCH SEO AUDIT
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
        title="Local Authority Audit"
      >
        <AuditForm onSuccess={() => setTimeout(() => setIsModalOpen(false), 3000)} />
      </Modal>
    </div>
  );
}
