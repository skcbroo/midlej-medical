import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { HubHeader } from "../_hub/HubHeader";
import { HubLeadForm } from "../_hub/HubLeadForm";
import { SmoothAnchor } from "../_hub/SmoothAnchor";

export const metadata: Metadata = {
  title: "Sucessão e Holding Familiar · Midlej Capital",
  description:
    "Quanto sua família perde no inventário? ITCMD, cartório, honorários e anos de processo podem consumir 20% do patrimônio que você construiu. A holding familiar resolve isso.",
};

export default function SucessaoPage() {
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
              Sucessão patrimonial · Midlej Capital
            </p>
            <h1 className="reveal r-1 t-display text-[clamp(2.4rem,6vw,5.25rem)] leading-[0.98] text-balance text-on-ink-strong max-w-[22ch]">
              Quanto sua família vai perder no inventário?
            </h1>
            <p className="reveal r-2 mt-10 t-lede text-on-ink-soft text-[1.0625rem] md:text-[1.2rem] max-w-[58ch]">
              <span className="asterisk" />
              Você construiu. O inventário pode desfazer em meses — ITCMD,
              cartório, honorários e anos de processo consumindo o patrimônio
              que levou décadas para formar.
            </p>
            <div className="reveal r-3 mt-12 flex flex-wrap items-center gap-6">
              <Link href="#simulacao" className="btn-primary-inverse">
                Ver o custo do inventário
                <Arrow />
              </Link>
              <Link href="#contato" className="btn-ghost-inverse">
                Quero estruturar minha sucessão
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
      tag: "ITCMD",
      stat: "Até 8%",
      body: "O imposto sobre herança varia de estado para estado — hoje entre 2% e 8%, com projetos para elevar o teto. Sobre R$ 2 milhões, isso é até R$ 160 mil em impostos.",
    },
    {
      tag: "Processo",
      stat: "3 a 7 anos",
      body: "O inventário judicial pode levar anos. Enquanto isso, os bens ficam bloqueados — sem vender, sem realocar, sem usar. A família fica travada.",
    },
    {
      tag: "Custo total",
      stat: "Até 20%",
      body: "Somando ITCMD, custas cartorárias e honorários advocatícios, o inventário pode consumir até 20% do patrimônio que você passou décadas construindo.",
    },
  ];

  return (
    <section data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-36">
        <Mark eyebrow="O custo que ninguém planeja" dark={false} />
        <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.04] text-ink max-w-[28ch]">
          O inventário não é um problema da morte. É um problema de hoje,
          que você pode resolver agora.
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
            Quem não planeja a sucessão não deixa herança — deixa processo.
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
            <Mark eyebrow="O mesmo patrimônio. Dois destinos." dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,4vw,3.25rem)] leading-[1.05] text-ink max-w-[26ch]">
              O que acontece com R$ 2 milhões de patrimônio em cada cenário.
            </h2>
            <p className="mt-6 t-body text-[0.95rem] leading-[1.65] text-ink-soft max-w-[52ch]">
              Premissas ilustrativas: patrimônio de R$ 2 milhões (imóvel +
              investimentos), estado com alíquota ITCMD de 8%, honorários
              médios de 6% e custas cartorárias de 2%.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-line">
          {/* Cenário inventário */}
          <div className="border-b border-line py-12 md:py-16 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-2">
              <span className="t-mono text-[0.72rem] tracking-[0.16em] uppercase text-ink-mute">
                Sem planejamento
              </span>
            </div>
            <div className="col-span-12 md:col-span-6">
              <h3 className="t-display text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.1] text-ink">
                Inventário tradicional
              </h3>
              <p className="mt-3 t-body text-[0.95rem] leading-[1.6] text-ink-soft max-w-[48ch]">
                ITCMD: ~R$ 160 mil · Honorários advocatícios: ~R$ 120 mil ·
                Custas cartorárias: ~R$ 40 mil. Total perdido: ~R$ 320 mil.
                Prazo: 3 a 7 anos com bens bloqueados.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end">
              <p className="t-display-light text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tabular-nums text-ink">
                −R$ 320 mil
              </p>
              <p className="mt-2 t-mono text-[0.72rem] tracking-[0.14em] uppercase text-ink-mute">
                perdidos em processo
              </p>
            </div>
          </div>

          {/* Cenário holding */}
          <div className="py-12 md:py-16 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-2">
              <span className="t-mono text-[0.72rem] tracking-[0.16em] uppercase text-emphasis">
                Com planejamento
              </span>
            </div>
            <div className="col-span-12 md:col-span-6">
              <h3 className="t-display text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.1] text-ink">
                Holding familiar estruturada
              </h3>
              <p className="mt-3 t-body text-[0.95rem] leading-[1.6] text-ink-soft max-w-[48ch]">
                Constituição da holding: ~R$ 15–30 mil. Transmissão de cotas
                em vida, com redução de base de cálculo e otimização tributária.
                Processo de sucessão planejado: meses, não anos.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end">
              <p className="t-display-light text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tabular-nums text-emphasis">
                ~R$ 290 mil
              </p>
              <p className="mt-2 t-mono text-[0.72rem] tracking-[0.14em] uppercase text-emphasis">
                preservados pela família
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <p className="t-quote text-[clamp(1.25rem,2.4vw,1.875rem)] leading-[1.3] text-ink max-w-[52ch]">
            <span className="asterisk" />
            O mesmo patrimônio. Sem planejamento: a família recebe R$ 1,68
            milhão após anos de processo. Com a estrutura certa: R$ 1,97 milhão
            em meses — e você ainda vê isso acontecer em vida.
          </p>
        </div>

        <div className="mt-12">
          <Link href="#contato" className="btn-primary">
            Calcular o custo do inventário no meu caso
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
            <h2 className="t-display text-[clamp(1.875rem,4vw,3.25rem)] leading-[1.05] text-on-ink-strong max-w-[26ch]">
              Constituir em vida o que o inventário dissolve depois da morte.
            </h2>
            <p className="mt-12 t-body text-[1.0625rem] leading-[1.7] text-on-ink-soft max-w-[58ch]">
              A holding familiar não é só planejamento tributário. É um
              instrumento de governança, proteção e transmissão controlada —
              você define as regras em vida, para que a família as execute em
              ordem.
            </p>
            <p className="mt-6 t-body text-[1.0625rem] leading-[1.7] text-on-ink-soft max-w-[58ch]">
              A MIDLEJ Advogados estrutura o instrumento jurídico. A Midlej
              Capital alinha a holding ao plano financeiro. Sem dois escritórios
              separados sem integração — tudo sob o mesmo teto.
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
      title: "Mapeamento patrimonial",
      body: "Entendemos a composição do patrimônio, a estrutura familiar e os objetivos de sucessão. Calculamos o custo do inventário sem planejamento.",
    },
    {
      n: "II",
      title: "Estrutura sob medida",
      body: "Desenhamos a holding familiar — tipo societário, quotas, regras de governança e otimização tributária — alinhada ao seu plano e à sua família.",
    },
    {
      n: "III",
      title: "Constituição e acompanhamento",
      body: "A MIDLEJ Advogados executa a constituição. A Midlej Capital integra a holding ao planejamento financeiro e revisamos periodicamente.",
    },
  ];

  return (
    <section data-tone="light" className="bg-bone">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-9">
            <Mark eyebrow="Como funciona" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.05] text-ink max-w-[22ch]">
              Três passos. Um time responsável por cada um deles.
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
            Começar pelo mapeamento gratuito
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
            <Mark eyebrow="O diferencial do grupo" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.05] text-ink max-w-[20ch]">
              Financeiro e jurídico integrados — não terceirizados.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7">
            <p className="t-body text-[1.0625rem] leading-[1.7] text-ink-soft max-w-[58ch]">
              A maioria dos planejamentos de sucessão falha na integração:
              o advogado constitui a holding, o gerente de banco tenta encaixar
              os investimentos, e ninguém fala a mesma língua. Na Midlej,
              a consultoria financeira (CVM) e o braço jurídico (OAB) estão
              sob o mesmo teto — e trabalham o mesmo plano.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-x-6 md:gap-x-10 border-t border-line pt-8">
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Financeiro
                </dt>
                <dd className="t-display-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.1] mt-2 text-ink">
                  CVM
                </dd>
              </div>
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Jurídico
                </dt>
                <dd className="t-display-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.1] mt-2 text-ink">
                  OAB
                </dd>
              </div>
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Integração
                </dt>
                <dd className="t-display-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.1] mt-2 text-ink">
                  Um plano
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
            <Mark eyebrow="Mapeamento gratuito" dark />
            <h2 className="mt-10 t-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.0] text-on-ink-strong max-w-[20ch]">
              Quero estruturar a sucessão do meu patrimônio.
            </h2>
            <p className="mt-10 t-lede text-on-ink-soft text-[1.1rem] max-w-[44ch]">
              Preencha em 2 minutos. Retornamos pelo WhatsApp com uma análise
              do seu caso — sem material comercial, sem gravação.
            </p>
            <p className="mt-8 t-body text-[0.85rem] leading-[1.55] text-on-ink-mute max-w-[48ch]">
              <span className="asterisk" />
              Simulações ilustrativas baseadas em premissas genéricas; o custo
              real varia por patrimônio, estado e estrutura familiar. Esta página
              tem caráter educativo e não constitui recomendação individualizada
              de investimento ou assessoria jurídica.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <HubLeadForm
              tone="dark"
              submitLabel="Quero estruturar minha sucessão"
              origin="LP4 · Sucessão e Holding"
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
