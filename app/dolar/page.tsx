import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { HubHeader } from "../_hub/HubHeader";
import { HubLeadForm } from "../_hub/HubLeadForm";
import { SmoothAnchor } from "../_hub/SmoothAnchor";

export const metadata: Metadata = {
  title: "Investimento Internacional · Midlej Capital",
  description:
    "R$ 3.000 em 2011. No Brasil: R$ 11.700. Em dólar, no S&P 500: R$ 63.000. A diferença não é sorte — é onde o dinheiro estava.",
};

export default function DolarPage() {
  return (
    <main
      data-brand
      id="main"
      className="brand-body min-h-screen bg-paper text-ink"
    >
      <SmoothAnchor />
      <HubHeader />
      <Hero />
      <DoisCaminhos />
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
              Internacionalização · Midlej Capital
            </p>
            <h1 className="reveal r-1 t-display text-[clamp(2.4rem,6vw,5.25rem)] leading-[0.98] text-balance text-on-ink-strong max-w-[22ch]">
              R$ 3.000 em 2011.{" "}
              <span className="text-on-ink-soft">
                Dois caminhos. Uma diferença de mais de R$ 50 mil.
              </span>
            </h1>
            <p className="reveal r-2 mt-10 t-lede text-on-ink-soft text-[1.0625rem] md:text-[1.2rem] max-w-[58ch]">
              <span className="asterisk" />
              Veja quanto o mesmo dinheiro fez no Tesouro Selic — e quanto
              teria feito em dólar, no índice das maiores empresas do mundo. A
              diferença não é sorte — é onde o dinheiro estava.
            </p>
            <div className="reveal r-3 mt-12 flex flex-wrap items-center gap-6">
              <Link href="#simulacao" className="btn-primary-inverse">
                Ver a simulação completa
                <Arrow />
              </Link>
              <Link href="#contato" className="btn-ghost-inverse">
                Quero um plano de internacionalização
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

function DoisCaminhos() {
  const items = [
    {
      tag: "Tesouro Selic",
      stat: "3,9×",
      body: "O investimento mais seguro do Brasil rendeu bem — aproximadamente 3,9 vezes em 15 anos. Responsável, conservador, e ficou muito para trás.",
    },
    {
      tag: "S&P 500",
      stat: "7× em dólar",
      body: "O índice das 500 maiores empresas do mundo rendeu cerca de 7 vezes no mesmo período — sem contar ainda o efeito do câmbio.",
    },
    {
      tag: "O câmbio",
      stat: "R$ 1,70 → R$ 5,14",
      body: "Em 2011, um dólar custava R$ 1,70. Hoje passa de R$ 5,00. Quem tinha posição em dólar ganhou nos dois lados — no ativo e na moeda.",
    },
  ];

  return (
    <section data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-36">
        <Mark eyebrow="O mesmo ponto de partida" dark={false} />
        <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.04] text-ink max-w-[28ch]">
          Enquanto você rendia em real, o mundo rendia em dólar — e o dólar
          ainda subiu.
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
              <p className="mt-6 t-display-light text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[0.95] tabular-nums text-ink">
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
            Não é culpa de ninguém ter ficado 100% no Brasil. É o custo de
            nunca ter recebido a oferta certa.
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
            <Mark eyebrow="A simulação que muda a conversa" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,4vw,3.25rem)] leading-[1.05] text-ink max-w-[26ch]">
              O mesmo dinheiro. O mesmo período. Resultado completamente
              diferente.
            </h2>
            <p className="mt-6 t-body text-[0.95rem] leading-[1.65] text-ink-soft max-w-[52ch]">
              Premissas: aplicação em jan/2011; dólar ~R$ 1,70 em 2011 e
              ~R$ 5,14 hoje (jun/2026); Tesouro Selic acumulado ≈ 3,9×; S&P
              500 retorno total (com dividendos) ≈ 7× no período.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-line">
          {/* Caminho A */}
          <div className="border-b border-line py-12 md:py-16 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-2">
              <span className="t-mono text-[0.72rem] tracking-[0.16em] uppercase text-ink-mute">
                Caminho A
              </span>
            </div>
            <div className="col-span-12 md:col-span-6">
              <h3 className="t-display text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.1] text-ink">
                Ficou no Brasil
              </h3>
              <p className="mt-3 t-body text-[0.95rem] leading-[1.6] text-ink-soft max-w-[48ch]">
                R$ 3.000 no Tesouro Selic em janeiro de 2011. Rendeu ~3,9×
                em 15 anos. O investimento mais seguro que existe — ficou muito
                abaixo do que poderia ter sido.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end">
              <p className="t-display-light text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tabular-nums text-ink">
                ~R$ 11.700
              </p>
              <p className="mt-2 t-mono text-[0.72rem] tracking-[0.14em] uppercase text-ink-mute">
                resultado hoje
              </p>
            </div>
          </div>

          {/* Caminho B */}
          <div className="py-12 md:py-16 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-2">
              <span className="t-mono text-[0.72rem] tracking-[0.16em] uppercase text-emphasis">
                Caminho B
              </span>
            </div>
            <div className="col-span-12 md:col-span-6">
              <h3 className="t-display text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.1] text-ink">
                Virou dólar
              </h3>
              <p className="mt-3 t-body text-[0.95rem] leading-[1.6] text-ink-soft max-w-[48ch]">
                R$ 3.000 → US$ 1.765 em 2011 → S&P 500. Rendeu ~7× em dólar.
                Mais: o câmbio saiu de R$ 1,70 e chegou a R$ 5,14. Os dois
                efeitos somados na mesma posição.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end">
              <p className="t-display-light text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tabular-nums text-emphasis">
                ~R$ 63.000
              </p>
              <p className="mt-2 t-mono text-[0.72rem] tracking-[0.14em] uppercase text-emphasis">
                resultado hoje
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <p className="t-quote text-[clamp(1.25rem,2.4vw,1.875rem)] leading-[1.3] text-ink max-w-[52ch]">
            <span className="asterisk" />
            O mesmo dinheiro, no mesmo período. No Brasil: R$ 11,7 mil. Em
            dólar, no índice das maiores empresas do mundo: cerca de R$ 63 mil.
            A diferença não é sorte — é onde o dinheiro estava.
          </p>
        </div>

        <div className="mt-12">
          <Link href="#contato" className="btn-primary">
            Simular com meu patrimônio real
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
            <Mark eyebrow="A tese" dark />
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="t-display text-[clamp(1.875rem,4vw,3.25rem)] leading-[1.05] text-on-ink-strong max-w-[26ch]">
              Não é "tira tudo do Brasil".{" "}
              <span className="text-on-ink-soft">
                É internacionalizar a parte certa — com estrutura.
              </span>
            </h2>
            <p className="mt-12 t-body text-[1.0625rem] leading-[1.7] text-on-ink-soft max-w-[58ch]">
              Diversificar moeda não é aposta — é proteção. A Midlej Capital
              desenha a estrutura: conta, veículo e tributação pós-Lei 14.754,
              tudo alinhado ao seu plano financeiro — não ao nosso produto.
            </p>
            <p className="mt-6 t-body text-[1.0625rem] leading-[1.7] text-on-ink-soft max-w-[58ch]">
              Outros vendem a conta no exterior. Nós desenhamos o quanto, em
              que estrutura e com que liquidez — e acompanhamos.
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
      title: "Diagnóstico patrimonial",
      body: "Entendemos onde está seu patrimônio hoje, sua exposição ao risco-Brasil e qual parte faz sentido internacionalizar.",
    },
    {
      n: "II",
      title: "Estrutura sob medida",
      body: "Desenhamos o veículo, a conta e o efeito tributário — ETF, fundo no exterior, previdência internacional. Sem fórmula genérica.",
    },
    {
      n: "III",
      title: "Execução acompanhada",
      body: "Abertura de conta, operação e revisão periódica. Você investe com orientação, no seu nome, com custódia em corretora ou banco regulado.",
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
            Começar pelo diagnóstico
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
              Banca privada independente, com tese clara.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7">
            <p className="t-body text-[1.0625rem] leading-[1.7] text-ink-soft max-w-[58ch]">
              A Midlej Capital é consultoria de investimentos com registro na
              CVM. Trabalhamos remunerados pelo cliente — não recebemos rebate
              de fundo, seguradora ou estrutura. Quando recomendamos
              internacionalização, é tese, não comissão.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-x-6 md:gap-x-10 border-t border-line pt-8">
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Modelo
                </dt>
                <dd className="t-display-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.1] mt-2 text-ink">
                  Fee recorrente
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
                  Conflito
                </dt>
                <dd className="t-display-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.1] mt-2 text-ink">
                  Zero rebate
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
            <Mark eyebrow="Conversa gratuita" dark />
            <h2 className="mt-10 t-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.0] text-on-ink-strong max-w-[20ch]">
              Quero um plano de internacionalização.
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
              recomendação individualizada de investimento.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <HubLeadForm
              tone="dark"
              submitLabel="Quero um plano de internacionalização"
              origin="LP3 · Investimento Internacional"
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
