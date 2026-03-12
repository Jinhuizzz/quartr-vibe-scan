import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsKaleidoscope from "@/components/NewsKaleidoscope";
import ManifestoSection from "@/components/ManifestoSection";
import FeaturesSection from "@/components/FeaturesSection";
import DataBrainSection from "@/components/DataBrainSection";
import TickerBar from "@/components/TickerBar";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <NewsKaleidoscope />
      <FeaturesSection />
      <ManifestoSection />
      <DataBrainSection />
      <CTASection />
      <TickerBar />
      <Footer />
    </div>
  );
};

export default Index;
