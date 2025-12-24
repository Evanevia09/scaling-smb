"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Target, BarChart3, Globe, Sparkles, Quote, Calendar, ChevronDown, HelpCircle } from "lucide-react";
import Link from "next/link";
import AuditForm from "@/components/AuditForm";
import CalendarModal from "@/components/CalendarModal";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Web Development",
    description: "High-performance, conversion-first websites built to turn visitors into customers.",
    icon: Globe,
    color: "blue",
    href: "/solutions/web-development"
  },
  {
    title: "Facebook Ads",
    description: "Hyper-targeted campaigns that generate demand and awareness in your local market.",
    icon: Target,
    color: "indigo",
    href: "/solutions/facebook-ads"
  },
  {
    title: "Google Ads",
    description: "Capture high-intent buyers exactly when they're searching for your services.",
    icon: Zap,
    color: "yellow",
    href: "/solutions/google-ads"
  },
  {
    title: "Local SEO",
    description: "Dominate the neighborhood search and the Google Maps Pack for long-term growth.",
    icon: BarChart3,
    color: "green",
    href: "/solutions/local-seo"
  }
];

const advantages = [
  {
    title: "7-Day Sprint",
    description: "From zero to launched in one week. No months of waiting or delays.",
    icon: Zap
  },
  {
    title: "AI-Enhanced Precision",
    description: "Leveraging proprietary AI workflows for flawless conversion architecture.",
    icon: Target
  },
  {
    title: "Zero Voodoo",
    description: "No fluff or vanity metrics. Just data-driven audits and predictable results.",
    icon: CheckCircle2
  }
];

const successStories = [
  {
    client: "Elite Plumbing",
    industry: "Plumbing",
    result: "+240% Lead Volume",
    quote: "Scaling SMB built our engine in 6 days. We went from chasing leads to answering non-stop calls.",
    color: "#3B82F6"
  },
  {
    client: "Texas Roof Masters",
    industry: "Roofing",
    result: "4.2x ROI on Ads",
    quote: "The predictable acquisition system actually works. Our cost per lead dropped by 60% in the first month.",
    color: "#10B981"
  }
];

const blogPreviews = [
  {
    title: "Why Local SMBs are switching to Lead-Gen sites in 2025",
    category: "Strategy",
    date: "May 12, 2024",
    slug: "why-local-smbs-switching-lead-gen-2025"
  },
  {
    title: "Dominating the Google Map Pack: A 7-Day Guide",
    category: "SEO",
    date: "May 10, 2024",
    slug: "dominating-google-map-pack-guide"
  }
];

const faqs = [
  {
    question: "How long does it really take to launch?",
    answer: "Our standard 'Acquisition Engine' (Web + SEO Foundation + Ads Setup) is launched in 5-7 business days. We use proprietary AI-enhanced workflows to bypass the typical agency delays."
  },
  {
    question: "Do I own the website and the assets?",
    answer: "Yes, 100%. Everything we build belongs to you. We don't hold your digital assets hostage. If you ever decide to leave, you take your 'Machine' with you."
  },
  {
    question: "How does the Free Growth Audit work?",
    answer: "It's a data-driven gap analysis. We scan your site speed, tracking pixels, local search rankings, and competitor ads. We then provide a clear blueprint showing exactly where you're losing money."
  },
  {
    question: "Is this suitable for my specific industry?",
    answer: "Scaling SMB is designed for local service-based businesses (Plumbers, Roofers, Dentists, HVAC, etc.) where 'intent to buy' is high and 'location' is the primary filter."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

export default function Home() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="relative overflow-hidden bg-[#121212]">
      {/* Dynamic Background */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-float delay-2000" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="max-w-7xl mx-auto text-center z-10 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-white/5 text-primary mb-8 border border-white/10"
            >
              <Sparkles className="w-3 h-3 mr-2" />
              Customer Acquisition Engine
            </motion.div>
            
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              SCALING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary animate-gradient">
                LOCAL GIANTS.
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              We build <span className="text-white font-bold">predictable customer acquisition systems</span> for local businesses. 
              Our data-driven engines bridge the performance gap, moving you from digital invisibility to 
              <span className="text-white font-bold"> local market dominance</span> in as little as 7 days.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => setIsAuditModalOpen(true)}
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(59,130,246,0.3)]"
              >
                GET FREE AUDIT
              </button>
              <button
                onClick={() => setIsCallModalOpen(true)}
                className="w-full sm:w-auto px-10 py-5 glass text-white rounded-2xl font-black text-lg hover:bg-white/5 transition-all flex items-center justify-center group"
              >
                BOOK A 30MINS CALL
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advantage Section */}
      <section id="machine" className="relative py-32 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {advantages.map((adv) => (
              <motion.div
                key={adv.title}
                variants={itemVariants}
                className="relative group text-white"
              >
                <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass-card border-none bg-white/[0.02] p-10 h-full flex flex-col items-start text-left">
                  <div className="p-4 bg-primary/10 rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-500">
                    <adv.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{adv.title}</h3>
                  <p className="text-muted leading-relaxed font-medium">{adv.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="services" className="relative py-32 px-4 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-8"
          >
            <div className="max-w-3xl">
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-none uppercase text-white">
                THE 4 PILLARS OF <br />
                <span className="text-primary">PREDICTABILITY.</span>
              </h2>
              <p className="text-xl text-muted leading-relaxed max-w-xl font-medium">
                We don&apos;t just manage channels; we integrate them into a singular customer acquisition machine.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="glass-card group flex flex-col md:flex-row gap-8 p-10 items-center hover:bg-white/[0.04] transition-all duration-500 text-white"
              >
                <div className="shrink-0 p-6 bg-primary/10 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-muted text-lg mb-8 leading-relaxed font-medium">{service.description}</p>
                  <Link href={service.href} className="inline-flex items-center text-sm font-black tracking-widest uppercase text-primary hover:gap-4 transition-all">
                    learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success" className="relative py-32 px-4 z-10 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 uppercase text-white">Proven Results.</h2>
            <p className="text-xl text-muted font-medium">Real outcomes for real local businesses using the Scaling SMB machine.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {successStories.map((story, idx) => (
              <motion.div
                key={story.client}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass-card p-12 border-white/5 relative overflow-hidden group text-white"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Quote className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-primary mb-6 border border-white/10">
                    {story.industry}
                  </div>
                  <h3 className="text-4xl font-black mb-2 text-white">{story.result}</h3>
                  <p className="text-xl font-bold text-muted mb-8">{story.client}</p>
                  <p className="text-lg italic text-white/80 leading-relaxed mb-8">
                    &quot;{story.quote}&quot;
                  </p>
                  <div className="w-full h-px bg-white/5 mb-8" />
                  <Link href="/success-stories" className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center group-hover:gap-4 transition-all">
                    View Case Study <ArrowRight className="ml-2 w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative py-32 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4 leading-none uppercase">Acquisition <br /><span className="text-primary">Insights.</span></h2>
              <p className="text-xl text-muted font-medium">The latest strategies for local market dominance.</p>
            </motion.div>
            <Link href="/blog" className="px-8 py-4 glass rounded-xl text-sm font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center group text-white">
              View All Posts <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPreviews.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer text-white"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="glass-card p-10 border-white/5 hover:border-primary/20 transition-all h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{post.category}</span>
                      <div className="flex items-center text-[10px] text-muted font-bold">
                        <Calendar className="w-3 h-3 mr-2 text-primary" />
                        {post.date}
                      </div>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black mb-6 group-hover:text-primary transition-colors leading-tight uppercase">
                      {post.title}
                    </h3>
                    <div className="mt-auto pt-8 flex items-center text-xs font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white transition-colors">
                      Read Article <ArrowRight className="ml-2 w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-32 px-4 z-10 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 text-white"
          >
            <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 uppercase">Common <br /><span className="text-primary">Questions.</span></h2>
            <p className="text-xl text-muted font-medium">Everything you need to know about the acquisition machine.</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card border-white/5 overflow-hidden p-0 text-white"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-8 flex items-center justify-between text-left group"
                >
                  <span className="text-xl lg:text-2xl font-bold tracking-tight pr-8">{faq.question}</span>
                  <div className={cn(
                    "p-2 rounded-full bg-white/5 transition-all duration-300",
                    activeFaq === idx ? "rotate-180 bg-primary/20 text-primary" : "group-hover:bg-white/10"
                  )}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-lg text-muted leading-relaxed border-t border-white/5 pt-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 z-10">
        <div className="max-w-5xl mx-auto text-white">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-card bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 p-12 lg:p-24 text-center border-primary/20"
          >
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-none uppercase">
              READY TO BRIDGE <br />THE PERFORMANCE GAP?
            </h2>
            <p className="text-xl text-muted mb-12 max-w-xl mx-auto font-medium">
              Get your free data-driven audit and see exactly where you&apos;re losing market share.
            </p>
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="px-12 py-6 bg-white text-black rounded-2xl font-black text-xl hover:bg-primary hover:text-white transition-all hover:scale-105 shadow-2xl"
            >
              LAUNCH AUDIT
            </button>
          </motion.div>
        </div>
      </section>

      <Modal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)}
        title="Digital Growth Audit"
      >
        <AuditForm onSuccess={() => setTimeout(() => setIsAuditModalOpen(false), 3000)} />
      </Modal>

      <Modal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        title="Book Your Strategy Call"
      >
        <CalendarModal onSuccess={() => setTimeout(() => setIsCallModalOpen(false), 3000)} />
      </Modal>
    </div>
  );
}
