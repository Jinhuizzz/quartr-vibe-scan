import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-xs">W</span>
              </div>
              <span className="font-display font-semibold text-foreground">WatchWise</span>
            </div>
            <p className="text-text-dim text-sm leading-relaxed">
              Wall Street-Grade Stock Research powered by AI.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">Product</h4>
            <div className="flex flex-col gap-2">
              <Link to="/research" className="text-text-secondary text-sm hover:text-foreground transition-colors">Research</Link>
              <Link to="/mira" className="text-text-secondary text-sm hover:text-foreground transition-colors">ASK MIRA</Link>
              <Link to="/features" className="text-text-secondary text-sm hover:text-foreground transition-colors">Features</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">Resources</h4>
            <div className="flex flex-col gap-2">
              <Link to="/blog" className="text-text-secondary text-sm hover:text-foreground transition-colors">Blog</Link>
              <a href="https://watchwise.ai" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-sm hover:text-foreground transition-colors">API</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">Legal</h4>
            <div className="flex flex-col gap-2">
              <span className="text-text-secondary text-sm">Privacy Policy</span>
              <span className="text-text-secondary text-sm">Terms of Service</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-text-dim text-sm">
          © {new Date().getFullYear()} WatchWise.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
