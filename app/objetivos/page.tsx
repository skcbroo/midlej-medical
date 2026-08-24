import type { Metadata } from "next";
import { ObjetivosForm } from "./ObjetivosForm";

/* ================================================================
   /objetivos — LP de captura direta · ângulo "objetivos de vida"
   Script "Riscos Ocultos" (docs/lp-objetivos-script.md, 24/08/2026).

   One-scroll, sem menu, mobile-first. Objetivo único: capturar lead
   (nome + WhatsApp + patrimônio + experiência) → e-mail via Resend +
   evento lead_form_submit (conversão GTM → Google Ads).

   Espinha:
     1. Hero (headline objetivos + sub) + FORMULÁRIO à vista
     2. 3 bullets (o método, em linguagem direta)
     3. Rodapé (identificação + disclaimer CVM)

   Copy aplicada EXATAMENTE como no script (headline, bullets, form,
   confirmação, rodapé). Sistema de marca DESIGN.md: ink navy, paper,
   botões quadrados, sem cara de fintech.
   ================================================================ */

const CVM_REGISTRO = "CVM nº 004770-8";
const RAZAO_SOCIAL = "Midlej Consultoria de Valores Mobiliários LTDA";
const CNPJ = "67.608.789/0001-39";

export const metadata: Metadata = {
  title: { absolute: "Seus objetivos têm prazo | Midlej Capital" },
  description:
    "Seus objetivos têm prazo. Seu dinheiro está no caminho certo? Descubra se a sua estratégia atual te leva onde você quer chegar — ou se está te travando. Planejamento estratégico orientado a objetivos, com consultor registrado na CVM.",
  alternates: { canonical: "/objetivos" },
  openGraph: {
    title: "Seus objetivos têm prazo. Seu dinheiro está no caminho certo?",
    description:
      "Descubra se a sua estratégia atual te leva onde você quer chegar — ou se está te travando. Planejamento orientado a objetivos.",
    type: "website",
    locale: "pt_BR",
    url: "https://midlejcapital.com.br/objetivos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seus objetivos têm prazo. Seu dinheiro está no caminho certo?",
    description:
      "Descubra se a sua estratégia atual te leva onde você quer chegar — ou se está te travando.",
  },
  robots: { index: true, follow: true },
};

export default function ObjetivosPage() {
  return (
    <main
      data-brand
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen bg-white text-[#2E4659] overflow-x-hidden"
    >
      {/* Barra topo minimal: só o wordmark, sem menu (zero rota de fuga). */}
      <header
        className="relative z-20"
        style={{ backgroundColor: "#16242F" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-5 flex items-center">
          <span className="text-[1.05rem] font-bold tracking-[0.16em] uppercase text-white">
            MIDLEJ
          </span>
          <span className="ml-4 pl-4 text-[0.62rem] font-semibold tracking-widest uppercase text-white/45 border-l border-white/15 leading-[1.4] hidden sm:block">
            Consultoria de Valores Mobiliários · {CVM_REGISTRO}
          </span>
        </div>
      </header>

      <Hero />
      <Metodo />
      <Rodape />
    </main>
  );
}

/* ================================================================
   SEÇÃO 1 — HERO (headline + sub + formulário à vista)
   ================================================================ */

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #16242F 0%, #223849 48%, #2E4659 100%)",
      }}
    >
      {/* Halo atrás do formulário — puxa o olho para a captura */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(58% 52% at 80% 34%, rgba(143,179,212,0.20) 0%, rgba(143,179,212,0) 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Esquerda: a promessa */}
          <div className="col-span-full md:col-span-6">
            <h1 className="text-[clamp(2.25rem,4.8vw,3.75rem)] font-bold leading-[1.06] tracking-tight mb-6 text-white max-w-[16ch]">
              Seus objetivos têm prazo.
              <br />
              Seu dinheiro está no caminho certo?
            </h1>
            <p className="text-[1.125rem] leading-[1.6] max-w-[46ch] text-white/80">
              Descubra se a sua estratégia atual te leva onde você quer chegar — ou se
              está te travando.
            </p>
          </div>

          {/* Direita: captura à vista */}
          <div className="col-span-full md:col-span-5 md:col-start-8">
            <ObjetivosForm instanceId="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SEÇÃO 2 — O MÉTODO (3 bullets — copy exata do script)
   ================================================================ */

function Metodo() {
  const bullets = [
    {
      titulo: "Não somos alocadores de caixinhas.",
      corpo:
        "Montamos um plano estratégico orientado aos seus objetivos de vida — com prazo, meta e acompanhamento.",
    },
    {
      titulo: "Seus números, sua realidade.",
      corpo:
        "Rodamos uma simulação personalizada para mostrar onde você está e o que precisa mudar para chegar lá.",
    },
    {
      titulo: "Sem compromisso. Sem enrolação.",
      corpo:
        "Preenche o formulário, a gente entra em contato e mostra seus números. Simples assim.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#E2E6EA" }}>
          {bullets.map((b) => (
            <article
              key={b.titulo}
              className="bg-white flex flex-col pt-8 md:pt-0 md:px-8 first:md:pl-0 last:md:pr-0"
            >
              <div
                aria-hidden
                className="mb-6 h-[2px] w-10"
                style={{ backgroundColor: "#4a6b8c" }}
              />
              <h2
                className="text-[1.25rem] font-bold leading-[1.25] tracking-tight mb-3"
                style={{ color: "#2E4659" }}
              >
                {b.titulo}
              </h2>
              <p className="text-[1rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
                {b.corpo}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SEÇÃO 3 — RODAPÉ (identificação + disclaimer CVM)
   ================================================================ */

function Rodape() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: "#16242F" }} className="pt-14 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-2 mb-10">
          <p className="text-[0.95rem] font-semibold" style={{ color: "rgba(255,255,255,0.82)" }}>
            <span className="tracking-[0.16em] uppercase">MIDLEJ</span>
            <span style={{ color: "rgba(255,255,255,0.45)" }}> • </span>
            <span style={{ color: "rgba(255,255,255,0.62)" }}>
              Planejamento estratégico orientado a objetivos
            </span>
          </p>
          <p className="text-[0.9rem]" style={{ color: "rgba(255,255,255,0.55)" }}>
            Este site não constitui oferta de valores mobiliários.
          </p>
        </div>

        {/* Barra legal — identificação + disclaimer sempre presentes */}
        <div
          className="border-t pt-6 flex flex-col gap-3 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.38)" }}
        >
          <p className="max-w-[96ch] leading-[1.6]">
            {RAZAO_SOCIAL} — {CVM_REGISTRO} · CNPJ {CNPJ}. Consultoria de valores
            mobiliários independente, sem vínculo com corretoras, distribuidoras ou
            instituições financeiras. Este conteúdo tem caráter informativo e não constitui
            recomendação de investimento, oferta ou promessa de rentabilidade. A Midlej não
            realiza gestão de recursos de terceiros.
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <a
              href="mailto:contato@midlejcapital.com.br"
              className="hover:text-white transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              contato@midlejcapital.com.br
            </a>
            <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
