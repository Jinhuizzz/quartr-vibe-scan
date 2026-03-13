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

  const units = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HRS" },
    { value: timeLeft.minutes, label: "MIN" },
    { value: timeLeft.seconds, label: "SEC" },
  ];

  return (
    <section className="relative py-12 md:py-16">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-text-dim text-xs uppercase tracking-[0.3em] font-mono">Upcoming</span>
          <div className="flex-1 h-px bg-border/30" />
        </div>

        <div className="max-w-xl mx-auto border border-border/40 rounded-2xl bg-surface/50 backdrop-blur-sm px-8 py-10 md:px-12 md:py-12">
          <div className="flex flex-col items-center text-center">
            {/* Event title with Alibaba logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <img src={alibabaLogo} alt="Alibaba" className="w-7 h-7 object-contain shrink-0" />
              <span className="text-text-secondary text-sm md:text-base font-mono uppercase tracking-wider">
                BABA Earnings Report
              </span>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 md:gap-3 mb-6"
            >
              {units.map((unit, i) => (
                <div key={unit.label} className="flex items-center gap-2 md:gap-3">
                  <div className="flex flex-col items-center">
                    {/* Flip card */}
                    <div className="relative w-14 h-16 md:w-18 md:h-22 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bottom-1/2 bg-surface-elevated border border-border/40 rounded-t-lg flex items-end justify-center">
                        <span className="font-display text-xl md:text-3xl font-bold text-foreground translate-y-1/2">
                          {String(unit.value).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="absolute inset-0 top-1/2 bg-surface border border-border/30 border-t-0 rounded-b-lg flex items-start justify-center overflow-hidden">
                        <span className="font-display text-xl md:text-3xl font-bold text-foreground -translate-y-1/2">
                          {String(unit.value).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-px h-[2px] bg-background/80 z-10" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2.5 bg-background rounded-r-full z-10" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-2.5 bg-background rounded-l-full z-10" />
                    </div>
                    <span className="text-text-dim text-[10px] md:text-xs font-mono tracking-wider mt-1.5">
                      {unit.label}
                    </span>
                  </div>
                  {/* Separator colon */}
                  {i < units.length - 1 && (
                    <span className="text-text-dim text-lg md:text-2xl font-bold -mt-4">:</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Telegram button */}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              Get notification on Telegram
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSection;
