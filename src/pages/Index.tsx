import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { EfficiencySection } from "@/components/sections/EfficiencySection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ModelHighlights } from "@/components/sections/ModelHighlights";
import { DemoSection } from "@/components/sections/DemoSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-animated">
      <HeroSection onGetStarted={handleGetStarted} />
      <FeaturesSection />
      <EfficiencySection />
      <PricingSection />
      <ModelHighlights />
      <DemoSection />
      <FAQSection />
      <CTASection onGetStarted={handleGetStarted} />
      <Footer />
    </div>
  );
};

export default Index;