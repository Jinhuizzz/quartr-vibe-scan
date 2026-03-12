import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Features", href: "/#features", external: false },
  { label: "Blog", href: "https://substack.com", external: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (item.external) return; // let default <a> handle it
    e.preventDefault();
    const id = item.href.replace("/#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 pt-4"
    >
      {/* Desktop */}
      <div className="hidden md:flex items-center w-full max-w-screen-xl">
        <Link to="/" className="flex items-center gap-2 mr-auto">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-sm">W</span>
          </div>
          <span className="font-display font-semibold text-foreground text-lg tracking-tight">
            WatchWise
          </span>
        </Link>

        <nav className="nav-glass rounded-full px-2 py-1.5 flex items-center gap-1">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors text-text-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(item, e)}
                className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors text-text-secondary hover:text-foreground cursor-pointer"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="ml-auto">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Download APP
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between w-full nav-glass rounded-2xl px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-xs">W</span>
          </div>
          <span className="font-display font-semibold text-foreground">WatchWise</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-4 right-4 mt-2 nav-glass rounded-2xl p-4 flex flex-col gap-2"
        >
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm text-text-secondary hover:text-foreground rounded-lg hover:bg-surface-elevated transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { handleNavClick(item, e); setMobileOpen(false); }}
                className="px-4 py-2.5 text-sm text-text-secondary hover:text-foreground rounded-lg hover:bg-surface-elevated transition-colors"
              >
                {item.label}
              </a>
            )
          )}
          <Link
            to="/research"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center px-4 py-2.5 text-sm font-medium rounded-full bg-foreground text-background"
          >
            Download APP
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
