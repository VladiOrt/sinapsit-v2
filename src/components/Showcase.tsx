import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const showcaseItems = [
  {
    title: "Arquitecturas Escalables",
    subtitle: "Cloud-native solutions",
  },
  {
    title: "Automatización Inteligente",
    subtitle: "Workflows sin fricción",
  },
  {
    title: "Experiencias Digitales",
    subtitle: "Interfaces que enamoran",
  },
  {
    title: "Integraciones Perfectas",
    subtitle: "Sistemas conectados",
  },
];

export const Showcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Tecnología que <span className="gradient-text">transforma</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
          {showcaseItems.map((item, index) => {
            const isActive = index === activeIndex;
            const isPrev = index === (activeIndex - 1 + showcaseItems.length) % showcaseItems.length;
            const isNext = index === (activeIndex + 1) % showcaseItems.length;
            
            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                  x: isActive ? 0 : isPrev ? "-60%" : isNext ? "60%" : 0,
                  zIndex: isActive ? 10 : 5,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-full max-w-2xl aspect-video rounded-3xl bg-gradient-to-br from-primary/20 via-card to-accent/20 border border-border flex flex-col items-center justify-center p-8"
              >
                {/* Decorative elements */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                </div>
                
                <motion.h3
                  className="text-2xl md:text-4xl font-bold text-center mb-2"
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="text-muted-foreground text-center"
                  animate={{ opacity: isActive ? 1 : 0.3 }}
                >
                  {item.subtitle}
                </motion.p>
              </motion.div>
            );
          })}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {showcaseItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
