import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

const newsItems = [
  {
    id: 1,
    date: "Mar 12",
    tag: "AI & Tech",
    title: "NVIDIA Surges on Record Data Center Revenue",
    summary: "Q4 earnings beat expectations with $22.1B in data center sales.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    date: "Mar 12",
    tag: "Macro",
    title: "Fed Signals Potential Rate Cut in June",
    summary: "Chair Powell's testimony hints at easing cycle as inflation trends toward 2%.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    date: "Mar 11",
    tag: "Crypto",
    title: "Bitcoin ETF Inflows Hit $1.2B Single-Day Record",
    summary: "Institutional adoption accelerates as BlackRock's IBIT leads with $760M.",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    date: "Mar 11",
    tag: "Healthcare",
    title: "Novo Nordisk Obesity Drug Shows 25% Weight Loss",
    summary: "Phase 3 trial results exceed expectations, sending shares to all-time highs.",
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
    title: "Apple Services Revenue Crosses $100B Run Rate",
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
const RADIUS = 280;
const AUTO_ROTATE_INTERVAL = 3000;
const CARD_W = 240;
const CARD_H = 340;

const NewsKaleidoscope = () => {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const isDragging = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for auto-rotate on scroll into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-rotate: runs when in view and not hovered
  useEffect(() => {
    if (!isInView || isHovered) return;
    const timer = setInterval(() => {
      setRotation((prev) => prev - ANGLE_STEP);
    }, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isInView, isHovered]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotation;
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [rotation]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    setRotation(dragStartRotation.current + dx * 0.35);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setRotation((prev) => Math.round(prev / ANGLE_STEP) * ANGLE_STEP);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            What's happening now?
          </h2>
        </motion.div>

        {/* 3D Cylinder Carousel */}
        <div
          className="relative flex justify-center items-center select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px", height: "460px", touchAction: "none" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="relative"
            style={{
              width: `${CARD_W}px`,
              height: `${CARD_H}px`,
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateY: rotation }}
            transition={{ type: "spring", stiffness: 180, damping: 28 }}
          >
            {newsItems.map((news, i) => {
              const angle = i * ANGLE_STEP;
              // Calculate how "front-facing" this card is
              const normalizedRotation = ((rotation % 360) + 360) % 360;
              const cardAngle = ((angle + normalizedRotation) % 360 + 360) % 360;
              const distFromFront = Math.min(cardAngle, 360 - cardAngle);
              const isFront = distFromFront < 25;
              const scale = isFront ? 1.08 : 1 - distFromFront / 600;
              const opacity = isFront ? 1 : Math.max(0.12, 1 - distFromFront / 100);

              return (
                <div
                  key={news.id}
                  className={`absolute inset-0`}
                  style={{
                    width: `${CARD_W}px`,
                    height: `${CARD_H}px`,
                    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) scale(${scale})`,
                    opacity,
                    backfaceVisibility: "hidden",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }}
                >
                  <div className="surface-card h-full overflow-hidden rounded-xl">
                    <div className="relative h-[50%] overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <span className={`absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${tagColors[news.tag] || "bg-muted text-muted-foreground"}`}>
                        {news.tag}
                      </span>
                      <span className="absolute top-2 right-2 text-text-dim text-[10px] bg-card/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                        {news.date}
                      </span>
                    </div>
                    <div className="p-2.5 flex flex-col justify-between h-[50%]">
                      <div>
                        <h3 className="font-display font-bold text-foreground text-xs md:text-sm leading-snug mb-1 line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-text-secondary text-[10px] leading-relaxed line-clamp-2">
                          {news.summary}
                        </p>
                      </div>
                      <span className="text-text-dim text-[10px] mt-2">WatchWise AI</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-5 mt-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-text-dim text-xs tracking-wide"
          >
            ← SWIPE TO EXPLORE →
          </motion.p>
          <a
            href="#"
            className="bg-foreground text-background px-6 py-2.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Daily for you, try on APP
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsKaleidoscope;
