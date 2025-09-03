import { Brain, Zap, Image, Settings } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Compare all AIs at once",
    description: "Get responses from GPT, Claude, Gemini, Perplexity & more simultaneously. Never miss the best answer.",
    gradient: "from-neon-green to-neon-teal"
  },
  {
    icon: Zap,
    title: "Prompt Boost",
    description: "Auto-optimize your prompts for better results. Our AI enhances your queries for maximum effectiveness.",
    gradient: "from-neon-purple to-neon-blue"
  },
  {
    icon: Image,
    title: "Generate & Transcribe",
    description: "Create stunning images and transcribe audio across multiple AI models. All in one powerful interface.",
    gradient: "from-neon-teal to-neon-purple"
  },
  {
    icon: Settings,
    title: "Custom Workflows",
    description: "Build personalized AI workflows with system instructions. Tailor responses to your specific needs.",
    gradient: "from-neon-blue to-neon-green"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-neon">Supercharge Your</span>
            <br />
            <span className="text-foreground">AI Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Why settle for one AI when you can harness the power of all premium models? 
            Get the best of every AI, instantly.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card-glow group hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-full h-full text-background" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};