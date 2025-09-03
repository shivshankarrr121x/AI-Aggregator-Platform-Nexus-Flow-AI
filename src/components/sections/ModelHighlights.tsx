import { Brain, Zap, Globe, Search, Sparkles, Code } from "lucide-react";

const models = [
  {
    name: "GPT-4",
    company: "OpenAI",
    icon: Brain,
    strengths: ["Creative Writing", "Code Generation", "Problem Solving"],
    color: "neon-green",
    description: "The most versatile AI for creative and analytical tasks"
  },
  {
    name: "Claude",
    company: "Anthropic", 
    icon: Sparkles,
    strengths: ["Analysis", "Research", "Long Context"],
    color: "neon-purple",
    description: "Superior reasoning and analysis capabilities"
  },
  {
    name: "Gemini Pro",
    company: "Google",
    icon: Globe,
    strengths: ["Multimodal", "Real-time Data", "Integration"],
    color: "neon-teal",
    description: "Powerful multimodal AI with real-time capabilities"
  },
  {
    name: "Perplexity",
    company: "Perplexity AI",
    icon: Search,
    strengths: ["Web Search", "Current Events", "Citations"],
    color: "neon-blue",
    description: "Real-time web search with accurate citations"
  },
  {
    name: "Grok",
    company: "xAI",
    icon: Zap,
    strengths: ["Humor", "Real-time X Data", "Unbiased"],
    color: "neon-green",
    description: "Witty AI with access to real-time social data"
  },
  {
    name: "Mixtral",
    company: "Mistral AI",
    icon: Code,
    strengths: ["Code", "Efficiency", "Privacy"],
    color: "neon-purple",
    description: "Efficient open-source model for coding tasks"
  }
];

export const ModelHighlights = () => {
  return (
    <section className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-secondary/30 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-neon">Meet Your AI</span>
            <br />
            <span className="text-foreground">Dream Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each AI has unique strengths. Together, they're unstoppable. 
            Get the best response from the right model, every time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div 
              key={index}
              className="card-glow group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${model.color} to-${model.color}/60 p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <model.icon className="w-full h-full text-background" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{model.name}</h3>
                  <p className="text-sm text-muted-foreground">{model.company}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {model.description}
              </p>
              
              <div className="space-y-2">
                <div className="text-sm font-semibold text-foreground mb-2">Key Strengths:</div>
                {model.strengths.map((strength, idx) => (
                  <div key={idx} className={`inline-block bg-gradient-to-r from-${model.color}/20 to-${model.color}/10 text-${model.color} px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2`}>
                    {strength}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="card-glow max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold mb-4 text-neon-green">
              Why Choose When You Can Have All?
            </h3>
            <p className="text-muted-foreground text-lg">
              Instead of guessing which AI to use, get responses from all of them. 
              Compare results, pick the best answer, and achieve superhuman productivity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};