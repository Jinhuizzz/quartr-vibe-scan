import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const DataBrainSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="max-w-screen-xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — Terminal mock */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="surface-card overflow-hidden glow-md">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-text-dim text-xs font-mono ml-2">
                  watchwise_data_brain — intelligence_engine
                </span>
              </div>
              {/* Content */}
              <div className="p-5 font-mono text-xs leading-relaxed space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">●</span>
                  <span className="text-text-dim">LIVE</span>
                  <span className="text-text-secondary">Learning Session</span>
                </div>
                <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "91.1%" }} />
                </div>
                <p className="text-text-secondary">
                  Analyzing financial markets continuously. Absorbed knowledge from{" "}
                  <span className="text-foreground font-medium">85,900</span> research reports.
                  Processed{" "}
                  <span className="text-foreground font-medium">4.6M+</span> text passages,{" "}
                  <span className="text-foreground font-medium">7.4M+</span> numerical datasets.
                </p>
                <p className="text-text-dim">
                  Progress: <span className="text-primary">91.1%</span> — depth & breadth of financial knowledge internalized.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">
              Data Brain
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Access to the Top Financial Analyst's Brain
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Backed by Wall Street consultants with decades of quantamental experience. 
              It reasons like a human, powered by proprietary algorithms. We don't just 
              move data — we transform it into intelligence.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "85K+", label: "Reports" },
                { value: "4.6M+", label: "Text Passages" },
                { value: "7.4M+", label: "Data Points" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
                  <div className="text-text-dim text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DataBrainSection;
