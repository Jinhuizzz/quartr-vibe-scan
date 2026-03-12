import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import agentWorkflow from "@/assets/agent-workflow.jpg";

const AgentSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Text content */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-text-dim text-xs uppercase tracking-[0.25em] font-mono">
              SuperAgent
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-8"
          >
            <span className="text-foreground">Agent, at your</span>
            <br />
            <span className="text-gradient">command.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl"
          >
            The Era of the SuperAgent is here. Claim your personal Investment Agent, powered by our proprietary OpenClaw Finance.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mt-4"
          >
            More than just a tool, your agent not only works, but also networks. Watch as it connects with other agents in real-time.
          </motion.p>
        </div>

        {/* Workflow image */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative rounded-2xl overflow-hidden border border-border/30"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none z-10" />
          <img
            src={agentWorkflow}
            alt="Build Your Agent Team - AI agent network workflow showing interconnected agents for research, trading, risk analysis, news, and analytics"
            className="w-full h-auto"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AgentSection;
