import type { Metadata } from "next";
import Image from "next/image";
import { LPHeader } from "@/app/_hub/LPHeader";
import { LPClosing } from "@/app/_hub/LPClosing";
import { SmoothAnchor } from "@/app/_hub/SmoothAnchor";

export const metadata: Metadata = {
  title: "Seguro de Vida Inteligente · Midlej Capital",
  description:
    "Você está pagando por um seguro de vida — ou financiando o lucro de quem te vendeu? Descubra o modelo que protege e ainda constrói patrimônio.",
  openGraph: {
    title: "Seguro de Vida Inteligente · Midlej Capital",
    description: "R$1.000/mês em seguro vitalício ou R$200 + R$800 investidos? A simulação que ninguém te mostrou.",
    type: "website",
    locale: "pt_BR",
  },
};

const DISCLAIMER =
  "Simulações ilustrativas baseadas em dados históricos; rentabilidade passada não representa garantia de rentabilidade futura. Esta página tem caráter educativo e não constitui recomendação individualizada de seguro ou investimento.";

function SectionTag({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-3" style={{ color: dark ? "rgba(255,255,255,0.50)" : "#4a6b8c" }}>
      {label}
    </p>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SeguroPage() {
  return (
    <main
      className="bg-white text-[#2E4659]"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
    >
      <LPHeader ctaLabel="Revisar meu seguro" />
      <SmoothAnchor />

      {/* ── Hero ── */}
      <section id="top" className="relative min-h-screen flex items-center">
        <Image
          src="/fotos_escritorio/6.jpeg"
          alt="Escritório Midlej Capital"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,70,89,0.62)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-40 md:py-56 w-full">
          <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            Seguro de Vida Inteligente
          </p>
          <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.04] tracking-tight text-white mb-8 max-w-[20ch]">
            Você está pagando por um seguro de vida — ou financiando o lucro de quem te vendeu?
          </h1>
          <p className="text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-relaxed mb-14 max-w-[38ch]" style={{ color: "rgba(255,255,255,0.78)" }}>
            Existe um modelo que protege a família agora e ainda constrói patrimônio. Ninguém te ofereceu porque ninguém ganha com isso.
          </p>
          <div className="flex flex-wrap gap-5">
            <a
              href="#simulacao"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200"
            >
              Calcular meu seguro grátis <Arrow />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-200"
            >
              Quero revisar com um consultor
            </a>
          </div>
        </div>
      </section>

      {/* ── Agitação ── */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="col-span-12 md:col-span-5">
              <SectionTag label="O que ninguém te contou" />
              <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[18ch] mb-8 md:mb-0" style={{ color: "#2E4659" }}>
                O seguro vitalício foi projetado para lucrar, não para proteger.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-[1.0625rem] leading-[1.65] mb-10 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
                Três verdades que as seguradoras evitam explicar — e que fazem toda a diferença ao longo de 30 anos de pagamentos.
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { n: "Caro", label: "O nome técnico é VUL ou inteiro", sub: "Mistura proteção e 'investimento' — com a seguradora ganhando nos dois lados" },
                  { n: "Nunca", label: "O que ninguém ofereceu", sub: "Um seguro temporário puro, com o restante sendo investido por você" },
                  { n: "4× mais", label: "O resultado possível", sub: "Proteção igual — e patrimônio líquido até 4 vezes maior ao longo do tempo" },
                ].map((s) => (
                  <div key={s.n} className="rounded-xl border border-[#EDEFF2] p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <dt className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-none tracking-tight mb-2" style={{ color: "#4a6b8c" }}>
                      {s.n}
                    </dt>
                    <dd className="text-sm font-semibold leading-snug mb-1" style={{ color: "#2E4659" }}>{s.label}</dd>
                    <dd className="text-[0.8rem] leading-snug" style={{ color: "#6B7B8D" }}>{s.sub}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Simulação principal ── */}
      <section id="simulacao" style={{ backgroundColor: "#F5F7FA" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <SectionTag label="Simulação · 30 anos · mesma proteção" />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight mb-6 max-w-[24ch]" style={{ color: "#2E4659" }}>
            R$&nbsp;1.000/mês. Dois destinos completamente diferentes.
          </h2>
          <p className="text-[1.0625rem] leading-relaxed mb-16 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
            A proteção é equivalente. O que muda é quem acumula patrimônio ao longo do caminho.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "Modelo atual",
                tag: "Seguro vitalício (VUL / inteiro)",
                value: "~R$ 360 mil pagos",
                sub: "30 anos × R$1.000 — capital retido pela seguradora",
                note: "Preso no produto. Rentabilidade opaca. Sem acumulação líquida.",
                highlight: false,
              },
              {
                label: "Modelo inteligente",
                tag: "Temporário + R$800 investidos/mês",
                value: "~R$ 1,6 milhão",
                sub: "Patrimônio líquido ao fim dos 30 anos",
                note: "Proteção equivalente. Controle total. Rentabilidade do mercado.",
                highlight: true,
              },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-2xl p-8 md:p-10 border"
                style={{
                  backgroundColor: c.highlight ? "#2E4659" : "white",
                  borderColor: c.highlight ? "transparent" : "#EDEFF2",
                }}
              >
                <p className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: c.highlight ? "rgba(255,255,255,0.50)" : "#6B7B8D" }}>
                  {c.label}
                </p>
                <p className="text-sm font-semibold mb-6" style={{ color: c.highlight ? "rgba(255,255,255,0.70)" : "#4a6b8c" }}>
                  {c.tag}
                </p>
                <p className="text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-tight mb-3" style={{ color: c.highlight ? "white" : "#2E4659" }}>
                  {c.value}
                </p>
                <p className="text-[0.875rem] leading-relaxed mb-4" style={{ color: c.highlight ? "rgba(255,255,255,0.55)" : "#6B7B8D" }}>
                  {c.sub}
                </p>
                <p className="text-[0.8rem] leading-relaxed" style={{ color: c.highlight ? "rgba(255,255,255,0.40)" : "#6B7B8D" }}>
                  {c.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solução ── */}
      <section style={{ backgroundColor: "#4a6b8c" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="col-span-12 md:col-span-7">
              <SectionTag label="Nossa abordagem" dark />
              <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight text-white mb-6 max-w-[22ch]">
                Alugar a proteção. Ser dono do patrimônio.
              </h2>
              <p className="text-[1.0625rem] leading-[1.65] mb-6 max-w-[52ch]" style={{ color: "rgba(255,255,255,0.75)" }}>
                Seguro temporário cobre o período em que a família depende de você. O dinheiro que sobra vai para uma carteira de investimentos — que você controla, liquida e herda.
              </p>
              <p className="text-[1.0625rem] leading-[1.65] max-w-[52ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
                Não vendemos seguro. Assessoramos a decisão. Por isso somos pagos por honorários fixos — não por comissão de apólice.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-white hover:bg-[#EDEFF2] transition-colors duration-200"
                style={{ color: "#2E4659" }}
              >
                Quero rever meu seguro <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="col-span-12 md:col-span-4">
              <SectionTag label="Como funciona" />
              <h2 className="text-[clamp(1.625rem,3vw,2.5rem)] font-bold leading-[1.04] tracking-tight max-w-[16ch]" style={{ color: "#2E4659" }}>
                Três etapas. Um plano integrado.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <ol className="flex flex-col divide-y divide-[#EDEFF2]">
                {[
                  {
                    n: "I",
                    title: "Diagnóstico do seguro atual",
                    body: "Analisamos o produto que você tem hoje — custo real, cobertura, cláusulas de carência e o que a seguradora não explicitou no contrato.",
                  },
                  {
                    n: "II",
                    title: "Reestruturação da proteção",
                    body: "Calculamos o capital segurado que sua família realmente precisa, o prazo ideal e o seguro temporário mais eficiente do mercado — sem conflito de interesse.",
                  },
                  {
                    n: "III",
                    title: "Plano de investimento paralelo",
                    body: "O valor liberado pela troca do produto é direcionado a uma carteira de investimentos adequada ao seu perfil. Proteção e patrimônio crescendo juntos.",
                  },
                ].map((s) => (
                  <li key={s.n} className="py-8 md:py-10 flex gap-6 md:gap-10 items-start">
                    <span className="text-[clamp(1.875rem,3vw,2.5rem)] font-light leading-none tabular-nums shrink-0" style={{ color: "#4a6b8c" }}>
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-[1.0625rem] font-bold mb-3" style={{ color: "#2E4659" }}>{s.title}</h3>
                      <p className="text-[0.95rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── Autoridade ── */}
      <section style={{ backgroundColor: "#F5F7FA" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <SectionTag label="Por que a Midlej" />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight mb-16 max-w-[28ch]" style={{ color: "#2E4659" }}>
            Consultoria independente. Sem comissão de seguro.
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Consultoria independente", body: "Não somos corretores de seguro — somos consultores independentes, com obrigação fiduciária ao cliente." },
              { label: "Fee fixo", body: "Nossa remuneração é um honorário fixo. Nenhum centavo vem de comissão de seguradora — o que nos permite recomendar o produto mais eficiente para você." },
              { label: "Abordagem integrada", body: "Tratamos proteção e acumulação patrimonial como uma estratégia única — não como dois produtos vendidos por departamentos diferentes." },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-[#EDEFF2] bg-white p-7 shadow-sm">
                <dt className="text-sm font-bold mb-3" style={{ color: "#2E4659" }}>{c.label}</dt>
                <dd className="text-[0.9375rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Closing ── */}
      <LPClosing
        eyebrow="Revisão gratuita"
        headline="Descubra quanto seu seguro atual está custando a mais."
        body="Na primeira conversa analisamos o produto que você tem hoje e mostramos o que muda com a reestruturação. Gratuita, confidencial e sem compromisso de contratação."
        ctaLabel="Quero revisar meu seguro"
        origin="LP1 · Seguro de Vida"
        disclaimer={DISCLAIMER}
      />
    </main>
  );
}
