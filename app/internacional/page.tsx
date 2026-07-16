import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { InvestimentosHeader } from "../_hub/InvestimentosHeader";
import { SmoothAnchor } from "../_hub/SmoothAnchor";
import { StickyCTA } from "../components/StickyCTA";
import { BlindagemForm } from "./BlindagemForm";
import { PurchasingPowerChart } from "./PurchasingPowerChart";
import { DollarSimulator } from "./DollarSimulator";
import { PatrimonyGlobe } from "./PatrimonyGlobe";

/* ================================================================
   /blindagem — Proteção patrimonial internacional (em dólar)
   ----------------------------------------------------------------
   Produto: seguro de vida internacional dolarizado (NÃO nomeado na
   página). Público: quem vê risco no Brasil, quer dolarizar o
   patrimônio e busca exclusividade.
   Prova central: gráfico do poder de compra real vs dólar (1994→hoje).
   ⚠️ COMPLIANCE: NENHUMA menção à CVM nesta página — não é valor
   mobiliário local; é um instrumento internacional de seguro.
   Não citamos o nome do produto nem o valor do aporte.
   ================================================================ */

const FAQ_ITEMS = [
  {
    q: "Isso é um investimento de risco?",
    a: "É um instrumento internacional de proteção patrimonial, em dólar, pensado para o longo prazo — não uma aposta de curto prazo. O objetivo é preservar e transmitir patrimônio fora do alcance do risco-Brasil, não perseguir ganho especulativo. Na conversa, apresentamos a estrutura completa, os prazos, as condições e os riscos envolvidos.",
  },
  {
    q: "Preciso ter milhões para começar?",
    a: "Não. Essa é a maior surpresa de quem chega até aqui. A proteção internacional deixou de ser exclusividade de quem tem dezenas de milhões — começa com um aporte anual acessível, em dólar. O que separa quem protege de quem não protege não é o tamanho do patrimônio; é a decisão de começar.",
  },
  {
    q: "Meu dinheiro fica preso? E se eu precisar?",
    a: "É um compromisso de longo prazo — é justamente o horizonte longo que viabiliza a proteção do capital e a dolarização. Existem janelas e regras de liquidez, que explicamos em detalhe antes de qualquer decisão, para que você entre com plena clareza do que está contratando.",
  },
  {
    q: "Por que em dólar, e não em real?",
    a: "Porque o histórico é claro. Desde o Plano Real (1994), o real perdeu cerca de seis vezes mais poder de compra que o dólar. Estruturar patrimônio em moeda forte e fora do Brasil protege você da desvalorização, da instabilidade fiscal e de mudanças de regra locais.",
  },
  {
    q: "É legal e seguro manter patrimônio fora do Brasil?",
    a: "Sim. Manter patrimônio no exterior é lícito e comum entre famílias que planejam. Os ativos ficam custodiados fora do Brasil, sob jurisdição internacional consolidada, com estrutura segregada em nome do titular e beneficiários nomeados. Cuidamos da estruturação corretamente, do começo ao fim.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Proteção patrimonial internacional em dólar | Midlej Capital",
  },
  description:
    "Blinde seu patrimônio do risco-Brasil. Instrumento internacional em dólar: fora de inventário, fora de bloqueio, protegido da inflação. Conversa reservada com um especialista.",
  alternates: { canonical: "/internacional" },
  openGraph: {
    title: "Proteção patrimonial internacional em dólar",
    description:
      "O Brasil é um risco. Seu patrimônio não precisa correr esse risco. Proteção internacional dolarizada — fora de inventário, fora de bloqueio.",
    type: "website",
    locale: "pt_BR",
    url: "https://midlejcapital.com.br/internacional",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proteção patrimonial internacional em dólar",
    description:
      "O Brasil é um risco. Seu patrimônio não precisa correr esse risco. Proteção internacional dolarizada.",
  },
  robots: { index: true, follow: true },
};

export default function BlindagemPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main
      data-brand
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen bg-white text-[#2E4659]"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <SmoothAnchor />
      <InvestimentosHeader hideNav ctaLabel="Falar com um especialista" logoHref="#top" />

      <Hero />
      <Moeda />
      <RiscoBrasil />
      <Solucao />
      <Beneficios />
      <Acessivel />
      <ParaQuem />
      <FAQSection />
      <Closing />

      <StickyCTA label="Proteger meu patrimônio" href="#contato" />
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
   01 — Hero
   ================================================================ */

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center">
      <Image
        src="/fotos_escritorio/3.jpeg"
        alt="Midlej Capital"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(35,56,83,0.72)" }} />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-40 pb-24 md:pt-56 md:pb-32">
        <span className="inline-block text-[0.7rem] font-semibold tracking-widest uppercase mb-6 text-white/70">
          Proteção patrimonial internacional · Em dólar
        </span>
        <h1 className="text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.05] tracking-tight mb-6 text-white max-w-[20ch]">
          O Brasil é um risco. Seu patrimônio não precisa ser refém dele.
        </h1>
        <p className="text-[1.0625rem] leading-[1.65] mb-9 max-w-[54ch] text-white/80">
          Instabilidade política, risco fiscal, mudança de regra, inflação, inventário.
          Existe uma forma de manter parte do seu patrimônio <strong className="text-white">em
          dólar, fora do Brasil e fora do alcance de tudo isso</strong> — com transmissão direta
          à sua família. É reservado a quem decide proteger o que construiu.
        </p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link
            href="#contato"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg text-[0.95rem] font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200 shadow-lg"
          >
            Quero proteger meu patrimônio <Arrow />
          </Link>
          <Link
            href="#moeda"
            className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-white/75 hover:text-white underline underline-offset-4 transition-colors duration-200"
          >
            Ver a prova em números
          </Link>
        </div>
        <p className="mt-6 text-[0.8rem] text-white/55 max-w-[48ch]">
          Conversa reservada e sem compromisso. Sem senha, sem extrato bancário. Um
          especialista analisa o seu caso e apresenta a estrutura em detalhe.
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   02 — A moeda (prova em números: gráfico poder de compra)
   ================================================================ */

function Moeda() {
  return (
    <section id="moeda" className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-full md:col-span-5">
            <SectionTag label="A prova está na moeda" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.06] tracking-tight" style={{ color: "#2E4659" }}>
              Desde o Plano Real, o real perdeu 6× mais poder de compra que o dólar.
            </h2>
            <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.7]" style={{ color: "#6B7B8D" }}>
              <p>
                Não é opinião — é história recente. Em 1994, R$ 1,00 valia aproximadamente
                US$ 1,00. Hoje, são necessários mais de <strong style={{ color: "#2E4659" }}>R$ 5</strong> para
                comprar o mesmo dólar. E, corrigido pela inflação, cada real de 1994 vale
                hoje cerca de <strong style={{ color: "#2E4659" }}>R$ 0,11</strong> em poder de compra.
              </p>
              <p>
                Quem guardou em real viu o patrimônio derreter. Quem dolarizou preservou.
                Não é sobre prever o câmbio de amanhã — é sobre <strong style={{ color: "#2E4659" }}>reconhecer
                uma tendência estrutural de três décadas</strong> e se posicionar do lado certo dela.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#EDEFF2] pt-8">
              <div>
                <p className="text-[clamp(2rem,4vw,2.75rem)] font-light leading-none tabular-nums" style={{ color: "#B23A48" }}>
                  ~11%
                </p>
                <p className="mt-2 text-[0.85rem] leading-[1.5]" style={{ color: "#6B7B8D" }}>
                  do poder de compra de 1994 é o que sobrou no <strong style={{ color: "#2E4659" }}>real</strong>.
                </p>
              </div>
              <div>
                <p className="text-[clamp(2rem,4vw,2.75rem)] font-light leading-none tabular-nums" style={{ color: "#2E4659" }}>
                  ~45%
                </p>
                <p className="mt-2 text-[0.85rem] leading-[1.5]" style={{ color: "#6B7B8D" }}>
                  é o que sobrou no <strong style={{ color: "#2E4659" }}>dólar</strong>, no mesmo período.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full md:col-span-7">
            <div className="rounded-2xl border border-[#EDEFF2] bg-[#F5F7FA] p-5 md:p-8">
              <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-1" style={{ color: "#4a6b8c" }}>
                Poder de compra desde 1994
              </p>
              <p className="text-[0.85rem] mb-5" style={{ color: "#6B7B8D" }}>
                Índice 100 = poder de compra no início do Plano Real.
              </p>
              <PurchasingPowerChart />
            </div>
            <p className="mt-4 text-[0.72rem] leading-[1.6]" style={{ color: "#9BA8B5" }}>
              Fontes: inflação acumulada do IPCA (Brasil) e do CPI (EUA) desde jul/1994.
              Números-âncora arredondados e defensáveis; pontos intermediários aproximados.
              Câmbio e inflação passados não são garantia de comportamento futuro.
            </p>
          </div>
        </div>

        {/* Simulador interativo — torna tangível a força da moeda */}
        <div className="mt-16 md:mt-24">
          <DollarSimulator />
        </div>

        {/* CTA provocativa — a curva dos próximos 15 anos começa hoje */}
        <div className="mt-10 md:mt-12 rounded-2xl p-8 md:p-14 text-center" style={{ backgroundColor: "#233853" }}>
          <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
            A curva não espera
          </p>
          <h3 className="text-[clamp(1.5rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-white max-w-[20ch] mx-auto">
            A curva dos últimos 15 anos você não pega mais. A dos próximos 15 começa hoje.
          </h3>
          <p className="mt-5 text-[1.0625rem] leading-[1.65] max-w-[54ch] mx-auto" style={{ color: "rgba(255,255,255,0.78)" }}>
            Cada ano parado em real é um ano de dólar que não volta. Quem começa hoje se posiciona
            para a próxima curva — e o tempo trabalha a favor de quem começa antes.
          </p>
          <Link
            href="#contato"
            className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-lg text-[0.95rem] font-semibold text-[#233853] bg-white hover:bg-[#dce8f0] transition-colors duration-200 shadow-lg"
          >
            Começar a proteger meu patrimônio hoje <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   03 — O risco-Brasil (a dor)
   ================================================================ */

function RiscoBrasil() {
  const riscos = [
    {
      k: "Bloqueio",
      v: "Já aconteceu. Pode acontecer.",
      note: "O país que confiscou a poupança em 1990 ainda é o mesmo que decide as regras dos seus ativos hoje. Quem mantém tudo dentro da fronteira aceita esse risco por definição.",
    },
    {
      k: "Inventário",
      v: "Anos, custos e exposição",
      note: "No Brasil, transmitir patrimônio significa inventário: tempo, custas, impostos e a vida financeira da família exposta e travada justamente quando ela mais precisa de liquidez.",
    },
    {
      k: "Tributação e regra",
      v: "Muda sem aviso",
      note: "Come-cotas, novas alíquotas, mudança de teto, taxação do que ontem era isento. O ativo nacional está permanentemente sujeito à próxima canetada.",
    },
    {
      k: "Inflação",
      v: "O imposto silencioso",
      note: "Mesmo sem confisco e sem nova lei, a desvalorização do real corrói seu poder de compra todos os anos — como o gráfico acima mostra, há três décadas.",
    },
  ];
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="Por que proteger fora" />
        <h2 className="text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight max-w-[22ch]" style={{ color: "#2E4659" }}>
          Manter 100% do patrimônio no Brasil é uma decisão de risco. A maioria só não percebe.
        </h2>
        <div className="mt-14 pt-10 border-t border-[#E1E6EC] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          {riscos.map((m) => (
            <div key={m.k} className="col-span-full md:col-span-6 flex flex-col">
              <p className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase" style={{ color: "#B23A48" }}>
                {m.k}
              </p>
              <p className="mt-4 text-[clamp(1.375rem,2.4vw,1.875rem)] font-light leading-[1.1]" style={{ color: "#2E4659" }}>
                {m.v}
              </p>
              <p className="mt-4 text-[0.95rem] leading-[1.6] max-w-[46ch]" style={{ color: "#6B7B8D" }}>
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
   04 — A geografia do seu patrimônio (globo 3D · sem nomear produto)
   ⚠️ Sem número/percentual de retorno — não veicular promessa de retorno.
   ================================================================ */

function Solucao() {
  return (
    <section style={{ backgroundColor: "#233853" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="col-span-full md:col-span-6">
            <SectionTag label="A solução" dark />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight text-white">
              A geografia do seu patrimônio.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.7]" style={{ color: "rgba(255,255,255,0.78)" }}>
              Todo patrimônio tem uma geografia — e o seu não precisa terminar na fronteira do
              Brasil. Existe um <strong className="text-white">instrumento internacional de
              proteção patrimonial</strong>, estruturado em dólar e custodiado fora do país,
              que leva parte do que você construiu para as praças financeiras mais sólidas do mundo.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-[1.7]" style={{ color: "rgba(255,255,255,0.78)" }}>
              Não é sobre tirar tudo do Brasil. É sobre <strong className="text-white">deixar de
              depender só dele</strong> — com uma estrutura que acompanha a maior economia do
              mundo e mantém os benefícios de sucessão e proteção que aqui dentro não existem.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "100% em dólar, custodiado fora do Brasil.",
                "Ligado à maior economia do mundo, em estrutura segregada no seu nome.",
                "Transmissão direta aos beneficiários — sem inventário.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-white">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="mt-0.5 shrink-0">
                    <path d="M3.5 9.5l3.5 3.5 7.5-8" stroke="#8FB3D4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>

            <Link
              href="#contato"
              className="mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#233853] bg-white hover:bg-[#dce8f0] transition-colors duration-200"
            >
              Entender a estrutura no meu caso <Arrow />
            </Link>
          </div>

          <div className="col-span-full md:col-span-6">
            <div className="relative w-full aspect-square max-w-[520px] mx-auto">
              <PatrimonyGlobe className="absolute inset-0" />
            </div>
            <p className="text-center text-[0.78rem] tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>
              O dinheiro sai do Brasil e se conecta às praças financeiras do mundo.
            </p>
          </div>
        </div>

        <p className="mt-14 md:mt-16 text-[0.72rem] leading-[1.6] max-w-[92ch]" style={{ color: "rgba(255,255,255,0.42)" }}>
          Instrumento internacional denominado em dólar, sujeito às condições e à regulação da
          instituição emissora, à variação cambial e às regras de liquidez do plano. Conteúdo
          informativo; não constitui oferta nem promessa de rentabilidade. Câmbio e rentabilidade
          passados não representam garantia de resultado futuro.
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   05 — Benefícios (a blindagem, 4 pilares)
   ================================================================ */

function Beneficios() {
  const items = [
    {
      k: "Fora de bloqueio",
      v: "Fora do alcance",
      note: "Ativos em dólar, custodiados fora do Brasil, em estrutura segregada no seu nome. Fora da fronteira em que uma canetada decide o destino do que é seu.",
    },
    {
      k: "Fora de inventário",
      v: "Direto à família",
      note: "Beneficiários nomeados recebem o capital diretamente, com liquidez e sigilo — sem passar por inventário, sem anos de espera, sem exposição do patrimônio.",
    },
    {
      k: "Tributação eficiente",
      v: "Fora do come-cotas",
      note: "Estrutura internacional que não sofre a tributação recorrente dos ativos nacionais. O tratamento tributário é planejado caso a caso, dentro da lei.",
    },
    {
      k: "Proteção real",
      v: "Blindado da inflação",
      note: "Denominado em dólar e atrelado à maior economia do mundo — a defesa direta contra a desvalorização crônica do real que o gráfico acima demonstra.",
    },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="A blindagem" />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-12 md:mb-16 max-w-[24ch]" style={{ color: "#2E4659" }}>
          Quatro proteções que o patrimônio dentro do Brasil não tem.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 border-t border-[#EDEFF2] pt-10">
          {items.map((m) => (
            <div key={m.k} className="col-span-full md:col-span-6 lg:col-span-3 flex flex-col">
              <p className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase" style={{ color: "#4a6b8c" }}>
                {m.k}
              </p>
              <p className="mt-4 text-[clamp(1.5rem,2.6vw,2rem)] font-light leading-[1.04]" style={{ color: "#2E4659" }}>
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
   06 — Acessível (quebra de complexidade sem revelar o ticket)
   ================================================================ */

function Acessivel() {
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="col-span-full md:col-span-7">
            <SectionTag label="Mais perto do que parece" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.06] tracking-tight max-w-[20ch]" style={{ color: "#2E4659" }}>
              “Isso é para quem tem dezenas de milhões.” Não é — e é aí que quase todo mundo erra.
            </h2>
            <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.7] max-w-[56ch]" style={{ color: "#6B7B8D" }}>
              <p>
                A imagem de que proteger patrimônio no exterior é coisa de bilionário faz muita
                gente adiar a decisão por anos — e pagar o preço em real desvalorizado. A verdade
                é mais simples: <strong style={{ color: "#2E4659" }}>começa com um aporte anual
                acessível</strong>, em dólar, ao alcance de quem já construiu um patrimônio relevante.
              </p>
              <p>
                O que separa quem protege de quem não protege nunca foi o tamanho do patrimônio.
                É a decisão de começar — e o tempo, que trabalha a favor de quem começa antes.
              </p>
            </div>
            <Link
              href="#contato"
              className="mt-9 inline-flex items-center gap-2 px-7 py-4 rounded-lg text-[0.95rem] font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200 shadow-lg"
            >
              Descobrir como começa no meu caso <Arrow />
            </Link>
          </div>
          <div className="col-span-full md:col-span-5">
            <blockquote className="border-l-2 pl-6 md:pl-8" style={{ borderColor: "#B23A48" }}>
              <p className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-light leading-[1.35] tracking-tight" style={{ color: "#2E4659" }}>
                <span style={{ color: "#B23A48" }}>*</span> O melhor momento para dolarizar o
                patrimônio foi há 30 anos. O segundo melhor é hoje.
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   07 — Para quem
   ================================================================ */

function ParaQuem() {
  const profiles = [
    {
      tag: "Não confia no rumo do Brasil",
      body: "Você enxerga o risco fiscal, político e institucional do país — e não quer que 100% do que construiu dependa exclusivamente dele.",
    },
    {
      tag: "Quer preservar poder de compra",
      body: "Cansou de ver o real se desvalorizar e quer parte do patrimônio em moeda forte, protegida da inflação e das oscilações locais.",
    },
    {
      tag: "Pensa na sucessão",
      body: "Quer que a família receba o patrimônio de forma direta, líquida e discreta — sem inventário, sem anos de espera, sem exposição.",
    },
    {
      tag: "Valoriza exclusividade",
      body: "Busca uma estrutura reservada, conduzida por especialistas, para um patamar de planejamento que o banco de varejo não oferece.",
    },
  ];
  return (
    <section id="para-quem" className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14 md:mb-20">
          <div className="col-span-full md:col-span-9">
            <SectionTag label="Para quem é" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
              Para quem já construiu patrimônio e decidiu não deixá-lo todo exposto ao risco-Brasil.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          {profiles.map((p) => (
            <article key={p.tag} className="col-span-full md:col-span-6 border-t border-[#EDEFF2] pt-8">
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
   08 — FAQ
   ================================================================ */

function FAQSection() {
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-full md:col-span-4">
            <SectionTag label="Dúvidas frequentes" />
            <h2 className="text-[clamp(1.625rem,3vw,2.5rem)] font-bold leading-[1.04] tracking-tight max-w-[16ch]" style={{ color: "#2E4659" }}>
              O que perguntam antes da primeira conversa.
            </h2>
          </div>
          <div className="col-span-full md:col-span-8 md:col-start-5">
            <ul className="border-t border-[#E1E6EC]">
              {FAQ_ITEMS.map((f, i) => (
                <li key={i} className="border-b border-[#E1E6EC]">
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
   09 — Closing (form + footer)
   ================================================================ */

function Closing() {
  const year = new Date().getFullYear();
  return (
    <section id="contato" style={{ backgroundColor: "#4a6b8c" }} className="pt-24 md:pt-32 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start pb-20 md:pb-24">
          <div className="col-span-full md:col-span-5">
            <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
              Conversa reservada
            </p>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white mb-6">
              Proteja parte do seu patrimônio antes da próxima canetada.
            </h2>
            <p className="text-[1.0625rem] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.80)" }}>
              Reservada, confidencial e sem compromisso. Sem senha, sem extrato e sem
              oferta de produtos de prateleira.
            </p>
            <p className="text-[0.9375rem] leading-relaxed max-w-[44ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
              Você responde a três perguntas rápidas, um especialista analisa o seu caso e
              retorna pelo WhatsApp para apresentar a estrutura — on-line ou presencial em Brasília.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-semibold px-4 py-2.5 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 4.6V8l2.4 1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Retorno pelo WhatsApp em até 4 horas úteis.
            </p>
          </div>
          <div className="col-span-full md:col-span-6 md:col-start-7">
            <BlindagemForm />
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }} className="mb-12 md:mb-14" />

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
            <p className="text-sm leading-relaxed max-w-[42ch]" style={{ color: "rgba(255,255,255,0.55)" }}>
              Planejamento patrimonial e proteção internacional. Estruturas em dólar,
              conduzidas por especialistas, para quem decide proteger o que construiu.
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

        <div className="border-t pt-6 flex flex-col gap-3 text-xs" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.38)" }}>
          <p className="max-w-[96ch] leading-[1.6]">
            Esta página tem caráter exclusivamente informativo e não constitui oferta,
            recomendação ou solicitação de contratação de qualquer produto. O instrumento
            referido é internacional, denominado em dólar, e está sujeito às condições e à
            regulação da instituição emissora, bem como à variação cambial e às regras de
            liquidez do plano. A proteção do capital ao final do prazo depende da manutenção
            dos aportes até o término. O tratamento tributário depende da situação de cada
            titular. Câmbio e rentabilidade passados não representam garantia de resultado futuro.
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <span>Midlej Capital</span>
            <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
