import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-40 md:py-56 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20" ref={ref}>
        <div className="relative">
          {/* Background giant text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2 }}
            className="absolute -top-20 md:-top-32 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap"
          >
            <span className="font-display text-[clamp(6rem,18vw,16rem)] font-bold tracking-[0.15em] leading-none outline-text-dim opacity-20">
              RELIABLE
            </span>
          </motion.div>

          {/* Content centered */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10 pt-24 md:pt-36 flex flex-col items-center text-center"
          >
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
              Have confidence
              <br />
              in every <span className="text-gradient">trade.</span>
            </h2>

            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-lg mb-10">
              Join thousands of serious investors who are already using
              WatchWise Data Brain to make better decisions.
            </p>

            <Link
              to="/research"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
