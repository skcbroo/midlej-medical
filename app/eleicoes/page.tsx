import type { Metadata } from "next";
import Image from "next/image";
import { Sora } from "next/font/google";

/**
 * /eleicoes — MIDLEJ Investimentos em ano eleitoral
 *
 * Página montada no Lovable pelo Lucas e portada para o Next sem alteração
 * de copy. Paleta própria isolada em `.eleicoes-root` no globals.css.
 * O ícone do CTA era do lucide-react; virou SVG inline para não adicionar
 * dependência ao projeto por causa de um único ícone.
 */

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const WHATSAPP_MESSAGE =
  "Olá, MIDLEJ Investimentos! Vi a página sobre o ano eleitoral e quero proteger e multiplicar meu patrimônio. Podem me chamar para uma conversa?";

const WHATSAPP = `https://wa.me/5561996204646?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const FONE = "(61) 99620-4646";

const TITLE = "Consultoria de Investimentos em Ano Eleitoral | MIDLEJ";
const DESCRIPTION =
  "Consultoria de investimentos autorizada pela CVM. Proteja e multiplique seu patrimônio na volatilidade do ano eleitoral. Fale agora com um consultor no WhatsApp.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/eleicoes" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    url: "https://midlejcapital.com.br/eleicoes",
    siteName: "MIDLEJ Investimentos",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const cycles = [
  { year: "2002", event: "Risco eleitoral levou o dólar de R$ 2,30 a R$ 3,95 em poucos meses." },
  { year: "2014", event: "A Bolsa oscilou violentamente a cada nova rodada de pesquisas." },
  { year: "2018", event: "Ativos brasileiros viveram semanas de euforia e pânico alternados." },
  { year: "2022", event: "Juro futuro e câmbio reagiram a cada declaração de campanha." },
];

const pillars = [
  {
    title: "Blindagem de patrimônio",
    text: "Estrutura de carteira preparada para choques de câmbio, juro e Bolsa antes que eles aconteçam.",
  },
  {
    title: "Dolarização inteligente",
    text: "Exposição internacional calibrada ao seu perfil, sem apostas e sem improviso.",
  },
  {
    title: "Consultoria isenta",
    text: "Somos consultoria autorizada pela CVM: recomendamos estratégia, não vendemos produto de terceiros.",
  },
  {
    title: "Leitura de cenário",
    text: "Acompanhamento do calendário eleitoral e das decisões que movem o mercado brasileiro.",
  },
];

const faqs = [
  {
    q: "Por que o ano eleitoral afeta meus investimentos?",
    a: "Pesquisas, declarações e mudanças de expectativa política movimentam câmbio, Bolsa e juro futuro. Carteiras sem estratégia ficam expostas a essa oscilação.",
  },
  {
    q: "A MIDLEJ Investimentos é autorizada pela CVM?",
    a: "Sim. A MIDLEJ é uma consultoria de investimentos autorizada pela CVM e atua de forma independente, sem comissão por produto.",
  },
  {
    q: "Como falo com um consultor?",
    a: `O atendimento é direto pelo WhatsApp ${FONE}, com uma conversa inicial para entender objetivos e nível de exposição da carteira.`,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      name: "MIDLEJ Investimentos",
      description: DESCRIPTION,
      areaServed: "BR",
      availableLanguage: "pt-BR",
      telephone: "+55-61-99620-4646",
      address: { "@type": "PostalAddress", addressCountry: "BR", addressRegion: "DF" },
      knowsAbout: [
        "consultoria de investimentos",
        "proteção patrimonial",
        "dolarização de carteira",
        "volatilidade eleitoral",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

function ChatIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
    </svg>
  );
}

function Cta({ label, block }: { label: string; block?: boolean }) {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta-gold inline-flex min-h-14 items-center justify-center gap-2 rounded-sm px-6 text-center text-[0.8rem] leading-tight font-bold uppercase tracking-[0.1em] transition-transform hover:-translate-y-0.5 sm:px-8 sm:text-sm ${
        block ? "w-full" : "w-full sm:w-auto"
      }`}
    >
      <ChatIcon />
      <span className="min-w-0">{label}</span>
    </a>
  );
}

export default function EleicoesPage() {
  return (
    <main className={`eleicoes-root ${sora.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-[88svh] overflow-hidden sm:min-h-[92vh]">
        <Image
          src="/eleicoes/hero-eleitoral.jpg"
          alt="Skyline financeiro ao anoitecer com multidão de bandeiras brasileiras ao fundo"
          width={1600}
          height={1104}
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[88svh] max-w-5xl flex-col justify-center px-5 py-20 sm:min-h-[92vh] sm:px-6 sm:py-24">
          <p className="animate-rise text-[0.6rem] font-bold uppercase tracking-[0.25em] text-gold sm:text-xs sm:tracking-[0.35em]">
            MIDLEJ Investimentos · Consultoria autorizada CVM
          </p>
          <h1 className="animate-rise mt-6 max-w-3xl text-[2rem] leading-[1.08] font-extrabold text-foreground sm:mt-8 sm:text-6xl sm:leading-[1.05]">
            Em ano eleitoral, o mercado vota todos os dias.
            <span className="text-gradient-gold"> E o seu patrimônio sente cada voto.</span>
          </h1>
          <p className="animate-rise mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg">
            Pesquisa nova, declaração de candidato, boato de bastidor. A cada notícia, o câmbio
            reage, a Bolsa oscila e o juro futuro se mexe. Quem não tem estratégia paga a conta da
            emoção alheia. Nós existimos para que isso não aconteça com você.
          </p>
          <div className="animate-rise mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center">
            <Cta label="Falar com um consultor no WhatsApp" />
            <span className="text-center text-sm text-muted-foreground sm:text-left">
              Atendimento direto · {FONE}
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="max-w-2xl text-2xl font-bold text-foreground sm:text-4xl">
            A história já mostrou o que a eleição faz com o dinheiro parado.
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-border sm:mt-14 sm:grid-cols-2">
            {cycles.map((c) => (
              <div key={c.year} className="surface-panel p-6 sm:p-8">
                <span className="font-display text-2xl font-extrabold text-gold sm:text-3xl">
                  {c.year}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4">
                  {c.event}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-base text-muted-foreground sm:mt-10">
            Nenhum desses ciclos avisou antes de começar. O que separou quem perdeu de quem
            multiplicou foi uma decisão tomada com antecedência, e com quem entende do assunto.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <Image
            src="/eleicoes/urna-mercado.jpg"
            alt="Urna dourada com gráfico de candles gravado em metal escuro"
            width={1200}
            height={912}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-sm border border-border object-cover"
          />
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-gold sm:text-xs sm:tracking-[0.3em]">
              Nosso trabalho
            </p>
            <h2 className="mt-4 text-2xl font-bold text-foreground sm:mt-6 sm:text-4xl">
              Proteger primeiro. Multiplicar depois.
            </h2>
            <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-8">
              {pillars.map((p) => (
                <div key={p.title} className="border-l-2 border-gold/60 pl-5 sm:pl-6">
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-4xl">Perguntas frequentes</h2>
          <dl className="mt-8 space-y-6 sm:mt-10 sm:space-y-8">
            {faqs.map((f) => (
              <div key={f.q} className="surface-panel rounded-sm p-5 sm:p-7">
                <dt className="text-base font-semibold text-foreground sm:text-lg">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
          <h2 className="text-[1.75rem] leading-tight font-extrabold text-foreground sm:text-5xl">
            Você não escolhe o resultado da eleição.
            <span className="text-gradient-gold"> Escolhe como chega nela.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:mt-8 sm:text-lg">
            Uma conversa de 20 minutos com um consultor MIDLEJ é suficiente para saber o quanto do
            seu patrimônio está exposto ao ruído político deste ano.
          </p>
          <div className="mx-auto mt-9 max-w-md sm:mt-12">
            <Cta label="Quero proteger meu patrimônio" block />
            <p className="mt-4 text-xs tracking-wide text-muted-foreground">
              Resposta no mesmo dia. Mensagem já pronta no WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border pt-12 pb-32 sm:pb-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 text-sm text-muted-foreground sm:px-6">
          <span className="font-display font-bold tracking-[0.2em] text-foreground">
            MIDLEJ INVESTIMENTOS
          </span>
          <span>Consultoria de valores mobiliários autorizada pela CVM · {FONE}</span>
          <span className="max-w-2xl text-xs leading-relaxed">
            Esta página tem caráter informativo e não constitui recomendação de investimento.
            Rentabilidade passada não representa garantia de resultados futuros. Toda recomendação é
            individual e feita após análise de perfil.
          </span>
        </div>
      </footer>

      {/* CTA fixo mobile */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/25 bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
        <Cta label="Falar no WhatsApp agora" block />
        <p className="mt-2 text-center text-[0.65rem] tracking-wide text-muted-foreground">
          Consultoria autorizada CVM · {FONE}
        </p>
      </div>
    </main>
  );
}
