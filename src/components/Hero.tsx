import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            SINAPSIT
          </motion.h1>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6"
          >
            Desarrollamos soluciones digitales que sí funcionan
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
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
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button 
              variant="outline" 
              size="xl"
              className="rounded-full border-foreground/30 hover:bg-foreground/10 hover:border-foreground/50 px-8"
            >
              <a href="#servicios" className="text-foreground">Nuestras soluciones</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
