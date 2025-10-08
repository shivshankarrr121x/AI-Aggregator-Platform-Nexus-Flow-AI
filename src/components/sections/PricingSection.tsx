import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Infinity } from "lucide-react";

export const PricingSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-neon">Absolutely Free</span>
            <br />
            <span className="text-foreground">Unlimited Usage Forever</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Access 8 premium AI models with unlimited usage - no credit card required!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-glow relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <Infinity className="w-4 h-4" />
              Forever Free
            </div>
            
            <div className="p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-4 text-center">Free Plan</h3>
              <div className="mb-8 text-center">
                <span className="text-5xl font-bold text-neon-green">₹0</span>
                <span className="text-muted-foreground text-xl">/forever</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  {[
                    "Access to all 8 AI models",
                    "Unlimited messages",
                    "Compare responses side-by-side",
                    "Prompt optimization",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-neon-green flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[
                    "Image generation",
                    "Audio transcription",
                    "Custom workflows",
                    "24/7 Support",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-neon-purple flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-neon-green/10 to-neon-purple/10 border border-neon-green/20 rounded-lg p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-6 h-6 text-neon-green" />
                  <h4 className="font-semibold text-lg">Why Free?</h4>
                </div>
                <p className="text-muted-foreground">
                  We believe AI should be accessible to everyone. Use your own API keys and enjoy unlimited access to the most powerful AI models without any restrictions.
                </p>
              </div>
              
              <Button className="w-full btn-hero text-lg py-6">
                Get Started - Absolutely Free
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-neon-green" />
            No credit card required • No hidden fees • No subscriptions • Forever free
          </p>
        </div>
      </div>
    </section>
  );
};