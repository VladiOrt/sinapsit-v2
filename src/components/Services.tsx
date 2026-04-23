import { motion } from "framer-motion";
import { 
  Globe, 
  Laptop, 
  Zap, 
  Link2, 
  Cloud,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web",
    description: "Sitios web modernos, rápidos y optimizados para SEO que convierten visitantes en clientes.",
    features: ["React & Next.js", "Performance optimizada", "SEO técnico"],
    proyectosLink: "/proyectos?categoria=Web",
  },
  {
    icon: Laptop,
    title: "Aplicaciones Web",
    description: "Plataformas robustas y escalables diseñadas para resolver problemas de negocio complejos.",
    features: ["SaaS a medida", "Dashboards", "Portales cliente"],
    proyectosLink: "/proyectos?categoria=Aplicación",
  },
  {
    icon: Zap,
    title: "Automatización",
    description: "Elimina tareas manuales y optimiza operaciones con flujos de trabajo inteligentes.",
    features: ["n8n & Zapier", "Workflows custom", "Ahorro de tiempo"],
    proyectosLink: "/proyectos?categoria=Automatización",
  },
  {
    icon: Link2,
    title: "Integraciones API",
    description: "Conectamos tus herramientas favoritas para que trabajen juntas sin fricción.",
    features: ["APIs REST", "Webhooks", "Sincronización"],
    proyectosLink: "/proyectos?categoria=Aplicación",
  },
  {
    icon: Cloud,
    title: "Infraestructura AWS",
    description: "Arquitecturas en la nube seguras, escalables y con alta disponibilidad.",
    features: ["EC2 & Lambda", "RDS & S3", "DevOps"],
    proyectosLink: "/proyectos?categoria=AWS",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const Services = () => {
  return (
    <section id="servicios" className="py-24 md:py-32 relative">
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
            Lo que <span className="gradient-text">hacemos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluciones tecnológicas completas para empresas que quieren crecer
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Link
                to={service.proyectosLink}
                className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 flex flex-col h-full block"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Ver proyectos link */}
                  <p className="mt-5 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    Ver proyectos relacionados
                    <ArrowUpRight className="w-3 h-3" />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
