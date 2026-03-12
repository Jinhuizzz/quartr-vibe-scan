import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ManifestoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const words = [
    "We don't just",
    "move data —",
    "we transform it",
    "into Intelligence."
  ];

  return (
    <section className="py-32 md:py-44 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />
      
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div ref={ref} className="max-w-4xl">
          {words.map((word, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0, 1] }}
            >
              <span className={`block font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] ${
                i === words.length - 1 ? "text-gradient" : "text-foreground"
              }`}>
                {word}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Side annotation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 md:mt-0 md:absolute md:right-12 lg:right-20 md:top-1/2 md:-translate-y-1/2 max-w-xs"
        >
          <div className="w-8 h-px bg-primary mb-4" />
          <p className="text-text-secondary text-sm leading-relaxed">
            Backed by Wall Street consultants with decades of quantamental experience.
            Our proprietary algorithms reason like a human analyst — at machine scale.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ManifestoSection;
