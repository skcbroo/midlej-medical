import type { Metadata } from "next";
import Image from "next/image";
import { LPHeader } from "@/app/_hub/LPHeader";
import { LPClosing } from "@/app/_hub/LPClosing";
import { SmoothAnchor } from "@/app/_hub/SmoothAnchor";

export const metadata: Metadata = {
  title: "Sucessão e Holding Familiar · Midlej Capital",
  description:
    "Quanto sua família vai perder no inventário? Planejamento sucessório com holding familiar reduz ITCMD, protege patrimônio e evita disputas. Consultoria integrada.",
  openGraph: {
    title: "Sucessão e Holding Familiar · Midlej Capital",
    description: "O inventário pode consumir até 20% do patrimônio. Planejamento sucessório muda esse cenário antes que seja tarde.",
    type: "website",
    locale: "pt_BR",
  },
};

const DISCLAIMER =
  "Simulações ilustrativas. Percentuais de ITCMD e custos variam por estado. Esta página tem caráter educativo e não constitui recomendação individualizada de planejamento jurídico ou tributário.";

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

export default function SucessaoPage() {
  return (
    <main
      className="bg-white text-[#2E4659]"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
    >
      <LPHeader ctaLabel="Proteger meu patrimônio" />
      <SmoothAnchor />

      {/* ── Hero ── */}
      <section id="top" className="relative min-h-screen flex items-center">
        <Image
          src="/fotos_escritorio/4.jpeg"
          alt="Escritório Midlej Capital"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,70,89,0.65)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-48 w-full">
          <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            Sucessão e Holding Familiar
          </p>
          <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.04] tracking-tight text-white mb-6 max-w-[18ch]">
            Quanto sua família vai perder no inventário?
          </h1>
          <p className="text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-relaxed mb-10 max-w-[44ch]" style={{ color: "rgba(255,255,255,0.78)" }}>
            O processo pode durar anos e consumir até 20% do que você levou décadas para construir. Existe uma forma de evitar isso — mas precisa ser feita em vida.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#simulacao"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200"
            >
              Ver o custo do inventário <Arrow />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-200"
            >
              Quero estruturar minha sucessão
            </a>
          </div>
        </div>
      </section>

      {/* ── Agitação ── */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="col-span-12 md:col-span-5">
              <SectionTag label="O custo de não planejar" />
              <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[18ch]" style={{ color: "#2E4659" }}>
                O inventário é o imposto que sua família paga pelo que você não fez.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-[1.0625rem] leading-[1.65] mb-10 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
                Três números que a maioria das famílias só descobre quando o processo já começou — e não há mais como voltar atrás.
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { n: "Até 8%", label: "ITCMD sobre herança", sub: "Imposto estadual sobre transmissão de bens — e aumentos estão em discussão no Congresso" },
                  { n: "3–7 anos", label: "Duração do inventário", sub: "Imóveis bloqueados. Contas suspensas. Decisões travadas por anos" },
                  { n: "Até 20%", label: "Custo total do processo", sub: "ITCMD + honorários advocatícios + custas judiciais — sobre tudo que foi construído" },
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
          <SectionTag label="Simulação · patrimônio de R$2 milhões" />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight mb-4 max-w-[24ch]" style={{ color: "#2E4659" }}>
            O mesmo patrimônio. Dois destinos para a família.
          </h2>
          <p className="text-[1.0625rem] leading-relaxed mb-16 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
            A diferença entre inventário e planejamento sucessório não é técnica. É de R$&nbsp;600 mil.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "Sem planejamento",
                tag: "Inventário judicial",
                value: "−R$ 320 mil perdidos",
                sub: "ITCMD 8% + honorários 10% + custas 2% sobre R$2M",
                note: "Família recebe R$1,68M. Processo: 3 a 7 anos. Imóveis bloqueados durante o trâmite.",
                highlight: false,
              },
              {
                label: "Com planejamento",
                tag: "Holding familiar + doação em vida",
                value: "~R$ 290 mil preservados",
                sub: "Redução de ITCMD + eficiência tributária + sem custas judiciais",
                note: "Família recebe próximo de R$1,97M. Transição organizada, sem bloqueio de bens.",
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
                <p className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-none tracking-tight mb-3" style={{ color: c.highlight ? "white" : "#2E4659" }}>
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
                Constituir em vida o que o inventário dissolve depois da morte.
              </h2>
              <p className="text-[1.0625rem] leading-[1.65] mb-6 max-w-[52ch]" style={{ color: "rgba(255,255,255,0.75)" }}>
                A holding familiar não é um produto exótico. É uma estrutura jurídica que organiza a transmissão de bens enquanto você está presente para decidir quem recebe o quê, quando e como.
              </p>
              <p className="text-[1.0625rem] leading-[1.65] max-w-[52ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
                A MIDLEJ reúne consultoria financeira e jurídica para entregar o planejamento integrado — finanças e estrutura patrimonial sob o mesmo teto.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-white hover:bg-[#EDEFF2] transition-colors duration-200"
                style={{ color: "#2E4659" }}
              >
                Quero estruturar minha holding <Arrow />
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
                Três etapas. Uma transição organizada.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <ol className="flex flex-col divide-y divide-[#EDEFF2]">
                {[
                  {
                    n: "I",
                    title: "Mapeamento patrimonial e familiar",
                    body: "Levantamos todos os bens — imóveis, investimentos, participações societárias — e entendemos a estrutura familiar: herdeiros, relacionamento entre eles, intenções do patriarca.",
                  },
                  {
                    n: "II",
                    title: "Estruturação da holding e do plano sucessório",
                    body: "Nosso parceiro jurídico constitui a holding familiar e define o modelo de doação em vida com reserva de usufruto — preservando o controle do patrimônio enquanto você viver.",
                  },
                  {
                    n: "III",
                    title: "Integração com o planejamento financeiro",
                    body: "O patrimônio dentro da holding recebe gestão financeira integrada. Dividendos, reinvestimentos e carteira de investimentos são coordenados com a estrutura jurídica.",
                  },
                ].map((s) => (
                  <li key={s.n} className="py-8 md:py-10 flex gap-6 md:gap-10 items-start">
                    <span className="text-[clamp(1.875rem,3vw,2.5rem)] font-light leading-none tabular-nums shrink-0" style={{ color: "#4a6b8c" }}>
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-[1.0625rem] font-bold mb-2" style={{ color: "#2E4659" }}>{s.title}</h3>
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
            Finanças e direito. Sob o mesmo plano.
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Consultoria independente", body: "Atuamos com obrigação fiduciária — ao cliente, não ao produto ou ao processo." },
              { label: "Parceiro jurídico", body: "Equipe jurídica especializada em planejamento sucessório e holding familiar. Mesmo time, mesma estratégia." },
              { label: "Um plano integrado", body: "Planejamento financeiro e estrutura jurídica são desenhados juntos — não como dois serviços vendidos separadamente." },
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
        headline="Planejamento sucessório começa com uma conversa."
        body="Mapeamos seu patrimônio, explicamos as opções e mostramos o que a holding familiar pode preservar para sua família. Gratuita, confidencial e sem compromisso."
        ctaLabel="Quero estruturar minha sucessão"
        origin="LP4 · Sucessão e Holding"
        disclaimer={DISCLAIMER}
      />
    </main>
  );
}
