import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const ResearchPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-32 pb-24 max-w-screen-xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">Research</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Institutional-Grade Reports
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mb-12">
          Browse thousands of AI-generated equity research reports covering every sector. 
          Powered by WatchWise Data Brain.
        </p>

        {/* Search mock */}
        <div className="surface-card p-4 flex items-center gap-3 max-w-lg">
          <span className="text-text-dim">🔍</span>
          <span className="text-text-dim text-sm">Search any stock reports...</span>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {["Technology", "Healthcare", "Finance", "Energy", "Consumer", "Industrial"].map((sector) => (
            <div key={sector} className="surface-card p-6 hover:border-primary/30 transition-colors cursor-pointer">
              <h3 className="font-display font-semibold text-foreground">{sector}</h3>
              <p className="text-text-dim text-sm mt-2">Browse reports →</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
    <Footer />
  </div>
);

export default ResearchPage;
