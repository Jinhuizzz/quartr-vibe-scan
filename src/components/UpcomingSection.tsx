import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useMemo } from "react";

const NVIDIA_EARNINGS_DATE = new Date("2026-05-28T16:00:00-04:00"); // Example Q1 FY2027

const UpcomingSection = () => {
  const daysLeft = useMemo(() => {
    const now = new Date();
    const diff = NVIDIA_EARNINGS_DATE.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, []);

  const digits = String(daysLeft).padStart(3, "0").split("");

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-text-dim text-xs uppercase tracking-[0.3em] font-mono">Upcoming</span>
          <div className="flex-1 h-px bg-border/30" />
        </div>

        <div className="flex flex-col items-center text-center">
          {/* Event title */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-text-secondary text-sm md:text-base font-mono uppercase tracking-wider mb-8"
          >
            NVIDIA Earnings Report
          </motion.p>

          {/* Countdown flip-card style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 md:gap-4 mb-4"
          >
            {digits.map((digit, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center"
              >
                {/* Card */}
                <div className="relative w-16 h-20 md:w-24 md:h-32 lg:w-28 lg:h-36 rounded-xl overflow-hidden">
                  {/* Top half */}
                  <div className="absolute inset-0 bottom-1/2 bg-surface-elevated border border-border/40 rounded-t-xl flex items-end justify-center pb-0">
                    <span className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground translate-y-1/2">
                      {digit}
                    </span>
                  </div>
                  {/* Bottom half */}
                  <div className="absolute inset-0 top-1/2 bg-surface border border-border/30 border-t-0 rounded-b-xl flex items-start justify-center pt-0 overflow-hidden">
                    <span className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground -translate-y-1/2">
                      {digit}
                    </span>
                  </div>
                  {/* Center line */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-px h-[2px] bg-background/80 z-10" />
                  {/* Side notches */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-background rounded-r-full z-10" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-background rounded-l-full z-10" />
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
            className="text-text-dim text-xs md:text-sm font-mono uppercase tracking-[0.2em] mb-10"
          >
            Days remaining
          </motion.p>

          {/* Telegram notification button */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium rounded-full border border-border/50 bg-surface hover:bg-surface-elevated text-foreground transition-colors"
          >
            <Bell size={16} className="text-primary" />
            Get notification on Telegram
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSection;
