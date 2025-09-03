import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

export const DemoSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">See How </span>
            <span className="text-neon">AI ka Thanos</span>
            <br />
            <span className="text-foreground">Delivers What Others Miss</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch our platform in action as it compares responses from multiple AI models 
            and helps you find the perfect answer every time.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden card-glow group">
            {/* Video Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-tertiary flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-neon-purple/10 to-neon-teal/10" />
              
              {/* Play Button */}
              <Button 
                className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-r from-neon-green to-neon-teal hover:scale-110 transition-all duration-300 group-hover:shadow-[var(--glow-primary)]"
              >
                <Play className="w-8 h-8 text-background ml-1" fill="currentColor" />
              </Button>
              
              {/* Demo UI Elements */}
              <div className="absolute top-6 left-6 right-6">
                <div className="flex gap-4">
                  {/* Chat windows preview */}
                  {[
                    { name: "GPT-4", color: "neon-green" },
                    { name: "Claude", color: "neon-purple" },
                    { name: "Gemini", color: "neon-teal" }
                  ].map((ai, index) => (
                    <div key={index} className="flex-1 bg-surface-primary/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <div className={`text-sm font-semibold text-${ai.color} mb-2`}>{ai.name}</div>
                      <div className="space-y-1">
                        <div className="h-2 bg-white/20 rounded animate-pulse" />
                        <div className="h-2 bg-white/10 rounded w-3/4 animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-surface-primary/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-green to-neon-teal" />
                    <div className="flex-1">
                      <div className="h-3 bg-white/20 rounded animate-pulse" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-neon-green" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          </div>
          
          {/* Demo Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-green mb-2">3.2x</div>
              <div className="text-muted-foreground">Faster Results</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-purple mb-2">95%</div>
              <div className="text-muted-foreground">Better Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-teal mb-2">100%</div>
              <div className="text-muted-foreground">User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};