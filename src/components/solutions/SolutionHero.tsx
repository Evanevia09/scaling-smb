"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AuditForm from "@/components/AuditForm";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

interface SolutionHeroProps {
  service: string;
  industry: string;
  city: string;
}

export default function SolutionHero({ service, industry, city }: SolutionHeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase bg-primary/10 text-primary mb-8 border border-primary/20">
          <Sparkles className="w-3 h-3 mr-2" />
          Tailored Industry Engine
        </div>
        <h1 className="text-5xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          {service} FOR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary">
            {industry.toUpperCase()} IN {city.toUpperCase()}.
          </span>
        </h1>
        <p className="text-xl lg:text-2xl text-muted max-w-3xl font-medium leading-relaxed mb-12">
          Build a <span className="text-white font-bold">predictable stream of high-intent local customers</span> for your {industry.toLowerCase()} business in {city}. 
          Launched, optimized, and delivering results in 7 days.
        </p>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
        >
          LAUNCH {industry.toUpperCase()} AUDIT
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
        <div className="glass-card p-10 border-white/5 bg-white/[0.01]">
          <h2 className="text-3xl font-black mb-8 tracking-tight uppercase">Why {industry} in {city} <br />choose Scaling SMB.</h2>
          <div className="space-y-6">
            {[
              `Hyper-local targeting within 15 miles of ${city}.`,
              `${service} synchronization for ${industry.toLowerCase()} intent.`,
              "Guaranteed 7-day implementation and launch.",
              "Transparent ROI tracking and lead management."
            ].map((point, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="mt-1 p-1 rounded bg-primary/10">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <p className="text-muted font-medium leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full opacity-30" />
          <div className="relative glass-card aspect-video border-white/10 flex items-center justify-center">
             <TrendingUp className="w-20 h-20 text-primary opacity-20" />
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={`Custom ${industry} Audit`}
      >
        <AuditForm onSuccess={() => setTimeout(() => setIsModalOpen(false), 3000)} />
      </Modal>
    </>
  );
}
