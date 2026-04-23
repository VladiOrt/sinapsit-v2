import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Tag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";

// ── Página de detalle de proyecto ──────────────────────────────────────────

const ProyectoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Proyecto no encontrado.</p>
        <button
          onClick={() => navigate("/proyectos")}
          className="text-sm text-primary underline"
        >
          Volver a proyectos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-24">
        {/* ── Hero del proyecto ───────────────────────────────────────── */}
        <div className={`relative w-full overflow-hidden mb-16`}>
          {/* Fondo con gradiente cálido */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />

          {/* Cover image */}
          {project.cover && (
            <motion.img
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 0.18, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              src={project.cover}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          )}

          <div className="relative container mx-auto px-4 md:px-6 max-w-4xl py-20">
            {/* Botón volver */}
            <motion.button
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => navigate("/proyectos")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Volver a proyectos
            </motion.button>

            {/* Category badge */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary mb-4"
            >
              {project.category}
            </motion.span>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              {project.title}
            </motion.h1>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-secondary border border-border/50 text-muted-foreground flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Contenido principal ─────────────────────────────────────── */}
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Descripción larga */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="md:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                  Sobre el proyecto
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {project.longDescription}
                </p>
              </div>

              {/* Características / features */}
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-5">
                  Lo que incluye
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feat, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {feat}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Panel lateral */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-6"
            >
              {/* Card de info */}
              <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-5">
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                    Categoría
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {project.category}
                  </p>
                </div>
                <div className="border-t border-border/50 pt-4">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                    Tecnologías
                  </p>
                  <div className="flex flex-wrap gap-1.5">
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

                {/* Botón ver sitio */}
                {project.link && (
                  <div className="border-t border-border/50 pt-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                    >
                      Ver sitio en vivo
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

              {/* Botón volver */}
              <button
                onClick={() => navigate("/proyectos")}
                className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground border border-border rounded-xl px-4 py-2.5 hover:border-foreground/30 hover:text-foreground transition-all duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Todos los proyectos
              </button>
            </motion.aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProyectoDetalle;
