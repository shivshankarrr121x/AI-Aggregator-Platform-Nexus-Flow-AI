import { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { EfficiencySection } from "@/components/sections/EfficiencySection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ModelHighlights } from "@/components/sections/ModelHighlights";
import { DemoSection } from "@/components/sections/DemoSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";
import { ChatInterface } from "@/components/chat/ChatInterface";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-animated">
      {showChat ? (
        <ChatInterface onBack={() => setShowChat(false)} />
      ) : (
        <>
          <HeroSection onGetStarted={() => setShowChat(true)} />
          <FeaturesSection />
          <EfficiencySection />
          <PricingSection />
          <ModelHighlights />
          <DemoSection />
          <FAQSection />
          <CTASection onGetStarted={() => setShowChat(true)} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;