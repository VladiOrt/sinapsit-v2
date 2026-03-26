import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const CONTACT_WHATSAPP_URL = "https://wa.me/5215575655412";

interface NavItem {
  label: string;
  href: string;       // anchor fragment or path
  isRoute?: boolean;  // true = react-router Link, false = anchor
}

const navItems: NavItem[] = [
  { label: "Servicios",  href: "#servicios" },
  { label: "Proceso",    href: "#proceso" },
  { label: "Proyectos",  href: "/proyectos", isRoute: true },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Anchor links need `/#fragment` prefix when not on home
  const resolveHref = (item: NavItem) => {
    if (item.isRoute) return item.href;
    return isHome ? item.href : `/${item.href}`;
  };

  const navClass = `transition-all duration-300 ${
    isScrolled
      ? "bg-background/90 backdrop-blur-xl border border-border shadow-lg"
      : "bg-background/70 backdrop-blur-xl border border-border/50"
  }`;

  const renderLink = (item: NavItem, mobile = false) => {
    const href = resolveHref(item);
    const baseClass = mobile
      ? "text-muted-foreground hover:text-foreground transition-colors py-3 px-4 rounded-xl hover:bg-muted/50"
      : "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200";
    const activeClass =
      item.isRoute && location.pathname === item.href
        ? mobile
          ? "text-foreground bg-muted/50"
          : "text-foreground"
        : "";

    if (item.isRoute) {
      return (
        <Link
          key={item.href}
          to={href}
          className={`${baseClass} ${activeClass}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <a
        key={item.href}
        href={href}
        className={`${baseClass} ${activeClass}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-4 left-0 right-0 mx-auto z-50 w-[95%] max-w-5xl"
    >
      {/* Desktop */}
      <nav className={`hidden md:flex items-center justify-between px-6 py-3 rounded-full ${navClass}`}>
        <Link to="/" className="flex items-center">
          <img src={logo} alt="SINAPSIT" className="h-8" />
        </Link>

        <div className="flex items-center gap-8">
          {navItems.map((item) => renderLink(item))}
        </div>

        <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Button
            variant="default"
            size="default"
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6"
          >
            Contáctanos
          </Button>
        </a>
      </nav>

      {/* Mobile pill */}
      <nav className={`md:hidden flex items-center justify-between px-4 py-3 rounded-full ${navClass}`}>
        <Link to="/" className="flex items-center">
          <img src={logo} alt="SINAPSIT" className="h-6" />
        </Link>

        <button
          className="text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 bg-background/95 backdrop-blur-xl border border-border rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => renderLink(item, true))}

              <a
                href={CONTACT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button
                  variant="default"
                  size="lg"
                  className="w-full mt-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                >
                  Contáctanos
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
