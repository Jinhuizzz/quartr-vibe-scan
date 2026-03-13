import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UpcomingSection from "@/components/UpcomingSection";
import NewsKaleidoscope from "@/components/NewsKaleidoscope";
import ManifestoSection from "@/components/ManifestoSection";
import FeaturesSection from "@/components/FeaturesSection";
import DataBrainSection from "@/components/DataBrainSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <UpcomingSection />
      <NewsKaleidoscope />
      <FeaturesSection />
      <ManifestoSection />
      <DataBrainSection />
      <CTASection />

      {/* Bottom bar */}
      <div className="border-t border-border/50 py-8">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-text-dim text-sm">2026@watchwise.ai</span>
          <div className="flex items-center gap-5">
            {/* X (Twitter) */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-foreground transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-foreground transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
            </a>
            {/* Substack */}
            <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-foreground transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l9.56-5.26L20.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
