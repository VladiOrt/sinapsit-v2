import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { projects, categories, type Project } from "@/data/projects";

// ── Componente de tarjeta ──────────────────────────────────────────────────

const ProjectCard = ({ project }: { project: Project }) => {
  // Si tiene link externo → abre en nueva pestaña. Si no → navega a /proyectos/:id
  const isExternal = Boolean(project.link);

  const cardContent = (
    <>
      {/* Cover — imagen real o gradiente como fallback */}
      <div className={`h-52 relative overflow-hidden bg-gradient-to-br ${project.gradient}`}>
        {project.cover && (
          <motion.img
            src={project.cover}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
            variants={{ hover: { scale: 1.04 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        )}
        {/* Overlay sutil para contraste del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        {/* Arrow */}
        <motion.div
          variants={{ hover: { opacity: 1, x: 0, y: 0 } }}
          initial={{ opacity: 0, x: 6, y: -6 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/50 border border-foreground/20 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowUpRight className="w-4 h-4 text-foreground" />
        </motion.div>
        {/* Category pill */}
        <span className="absolute bottom-4 left-4 text-xs font-medium px-3 py-1 rounded-full bg-background/70 backdrop-blur-sm border border-border text-muted-foreground">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className="group relative rounded-2xl border border-border bg-card/40 overflow-hidden cursor-pointer"
    >
      {isExternal ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
          {cardContent}
        </a>
      ) : (
        <Link to={`/proyectos/${project.id}`} className="block h-full">
          {cardContent}
        </Link>
      )}
    </motion.article>
  );
};

// ── Página ─────────────────────────────────────────────────────────────────

const Proyectos = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("Todos");

  // Pre-filtra si llega con ?categoria= desde los servicios
  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat && (categories as readonly string[]).includes(cat)) {
      setActiveCategory(cat as typeof categories[number]);
    }
  }, [searchParams]);

  const filtered =
    activeCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
              Portafolio
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
              Proyectos
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Una selección de soluciones que hemos construido para clientes
              reales — desde plataformas web hasta arquitecturas cloud.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm px-4 py-2 rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid — bento asimétrico */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => {
                const colSpan =
                  project.size === "large"
                    ? "md:col-span-7"
                    : project.size === "medium"
                    ? "md:col-span-5"
                    : "md:col-span-4";

                const isEvenGroup = Math.floor(i / 2) % 2 === 0;
                const orderClass =
                  project.size === "large" && !isEvenGroup
                    ? "md:order-last"
                    : "";

                return (
                  <div key={project.id} className={`${colSpan} ${orderClass}`}>
                    <ProjectCard project={project} />
                  </div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-muted-foreground"
            >
              No hay proyectos en esta categoría aún.
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Proyectos;
