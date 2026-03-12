import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-44 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20" ref={ref}>
        {/* Large outline text as background visual */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="absolute -top-16 md:-top-24 left-0 right-0 pointer-events-none select-none overflow-hidden text-center"
          >
            <span className="block font-display text-[clamp(5rem,15vw,14rem)] font-bold tracking-tighter leading-none outline-text-dim opacity-30">
              RELIABLE
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 pt-20 md:pt-28"
          >
            <div className="grid md:grid-cols-2 gap-12 items-end">
              <div>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                  Have confidence
                  <br />
                  in every
                  <br />
                  <span className="text-gradient">trade.</span>
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-text-secondary text-lg leading-relaxed">
                  Join thousands of serious investors who are already using 
                  WatchWise Data Brain to make better decisions.
                </p>
                <div>
                  <Link
                    to="/research"
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
