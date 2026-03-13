import { motion } from "framer-motion";
import { useMemo } from "react";

const BABA_EARNINGS_DATE = new Date("2026-05-28T16:00:00-04:00");

const UpcomingSection = () => {
  const daysLeft = useMemo(() => {
    const now = new Date();
    const diff = BABA_EARNINGS_DATE.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, []);

  const digits = String(daysLeft).padStart(3, "0").split("");

  return (
    <section className="relative py-12 md:py-16">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-text-dim text-xs uppercase tracking-[0.3em] font-mono">Upcoming</span>
          <div className="flex-1 h-px bg-border/30" />
        </div>

        {/* Framed card */}
        <div className="max-w-lg mx-auto border border-border/40 rounded-2xl bg-surface/50 backdrop-blur-sm px-8 py-10 md:px-12 md:py-12">
          <div className="flex flex-col items-center text-center">
            {/* Event title with Alibaba logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              {/* Alibaba logo */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#FF6A00] shrink-0">
                <text x="2" y="18" fontSize="16" fontWeight="bold" fill="currentColor" fontFamily="Arial, sans-serif">A</text>
              </svg>
              <span className="text-text-secondary text-sm md:text-base font-mono uppercase tracking-wider">
                BABA Earnings Report
              </span>
            </motion.div>

            {/* Countdown flip-card style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 md:gap-3 mb-3"
            >
              {digits.map((digit, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  <div className="relative w-12 h-16 md:w-16 md:h-20 rounded-lg overflow-hidden">
                    {/* Top half */}
                    <div className="absolute inset-0 bottom-1/2 bg-surface-elevated border border-border/40 rounded-t-lg flex items-end justify-center">
                      <span className="font-display text-2xl md:text-4xl font-bold text-foreground translate-y-1/2">
                        {digit}
                      </span>
                    </div>
                    {/* Bottom half */}
                    <div className="absolute inset-0 top-1/2 bg-surface border border-border/30 border-t-0 rounded-b-lg flex items-start justify-center overflow-hidden">
                      <span className="font-display text-2xl md:text-4xl font-bold text-foreground -translate-y-1/2">
                        {digit}
                      </span>
                    </div>
                    {/* Center line */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-px h-[2px] bg-background/80 z-10" />
                    {/* Side notches */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2.5 bg-background rounded-r-full z-10" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-2.5 bg-background rounded-l-full z-10" />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Label */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-text-dim text-xs font-mono uppercase tracking-[0.2em] mb-6"
            >
              Days remaining
            </motion.p>

            {/* Telegram button — matches nav CTA style */}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Get notification on Telegram
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSection;
