import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NeuralCanvas } from "@/components/NeuralCanvas";

export const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Neural network background */}
      <div className="absolute inset-0 z-0 bg-background">
        <NeuralCanvas />
        {/* Radial vignette for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, hsl(240,10%,4%) 100%)",
          }}
        />
        {/* Subtle top glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% -10%, hsl(263,70%,58%,0.12), transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            SINAPSIT
          </motion.h1>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6"
          >
            Desarrollamos soluciones digitales que sí funcionan
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Diseñamos y construimos software, plataformas web, aplicaciones y
            automatizaciones que impulsan negocios reales mediante tecnología
            escalable y eficiente.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.84, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              variant="outline"
              size="xl"
              className="rounded-full border-foreground/30 hover:bg-foreground/10 hover:border-foreground/50 px-8"
            >
              <a href="#servicios" className="text-foreground">
                Nuestras soluciones
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
