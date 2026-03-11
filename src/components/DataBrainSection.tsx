import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "85,900", suffix: "+", label: "Research Reports Analyzed" },
  { value: "4.6", suffix: "M+", label: "Text Passages Processed" },
  { value: "7.4", suffix: "M+", label: "Numerical Datasets" },
  { value: "91.1", suffix: "%", label: "Knowledge Internalized" },
];

const DataBrainSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-44 relative overflow-hidden">
      {/* Background: subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-text-dim text-xs uppercase tracking-[0.3em] font-mono">Data Brain</span>
          <div className="flex-1 h-px bg-border/30" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-mono">LIVE</span>
          </div>
        </div>

        {/* Stats — oversized numbers as visual */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/30">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="bg-background p-8 md:p-12 group"
            >
              <div className="mb-6">
                <span className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
                  {stat.value}
                </span>
                <span className="font-display text-3xl md:text-5xl font-bold text-primary">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-text-dim text-sm leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Terminal mockup below */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 surface-card overflow-hidden glow-lg max-w-3xl"
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
            </div>
            <span className="text-text-dim text-xs font-mono ml-3">
              watchwise_data_brain
            </span>
          </div>
          <div className="p-6 font-mono text-xs leading-loose text-text-secondary space-y-2">
            <p>
              <span className="text-primary">→</span> Continuously absorbing knowledge from{" "}
              <span className="text-foreground">85,900</span> research reports.
            </p>
            <p>
              <span className="text-primary">→</span> Neural networks processed{" "}
              <span className="text-foreground">4.6M+</span> text passages,{" "}
              <span className="text-foreground">7.4M+</span> numerical datasets,{" "}
              <span className="text-foreground">943K+</span> visual charts.
            </p>
            <p>
              <span className="text-primary">→</span> Learning progress:{" "}
              <span className="text-primary">91.1%</span> — depth & breadth of financial knowledge.
            </p>
            <div className="w-full bg-surface rounded-full h-1.5 overflow-hidden mt-3">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: "91.1%" } : {}}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataBrainSection;
