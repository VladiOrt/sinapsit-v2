import { motion } from "framer-motion";
import { 
  Search, 
  Lightbulb, 
  Code2, 
  Rocket, 
  RefreshCw 
} from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Diagnóstico",
    description: "Analizamos tu situación actual, identificamos cuellos de botella y oportunidades de mejora.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Diseño de Solución",
    description: "Creamos una propuesta técnica a medida que resuelve tus problemas específicos.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Desarrollo",
    description: "Construimos la solución con metodologías ágiles, manteniéndote informado en cada sprint.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Implementación",
    description: "Desplegamos en producción con cero fricción y te capacitamos para usar la herramienta.",
  },
  {
    icon: RefreshCw,
    number: "05",
    title: "Optimización Continua",
    description: "Monitoreamos, iteramos y mejoramos basándonos en datos reales de uso.",
  },
];

export const Process = () => {
  return (
    <section id="proceso" className="py-24 md:py-32 relative bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Cómo <span className="gradient-text">trabajamos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un proceso claro y transparente de principio a fin
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-transparent hidden md:block" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <div className={`p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors ${
                  index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                }`}>
                  <span className="text-primary text-sm font-mono mb-2 block">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>

              {/* Icon (Center for desktop) */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-card border-2 border-primary items-center justify-center z-10">
                <step.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Icon (Left for mobile) */}
              <div className="md:hidden flex-shrink-0 w-12 h-12 rounded-full bg-card border border-primary flex items-center justify-center">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
