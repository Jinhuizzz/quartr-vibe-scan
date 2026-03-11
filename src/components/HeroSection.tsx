import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Content — centered */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6">
            Gain after
            <br />
            <span className="text-gradient">Gain</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-lg">
            The proactive AI Agent powered by WatchWise Data Brain.
            Research faster, understand deeper, and trust every finding.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors"
            >
              Get Report
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/mira"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-surface-elevated transition-colors"
            >
              Ask MIRA
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-dim text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-text-dim to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
