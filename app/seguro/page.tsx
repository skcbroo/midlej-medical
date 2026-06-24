import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { HubHeader } from "../_hub/HubHeader";
import { HubLeadForm } from "../_hub/HubLeadForm";
import { SmoothAnchor } from "../_hub/SmoothAnchor";

export const metadata: Metadata = {
  title: "Seguro de Vida Inteligente · Midlej Capital",
  description:
    "Você está pagando por um seguro de vida — ou financiando o lucro de quem te vendeu? Com o mesmo dinheiro, o modelo certo entrega mais de 4× e a mesma proteção.",
};

export default function SeguroPage() {
  return (
    <main
      data-brand
      id="main"
      className="brand-body min-h-screen bg-paper text-ink"
    >
      <SmoothAnchor />
      <HubHeader />
      <Hero />
      <Agitacao />
      <SimulacaoPrincipal />
      <Solucao />
      <ComoFunciona />
      <Autoridade />
      <Contato />
      <Footer />
    </main>
  );
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path
        d="M1 5h12m0 0L9 1m4 4L9 9"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Mark({ eyebrow, dark }: { eyebrow: string; dark: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span
        aria-hidden
        className={`h-px ${dark ? "bg-[var(--color-line-on-ink)]" : "bg-[var(--color-line)]"}`}
        style={{ width: 48 }}
      />
      <p
        className={`t-mono text-[0.72rem] tracking-[0.18em] uppercase whitespace-nowrap ${
          dark ? "text-on-ink-mute" : "text-ink-mute"
        }`}
      >
        {eyebrow}
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-ink text-on-ink-strong"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-40 md:pt-48 pb-28 md:pb-36">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-9">
            <p className="reveal r-1 t-mono text-[0.72rem] tracking-[0.18em] uppercase text-on-ink-mute mb-6">
              Seguro de vida · Midlej Capital
            </p>
            <h1 className="reveal r-1 t-display text-[clamp(2.4rem,6vw,5.25rem)] leading-[0.98] text-balance text-on-ink-strong max-w-[22ch]">
              Você está pagando por um seguro de vida —{" "}
              <span className="text-on-ink-soft">
                ou financiando o lucro de quem te vendeu?
              </span>
            </h1>
            <p className="reveal r-2 mt-10 t-lede text-on-ink-soft text-[1.0625rem] md:text-[1.2rem] max-w-[58ch]">
              <span className="asterisk" />
              Descubra em 2 minutos quanto da sua mensalidade vira proteção e
              quanto vira custo. E quanto esse dinheiro renderia se trabalhasse
              pra você.
            </p>
            <div className="reveal r-3 mt-12 flex flex-wrap items-center gap-6">
              <Link href="#simulacao" className="btn-primary-inverse">
                Calcular meu seguro grátis
                <Arrow />
              </Link>
              <Link href="#contato" className="btn-ghost-inverse">
                Quero revisar com um consultor
              </Link>
            </div>
            <p className="reveal r-3 mt-6 t-mono text-[0.72rem] tracking-[0.14em] uppercase text-on-ink-mute">
              Leva 2 minutos · sem compromisso
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="mx-auto max-w-[1400px] border-t border-line-on-ink"
      />
    </section>
  );
}

function Agitacao() {
  const items = [
    {
      tag: "O nome técnico",
      stat: "Caro",
      body: "A maioria das apólices de vida 'que acumulam valor' embute um custo de seguro alto e um retorno de investimento baixo. Só não te contaram isso.",
    },
    {
      tag: "O que ninguém te ofereceu",
      stat: "A diferença",
      body: "Você pode alugar a proteção (seguro temporário, bem mais barato) e investir a diferença — no seu nome, com liquidez, rendendo pra você.",
    },
    {
      tag: "O resultado",
      stat: "4× a mais",
      body: "Com o mesmo dinheiro total, o modelo inteligente entrega mais de 4 vezes mais patrimônio — e a mesma proteção de R$ 1 milhão pra sua família.",
    },
  ];

  return (
    <section data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-36">
        <Mark eyebrow="O que ninguém te explicou" dark={false} />
        <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.04] text-ink max-w-[26ch]">
          Você foi vendido, não atendido.
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-12">
          {items.map((p) => (
            <article
              key={p.tag}
              className="col-span-12 md:col-span-4 border-t border-line pt-8 flex flex-col"
            >
              <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-emphasis">
                {p.tag}
              </p>
              <p className="mt-6 t-display-light text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[0.95] text-ink">
                {p.stat}
              </p>
              <p className="mt-6 t-body text-[1rem] leading-[1.65] text-ink-soft max-w-[40ch]">
                {p.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-20 md:mt-24 border-t border-line pt-10">
          <p className="t-quote text-[clamp(1.375rem,2.8vw,2.25rem)] leading-[1.2] text-ink max-w-[44ch]">
            <span className="asterisk" />
            O problema não é o seguro de vida. É o modelo de seguro que te
            venderam.
          </p>
        </div>
      </div>
    </section>
  );
}

function SimulacaoPrincipal() {
  return (
    <section id="simulacao" data-tone="light" className="bg-bone">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-9">
            <Mark eyebrow="A conta que mudou tudo" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,4vw,3.25rem)] leading-[1.05] text-ink max-w-[26ch]">
              Mesma proteção de R$ 1 milhão. Resultado completamente diferente.
            </h2>
            <p className="mt-6 t-body text-[0.95rem] leading-[1.65] text-ink-soft max-w-[52ch]">
              Premissas: homem, 35 anos, cobertura de R$ 1 milhão, horizonte
              de 30 anos, rendimento de investimento ≈ 10% a.a.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-line">
          {/* Modelo comprar */}
          <div className="border-b border-line py-12 md:py-16 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-2">
              <span className="t-mono text-[0.72rem] tracking-[0.16em] uppercase text-ink-mute">
                Modelo atual
              </span>
            </div>
            <div className="col-span-12 md:col-span-6">
              <h3 className="t-display text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.1] text-ink">
                Seguro vitalício ("comprar")
              </h3>
              <p className="mt-3 t-body text-[0.95rem] leading-[1.6] text-ink-soft max-w-[48ch]">
                ~R$ 1.000 por mês. Em 30 anos: ~R$ 360 mil pagos. O resgate
                fica preso na apólice, rendendo pouco — e você paga comissão
                embutida no produto até o fim.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end">
              <p className="t-display-light text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tabular-nums text-ink">
                ~R$ 360 mil
              </p>
              <p className="mt-2 t-mono text-[0.72rem] tracking-[0.14em] uppercase text-ink-mute">
                pagos · resgate baixo
              </p>
            </div>
          </div>

          {/* Modelo alugar */}
          <div className="py-12 md:py-16 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-2">
              <span className="t-mono text-[0.72rem] tracking-[0.16em] uppercase text-emphasis">
                Modelo inteligente
              </span>
            </div>
            <div className="col-span-12 md:col-span-6">
              <h3 className="t-display text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.1] text-ink">
                Temporário + investir a diferença ("alugar")
              </h3>
              <p className="mt-3 t-body text-[0.95rem] leading-[1.6] text-ink-soft max-w-[48ch]">
                ~R$ 200 por mês de seguro temporário. ~R$ 800 por mês
                investidos no seu nome, com liquidez. Em 30 anos, os R$ 800
                mensais a 10% a.a. acumulam mais de R$ 1,6 milhão — seu,
                líquido.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end">
              <p className="t-display-light text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tabular-nums text-emphasis">
                ~R$ 1,6 milhão
              </p>
              <p className="mt-2 t-mono text-[0.72rem] tracking-[0.14em] uppercase text-emphasis">
                patrimônio seu · liquidez
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <p className="t-quote text-[clamp(1.25rem,2.4vw,1.875rem)] leading-[1.3] text-ink max-w-[52ch]">
            <span className="asterisk" />
            Com o mesmo dinheiro, em vez de R$ 360 mil presos numa apólice,
            você teria mais de R$ 1,6 milhão — seu, líquido — e a mesma
            proteção de R$ 1 milhão pra sua família. Mais de 4 vezes.
          </p>
        </div>

        <div className="mt-12">
          <Link href="#contato" className="btn-primary">
            Calcular com meu caso real
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Solucao() {
  return (
    <section data-tone="dark" className="bg-ink text-on-ink-strong">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <Mark eyebrow="Nossa abordagem" dark />
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="t-display text-[clamp(1.875rem,4vw,3.25rem)] leading-[1.05] text-on-ink-strong max-w-[24ch]">
              Alugar a proteção.{" "}
              <span className="text-on-ink-soft">Ser dono do patrimônio.</span>
            </h2>
            <p className="mt-12 t-body text-[1.0625rem] leading-[1.7] text-on-ink-soft max-w-[58ch]">
              A Midlej não vende uma apólice. Desenha a estrutura: proteção
              certa no momento certo — seguro temporário com cobertura real —
              mais investimento da diferença, alinhado ao seu plano de vida.
            </p>
            <p className="mt-6 t-body text-[1.0625rem] leading-[1.7] text-on-ink-soft max-w-[58ch]">
              Trabalhamos remunerados por fee fixo, sem comissão de seguradora.
              Quando recomendamos um produto, é pelo seu plano — não pelo nosso
              rebate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const steps = [
    {
      n: "I",
      title: "Diagnóstico da apólice atual",
      body: "Analisamos o que você paga hoje: cobertura real, custo embutido, resgate projetado. Você entende, pela primeira vez, o que tem.",
    },
    {
      n: "II",
      title: "Plano estruturado",
      body: "Desenhamos a proteção certa (temporária, no valor adequado) + o investimento da diferença. Cobertura que cobre de verdade, investimento que rende pra você.",
    },
    {
      n: "III",
      title: "Acompanhamento vivo",
      body: "Revisão anual — porque sua vida muda, sua necessidade de cobertura muda, e o investimento precisa acompanhar o ritmo certo.",
    },
  ];

  return (
    <section data-tone="light" className="bg-bone">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-9">
            <Mark eyebrow="Como funciona" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.05] text-ink max-w-[22ch]">
              Três passos. Um responsável por cada um deles.
            </h2>
          </div>
        </div>
        <ol className="border-t border-line">
          {steps.map((s) => (
            <li
              key={s.n}
              className="border-b border-line py-12 md:py-14 grid grid-cols-12 gap-6 items-baseline"
            >
              <div className="col-span-12 md:col-span-2">
                <span className="t-display-light text-[clamp(1.875rem,3vw,2.5rem)] leading-none text-emphasis tabular-nums">
                  {s.n}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3 className="t-display text-[clamp(1.25rem,1.8vw,1.625rem)] leading-[1.15] text-ink">
                  {s.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="t-body text-[0.95rem] leading-[1.6] text-ink-soft max-w-[52ch]">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Link href="#contato" className="btn-primary">
            Começar pelo diagnóstico gratuito
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Autoridade() {
  return (
    <section data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-5">
            <Mark eyebrow="Midlej Capital" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.05] text-ink max-w-[20ch]">
              Consultoria independente, sem conflito de produto.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7">
            <p className="t-body text-[1.0625rem] leading-[1.7] text-ink-soft max-w-[58ch]">
              A Midlej Capital é consultoria de investimentos com registro na
              CVM. Não recebemos comissão de seguradora, corretora ou
              distribuidora. Quando desenhamos uma estrutura de seguro, é o seu
              plano que orienta — não o produto com maior rebate para quem
              vende.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-x-6 md:gap-x-10 border-t border-line pt-8">
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Modelo
                </dt>
                <dd className="t-display-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.1] mt-2 text-ink">
                  Fee fixo
                </dd>
              </div>
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Registro
                </dt>
                <dd className="t-display-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.1] mt-2 text-ink">
                  CVM
                </dd>
              </div>
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Rebate
                </dt>
                <dd className="t-display-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.1] mt-2 text-ink">
                  Zero
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contato() {
  return (
    <section id="contato" data-tone="dark" className="bg-ink text-on-ink-strong">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-6">
            <Mark eyebrow="Revisão gratuita" dark />
            <h2 className="mt-10 t-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.0] text-on-ink-strong max-w-[20ch]">
              Quero revisar meu seguro com um consultor.
            </h2>
            <p className="mt-10 t-lede text-on-ink-soft text-[1.1rem] max-w-[44ch]">
              Preencha em 2 minutos. Retornamos pelo WhatsApp com uma análise
              do seu caso — sem material comercial, sem gravação.
            </p>
            <p className="mt-8 t-body text-[0.85rem] leading-[1.55] text-on-ink-mute max-w-[48ch]">
              <span className="asterisk" />
              Simulações ilustrativas baseadas em dados históricos;
              rentabilidade passada não representa garantia de rentabilidade
              futura. Esta página tem caráter educativo e não constitui
              recomendação individualizada de investimento ou de seguro.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <HubLeadForm
              tone="dark"
              submitLabel="Quero revisar meu seguro com um consultor"
              origin="LP1 · Seguro de Vida"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-tone="dark"
      className="bg-ink text-on-ink-soft border-t border-line-on-ink"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4">
            <Logo tone="dark" subText="CAPITAL" className="h-12 w-auto" />
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="t-quote text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.4] text-on-ink-strong max-w-[40ch]">
              Midlej Capital. Banca privada de planejamento financeiro,
              conduzida em Brasília, atende em todo o Brasil.
            </p>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-line-on-ink flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[0.78rem] tracking-[0.04em] text-on-ink-mute">
          <span>Midlej Capital · CNPJ 35.340.252/0001-44</span>
          <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
