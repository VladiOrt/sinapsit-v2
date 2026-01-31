import { motion } from "framer-motion";
import { Target, Cpu, TrendingUp, Layers } from "lucide-react";

const differentiators = [
  {
    icon: Target,
    title: "Enfoque en soluciones reales",
    description: "No vendemos humo. Entendemos tu problema y construimos exactamente lo que necesitas.",
  },
  {
    icon: Cpu,
    title: "Automatización inteligente",
    description: "Eliminamos tareas repetitivas para que tu equipo se enfoque en lo que realmente importa.",
  },
  {
    icon: TrendingUp,
    title: "Escalabilidad garantizada",
    description: "Diseñamos pensando en el futuro. Tu tecnología crece junto con tu negocio.",
  },
  {
    icon: Layers,
    title: "Tecnología moderna",
    description: "Usamos las herramientas más actuales del mercado para resultados superiores.",
  },
];

export const WhyUs = () => {
  return (
    <section id="nosotros" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Por qué elegir{" "}
              <span className="gradient-text">SINAPSIT</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Somos un equipo de ingenieros y diseñadores obsesionados con la 
              eficiencia. No hacemos proyectos genéricos — creamos soluciones 
              que transforman la manera en que operas.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-1 h-16 bg-gradient-to-b from-primary to-accent rounded-full" />
              <blockquote className="text-lg italic text-foreground/80">
                "La tecnología correcta elimina fricción. La incorrecta la crea."
              </blockquote>
            </div>
          </motion.div>

          {/* Right Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
