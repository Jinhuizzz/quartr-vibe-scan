import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    number: "01",
    title: "Agent, at your command.",
    description: "The Era of the SuperAgent is here. Claim your personal Investment Agent, powered by our proprietary OpenClaw Finance.",
    detail: "More than just a tool, your agent not only works, but also networks. Watch as it connects with other agents in real-time.",
  },
  {
    number: "02",
    title: "Deep Research, done in seconds.",
    description: "Let MIRA, your AI trading assistant scans real-time data to uncover hidden risks and opportunities you might miss.",
    detail: "Watch MIRA think, analyze, and answer — fully transparent.",
  },
  {
    number: "03",
    title: "Wall Street-grade report",
    description: "Turn complex data into clear, visualized intelligence. From fragmented to structured — thematic and narrative.",
    detail: "Institutional-grade reports generated in seconds, not days.",
  },
  {
    number: "04",
    title: "Quantamental Loop",
    description: "Thesis. Risks. Valuation. The complete quantamental loop powered by Wall Street-grade algorithms.",
    detail: "Every insight traceable. Every conclusion verifiable.",
  },
];

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

  // Alternate alignment: even = left-heavy, odd = right-heavy
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="border-t border-border/30 group hover:bg-surface/50 transition-colors duration-500"
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className={`grid md:grid-cols-12 gap-8 items-start ${isEven ? '' : ''}`}>
          {/* Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`md:col-span-2 ${isEven ? '' : 'md:order-3'}`}
          >
            <span className="text-text-dim text-xs font-mono tracking-wider">{feature.number}</span>
          </motion.div>

          {/* Title — large */}
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
