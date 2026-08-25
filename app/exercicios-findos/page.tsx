import type { Metadata } from "next";
import Image from "next/image";
import { InvestimentosHeader } from "../_hub/InvestimentosHeader";
import { SmoothAnchor } from "../_hub/SmoothAnchor";
import { StickyCTA } from "../components/StickyCTA";
import { ExFindosForm } from "./ExFindosForm";

/* ================================================================
   /exercicios-findos — LP curta de antecipação de exercícios findos
   (cessão de crédito) para servidor público do DF.

   Criada 2026-08-25 (especialista-lp).

   ⚠️ NÃO é investimento. Sem CVM, sem número de rentabilidade, sem
   promessa de valor ou prazo de pagamento. O valor da antecipação
   depende da análise de cada caso e é formalizado por CONTRATO de
   cessão de crédito. Na dúvida sobre uma frase, cortar.

   Espinha (curta — ~1,5 tela no mobile):
     1. Hero (promessa + FORM à vista)
     2. Como funciona (3 passos)
     3. Casos atendidos pela Midlej (2 casos REAIS do briefing)
     4. CTA final + rodapé (identificação Midlej + disclaimer)

   Conversão: ExFindosForm (lead_form_submit → GTM/Ads).
   ================================================================ */

const EMPRESA = "Midlej Capital";

export const metadata: Metadata = {
  title: { absolute: "Exercícios findos: receba à vista | Midlej Capital" },
  description:
    "Servidor público do DF: seus exercícios findos podem ser antecipados. A Midlej paga à vista agora e assume a espera, com contrato de cessão de crédito. Peça a análise do seu caso.",
  alternates: { canonical: "/exercicios-findos" },
  openGraph: {
    title: "Exercícios findos do servidor do DF, à vista — Midlej Capital",
    description:
      "Você tem exercícios findos a receber do governo? A Midlej antecipa à vista e assume a espera. Peça a análise do seu caso.",
    type: "website",
    locale: "pt_BR",
    url: "https://midlejcapital.com.br/exercicios-findos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exercícios findos do servidor do DF, à vista — Midlej Capital",
    description:
      "A Midlej antecipa seus exercícios findos à vista e assume a espera. Peça a análise do seu caso.",
  },
  robots: { index: true, follow: true },
};

export default function ExFindosPage() {
  return (
    <main
      data-brand
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen bg-white text-[#2E4659] overflow-x-hidden"
    >
      <SmoothAnchor />
      <InvestimentosHeader hideNav ctaLabel="Quero antecipar" logoHref="#top" />

      <Hero />
      <ComoFunciona />
      <Casos />
      <Fechamento />

      <StickyCTA label="Quero antecipar meu crédito" href="#contato" />
    </main>
  );
}

/* ================================================================
   Átomos
   ================================================================ */

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SectionTag({ label }: { label: string }) {
  return (
    <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-3" style={{ color: "#4a6b8c" }}>
      {label}
    </p>
  );
}

/* ================================================================
   SEÇÃO 1 — HERO (promessa + form à vista)
   ================================================================ */

function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #16242F 0%, #223849 45%, #2E4659 100%)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(58% 52% at 78% 38%, rgba(143,179,212,0.20) 0%, rgba(143,179,212,0) 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Esquerda: a promessa */}
          <div className="col-span-full md:col-span-6">
            <span className="inline-block text-[0.7rem] font-semibold tracking-widest uppercase mb-6 text-white/70 max-w-[42ch] leading-[1.5]">
              Servidor público do Distrito Federal
            </span>

            <h1 className="text-[clamp(2.1rem,4.4vw,3.5rem)] font-bold leading-[1.06] tracking-tight mb-5 text-white max-w-[20ch]">
              Seus exercícios findos, à vista — sem esperar anos.
            </h1>
            <p className="text-[1.0625rem] leading-[1.65] max-w-[52ch] text-white/80">
              Aqueles valores atrasados de anos anteriores que o governo ainda não pagou
              podem levar muito tempo na fila administrativa ou judicial. A{" "}
              <strong className="text-white font-semibold">{EMPRESA}</strong> antecipa esse
              crédito: você recebe à vista agora e nós assumimos a espera — tudo formalizado
              por contrato de cessão de crédito.
            </p>
          </div>

          {/* Direita: captura à vista */}
          <div id="contato" className="col-span-full md:col-span-5 md:col-start-8 scroll-mt-24">
            <ExFindosForm instanceId="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SEÇÃO 2 — COMO FUNCIONA (3 passos)
   ================================================================ */

function ComoFunciona() {
  const passos = [
    {
      n: "01",
      title: "Você tem exercícios findos a receber",
      body: "Valores de exercícios anteriores que o governo do DF ainda não pagou.",
    },
    {
      n: "02",
      title: "A Midlej analisa e antecipa",
      body: "Avaliamos o seu caso e apresentamos quanto do crédito pode ser antecipado.",
    },
    {
      n: "03",
      title: "Você recebe à vista, com contrato",
      body: "A operação é formalizada por cessão de crédito e você recebe o valor à vista.",
    },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <SectionTag label="Como funciona" />
        <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-tight max-w-[22ch]" style={{ color: "#2E4659" }}>
          Três passos. Sem sair de casa.
        </h2>

        <ol className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          {passos.map((p) => (
            <li key={p.n} className="col-span-full md:col-span-4 flex flex-col">
              <span className="text-[clamp(2rem,3vw,2.75rem)] font-light leading-none tabular-nums" style={{ color: "#9BB3D4" }}>
                {p.n}
              </span>
              <h3 className="mt-5 text-[1.1875rem] font-bold leading-[1.2] tracking-tight" style={{ color: "#2E4659" }}>
                {p.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.6]" style={{ color: "#6B7B8D" }}>
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================
   SEÇÃO 3 — CASOS ATENDIDOS PELA MIDLEJ
   ⚠️ Apenas os 2 casos REAIS do briefing. Sem nome, sem foto, sem
   valor em R$, sem %. Só o fato: segmento + ano dos exercícios +
   ano da antecipação. NUNCA acrescentar casos fabricados.
   ================================================================ */

const CASOS: { segmento: string; exercicios: string; antecipado: string }[] = [
  {
    segmento: "Médica da Secretaria de Saúde do DF",
    exercicios: "2016",
    antecipado: "2026",
  },
  {
    segmento: "Professora da rede pública do DF (Secretaria de Educação)",
    exercicios: "2012",
    antecipado: "2020",
  },
];

function Casos() {
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <SectionTag label="Casos atendidos pela Midlej" />
        <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-[1.05] tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
          Servidores do DF que já receberam à vista.
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASOS.map((c) => (
            <article key={c.segmento} className="bg-white rounded-2xl border border-[#EDEFF2] p-7 flex flex-col">
              <p className="text-[1.0625rem] font-bold leading-snug" style={{ color: "#2E4659" }}>
                {c.segmento}
              </p>
              <div className="mt-5 flex items-center gap-6">
                <div>
                  <p className="text-[0.66rem] font-semibold tracking-[0.14em] uppercase" style={{ color: "#4a6b8c" }}>
                    Exercícios de
                  </p>
                  <p className="mt-1 text-[1.5rem] font-bold tabular-nums" style={{ color: "#2E4659" }}>
                    {c.exercicios}
                  </p>
                </div>
                <div aria-hidden style={{ color: "#9BB3D4" }}>
                  <Arrow />
                </div>
                <div>
                  <p className="text-[0.66rem] font-semibold tracking-[0.14em] uppercase" style={{ color: "#4a6b8c" }}>
                    Antecipados em
                  </p>
                  <p className="mt-1 text-[1.5rem] font-bold tabular-nums" style={{ color: "#2E4659" }}>
                    {c.antecipado}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SEÇÃO 4 — CTA FINAL + RODAPÉ (identificação + disclaimer)
   ================================================================ */

function Fechamento() {
  const year = new Date().getFullYear();
  return (
    <section id="fechamento" style={{ backgroundColor: "#2E4659" }} className="pt-16 md:pt-24 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-[42ch] pb-16 md:pb-20">
          <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
            O primeiro passo é a análise
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-white mb-6">
            Descubra hoje quanto do seu crédito pode ser antecipado.
          </h2>
          <p className="text-[1.0625rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.80)" }}>
            Você informa o órgão e o ano dos exercícios findos, a {EMPRESA} analisa o seu
            caso e explica como funciona a antecipação. Sem compromisso.
          </p>

          <a
            href="#contato"
            className="mt-9 inline-flex items-center gap-2 px-7 py-4 rounded-lg text-[0.95rem] font-semibold shadow-lg transition-colors duration-200"
            style={{ backgroundColor: "#ffffff", color: "#2E4659" }}
          >
            Quero antecipar meu crédito <Arrow />
          </a>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }} className="mb-12 md:mb-14" />

        {/* Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
          <div className="col-span-full md:col-span-6">
            <Image
              src="/midlej_capital.png"
              alt="Midlej Capital"
              width={320}
              height={130}
              className="h-12 w-auto mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm leading-relaxed max-w-[44ch]" style={{ color: "rgba(255,255,255,0.55)" }}>
              Antecipação de exercícios findos para servidores públicos do Distrito Federal,
              por meio de cessão de crédito.
            </p>
          </div>

          <div className="col-span-full md:col-span-5 md:col-start-8">
            <p className="text-[0.6rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              Contato
            </p>
            <a
              href="mailto:contato@midlejcapital.com.br"
              className="text-sm hover:text-white transition-colors duration-200 block"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              contato@midlejcapital.com.br
            </a>
          </div>
        </div>

        {/* Barra legal — disclaimer sempre presente */}
        <div className="border-t pt-6 flex flex-col gap-3 text-xs" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.38)" }}>
          <p className="max-w-[96ch] leading-[1.6]">
            {EMPRESA}. A antecipação de exercícios findos é uma operação de cessão de crédito.
            O valor antecipado depende da análise de cada caso e é formalizado por contrato.
            Esta página tem caráter informativo e não constitui promessa de valor, de prazo de
            pagamento ou de resultado. Não é oferta de investimento.
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <span>{EMPRESA}</span>
            <span>© {year} {EMPRESA}. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
