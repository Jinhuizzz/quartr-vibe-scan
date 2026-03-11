import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
      <TickerBar />
      <FeaturesSection />
      <DataBrainSection />
      <CTASection />
      <TickerBar />
      <Footer />
    </div>
  );
};

export default Index;
