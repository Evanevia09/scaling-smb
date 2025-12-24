"use client";

import { motion, Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface IndustryPillsProps {
  industries: { name: string }[];
  accentColor?: string;
  title: string;
  subtitle: string;
}

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};

const transition = { duration: 0.5, ease: "easeOut" };

export default function IndustryPills({ industries, accentColor = "var(--primary)", title, subtitle }: IndustryPillsProps) {
  return (
    <section className="py-24 bg-[#0d0d0d] px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            initial: fadeInUp.initial as any,
            whileInView: { ...fadeInUp.whileInView, transition } as any
          }}
          className="mb-12 text-center lg:text-left"
        >
          <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4 uppercase leading-none text-white">
            {title}
          </h2>
          <p className="text-muted text-sm lg:text-base max-w-xl font-medium">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {industries.map((industry, idx) => (
            <motion.div
              key={industry.name}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                initial: fadeInUp.initial as any,
                whileInView: { ...fadeInUp.whileInView, transition: { ...transition, delay: idx * 0.05 } } as any
              }}
              className="flex items-center justify-center px-4 py-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all group cursor-default"
            >
              <CheckCircle2 className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: accentColor }} />
              <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors truncate">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
