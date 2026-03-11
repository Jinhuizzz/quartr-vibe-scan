import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Brain background — positioned right/center, bleeding off edge */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[70%] h-full">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover object-center opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-28 pb-12">
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

        {/* Center — Hero title, massive and asymmetric */}
        <div className="flex-1 flex items-center">
          <div className="w-full">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
              className="font-display font-bold tracking-[-0.04em] leading-[0.9]"
            >
              <span className="block text-[clamp(3.5rem,12vw,11rem)] text-foreground">
                Gain
              </span>
              <span className="block text-[clamp(3.5rem,12vw,11rem)] outline-text ml-[5vw]">
                after
              </span>
              <span className="block text-[clamp(3.5rem,12vw,11rem)] text-gradient ml-[10vw]">
                Gain
              </span>
            </motion.h1>
          </div>
        </div>

        {/* Bottom — Split: description left, CTA right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-sm">
            The proactive AI Agent powered by WatchWise Data Brain.
            Research faster. Understand deeper. Trust every finding.
          </p>
          <div className="flex items-center gap-3">
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
