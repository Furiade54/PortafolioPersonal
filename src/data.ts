import { DeveloperProfile, SkillCategory, Project } from './types';

export const developerProfile: DeveloperProfile = {
  name: "Andrés Sánchez",
  title: "Full Stack Developer Junior",
  location: "Medellín, Colombia (Híbrido / Remoto)",
  email: "mateosilva.dev@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  shortSummary: "Desarrollador Full Stack Junior entusiasta por las arquitecturas limpias, el rendimiento de base de datos y la creación de interfaces web fluidas y pixel-perfect.",
  aboutMe: "Soy un desarrollador de software con una sólida base en principios de ingeniería. Me apasiona resolver problemas complejos traduciéndolos en código limpio y eficiente. Aunque actualmente me especializo en el ecosistema de JavaScript y TypeScript (React, Node.js, Express), también disfruto explorando backend con Python e infraestructura cloud mediante Docker y CI/CD. Mi enfoque se centra en crear aplicaciones estables que ofrezcan una excelente experiencia de usuario, buscando siempre aprender nuevas tecnologías y sumarme a equipos de alto rendimiento."
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    color: "indigo",
    skills: [
      { name: "Node.js & Express", level: "Avanzado", iconName: "Server", description: "Creación de APIs REST robustas, middlewares de autenticación y manejo de flujos asíncronos." },
      { name: "Python & FastAPI", level: "Intermedio", iconName: "Cpu", description: "Construcción rápida de microservicios e integraciones con validación estricta usando Pydantic." },
      { name: "APIs RESTful & GraphQL", level: "Avanzado", iconName: "CornerDownRight", description: "Diseño lógico de endpoints, serialización de datos y paginación eficiente." },
      { name: "Arquitectura y Clean Code", level: "Intermedio", iconName: "GitBranch", description: "Mapeo de arquitectura en capas, principios SOLID y patrones de diseño creacionales." }
    ]
  },
  {
    title: "Frontend",
    color: "cyan",
    skills: [
      { name: "React (Vite/Next.js)", level: "Avanzado", iconName: "Layers", description: "Creación de Single Page Applications interactivas con manejo de estado avanzado (Context/Zustand)." },
      { name: "TypeScript", level: "Avanzado", iconName: "Code2", description: "Uso riguroso de tipado estricto, interfaces complejas y genéricos para código seguro." },
      { name: "Tailwind CSS", level: "Avanzado", iconName: "Palette", description: "Maquetación ágil, responsiva y altamente personalizada usando sistemas de diseño basados en utilidades." },
      { name: "State Management", level: "Intermedio", iconName: "Network", description: "Manejo eficiente de flujos de datos globales, optimización y caching de consultas remotas." }
    ]
  },
  {
    title: "Bases de Datos",
    color: "emerald",
    skills: [
      { name: "PostgreSQL", level: "Avanzado", iconName: "Database", description: "Diseño de esquemas relacionales trascendentes, optimización de índices, transacciones y consultas SQL complejas." },
      { name: "MongoDB", level: "Intermedio", iconName: "FolderOpen", description: "Modelado de datos no relacionales, agregaciones avanzadas y colecciones dinámicas." },
      { name: "Redis", level: "Iniciando", iconName: "Zap", description: "Estrategias básicas de almacenamiento en caché para acelerar tiempos de respuesta de APIs." },
      { name: "Firestore / Firebase", level: "Intermedio", iconName: "Flame", description: "Implementación ágil de bases de datos en tiempo real y reglas de seguridad granulares." }
    ]
  },
  {
    title: "Cloud / DevOps",
    color: "purple",
    skills: [
      { name: "Docker", level: "Intermedio", iconName: "Container", description: "Contenerización de entornos de desarrollo y empaquetado para despliegues consistentes en producción." },
      { name: "Git & GitHub Actions", level: "Avanzado", iconName: "Github", description: "Estrategias de ramificación limpia (GitFlow) y automatización de pipelines CI/CD básicos." },
      { name: "AWS (S3 & EC2)", level: "Iniciando", iconName: "Cloud", description: "Configuración de almacenamiento estático y despliegue simple de servidores virtuales linux." },
      { name: "Metodologías Ágiles", level: "Intermedio", iconName: "ClipboardList", description: "Colaboración eficaz usando Scrum, tableros Kanban e hitos iterativos de entrega." }
    ]
  }
];

export const projects: Project[] = [
  {
    id: "softpack-launcher",
    title: "Softpack Launcher",
    description: "Instalador de software para Windows con Winget y modo offline.",
    longDescription: "Aplicación de escritorio (Electron + React + TypeScript) para instalar y aprovisionar software en Windows.\nIntegra un catálogo categorizado con búsqueda y permite instalar por Winget o desde instaladores locales.\nIncluye consola integrada con logs en tiempo real, tema light/dark e IPC seguro mediante preload + contextBridge.",
    tags: ["Electron", "React", "TypeScript", "Vite", "Tailwind CSS", "Winget", "Node.js"],
    category: "Fullstack",
    githubUrl: "https://github.com/Furiade54/InstallTools",
    liveUrl: "https://github.com/Furiade54/InstallTools/releases",
    features: [
      "Catálogo de programas categorizado con buscador.",
      "Instalación por Winget (Windows Package Manager).",
      "Instalación offline con instaladores locales (.exe/.msi).",
      "Consola integrada con seguimiento en tiempo real.",
      "Tema Light/Dark con preferencia persistente.",
      "Logs en producción (técnico + acciones del usuario)."
    ],
    apiMockMethod: "POST",
    apiMockEndpoint: "/api/softpack/winget/install",
    apiMockResponse: {
      ok: true,
      tool: "winget",
      action: "install",
      packageId: "Google.Chrome",
      flags: ["--silent", "--accept-source-agreements", "--accept-package-agreements"],
      exitCode: 0,
      installed: true
    }
  },
  {
    id: "securepass-vault",
    title: "SecurePass Vault",
    description: "Gestor de contraseñas en navegador con cifrado AES-256-GCM y bóveda con auto-bloqueo.",
    longDescription: "Aplicación web (React + TypeScript + Vite) para gestionar contraseñas con cifrado AES-256-GCM, derivación de claves por PBKDF2 y bóveda con auto-bloqueo por inactividad.\nIncluye desbloqueo por gestos (hash SHA-256), generador de contraseñas con entropía criptográfica y exportación/importación de backups encriptados.\nDiseñada para ser rápida (render virtualizado) y preparada para PWA.",
    tags: ["React", "TypeScript", "Vite", "PWA", "Crypto", "AES-256-GCM", "PBKDF2"],
    category: "Frontend",
    githubUrl: "https://github.com/Furiade54/SecurePass",
    liveUrl: "https://secure-pass-6vey.vercel.app",
    features: [
      "Cifrado AES-256-GCM con derivación PBKDF2.",
      "Auto-bloqueo por inactividad y limpieza de memoria al bloquear.",
      "Desbloqueo por gestos con hash SHA-256.",
      "Generador de contraseñas seguras con verificación de fortaleza.",
      "Exportación/importación de backups encriptados.",
      "Búsqueda y categorización para gestión rápida."
    ],
    apiMockEndpoint: "/api/securepass/vault/status",
    apiMockResponse: {
      vault: "securepass",
      status: "locked",
      crypto: {
        algorithm: "AES-256-GCM",
        kdf: "PBKDF2"
      }
    }
  }
];
