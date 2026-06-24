import type { Metadata } from "next";
import Image from "next/image";
import { LPHeader } from "@/app/_hub/LPHeader";
import { LPClosing } from "@/app/_hub/LPClosing";
import { SmoothAnchor } from "@/app/_hub/SmoothAnchor";

export const metadata: Metadata = {
  title: "Investimento Internacional · Midlej Capital",
  description:
    "R$ 3.000 em 2011 — dois caminhos, seis vezes mais em dólar. Descubra como diversificar patrimônio internacionalmente sem sair do Brasil, sem conflito de interesse.",
  openGraph: {
    title: "Investimento Internacional · Midlej Capital",
    description: "Dois caminhos, doze anos. A diferença entre ficar preso ao real e diversificar em dólar.",
    type: "website",
    locale: "pt_BR",
  },
};

const DISCLAIMER =
  "Simulações ilustrativas baseadas em dados históricos; rentabilidade passada não representa garantia de rentabilidade futura. Esta página tem caráter educativo e não constitui recomendação individualizada de investimento.";

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

export default function DolarPage() {
  return (
    <main
      className="bg-white text-[#2E4659]"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
    >
      <LPHeader ctaLabel="Quero internacionalizar" />
      <SmoothAnchor />

      {/* ── Hero ── */}
      <section id="top" className="relative min-h-screen flex items-center">
        <Image
          src="/fotos_escritorio/5.jpeg"
          alt="Escritório Midlej Capital"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,70,89,0.62)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-40 md:py-56 w-full">
          <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            Investimento Internacional
          </p>
          <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.04] tracking-tight text-white mb-8 max-w-[18ch]">
            R$&nbsp;3.000 em 2011.<br />Dois caminhos.
          </h1>
          <p className="text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-relaxed mb-14 max-w-[38ch]" style={{ color: "rgba(255,255,255,0.78)" }}>
            O mesmo valor, no mesmo ano — a diferença entre ficar preso ao real e proteger patrimônio em dólar.
          </p>
          <div className="flex flex-wrap gap-5">
            <a
              href="#simulacao"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200"
            >
              Ver a simulação completa <Arrow />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-200"
            >
              Quero um plano de internacionalização
            </a>
          </div>
        </div>
      </section>

      {/* ── Dois caminhos — stats ── */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="col-span-12 md:col-span-5">
              <SectionTag label="O que os dados mostram" />
              <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[18ch] mb-8 md:mb-0" style={{ color: "#2E4659" }}>
                Doze anos de diferença visível.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-[1.0625rem] leading-[1.65] mb-10 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
                Não é instinto. São três movimentos que quem ficou só no Tesouro não capturou — e que mudaram patrimônios de ordem de grandeza.
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { n: "+3,9×", label: "Selic acumulada em 14 anos", sub: "Caminho A — 100% real" },
                  { n: "+7,0×", label: "S&P 500 em USD no período", sub: "Caminho B — diversificado" },
                  { n: "3,0×", label: "Câmbio: R$1,70 → R$5,14", sub: "Amplificador do retorno em USD" },
                ].map((s) => (
                  <div key={s.n} className="rounded-xl border border-[#EDEFF2] p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <dt className="text-[clamp(1.875rem,3vw,2.5rem)] font-bold leading-none tracking-tight mb-2" style={{ color: "#4a6b8c" }}>
                      {s.n}
                    </dt>
                    <dd className="text-sm font-semibold leading-snug mb-1" style={{ color: "#2E4659" }}>{s.label}</dd>
                    <dd className="text-[0.8rem]" style={{ color: "#6B7B8D" }}>{s.sub}</dd>
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
          <SectionTag label="Simulação · dados históricos" />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight mb-6 max-w-[24ch]" style={{ color: "#2E4659" }}>
            R$&nbsp;3.000 investidos em 2011.
          </h2>
          <p className="text-[1.0625rem] leading-relaxed mb-16 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
            O mesmo ponto de partida. A diferença está no destino — e em quem estava no lugar certo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "Caminho A",
                tag: "Apenas Tesouro Selic",
                value: "~R$ 11.700",
                sub: "Selic acumulada 14 anos · ~3,9×",
                note: "Proteção do poder de compra. Sem exposição cambial.",
                highlight: false,
              },
              {
                label: "Caminho B",
                tag: "S&P 500 em dólar",
                value: "~R$ 63.000",
                sub: "S&P 500 USD + câmbio · ~21×",
                note: "Retorno composto de mercado + depreciação do real ao longo do tempo.",
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
                <p className="text-[0.875rem] leading-relaxed mb-3" style={{ color: c.highlight ? "rgba(255,255,255,0.55)" : "#6B7B8D" }}>
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
                Não é tirar tudo do Brasil. É proteger o que você já construiu.
              </h2>
              <p className="text-[1.0625rem] leading-[1.65] mb-6 max-w-[52ch]" style={{ color: "rgba(255,255,255,0.75)" }}>
                Diversificação internacional não é um movimento especulativo. É a mesma lógica de não deixar todos os ovos numa cesta — e numa moeda só.
              </p>
              <p className="text-[1.0625rem] leading-[1.65] max-w-[52ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
                Montamos carteiras com ativos em dólar acessíveis desde o Brasil, dentro do seu perfil e dentro da lei. Sem produto de prateleira. Sem rebate.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-white hover:bg-[#EDEFF2] transition-colors duration-200"
                style={{ color: "#2E4659" }}
              >
                Quero montar minha carteira <Arrow />
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
                Três etapas. Uma estratégia.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <ol className="flex flex-col divide-y divide-[#EDEFF2]">
                {[
                  {
                    n: "I",
                    title: "Diagnóstico do patrimônio atual",
                    body: "Mapeamos a sua carteira hoje — concentração em real, exposição ao risco local, e o que faz sentido diversificar sem prejudicar liquidez.",
                  },
                  {
                    n: "II",
                    title: "Estratégia de internacionalização",
                    body: "Definimos o percentual ideal, os ativos (BDRs, fundos internacionais, ETFs) e o ritmo de entrada — sem movimentos bruscos.",
                  },
                  {
                    n: "III",
                    title: "Acompanhamento e rebalanceamento",
                    body: "Revisamos a carteira a cada trimestre. Quando câmbio ou mercado se move, ajustamos com critério — não com emoção.",
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
            Consultoria registrada. Remuneração transparente.
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Consultoria independente", body: "Atuamos com obrigação fiduciária ao cliente — não ao produto, não ao banco, não à corretora." },
              { label: "Fee fixo", body: "Nossa remuneração é um fee fixo ou por projeto. Não recebemos rebate, comissão ou spread cambial." },
              { label: "Zero conflito", body: "Não temos mesa própria, não vendemos fundo e não temos acesso à sua conta. Somente recomendação e acompanhamento." },
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
        eyebrow="Primeira conversa"
        headline="Seu patrimônio fora do Brasil começa aqui."
        body="Mostramos como montar uma carteira internacional dentro do seu perfil, sem abrir conta no exterior, sem especulação. A primeira conversa é gratuita e sem compromisso."
        ctaLabel="Quero meu diagnóstico patrimonial"
        origin="LP3 · Investimento Internacional"
        disclaimer={DISCLAIMER}
      />
    </main>
  );
}
