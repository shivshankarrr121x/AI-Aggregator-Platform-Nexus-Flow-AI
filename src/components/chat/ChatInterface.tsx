import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Brain, Send, Settings, X, ChevronRight, Loader2, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface AIModel {
  id: string;
  name: string;
  color: string;
  enabled: boolean;
  isLoading?: boolean;
}

interface ChatMessage {
  id: string;
  message: string;
  responses: { [key: string]: string };
  timestamp: Date;
}

const INITIAL_MODELS: AIModel[] = [
  { id: "gpt-4", name: "ChatGPT", color: "bg-green-500", enabled: true },
  { id: "claude", name: "Claude", color: "bg-orange-500", enabled: true },
  { id: "gemini", name: "Gemini Pro", color: "bg-blue-500", enabled: true },
  { id: "perplexity", name: "Perplexity", color: "bg-cyan-500", enabled: true },
  { id: "grok", name: "Grok", color: "bg-purple-500", enabled: true },
  { id: "meta-ai", name: "Meta AI", color: "bg-blue-600", enabled: true },
  { id: "copilot", name: "Copilot", color: "bg-indigo-500", enabled: true },
  { id: "deepseek", name: "DeepSeek", color: "bg-teal-500", enabled: true }
];

interface ChatInterfaceProps {
  onBack: () => void;
}

export const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const { toast } = useToast();
  const [models, setModels] = useState<AIModel[]>(INITIAL_MODELS);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showModelSettings, setShowModelSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const enabledModels = models.filter(m => m.enabled);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleModel = (modelId: string) => {
    setModels(prev => prev.map(m => 
      m.id === modelId ? { ...m, enabled: !m.enabled } : m
    ));
  };

  // Get API keys from localStorage
  const getApiKeys = () => {
    const saved = localStorage.getItem("nexus_api_keys");
    return saved ? JSON.parse(saved) : {};
  };

  // API calling functions
  const callChatGPT = async (message: string): Promise<string> => {
    try {
      const apiKeys = getApiKeys();
      const apiKey = apiKeys.chatgpt || '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';
      
      console.log('Calling ChatGPT with API key:', apiKey.substring(0, 20) + '...');
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [{ role: 'user', content: message }],
          max_tokens: 1000
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ChatGPT API error:', response.status, errorText);
        throw new Error(`ChatGPT API failed: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      return data.choices[0]?.message?.content || 'No response from ChatGPT';
    } catch (error) {
      console.error('ChatGPT error:', error);
      return `ChatGPT Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const callGemini = async (message: string): Promise<string> => {
    try {
      const apiKeys = getApiKeys();
      const apiKey = apiKeys.gemini || 'AIzaSyDUlnVv0-iGdcPFCdGtePKf9UVZdUdv99s';
      
      console.log('Calling Gemini with API key:', apiKey.substring(0, 15) + '...');
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
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

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error:', response.status, errorText);
        
        let errorMessage = 'Gemini API failed';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error?.message || errorText;
        } catch {
          errorMessage = errorText;
        }
        
        throw new Error(`${response.status}: ${errorMessage}`);
      }
      
      const data = await response.json();
      console.log('Gemini response:', data);
      return data.candidates[0]?.content?.parts[0]?.text || 'No response from Gemini Pro';
    } catch (error) {
      console.error('Gemini error:', error);
      return `Gemini Pro Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const callOpenRouter = async (message: string, modelName: string, modelKey: string): Promise<string> => {
    try {
      const apiKeys = getApiKeys();
      const apiKey = apiKeys[modelKey] || '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';
      
      const modelMap: { [key: string]: string } = {
        'Claude': 'anthropic/claude-3.5-sonnet',
        'Perplexity': 'perplexity/llama-3.1-sonar-large-128k-online',
        'Grok': 'x-ai/grok-2-1212',
        'Meta AI': 'meta-llama/llama-3.3-70b-instruct',
        'Copilot': 'openai/gpt-4o-mini',
        'DeepSeek': 'deepseek/deepseek-chat'
      };

      const selectedModel = modelMap[modelName] || 'deepseek/deepseek-chat';
      console.log(`Calling ${modelName} (${selectedModel}) with API key:`, apiKey.substring(0, 20) + '...');

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [{ role: 'user', content: message }],
          max_tokens: 1000
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`${modelName} API error:`, response.status, errorText);
        
        let errorMessage = `${modelName} API failed`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error?.message || errorText;
        } catch {
          errorMessage = errorText.substring(0, 100);
        }
        
        throw new Error(`${response.status}: ${errorMessage}`);
      }
      
      const data = await response.json();
      return data.choices[0]?.message?.content || `No response from ${modelName}`;
    } catch (error) {
      console.error(`${modelName} error:`, error);
      return `${modelName} Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || enabledModels.length === 0) return;

    const messageId = Date.now().toString();
    const newMessage: ChatMessage = {
      id: messageId,
      message: inputMessage,
      responses: {},
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Set loading state for enabled models
    setModels(prev => prev.map(m => 
      m.enabled ? { ...m, isLoading: true } : m
    ));

    // Call AI APIs in parallel
    const promises = enabledModels.map(async (model) => {
      try {
        let response = "";
        
        if (model.id === "gpt-4") {
          response = await callChatGPT(inputMessage);
        } else if (model.id === "gemini") {
          response = await callGemini(inputMessage);
        } else if (model.id === "claude") {
          response = await callOpenRouter(inputMessage, model.name, "claude");
        } else if (model.id === "perplexity") {
          response = await callOpenRouter(inputMessage, model.name, "perplexity");
        } else if (model.id === "grok") {
          response = await callOpenRouter(inputMessage, model.name, "grok");
        } else if (model.id === "meta-ai") {
          response = await callOpenRouter(inputMessage, model.name, "meta");
        } else if (model.id === "copilot") {
          response = await callOpenRouter(inputMessage, model.name, "copilot");
        } else if (model.id === "deepseek") {
          response = await callOpenRouter(inputMessage, model.name, "deepseek");
        }

        // Check if response contains an error
        if (response.includes('Error:')) {
          toast({
            title: `${model.name} Failed`,
            description: response,
            variant: "destructive",
          });
        }

        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, responses: { ...msg.responses, [model.id]: response } }
            : msg
        ));

        setModels(prev => prev.map(m => 
          m.id === model.id ? { ...m, isLoading: false } : m
        ));
      } catch (error) {
        const errorMsg = `${model.name} Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        
        toast({
          title: `${model.name} Failed`,
          description: error instanceof Error ? error.message : 'Unknown error',
          variant: "destructive",
        });
        
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, responses: { ...msg.responses, [model.id]: errorMsg } }
            : msg
        ));

        setModels(prev => prev.map(m => 
          m.id === model.id ? { ...m, isLoading: false } : m
        ));
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-surface-primary flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/20 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="ghost" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-teal rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-background" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-neon">Nexus Flow AI</h1>
              <p className="text-sm text-muted-foreground">{enabledModels.length} of 8 AIs active</p>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowModelSettings(!showModelSettings)}
          className="border-border/30"
        >
          <Settings className="w-4 h-4 mr-2" />
          Models ({enabledModels.length})
        </Button>
      </div>

      {/* Model Settings Panel */}
      {showModelSettings && (
        <div className="p-4 bg-surface-secondary border-b border-border/20 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">AI Model Selection</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowModelSettings(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {models.map((model) => (
              <div key={model.id} className="flex items-center justify-between p-3 bg-surface-primary rounded-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${model.color}`} />
                  <Label htmlFor={model.id} className="text-sm font-medium">
                    {model.name}
                  </Label>
                </div>
                <Switch
                  id={model.id}
                  checked={model.enabled}
                  onCheckedChange={() => toggleModel(model.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Area - All 8 AIs side by side */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {enabledModels.length > 0 ? (
          <div className="flex-1 flex overflow-x-auto">
            <div className="flex min-w-max h-full">
              {enabledModels.map((model, index) => (
                <div key={model.id} className="w-80 flex-shrink-0 flex flex-col bg-surface-secondary/30 border-r border-border/10 h-full">
                  {/* Model Header */}
                  <div className={`p-3 border-b border-border/20 ${model.color.replace('bg-', 'bg-')}/20 flex-shrink-0`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${model.color}`} />
                      <span className="font-medium text-sm text-foreground">{model.name}</span>
                      {model.isLoading && (
                        <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Model Messages */}
                  <div className="flex-1 overflow-y-auto p-3 min-h-0">
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div key={`${model.id}-${msg.id}`} className="space-y-2">
                          {/* User message */}
                          <div className="bg-surface-primary/60 p-3 rounded-lg text-sm border border-border/10">
                            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-neon-green" />
                              You
                            </div>
                            <div className="text-foreground">{msg.message}</div>
                          </div>

                          {/* AI Response */}
                          {msg.responses[model.id] ? (
                            <div className={`bg-surface-primary/80 p-3 rounded-lg text-sm border ${model.color.replace('bg-', 'border-')}/20`}>
                              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${model.color}`} />
                                {model.name}
                              </div>
                              <div className="whitespace-pre-wrap text-foreground leading-relaxed text-xs">
                                {msg.responses[model.id]}
                              </div>
                            </div>
                          ) : model.enabled && model.isLoading ? (
                            <div className="bg-surface-primary/50 p-3 rounded-lg text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span className="text-xs">Thinking...</span>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Card className="p-8 text-center max-w-md">
              <Brain className="w-12 h-12 text-neon-green mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No AI Models Selected</h3>
              <p className="text-muted-foreground mb-4">
                Enable at least one AI model to start chatting
              </p>
              <Button onClick={() => setShowModelSettings(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Select Models
              </Button>
            </Card>
          </div>
        )}
      </div>

      {/* Fixed Input Area */}
      <div className="p-4 border-t border-border/20 bg-surface-secondary/50 flex-shrink-0">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-surface-primary border-border/30 focus:border-neon-green"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={enabledModels.length === 0}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || enabledModels.length === 0}
            className="btn-hero px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-center mt-2 text-xs text-muted-foreground">
          {enabledModels.length > 0 
            ? `${enabledModels.length} AI models will respond to your message`
            : "Select AI models to start chatting"
          }
        </div>
      </div>
    </div>
  );
};