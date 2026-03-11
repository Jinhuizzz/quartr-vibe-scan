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
      </div>

      {/* Text layers fused with brain */}
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

        {/* Center — "Gain after Gain" wrapping around the brain */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Back layer "GAIN" — large, behind brain, top-left */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
            className="absolute z-0 select-none"
            style={{
              top: "8%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "clamp(4rem, 14vw, 13rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.85,
              WebkitTextStroke: "1.5px hsl(var(--foreground) / 0.15)",
              color: "transparent",
            }}
          >
            GAIN
          </motion.span>

          {/* "after" — small, sits at brain center, overlapping */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0, 1] }}
            className="absolute z-30 select-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(0.9rem, 2vw, 1.6rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "hsl(var(--foreground) / 0.5)",
            }}
          >
            after
          </motion.span>

          {/* Front layer "GAIN" — bold, in front of brain, bottom */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.1, 0, 1] }}
            className="absolute z-20 select-none text-gradient"
            style={{
              bottom: "8%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "clamp(4rem, 14vw, 13rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.85,
            }}
          >
            GAIN
          </motion.span>

          {/* Subtle glow ring behind the brain to tie text + model together */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
            className="absolute z-[1] rounded-full pointer-events-none"
            style={{
              width: "min(55vw, 500px)",
              height: "min(55vw, 500px)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, hsl(var(--glow) / 0.08) 0%, transparent 70%)",
            }}
          />
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
