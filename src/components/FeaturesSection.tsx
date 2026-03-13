import { motion, useInView, AnimatePresence } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import miraBarChart from "@/assets/mira-bar-chart.png";
import miraSandbox from "@/assets/mira-sandbox-process.png";
import watchwiseResearch from "@/assets/watchwise-research.png";

const agentTabs = [
  {
    label: "播客整理成投资报告",
    placeholder: "Paste a podcast link, your Agent turns it into an investment report...",
  },
  {
    label: "分析师评级变动追踪",
    placeholder: "Enter a ticker to track analyst rating changes...",
  },
  {
    label: "定时任务推送",
    placeholder: "Set your push rules, e.g. 'Push tech stock movers every morning at 8am'...",
  },
  {
    label: "和其他 Agent 聊天",
    placeholder: "Start a conversation with someone else's Agent...",
  },
];

const features = [
  {
    number: "01",
    title: "Agent, at your command.",
    description: "The Era of the SuperAgent is here. Claim your personal Investment Agent, right now.",
    detail: "More than just a tool, your agent not only works, but also networks. Watch as it connects with other agents in real-time.",
    hasVisual: false,
    visualType: "agent",
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
    title: "Wall Street-grade report.",
    description: "From fragmented to structured — thematic and narrative. Forsee the market trends before it reacts.",
    detail: "Generated in seconds, not days.",
    hasVisual: false,
    visualType: "report",
  },
];


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
          <Bot size={14} className="text-primary" />
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

/* ---------- Agent Section (01) ---------- */
import React from "react";

const AgentSection = React.forwardRef<HTMLDivElement, { feature: typeof features[0]; inView: boolean }>(
  ({ feature, inView }, ref) => {
    const [activeTab, setActiveTab] = useState(0);
    const [inputValue, setInputValue] = useState("");

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="border-t border-border/30 group hover:bg-surface/50 transition-colors duration-500"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-28">
          {/* Top: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 text-center"
          >
            <span className="text-text-dim text-xs font-mono tracking-wider block mb-4">{feature.number}</span>
            <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
              {feature.title}
            </h3>
            <p className="text-text-secondary text-base leading-relaxed max-w-2xl mx-auto">
              {feature.description}
            </p>
          </motion.div>

          {/* Tab slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {agentTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveTab(i); setInputValue(""); }}
                  className={`relative whitespace-nowrap px-4 py-2 text-sm rounded-full border transition-all duration-300 shrink-0 ${
                    activeTab === i
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-text-secondary border-border/50 hover:border-text-dim"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Chat input area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="surface-card p-4 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={agentTabs[activeTab].placeholder}
                    className="flex-1 bg-transparent text-foreground text-sm placeholder:text-text-dim outline-none"
                  />
                  <button className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors">
                    <Send size={14} className="text-primary-foreground" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* CTA Button at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center mt-10"
          >
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors">
              Build your Agent Team
            </a>
          </motion.div>
        </div>
      </motion.div>
    );
  }
);
AgentSection.displayName = "AgentSection";

const FeaturesSection = () => {
  return (
    <section id="features" className="relative">
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
          {/* Header row: number + title left, description right */}
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-7"
            >
              <span className="text-text-dim text-xs font-mono tracking-wider block mb-4">{feature.number}</span>
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                {feature.title}
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-5 flex flex-col justify-end"
            >
              <p className="text-text-secondary text-base leading-relaxed">
                {feature.description}
              </p>
              <p className="text-text-dim text-sm italic mt-2">
                {feature.detail}
              </p>
            </motion.div>
          </div>

          {/* Visuals: chat left (larger), input + chart right (stacked) */}
          <div className="relative">
            <div className="absolute -inset-6 bg-primary/5 rounded-3xl blur-3xl pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-6 relative items-start">
              {/* Chat mockup */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative"
              >
                <p className="text-text-dim text-[10px] uppercase tracking-[0.2em] font-mono mb-2.5">Conversational research</p>
                <MiraChatMockup />
              </motion.div>

              {/* Right: bar chart + sandbox stacked */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="relative flex flex-col gap-4"
              >
                <div>
                  <p className="text-text-dim text-[10px] uppercase tracking-[0.2em] font-mono mb-2.5">Auto-generated charts</p>
                  <div className="surface-card overflow-hidden rounded-xl border border-border/30">
                    <img src={miraBarChart} alt="MIRA normalized bar chart" className="w-full h-auto" />
                  </div>
                </div>
                <div>
                  <p className="text-text-dim text-[10px] uppercase tracking-[0.2em] font-mono mb-2.5">Sandbox process</p>
                  <div className="surface-card overflow-hidden rounded-xl border border-border/30">
                    <img src={miraSandbox} alt="MIRA sandbox execution process" className="w-full h-auto" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center mt-10"
          >
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors">
              What's the trade? ASK MIRA.
            </a>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Report layout (03) — text top, full-width image below
  if (feature.visualType === "report") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="border-t border-border/30 group hover:bg-surface/50 transition-colors duration-500"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          {/* Text row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-text-dim text-xs font-mono tracking-wider block mb-3">{feature.number}</span>
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                {feature.title}
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:text-right md:max-w-md"
            >
              <p className="text-text-secondary text-base leading-relaxed">{feature.description}</p>
              <p className="text-text-dim text-sm italic mt-2">{feature.detail}</p>
            </motion.div>
          </div>

          {/* Full-width image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-2xl blur-2xl pointer-events-none" />
            <div className="relative surface-card overflow-hidden rounded-xl border border-border/30">
              <img src={watchwiseResearch} alt="WatchWise Research reports" className="w-full h-auto" />
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center mt-10"
          >
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors">
              Get the report at your fingertips
            </a>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Agent layout (01) — text top, swipeable tabs with chat input, button at bottom
  if (feature.visualType === "agent") {
    return <AgentSection feature={feature} ref={ref} inView={inView} />;
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
            <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
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
