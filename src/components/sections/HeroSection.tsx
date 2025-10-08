import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroInterface from "@/assets/hero-interface.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-tertiary opacity-90" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-neon-green rounded-full animate-ping opacity-75" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-neon-purple rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-neon-teal rounded-full animate-bounce opacity-80" />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-neon-green">
              <Sparkles className="w-4 h-4" />
              <span>World's Most Powerful AI</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-neon bg-gradient-to-r from-neon-green via-neon-teal to-neon-purple bg-clip-text text-transparent">
                Nexus Flow AI
              </span>
              <br />
              <span className="text-foreground">One Platform.</span>
              <br />
              <span className="text-foreground">Infinite Power.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              8 Premium AIs. Absolutely Free. Unlimited Usage. Compare GPT, Claude, Gemini & more instantly. 
              Get superhuman results without spending a penny.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              onClick={onGetStarted}
              className="btn-hero group text-lg px-8 py-4"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" className="text-lg px-8 py-4 border-accent/30 hover:bg-accent/10">
              Watch Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
            <div>✅ No Credit Card Required</div>
            <div>⚡ Instant Access</div>
            <div>🚀 8 AI Models</div>
          </div>
        </div>
        
        {/* Right content - Hero Image */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src={heroInterface} 
              alt="Nexus Flow AI Interface" 
              className="w-full h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/20 to-transparent rounded-2xl" />
          </div>
          
          {/* Floating stats */}
          <div className="absolute -top-4 -right-4 card-glow p-4 animate-float">
            <div className="text-2xl font-bold text-neon-green">8 AIs</div>
            <div className="text-sm text-muted-foreground">One Platform</div>
          </div>
          
          <div className="absolute -bottom-4 -left-4 card-glow p-4 animate-float" style={{ animationDelay: '2s' }}>
            <div className="text-2xl font-bold text-neon-purple">100% Free</div>
            <div className="text-sm text-muted-foreground">Unlimited Usage</div>
          </div>
        </div>
      </div>
    </section>
  );
};