import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import miraChartDemo from "@/assets/mira-chart-demo.png";
import miraBarChart from "@/assets/mira-bar-chart.png";

const features = [
  {
    number: "01",
    title: "Agent, at your command.",
    description: "The Era of the SuperAgent is here. Claim your personal Investment Agent, powered by our proprietary OpenClaw Finance.",
    detail: "More than just a tool, your agent not only works, but also networks. Watch as it connects with other agents in real-time.",
    hasVisual: false,
  },
  {
    number: "02",
    title: "Deep Research, done in seconds.",
    description: "Let MIRA, your AI trading assistant scans real-time data to uncover hidden risks and opportunities you might miss.",
    detail: "Watch MIRA think, analyze, and answer — fully transparent.",
    hasVisual: true,
  },
  {
    number: "03",
    title: "Wall Street-grade report",
    description: "From fragmented to structured — thematic and narrative.",
    detail: "Institutional-grade reports generated in seconds, not days.",
    hasVisual: false,
  },
  {
    number: "04",
    title: "Quantamental Loop",
    description: "Thesis. Risks. Valuation. The complete quantamental loop powered by Wall Street-grade algorithms.",
    detail: "Every insight traceable. Every conclusion verifiable.",
    hasVisual: false,
  },
];

/* ---------- MIRA Chart Image ---------- */
const MiraChartImage = () => (
  <div className="surface-card overflow-hidden rounded-xl border border-border/30">
    <img src={miraChartDemo} alt="MIRA auto-generated chart" className="w-full h-auto" />
  </div>
);

/* ---------- MIRA Chat Mockup ---------- */
const MiraChatMockup = () => (
  <div className="surface-card overflow-hidden rounded-xl border border-border/30">
    {/* User message */}
    <div className="p-4 flex justify-end">
      <div className="bg-surface-elevated rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[220px]">
        <p className="text-foreground text-sm">what's happening today?</p>
      </div>
    </div>

    {/* MIRA response */}
    <div className="px-4 pb-4">
      {/* Avatar row */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <path d="M2 12h4l3-9 6 18 3-9h4" />
          </svg>
        </div>
        <span className="text-foreground text-xs font-semibold">Mira</span>
        <span className="text-text-dim text-[10px]">16:33</span>
      </div>

      {/* Analysis badge */}
      <div className="flex items-center gap-2 mb-3 px-3 py-1.5 bg-surface rounded-lg w-fit">
        <div className="w-3.5 h-3.5 rounded-full border border-primary/50 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
        <span className="text-text-secondary text-[11px]">Analysis complete</span>
        <span className="text-text-dim text-[10px] ml-auto">10 tools</span>
      </div>

      {/* Content card */}
      <div className="bg-surface/60 rounded-lg p-3 space-y-2 border border-border/20">
        <p className="text-text-dim text-[10px]">What's Happening Today — March 12, 2026</p>
        <h4 className="text-foreground font-display font-bold text-xs">The Big Picture: A Tale of Two Stories</h4>
        <p className="text-text-secondary text-[11px] leading-relaxed">
          <span className="font-semibold text-foreground">Oracle (ORCL)</span> is riding high on blowout earnings while{" "}
          <span className="font-semibold text-foreground">broader markets are under pressure</span>.
        </p>

        {/* Stock highlight */}
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-[11px]">◆</span>
          <span className="text-foreground text-[11px] font-semibold">Oracle (ORCL)</span>
          <span className="text-primary text-[10px]">+9.18%</span>
        </div>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="relative">
      {/* Horizontal rule with label */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-4 py-6 border-t border-border/50">
          <span className="text-text-dim text-xs uppercase tracking-[0.3em] font-mono">Capabilities</span>
          <div className="flex-1 h-px bg-border/30" />
        </div>
      </div>

      {/* Staggered feature rows */}
      {features.map((feature, i) => (
        <FeatureRow key={feature.number} feature={feature} index={i} />
      ))}
    </section>
  );
};

const FeatureRow = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isEven = index % 2 === 0;

  // Special layout for Deep Research (02) — side-by-side with chat mockup
  if (feature.hasVisual) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="border-t border-border/30 group hover:bg-surface/50 transition-colors duration-500"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-28">
          {/* Number + Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <span className="text-text-dim text-xs font-mono tracking-wider block mb-6">{feature.number}</span>
            <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground group-hover:text-gradient-warm transition-all duration-500 leading-[1.1] mb-4">
              {feature.title}
            </h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
              {feature.description}
            </p>
            <p className="text-text-dim text-sm italic mt-2">
              {feature.detail}
            </p>
          </motion.div>

          {/* Two mockups side by side */}
          <div className="grid md:grid-cols-2 gap-6 relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-2xl blur-2xl" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <p className="text-text-dim text-[10px] uppercase tracking-[0.2em] font-mono mb-2">AI-powered conversational research</p>
              <MiraChatMockup />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative"
            >
              <p className="text-text-dim text-[10px] uppercase tracking-[0.2em] font-mono mb-2">Auto-generated charts by MIRA</p>
              <MiraChartImage />
            </motion.div>

            {/* Bar chart image - full width below */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="relative md:col-span-2"
            >
              <p className="text-text-dim text-[10px] uppercase tracking-[0.2em] font-mono mb-2">Normalized valuation comparison</p>
              <div className="surface-card overflow-hidden rounded-xl border border-border/30">
                <img src={miraBarChart} alt="MIRA normalized bar chart" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="border-t border-border/30 group hover:bg-surface/50 transition-colors duration-500"
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className={`grid md:grid-cols-12 gap-8 items-start`}>
          {/* Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`md:col-span-2 ${isEven ? '' : 'md:order-3'}`}
          >
            <span className="text-text-dim text-xs font-mono tracking-wider">{feature.number}</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`md:col-span-5 ${isEven ? '' : 'md:order-1'}`}
          >
            <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground group-hover:text-gradient-warm transition-all duration-500">
              {feature.title}
            </h3>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className={`md:col-span-5 ${isEven ? '' : 'md:order-2'} flex flex-col gap-4`}
          >
            <p className="text-text-secondary text-base leading-relaxed">
              {feature.description}
            </p>
            <p className="text-text-dim text-sm italic">
              {feature.detail}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesSection;
