import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to chat interface
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-tertiary opacity-90" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-neon-green rounded-full animate-ping opacity-75" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-neon-purple rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-neon-teal rounded-full animate-bounce opacity-80" />

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon-green transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-teal rounded-lg flex items-center justify-center">
              <Brain className="w-8 h-8 text-background" />
            </div>
            <div className="text-2xl font-bold text-neon">Multi AI Prompt Tool</div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Access 8 Premium AIs in One Platform</p>
        </div>

        {/* Login Form */}
        <div className="card-glow p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-surface-secondary/50 border-border/30 focus:border-neon-green"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-surface-secondary/50 border-border/30 focus:border-neon-green pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-neon-green"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border/30" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-neon-green hover:text-neon-teal transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full btn-hero"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-neon-green hover:text-neon-teal transition-colors font-medium">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 text-center space-y-2">
          <div className="text-sm text-muted-foreground">What you'll get:</div>
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-neon-green rounded-full"></span>
              8 AI Models
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-neon-purple rounded-full"></span>
              Unlimited Messages
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-neon-teal rounded-full"></span>
              Premium Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};