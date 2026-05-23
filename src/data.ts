import { DeveloperProfile, SkillCategory, Project } from './types';

export const developerProfile: DeveloperProfile = {
  name: "Andrés Sánchez",
  title: "Full Stack Developer Junior",
  location: "Medellín, Colombia (Híbrido / Remoto)",
  email: "andres.xa@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  shortSummary: "Desarrollador Full Stack Junior enfocado en construir productos funcionales con UX cuidada, APIs claras y automatizaciones útiles para el usuario final.",
  aboutMe: "Soy un desarrollador de software con una sólida base en principios de ingeniería. Me apasiona resolver problemas complejos traduciéndolos en código limpio y eficiente. Actualmente me muevo en el ecosistema de JavaScript y TypeScript (React + Vite, Node.js + Express) y he construido aplicaciones de escritorio con Electron.\nTambién me interesa la seguridad aplicada (cifrado, derivación de claves y almacenamiento local) y el despliegue de proyectos reales en plataformas como Vercel y Render."
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    color: "indigo",
    skills: [
      { name: "Node.js & Express", level: "Avanzado", iconName: "Server", description: "Diseño de APIs REST con validación de parámetros, manejo de errores y endpoints listos para consumo en frontend." },
      { name: "APIs RESTful", level: "Avanzado", iconName: "CornerDownRight", description: "Contratos claros (request/response), serialización, manejo de status codes y ejemplos de integración." },
      { name: "Servicios utilitarios (QR)", level: "Intermedio", iconName: "Cpu", description: "Microservicios para generación de assets (PNG) desde parámetros y consumo simple vía querystring." },
      { name: "Arquitectura y Clean Code", level: "Intermedio", iconName: "GitBranch", description: "Separación por capas, responsabilidades claras y mantenimiento fácil en proyectos reales." }
    ]
  },
  {
    title: "Frontend",
    color: "cyan",
    skills: [
      { name: "React (Vite)", level: "Avanzado", iconName: "Layers", description: "Construcción de SPA rápidas, componentes reutilizables y flujos de UI interactivos." },
      { name: "TypeScript", level: "Avanzado", iconName: "Code2", description: "Uso riguroso de tipado estricto, interfaces complejas y genéricos para código seguro." },
      { name: "Tailwind CSS", level: "Avanzado", iconName: "Palette", description: "Maquetación ágil, responsiva y altamente personalizada usando sistemas de diseño basados en utilidades." },
      { name: "Electron (Desktop)", level: "Intermedio", iconName: "Cpu", description: "Aplicaciones de escritorio con IPC seguro (preload + contextBridge), instaladores y flujos orientados a Windows." }
    ]
  },
  {
    title: "Bases de Datos",
    color: "emerald",
    skills: [
      { name: "localStorage (Persistencia Cliente)", level: "Avanzado", iconName: "Database", description: "Persistencia de estado/objetos en navegador y estrategias para lectura/escritura segura y consistente." },
      { name: "Backups & Export/Import", level: "Intermedio", iconName: "FolderOpen", description: "Exportación e importación de datos (incluyendo backups encriptados) con control de versión del payload." },
      { name: "Cifrado en reposo", level: "Intermedio", iconName: "Zap", description: "Protección de datos antes de persistirlos (AES-GCM) y derivación de claves (PBKDF2) a nivel cliente." }
    ]
  },
  {
    title: "Cloud / DevOps",
    color: "purple",
    skills: [
      { name: "Git & GitHub", level: "Avanzado", iconName: "Github", description: "Trabajo por ramas, merge limpio, snapshots (tags) y repositorios listos para revisión." },
      { name: "Deploy en Vercel", level: "Intermedio", iconName: "Cloud", description: "Publicación de aplicaciones web (SPA/PWA) con URL accesible y despliegue continuo." },
      { name: "Deploy en Render", level: "Intermedio", iconName: "Cloud", description: "Despliegue de servicios Node.js (Express) para exponer endpoints públicos y demos consumibles." },
      { name: "Distribución (Releases)", level: "Intermedio", iconName: "ClipboardList", description: "Publicación de builds y entregables (releases) para descargar/probar proyectos." }
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
    apiMockMethod: "POST",
    apiMockEndpoint: "/api/securepass/vault/entries",
    apiMockResponse: {
      vault: "securepass",
      action: "store_encrypted_entry",
      crypto: {
        algorithm: "AES-256-GCM",
        kdf: "PBKDF2"
      }
    }
  },
  {
    id: "qr-generator-api",
    title: "QR Generator API",
    description: "Microservicio en Node.js (Express) que genera códigos QR PNG desde texto por querystring.",
    longDescription: "API REST en Node.js (Express) para generar códigos QR en PNG a partir de un parámetro `texto`.\nIncluye endpoints para devolver JSON con Data URL, PNG binario y base64 sin prefijo data:.\nPensado para integrarse rápido con frontends y automatizaciones.",
    tags: ["Node.js", "Express", "REST", "QRCode", "JavaScript", "Render"],
    category: "Backend",
    githubUrl: "https://github.com/Furiade54/qr-generator-api",
    liveUrl: "https://qr-generator-api-1z0m.onrender.com/",
    features: [
      "GET /generar: devuelve JSON con Data URL (data:image/png;base64,...) y link a /qr.",
      "GET /qr: devuelve PNG binario (Content-Type image/png).",
      "GET /qrtexto: devuelve JSON con base64 del PNG (sin prefijo data:).",
      "Parámetros: texto (obligatorio) y width (opcional) validado.",
      "Configurable por variables de entorno (PORT, QR_WIDTH, etc.)."
    ],
    apiMockMethod: "GET",
    apiMockEndpoint: "/api/qr/generar?texto=hola%20mundo&width=250",
    apiMockResponse: {
      ok: true,
      endpoint: "/generar",
      params: { texto: "hola mundo", width: 250 },
      qrCodigoUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
      link: "https://qr-generator-api-1z0m.onrender.com/qr?texto=hola%20mundo&width=250"
    }
  }
];
