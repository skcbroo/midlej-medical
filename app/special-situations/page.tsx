import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LPHeader } from "../_hub/LPHeader";
import { SmoothAnchor } from "../_hub/SmoothAnchor";
import { StickyCTA } from "../components/StickyCTA";
import { SpecialForm } from "./SpecialForm";

/* ================================================================
   /special-situations — Investimento em ATIVOS JUDICIAIS (special
   situations). Viragem 2026: a Midlej opera SÓ special situations.

   REDESENHO 07/09/2026 (pedido do Lucas): a versão anterior era um
   paredão de texto, sem imagem, sem desejo. Esta versão é CURTA,
   VISUAL e de CURIOSIDADE — hero cinematográfico com foto, gráfico
   de descorrelação, uma prova grande (R$50M) e o form. Quebra
   deliberada da regra "sem imagem" do DESIGN.md por decisão do Lucas.

   ⚠️ COMPLIANCE DA VERDADE (inviolável): nenhuma rentabilidade, % de
   retorno ou promessa. NÃO caracterizar oferta pública. O volume de
   R$50M é aquisição (real, confirmado), não rendimento.
   ================================================================ */

const P = {
  entidadeLegal: "Midlej Capital S/A",
  cnpj: "35.340.252/0001-44",
} as const;

const VOLUME_COMPRADO = "+R$ 50 milhões";
const OG_IMAGE = "/LINK.png";

const INK = "#16242F";
const GOLD = "#B89840";

export const metadata: Metadata = {
  title: { absolute: "Ativos judiciais: o ativo real que o mercado não move | Midlej" },
  description:
    "Ativos judiciais: um ativo real, descorrelacionado da bolsa, dos juros e do câmbio. Mais de R$ 50 milhões já comprados, sob diligência e auditoria. Um convite para conhecer.",
  alternates: { canonical: "/special-situations" },
  openGraph: {
    title: "Um ativo real que o mercado não move",
    description:
      "Ativos judiciais: retorno que nasce de uma decisão da Justiça, não do humor da bolsa. Um convite para conhecer.",
    type: "website",
    locale: "pt_BR",
    url: "https://midlejcapital.com.br/special-situations",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Midlej Special Situations" }],
  },
  robots: { index: true, follow: true },
};

export default function SpecialSituationsPage() {
  return (
    <main
      data-brand
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen bg-white text-[#233853] overflow-x-hidden"
    >
      <SmoothAnchor />
      <LPHeader ctaLabel="Quero conhecer" ctaHref="#contato" />

      <Hero />
      <Pilares />
      <Descorrelacao />
      <Prova />
      <Fechamento />

      <StickyCTA label="Quero conhecer" href="#contato" />
    </main>
  );
}

function Arrow() {
  return (
    <svg width="15" height="11" viewBox="0 0 14 10" fill="none" aria-hidden className="shrink-0">
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ================================================================
   HERO — foto full-bleed + overlay ink + gancho de curiosidade
   ================================================================ */
function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] flex items-end overflow-hidden">
      <Image
        src="/fotos_escritorio/3.jpeg"
        alt="Escritório da Midlej Capital"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Overlay: escurece pro texto respirar, mais denso embaixo/esquerda */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,18,24,0.55) 0%, rgba(11,18,24,0.25) 38%, rgba(11,18,24,0.82) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(11,18,24,0.72) 0%, rgba(11,18,24,0) 62%)" }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24 pt-32">
        <div className="max-w-[62rem]">
          <span
            className="inline-block text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: GOLD }}
          >
            Midlej · Special Situations
          </span>

          <h1 className="text-[clamp(2.5rem,6.4vw,5rem)] font-bold leading-[0.98] tracking-tight text-white max-w-[16ch]">
            Um ativo real que o mercado não move.
          </h1>

          <p className="mt-7 text-[clamp(1.05rem,1.7vw,1.35rem)] leading-[1.55] text-white/85 max-w-[54ch]">
            Ativos judiciais: o retorno nasce de uma decisão da Justiça, não do humor da
            bolsa, dos juros ou do câmbio. <span className="text-white font-semibold">Mais de R$ 50 milhões já comprados.</span>{" "}
            Um convite para conhecer por dentro.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="#contato"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[1rem] font-semibold shadow-xl transition-transform duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: "#ffffff", color: INK }}
            >
              Quero conhecer <Arrow />
            </Link>
            <span className="text-[0.9rem] text-white/60">
              Conversa reservada, sem compromisso.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PILARES — 3 marcas visuais, uma linha cada. Nada de texto longo.
   ================================================================ */
function Pilares() {
  const itens = [
    {
      icon: <IconPulse />,
      titulo: "Descorrelacionado",
      linha: "Não segue a bolsa, os juros nem o câmbio.",
    },
    {
      icon: <IconAnchor />,
      titulo: "Ativo real",
      linha: "Lastro em uma decisão judicial concreta.",
    },
    {
      icon: <IconShield />,
      titulo: "Carteira auditada",
      linha: "Diligência jurídica e auditoria da carteira.",
    },
  ];
  return (
    <section style={{ backgroundColor: INK }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {itens.map((it) => (
            <div key={it.titulo} className="flex flex-col">
              <div style={{ color: GOLD }} className="mb-5">{it.icon}</div>
              <h3 className="text-[1.375rem] font-bold text-white tracking-tight">{it.titulo}</h3>
              <p className="mt-2 text-[1rem] leading-[1.5] text-white/65 max-w-[34ch]">{it.linha}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   DESCORRELAÇÃO — a peça visual central. Gráfico: mercado x ativo.
   ================================================================ */
function Descorrelacao() {
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          <div className="col-span-full md:col-span-5">
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "#4a6b8c" }}>
              Por que investidores olham para isso
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.03] tracking-tight" style={{ color: "#233853" }}>
              Quando a bolsa balança, ele nem percebe.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
              O resultado de um ativo judicial depende do processo, não da economia. É o
              comportamento que investidores usam para tirar a carteira do sobe-e-desce do
              mercado, e trazer algo que os ativos tradicionais não oferecem.
            </p>
          </div>

          <div className="col-span-full md:col-span-7">
            <DescorrelacaoChart />
          </div>
        </div>
      </div>
    </section>
  );
}

function DescorrelacaoChart() {
  return (
    <figure className="w-full">
      <svg viewBox="0 0 640 300" className="w-full h-auto" role="img" aria-label="Comparação: o mercado oscila, o ativo judicial segue estável.">
        {/* baseline */}
        <line x1="24" y1="270" x2="616" y2="270" stroke="#EDEFF2" strokeWidth="1" />
        {/* Mercado — volátil */}
        <polyline
          points="24,150 100,110 176,190 252,90 328,210 404,120 480,225 556,150 616,205"
          fill="none"
          stroke="#B9C4CF"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Ativo judicial — estável, leve subida */}
        <polyline
          points="24,205 176,198 328,185 480,172 616,158"
          fill="none"
          stroke={GOLD}
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* labels */}
        <g fontFamily="var(--font-brand), sans-serif">
          <circle cx="616" cy="205" r="4" fill="#B9C4CF" />
          <text x="600" y="192" textAnchor="end" fontSize="15" fontWeight="600" fill="#9BA8B5">Mercado</text>
          <circle cx="616" cy="158" r="5" fill={GOLD} />
          <text x="600" y="145" textAnchor="end" fontSize="15" fontWeight="700" fill={GOLD}>Ativo judicial</text>
        </g>
      </svg>
      <figcaption className="mt-4 text-[0.85rem] leading-[1.5]" style={{ color: "#9BA8B5" }}>
        Ilustração do conceito de descorrelação. Não representa retorno, rentabilidade ou
        resultado de qualquer operação.
      </figcaption>
    </figure>
  );
}

/* ================================================================
   PROVA — número grande (R$50M) + foto do escritório.
   ================================================================ */
function Prova() {
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-14 items-center">
          <div className="col-span-full md:col-span-6">
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: "#4a6b8c" }}>
              Não é uma tese no papel
            </p>
            <p className="text-[clamp(3.5rem,9vw,6.5rem)] font-light leading-[0.9] tracking-tight tabular-nums" style={{ color: "#233853" }}>
              {VOLUME_COMPRADO}
            </p>
            <p className="mt-5 text-[1.125rem] leading-[1.6] max-w-[40ch]" style={{ color: "#6B7B8D" }}>
              em ativos judiciais <strong style={{ color: "#233853" }}>já comprados</strong> pela Midlej,
              através de securitizadora própria, sob diligência jurídica e auditoria.
            </p>
          </div>

          <div className="col-span-full md:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-lg">
              <Image
                src="/fotos_escritorio/1.jpeg"
                alt="Escritório da Midlej Capital"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FECHAMENTO — convite + form + rodapé legal compacto.
   ================================================================ */
function Fechamento() {
  const year = new Date().getFullYear();
  return (
    <section id="fechamento" style={{ backgroundColor: INK }} className="pt-24 md:pt-32 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="col-span-full md:col-span-6">
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>
              O primeiro passo é uma conversa
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.02] tracking-tight text-white max-w-[16ch]">
              Conheça a operação antes de decidir qualquer coisa.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.65] text-white/80 max-w-[46ch]">
              Numa conversa reservada, apresentamos a tese, a estrutura da carteira e os
              riscos. Sem compromisso de investir. O passo é curto, e ele é seu.
            </p>
          </div>

          <div id="contato" className="col-span-full md:col-span-5 md:col-start-8 scroll-mt-24">
            <SpecialForm instanceId="fechamento" />
          </div>
        </div>

        {/* Rodapé legal compacto */}
        <div
          className="mt-20 md:mt-28 border-t pt-8 flex flex-col gap-3 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.42)" }}
        >
          <p className="max-w-[96ch] leading-[1.6]">
            {P.entidadeLegal} · CNPJ {P.cnpj}. Investir em ativos judiciais envolve riscos,
            incluindo prazo de recebimento e resultado dos processos. Resultados passados
            não garantem resultados futuros. Este conteúdo é informativo e não constitui
            oferta pública de valores mobiliários, recomendação de investimento ou promessa
            de rentabilidade.
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <a href="mailto:contato@midlejcapital.com.br" className="hover:text-white transition-colors">
              contato@midlejcapital.com.br
            </a>
            <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Ícones (SVG inline, traço fino — acento gold)
   ================================================================ */
function IconPulse() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
      <path d="M2 18h6l4-11 6 22 4-13 3 4h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconAnchor() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
      <circle cx="17" cy="6" r="3" stroke="currentColor" strokeWidth="1.75" />
      <path d="M17 9v22M8 17H5c0 7 5 12 12 12s12-5 12-12h-3M9 15l8-6 8 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
      <path d="M17 3l11 4v8c0 8-5 13-11 16-6-3-11-8-11-16V7l11-4z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M12 17l3.5 3.5L23 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
