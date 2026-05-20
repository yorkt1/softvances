import { motion } from "framer-motion";
import type { ReactNode } from "react";

function Shell({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-xs tracking-[0.4em] uppercase text-primary mb-4">// {eyebrow}</div>
        <h2 className="text-4xl md:text-6xl font-bold text-gradient-neon mb-10 max-w-3xl">{title}</h2>
        {children}
      </motion.div>
    </section>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-2xl p-8 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
}

const SERVICES = [
  { t: "Criação de Sites", d: "Sites institucionais e landing pages com design moderno, performance otimizada e foco em conversão orgânica via SEO." },
  { t: "Lojas Virtuais & E-commerce", d: "Plataformas de venda com checkout fluido, gestão de estoque, integrações de pagamento e recuperação de carrinho via WhatsApp." },
  { t: "Catálogos Digitais", d: "Catálogos de produtos integrados ao WhatsApp. O cliente navega, escolhe e compra sem sair da conversa." },
  { t: "CRM Integrado", d: "Centralização do histórico de clientes, etapa do funil e métricas de atendimento em um único painel." },
  { t: "Sistemas sob Medida", d: "Desenvolvimento de plataformas e sistemas personalizados com arquitetura moderna para operações complexas." },
  { t: "Agendamento Automático", d: "Marcação, confirmação e lembretes de compromissos gerenciados diretamente pelo WhatsApp." },
];

const AUTOMACOES = [
  { t: "Chatbot com IA", d: "Atendimento automatizado treinado com as informações do seu negócio. Qualifica leads, responde dúvidas e conduz conversas com naturalidade, 24 horas por dia." },
  { t: "Disparo em Massa", d: "Envio de campanhas segmentadas para listas de contatos com alto índice de entrega e personalização por variáveis." },
  { t: "Funil de Vendas no WhatsApp", d: "Fluxos automatizados que acompanham o lead desde o primeiro contato até o fechamento, sem intervenção manual." },
  { t: "Integrações", d: "Conectamos seu WhatsApp a ERPs, CRMs, plataformas de e-commerce, Google Sheets, sistemas de pagamento e qualquer sistema com API." },
];

const CASES = [
  {
    business: "Arte em Cuidar",
    category: "Saúde & Home Care",
    desc: "Plataforma web para clínica de home care com design humanizado, alta performance e foco em conversão orgânica via SEO.",
    url: "https://artemcuidar.com.br/",
    tags: ["Web Design", "SEO", "Performance"],
  },
  {
    business: "Romolina Imóveis",
    category: "Imobiliária",
    desc: "Site institucional para imobiliária de alto padrão com navegação refinada e integração com WhatsApp para captação de leads.",
    url: "https://romolinaimoveis.com.br/",
    tags: ["Web Design", "Lead Gen", "UX"],
  },
  {
    business: "Fátima Felippe",
    category: "Portfólio Profissional",
    desc: "Site institucional com apresentação de serviços, navegação intuitiva e identidade visual consistente com a marca pessoal.",
    url: "https://fatimafelippe.com.br/",
    tags: ["Institucional", "Branding", "UI/UX"],
  },
];

const FAQS = [
  {
    q: "Em quanto tempo o sistema entra em funcionamento?",
    a: "O primeiro resultado funcional é entregue em até 72 horas. Para projetos maiores, trabalhamos com entregas incrementais para que você tenha retorno desde o início do desenvolvimento.",
  },
  {
    q: "Vocês desenvolvem sistemas além de automação de WhatsApp?",
    a: "Sim. Desenvolvemos sites, e-commerces, catálogos digitais, sistemas sob medida e integrações entre plataformas. Automação de WhatsApp é uma das nossas especialidades, mas não é o único serviço.",
  },
  {
    q: "Como funciona o suporte após a entrega?",
    a: "Oferecemos suporte técnico incluído nos primeiros 30 dias. Após esse período, disponibilizamos planos de manutenção mensal para ajustes, melhorias e monitoramento contínuo.",
  },
  {
    q: "Os bots de WhatsApp podem ser integrados com outros sistemas?",
    a: "Sim. Integramos com ERPs, plataformas de e-commerce, CRMs, Google Sheets, sistemas de pagamento e qualquer sistema que disponha de API.",
  },
  {
    q: "Qual o risco de banimento do número de WhatsApp?",
    a: "Seguimos as diretrizes oficiais do WhatsApp Business API. Para novos números, fazemos um processo de aquecimento gradual. Números com histórico agressivo de spam têm risco maior, o que avaliamos antes de iniciar.",
  },
  {
    q: "Como começo um projeto com a Softvances?",
    a: "Entre em contato pelo WhatsApp. Fazemos uma conversa inicial para entender o que você precisa, e apresentamos uma proposta com escopo, prazo e investimento. Sem compromisso na primeira conversa.",
  },
];

export function Sections() {
  return (
    <div className="relative z-10">

      <Shell id="quem-somos" eyebrow="Quem Somos" title="Tecnologia aplicada a resultados reais.">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <p className="text-muted-foreground leading-relaxed">
              A Softvances é uma empresa de tecnologia especializada em automação inteligente e desenvolvimento digital. Trabalhamos com empresas que precisam de soluções personalizadas — desde chatbots integrados ao WhatsApp até plataformas de e-commerce e sistemas sob medida.
            </p>
          </Card>
          <Card>
            <p className="text-muted-foreground leading-relaxed">
              Nossa abordagem combina desenvolvimento técnico de alto nível com entendimento profundo do negócio do cliente. Não entregamos ferramentas genéricas — construímos sistemas que resolvem o problema específico de cada empresa.
            </p>
          </Card>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[
            { stat: "72h", label: "Prazo médio de entrega" },
            { stat: "500+", label: "Empresas atendidas" },
            { stat: "98%", label: "Satisfação dos clientes" },
          ].map((item) => (
            <Card key={item.label} className="text-center">
              <div className="text-3xl font-bold text-gradient-neon mb-2">{item.stat}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </Card>
          ))}
        </div>
      </Shell>

      <Shell id="servicos" eyebrow="Serviços" title="Construímos sistemas que pensam.">
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <Card key={s.t}>
              <div className="w-10 h-10 rounded-lg mb-5 glass flex items-center justify-center glow-purple">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
      </Shell>

      <Shell id="automacoes" eyebrow="Automações & IA" title="Inteligência que executa por você.">
        <div className="grid md:grid-cols-2 gap-6">
          {AUTOMACOES.map((s) => (
            <Card key={s.t}>
              <h3 className="text-lg font-semibold mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
      </Shell>

      <Shell id="portfolio" eyebrow="Portfólio" title="Cases que falam por nós.">
        <div className="grid md:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <a key={c.business} href={c.url} target="_blank" rel="noreferrer" className="group">
              <Card className="h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs text-muted-foreground tracking-widest mb-1">{c.category}</div>
                  <div className="text-2xl font-bold mb-3">{c.business}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {c.tags.map((tag) => (
                    <span key={tag} className="text-[11px] border border-primary/30 text-primary/70 rounded-full px-2.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </a>
          ))}
        </div>
      </Shell>

      <Shell id="orcamento" eyebrow="Faça Orçamento" title="Inicie um projeto agora.">
        <Card className="md:p-12">
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Conte o que você precisa — automação de WhatsApp, um novo site, uma loja virtual ou um sistema complexo. Nossa equipe analisa e retorna com uma proposta clara.
          </p>
          <form className="grid md:grid-cols-2 gap-5" onSubmit={(e) => e.preventDefault()}>
            {[
              { l: "Nome", t: "text" },
              { l: "E-mail", t: "email" },
              { l: "Empresa", t: "text" },
              { l: "Orçamento estimado", t: "text" },
            ].map((f) => (
              <label key={f.l} className="block">
                <span className="text-xs tracking-widest uppercase text-muted-foreground">{f.l}</span>
                <input
                  type={f.t}
                  className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground transition-colors"
                />
              </label>
            ))}
            <label className="block md:col-span-2">
              <span className="text-xs tracking-widest uppercase text-muted-foreground">Sobre o projeto</span>
              <textarea
                rows={4}
                className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground transition-colors resize-none"
              />
            </label>
            <div className="md:col-span-2 mt-4">
              <a
                href="https://wa.me/554896156188?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noreferrer"
                className="inline-block px-8 py-4 rounded-full glass glow-purple text-sm tracking-[0.3em] uppercase font-semibold hover:scale-[1.02] transition-transform text-center"
                style={{ background: "linear-gradient(135deg, oklch(0.4 0.2 295 / 0.6), oklch(0.3 0.18 250 / 0.6))" }}
              >
                Falar pelo WhatsApp →
              </a>
            </div>
          </form>
        </Card>
      </Shell>

      <Shell id="duvidas" eyebrow="Dúvidas" title="Perguntas frequentes.">
        <div className="space-y-4">
          {FAQS.map((f) => (
            <Card key={f.q}>
              <h3 className="font-semibold mb-1">{f.q}</h3>
              <p className="text-sm text-muted-foreground">{f.a}</p>
            </Card>
          ))}
        </div>
      </Shell>

      <Shell id="contato" eyebrow="Contato" title="Vamos conversar.">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { l: "WhatsApp", v: "+55 48 9615-6188", href: "https://wa.me/554896156188" },
            { l: "E-mail", v: "contato@softvances.com.br", href: "mailto:contato@softvances.com.br" },
            { l: "Instagram", v: "@softvances", href: "https://instagram.com/softvances" },
          ].map((c) => (
            <a key={c.l} href={c.href} target="_blank" rel="noreferrer" className="group">
              <Card>
                <div className="text-xs tracking-widest uppercase text-muted-foreground">{c.l}</div>
                <div className="mt-2 text-lg font-semibold text-gradient-neon group-hover:opacity-80 transition-opacity">{c.v}</div>
              </Card>
            </a>
          ))}
        </div>
        <footer className="mt-24 pt-8 border-t border-border flex items-center justify-between text-xs text-muted-foreground tracking-widest uppercase">
          <span>© {new Date().getFullYear()} SoftVances</span>
          <span>Avançando o futuro do software.</span>
        </footer>
      </Shell>

    </div>
  );
}
