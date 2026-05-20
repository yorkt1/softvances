import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Section = {
  id: string;
  label: string;
  description: string;
  angle: number; // radians
  radius: number; // px from center
};

const SECTIONS: Section[] = [
  { id: "portfolio", label: "Portfólio", description: "Cases reais de clientes", angle: -Math.PI / 2, radius: 280 },
  { id: "quem-somos", label: "Quem Somos", description: "Tecnologia e resultados reais", angle: -Math.PI / 2 + (2 * Math.PI) / 7, radius: 300 },
  { id: "servicos", label: "Serviços", description: "Sites, e-commerce e sistemas", angle: -Math.PI / 2 + (4 * Math.PI) / 7, radius: 290 },
  { id: "automacoes", label: "Automações", description: "WhatsApp, IA e fluxos", angle: -Math.PI / 2 + (6 * Math.PI) / 7, radius: 310 },
  { id: "orcamento", label: "Faça Orçamento", description: "Comece um projeto agora", angle: -Math.PI / 2 + (8 * Math.PI) / 7, radius: 285 },
  { id: "duvidas", label: "Dúvidas", description: "Perguntas frequentes", angle: -Math.PI / 2 + (10 * Math.PI) / 7, radius: 295 },
  { id: "contato", label: "Contato", description: "+55 48 9615-6188", angle: -Math.PI / 2 + (12 * Math.PI) / 7, radius: 305 },
];

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
};

export function NeuralHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const [hovered, setHovered] = useState<string | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [intro, setIntro] = useState(0); // 0 black, 1 particles, 2 name, 3 tagline, 4 core

  // Intro timeline
  useEffect(() => {
    const t1 = setTimeout(() => setIntro(1), 400);
    const t2 = setTimeout(() => setIntro(2), 1400);
    const t3 = setTimeout(() => setIntro(3), 2400);
    const t4 = setTimeout(() => setIntro(4), 3400);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  // Resize
  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Init particles
  useEffect(() => {
    if (!size.w || !size.h) return;
    const count = Math.min(110, Math.floor((size.w * size.h) / 14000));
    const cx = size.w / 2;
    const cy = size.h / 2;
    const parts: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 120 + Math.random() * Math.min(size.w, size.h) * 0.45;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      parts.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        size: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }
    particlesRef.current = parts;
  }, [size]);

  // Mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.w) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const cx = size.w / 2;
    const cy = size.h / 2;

    const nodes = SECTIONS.map((s) => ({
      ...s,
      x: cx + Math.cos(s.angle) * Math.min(s.radius, size.w * 0.35),
      y: cy + Math.sin(s.angle) * Math.min(s.radius, size.h * 0.4),
    }));

    let t = 0;
    const tick = () => {
      t += 0.01;
      ctx.clearRect(0, 0, size.w, size.h);

      const m = mouseRef.current;
      const introFactor = Math.min(1, intro / 4 + 0.3);

      // particles update
      const parts = particlesRef.current;
      for (const p of parts) {
        // drift back to base + slow noise
        const dxBase = p.baseX - p.x;
        const dyBase = p.baseY - p.y;
        p.vx += dxBase * 0.002;
        p.vy += dyBase * 0.002;

        if (m.active) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22000) {
            const f = (22000 - d2) / 22000;
            p.vx += (dx / Math.sqrt(d2 + 1)) * f * 0.4;
            p.vy += (dy / Math.sqrt(d2 + 1)) * f * 0.4;
          }
        }
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx + Math.sin(t + p.baseX * 0.01) * 0.15;
        p.y += p.vy + Math.cos(t + p.baseY * 0.01) * 0.15;

        ctx.beginPath();
        ctx.fillStyle = `rgba(190, 160, 255, ${p.alpha * introFactor})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // connections between nearby particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000) {
            const o = (1 - d2 / 9000) * 0.25 * introFactor;
            ctx.strokeStyle = `rgba(140, 110, 255, ${o})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // connections from core to nodes
      for (const n of nodes) {
        const isHover = hovered === n.id;
        const mouseDist = m.active ? Math.hypot(n.x - m.x, n.y - m.y) : 9999;
        const proximity = Math.max(0, 1 - mouseDist / 250);
        const intensity = (isHover ? 1 : 0.35) + proximity * 0.5;

        const grad = ctx.createLinearGradient(cx, cy, n.x, n.y);
        grad.addColorStop(0, `rgba(168, 85, 247, ${0.6 * intensity * introFactor})`);
        grad.addColorStop(1, `rgba(59, 130, 246, ${0.35 * intensity * introFactor})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isHover ? 1.6 : 0.9;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        // slight curve
        const mx = (cx + n.x) / 2 + Math.sin(t + n.angle) * 12;
        const my = (cy + n.y) / 2 + Math.cos(t + n.angle) * 12;
        ctx.quadraticCurveTo(mx, my, n.x, n.y);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, hovered, intro]);

  const cx = size.w / 2;
  const cy = size.h / 2;

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] min-h-[700px] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-40 blur-3xl"
             style={{ background: "radial-gradient(circle, oklch(0.45 0.25 295 / 0.7), transparent 70%)" }} />
      </div>

      {/* Intro: brand name + tagline (fade out after intro) */}
      <AnimatePresence>
        {intro < 4 && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-[0.15em] text-gradient-neon"
              initial={{ opacity: 0, letterSpacing: "0.4em" }}
              animate={{ opacity: intro >= 2 ? 1 : 0, letterSpacing: "0.15em" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              SOFTVANCES
            </motion.h1>
            <motion.p
              className="mt-4 text-sm md:text-base text-muted-foreground tracking-widest uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: intro >= 3 ? 1 : 0, y: intro >= 3 ? 0 : 12 }}
              transition={{ duration: 0.6 }}
            >
              Tecnologia que pensa por você
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orbiting menu bubbles */}
      {size.w > 0 && SECTIONS.map((s) => {
        const r = Math.min(s.radius, Math.min(size.w, size.h) * 0.4);
        const x = cx + Math.cos(s.angle) * r;
        const y = cy + Math.sin(s.angle) * r;
        const isHover = hovered === s.id;
        return (
          <motion.button
            key={s.id}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleNavigate(s.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: intro >= 4 ? 1 : 0, scale: intro >= 4 ? 1 : 0 }}
            transition={{ delay: 0.05 * SECTIONS.indexOf(s), duration: 0.6, ease: "backOut" }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
          >
            <div
              className="relative w-14 h-14 md:w-16 md:h-16 rounded-full glass flex items-center justify-center transition-all duration-300"
              style={{
                boxShadow: isHover
                  ? "0 0 30px oklch(0.65 0.28 295 / 0.8), inset 0 0 20px oklch(0.65 0.28 295 / 0.3)"
                  : "0 0 15px oklch(0.65 0.28 295 / 0.3)",
                borderColor: isHover ? "oklch(0.7 0.25 295)" : undefined,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: "0 0 10px oklch(0.65 0.28 295)" }} />
              {/* pulse ring */}
              <span className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-0 group-hover:opacity-100" />
            </div>
            {/* Label tooltip */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap text-center transition-all duration-300 ${
                isHover ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"
              }`}
            >
              <div className="text-xs md:text-sm font-medium tracking-wide text-foreground">{s.label}</div>
              {isHover && (
                <div className="text-[10px] text-muted-foreground mt-0.5">{s.description}</div>
              )}
            </div>
          </motion.button>
        );
      })}

      {/* CORE button */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: intro >= 4 ? 1 : 0, scale: intro >= 4 ? 1 : 0.4 }}
        transition={{ duration: 0.8, ease: "backOut" }}
      >
        <button
          onClick={() => handleNavigate("orcamento")}
          className="relative group"
          aria-label="Começar agora"
        >
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full" style={{ animation: "orbit-slow 18s linear infinite" }}>
            <svg viewBox="0 0 200 200" className="w-[220px] h-[220px] md:w-[260px] md:h-[260px]">
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.25 295)" />
                  <stop offset="100%" stopColor="oklch(0.7 0.25 250)" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="96" fill="none" stroke="url(#ringGrad)" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.6" />
              <circle cx="100" cy="100" r="88" fill="none" stroke="url(#ringGrad)" strokeWidth="0.4" strokeDasharray="1 10" opacity="0.4" />
            </svg>
          </div>
          {/* Counter ring */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center" style={{ animation: "orbit-slow 28s linear infinite reverse" }}>
            <svg viewBox="0 0 200 200" className="w-[200px] h-[200px] md:w-[230px] md:h-[230px]">
              <circle cx="100" cy="100" r="80" fill="none" stroke="oklch(0.7 0.25 250 / 0.5)" strokeWidth="0.5" strokeDasharray="4 12" />
            </svg>
          </div>

          {/* Main button */}
          <div className="relative w-[160px] h-[160px] md:w-[190px] md:h-[190px] rounded-full flex items-center justify-center glass transition-all duration-500 group-hover:scale-105"
            style={{
              background: "radial-gradient(circle at 30% 30%, oklch(0.3 0.15 295 / 0.6), oklch(0.1 0.05 280 / 0.8))",
              boxShadow: "0 0 60px oklch(0.65 0.28 295 / 0.6), inset 0 0 40px oklch(0.65 0.28 295 / 0.25)",
              borderColor: "oklch(0.7 0.25 295 / 0.4)",
            }}
          >
            <div className="text-center">
              <div className="text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground mb-2">// CORE</div>
              <div className="text-base md:text-lg font-bold tracking-[0.2em] text-gradient-neon">
                COMECE
              </div>
              <div className="text-base md:text-lg font-bold tracking-[0.2em] text-gradient-neon">
                AGORA
              </div>
              <div className="mt-2 mx-auto w-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
            {/* pulse */}
            <span className="absolute inset-0 rounded-full" style={{ animation: "pulse-glow 3s ease-in-out infinite", background: "radial-gradient(circle, oklch(0.65 0.28 295 / 0.15), transparent 70%)" }} />
          </div>
        </button>
      </motion.div>

      {/* Top HUD */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 text-xs tracking-widest uppercase text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ boxShadow: "0 0 8px oklch(0.65 0.28 295)" }} />
          <span>SoftVances · Automação & Tecnologia</span>
        </div>
        <div className="hidden md:block">Sistema Online · {new Date().getFullYear()}</div>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: intro >= 4 ? 1 : 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-[10px] tracking-[0.4em] text-muted-foreground uppercase"
      >
        Mova o cursor · explore a rede
      </motion.div>
    </section>
  );
}
