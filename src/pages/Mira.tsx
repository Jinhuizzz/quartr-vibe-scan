import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const MiraPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-32 pb-24 max-w-screen-xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">AI Assistant</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Ask <span className="text-gradient">MIRA</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mb-12">
          Your AI trading assistant. More than a chatbot — MIRA scans real-time data 
          to uncover the hidden risks and opportunities you might miss.
        </p>

        {/* Chat mock */}
        <div className="surface-card max-w-2xl glow-md">
          <div className="p-4 border-b border-border/50 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-text-secondary">MIRA is online</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="surface-card bg-surface-elevated p-4 max-w-md ml-auto">
              <p className="text-sm text-foreground">Analyze AAPL's recent earnings report and future outlook</p>
            </div>
            <div className="p-4 max-w-md">
              <p className="text-sm text-text-secondary italic">
                MIRA is analyzing earnings data, market sentiment, and forward guidance...
              </p>
            </div>
          </div>
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-surface rounded-lg px-4 py-2.5">
                <span className="text-text-dim text-sm">Ask MIRA anything about the markets...</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm">→</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    <Footer />
  </div>
);

export default MiraPage;
