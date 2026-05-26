import * as React from "react";
import {
  Globe,
  Zap,
  Bot,
  ArrowRight,
  ArrowUpRight,
  Instagram,
  MessageCircle,
  ClipboardList,
  Palette,
  Code2,
  Workflow,
  PackageCheck,
} from "lucide-react";

/* ---------- helpers ---------- */

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2, ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function CountUp({ end, duration = 1800, prefix = "+", suffix = "" }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(end * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- atoms ---------- */

function SquareButton({
  children,
  variant = "primary",
  href,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  href?: string;
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 px-6 h-12 text-sm font-medium tracking-wide rounded-sm transition-all duration-300 cursor-pointer";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-accent hover:translate-y-[-1px]"
      : variant === "outline"
        ? "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground hover:text-background"
        : "text-foreground hover:text-accent";
  const Comp: any = href ? "a" : "button";
  return (
    <Comp href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Comp>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
      <span className="h-px w-8 bg-foreground/30" />
      {children}
    </div>
  );
}

/* ---------- sections ---------- */

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-foreground/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center group">
          <span className="font-black text-xl tracking-tighter">&lt;S/&gt;</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
          <a href="#servicos" className="hover:text-foreground transition-colors">Serviços</a>
          <a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a>
          <a href="#portfolio" className="hover:text-foreground transition-colors">Portfólio</a>
          <a href="#processo" className="hover:text-foreground transition-colors">Processo</a>
          <a href="#contato" className="hover:text-foreground transition-colors">Contato</a>
        </nav>
        <SquareButton href="#contato" className="hidden md:inline-flex h-10 px-4 text-xs">
          Fale Conosco <ArrowRight className="w-3.5 h-3.5" />
        </SquareButton>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-28 lg:pt-32 lg:pb-40 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel>Estúdio digital — Est. 2024</SectionLabel>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]">
              Transformamos ideias em{" "}
              <span className="italic font-light text-accent">experiências digitais.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Criamos sites modernos, automações inteligentes e soluções tecnológicas para acelerar empresas.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-3">
              <SquareButton href="#portfolio">
                Ver Projetos <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </SquareButton>
              <SquareButton href="#contato" variant="outline">
                Falar Conosco
              </SquareButton>
            </div>
          </Reveal>
        </div>

        {/* Geometric detail */}
        <div className="lg:col-span-5 relative">
          <Reveal delay={300}>
            <div className="relative aspect-square max-w-md mx-auto">
              {/* grid */}
              <svg className="absolute inset-0 w-full h-full text-foreground/10" aria-hidden>
                <defs>
                  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              {/* squares */}
              <div className="absolute top-0 left-0 w-24 h-24 border border-foreground/20" />
              <div className="absolute top-12 left-12 w-24 h-24 border border-accent/40" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-foreground" />
              <div className="absolute bottom-8 right-8 w-40 h-40 border border-accent translate-x-2 translate-y-2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-accent" />
              {/* lines */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-foreground/20" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-foreground/20" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const services = [
  { icon: Globe, title: "Criação de Sites", desc: "Sites rápidos, modernos e focados em conversão." },
  { icon: Zap, title: "Automações", desc: "Automatize tarefas, vendas e processos." },
  { icon: Bot, title: "Soluções Inteligentes", desc: "Integrações, sistemas e tecnologia personalizada." },
];

function Services() {
  return (
    <section id="servicos" className="border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <SectionLabel>O que fazemos</SectionLabel>
            <h2 className="mt-6 text-4xl lg:text-5xl font-semibold tracking-tight max-w-xl">
              Serviços pensados para escalar o seu negócio.
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 120} className="bg-background">
              <div className="group relative p-10 h-full min-h-[320px] flex flex-col justify-between transition-colors duration-500 hover:bg-foreground hover:text-background cursor-pointer">
                <div>
                  <div className="w-12 h-12 grid place-items-center border border-foreground/20 group-hover:border-background/30 group-hover:bg-accent group-hover:text-background transition-all">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground group-hover:text-background/70 leading-relaxed max-w-xs">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-10 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest opacity-50">0{i + 1}</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <SectionLabel>Sobre</SectionLabel>
          <h2 className="mt-6 text-4xl lg:text-5xl font-semibold tracking-tight">
            Sobre a SoftVances
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Nascemos com o objetivo de simplificar processos e transformar negócios através
            da tecnologia. Desenvolvemos experiências digitais que unem design, performance
            e automação.
          </p>
        </div>
        <div className="lg:col-span-5 grid grid-cols-1 gap-px bg-foreground/10 self-center">
          {[
            { n: 50, suffix: "", label: "Projetos entregues" },
            { n: 1000, suffix: "", label: "Horas desenvolvidas" },
            { n: 95, suffix: "%", label: "Satisfação dos clientes" },
          ].map((s) => (
            <div key={s.label} className="bg-background px-8 py-8 flex items-baseline justify-between">
              <div className="text-5xl lg:text-6xl font-semibold tracking-tight tabular-nums">
                <CountUp end={s.n} suffix={s.suffix} />
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground text-right max-w-[140px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const timeline = [
  { year: "2024", text: "Fundação da SoftVances" },
  { year: "2025", text: "Primeiros projetos e automações" },
  { year: "Hoje", text: "Soluções digitais completas" },
];

function Timeline() {
  return (
    <section className="border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <SectionLabel>Nossa história</SectionLabel>
        <h2 className="mt-6 text-4xl lg:text-5xl font-semibold tracking-tight max-w-2xl">
          Uma trajetória focada em construir o futuro digital.
        </h2>
        <div className="mt-20 relative">
          <div className="absolute left-0 right-0 top-3 h-px bg-foreground/15" />
          <div className="grid grid-cols-3 gap-6">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 150}>
                <div className="relative">
                  <div className="w-3 h-3 bg-accent rounded-full ring-4 ring-background relative z-10" />
                  <div className="mt-8">
                    <div className="text-2xl font-semibold tracking-tight">{t.year}</div>
                    <div className="mt-2 text-sm text-muted-foreground max-w-[220px]">{t.text}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const projects = [
  { title: "Arte em Cuidar", cat: "Site Institucional", href: "https://artemcuidar.com.br/" },
  { title: "Ro Molina Imóveis", cat: "Imóveis de Alto Padrão", href: "https://www.romolinaimoveis.com.br/" },
  { title: "Fatima Felippe", cat: "Portal Jurídico", href: "https://fatimafelippe.com.br/" },
];

function Portfolio() {
  return (
    <section id="portfolio" className="border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <SectionLabel>Portfólio</SectionLabel>
            <h2 className="mt-6 text-4xl lg:text-5xl font-semibold tracking-tight max-w-xl">
              Projetos selecionados.
            </h2>
          </div>
          <span className="text-sm text-muted-foreground">{projects.length} projetos</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 100} className="bg-background">
              <a
                href={p.href}
                target={p.href ? "_blank" : undefined}
                rel={p.href ? "noopener noreferrer" : undefined}
                className={`group relative block aspect-[4/3] overflow-hidden ${p.href ? "cursor-pointer" : "cursor-default"}`}
              >
                {/* placeholder visual */}
                <div className="absolute inset-0 bg-secondary transition-transform duration-700 group-hover:scale-105">
                  <svg className="absolute inset-0 w-full h-full text-foreground/10" aria-hidden>
                    <defs>
                      <pattern id={`g-${i}`} width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#g-${i})`} />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div
                      className={`w-24 h-24 ${i % 2 === 0 ? "bg-foreground" : "border border-foreground"} ${i % 3 === 0 ? "" : "rotate-12"}`}
                    />
                  </div>
                </div>
                {/* overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/95 transition-all duration-500 flex flex-col justify-between p-6 text-background opacity-0 group-hover:opacity-100">
                  <div className="text-xs uppercase tracking-widest text-accent">{p.cat}</div>
                  <div className="flex items-end justify-between">
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest">
                      Ver projeto <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
                {/* default label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between group-hover:opacity-0 transition-opacity">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.cat}</div>
                    <div className="mt-1 font-medium">{p.title}</div>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">0{i + 1}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { icon: ClipboardList, label: "Planejamento" },
  { icon: Palette, label: "Design" },
  { icon: Code2, label: "Desenvolvimento" },
  { icon: Workflow, label: "Automação" },
  { icon: PackageCheck, label: "Entrega" },
];

function Process() {
  return (
    <section id="processo" className="border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <SectionLabel>Como trabalhamos</SectionLabel>
        <h2 className="mt-6 text-4xl lg:text-5xl font-semibold tracking-tight max-w-2xl">
          Um processo claro do briefing à entrega.
        </h2>
        <div className="mt-20 relative">
          <div className="hidden md:block absolute left-[10%] right-[10%] top-8 h-px bg-foreground/15" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 bg-background border border-foreground/20 grid place-items-center group hover:border-accent hover:bg-accent transition-colors">
                    <s.icon className="w-5 h-5 group-hover:text-background" />
                  </div>
                  <div className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
                    0{i + 1}
                  </div>
                  <div className="mt-2 font-medium">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="border-t border-foreground/10 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-40">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-background/60">
              <span className="h-px w-8 bg-background/30" />
              Contato
            </div>
            <h2 className="mt-8 text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.02]">
              Vamos criar algo{" "}
              <span className="italic font-light text-accent">incrível?</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <a
              href="https://wa.me/554896156188"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-6 h-14 bg-background text-foreground hover:bg-accent hover:text-background transition-colors rounded-sm"
            >
              <span className="inline-flex items-center gap-3 text-sm font-medium">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://www.instagram.com/softvances/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-6 h-14 border border-background/20 hover:bg-background hover:text-foreground transition-colors rounded-sm"
            >
              <span className="inline-flex items-center gap-3 text-sm font-medium">
                <Instagram className="w-4 h-4" /> Instagram
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background/70 border-t border-background/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center">
            <img src="/logo.svg" alt="SoftVances" className="h-8 w-auto invert" />
          </div>
          <p className="mt-4 text-sm max-w-xs">
            Estúdio digital criando sites, automações e soluções tecnológicas sob medida.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-background/50">Navegação</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#servicos" className="hover:text-background transition-colors">Serviços</a></li>
            <li><a href="#sobre" className="hover:text-background transition-colors">Sobre</a></li>
            <li><a href="#portfolio" className="hover:text-background transition-colors">Portfólio</a></li>
            <li><a href="#contato" className="hover:text-background transition-colors">Contato</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-background/50">Redes</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="https://www.instagram.com/softvances/" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">Instagram</a></li>
            <li><a href="https://wa.me/554896156188" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">WhatsApp</a></li>
            <li><a href="mailto:softvances@gmail.com" className="hover:text-background transition-colors">Email</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between text-xs text-background/50">
          <span>© {new Date().getFullYear()} SoftVances. Todos os direitos reservados.</span>
          <span>Feito com precisão.</span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/554896156188"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white grid place-items-center rounded-sm shadow-lg hover:bg-[#1ebe5d] hover:scale-105 transition-all duration-200"
    >
      <MessageCircle className="w-6 h-6 fill-white stroke-none" />
    </a>
  );
}

export function SoftVancesLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-background">
      <Nav />
      <Hero />
      <Services />
      <About />
      <Timeline />
      <Portfolio />
      <Process />
      <Contact />
      <WhatsAppFloat />
      <Footer />
    </main>
  );
}

export default SoftVancesLanding;