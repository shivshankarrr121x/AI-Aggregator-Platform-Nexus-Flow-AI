import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, ArrowLeft, Eye, EyeOff, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData.name);
      
      if (error) {
        toast.error(error.message || "Failed to create account");
        setIsLoading(false);
        return;
      }
      
      toast.success("Account created! Please check your email to verify your account.");
      navigate("/login");
    } catch (err) {
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          
          <h1 className="text-3xl font-bold mb-2">Start Your AI Journey</h1>
          <p className="text-muted-foreground">Join thousands using 8 Premium AIs</p>
        </div>

        {/* Signup Form */}
        <div className="card-glow p-8">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter your full name"
                className="bg-surface-secondary/50 border-border/30 focus:border-neon-green"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
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
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="Create a strong password"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                  className="bg-surface-secondary/50 border-border/30 focus:border-neon-green pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-neon-green"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border/30 mt-1" required />
                <span className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-neon-green hover:text-neon-teal">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-neon-green hover:text-neon-teal">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full btn-hero"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-neon-green hover:text-neon-teal transition-colors font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 card-glow p-6">
          <div className="text-center mb-4">
            <div className="text-sm font-semibold text-neon-green mb-2">What's Included:</div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-neon-green" />
              <span>8 AI Models</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-neon-green" />
              <span>Unlimited Messages</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-neon-purple" />
              <span>Side-by-side Comparison</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-neon-purple" />
              <span>Premium Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-neon-teal" />
              <span>Image Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-neon-teal" />
              <span>Advanced Features</span>
            </div>
          </div>
          <div className="text-center mt-4 text-xs text-muted-foreground">
            Start with ₹99/month • Cancel anytime
          </div>
        </div>
      </div>
    </div>
  );
};