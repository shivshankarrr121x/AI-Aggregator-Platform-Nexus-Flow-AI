import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Save, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKey {
  name: string;
  label: string;
  placeholder: string;
  description: string;
}

const API_KEYS: ApiKey[] = [
  {
    name: "chatgpt",
    label: "ChatGPT API Key (OpenRouter)",
    placeholder: "sk-or-...",
    description: "OpenRouter API key for ChatGPT (GPT-4o-mini)"
  },
  {
    name: "gemini",
    label: "Gemini Pro API Key",
    placeholder: "AIza...",
    description: "Google API key for Gemini Pro"
  },
  {
    name: "claude",
    label: "Claude API Key (OpenRouter)",
    placeholder: "sk-or-...",
    description: "OpenRouter API key for Claude"
  },
  {
    name: "perplexity",
    label: "Perplexity API Key (OpenRouter)",
    placeholder: "sk-or-...",
    description: "OpenRouter API key for Perplexity"
  },
  {
    name: "grok",
    label: "Grok API Key (OpenRouter)",
    placeholder: "sk-or-...",
    description: "OpenRouter API key for Grok"
  },
  {
    name: "meta",
    label: "Meta AI API Key (OpenRouter)",
    placeholder: "sk-or-...",
    description: "OpenRouter API key for Meta AI (Llama)"
  },
  {
    name: "copilot",
    label: "Copilot API Key (OpenRouter)",
    placeholder: "sk-or-...",
    description: "OpenRouter API key for Microsoft Copilot"
  },
  {
    name: "deepseek",
    label: "DeepSeek API Key (OpenRouter)",
    placeholder: "sk-or-...",
    description: "OpenRouter API key for DeepSeek"
  }
];

export const ApiKeysManager = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("nexus_api_keys");
    if (saved) return JSON.parse(saved);
    
    // Set default API keys
    return {
      chatgpt: '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',
      gemini: 'AIzaSyDUlnVv0-iGdcPFCdGtePKf9UVZdUdv99s',
      claude: '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',
      perplexity: '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',
      grok: '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',
      meta: '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',
      copilot: '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',
      deepseek: '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'
    };
  });
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const handleSave = () => {
    localStorage.setItem("nexus_api_keys", JSON.stringify(apiKeys));
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been securely saved to local storage.",
    });
  };

  const toggleShowKey = (name: string) => {
    setShowKeys(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const updateKey = (name: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-teal rounded-lg flex items-center justify-center">
            <Key className="w-6 h-6 text-background" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">API Keys Configuration</h2>
            <p className="text-muted-foreground">Configure your API keys to access different AI models</p>
          </div>
        </div>
      </div>

      <Card className="p-6 space-y-6">
        <div className="bg-neon-blue/10 border border-neon-blue/20 rounded-lg p-4">
          <h3 className="font-semibold text-neon-blue mb-2">Important Information</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Your API keys are stored locally in your browser</li>
            <li>• ChatGPT now uses OpenRouter (same key as other models)</li>
            <li>• Only Gemini Pro needs a separate Google API key</li>
            <li>• 7 models use OpenRouter - you can use the same key for all</li>
            <li>• Keys are never sent to our servers</li>
          </ul>
        </div>

        <div className="grid gap-6">
          {API_KEYS.map((apiKey) => (
            <div key={apiKey.name} className="space-y-2">
              <Label htmlFor={apiKey.name} className="text-foreground font-medium">
                {apiKey.label}
              </Label>
              <p className="text-sm text-muted-foreground">{apiKey.description}</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id={apiKey.name}
                    type={showKeys[apiKey.name] ? "text" : "password"}
                    placeholder={apiKey.placeholder}
                    value={apiKeys[apiKey.name] || ""}
                    onChange={(e) => updateKey(apiKey.name, e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey(apiKey.name)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showKeys[apiKey.name] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleSave} className="w-full btn-hero">
          <Save className="w-4 h-4 mr-2" />
          Save API Keys
        </Button>
      </Card>

      <Card className="p-6 bg-neon-green/5 border-neon-green/20">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Getting Started
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong>ChatGPT:</strong> Get your API key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline">OpenRouter</a> (same as other models)</p>
          <p><strong>Gemini Pro:</strong> Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline">Google AI Studio</a></p>
          <p><strong>Other Models:</strong> All other models use <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline">OpenRouter</a> - you can use the same key for all 7 models</p>
        </div>
      </Card>
    </div>
  );
};
