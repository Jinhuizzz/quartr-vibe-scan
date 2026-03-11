import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BarChart3, Brain, Database, LineChart, Shield, Zap } from "lucide-react";

const features = [
  { icon: Brain, title: "Data Brain", desc: "Proprietary AI trained on 85,000+ research reports with quantamental reasoning." },
  { icon: BarChart3, title: "Equity Research", desc: "Comprehensive reports covering thesis, risks, and valuation in seconds." },
  { icon: Zap, title: "Real-Time Analysis", desc: "Live market data processing with instant insight generation." },
  { icon: Shield, title: "Transparent AI", desc: "Watch every step of MIRA's reasoning process in real-time." },
  { icon: Database, title: "Data Coverage", desc: "7.4M+ numerical datasets and 4.6M+ text passages analyzed." },
  { icon: LineChart, title: "Trend Forecasting", desc: "Foresee market trends before the market reacts." },
];

const FeaturesPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-32 pb-24 max-w-screen-xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">Features</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Built for Serious Investors
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mb-16">
          Every feature is designed to give you an institutional-grade edge.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="surface-card p-8 hover:border-primary/30 transition-colors"
            >
              <f.icon size={24} className="text-primary mb-4" />
              <h3 className="font-display font-semibold text-foreground text-lg mb-2">{f.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    <Footer />
  </div>
);

export default FeaturesPage;
