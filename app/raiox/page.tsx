import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { InvestimentosHeader } from "../_hub/InvestimentosHeader";
import { SmoothAnchor } from "../_hub/SmoothAnchor";
import { StickyCTA } from "../components/StickyCTA";
import { RaioXForm } from "./RaioXForm";

export const metadata: Metadata = {
  title: "Onde investir? Raio-X gratuito da sua carteira · Midlej Capital",
  description:
    "Recebeu uma herança, vendeu um imóvel ou tem um valor parado e não sabe onde investir? Peça um Raio-X gratuito da sua carteira. Consultoria independente registrada na CVM, remunerada por você — não pela venda de produto.",
};

/* ================================================================
   /raiox — LP de resposta direta (serviços financeiros)
   Ângulo 1 (hero): alta intenção — "onde investir", "recebi herança".
   Ângulo 2 (prova): track record da carteira, blindado pela CVM.
   Conversão: RaioXForm (lead_form_submit → GTM/Ads).
   ================================================================ */

export default function RaioXPage() {
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
      <Dor />
      <TrackRecord />
      <ComoFunciona />
      <PorQueConfiar />
      <ParaQuem />
      <FAQSection />
      <Closing />

      <StickyCTA label="Quero o Raio-X gratuito" href="#contato" />
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
   01 — Hero (alta intenção)
   ================================================================ */

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center">
      <Image
        src="/fotos_escritorio/2.jpeg"
        alt="Espaço Midlej Capital"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,70,89,0.62)" }} />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-40 pb-24 md:pt-56 md:pb-32">
        <span className="inline-block text-[0.7rem] font-semibold tracking-widest uppercase mb-6 text-white/70">
          Consultoria de investimentos · Registro CVM
        </span>
        <h1 className="text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.05] tracking-tight mb-6 text-white max-w-[20ch]">
          Tem um valor parado e não sabe onde investir?
        </h1>
        <p className="text-[1.0625rem] leading-[1.65] mb-9 max-w-[50ch] text-white/80">
          Recebeu uma herança, vendeu um imóvel ou acumulou R$ 100 mil, R$ 500 mil,
          R$ 1 milhão — e a orientação que recebe do banco parece atender mais ao banco
          do que a você? Antes de qualquer decisão, solicite um <strong className="text-white">Raio-X
          gratuito da sua carteira</strong>. Consultoria independente, remunerada por você — não por comissão.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="#contato"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg text-[0.95rem] font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200 shadow-lg"
          >
            Quero meu Raio-X gratuito <Arrow />
          </Link>
          <Link
            href="#track"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-lg text-[0.95rem] font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-200"
          >
            Ver como investimos
          </Link>
        </div>
        <p className="mt-6 text-[0.8rem] text-white/55 max-w-[46ch]">
          Análise sem custo e sem compromisso. Não solicitamos senha, extrato bancário
          ou acesso à sua conta. A solicitação leva cerca de dois minutos.
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   02 — A dor / o conflito de interesse (#manifesto p/ o header)
   ================================================================ */

function Dor() {
  return (
    <section id="manifesto" className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="Por que a maioria investe mal" />
        <h2 className="text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
          O problema não é falta de opções. É o excesso de intermediários remunerados por comissão.
        </h2>
        <div className="mt-14 pt-10 border-t border-[#EDEFF2] grid grid-cols-12 gap-x-8 gap-y-10">
          {[
            {
              k: "No banco",
              v: "Você é uma meta de vendas",
              note: "O gerente é remunerado para distribuir o produto do momento. O que é mais rentável para a instituição nem sempre é o mais adequado ao seu patrimônio.",
            },
            {
              k: "Na poupança / CDB",
              v: "Tempo é retorno que não volta",
              note: "Cada mês no ativo errado é rendimento que não se recupera. O custo de adiar a decisão costuma superar o de tomá-la ao lado de quem não distribui produtos.",
            },
            {
              k: "Na Midlej",
              v: "Ninguém é remunerado por comissão",
              note: "Consultoria registrada na CVM, remunerada exclusivamente por você. Sem rebate e sem produto de prateleira. A recomendação existe para servir ao seu patrimônio — e apenas a ele.",
            },
          ].map((m) => (
            <div key={m.k} className="col-span-12 md:col-span-4 flex flex-col">
              <p className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase" style={{ color: "#6B7B8D" }}>
                {m.k}
              </p>
              <p className="mt-4 text-[clamp(1.375rem,2.4vw,1.875rem)] font-light leading-[1.1]" style={{ color: "#2E4659" }}>
                {m.v}
              </p>
              <p className="mt-4 text-[0.95rem] leading-[1.6]" style={{ color: "#6B7B8D" }}>
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
   03 — Resultado próprio + método (ÂNGULO 2) — BLINDADO CVM
   ----------------------------------------------------------------
   ⚠️ ENQUADRAMENTO (definido pelo Lucas / CEA):
   NÃO recomendamos ativos nem indicamos ações a comprar — isso seria
   atividade de consultor/analista. Aqui apenas DEMONSTRAMOS o resultado
   próprio da nossa estratégia e COMO chegamos nele (método/educacional).
   Nada de "compre a ação X".
   ----------------------------------------------------------------
   ⚠️ COMPLIANCE: divulgação de rentabilidade passada.
   Dados CONFIRMADOS pelo Lucas (15/07/2026):
     • período: 31/07/2025 a 10/07/2026 (12 meses);
     • rentabilidade: 23,06%; benchmark: 166,90% do CDI no mesmo período.
   O disclaimer abaixo é obrigatório e não deve ser removido.
   ================================================================ */

function TrackRecord() {
  return (
    <section id="track" style={{ backgroundColor: "#2E4659" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Esquerda: número + benchmark */}
          <div className="col-span-12 md:col-span-5">
            <SectionTag label="Transparência" dark />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight text-white">
              Você quer ver resultado. Nós mostramos — dentro das regras da CVM.
            </h2>
            <p className="mt-6 text-[0.95rem] leading-[1.65]" style={{ color: "rgba(255,255,255,0.75)" }}>
              Não prometemos ganhos nem indicamos quais ações comprar — a regulação
              não permite, e com razão. O que apresentamos é o <strong className="text-white/90">nosso
              próprio resultado</strong> e, sobretudo, <strong className="text-white/90">o método
              por trás dele</strong>. Na primeira conversa, apresentamos essa metodologia por completo.
            </p>
          </div>

          {/* Direita: card do track record */}
          <div className="col-span-12 md:col-span-7">
            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-8 md:p-10">
              <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.50)" }}>
                O resultado da nossa carteira própria
              </p>
              <div className="flex flex-wrap items-end gap-x-10 gap-y-6 mt-4">
                <div>
                  <p className="text-[clamp(3rem,7vw,5rem)] font-light leading-[0.95] tabular-nums text-white">
                    23,06%
                  </p>
                  <p className="mt-2 text-[0.8rem]" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Rentabilidade em 12 meses <br />31/07/2025 a 10/07/2026
                  </p>
                </div>
                <div className="h-16 w-px bg-white/15 hidden sm:block" aria-hidden />
                <div>
                  <p className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1] tabular-nums" style={{ color: "rgba(255,255,255,0.80)" }}>
                    166,90%
                  </p>
                  <p className="mt-2 text-[0.8rem]" style={{ color: "rgba(255,255,255,0.55)" }}>
                    do CDI no mesmo <br />período
                  </p>
                </div>
              </div>

              <ul className="mt-8 pt-6 border-t border-white/10 space-y-3">
                {[
                  "Este é o nosso resultado — não uma indicação de qual ativo você deve adquirir.",
                  "O foco é o método: como chegamos até ele, de forma estruturada.",
                  "A decisão e a custódia permanecem sempre com você. Consultoria, não gestão.",
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
                className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#2E4659] bg-white hover:bg-[#dce8f0] transition-colors duration-200"
              >
                Conhecer o método por trás desse resultado <Arrow />
              </Link>
            </div>

            {/* Disclaimer CVM — obrigatório */}
            <p className="mt-5 text-[0.72rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.45)" }}>
              Resultado da carteira própria da Midlej Capital no período de 31/07/2025
              a 10/07/2026 (12 meses): 23,06% de rentabilidade, equivalente a 166,90%
              do CDI no mesmo período. <strong style={{ color: "rgba(255,255,255,0.65)" }}>Rentabilidade passada não representa
              garantia de rentabilidade futura.</strong> Investimentos envolvem risco e
              podem resultar em perdas. Conteúdo de caráter informativo e educacional,
              que apenas demonstra o resultado da carteira própria da Midlej e não
              constitui indicação, recomendação ou oferta de compra ou venda de qualquer
              ativo. A Midlej Capital não realiza gestão de recursos de terceiros.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   04 — Como funciona o Raio-X (3 passos)
   ================================================================ */

function ComoFunciona() {
  const steps = [
    {
      n: "01",
      title: "Você apresenta seu contexto",
      body: "Em cerca de dois minutos, sem senha ou extrato bancário. Apenas a sua situação atual e o que deseja resolver — herança, capital parado, insatisfação com o banco ou a montagem da primeira carteira.",
    },
    {
      n: "02",
      title: "Fazemos o Raio-X",
      body: "Nossa equipe analisa o seu cenário e prepara uma leitura do que é adequado ao seu caso — o que ajustar, onde há custos excessivos e onde a exposição a risco não se justifica.",
    },
    {
      n: "03",
      title: "Você recebe as recomendações",
      body: "Em uma conversa gratuita e confidencial, sem qualquer pressão de venda. Você decide, com clareza, se e como deseja seguir com a Midlej — a custódia e a decisão permanecem sempre com você.",
    },
  ];
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="O Raio-X da Carteira" />
        <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[22ch] mb-4" style={{ color: "#2E4659" }}>
          Gratuito, em três passos.
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] max-w-[54ch] mb-12 md:mb-16" style={{ color: "#6B7B8D" }}>
          Uma segunda opinião independente antes de qualquer decisão de investimento.
        </p>
        <ol className="grid grid-cols-12 gap-8">
          {steps.map((s) => (
            <li key={s.n} className="col-span-12 md:col-span-4 bg-white rounded-2xl border border-[#EDEFF2] p-8 flex flex-col">
              <span className="text-[clamp(2rem,3vw,2.75rem)] font-light leading-none tabular-nums" style={{ color: "#4a6b8c" }}>
                {s.n}
              </span>
              <h3 className="mt-6 text-[1.25rem] font-bold leading-[1.2] tracking-tight" style={{ color: "#2E4659" }}>
                {s.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.6]" style={{ color: "#6B7B8D" }}>
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================
   05 — Por que confiar (autoridade)
   ================================================================ */

function PorQueConfiar() {
  const items = [
    { k: "Registro", v: "CVM", note: "Consultoria de valores mobiliários registrada e regulada." },
    { k: "Remuneração", v: "Só o cliente", note: "Fee pago por você. Zero rebate, zero comissão de produto." },
    { k: "Custódia", v: "Fica com você", note: "Seu dinheiro nunca passa por conta da Midlej. Acesso e ordem são seus." },
    { k: "Relação", v: "Contínua", note: "Acompanhamento plurianual, não venda pontual de um produto." },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="Por que confiar" />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-12 md:mb-16 max-w-[26ch]" style={{ color: "#2E4659" }}>
          Independência não é discurso. É o nosso modelo de remuneração.
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
   06 — Para quem (#para-quem p/ o header)
   ================================================================ */

function ParaQuem() {
  const profiles = [
    {
      tag: "Recebeu herança ou liquidez",
      body: "Um valor relevante ingressou de uma só vez — herança, venda de imóvel ou de uma empresa — e você não quer errar a primeira decisão de alocação.",
    },
    {
      tag: "Tem capital parado",
      body: "R$ 100 mil, R$ 500 mil ou mais na poupança, no CDB do banco ou em conta corrente, rendendo abaixo do potencial enquanto a decisão é adiada.",
    },
    {
      tag: "Insatisfeito com banco ou assessor",
      body: "Suspeita que paga taxas em excesso, que é direcionado a produtos e que não há ninguém zelando pelos seus interesses. Busca uma segunda opinião sem conflito.",
    },
    {
      tag: "Quer investir melhor",
      body: "Já investe por conta própria, mas deseja método, uma tese por trás de cada posição e um responsável pelas recomendações — não um algoritmo genérico.",
    },
  ];
  return (
    <section id="para-quem" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-8 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-9">
            <SectionTag label="Para quem é o Raio-X" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
              Se você tem recursos para investir e quer decidir sem pressão de venda, é para você.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          {profiles.map((p) => (
            <article key={p.tag} className="col-span-12 md:col-span-6 border-t border-[#EDEFF2] pt-8">
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
   07 — FAQ (objeções)
   ================================================================ */

function FAQSection() {
  const faqs = [
    {
      q: "O Raio-X é realmente gratuito?",
      a: "A primeira análise e a conversa são gratuitas e sem compromisso. Só há custo caso você decida contratar a consultoria em seguida — e o valor é conhecido e acordado antes de qualquer aceite.",
    },
    {
      q: "A Midlej passa a administrar o meu dinheiro?",
      a: "Não. A Midlej Capital é consultoria, não gestão de recursos. Recomendamos e acompanhamos, mas a conta, a custódia e as ordens de compra e venda permanecem sempre com você. Em nenhum momento operamos a sua conta.",
    },
    {
      q: "Preciso informar senha ou extrato bancário?",
      a: "Em nenhuma hipótese. Não solicitamos senha, token ou acesso à sua conta. Para pedir o Raio-X, você informa apenas o seu contexto e um contato para o nosso retorno.",
    },
    {
      q: "Tenho um valor menor para investir. Faz sentido?",
      a: "Não trabalhamos com um piso rígido. Avaliamos se a consultoria independente é adequada ao seu caso e, seja qual for o caminho, damos clareza sobre o que você estará investindo e os riscos envolvidos — para que a decisão seja sua, com informação.",
    },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 md:col-span-4">
            <SectionTag label="Dúvidas frequentes" />
            <h2 className="text-[clamp(1.625rem,3vw,2.5rem)] font-bold leading-[1.04] tracking-tight max-w-[16ch]" style={{ color: "#2E4659" }}>
              As dúvidas mais comuns antes da primeira conversa.
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
   08 — Closing (form + footer)
   ================================================================ */

const FOOTER_LINKS = [
  { label: "Investimentos", href: "/investimentos" },
  { label: "Consórcio", href: "/consorcio" },
  { label: "Seguros", href: "/seguro" },
  { label: "Sucessão", href: "/sucessao" },
  { label: "Câmbio", href: "/dolar" },
];

function Closing() {
  const year = new Date().getFullYear();
  return (
    <section id="contato" style={{ backgroundColor: "#4a6b8c" }} className="pt-24 md:pt-32 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* ── CTA + form ── */}
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start pb-20 md:pb-24">
          <div className="col-span-12 md:col-span-5">
            <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
              Raio-X gratuito da carteira
            </p>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white mb-6">
              Descubra onde investir antes de tomar qualquer decisão.
            </h2>
            <p className="text-[1.0625rem] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.80)" }}>
              Gratuito, confidencial e sem compromisso. Sem senha, sem extrato
              e sem oferta de produtos.
            </p>
            <p className="text-[0.9375rem] leading-relaxed max-w-[44ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
              Você responde a três perguntas rápidas, nossa equipe prepara a análise
              do seu caso e retorna pelo WhatsApp para agendar a conversa — on-line ou
              presencial em Brasília.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <RaioXForm />
          </div>
        </div>

        {/* ── Divisor ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }} className="mb-12 md:mb-14" />

        {/* ── Footer info ── */}
        <div className="grid grid-cols-12 gap-8 items-start mb-10">
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
              Consultoria de investimentos registrada na CVM. Sem conflito de interesse,
              sem produto da prateleira.
            </p>
          </div>

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
        <div className="border-t pt-6 flex flex-col gap-3 text-xs" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.38)" }}>
          <p className="max-w-[92ch] leading-[1.6]">
            A Midlej Consultoria de Valores Mobiliários LTDA é registrada na CVM e
            atua exclusivamente na modalidade fee based. Não realiza gestão de recursos
            de terceiros nem garante rentabilidade. Rentabilidade passada não representa
            garantia de rentabilidade futura. Investimentos envolvem riscos e podem
            resultar em perdas. Este site tem caráter informativo e não constitui oferta,
            recomendação individualizada ou solicitação de compra ou venda de ativos.
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <span>Midlej Consultoria de Valores Mobiliários LTDA · CNPJ 67.608.789/0001-39</span>
            <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
