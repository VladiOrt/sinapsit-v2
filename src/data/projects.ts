// ── Tipos ──────────────────────────────────────────────────────────────────

export type Category = "Todos" | "Web" | "Aplicación" | "Automatización" | "AWS";

export interface Project {
  id: number;
  title: string;
  description: string;          // Texto corto para la card
  longDescription: string;      // Descripción completa para la página de detalle
  category: Exclude<Category, "Todos">;
  tags: string[];
  size: "large" | "medium" | "small";
  gradient: string;
  cover?: string;               // Si existe, se muestra como imagen. Si no, usa gradiente.
  link?: string;                // Si existe, la card abre URL externa. Si no, abre /proyectos/:id
  features: string[];           // Puntos clave del proyecto para la página de detalle
}

// ── Datos ──────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 1,
    title: "Cantina La Llorona",
    description:
      "Propuesta de rediseño para una cantina mexicana icónica. Identidad visual oscura y atmosférica, menú interactivo y experiencia inmersiva.",
    longDescription:
      "Cantina La Llorona es un proyecto de rediseño web para una cantina mexicana con historia. La propuesta busca capturar esa atmósfera oscura y cargada de tradición que define al lugar: colores profundos, tipografía expresiva y transiciones cinematográficas que hacen sentir al usuario dentro del ambiente mismo de la cantina. Se desarrolló un menú interactivo con filtros por categoría, galería de ambiente y sección de historia de la marca.",
    category: "Web",
    tags: ["React", "Framer Motion", "Tailwind"],
    size: "large",
    gradient: "from-red-900/25 via-amber-900/15 to-transparent",
    cover: "/projects/lallorona.png",
    link: "https://lallorona.sinapsit.mx/",
    features: [
      "Identidad visual oscura y atmosférica alineada al concepto de la cantina",
      "Menú digital interactivo con filtros por categoría",
      "Animaciones cinematográficas con Framer Motion",
      "Galería de ambiente con efecto parallax",
      "Diseño 100% responsive y optimizado para SEO",
    ],
  },
  {
    id: 2,
    title: "CRM Personalizado",
    description:
      "Sistema de gestión de clientes con pipeline de ventas, reportes y automatización de seguimientos.",
    longDescription:
      "Desarrollo de un CRM a medida para empresa de servicios, diseñado desde cero para adaptarse exactamente al flujo de ventas del equipo. Incluye un pipeline de deals visual con drag & drop, sistema de etapas personalizable, generación de reportes exportables, y automatización de correos y tareas de seguimiento en función del estado de cada oportunidad.",
    category: "Aplicación",
    tags: ["React", "Node.js", "MongoDB"],
    size: "medium",
    gradient: "from-purple-600/20 via-violet-500/10 to-transparent",
    cover: "/projects/crm-personalizado.png",
    features: [
      "Pipeline de ventas visual con drag & drop entre etapas",
      "Gestión de contactos, empresas y deals centralizada",
      "Reportes exportables de rendimiento por vendedor y por período",
      "Automatización de correos y tareas según estado del deal",
      "Historial completo de interacciones por cliente",
    ],
  },
  {
    id: 3,
    title: "Pipeline de Datos AWS",
    description:
      "Arquitectura serverless para procesamiento de datos masivos con Lambda, S3 y RDS.",
    longDescription:
      "Diseño e implementación de una arquitectura serverless sobre AWS para el procesamiento y transformación de grandes volúmenes de datos. El pipeline ingesta datos desde múltiples fuentes, los procesa con funciones Lambda en paralelo, los almacena estructurados en RDS y genera alertas automáticas ante anomalías via CloudWatch. Totalmente escalable y con costos proporcionales al uso real.",
    category: "AWS",
    tags: ["Lambda", "S3", "RDS", "CloudWatch"],
    size: "small",
    gradient: "from-orange-600/20 via-amber-500/10 to-transparent",
    cover: "/projects/pipeline-datos-aws.png",
    features: [
      "Ingesta multi-fuente con triggers automáticos en S3",
      "Procesamiento paralelo con funciones Lambda",
      "Almacenamiento estructurado en RDS (PostgreSQL)",
      "Monitoreo y alertas en tiempo real con CloudWatch",
      "Arquitectura escalable y de bajo costo operativo",
    ],
  },
  {
    id: 4,
    title: "Bot de Facturación",
    description:
      "Automatización completa del proceso de facturación: lectura de correos, generación de facturas y envío automático.",
    longDescription:
      "Solución de automatización que eliminó por completo el trabajo manual en el proceso de facturación de un cliente. El bot monitorea una bandeja de correo, extrae los datos necesarios, genera los CFDI correspondientes a través de la API del SAT, y los envía automáticamente al cliente con copia al departamento contable. Todo el flujo corre sin intervención humana.",
    category: "Automatización",
    tags: ["n8n", "Zapier", "API SAT"],
    size: "small",
    gradient: "from-emerald-600/20 via-green-500/10 to-transparent",
    cover: "/projects/bot-facturacion.png",
    features: [
      "Lectura e interpretación automática de correos entrantes",
      "Generación de CFDI 4.0 vía API del SAT",
      "Envío automático de facturas con copia contable",
      "Registro y trazabilidad de cada factura generada",
      "Manejo de errores y alertas ante fallos",
    ],
  },
  {
    id: 5,
    title: "Dashboard de Analíticas",
    description:
      "Panel ejecutivo con métricas en tiempo real, visualizaciones interactivas y exportación de reportes.",
    longDescription:
      "Panel de control ejecutivo para monitoreo de métricas de negocio en tiempo real. Con conexión websocket a las fuentes de datos, el dashboard actualiza las visualizaciones de forma continua sin necesidad de recargar. Incluye gráficas comparativas por período, tablas de rendimiento con filtros avanzados y exportación de reportes en PDF y Excel con un clic.",
    category: "Aplicación",
    tags: ["React", "Recharts", "WebSocket"],
    size: "large",
    gradient: "from-indigo-600/20 via-blue-500/10 to-transparent",
    cover: "/projects/dashboard-analiticas.png",
    features: [
      "Métricas en tiempo real mediante conexión WebSocket",
      "Gráficas interactivas comparativas por período",
      "Tablas de rendimiento con filtros y búsqueda avanzada",
      "Exportación de reportes en PDF y Excel",
      "Diseño responsive optimizado para pantallas ejecutivas",
    ],
  },
  {
    id: 6,
    title: "Landing Corporativa",
    description:
      "Sitio institucional optimizado para SEO con animaciones premium y score Lighthouse 98+.",
    longDescription:
      "Desarrollo de landing page institucional de alto rendimiento para empresa del sector financiero. El sitio combina un diseño premium con animaciones fluidas y una arquitectura técnica que garantiza carga rápida y visibilidad en buscadores. Se alcanzó un score Lighthouse 98+ en todas las categorías y se configuró la estrategia de SEO on-page completa.",
    category: "Web",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    size: "medium",
    gradient: "from-pink-600/20 via-rose-500/10 to-transparent",
    cover: "/projects/landing-corporativa.png",
    features: [
      "Score Lighthouse 98+ en Performance, SEO y Accesibilidad",
      "Animaciones de entrada premium con Framer Motion",
      "SEO on-page completo: meta tags, schema markup y Open Graph",
      "Diseño responsive adaptado a todos los dispositivos",
      "Deploy en CDN con tiempo de carga inferior a 1.2 s",
    ],
  },
  {
    id: 7,
    title: "tBE Studio",
    description:
      "Sitio web completo para una agencia de diseño y branding. Identidad visual impactante, experiencia de portafolio inmersiva y navegación fluida.",
    longDescription:
      "Desarrollo completo del sitio web para tBE Studio, agencia de diseño y branding. El proyecto abarcó desde la definición de la arquitectura de información hasta el deploy en producción. El resultado es una experiencia digital que refleja la personalidad audaz de la agencia: fondo naranja vibrante, tipografía expresiva, portafolio interactivo y animaciones fluidas que refuerzan la identidad de marca.",
    category: "Web",
    tags: ["React", "Framer Motion", "Tailwind"],
    size: "large",
    gradient: "from-orange-600/25 via-red-500/15 to-transparent",
    cover: "/projects/tbestudio.png",
    link: "https://tbe.sinapsit.mx/",
    features: [
      "Sitio institucional completo con identidad visual vibrante",
      "Sección de portafolio con filtros y animaciones interactivas",
      "Diseño de marca coherente en todos los puntos de contacto",
      "Animaciones y transiciones de página con Framer Motion",
      "Optimización SEO y deploy en infraestructura propia",
    ],
  },
  {
    id: 8,
    title: "Agente IA — Spa",
    description:
      "Asistente conversacional inteligente para un spa de lujo. Gestiona reservas, responde preguntas sobre tratamientos y guía al cliente durante todo el proceso de atención.",
    longDescription:
      "Agente de inteligencia artificial conversacional diseñado para un spa de lujo, disponible 24/7 vía WhatsApp. El agente conoce el catálogo completo de tratamientos, gestiona la disponibilidad de agenda en tiempo real, confirma y recuerda citas, y responde preguntas frecuentes con el tono y personalidad de la marca. Reduce la carga del equipo de recepción sin perder la calidez del servicio.",
    category: "Automatización",
    tags: ["IA Conversacional", "n8n", "WhatsApp API", "LLM"],
    size: "medium",
    gradient: "from-teal-600/20 via-cyan-500/10 to-transparent",
    cover: "/projects/agente-ia-spa.png",
    features: [
      "Atención al cliente 24/7 vía WhatsApp sin intervención humana",
      "Gestión de agenda y reservas en tiempo real",
      "Recordatorios automáticos de cita por WhatsApp",
      "Respuestas alineadas al tono y personalidad de la marca",
      "Escalado a agente humano ante situaciones complejas",
    ],
  },
  {
    id: 9,
    title: "Agente IA — Clínica Estética",
    description:
      "Agente de inteligencia artificial para clínica de medicina estética. Califica leads, agenda citas, responde dudas sobre procedimientos y da seguimiento post-tratamiento.",
    longDescription:
      "Agente conversacional con IA para clínica de medicina estética que acompaña al prospecto desde el primer contacto hasta el seguimiento post-tratamiento. El agente califica leads haciendo las preguntas clave, agenda la consulta de valoración, responde dudas sobre procedimientos con información médica verificada, y hace seguimiento personalizado días después de cada tratamiento para recopilar feedback.",
    category: "Automatización",
    tags: ["IA Conversacional", "LLM", "CRM", "WhatsApp API"],
    size: "small",
    gradient: "from-rose-600/20 via-pink-500/10 to-transparent",
    cover: "/projects/agente-ia-clinica.png",
    features: [
      "Calificación automática de leads con preguntas de filtro",
      "Agendamiento de consultas de valoración en tiempo real",
      "Base de conocimiento médica sobre procedimientos y cuidados",
      "Seguimiento post-tratamiento personalizado por WhatsApp",
      "Integración con CRM para registro de cada interacción",
    ],
  },
  {
    id: 10,
    title: "n8n Self-Hosted",
    description:
      "Instalación y configuración de n8n en servidores Ubuntu. Automatizaciones complejas en infraestructura propia, con control total sobre los datos y flujos de trabajo.",
    longDescription:
      "Instalación, configuración y puesta en marcha de instancias self-hosted de n8n sobre servidores Ubuntu. El servicio incluye configuración de dominio personalizado con HTTPS, autenticación segura, configuración de variables de entorno y credenciales, backups programados de los flujos y monitoreo de disponibilidad. El cliente obtiene una plataforma de automatización completamente bajo su control.",
    category: "Automatización",
    tags: ["n8n", "Ubuntu", "Docker", "Self-Hosted"],
    size: "small",
    gradient: "from-violet-600/20 via-purple-500/10 to-transparent",
    cover: "/projects/n8n-self-hosted.png",
    features: [
      "Instalación de n8n con Docker en servidor Ubuntu",
      "Configuración de dominio personalizado con SSL/HTTPS",
      "Autenticación y control de acceso configurados",
      "Backups automáticos de flujos y credenciales",
      "Monitoreo de uptime y alertas ante caídas",
    ],
  },
  {
    id: 11,
    title: "Supabase Self-Hosted",
    description:
      "Despliegue y configuración de Supabase en servidores Ubuntu propios. Backend completo con base de datos, autenticación, storage y APIs listo para producción.",
    longDescription:
      "Despliegue de Supabase en infraestructura propia sobre Ubuntu, brindando al cliente un backend completo sin depender de terceros. La configuración incluye PostgreSQL optimizado, autenticación con múltiples proveedores (email, OAuth), storage para archivos, APIs auto-generadas y panel de administración. Ideal para proyectos que requieren control total de sus datos y cumplimiento de normativas.",
    category: "AWS",
    tags: ["Supabase", "PostgreSQL", "Ubuntu", "Docker"],
    size: "medium",
    gradient: "from-emerald-600/20 via-green-500/10 to-transparent",
    cover: "/projects/supabase-self-hosted.png",
    features: [
      "PostgreSQL optimizado para producción con backups automáticos",
      "Autenticación multi-proveedor: email, Google, GitHub y más",
      "Storage de archivos con control de acceso granular",
      "APIs REST y GraphQL auto-generadas desde el esquema",
      "Panel de administración y logs en tiempo real",
    ],
  },
  {
    id: 12,
    title: "Deploy & Hosting AWS",
    description:
      "Despliegue de aplicaciones web y landings en S3 y EC2, con configuración de dominios y routing en Route 53. Infraestructura lista para escalar desde el día uno.",
    longDescription:
      "Servicio completo de deploy e infraestructura en AWS para aplicaciones web y landings. Se configura la arquitectura más adecuada según el tipo de proyecto: S3 + CloudFront para sitios estáticos con CDN global, o EC2 con balanceador de carga para aplicaciones dinámicas. En todos los casos se configura Route 53 para el manejo de dominios, certificados SSL y política de redirecciones.",
    category: "AWS",
    tags: ["S3", "EC2", "Route 53", "Ubuntu"],
    size: "large",
    gradient: "from-amber-600/20 via-orange-500/10 to-transparent",
    cover: "/projects/deploy-hosting-aws.png",
    features: [
      "Deploy en S3 + CloudFront para sitios estáticos con CDN global",
      "Deploy en EC2 con configuración de servidor NGINX/PM2",
      "Configuración de dominios y subdominios en Route 53",
      "Certificados SSL automáticos con AWS Certificate Manager",
      "Setup de CI/CD para deploys automáticos desde GitHub",
    ],
  },
  {
    id: 13,
    title: "App de Descuentos en HubSpot",
    description:
      "Aplicación embebida dentro de HubSpot para la gestión y aplicación de descuentos en el proceso de ventas.",
    longDescription:
      "Aplicación custom integrada directamente en el CRM de HubSpot que permite a los ejecutivos de ventas solicitar, aprobar y aplicar descuentos sobre deals sin salir de la plataforma. Incluye un sistema de niveles de aprobación según el porcentaje de descuento, historial completo de descuentos aplicados por deal y vendedor, y reglas de negocio configurables por el administrador.",
    category: "Aplicación",
    tags: ["HubSpot", "React", "HubSpot API", "Node.js"],
    size: "large",
    gradient: "from-orange-500/20 via-yellow-500/10 to-transparent",
    cover: "/projects/app-descuentos-hubspot.png",
    features: [
      "UI embebida en la barra lateral de HubSpot via Extensions API",
      "Flujo de aprobación por niveles según porcentaje de descuento",
      "Historial y auditoría de descuentos por deal y por vendedor",
      "Reglas de negocio configurables desde panel de administración",
      "Sincronización automática con las líneas de producto del deal",
    ],
  },
  {
    id: 14,
    title: "Integración CRM — HubSpot & Pipedrive",
    description:
      "Sincronización bidireccional entre HubSpot, Pipedrive y aplicaciones propias. Contactos, deals y actividades unificados en tiempo real.",
    longDescription:
      "Diseño e implementación de una integración bidireccional entre HubSpot, Pipedrive y aplicaciones internas del cliente. La integración mantiene sincronizados contactos, deals y actividades entre los sistemas en tiempo real mediante webhooks, evitando duplicados con lógica de desduplicación inteligente. Se conectaron también las aplicaciones propias del cliente al ecosistema CRM para centralizar toda la información comercial.",
    category: "Aplicación",
    tags: ["HubSpot API", "Pipedrive API", "n8n", "Webhooks"],
    size: "medium",
    gradient: "from-sky-600/20 via-blue-500/10 to-transparent",
    cover: "/projects/integracion-crm-hubspot-pipedrive.png",
    features: [
      "Sincronización bidireccional en tiempo real vía webhooks",
      "Desduplicación inteligente de contactos entre plataformas",
      "Mapeo de campos personalizado entre HubSpot y Pipedrive",
      "Conexión de aplicaciones propias al ecosistema CRM",
      "Log de sincronizaciones y manejo de errores automatizado",
    ],
  },
];

export const categories: Category[] = [
  "Todos",
  "Web",
  "Aplicación",
  "Automatización",
  "AWS",
];
