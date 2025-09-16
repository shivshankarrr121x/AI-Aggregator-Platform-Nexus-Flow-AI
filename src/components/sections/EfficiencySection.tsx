import { Check } from "lucide-react";

export const EfficiencySection = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-surface-secondary to-surface-tertiary opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-neon">One Window.</span>
            <br />
            <span className="text-foreground">Eight Perspectives.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Run prompts across GPT, Claude, Gemini & more instantly. 
            See every angle, get the perfect answer every time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Comparison Table */}
          <div className="card-glow">
            <h3 className="text-2xl font-semibold mb-6 text-center text-neon-green">
              Traditional vs Nexus Flow AI 
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-surface-secondary/50">
                <div className="text-sm text-muted-foreground">Traditional Approach</div>
                <div className="text-sm text-foreground font-semibold">Nexus Flow AI</div>
              </div>
              
              {[
                { traditional: "8 separate subscriptions", thanos: "1 unified platform" },
                { traditional: "₹10000+/month total cost", thanos: "₹6999/year only" },
                { traditional: "Switch between apps", thanos: "Compare side-by-side" },
                { traditional: "Miss better answers", thanos: "Get all perspectives" },
                { traditional: "Manage multiple accounts", thanos: "Single dashboard" }
              ].map((row, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 p-3 rounded-lg hover:bg-surface-secondary/30 transition-colors">
                  <div className="text-sm text-red-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full" />
                    {row.traditional}
                  </div>
                  <div className="text-sm text-neon-green flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {row.thanos}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Benefits */}
          <div className="space-y-8">
            <div className="card-glow">
              <div className="text-3xl font-bold text-neon-purple mb-2">10x</div>
              <div className="text-lg font-semibold mb-2">Faster Decision Making</div>
              <div className="text-muted-foreground">
                Compare responses instantly instead of switching between platforms
              </div>
            </div>
            
            <div className="card-glow">
              <div className="text-3xl font-bold text-neon-teal mb-2">99%</div>
              <div className="text-lg font-semibold mb-2">Cost Savings</div>
              <div className="text-muted-foreground">
                Pay ₹6999/year instead of ₹10000+/month for premium AI access
              </div>
            </div>
            
            <div className="card-glow">
              <div className="text-3xl font-bold text-neon-green mb-2">8 AIs</div>
              <div className="text-lg font-semibold mb-2">in One Interface</div>
              <div className="text-muted-foreground">
                GPT-4, Claude, Gemini, Perplexity, Grok, Meta AI, Copilot & DeepSeek unified
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};