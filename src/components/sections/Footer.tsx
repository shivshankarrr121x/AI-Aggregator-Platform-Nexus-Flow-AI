import { Brain, Mail, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-surface-primary border-t border-border/20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-teal rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-background" />
              </div>
              <div className="text-xl font-bold text-neon">AI ka Thanos</div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              The world's most powerful AI platform. Access all premium AI models 
              in one unified interface. Get superhuman results at a fraction of the cost.
            </p>
            <div className="flex gap-4">
              <a href="mailto:support@aikathanosai.com" className="w-10 h-10 bg-surface-secondary hover:bg-neon-green/20 rounded-lg flex items-center justify-center transition-colors group">
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-neon-green transition-colors" />
              </a>
              <a href="https://wa.me/1234567890" className="w-10 h-10 bg-surface-secondary hover:bg-neon-purple/20 rounded-lg flex items-center justify-center transition-colors group">
                <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-neon-purple transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-muted-foreground hover:text-neon-green transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-neon-green transition-colors">Pricing</a></li>
              <li><a href="#models" className="text-muted-foreground hover:text-neon-green transition-colors">AI Models</a></li>
              <li><a href="#demo" className="text-muted-foreground hover:text-neon-green transition-colors">Demo</a></li>
              <li><a href="#api" className="text-muted-foreground hover:text-neon-green transition-colors">API Access</a></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#faq" className="text-muted-foreground hover:text-neon-purple transition-colors">FAQ</a></li>
              <li><a href="#help" className="text-muted-foreground hover:text-neon-purple transition-colors">Help Center</a></li>
              <li><a href="mailto:support@aikathanosai.com" className="text-muted-foreground hover:text-neon-purple transition-colors">Contact Us</a></li>
              <li><a href="#status" className="text-muted-foreground hover:text-neon-purple transition-colors">System Status</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 AI ka Thanos. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="text-muted-foreground hover:text-neon-teal transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-muted-foreground hover:text-neon-teal transition-colors">Terms of Service</a>
            <a href="#cookies" className="text-muted-foreground hover:text-neon-teal transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};