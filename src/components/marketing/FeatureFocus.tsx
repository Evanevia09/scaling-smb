"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { LucideIcon, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FeatureFocusProps {
  features: Feature[];
  title: string;
  subtitle: string;
  bullets?: string[];
  accentColor?: string;
}

export default function FeatureFocus({ 
  features, 
  title, 
  subtitle, 
  bullets = [],
  accentColor = "var(--primary)" 
}: FeatureFocusProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % features.length);
  }, [features.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  }, [features.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
      filter: "blur(4px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
      filter: "blur(4px)"
    })
  };

  return (
    <section 
      className="py-24 px-4 bg-[#121212] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Content Side */}
        <div className="space-y-8 lg:space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl lg:text-7xl font-black tracking-tighter mb-6 lg:mb-8 leading-none uppercase">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i === title.split(' ').length - 1 ? "text-primary" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h2>
            <p className="text-lg lg:text-xl text-muted leading-relaxed font-medium max-w-lg mb-8">
              {subtitle}
            </p>

            {/* Bullet Points */}
            <div className="space-y-4">
              {bullets.map((bullet, i) => (
                <div key={i} className="flex items-center space-x-3 text-white font-bold">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-sm lg:text-base">{bullet}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Carousel Side */}
        <div className="relative">
          <div className="relative h-[400px] sm:h-[450px] w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  filter: { duration: 0.4 }
                }}
                className="absolute inset-0 glass-card p-10 lg:p-14 flex flex-col justify-center border-white/10 bg-white/[0.03]"
                style={{ 
                  boxShadow: `0 20px 60px -12px ${accentColor}33`
                }}
              >
                <div 
                  className="p-5 rounded-2xl w-fit mb-10 transition-transform duration-500"
                  style={{ backgroundColor: `${accentColor}1a` }}
                >
                  {(() => {
                    const Icon = features[activeIndex].icon;
                    return <Icon className="w-10 h-10" style={{ color: accentColor }} />;
                  })()}
                </div>
                <h3 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight">{features[activeIndex].title}</h3>
                <p className="text-muted text-lg lg:text-xl leading-relaxed font-medium">{features[activeIndex].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className="p-1 group outline-none"
                >
                  <motion.div
                    animate={{
                      width: activeIndex === idx ? 32 : 8,
                      backgroundColor: activeIndex === idx ? accentColor : "rgba(255, 255, 255, 0.1)",
                    }}
                    className="h-1.5 rounded-full transition-all duration-300 group-hover:bg-white/20"
                  />
                </button>
              ))}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="p-4 rounded-xl glass hover:bg-white/5 border border-white/5 transition-all outline-none"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="p-4 rounded-xl glass hover:bg-white/5 border border-white/5 transition-all outline-none"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
