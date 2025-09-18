import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";

interface CTASectionProps {
  onGetStarted: () => void;
}

export const CTASection = ({ onGetStarted }: CTASectionProps) => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-tertiary" />
      <div className="absolute inset-0 bg-gradient-to-t from-neon-green/5 via-transparent to-neon-purple/5" />
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-neon-green/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-neon-purple/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-neon-teal/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="text-foreground">Ready to Unleash</span>
            <br />
            <span className="text-neon">the Power of Nexus Flow AI?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who've already discovered the power of having all premium AIs 
            in one platform. Start your journey to superhuman productivity today.
          </p>
          
          {/* Benefits grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-teal rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Instant Setup</h3>
              <p className="text-muted-foreground">Get started in under 60 seconds. No complex setup required.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-purple to-neon-blue rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">30-Day Guarantee</h3>
              <p className="text-muted-foreground">Try risk-free with our money-back guarantee.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-teal to-neon-green rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Save 10+ Hours/Week</h3>
              <p className="text-muted-foreground">Stop switching between AI platforms. Get everything in one place.</p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              className="btn-hero group text-xl px-12 py-6"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Starting at</div>
              <div className="text-2xl font-bold text-neon-green">₹6999/year</div>
              <div className="text-sm text-muted-foreground">That's just ₹583/month</div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full"></div>
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-teal rounded-full"></div>
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
              <span>Trusted by 10,000+ Users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};