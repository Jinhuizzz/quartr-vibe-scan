import { motion, useAnimationControls } from "framer-motion";
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

const CARD_COUNT = newsItems.length;
const ANGLE_STEP = 360 / CARD_COUNT;
const RADIUS_X = 320; // horizontal radius (ellipse width)
const RADIUS_Y = 60;  // vertical radius (ellipse height) — creates the vertical ellipse feel

const NewsKaleidoscope = () => {
  const [rotation, setRotation] = useState(0);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotation;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [rotation]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!(e.target as HTMLElement).hasPointerCapture(e.pointerId)) return;
    const dx = e.clientX - dragStartX.current;
    setRotation(dragStartRotation.current + dx * 0.3);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    // Snap to nearest card
    const snapped = Math.round(rotation / ANGLE_STEP) * ANGLE_STEP;
    setRotation(snapped);
  }, [rotation]);

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
        </motion.div>

        {/* 3D Cylinder Carousel */}
        <div
          ref={containerRef}
          className="relative flex justify-center items-center select-none"
          style={{ perspective: "1000px", height: "520px", touchAction: "none" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <motion.div
            className="relative"
            style={{
              width: "280px",
              height: "420px",
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateY: rotation }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {newsItems.map((news, i) => {
              const angle = i * ANGLE_STEP;
              // Position each card on an elliptical cylinder
              const translateZ = RADIUS_X;
              const translateY = Math.sin((angle * Math.PI) / 180) * RADIUS_Y;

              return (
                <div
                  key={news.id}
                  className="absolute inset-0 w-[280px] md:w-[300px] backface-hidden"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${translateZ}px) translateY(${translateY}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="surface-card h-full overflow-hidden rounded-2xl">
                    {/* Image */}
                    <div className="relative h-[55%] overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <span className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[news.tag] || "bg-muted text-muted-foreground"}`}>
                        {news.tag}
                      </span>
                      <span className="absolute top-3 right-3 text-text-dim text-xs bg-card/60 backdrop-blur-sm px-2 py-1 rounded-full">
                        {news.date}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col justify-between h-[45%]">
                      <div>
                        <h3 className="font-display font-bold text-foreground text-base md:text-lg leading-snug mb-2">
                          {news.title}
                        </h3>
                        <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                          {news.summary}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-text-dim text-xs">WatchWise AI</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom hint */}
        <div className="flex flex-col items-center gap-5 mt-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-text-dim text-xs tracking-wide"
          >
            ← DRAG TO EXPLORE →
          </motion.p>
          <a
            href="#"
            className="bg-foreground text-background px-6 py-2.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Try on App
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsKaleidoscope;
