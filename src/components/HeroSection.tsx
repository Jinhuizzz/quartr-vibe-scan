import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import InteractiveBrain from "@/components/InteractiveBrain";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Interactive brain canvas — full screen, centered */}
      <div className="absolute inset-0">
        <InteractiveBrain />
        {/* Softer overlay so brain is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-transparent to-background/35 pointer-events-none" />
      </div>

      {/* Text layers — interweaved with brain at different positions */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-28 pb-12 pointer-events-none">
        {/* Top — Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-text-dim text-xs uppercase tracking-[0.3em] font-mono">
            AI-Powered Research Platform
          </span>
        </motion.div>

        {/* Center — "Gain after Gain" at different layers */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* "Gain" — top-left, behind brain visually */}
          <motion.span
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.1, 0, 1] }}
            className="absolute top-[10%] left-[5%] md:left-[8%] font-display font-bold tracking-[-0.04em] leading-none text-[clamp(3rem,10vw,9rem)] text-foreground/90 mix-blend-screen"
          >
            Gain
          </motion.span>

          {/* "after" — center, overlapping with brain */}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0, 1] }}
            className="absolute top-[38%] left-[50%] -translate-x-1/2 font-display font-bold tracking-[-0.04em] leading-none text-[clamp(2.5rem,8vw,7rem)] outline-text opacity-60"
          >
            after
          </motion.span>

          {/* "Gain" — bottom-right, in front with gradient */}
          <motion.span
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.1, 0, 1] }}
            className="absolute bottom-[15%] right-[5%] md:right-[10%] font-display font-bold tracking-[-0.04em] leading-none text-[clamp(3rem,10vw,9rem)] text-gradient z-20"
          >
            Gain
          </motion.span>
        </div>

        {/* Bottom — Description and CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-sm">
            The proactive AI Agent powered by WatchWise Data Brain.
            Research faster. Understand deeper. Trust every finding.
          </p>
          <div className="flex items-center gap-3 pointer-events-auto">
            <Link
              to="/research"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-all"
            >
              Get Report
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/mira"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border/80 text-foreground font-medium text-sm hover:border-primary/50 hover:bg-surface-elevated transition-all"
            >
              Ask MIRA
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
