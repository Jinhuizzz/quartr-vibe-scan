import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import alibabaLogo from "@/assets/alibaba-logo.png";

const BABA_EARNINGS_DATE = new Date("2026-03-19T06:00:00-04:00");

const UpcomingSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, BABA_EARNINGS_DATE.getTime() - now);
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const totalSeconds = BABA_EARNINGS_DATE.getTime() / 1000;
  const nowSeconds = Date.now() / 1000;
  const progress = Math.min(1, Math.max(0, 1 - (totalSeconds - nowSeconds) / (30 * 24 * 3600)));

  const units = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HRS" },
    { value: timeLeft.minutes, label: "MIN" },
    { value: timeLeft.seconds, label: "SEC" },
  ];

  // Generate tick marks for the outer ring
  const ticks = Array.from({ length: 60 }, (_, i) => i);

  return (
    <section className="relative py-8 md:py-14">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Circular orbit container */}
        <div className="flex justify-center">
          <div className="relative">

            {/* "UPCOMING" curved text — top half arc only */}
            <svg
              viewBox="0 0 360 360"
              className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] pointer-events-none"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <defs>
                <path id="upcomingArc" d="M 20,180 A 160,160 0 0,1 340,180" />
              </defs>
              <text fill="hsl(var(--text-dim))" fontSize="14" fontFamily="monospace" letterSpacing="12" opacity="0.7">
                <textPath href="#upcomingArc" startOffset="50%" textAnchor="middle">
                  UPCOMING
                </textPath>
              </text>
            </svg>

            {/* Outer rotating ring with ticks */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] h-[340px] md:w-[440px] md:h-[440px]"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <svg viewBox="0 0 440 440" className="w-full h-full">
                {ticks.map((i) => {
                  const angle = (i * 6 - 90) * (Math.PI / 180);
                  const r1 = 216;
                  const r2 = i % 5 === 0 ? 205 : 210;
                  return (
                    <line
                      key={i}
                      x1={220 + r1 * Math.cos(angle)}
                      y1={220 + r1 * Math.sin(angle)}
                      x2={220 + r2 * Math.cos(angle)}
                      y2={220 + r2 * Math.sin(angle)}
                      stroke={`hsl(var(--text-dim))`}
                      strokeWidth={i % 5 === 0 ? 1.5 : 0.8}
                      opacity={i % 5 === 0 ? 0.6 : 0.25}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* Middle static ring - dashed circle */}
            <div
              className="absolute w-[300px] h-[300px] md:w-[390px] md:h-[390px] rounded-full border border-dashed border-border/30"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            />

            {/* Inner glowing ring */}
            <div
              className="absolute w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: `conic-gradient(from 0deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.03) 30%, transparent 60%)`,
              }}
            />
            <div
              className="absolute w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full border border-primary/20"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            />

            {/* Orbiting dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-[260px] h-[260px] md:w-[340px] md:h-[340px]"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_4px_hsl(var(--primary)/0.5)]" />
            </motion.div>

            {/* Pulsing glow behind center */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full bg-primary/10 blur-xl"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            />

            {/* Center content */}
            <div className="relative w-[340px] h-[340px] md:w-[440px] md:h-[440px] flex items-center justify-center">
              <div className="flex flex-col items-center text-center z-10">
                {/* Logo + title */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 mb-5"
                >
                  <img src={alibabaLogo} alt="Alibaba" className="w-6 h-6 object-contain" />
                  <span className="text-text-secondary text-xs md:text-sm font-mono uppercase tracking-wider">
                    BABA Earnings
                  </span>
                </motion.div>

                {/* Countdown digits */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-1.5 md:gap-2 mb-5"
                >
                  {units.map((unit, i) => (
                    <div key={unit.label} className="flex items-center gap-1.5 md:gap-2">
                      <div className="flex flex-col items-center">
                        <div className="relative w-11 h-13 md:w-14 md:h-16 rounded-md overflow-hidden">
                          <div className="absolute inset-0 bottom-1/2 bg-surface-elevated border border-border/40 rounded-t-md flex items-end justify-center">
                            <span className="font-display text-base md:text-xl font-bold text-foreground translate-y-1/2">
                              {String(unit.value).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="absolute inset-0 top-1/2 bg-surface border border-border/30 border-t-0 rounded-b-md flex items-start justify-center overflow-hidden">
                            <span className="font-display text-base md:text-xl font-bold text-foreground -translate-y-1/2">
                              {String(unit.value).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="absolute left-0 right-0 top-1/2 -translate-y-px h-[1.5px] bg-background/80 z-10" />
                        </div>
                        <span className="text-text-dim text-[8px] md:text-[10px] font-mono tracking-wider mt-1">
                          {unit.label}
                        </span>
                      </div>
                      {i < units.length - 1 && (
                        <span className="text-text-dim text-sm md:text-lg font-bold -mt-3">:</span>
                      )}
                    </div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.a
                  href="#"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Get notified on Telegram
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSection;
