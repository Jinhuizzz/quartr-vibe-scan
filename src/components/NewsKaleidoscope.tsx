import { motion, useAnimationControls, PanInfo } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const newsItems = [
  {
    id: 1,
    date: "Mar 12",
    tag: "AI & Tech",
    title: "NVIDIA Surges on Record Data Center Revenue",
    summary: "Q4 earnings beat expectations with $22.1B in data center sales, driven by unprecedented AI chip demand.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    date: "Mar 12",
    tag: "Macro",
    title: "Fed Signals Potential Rate Cut in June",
    summary: "Chair Powell's testimony hints at easing cycle as inflation trends toward 2% target.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    date: "Mar 11",
    tag: "Crypto",
    title: "Bitcoin ETF Inflows Hit $1.2B Single-Day Record",
    summary: "Institutional adoption accelerates as BlackRock's IBIT leads with $760M in net inflows.",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    date: "Mar 11",
    tag: "Healthcare",
    title: "Novo Nordisk Obesity Drug Shows 25% Weight Loss",
    summary: "Phase 3 trial results exceed expectations, sending shares to all-time highs in pre-market.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    date: "Mar 10",
    tag: "Energy",
    title: "OPEC+ Extends Production Cuts Through Q3",
    summary: "Oil prices rally 4% as Saudi-led coalition agrees to maintain output restrictions.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    date: "Mar 10",
    tag: "Earnings",
    title: "Apple Services Revenue Crosses $100B Annual Run Rate",
    summary: "Subscription growth offsets iPhone softness as ecosystem monetization deepens.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
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

const SWIPE_THRESHOLD = 100;

interface SwipeCardProps {
  news: typeof newsItems[0];
  isTop: boolean;
  onSwipe: (direction: "left" | "right") => void;
}

const SwipeCard = ({ news, isTop, onSwipe }: SwipeCardProps) => {
  const controls = useAnimationControls();
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const handleDrag = useCallback((_: unknown, info: PanInfo) => {
    if (info.offset.x > 40) setSwipeDirection("right");
    else if (info.offset.x < -40) setSwipeDirection("left");
    else setSwipeDirection(null);
  }, []);

  const handleDragEnd = useCallback(async (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      const dir = info.offset.x > 0 ? "right" : "left";
      await controls.start({
        x: dir === "right" ? 500 : -500,
        rotate: dir === "right" ? 20 : -20,
        opacity: 0,
        transition: { duration: 0.3 },
      });
      onSwipe(dir);
    } else {
      setSwipeDirection(null);
      controls.start({ x: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 25 } });
    }
  }, [controls, onSwipe]);

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDrag={isTop ? handleDrag : undefined}
      onDragEnd={isTop ? handleDragEnd : undefined}
      animate={controls}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      <div className="surface-card h-full overflow-hidden relative">
        {/* Image */}
        <div className="relative h-[55%] overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <span className={`absolute top-4 left-4 text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[news.tag] || "bg-muted text-muted-foreground"}`}>
            {news.tag}
          </span>
          <span className="absolute top-4 right-4 text-text-dim text-xs bg-card/60 backdrop-blur-sm px-2 py-1 rounded-full">
            {news.date}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-between h-[45%]">
          <div>
            <h3 className="font-display font-bold text-foreground text-lg md:text-xl leading-snug mb-3">
              {news.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {news.summary}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-text-dim text-xs">WatchWise AI</span>
          </div>
        </div>

        {/* Swipe indicators */}
        {isTop && swipeDirection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute top-6 ${swipeDirection === "right" ? "left-6" : "right-6"} px-4 py-2 rounded-lg border-2 font-display font-bold text-lg rotate-[-12deg] ${
              swipeDirection === "right"
                ? "border-emerald-400 text-emerald-400"
                : "border-red-400 text-red-400"
            }`}
          >
            {swipeDirection === "right" ? "SAVE" : "SKIP"}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const NewsKaleidoscope = () => {
  const ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const visibleCards = newsItems.slice(currentIndex, currentIndex + 3);
  const allSwiped = currentIndex >= newsItems.length;

  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            What's happening now?
          </h2>
          <button className="mt-6 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            Try on App →
          </button>
        </motion.div>

        {/* Tinder-style card stack */}
        <div ref={ref} className="relative flex justify-center items-center">
          <div className="relative w-[340px] md:w-[400px] h-[520px] md:h-[560px]">
            {allSwiped ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <p className="text-text-secondary text-lg mb-4">You're all caught up!</p>
                <button
                  onClick={() => setCurrentIndex(0)}
                  className="text-primary font-medium hover:underline"
                >
                  Start over →
                </button>
              </motion.div>
            ) : (
              visibleCards.map((news, i) => {
                const stackIndex = visibleCards.length - 1 - i;
                return (
                  <motion.div
                    key={news.id}
                    className="absolute inset-0"
                    style={{ zIndex: i }}
                    initial={false}
                    animate={{
                      scale: 1 - stackIndex * 0.05,
                      y: stackIndex * 16,
                      opacity: stackIndex > 1 ? 0.5 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <SwipeCard
                      news={news}
                      isTop={i === visibleCards.length - 1}
                      onSwipe={handleSwipe}
                    />
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Swipe hint */}
        {!allSwiped && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center text-text-dim text-xs mt-8 tracking-wide"
          >
            ← SWIPE LEFT TO SKIP · SWIPE RIGHT TO SAVE →
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default NewsKaleidoscope;
