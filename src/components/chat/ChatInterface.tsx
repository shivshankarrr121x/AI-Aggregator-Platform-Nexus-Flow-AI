import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Brain, Sparkles, Globe, Search, Zap, Code, MessageSquare, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  model?: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const aiModels = [
  { name: "GPT-4", icon: Brain, color: "neon-green", provider: "openai" },
  { name: "Claude", icon: Sparkles, color: "neon-purple", provider: "openrouter" },
  { name: "Gemini Pro", icon: Globe, color: "neon-teal", provider: "gemini" },
  { name: "Perplexity", icon: Search, color: "neon-blue", provider: "openrouter" },
  { name: "Grok", icon: Zap, color: "neon-green", provider: "openrouter" },
  { name: "Meta AI", icon: MessageSquare, color: "neon-purple", provider: "openrouter" },
  { name: "Copilot", icon: Code, color: "neon-teal", provider: "openrouter" },
  { name: "DeepSeek", icon: Bot, color: "neon-blue", provider: "openrouter" }
];

export const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callOpenAI = async (message: string): Promise<string> => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          max_tokens: 1000
        }),
      });

      if (!response.ok) throw new Error('OpenAI API failed');
      
      const data = await response.json();
      return data.choices[0]?.message?.content || 'No response from GPT-4';
    } catch (error) {
      return `GPT-4 Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const callGemini = async (message: string): Promise<string> => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDEfG_RM_InBxAEoh0g1Qv2PyJS0MPoVH4`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: message
            }]
          }]
        }),
      });

      if (!response.ok) throw new Error('Gemini API failed');
      
      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'No response from Gemini Pro';
    } catch (error) {
      return `Gemini Pro Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const callOpenRouter = async (message: string, model: string): Promise<string> => {
    try {
      const modelMap: { [key: string]: string } = {
        'Claude': 'anthropic/claude-3-haiku',
        'Perplexity': 'perplexity/llama-3.1-sonar-small-128k-online',
        'Grok': 'x-ai/grok-beta',
        'Meta AI': 'meta-llama/llama-3.1-8b-instruct:free',
        'Copilot': 'microsoft/wizardlm-2-8x22b',
        'DeepSeek': 'deepseek/deepseek-chat'
      };

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelMap[model] || 'deepseek/deepseek-chat',
          messages: [{ role: 'user', content: message }],
          max_tokens: 1000
        }),
      });

      if (!response.ok) throw new Error(`${model} API failed`);
      
      const data = await response.json();
      return data.choices[0]?.message?.content || `No response from ${model}`;
    } catch (error) {
      return `${model} Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Call all AI models in parallel
      const aiPromises = aiModels.map(async (model) => {
        let response = "";
        
        if (model.provider === "openai") {
          response = await callOpenAI(input);
        } else if (model.provider === "gemini") {
          response = await callGemini(input);
        } else if (model.provider === "openrouter") {
          response = await callOpenRouter(input, model.name);
        }

        return {
          id: `${Date.now()}-${model.name}`,
          content: response,
          sender: 'ai' as const,
          model: model.name,
          timestamp: new Date()
        };
      });

      const aiResponses = await Promise.all(aiPromises);
      setMessages(prev => [...prev, ...aiResponses]);
    } catch (error) {
      console.error('Error calling AI models:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getModelColor = (modelName: string) => {
    const model = aiModels.find(m => m.name === modelName);
    return model?.color || 'neon-green';
  };

  const getModelIcon = (modelName: string) => {
    const model = aiModels.find(m => m.name === modelName);
    return model?.icon || Brain;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border/20 bg-surface-primary/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button onClick={onBack} variant="ghost" className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-neon">Multi AI Prompt Tool Chat</h1>
              <p className="text-sm text-muted-foreground">All 8 AI models responding in real-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="container mx-auto max-w-6xl space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Welcome to Multi AI Prompt Tool</h3>
              <p className="text-muted-foreground">Ask anything and get responses from all 8 AI models instantly</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`${message.sender === 'user' ? 'ml-auto max-w-2xl' : 'mr-auto'}`}>
              {message.sender === 'user' ? (
                <div className="card-glow p-4 bg-gradient-to-r from-neon-green/10 to-neon-teal/10 border-neon-green/20">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-teal rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-background font-semibold text-sm">You</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card-glow p-4 border-border/20">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br from-${getModelColor(message.model!)} to-${getModelColor(message.model!)}/60 rounded-full flex items-center justify-center flex-shrink-0`}>
                      {(() => {
                        const Icon = getModelIcon(message.model!);
                        return <Icon className="w-4 h-4 text-background" />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-semibold text-${getModelColor(message.model!)}`}>
                          {message.model}
                        </span>
                      </div>
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="grid gap-4">
              {aiModels.map((model) => (
                <div key={model.name} className="card-glow p-4 border-border/20">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br from-${model.color} to-${model.color}/60 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <model.icon className="w-4 h-4 text-background" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-semibold text-${model.color}`}>{model.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="text-muted-foreground text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border/20 bg-surface-primary/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-4 max-w-4xl mx-auto">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask all 8 AIs anything..."
              disabled={loading}
              className="flex-1 bg-surface-secondary border-border/30 text-foreground placeholder:text-muted-foreground"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={loading || !input.trim()}
              className="btn-hero px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};