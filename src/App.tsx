import React, { useState, useEffect, useRef } from 'react';
import {
  Server,
  Cpu,
  CornerDownRight,
  GitBranch,
  Layers,
  Code2,
  Palette,
  Network,
  Database,
  FolderOpen,
  Zap,
  Flame,
  Container,
  Github,
  Cloud,
  ClipboardList,
  Mail,
  MapPin,
  ExternalLink,
  Terminal,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Trash2,
  Code,
  FileCode,
  Play,
  ArrowRight,
  User,
  CheckCircle,
} from 'lucide-react';

import { developerProfile, skillCategories, projects } from './data';
import { Skill, Project } from './types';

// Helper to look up Lucide icons dynamically
function getSkillIcon(iconName: string) {
  switch (iconName) {
    case 'Server': return Server;
    case 'Cpu': return Cpu;
    case 'CornerDownRight': return CornerDownRight;
    case 'GitBranch': return GitBranch;
    case 'Layers': return Layers;
    case 'Code2': return Code2;
    case 'Palette': return Palette;
    case 'Network': return Network;
    case 'Database': return Database;
    case 'FolderOpen': return FolderOpen;
    case 'Zap': return Zap;
    case 'Flame': return Flame;
    case 'Container': return Container;
    case 'Github': return Github;
    case 'Cloud': return Cloud;
    case 'ClipboardList': return ClipboardList;
    default: return Code;
  }
}

interface Message {
  id: string;
  name: string;
  company: string;
  email: string;
  text: string;
  date: string;
}

export default function App() {
  // Navigation active state highlight on scroll
  const [activeSection, setActiveSection] = useState('hero');
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(false);
  const particlesLayerRef = useRef<HTMLDivElement | null>(null);

  // Terminal state in Hero Section
  const [terminalTab, setTerminalTab] = useState<'profile' | 'tests' | 'source'>('profile');
  const [runningTests, setRunningTests] = useState(false);
  const [testOutput, setTestOutput] = useState<string[]>([]);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>(skillCategories[0].title);
  const [selectedSkillInfo, setSelectedSkillInfo] = useState<Skill | null>(skillCategories[0].skills[0]);

  // Project API Simulator state
  const [activeSimulatingProject, setActiveSimulatingProject] = useState<string | null>(null);
  const [simulationResponse, setSimulationResponse] = useState<Record<string, unknown> | null>(null);
  const [simulationOutputLogs, setSimulationOutputLogs] = useState<string[]>([]);
  const [simulationLoading, setSimulationLoading] = useState(false);
  const simulationRunIdRef = useRef(0);

  // Recruiter guestbook/contact state
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Initial load: fetch saved messages from localStorage or initialize with defaults
  useEffect(() => {
    const saved = localStorage.getItem('recruiters_messages_v1');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        // Fallback to defaults
        initializeDefaultMessages();
      }
    } else {
      initializeDefaultMessages();
    }

    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 160;
      const nextHeaderTransparent = window.scrollY > 8;
      setIsHeaderTransparent(prev => (prev === nextHeaderTransparent ? prev : nextHeaderTransparent));

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = particlesLayerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

    container.innerHTML = '';

    const PARTICLE_COUNT = prefersReducedMotion ? 50 : 90;
    const REPEL_RADIUS = 160;
    const REPEL_FORCE = 0.5;
    const RETURN_FORCE = 0.03;
    const FRICTION = 0.93;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const particles: Array<{
      el: HTMLDivElement;
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      floatSpeed: number;
      driftX: number;
    }> = [];

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const el = document.createElement('div');
      el.className = 'particle';
      container.appendChild(el);

      const size = Math.random() * 4 + 3;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = `${Math.random() * 0.6 + 0.2}`;

      particles.push({
        el,
        x,
        y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        floatSpeed: prefersReducedMotion ? Math.random() * 0.35 + 0.25 : Math.random() * 1.4 + 0.7,
        driftX: (Math.random() - 0.5) * 0.9
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onResize = () => {
      mouse.x = window.innerWidth / 2;
      mouse.y = window.innerHeight / 2;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    let rafId = 0;
    const animate = () => {
      for (const p of particles) {
        p.baseY -= p.floatSpeed;
        p.baseX += p.driftX;

        if (p.baseX < -40) p.baseX = window.innerWidth + 40;
        if (p.baseX > window.innerWidth + 40) p.baseX = -40;

        if (p.baseY < -20) {
          p.baseY = window.innerHeight + 20;
          p.baseX = Math.random() * window.innerWidth;
        }

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < REPEL_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          p.vx -= Math.cos(angle) * force * REPEL_FORCE;
          p.vy -= Math.sin(angle) * force * REPEL_FORCE;
          p.el.style.boxShadow = '0 0 18px rgba(0, 217, 255, 0.95), 0 0 40px rgba(0, 217, 255, 0.35)';
        } else {
          p.el.style.boxShadow = '0 0 8px rgba(0, 217, 255, 0.35)';
        }

        p.vx += (p.baseX - p.x) * RETURN_FORCE;
        p.vy += (p.baseY - p.y) * RETURN_FORCE;

        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;

        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(rafId);
      container.innerHTML = '';
    };
  }, []);

  const initializeDefaultMessages = () => {
    const defaults: Message[] = [
      {
        id: 'def-1',
        name: 'Paula Gómez',
        company: 'Innovate Tech SL',
        email: 'paula.gomez@innovate.io',
        text: '¡Excelente portfolio, Andrés! Nos gusta mucho tu enfoque limpio en TypeScript y tu iniciativa para documentar APIs con simuladores. Te contactaremos pronto para conversar sobre una posición junior.',
        date: '2026-05-22 10:45'
      },
      {
        id: 'def-2',
        name: 'Adrián Ferrer',
        company: 'CloudSphere UK',
        email: 'a.ferrer@cloudsphere.co.uk',
        text: 'Muy impresionado con el orden de tu código y la organización DevOps que propones para tu nivel. Una landing page sumamente profesional.',
        date: '2026-05-21 16:30'
      }
    ];
    setMessages(defaults);
    localStorage.setItem('recruiters_messages_v1', JSON.stringify(defaults));
  };

  // Run mock shell scripts in Hero Section terminal
  const startShellTests = () => {
    if (runningTests) return;
    setRunningTests(true);
    setTestOutput([]);
    
    const logs = [
      '[INFO] Initializing Junior Dev Environment test suite...',
      '[INFO] Inspecting src/App.tsx and package.json config...',
      '[INFO] Running TypeScript strictly-typed checks...',
      '[OK]   TS Compile: Success (0 warnings / StrictMode: Active)',
      '[INFO] Bundler: Vite optimizing build variables...',
      '[INFO] Checking PostgreSQL schema connections & seed states...',
      '[OK]   DB pool: Warm and responsive (42ms query index check)',
      '[INFO] Testing REST APIs status checks (FastAPI / Express)...',
      '[DONE] All automated checks: PASSED'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTestOutput(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setRunningTests(false);
        }
      }, (index + 1) * 350);
    });
  };

  // Run local project API Simulator
  const triggerApiSimulation = (project: Project) => {
    if (activeSimulatingProject === project.id && simulationLoading) return;

    const runId = Date.now();
    simulationRunIdRef.current = runId;

    const method = project.apiMockMethod ?? 'GET';
    const endpoint = project.apiMockEndpoint ?? '/api/mock';

    setActiveSimulatingProject(project.id);
    setSimulationLoading(true);
    setSimulationResponse(null);
    setSimulationOutputLogs(() => {
      if (project.id === 'softpack-launcher') {
        return [
          `[REQ] ${method} ${endpoint}`,
          `[HDR] Content-Type: application/json`,
          `[HDR] X-Client: SoftpackLauncher`,
          `[HDR] X-Platform: win32`
        ];
      }
      if (project.id === 'securepass-vault') {
        return [
          `[REQ] ${method} ${endpoint}`,
          `[HDR] Content-Type: application/json`,
          `[HDR] X-Vault: SecurePass`,
          `[HDR] X-Storage: localStorage`
        ];
      }

      return [
        `[REQ] ${method} ${endpoint}`,
        `[HDR] Accept-Language: es-ES`,
        `[HDR] Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
      ];
    });

    const appendLogs = (delayMs: number, lines: string[]) => {
      window.setTimeout(() => {
        if (simulationRunIdRef.current !== runId) return;
        setSimulationOutputLogs(prev => [...prev, ...lines]);
      }, delayMs);
    };

    const appendNow = (lines: string[]) => {
      if (simulationRunIdRef.current !== runId) return;
      setSimulationOutputLogs(prev => [...prev, ...lines]);
    };

    if (project.id === 'softpack-launcher') {
      appendLogs(450, [
        `[OK]  IPC seguro: preload + contextBridge OK`,
        `[OK]  Validación de catálogo: OK`
      ]);
      appendLogs(900, [
        `[CMD] winget install --id ${String((project.apiMockResponse as { packageId?: string } | undefined)?.packageId || 'Google.Chrome')} --silent --accept-source-agreements --accept-package-agreements`,
        `[INFO] Resolviendo manifiesto y dependencias...`
      ]);
      appendLogs(1350, [
        `[OK]  Descarga completada`,
        `[OK]  Instalación en progreso...`
      ]);
      window.setTimeout(() => {
        if (simulationRunIdRef.current !== runId) return;
        setSimulationOutputLogs(prev => [
          ...prev,
          `[OK]  Instalación completada (exit 0)`
        ]);
        setSimulationLoading(false);
        setSimulationResponse(
          project.apiMockResponse || {
            ok: true,
            tool: "winget",
            action: "install",
            installed: true
          }
        );
      }, 1750);
      return;
    }

    if (project.id === 'securepass-vault') {
      appendLogs(450, [
        `[OK]  Validación de entrada: OK`,
        `[CRYPTO] Preparando derivación de clave (PBKDF2)...`
      ]);

      window.setTimeout(() => {
        void (async () => {
          if (simulationRunIdRef.current !== runId) return;

          const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
            const bytes = new Uint8Array(buffer);
            let binary = '';
            for (const b of bytes) binary += String.fromCharCode(b);
            return btoa(binary);
          };

          const bytesToBase64 = (bytes: Uint8Array) => {
            let binary = '';
            for (const b of bytes) binary += String.fromCharCode(b);
            return btoa(binary);
          };

          const storageKey = 'securepass_vault_mock_v1';
          const entryId = `entry_${Date.now()}`;
          const site = 'github.com';
          const username = 'andres.sanchez';
          const passwordPlain = 'S3cureP@ssw0rd!';
          const createdAt = new Date().toISOString();

          try {
            if (!window.crypto?.subtle) {
              appendNow([
                `[WARN] WebCrypto no disponible; usando codificación base64 como fallback`,
                `[STORE] Guardando en localStorage: ${storageKey}`
              ]);

              const fallbackPayload = {
                version: 1,
                entryId,
                createdAt,
                meta: { site, username },
                crypto: { algorithm: 'BASE64_FALLBACK' },
                data: btoa(passwordPlain)
              };

              localStorage.setItem(storageKey, JSON.stringify(fallbackPayload));
              appendNow([`[OK]  Entrada almacenada (mock)`]);
              setSimulationLoading(false);
              setSimulationResponse({
                ok: true,
                stored: true,
                storage: 'localStorage',
                storageKey,
                entryId,
                meta: { site, username },
                crypto: fallbackPayload.crypto
              });
              return;
            }

            const encoder = new TextEncoder();
            const salt = window.crypto.getRandomValues(new Uint8Array(16));
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            const iterations = 100000;

            appendNow([
              `[CRYPTO] Salt generado: ${bytesToBase64(salt).slice(0, 12)}...`,
              `[CRYPTO] IV generado: ${bytesToBase64(iv).slice(0, 12)}...`
            ]);

            const keyMaterial = await window.crypto.subtle.importKey(
              'raw',
              encoder.encode('securepass-demo-master'),
              'PBKDF2',
              false,
              ['deriveKey']
            );

            const aesKey = await window.crypto.subtle.deriveKey(
              { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
              keyMaterial,
              { name: 'AES-GCM', length: 256 },
              false,
              ['encrypt', 'decrypt']
            );

            appendNow([`[OK]  Clave derivada: PBKDF2 (${iterations} iteraciones)`]);

            const cipherBuffer = await window.crypto.subtle.encrypt(
              { name: 'AES-GCM', iv },
              aesKey,
              encoder.encode(passwordPlain)
            );

            const payload = {
              version: 1,
              entryId,
              createdAt,
              meta: { site, username },
              kdf: {
                name: 'PBKDF2',
                hash: 'SHA-256',
                iterations,
                salt: bytesToBase64(salt)
              },
              cipher: {
                name: 'AES-GCM',
                iv: bytesToBase64(iv),
                tagLength: 128
              },
              data: arrayBufferToBase64(cipherBuffer)
            };

            appendNow([
              `[OK]  Contraseña encriptada (AES-256-GCM)`,
              `[STORE] Guardando en localStorage: ${storageKey}`
            ]);

            localStorage.setItem(storageKey, JSON.stringify(payload));

            appendNow([`[OK]  Entrada almacenada (mock)`]);
            setSimulationLoading(false);
            setSimulationResponse({
              ok: true,
              stored: true,
              storage: 'localStorage',
              storageKey,
              entryId,
              meta: { site, username },
              crypto: {
                algorithm: 'AES-256-GCM',
                kdf: 'PBKDF2',
                iterations
              }
            });
          } catch {
            appendNow([`[ERR] No se pudo cifrar/almacenar la entrada`]);
            setSimulationLoading(false);
            setSimulationResponse({ ok: false, error: 'securepass_mock_failed' });
          }
        })();
      }, 1200);

      return;
    }

    if (project.id === 'qr-generator-api') {
      appendLogs(450, [
        `[OK]  Validación de parámetros: OK`,
        `[INFO] Generando PNG (mock) en memoria...`
      ]);

      window.setTimeout(() => {
        if (simulationRunIdRef.current !== runId) return;

        const query = endpoint.split('?')[1] || '';
        const params = new URLSearchParams(query);
        const texto = params.get('texto') ? decodeURIComponent(params.get('texto') as string) : 'hola mundo';
        const widthParam = Number(params.get('width') || '250');
        const width = Number.isFinite(widthParam) && widthParam > 0 ? widthParam : 250;

        const size = 128;
        const cells = 21;
        const cell = Math.floor(size / cells);

        const canvas = document.createElement('canvas');
        canvas.width = cells * cell;
        canvas.height = cells * cell;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          appendNow([`[ERR] No se pudo inicializar Canvas 2D`]);
          setSimulationLoading(false);
          setSimulationResponse({ ok: false, error: 'qr_mock_canvas_failed' });
          return;
        }

        const hash = (() => {
          let h = 5381;
          for (let i = 0; i < texto.length; i++) h = (h * 33) ^ texto.charCodeAt(i);
          return h >>> 0;
        })();

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const drawFinder = (x: number, y: number) => {
          ctx.fillStyle = '#000000';
          ctx.fillRect(x * cell, y * cell, 7 * cell, 7 * cell);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect((x + 1) * cell, (y + 1) * cell, 5 * cell, 5 * cell);
          ctx.fillStyle = '#000000';
          ctx.fillRect((x + 2) * cell, (y + 2) * cell, 3 * cell, 3 * cell);
        };

        drawFinder(0, 0);
        drawFinder(cells - 7, 0);
        drawFinder(0, cells - 7);

        for (let y = 0; y < cells; y++) {
          for (let x = 0; x < cells; x++) {
            const inFinder =
              (x < 7 && y < 7) ||
              (x >= cells - 7 && y < 7) ||
              (x < 7 && y >= cells - 7);
            if (inFinder) continue;

            const v = (hash + x * 131 + y * 313) >>> 0;
            const on = ((v >> ((x + y) % 16)) & 1) === 1;
            if (!on) continue;

            ctx.fillStyle = '#000000';
            ctx.fillRect(x * cell, y * cell, cell, cell);
          }
        }

        const qrCodigoUrl = canvas.toDataURL('image/png');
        const link = `https://qr-generator-api-1z0m.onrender.com/qr?texto=${encodeURIComponent(texto)}&width=${encodeURIComponent(String(width))}`;

        appendNow([
          `[OK]  PNG generado: ${canvas.width}x${canvas.height}`,
          `[OK]  Respuesta preparada con Data URL + link`
        ]);
        setSimulationLoading(false);
        setSimulationResponse({
          ok: true,
          endpoint: "/generar",
          params: { texto, width },
          qrCodigoUrl,
          link
        });
      }, 1350);

      return;
    }

    window.setTimeout(() => {
      if (simulationRunIdRef.current !== runId) return;
      setSimulationOutputLogs(prev => [
        ...prev,
        `[OK]  Middleware de seguridad: OK (200)`,
        `[DB]  Resolviendo consulta en base de datos...`,
        `[OK]  Petición resuelta con éxito en 180ms`
      ]);
      setSimulationLoading(false);
      setSimulationResponse(project.apiMockResponse || { success: true, message: "Petición procesada en local" });
    }, 1500);
  };

  // Contact Guestbook submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim()) {
      setFormError('');
      setFormData({ name: '', company: '', email: '', message: '' });
      setHoneypot('');
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 8000);
      return;
    }
    if (isSubmitting) return;
    const { name, company, email, message } = formData;
    const trimmedName = name.trim();
    const trimmedCompany = company.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedCompany || !trimmedEmail || !trimmedMessage) {
      setFormError('Por favor, rellene todos los campos requeridos.');
      return;
    }

    if (!trimmedEmail.includes('@')) {
      setFormError('Por favor introduce un correo electrónico válido.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          company: trimmedCompany,
          email: trimmedEmail,
          message: trimmedMessage
        })
      });

      const data = (await response.json().catch(() => null)) as null | { error?: string };

      if (!response.ok) {
        setFormError(data?.error || 'No se pudo enviar el mensaje. Inténtalo de nuevo.');
        return;
      }

      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        name: trimmedName,
        company: trimmedCompany,
        email: trimmedEmail,
        text: trimmedMessage,
        date: new Date().toISOString().slice(0, 16).replace('T', ' ')
      };

      const updated = [newMessage, ...messages];
      setMessages(updated);
      localStorage.setItem('recruiters_messages_v1', JSON.stringify(updated));

      setFormData({ name: '', company: '', email: '', message: '' });
      setHoneypot('');
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 8000);
    } catch {
      setFormError('No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteMessage = (id: string) => {
    const filtered = messages.filter(m => m.id !== id);
    setMessages(filtered);
    localStorage.setItem('recruiters_messages_v1', JSON.stringify(filtered));
  };

  return (
    <div className="min-h-screen text-[#f8fafc] font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative z-0 overflow-x-hidden">
      <div ref={particlesLayerRef} className="particles-layer" aria-hidden="true" />
      
      {/* Background Glow Orbs for Sleek Interface Theme */}
      <div className="glow-orb -top-20 -left-20"></div>
      <div className="glow-orb top-1/3 right-10" style={{ background: 'radial-gradient(circle, rgba(129, 140, 248, 0.08) 0%, transparent 70%)' }}></div>
      <div className="glow-orb bottom-10 left-10" style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)' }}></div>

      {/* STICKY HEADER */}
      <header
        data-scrolled={isHeaderTransparent}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          isHeaderTransparent
            ? 'bg-transparent border-transparent backdrop-blur-0'
            : 'bg-[#020617]/70 backdrop-blur-md border-b border-slate-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center font-bold text-slate-950 shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform duration-200">
              FS
            </div>
            <span className="font-semibold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-150">Andrés Sánchez</span>
          </a>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            {[
              { id: 'hero', label: 'Inicio' },
              { id: 'about', label: 'Sobre mí' },
              { id: 'skills', label: 'Stack' },
              { id: 'projects', label: 'Proyectos' },
              { id: 'contact', label: 'Contacto' }
            ].map(tab => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`transition-colors duration-200 hover:text-[#f8fafc] ${
                  activeSection === tab.id ? 'text-cyan-400 font-semibold' : ''
                }`}
              >
                {tab.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href="#contact"
              className="py-1.5 px-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-200"
            >
              Contratame
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl text-slate-400 hover:text-white glass-card hover:border-slate-600 transition-all duration-200"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-6 space-y-28">

        {/* HERO SECTION */}
        <section id="hero" className="pt-6 sm:pt-12 pb-6 min-h-[calc(100vh-12rem)] flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy / Action Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Hiring Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 w-fit rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Disponible para nuevos retos
              </div>
 
              {/* Headings */}
              <div className="space-y-3">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter leading-tight text-white">
                  Full Stack<br/>
                  <span className="accent-gradient">Developer Junior</span>
                </h1>
                <p className="font-mono text-sm uppercase tracking-wider text-slate-400 font-medium">
                  Construyo soluciones web robustas combinando diseño intuitivo y APIs estructuradas
                </p>
              </div>

              {/* Short Bio */}
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                {developerProfile.shortSummary} Especializado en estructurar APIs en Node.js/Python, orquestar interfaces dinámicas con React y optimizar flujos con Docker.
              </p>

              {/* Technologies Highlights tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['TypeScript', 'React.js', 'Node.js', 'PostgreSQL', 'Docker', 'FastAPI'].map((tech) => (
                  <span
                    key={tech}
                    className="skill-badge"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#projects"
                  className="px-8 py-3.5 bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-95 transition-all duration-150 text-sm tracking-wide text-center"
                >
                  Ver Proyectos
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3.5 glass-card text-white font-bold rounded-xl border border-slate-700 active:scale-95 hover:border-slate-500 transition-all duration-150 text-sm tracking-wide text-center"
                >
                  Contacto
                </a>
                <a
                  href="#about"
                  className="py-3 px-4 font-mono text-xs text-slate-400 hover:text-cyan-400 text-center flex items-center justify-center space-x-1.5 group transition-colors"
                >
                  <span>Ver perfil</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

            {/* Interactive Terminal Sandbox Column */}
            <div className="lg:col-span-5 w-full">
              <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
                
                {/* Terminal Header */}
                <div className="bg-slate-950/60 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 flex items-center space-x-1">
                    <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                    <span>interactive_workspace.sh</span>
                  </span>
                </div>

                {/* TAB CONTROLS */}
                <div className="bg-slate-950/30 flex border-b border-slate-800">
                  <button
                    onClick={() => setTerminalTab('profile')}
                    className={`flex-1 py-2 px-3 text-xs font-mono flex items-center justify-center space-x-1.5 border-b-2 transition-all ${
                      terminalTab === 'profile'
                        ? 'text-cyan-400 border-cyan-500 bg-slate-900/40'
                        : 'text-slate-500 border-transparent hover:text-slate-300'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>perfil.json</span>
                  </button>
                  <button
                    onClick={() => {
                      setTerminalTab('tests');
                      if (testOutput.length === 0) startShellTests();
                    }}
                    className={`flex-1 py-2 px-3 text-xs font-mono flex items-center justify-center space-x-1.5 border-b-2 transition-all ${
                      terminalTab === 'tests'
                        ? 'text-indigo-400 border-indigo-500 bg-slate-900/40'
                        : 'text-slate-500 border-transparent hover:text-slate-300'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>test_runner.sh</span>
                  </button>
                  <button
                    onClick={() => setTerminalTab('source')}
                    className={`flex-1 py-2 px-3 text-xs font-mono flex items-center justify-center space-x-1.5 border-b-2 transition-all ${
                      terminalTab === 'source'
                        ? 'text-purple-400 border-purple-500 bg-slate-900/40'
                        : 'text-slate-500 border-transparent hover:text-slate-300'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>express_server.ts</span>
                  </button>
                </div>

                {/* TAB CONTENT SCREEN */}
                <div className="p-5 h-[280px] overflow-y-auto font-mono text-xs leading-relaxed bg-slate-950/40">
                  
                  {terminalTab === 'profile' && (
                    <div className="text-slate-300 space-y-1">
                      <p className="text-slate-500">// Objeto JavaScript compilado en caliente</p>
                      <p><span className="text-cyan-400">const</span> developer = &#123;</p>
                      <p className="pl-4"><span className="text-purple-400">nombre</span>: <span className="text-amber-300">"{developerProfile.name}"</span>,</p>
                      <p className="pl-4"><span className="text-purple-400">rol</span>: <span className="text-amber-300">"{developerProfile.title}"</span>,</p>
                      <p className="pl-4"><span className="text-purple-400">entorno</span>: <span className="text-amber-300">"Full Stack / Cloud-Ready"</span>,</p>
                      <p className="pl-4"><span className="text-purple-400">ubicacion</span>: <span className="text-amber-300">"Medellín, CO"</span>,</p>
                      <p className="pl-4"><span className="text-purple-400">habilidades_clave</span>: [</p>
                      <p className="pl-8"><span className="text-emerald-400">"TypeScript"</span>, <span className="text-emerald-400">"Next.js"</span>, <span className="text-emerald-400">"PostgreSQL"</span>,</p>
                      <p className="pl-8"><span className="text-emerald-400">"FastAPI"</span>, <span className="text-emerald-400">"Docker"</span>, <span className="text-emerald-400">"CI/CD"</span></p>
                      <p className="pl-4">],</p>
                      <p className="pl-4"><span className="text-purple-400">estado_contratacion</span>: <span className="text-emerald-400">"OPEN_TO_WORK"</span>,</p>
                      <p className="pl-4"><span className="text-purple-400">buscando_oportunidades</span>: <span className="text-indigo-400">true</span></p>
                      <p>&#125;;</p>
                    </div>
                  )}

                  {terminalTab === 'tests' && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-[10px] text-slate-500">CI Pipeline Simulado</span>
                        <button
                          onClick={startShellTests}
                          disabled={runningTests}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-[10px] text-cyan-400 flex items-center space-x-1"
                        >
                          <Zap className="w-3 h-3" />
                          <span>{runningTests ? 'Corriendo...' : 'Correr test'}</span>
                        </button>
                      </div>
                      
                      {testOutput.length === 0 ? (
                        <p className="text-slate-500 italic text-center pt-8">Presiona 'Correr test' para simular entorno de integración continua.</p>
                      ) : (
                        testOutput.map((out, i) => (
                          <p
                            key={i}
                            className={`${
                              out.startsWith('[OK]')
                                ? 'text-emerald-400'
                                : out.startsWith('[DONE]')
                                ? 'text-cyan-400 font-bold'
                                : 'text-slate-400'
                            }`}
                          >
                            {out}
                          </p>
                        ))
                      )}
                    </div>
                  )}

                  {terminalTab === 'source' && (
                    <div className="text-slate-300 space-y-1">
                      <p className="text-slate-500">// Middleware de auditoría Express en Node.js</p>
                      <p><span className="text-cyan-400">import</span> &#123; Request, Response, NextFunction &#125; <span className="text-cyan-400">from</span> <span className="text-amber-300">'express'</span>;</p>
                      <p><span className="text-cyan-400">import</span> &#123; getPostgresDatabasePool &#125; <span className="text-cyan-400">from</span> <span className="text-amber-300">'./db'</span>;</p>
                      <p>&nbsp;</p>
                      <p><span className="text-cyan-400">export</span> <span className="text-cyan-400">async</span> <span className="text-cyan-400">function</span> <span className="text-indigo-400">auditRequest</span>(</p>
                      <p className="pl-4">req: Request, res: Response, next: NextFunction</p>
                      <p>) &#125;</p>
                      <p className="pl-4"><span className="text-cyan-400">const</span> db = <span className="text-cyan-400">await</span> <span className="text-indigo-400">getPostgresDatabasePool</span>();</p>
                      <p className="pl-4"><span className="text-cyan-400">const</span> latency = req.headers[<span className="text-amber-300">'x-start-time'</span>] || Date.<span className="text-indigo-400">now</span>();</p>
                      <p className="pl-4"><span className="text-cyan-400">await</span> db.query(</p>
                      <p className="pl-8"><span className="text-amber-300">'INSERT INTO logs(endpoint, latency) VALUES ($1, $2)'</span>,</p>
                      <p className="pl-8">[req.path, Date.<span className="text-indigo-400">now</span>() - latency]</p>
                      <p className="pl-4">);</p>
                      <p className="pl-4"><span className="text-indigo-400">next</span>();</p>
                      <p>&#125;</p>
                    </div>
                  )}

                </div>

                {/* Footer status-bar */}
                <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex space-x-4">
                    <span>UTF-8</span>
                    <span>TypeScript</span>
                  </div>
                  <div>v1.12.0-stable</div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* BENTO STATS & ABOUT ME */}
        <section id="about" className="scroll-mt-20">
          
          <div className="space-y-2 mb-12">
            <h2 className="text-xs uppercase tracking-widest font-mono text-cyan-400">Sobre mí</h2>
            <h3 className="text-3xl font-extrabold text-white">Presentación & Filosofía de Código</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Bio Box */}
            <div className="lg:col-span-8 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-cyan-400 font-mono text-sm uppercase tracking-wider font-semibold">
                  <User className="w-5 h-5 text-cyan-400" />
                  <span>Perfil Técnico Junior</span>
                </div>
                
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {developerProfile.aboutMe}
                </p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Busco integrarme en un equipo senior de desarrollo ágil donde pueda contribuir activamente a los hitos de entrega, mientras absorbo mejores prácticas de desarrollo guiado por pruebas (TDD), despliegues cloud y arquitecturas distribuidas de software.
                </p>
              </div>

              {/* Personal details info dots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/60">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300">{developerProfile.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300">{developerProfile.email}</span>
                </div>
              </div>

            </div>

            {/* Stats Sidebar (Bento Box) */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              
              <div className="glass-card p-6 rounded-2xl border-t-2 border-indigo-500/30 flex flex-col justify-between">
                <div>
                  <Sparkles className="w-5 h-5 text-indigo-400 mb-2" />
                  <span className="text-[11px] font-mono uppercase text-indigo-300 tracking-wider">Compromiso</span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#f8fafc] mt-4 font-mono">1,200+</div>
                  <div className="text-xs text-slate-400 mt-1">Horas estimadas de código en el último año</div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border-t-2 border-cyan-500/30 flex flex-col justify-between">
                <div>
                  <CheckCircle className="w-5 h-5 text-cyan-400 mb-2" />
                  <span className="text-[11px] font-mono uppercase text-cyan-300 tracking-wider">Hito de Código</span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#f8fafc] mt-4 font-mono">100%</div>
                  <div className="text-xs text-slate-400 mt-1">TypeScript nativo para todo backend y frontend</div>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* INTERACTIVE SKILLS SECTION */}
        <section id="skills" className="scroll-mt-20">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">Stack Tecnológico</span>
              <h3 className="text-3xl font-extrabold text-white">Dominio & Competencias</h3>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              Haz clic en cada categoría para filtrar la lista interactiva de habilidades e inspeccionar los detalles de cada módulo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Horizontal Filter Buttons & Skill list (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Category selector row */}
              <div className="flex flex-wrap gap-2.5 p-2 glass-card rounded-2xl">
                {skillCategories.map((category) => {
                  const isActive = selectedSkillCategory === category.title;
                  return (
                    <button
                      key={category.title}
                      onClick={() => {
                        setSelectedSkillCategory(category.title);
                        // Default select first skill of category
                        setSelectedSkillInfo(category.skills[0]);
                      }}
                      className={`flex-1 min-w-[120px] py-3 px-3 rounded-xl text-xs font-mono font-medium tracking-wide border transition-all duration-200 ${
                        isActive
                          ? 'bg-cyan-500/10 text-[#f8fafc] border-cyan-500/40 shadow-md shadow-cyan-500/5'
                          : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/40'
                      }`}
                    >
                      {category.title}
                    </button>
                  );
                })}
              </div>

              {/* Skills Interactive List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillCategories
                  .find((cat) => cat.title === selectedSkillCategory)
                  ?.skills.map((skill) => {
                    const isSelected = selectedSkillInfo?.name === skill.name;
                    const IconComp = getSkillIcon(skill.iconName);
                    
                    return (
                      <div
                        key={skill.name}
                        onClick={() => setSelectedSkillInfo(skill)}
                        className={`p-4 rounded-xl border cursor-pointer select-none transition-all duration-200 ${
                          isSelected
                            ? 'glass-card border-cyan-500/50 shadow-lg shadow-cyan-500/10 translate-x-1 bg-cyan-950/20'
                            : 'glass-card border-slate-800/40 hover:bg-slate-900/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-slate-950/60 border ${
                              isSelected ? 'border-cyan-500/30 text-cyan-400' : 'border-slate-800 text-slate-400'
                            }`}>
                              <IconComp className="w-4 h-4" />
                            </div>
                            <span className={`text-sm font-semibold transition-colors ${
                              isSelected ? 'text-white' : 'text-slate-200 hover:text-white'
                            }`}>
                              {skill.name}
                            </span>
                          </div>
                          
                          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full ${
                            skill.level === 'Avanzado'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : skill.level === 'Intermedio'
                              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {skill.level}
                          </span>
                        </div>
                        
                        <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                          {skill.description}
                        </p>
                      </div>
                    );
                  })}
              </div>

            </div>

            {/* Dynamic Console Inspector Side view (4 cols) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="glass-card rounded-2xl shadow-xl p-5 space-y-4">
                
                <div className="pb-3 border-b border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">Habilidad Inspeccionada</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                {selectedSkillInfo ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-xs text-cyan-400 font-mono font-medium">{selectedSkillCategory}</span>
                      <h4 className="text-lg font-bold text-white">{selectedSkillInfo.name}</h4>
                    </div>

                    <div className="p-3 bg-slate-950/60 border border-slate-850/80 rounded-lg text-xs leading-relaxed text-slate-300 font-mono">
                      <span className="text-indigo-400">descripción</span>: "{selectedSkillInfo.description}"
                    </div>

                    <div className="space-y-2">
                       <span className="text-xs text-slate-400 font-mono font-medium">Asociación en Proyecto</span>
                      <div className="flex items-center space-x-2 p-2 bg-slate-950/30 rounded border border-slate-850/85 text-xs text-slate-300 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>Verificado en aplicaciones reales de abajo</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic text-center py-12 font-mono">Seleccione una habilidad de la izquierda para desplegar la ficha de auditoría.</p>
                )}

              </div>
            </div>

          </div>

        </section>

        {/* PROJECTS & INTERACTIVE API SIMULATOR SECTION */}
        <section id="projects" className="scroll-mt-20">
          
          <div className="space-y-2 mb-12">
            <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">Portafolio</span>
            <h3 className="text-3xl font-extrabold text-white">Casos de Uso & Simulador</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Cada aplicación representa problemas reales resueltos y empaquetados. Interactúa con los simuladores integrados para emular llamadas HTTPS RESTful directamente a los servidores del portfolio.
            </p>
          </div>

          <div className="space-y-12">
            {projects.map((proj) => {
              const isActiveSimulating = activeSimulatingProject === proj.id;
              
              return (
                <div
                  key={proj.id}
                  className="glass-card rounded-2xl overflow-hidden hover:border-slate-700/60 shadow-xl transition-all duration-300"
                >
                  
                  {/* Grid layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* Left details panel (7 cols) */}
                    <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between space-y-6">
                      
                      <div className="space-y-4">
                        
                        {/* Tags & Categories */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono tracking-widest uppercase py-1.5 px-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 font-bold">
                            {proj.category}
                          </span>
                          <div className="flex space-x-2">
                            {proj.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-[10px] font-mono text-slate-400">#{tag}</span>
                            ))}
                          </div>
                        </div>

                        {/* Heading & description */}
                        <div className="space-y-1">
                          <h4 className="text-xl font-bold text-white tracking-tight">{proj.title}</h4>
                          <p className="text-slate-300 text-sm leading-relaxed">{proj.description}</p>
                        </div>

                        {/* Bullet features */}
                        <ul className="space-y-2 pt-2">
                          {proj.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start text-xs text-slate-400">
                              <span className="text-cyan-400 mr-2 font-mono">&gt;</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>

                      </div>

                      {/* Tech stack badges & Github */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/40">
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-0.5 bg-slate-950/60 border border-slate-800 rounded-lg text-[10px] font-mono text-slate-300 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center space-x-1.5 transition-all"
                              title="Repositorio de Código"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span className="font-mono text-[11px]">Repo</span>
                            </a>
                          )}
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-xs flex items-center space-x-1.5 transition-all"
                              title="Demo en vivo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span className="font-mono text-[11px]">Demo</span>
                            </a>
                          )}
                        </div>

                      </div>

                    </div>

                    {/* Right Sandbox call response emulator panel (5 cols) */}
                    <div className="lg:col-span-12 xl:col-span-5 bg-slate-950/40 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-slate-800/40 flex flex-col justify-between space-y-6">
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-slate-400">PROBADOR DE ENDPOINTS</span>
                          <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 text-[9px] font-mono border border-indigo-500/10">REST_CLIENT</span>
                        </div>
                        
                        <div className="p-3 bg-slate-950/85 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center space-x-2 text-slate-300 overflow-hidden">
                            <span className="text-emerald-400 font-bold">{proj.apiMockMethod || 'GET'}</span>
                            <span className="truncate text-slate-400">{proj.apiMockEndpoint || '/api/mock'}</span>
                          </div>
                          
                          <button
                            onClick={() => triggerApiSimulation(proj)}
                            disabled={isActiveSimulating && simulationLoading}
                            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-[10px] font-bold flex items-center space-x-1 font-mono active:scale-95 transition-all outline-none"
                          >
                            <Play className="w-3 h-3 fill-current text-slate-950" />
                            <span>
                              {isActiveSimulating && simulationLoading
                                ? 'Enviando...'
                                : `Enviar ${proj.apiMockMethod || 'GET'}`}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Diagnostic Outputs */}
                      <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-850/80 h-[180px] overflow-y-auto space-y-3 flex flex-col justify-between">
                        
                        {/* Simulated terminal response stream */}
                        <div className="space-y-1 font-mono text-[10px] leading-relaxed">
                          {isActiveSimulating ? (
                            <>
                              {simulationOutputLogs.map((log, lidx) => (
                                <p
                                  key={lidx}
                                  className={`${
                                    log.startsWith('[OK]')
                                      ? 'text-emerald-400 font-bold'
                                      : log.startsWith('[REQ]')
                                      ? 'text-cyan-400'
                                      : 'text-slate-400'
                                  }`}
                                >
                                  {log}
                                </p>
                              ))}
                              {simulationLoading && (
                                <div className="flex items-center space-x-1.5 pt-1 text-slate-500">
                                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                                  <span>Esperando respuesta de Andrés's API...</span>
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-slate-500 italic text-center pt-8">Presiona 'Enviar' para simular e inspeccionar el flujo JSON de respuesta.</p>
                          )}
                        </div>

                        {/* Real returned parameters container */}
                        {isActiveSimulating && simulationResponse && (
                          <div className="pt-3 border-t border-slate-800 text-[10px] text-emerald-400 font-mono">
                            {(() => {
                              const qrCodigoUrl = (simulationResponse as { qrCodigoUrl?: unknown }).qrCodigoUrl;
                              const codigo64 = (simulationResponse as { codigo64?: unknown }).codigo64;
                              const link = (simulationResponse as { link?: unknown }).link;

                              const src =
                                typeof qrCodigoUrl === 'string' && qrCodigoUrl.startsWith('data:image/')
                                  ? qrCodigoUrl
                                  : typeof codigo64 === 'string' && codigo64.length > 0
                                  ? `data:image/png;base64,${codigo64}`
                                  : typeof link === 'string' && /^https?:\/\//.test(link)
                                  ? link
                                  : null;

                              if (!src) return null;

                              return (
                                <div className="pb-3">
                                  <span className="text-slate-500 block pb-1">// PNG Preview:</span>
                                  <div className="inline-flex items-center gap-2 bg-slate-900/60 p-2 rounded border border-slate-850/80">
                                    <img
                                      src={src}
                                      alt="QR generado"
                                      className="w-20 h-20 rounded bg-white"
                                    />
                                  </div>
                                </div>
                              );
                            })()}
                            <span className="text-slate-500 block pb-1">// JSON Response returned:</span>
                            <pre className="bg-slate-900/60 p-2 rounded border border-slate-850/80 overflow-x-auto">
                              {JSON.stringify(simulationResponse, null, 2)}
                            </pre>
                          </div>
                        )}

                      </div>

                      {/* Disclaimer footer inside card */}
                      <span className="text-[10px] font-mono text-slate-500 leading-snug">
                        * Nota: Simula tiempos de ida y vuelta HTTP usando middleware optimizado en caliente.
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* RECRUITER HUB & CONTACT FORM */}
        <section id="contact" className="scroll-mt-20">
          
          <div className="space-y-2 mb-12">
            <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">Reclutación</span>
            <h3 className="text-3xl font-extrabold text-[#f8fafc]">Canal de Contacto Directo</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Form Details (7 cols) */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8">
              
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-bold text-white">Enviar Mensaje Seguro</h4>
                <p className="text-slate-300 text-xs sm:text-sm">
                  ¿Tienes vacantes disponibles o quieres agendar una videollamada para conversar sobre cómo Andrés puede aportar en tu equipo? Rellena el formulario de abajo. Al enviar, tu mensaje se guardará en tu localStorage local y aparecerá en el feed de visitas como un caso de test completo.
                </p>
              </div>

              {formSubmitted && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-mono flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">¡Mensaje guardado correctamente!</p>
                    <p className="text-[10px] text-emerald-500/80 mt-0.5">Se ha renderizado con éxito en tu sandbox del panel adyacente.</p>
                  </div>
                </div>
              )}

              {formError && (
                <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs font-mono">
                  {formError}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                  <label className="sr-only" htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-400">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="p. ej. Sofía Martínez"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-400">Empresa / Proyecto *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="p. ej. StartupTech"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-slate-400">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="p. ej. sofia@startuptech.com"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-slate-400">Mensaje / Vacante Propuesta *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Describe los requisitos esenciales del puesto o tu propuesta de entrevista..."
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs tracking-widest uppercase rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Emitir Mensaje Auditor</span>
                    </>
                  )}
                </button>

              </form>

            </div>

            {/* Recruiter Messages Board (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="glass-card rounded-2xl p-5 space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2 text-indigo-400">
                    <MessageSquare className="w-4.5 h-4.5 text-indigo-400" />
                    <span className="font-mono text-xs font-semibold tracking-wider uppercase">Panel de Mensajes Recibidos</span>
                  </div>
                  
                  <button
                    onClick={initializeDefaultMessages}
                    className="text-[10px] font-mono text-slate-500 hover:text-slate-300 underline cursor-pointer"
                  >
                    Resetear
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Sandbox de mensajería para recruiters. Los mensajes creados aquí se registran de forma asíncrona simulando una cola de mensajería persistente en base de datos.
                </p>

                <div className="space-y-3.5 max-h-[380px] overflow-y-auto pt-2">
                  {messages.length === 0 ? (
                    <p className="text-xs text-slate-500 italic text-center py-12 font-mono">Ningún mensaje en cola de base de datos. ¡Sé el primero!</p>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-3 bg-slate-950/60 border border-slate-850/80 rounded-xl space-y-2 relative group"
                      >
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="absolute top-2.5 right-2.5 p-1 rounded-lg bg-slate-900/60 hover:bg-slate-850 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          title="Eliminar mensaje local"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>

                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-white">{msg.name}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-900 border border-slate-800 rounded-md text-slate-400 font-semibold">{msg.company}</span>
                          </div>
                          <span className="block text-[10px] font-mono text-slate-500">{msg.email} &bull; {msg.date}</span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-sans">{msg.text}</p>
                      </div>
                    ))
                  )}
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/40 bg-[#020617] text-slate-500 py-12 mt-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-medium">
          <div className="flex gap-6 uppercase tracking-widest text-[10px] font-mono">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors duration-150"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors duration-150"
            >
              LinkedIn
            </a>
            <a
              href="mailto:andres.xa@hotmail.com"
              className="hover:text-cyan-400 transition-colors duration-150"
            >
              Email
            </a>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Andrés Sánchez &mdash; Diseñado para el Futuro Digital
          </div>
        </div>
      </footer>

    </div>
  );
}
