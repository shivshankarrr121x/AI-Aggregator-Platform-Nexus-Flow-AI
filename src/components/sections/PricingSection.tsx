import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

export const PricingSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-neon">8 AIs for Half the Price</span>
            <br />
            <span className="text-foreground">of One</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Why pay ₹10000+ monthly for individual AI subscriptions when you can get them all?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div className="card-glow relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">Monthly Plan</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-neon-green">₹699</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Access to all 8 AI models",
                  "Unlimited messages",
                  "Compare responses side-by-side",
                  "Prompt optimization",
                  "Image generation",
                  "Audio transcription",
                  "Custom workflows",
                  "Priority support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-neon-green flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full btn-hero">
                Get Started - ₹699/month
              </Button>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="card-glow relative overflow-hidden group border-2 border-neon-purple/30">
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-neon-purple to-neon-blue text-background px-4 py-2 rounded-bl-lg font-semibold flex items-center gap-2">
              <Star className="w-4 h-4" />
              Best Value
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">Yearly Plan</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-neon-purple">₹6999</span>
                <span className="text-muted-foreground">/year</span>
              </div>
              <div className="text-sm text-neon-green mb-6"> • Just ₹583/month</div>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Monthly Plan",
                  "2 months free (14 months total)",
                  "Priority customer support",
                  "Early access to new AI models",
                  "Advanced analytics",
                  "Team collaboration features",
                  "API access (coming soon)",
                  "Lifetime updates"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-neon-purple flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue text-background font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
                Get Started - ₹6999/year
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-muted-foreground">
          <p>30-day money-back guarantee • No hidden fees • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
};