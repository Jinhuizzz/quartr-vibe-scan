import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Brain, Search, Shield } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Deep Research",
    description: "Turn complex data into clear, visualized intelligence. From fragmented to structured, thematic and narrative.",
  },
  {
    icon: Brain,
    title: "Ask MIRA",
    description: "Your AI trading assistant scans real-time data to uncover hidden risks and opportunities you might miss.",
  },
  {
    icon: BarChart3,
    title: "Quantamental Analysis",
    description: "Thesis. Risks. Valuation. The complete quantamental loop powered by Wall Street-grade algorithms.",
  },
  {
    icon: Shield,
    title: "Transparent AI",
    description: "Watch MIRA think, analyze, and answer in real-time. Every insight is traceable and verifiable.",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="surface-card p-8 group hover:border-primary/30 transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
        <feature.icon size={20} className="text-primary" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-3">
        {feature.title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">
            Capabilities
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Deep Research, Done in Seconds.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
