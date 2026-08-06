import type { Metadata } from "next";
import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { LucasWhatsappCta } from "./LucasWhatsappCta";

/**
 * Instrument Serif — serifada editorial usada só nesta rota. Injetada como
 * variável CSS (--font-lucas-serif) e aplicada apenas na subárvore .lucas-root;
 * não afeta a tipografia da marca (Bricolage) em nenhuma outra página.
 */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-lucas-serif",
  display: "swap",
});

const title =
  "Lucas Midlej — Advogado empresarial e fundador da MIDLEJ Capital";
const description =
  "Advocacia empresarial, recuperação de créditos e planejamento financeiro privado. Fale direto com Lucas Midlej pelo WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/lucas" },
  openGraph: {
    title,
    description,
    type: "profile",
    url: "/lucas",
    locale: "pt_BR",
    images: [
      {
        url: "/lucas-midlej.jpg",
        width: 1536,
        height: 1920,
        alt: "Lucas Coutinho Midlej — advogado e fundador da MIDLEJ Capital",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lucas Coutinho Midlej Rodrigues Coelho",
  jobTitle: "Advogado empresarial e fundador da MIDLEJ Capital",
  telephone: "+556196204646",
  email: "contato@midlej.com.br",
  knowsAbout: [
    "Direito empresarial",
    "Direito societário",
    "Recuperação de créditos",
    "Planejamento financeiro",
    "Special situations",
  ],
  worksFor: [
    { "@type": "Organization", name: "MIDLEJ Advogados", url: "https://midlej.com.br" },
    { "@type": "Organization", name: "MIDLEJ Capital", url: "https://midlejcapital.com.br" },
  ],
  sameAs: ["https://midlej.com.br", "https://midlejcapital.com.br"],
};

const stats = [
  { value: "R$ 120M+", label: "em patrimônio acompanhado" },
  { value: "85+", label: "famílias atendidas" },
  { value: "8 anos", label: "de experiência" },
  { value: "7 frentes", label: "de atuação financeira" },
];

const legal = [
  "Direito empresarial e consultoria preventiva",
  "Direito societário, M&A e governança",
  "Contratos: elaboração, revisão e negociação",
  "Recuperação de créditos judicial e extrajudicial",
  "Assessoria a FIDCs e fundos de investimento",
  "Special situations e ativos judiciais",
];

const financial = [
  "Investimentos privados com arquitetura por camadas",
  "Internacionais: offshore, trusts e veículos globais",
  "Câmbio assistido e remessas ao exterior",
  "Seguros com cobertura calibrada",
  "Alternativos: fundos exclusivos e crédito privado",
  "Previdência e workshops para executivos",
];

const audiences = [
  {
    title: "Empresários",
    text: "Que precisam de estrutura societária, contratos sólidos e cobrança que realmente recupera caixa.",
  },
  {
    title: "Investidores e famílias",
    text: "Que querem planejamento patrimonial de verdade, com diversificação global e sem conflito de interesse.",
  },
  {
    title: "Fundos e FIDCs",
    text: "Que buscam due diligence de carteiras, recuperação de ativos e atuação em special situations.",
  },
];

const steps = [
  {
    index: "01",
    title: "Conversa no WhatsApp",
    text: "Você me chama e me conta em poucas linhas o cenário. Falo direto, sem intermediário.",
  },
  {
    index: "02",
    title: "Diagnóstico",
    text: "Analiso o caso pelas duas lentes, jurídica e financeira, e aponto onde está o risco e a oportunidade.",
  },
  {
    index: "03",
    title: "Plano de ação",
    text: "Você recebe o caminho, os prazos e o custo antes de decidir qualquer coisa.",
  },
];

function Pillar({
  index,
  title,
  subtitle,
  items,
  href,
  linkLabel,
}: {
  index: string;
  title: string;
  subtitle: string;
  items: string[];
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="border-t border-accent/50 pt-8">
      <p className="font-serif text-sm text-accent">{index}</p>
      <h3 className="mt-3 font-serif text-2xl text-foreground md:text-3xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      <ul className="mt-7 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground"
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
            />
            {item}
          </li>
        ))}
      </ul>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-block text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-accent"
      >
        {linkLabel} →
      </a>
    </div>
  );
}

export default function LucasPage() {
  return (
    <main className={`lucas-root ${serif.variable} min-h-screen bg-background`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* HERO */}
      <header className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-16 md:py-24">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              Advocacia empresarial · Planejamento financeiro
            </p>
            <h1 className="mt-6 font-serif text-[2.3rem] leading-[1.1] tracking-tight text-foreground sm:text-[3.2rem] md:text-6xl">
              Lucas Coutinho <span className="italic text-accent">Midlej</span>{" "}
              Rodrigues Coelho
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Advogado empresarial e fundador da MIDLEJ Capital. Duas frentes que se
              conversam: a recuperação e a proteção jurídica do seu patrimônio, e o
              planejamento financeiro que faz esse patrimônio crescer.
            </p>

            <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
              <li>OAB/DF 61.351 — Sócio fundador da MIDLEJ Advogados</li>
              <li>
                Presidente da Comissão de Recuperação de Crédito e Execução Cível da
                OAB/DF
              </li>
              <li>
                Fundador da MIDLEJ Capital — special situations e ativos judiciais
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <LucasWhatsappCta source="hero">Falar direto comigo</LucasWhatsappCta>
              <a
                href="#dois-mundos"
                className="inline-flex items-center justify-center rounded-full border border-border px-7 py-4 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-secondary"
              >
                Como eu atuo
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 -top-3 hidden h-full w-full rounded-sm border border-accent/40 md:block" />
            <Image
              src="/lucas-midlej.jpg"
              alt="Retrato de Lucas Coutinho Midlej, advogado e fundador da MIDLEJ Capital"
              width={1536}
              height={1920}
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="relative aspect-[4/5] w-full rounded-sm object-cover object-top grayscale-[15%]"
            />
          </div>
        </div>
      </header>

      {/* STATS */}
      <section aria-label="Números" className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-6 py-12 md:grid-cols-4 md:py-16">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl text-foreground md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DOIS MUNDOS */}
      <section id="dois-mundos" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            Dois mundos, uma banca
          </p>
          <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-tight text-foreground md:text-5xl">
            O jurídico protege. O financeiro multiplica.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A maior parte dos problemas patrimoniais nasce na fronteira entre as duas
            áreas: um contrato mal amarrado, um crédito que não volta, uma estrutura
            societária que não conversa com o investimento. Eu atuo nas duas pontas, e
            é isso que muda o resultado.
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            <Pillar
              index="01"
              title="MIDLEJ Advogados"
              subtitle="Direito empresarial e recuperação de créditos"
              items={legal}
              href="https://midlej.com.br"
              linkLabel="midlej.com.br"
            />
            <Pillar
              index="02"
              title="MIDLEJ Capital"
              subtitle="Hub de soluções financeiras sem conflito de interesse"
              items={financial}
              href="https://midlejcapital.com.br"
              linkLabel="midlejcapital.com.br"
            />
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
            Para quem eu trabalho.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {audiences.map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-xl text-foreground">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO COMEÇA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
            Como começa.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.index} className="border-t border-border pt-6">
                <p className="font-serif text-sm text-accent">{step.index}</p>
                <h3 className="mt-3 font-serif text-xl text-foreground">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <LucasWhatsappCta source="como-comeca" variant="outline">
              Começar pelo WhatsApp
            </LucasWhatsappCta>
          </div>
        </div>
      </section>

      {/* SOBRE MIM */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              Sobre mim
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-foreground md:text-4xl">
              Jurídico e mercado financeiro na mesma cadeira.
            </h2>
          </div>
          <div className="space-y-5 text-[1.02rem] leading-relaxed text-muted-foreground">
            <p>
              Sou sócio fundador da MIDLEJ Advogados, com atuação sólida em Direito
              Empresarial e Recuperação de Crédito. Reúno conhecimento jurídico
              especializado e uma relação próxima com o mercado financeiro para
              assessorar empresas e investidores de forma estratégica: seja na
              recuperação de ativos, na estruturação societária ou na condução de
              operações complexas.
            </p>
            <p>
              Sou também Presidente da Comissão de Recuperação de Crédito e Execução
              Cível da OAB/DF e fundador da MIDLEJ Capital, especializada na aquisição
              e gestão de ativos judiciais, com atuação em special situations.
            </p>
            <p>
              Na Capital, o planejamento financeiro é privado e sem conflito de
              interesse: investimentos, câmbio, seguros, alternativos, previdência,
              estruturas internacionais e treinamentos em uma única banca — hoje mais
              de R$ 120 milhões em patrimônio acompanhado e 85 famílias atendidas.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <h2 className="font-serif text-3xl leading-tight md:text-5xl">
            Me chama no WhatsApp.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed opacity-75">
            A conversa começa comigo, sem intermediário. Se veio pelo Instagram, a
            mensagem já vem preenchida, é só apertar enviar.
          </p>
          <div className="mt-10 flex justify-center">
            <LucasWhatsappCta source="cta-final" variant="accent">
              Vim pela página do Lucas Midlej
            </LucasWhatsappCta>
          </div>
          <p className="mt-6 text-sm opacity-60">(61) 9620-4646</p>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-muted-foreground">
            <p className="font-serif text-base text-foreground">Lucas Coutinho Midlej</p>
            <nav className="flex flex-wrap gap-6">
              <a
                href="https://midlej.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                MIDLEJ Advogados
              </a>
              <a
                href="https://midlejcapital.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                MIDLEJ Capital
              </a>
              <a
                href="mailto:contato@midlej.com.br"
                className="transition-colors hover:text-accent"
              >
                contato@midlej.com.br
              </a>
            </nav>
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            OAB/DF 61.351. Este conteúdo é informativo e não constitui oferta,
            recomendação de investimento ou promessa de rentabilidade. Rentabilidade
            passada não garante resultados futuros.
          </p>
        </div>
      </footer>
    </main>
  );
}
