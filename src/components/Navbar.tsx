import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Procesos" }
];

const CONTACT_WHATSAPP_URL = "https://wa.me/5215575655412";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-4 left-0 right-0 mx-auto z-50 w-[95%] max-w-5xl"
    >
      {/* Desktop Floating Pill Navbar */}
      <nav
        className={`hidden md:flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border border-border shadow-lg"
            : "bg-background/70 backdrop-blur-xl border border-border/50"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src={logo} alt="SINAPSIT" className="h-8" />
        </a>

        {/* Center Navigation Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={CONTACT_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="default"
            size="default"
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6"
          >
            Contactanos
          </Button>
        </a>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={`md:hidden flex items-center justify-between px-4 py-3 rounded-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border border-border shadow-lg"
            : "bg-background/70 backdrop-blur-xl border border-border/50"
        }`}
      >
        <a href="#" className="flex items-center">
          <img src={logo} alt="SINAPSIT" className="h-6" />
        </a>

        <button
          className="text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
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
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors py-3 px-4 rounded-xl hover:bg-muted/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

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
                  Contactanos
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
