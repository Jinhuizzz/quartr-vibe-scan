import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const newsItems = [
  {
    id: 1,
    date: "Mar 12",
    tag: "AI & Tech",
    title: "NVIDIA Surges on Record Data Center Revenue",
    summary: "Q4 earnings beat expectations with $22.1B in data center sales, driven by unprecedented AI chip demand.",
  },
  {
    id: 2,
    date: "Mar 12",
    tag: "Macro",
    title: "Fed Signals Potential Rate Cut in June",
    summary: "Chair Powell's testimony hints at easing cycle as inflation trends toward 2% target.",
  },
  {
    id: 3,
    date: "Mar 11",
    tag: "Crypto",
    title: "Bitcoin ETF Inflows Hit $1.2B Single-Day Record",
    summary: "Institutional adoption accelerates as BlackRock's IBIT leads with $760M in net inflows.",
  },
  {
    id: 4,
    date: "Mar 11",
    tag: "Healthcare",
    title: "Novo Nordisk Obesity Drug Shows 25% Weight Loss",
    summary: "Phase 3 trial results exceed expectations, sending shares to all-time highs in pre-market.",
  },
  {
    id: 5,
    date: "Mar 10",
    tag: "Energy",
    title: "OPEC+ Extends Production Cuts Through Q3",
    summary: "Oil prices rally 4% as Saudi-led coalition agrees to maintain output restrictions.",
  },
  {
    id: 6,
    date: "Mar 10",
    tag: "Earnings",
    title: "Apple Services Revenue Crosses $100B Annual Run Rate",
    summary: "Subscription growth offsets iPhone softness as ecosystem monetization deepens.",
  },
];

const tagColors: Record<string, string> = {
  "AI & Tech": "bg-primary/20 text-primary",
  "Macro": "bg-accent/20 text-accent-foreground",
  "Crypto": "bg-amber-500/20 text-amber-400",
  "Healthcare": "bg-emerald-500/20 text-emerald-400",
  "Energy": "bg-orange-500/20 text-orange-400",
  "Earnings": "bg-violet-500/20 text-violet-400",
};

const NewsKaleidoscope = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isSpread, setIsSpread] = useState(false);

  // Kaleidoscope layout: cards fan out from center with rotation
  const getCardTransform = (index: number, total: number) => {
    const centerIndex = (total - 1) / 2;
    const offset = index - centerIndex;

    if (isSpread) {
      return {
        rotate: offset * 8,
        x: offset * 45,
        y: Math.abs(offset) * 15,
        scale: 1 - Math.abs(offset) * 0.03,
        zIndex: total - Math.abs(offset),
      };
    }

    return {
      rotate: offset * 3,
      x: offset * 8,
      y: Math.abs(offset) * 4,
      scale: 1 - Math.abs(offset) * 0.02,
      zIndex: total - Math.abs(offset),
    };
  };

  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">Daily Intelligence</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Market Pulse
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg">
            AI-curated news that moves markets — delivered before the opening bell.
          </p>
        </motion.div>

        {/* Kaleidoscope card stack */}
        <div
          ref={ref}
          className="relative flex justify-center items-center min-h-[420px] cursor-pointer"
          onMouseEnter={() => setIsSpread(true)}
          onMouseLeave={() => {
            setIsSpread(false);
            setExpandedId(null);
          }}
        >
          {newsItems.map((news, index) => {
            const transform = getCardTransform(index, newsItems.length);
            const isExpanded = expandedId === news.id;

            return (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, scale: 0.8, rotate: (index - 2.5) * 15 }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        rotate: isExpanded ? 0 : transform.rotate,
                        x: isExpanded ? 0 : transform.x,
                        y: isExpanded ? -20 : transform.y,
                        scale: isExpanded ? 1.08 : transform.scale,
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  delay: inView ? index * 0.08 : 0,
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
                style={{ zIndex: isExpanded ? 100 : transform.zIndex }}
                className="absolute w-[320px] md:w-[380px]"
                onClick={() => setExpandedId(isExpanded ? null : news.id)}
              >
                <div
                  className={`surface-card p-6 transition-shadow duration-300 ${
                    isExpanded ? "glow-md shadow-2xl" : "hover:glow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[news.tag] || "bg-muted text-muted-foreground"}`}>
                      {news.tag}
                    </span>
                    <span className="text-text-dim text-xs">{news.date}</span>
                  </div>

                  <h3 className="font-display font-semibold text-foreground text-sm md:text-base leading-snug mb-3">
                    {news.title}
                  </h3>

                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-text-secondary text-sm leading-relaxed pb-1">
                      {news.summary}
                    </p>
                  </motion.div>

                  {!isExpanded && (
                    <div className="w-full h-px bg-border/50 mt-3" />
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-text-dim text-xs">WatchWise AI</span>
                    <span className="text-primary text-xs font-medium">
                      {isExpanded ? "Collapse" : "Read →"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center text-text-dim text-xs mt-8 tracking-wide"
        >
          HOVER TO EXPLORE · CLICK TO READ
        </motion.p>
      </div>
    </section>
  );
};

export default NewsKaleidoscope;
