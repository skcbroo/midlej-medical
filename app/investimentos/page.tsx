import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { InvestimentosHeader } from "../_hub/InvestimentosHeader";
import { HubLeadForm } from "../_hub/HubLeadForm";
import { SmoothAnchor } from "../_hub/SmoothAnchor";
import {
  AllocationRingsClient as AllocationRings,
  CompoundCurveClient as CompoundCurve,
} from "../_hub/scenes/clients";

export const metadata: Metadata = {
  title: "Investimentos · Midlej Capital",
  description:
    "Gestão patrimonial integrada, sem conflito de interesse. Para famílias que já formaram patrimônio e querem conduzir cada decisão sob critério único.",
};

/* ================================================================
   Page
   ================================================================ */

export default function InvestimentosPage() {
  return (
    <main
      data-brand
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen bg-white text-[#2E4659]"
    >
      <SmoothAnchor />
      <InvestimentosHeader />

      <Hero />
      <Marcos />
      <Manifesto />
      <Composicao />
      <ComoConduzimos />
      <TempoTrabalhando />
      <ParaQuem />
      <Depoimentos />
      <FAQSection />
      <OutrasFrentes />
      <EspacoSection />
      <Closing />
    </main>
  );
}

/* ================================================================
   Shared atoms
   ================================================================ */

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SectionTag({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <p
      className="text-[0.7rem] font-semibold tracking-widest uppercase mb-3"
      style={{ color: dark ? "rgba(255,255,255,0.50)" : "#4a6b8c" }}
    >
      {label}
    </p>
  );
}

/* ================================================================
   01 — Hero (navy escuro)
   ================================================================ */

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center">
      {/* Background */}
      <Image
        src="/fotos_escritorio/2.jpeg"
        alt="Espaço Midlej Capital"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Overlay navy */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,70,89,0.58)" }} />
      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-48 pb-24 md:pt-60 md:pb-32">
        <span className="inline-block text-[0.7rem] font-semibold tracking-widest uppercase mb-6 text-white/70">
          Investimentos · Midlej Capital
        </span>
        <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.06] tracking-tight mb-6 text-white max-w-[18ch]">
          Patrimônio integrado, sob critério único.
        </h1>
        <p className="text-[1.0625rem] leading-[1.65] mb-10 max-w-[44ch] text-white/75">
          Gestão patrimonial independente para famílias que já formaram
          patrimônio. Recomendação remunerada pelo cliente, estruturada
          caso a caso, conduzida em horizonte plurianual.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
            Pedir primeira conversa <Arrow />
          </Link>
          <Link href="#manifesto" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-200">
            Como pensamos
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   02 — Marcos editoriais
   ================================================================ */

function Marcos() {
  const items = [
    { k: "Modelo",        v: "Fee recorrente", note: "Remunerados pelo cliente, não pela distribuição" },
    { k: "Independência", v: "Zero rebate",     note: "Receba o comissionamento dos seus investimentos realizados na corretora" },
    { k: "Plataforma",   v: "Institucional",   note: "Acesso a estruturas fora da prateleira de banco" },
    { k: "Relação",      v: "Plurianual",       note: "Acompanhamento contínuo, não venda pontual" },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="Como operamos" />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-12 md:mb-16" style={{ color: "#2E4659" }}>
          Modelo sem conflito de interesse.
        </h2>
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 border-t border-[#EDEFF2] pt-10">
          {items.map((m) => (
            <div key={m.k} className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col">
              <p className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase" style={{ color: "#6B7B8D" }}>
                {m.k}
              </p>
              <p className="mt-4 text-[clamp(1.5rem,2.6vw,2.125rem)] font-light leading-[1.04]" style={{ color: "#2E4659" }}>
                {m.v}
              </p>
              <p className="mt-4 text-[0.95rem] leading-[1.55] max-w-[34ch]" style={{ color: "#6B7B8D" }}>
                {m.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   03 — Manifesto
   ================================================================ */

function Manifesto() {
  return (
    <section id="manifesto" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <SectionTag label="Manifesto" />
        <h2 className="text-[clamp(2rem,4.2vw,3.75rem)] font-bold leading-[1.08] tracking-tight max-w-[26ch]" style={{ color: "#2E4659" }}>
          Investir não é comprar um produto. É organizar uma decisão dentro de um patrimônio que já existe.
        </h2>
        <div className="mt-14 pt-10 border-t border-[#EDEFF2] grid grid-cols-12 gap-8">
          <p className="col-span-12 md:col-span-6 text-[1.0625rem] leading-[1.7]" style={{ color: "#6B7B8D" }}>
            A maior parte dos investidores é atendida por instituições
            remuneradas pela distribuição de produtos. Nós seguimos outro
            modelo: somos remunerados exclusivamente pelo cliente e não
            recebemos rebates ou comissões.
          </p>
          <p className="col-span-12 md:col-span-6 text-[1.0625rem] leading-[1.7]" style={{ color: "#6B7B8D" }}>
            Isso garante independência para recomendar o que faz sentido
            para o patrimônio da família — e não para terceiros.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   II — Composição (navy, AllocationRings 3D)
   ================================================================ */

function Composicao() {
  return (
    <section style={{ backgroundColor: "#4a6b8c" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">

          {/* Esquerda: título + texto + lista */}
          <div className="col-span-12 md:col-span-5 order-2 md:order-1">
            <SectionTag label="Composição" dark />
            <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Cada classe<br />tem um papel.
            </h2>
            <p className="mt-6 text-[0.95rem] leading-[1.65]" style={{ color: "rgba(255,255,255,0.75)" }}>
              Uma carteira é um sistema de exposições. Cada camada entra
              porque carrega uma função: liquidez, preservação, crescimento,
              sucessão.
            </p>
            <ul className="mt-8 divide-y divide-white/10 border-t border-white/10">
              {[
                { n: "Camada 1", label: "Reserva e liquidez",                   pct: "10–20%" },
                { n: "Camada 2", label: "Renda fixa",                           pct: "30–45%" },
                { n: "Camada 3", label: "Renda variável",                       pct: "20–30%" },
                { n: "Camada 4", label: "Previdência e estruturas patrimoniais", pct: "10–20%" },
              ].map((item, idx, arr) => (
                <li key={item.n} className={`py-4 flex items-baseline justify-between gap-4${idx === arr.length - 1 ? " border-b border-white/10" : ""}`}>
                  <div>
                    <p className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase" style={{ color: "rgba(255,255,255,0.50)" }}>
                      {item.n}
                    </p>
                    <p className="mt-0.5 text-[0.9375rem] font-bold leading-[1.2] text-white">
                      {item.label}
                    </p>
                  </div>
                  <span className="text-[1.25rem] font-light tabular-nums shrink-0" style={{ color: "rgba(255,255,255,0.80)" }}>
                    {item.pct}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.78rem] leading-[1.55]" style={{ color: "rgba(255,255,255,0.45)" }}>
              Faixas ilustrativas, calibradas caso a caso. Não constituem
              recomendação de alocação genérica.
            </p>
          </div>

          {/* Direita: animação */}
          <div className="col-span-12 md:col-span-7 order-1 md:order-2">
            <div className="w-full aspect-square md:aspect-[4/3]">
              <AllocationRings className="w-full h-full" color="white" markerColor="#dce8f0" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   04 — Como conduzimos (4 etapas)
   ================================================================ */

function ComoConduzimos() {
  const steps = [
    {
      n: "I",
      title: "Diagnóstico",
      body: "Mapeamento do patrimônio existente, do fluxo de caixa real e dos riscos invisíveis. Sem questionário genérico — conversa estruturada com leitura de extratos.",
    },
    {
      n: "II",
      title: "Estrutura",
      body: "Desenho de alocação, proteção e sucessão construído caso a caso. Cada decisão fundamentada no que serve à família, não no que rende para o intermediário.",
    },
    {
      n: "III",
      title: "Execução",
      body: "Implementação assistida no ambiente que faz sentido — conta institucional, previdência, estruturas patrimoniais — com responsável nomeado.",
    },
    {
      n: "IV",
      title: "Acompanhamento",
      body: "Revisões trimestrais, ajustes nos pontos de inflexão pessoais, fiscais e regulatórios. Plano vivo, não relatório arquivado.",
    },
  ];
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-8 mb-10 md:mb-14">
          <div className="col-span-12 md:col-span-9">
            <SectionTag label="Como conduzimos" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[20ch]" style={{ color: "#2E4659" }}>
              Quatro frentes ativas ao mesmo tempo.
            </h2>
            <p className="mt-8 text-[1.0625rem] leading-[1.65] max-w-[54ch]" style={{ color: "#6B7B8D" }}>
              Cada caso entra por uma porta diferente. O programa percorre as
              quatro frentes na ordem que o caso pede.
            </p>
          </div>
        </div>
        <ol className="border-t border-[#EDEFF2]">
          {steps.map((s) => (
            <li
              key={s.n}
              className="border-b border-[#EDEFF2] py-7 md:py-9 grid grid-cols-12 gap-6 items-baseline"
            >
              <div className="col-span-12 md:col-span-2">
                <span className="text-[clamp(1.875rem,3vw,2.5rem)] font-light leading-none tabular-nums" style={{ color: "#4a6b8c" }}>
                  {s.n}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3 className="text-[clamp(1.25rem,1.8vw,1.625rem)] font-bold leading-[1.15] tracking-tight" style={{ color: "#2E4659" }}>
                  {s.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="text-[0.95rem] leading-[1.6] max-w-[52ch]" style={{ color: "#6B7B8D" }}>
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================
   III — O tempo trabalhando
   ================================================================ */

function TempoTrabalhando() {
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">

          {/* Esquerda: texto + stats */}
          <div className="col-span-12 md:col-span-5 order-2 md:order-1">
            <SectionTag label="O ativo principal" />
            <h2 className="text-[clamp(1.875rem,3.2vw,2.75rem)] font-bold leading-[1.04] tracking-tight" style={{ color: "#2E4659" }}>
              O tempo trabalhando.
            </h2>
            <p className="mt-5 text-[0.95rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
              Aporte estável + retorno reinvestido + horizonte longo. A curva
              que ninguém vê quando começa — mas que define o resultado.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-x-6 border-t border-[#EDEFF2] pt-6">
              {[
                { label: "Em 10 anos", value: "+85%" },
                { label: "Em 20 anos", value: "+260%" },
                { label: "Em 30 anos", value: "+570%" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase" style={{ color: "#6B7B8D" }}>
                    {item.label}
                  </dt>
                  <dd className="text-[clamp(1.1rem,1.8vw,1.5rem)] font-light leading-[1] tabular-nums mt-2" style={{ color: "#2E4659" }}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[0.75rem] leading-[1.5]" style={{ color: "#9BA8B5" }}>
              Acumulação ilustrativa, retorno real de 6% a.a., reinvestimento
              integral. Não é projeção nem promessa de resultado.
            </p>
            <div className="mt-8">
              <Link
                href="#contato"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border border-[#4a6b8c] hover:bg-[#4a6b8c] hover:text-white transition-colors duration-200"
                style={{ color: "#4a6b8c" }}
              >
                Conversar sobre horizonte
                <Arrow />
              </Link>
            </div>
          </div>

          {/* Direita: animação */}
          <div className="col-span-12 md:col-span-7 order-1 md:order-2">
            <div className="w-full aspect-[4/3]">
              <CompoundCurve className="w-full h-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   05 — Para quem (4 perfis)
   ================================================================ */

function ParaQuem() {
  const profiles = [
    {
      tag: "Médicos PJ",
      body: "Plantonistas e especialistas que somam renda alta com pouca disponibilidade. Estruturamos previdência, proteção e investimento sem onda comercial.",
    },
    {
      tag: "Empresários e sócios",
      body: "Patrimônio próximo do negócio. Cuidamos da separação caixa pessoal × empresa, sucessão, holding e estruturação patrimonial do lucro retido.",
    },
    {
      tag: "Executivos C-level",
      body: "Stock options, RSU e bônus de longo prazo. Planejamos a tributação e a alocação de quem é remunerado em camadas.",
    },
    {
      tag: "Profissionais liberais",
      body: "Médicos, engenheiros, consultores. Receita estável mas sem coordenação entre conta PJ, reserva de emergência, previdência e patrimônio investido.",
    },
  ];
  return (
    <section id="para-quem" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-9">
            <SectionTag label="Para quem" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[22ch]" style={{ color: "#2E4659" }}>
              Quem chega geralmente já construiu — e quer organizar.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          {profiles.map((p) => (
            <article
              key={p.tag}
              className="col-span-12 md:col-span-6 border-t border-[#EDEFF2] pt-8"
            >
              <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase" style={{ color: "#4a6b8c" }}>
                {p.tag}
              </p>
              <p className="mt-6 text-[1.0625rem] leading-[1.65] max-w-[48ch]" style={{ color: "#6B7B8D" }}>
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   06 — Depoimentos (navy, 3 quotes anônimas)
   ================================================================ */

function Depoimentos() {
  const quotes = [
    {
      body: "Cheguei achando que precisava de um gerente melhor. Saí com um plano que nunca tinha visto colocado no papel, e com clareza de quem responde por cada decisão.",
      who: "Médico, 41 anos",
      city: "São Paulo",
    },
    {
      body: "O custo da relação ficou conhecido antes do aceite. Em quatro anos, o que mudou foi a carteira inteira — e nenhuma das mudanças foi sugerida por comissão.",
      who: "Empresária, 53 anos",
      city: "Brasília",
    },
    {
      body: "Eu pagava taxa em três lugares sem perceber. A primeira coisa que mudou foi a conta de custódia. A segunda foi a tranquilidade de saber para onde olhar nos relatórios.",
      who: "Executivo, 47 anos",
      city: "Belo Horizonte",
    },
  ];
  return (
    <section style={{ backgroundColor: "#4a6b8c" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <SectionTag label="Quem já passou por aqui" dark />
        <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[22ch] text-white">
          Identidades preservadas, contexto real.
        </h2>
        <div className="mt-16 md:mt-20 grid grid-cols-12 gap-x-8 gap-y-12">
          {quotes.map((q, i) => (
            <figure
              key={i}
              className="col-span-12 md:col-span-4 border-t border-white/10 pt-8"
            >
              <blockquote className="text-[1.125rem] font-medium leading-[1.4] text-white">
                {q.body}
              </blockquote>
              <figcaption className="mt-8 text-[0.72rem] font-semibold tracking-[0.16em] uppercase" style={{ color: "rgba(255,255,255,0.50)" }}>
                {q.who} · {q.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   07 — Contato
   ================================================================ */


/* ================================================================
   08 — FAQ (accordion HTML nativo)
   ================================================================ */

function FAQSection() {
  const faqs = [
    {
      q: "Qual o valor do fee?",
      a: "O fee é proporcional à complexidade do caso e conhecido antes do aceite. Não é percentual sobre patrimônio investido — é mensalidade ou anuidade fixa, revisada apenas quando o escopo muda.",
    },
    {
      q: "Vocês têm valor mínimo de patrimônio?",
      a: "Não temos piso rígido. O que avaliamos é se o modelo de banca privada faz sentido para o caso. Geralmente conversamos a partir de R$ 300 mil em patrimônio investido, mas o fit não é só monetário.",
    },
    {
      q: "Onde fica o dinheiro investido?",
      a: "Em conta institucional no Brasil — corretora ou banco de investimentos. Nunca passa por conta nossa. Acesso, custódia e movimentação seguem com o cliente.",
    },
    {
      q: "Quanto tempo dura a relação?",
      a: "Plurianual. Os ganhos do modelo aparecem no acompanhamento — quando a carteira é revista trimestralmente, ajustada em pontos de inflexão e auditada por alguém que não vende produto.",
    },
    {
      q: "Vocês operam para mim ou eu opero?",
      a: "Você opera. A Midlej Capital é consultoria, não gestão. Recomendamos, fundamentamos, acompanhamos a execução — mas a custódia e a ordem são suas.",
    },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 md:col-span-4">
            <SectionTag label="Dúvidas frequentes" />
            <h2 className="text-[clamp(1.625rem,3vw,2.5rem)] font-bold leading-[1.04] tracking-tight max-w-[16ch]" style={{ color: "#2E4659" }}>
              O que vale saber antes da primeira conversa.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <ul className="border-t border-[#EDEFF2]">
              {faqs.map((f, i) => (
                <li key={i} className="border-b border-[#EDEFF2]">
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-baseline justify-between gap-6 py-6 md:py-7">
                      <span className="text-[clamp(1.0625rem,1.4vw,1.25rem)] font-bold leading-[1.3]" style={{ color: "#2E4659" }}>
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className="font-semibold text-[0.95rem] transition-transform duration-200 group-open:rotate-45"
                        style={{ color: "#4a6b8c" }}
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-6 md:pb-7 text-[0.95rem] leading-[1.65] max-w-[56ch]" style={{ color: "#6B7B8D" }}>
                      {f.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Outras frentes — backlink editorial pro hub /
   ================================================================ */

function OutrasFrentes() {
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <SectionTag label="Hub Midlej Capital" />
            <h2 className="text-[clamp(1.625rem,3vw,2.5rem)] font-bold leading-[1.04] tracking-tight max-w-[26ch]" style={{ color: "#2E4659" }}>
              Investimentos é uma das frentes da banca.
            </h2>
            <p className="mt-8 text-[1.0625rem] leading-[1.65] max-w-[48ch]" style={{ color: "#6B7B8D" }}>
              Mentoria, câmbio, seguros, previdência e treinamentos.
              Operadas sob o mesmo critério, num único interlocutor.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200"
            >
              Ver o hub completo
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Espaço
   ================================================================ */

function EspacoSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <SectionTag label="Nosso espaço" />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-8" style={{ color: "#2E4659" }}>
          O ambiente onde o trabalho acontece.
        </h2>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-8">
            <Image
              src="/fotos_escritorio/4.jpeg"
              alt="Espaço Midlej Capital"
              width={1000}
              height={660}
              className="w-full h-[480px] object-cover rounded-xl"
            />
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
            <Image
              src="/fotos_escritorio/2.jpeg"
              alt="Sala de reunião Midlej Capital"
              width={500}
              height={320}
              className="w-full h-[232px] object-cover rounded-xl"
            />
            <Image
              src="/fotos_escritorio/6.jpeg"
              alt="Escritório Midlej Capital"
              width={500}
              height={320}
              className="w-full h-[232px] object-cover rounded-xl"
            />
          </div>
          <div className="col-span-12">
            <Image
              src="/fotos_escritorio/1.jpeg"
              alt="Midlej Capital"
              width={1400}
              height={480}
              className="w-full h-[300px] object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   09 — Closing (contato + footer fundidos — igual ao "/")
   ================================================================ */

const FOOTER_LINKS = [
  { label: "Mentoria",      href: "/" },
  { label: "Investimentos", href: "/investimentos" },
  { label: "Câmbio",        href: "/" },
  { label: "Seguros",       href: "/" },
  { label: "Alternativos",  href: "/" },
  { label: "Previdência",   href: "/" },
  { label: "Workshops",     href: "/" },
];

function Closing() {
  const year = new Date().getFullYear();
  return (
    <section id="contato" style={{ backgroundColor: "#4a6b8c" }} className="pt-24 md:pt-32 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* ── CTA principal ── */}
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start pb-20 md:pb-24">
          <div className="col-span-12 md:col-span-5">
            <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
              Primeira conversa
            </p>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white mb-6">
              Sem proposta antes da conversa.
            </h2>
            <p className="text-[1.0625rem] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
              A primeira conversa é gratuita, confidencial e sem compromisso.
            </p>
            <p className="text-[0.9375rem] leading-relaxed max-w-[44ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
              Você apresenta seu contexto, seus objetivos e desafios. Nós ouvimos,
              fazemos as perguntas certas e avaliamos como agregar valor ao seu caso.
              Somente depois disso discutimos caminhos e soluções.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <HubLeadForm tone="dark" submitLabel="Solicitar reunião" origin="Investimentos Midlej Capital" />
          </div>
        </div>

        {/* ── Divisor ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }} className="mb-12 md:mb-14" />

        {/* ── Footer info ── */}
        <div className="grid grid-cols-12 gap-8 items-start mb-10">

          {/* Logo + tagline */}
          <div className="col-span-12 md:col-span-4">
            <Image
              src="/midlej_capital.png"
              alt="Midlej Capital"
              width={320}
              height={130}
              className="h-12 w-auto mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm leading-relaxed max-w-[32ch]" style={{ color: "rgba(255,255,255,0.55)" }}>
              Sem conflito de interesse. Sem produto da prateleira.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-6 md:col-span-3 md:col-start-6">
            <p className="text-[0.6rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              Soluções
            </p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors duration-200" style={{ color: "rgba(255,255,255,0.60)" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="col-span-6 md:col-span-4">
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

        {/* ── Barra legal ── */}
        <div className="border-t pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.35)" }}>
          <span>CNPJ 35.340.252/0001-44</span>
          <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
        </div>

      </div>
    </section>
  );
}
