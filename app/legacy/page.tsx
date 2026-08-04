import type { Metadata } from "next";
import Image from "next/image";
import { Cormorant_Garamond, Karla } from "next/font/google";

/**
 * /legacy — Midlej Legacy
 *
 * Página montada no Lovable pelo Lucas e portada para o Next sem alteração
 * de copy. O sistema visual (navy + dourado) é próprio desta rota e vive
 * isolado em `.legacy-root` no globals.css, para não vazar para o resto
 * do site, que é claro.
 */

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const WHATSAPP =
  "https://wa.me/5561996204646?text=Quero%20conhecer%20o%20Midlej%20Legacy%20para%20meu%20filho";

export const metadata: Metadata = {
  title: "Midlej Legacy | O patrimônio que seu filho recebe aos 18",
  description:
    "Midlej Legacy: plano de investimento de longo prazo para construir, até os 18 anos do seu filho, o capital de um imóvel, uma faculdade no exterior ou o primeiro negócio dele.",
  alternates: { canonical: "/legacy" },
  openGraph: {
    title: "Midlej Legacy | O futuro do seu filho começa hoje",
    description:
      "Cada ano de espera custa caro. Comece agora e entregue aos 18 anos do seu filho um patrimônio real, não uma promessa.",
    type: "website",
    locale: "pt_BR",
    url: "https://midlejcapital.com.br/legacy",
  },
  twitter: { card: "summary_large_image" },
};

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

// Projeção ilustrativa: aporte mensal com juros compostos de 0,8% a.m.
function projetar(mensal: number, anos: number, taxa = 0.008) {
  const n = anos * 12;
  return mensal * ((Math.pow(1 + taxa, n) - 1) / taxa);
}

const cenarios = [
  { idade: 0, anos: 18 },
  { idade: 5, anos: 13 },
  { idade: 10, anos: 8 },
];

const destinos = [
  {
    titulo: "O primeiro imóvel",
    texto:
      "Aos 18, seu filho assina a escritura do próprio apartamento, enquanto os colegas dele ainda discutem aluguel.",
  },
  {
    titulo: "Faculdade no exterior",
    texto:
      "Um diploma internacional pago à vista, sem dívida estudantil e sem depender de bolsa ou sorte.",
  },
  {
    titulo: "O capital do primeiro negócio",
    texto:
      "Ele começa a vida empreendendo com caixa, não pedindo empréstimo com juros de quem não tem histórico.",
  },
  {
    titulo: "Liberdade de escolher",
    texto:
      "O bem mais caro que existe: seu filho decidindo o caminho dele sem que o dinheiro decida por ele.",
  },
];

const passos = [
  {
    n: "01",
    t: "Diagnóstico do legado",
    d: "Definimos, em números, quanto seu filho precisa ter na mão aos 18 e quanto isso custa hoje por mês.",
  },
  {
    n: "02",
    t: "Carteira blindada",
    d: "Montamos uma carteira de longo prazo com proteção patrimonial, sucessória e revisões periódicas.",
  },
  {
    n: "03",
    t: "Entrega aos 18",
    d: "Acompanhamento anual e um relatório de legado para o dia em que o capital passa a ser dele.",
  },
];

export default function LegacyPage() {
  return (
    <main
      className={`legacy-root min-h-screen bg-background pb-24 text-foreground md:pb-0 ${cormorant.variable} ${karla.variable}`}
    >
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Image
          src="/legacy/hero-legacy.jpg"
          alt="Pai segurando as mãos do filho pequeno"
          width={1408}
          height={1008}
          priority
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30 md:opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_85%,transparent)_0%,color-mix(in_oklab,var(--background)_55%,transparent)_60%,var(--background)_100%)] md:bg-[linear-gradient(90deg,var(--background)_28%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,var(--background)_100%)]" />

        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 md:py-40">
          <p className="mb-5 text-[0.65rem] uppercase tracking-[0.3em] text-gold sm:text-xs sm:tracking-[0.35em]">
            Midlej Consultoria apresenta
          </p>
          <h1 className="max-w-3xl text-[2.25rem] leading-[1.08] sm:text-5xl md:text-7xl">
            Aos 18 anos, seu filho vai receber{" "}
            <span className="text-gradient-gold italic">um patrimônio</span> ou apenas os
            parabéns.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg md:text-xl">
            O <strong className="text-foreground">Midlej Legacy</strong> transforma um aporte
            mensal disciplinado no capital que dá ao seu filho o primeiro imóvel, a faculdade fora
            do país e o direito de escolher a própria vida.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={WHATSAPP}
              className="inline-flex w-full items-center justify-center rounded-full bg-[image:var(--gradient-gold)] px-8 py-4 text-center text-[0.8rem] font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-[1.03] sm:w-auto sm:px-9 sm:text-sm"
            >
              Quero o plano do meu filho
            </a>
            <span className="text-center text-xs text-muted-foreground sm:text-left sm:text-sm">
              Diagnóstico sem custo de entrada · vagas limitadas por mês
            </span>
          </div>
        </div>
      </section>

      {/* CUSTO DE OPORTUNIDADE */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
          <h2 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl">
            Não decidir <span className="text-gradient-gold italic">também é uma decisão</span>. E
            ela tem preço.
          </h2>
          <p className="mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">
            O mesmo aporte de {brl(1500)} por mês, começando em idades diferentes. O que muda não é
            o esforço, é o tempo. E o tempo é a única coisa que você não consegue comprar depois.
          </p>

          <div className="mt-10 grid gap-4 sm:gap-6 md:mt-14 md:grid-cols-3">
            {cenarios.map((c, i) => {
              const valor = projetar(1500, c.anos);
              const perda = projetar(1500, 18) - valor;
              return (
                <div
                  key={c.idade}
                  className={`rounded-2xl border p-6 shadow-[var(--shadow-lux)] sm:p-8 ${
                    i === 0 ? "border-gold/50 bg-card" : "border-border bg-background/60"
                  }`}
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs">
                    Começando aos {c.idade} anos
                  </p>
                  <p className="mt-4 font-display text-3xl text-gold sm:mt-6 sm:text-4xl">
                    {brl(valor)}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                    acumulados quando ele fizer 18
                  </p>
                  <div className="mt-5 border-t border-border pt-5 text-sm sm:mt-6 sm:pt-6">
                    {perda === 0 ? (
                      <span className="text-gold-soft">Cenário máximo possível</span>
                    ) : (
                      <span className="text-accent">{brl(perda)} a menos. Para sempre.</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-[0.7rem] leading-relaxed text-muted-foreground">
            Simulação ilustrativa a 0,8% ao mês. Rentabilidade passada não garante resultado
            futuro; sua carteira é montada conforme seu perfil.
          </p>
        </div>
      </section>

      {/* DESEJO */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <h2 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl">
          O que exatamente você está entregando a ele
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-14 md:grid-cols-2">
          {destinos.map((d) => (
            <div key={d.titulo} className="bg-card p-6 sm:p-10">
              <h3 className="text-xl text-gold-soft sm:text-2xl">{d.titulo}</h3>
              <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">{d.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CARTA EMOCIONAL */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 md:py-24">
          <p className="font-display text-2xl leading-snug sm:text-3xl md:text-4xl">
            &ldquo;Nenhum pai planeja falhar com o filho. A maioria só adia: um ano, depois outro.
            Aos 18 anos dele, o adiamento tem um valor exato, e é ele quem paga a conta.&rdquo;
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
            Midlej Consultoria
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl">Como o Legacy funciona</h2>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-10">
          {passos.map((s) => (
            <div key={s.n} className="border-l border-gold/25 pl-5 md:border-l-0 md:pl-0">
              <span className="font-display text-4xl text-gold/40 sm:text-5xl">{s.n}</span>
              <h3 className="mt-3 text-xl sm:mt-4 sm:text-2xl">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-[image:var(--gradient-deep)]" />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 md:py-28">
          <h2 className="text-3xl sm:text-4xl md:text-6xl">
            Ele só faz 18 anos <span className="text-gradient-gold italic">uma vez</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
            Cada mês sem começar é dinheiro que seu filho nunca vai ver. Fale com um consultor
            Midlej e receba hoje a projeção exata do legado dele.
          </p>
          <a
            href={WHATSAPP}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[image:var(--gradient-gold)] px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-[1.03] sm:w-auto sm:px-10 sm:text-sm"
          >
            Quero minha projeção
          </a>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-10 text-center text-[0.7rem] leading-relaxed text-muted-foreground sm:text-xs">
        Midlej Consultoria de Valores Mobiliários LTDA · CVM nº 004770-8 · Brasília, DF
        <br />
        Midlej Legacy — conteúdo informativo, não constitui recomendação individual de
        investimento.
      </footer>

      {/* CTA fixo mobile */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
        <a
          href={WHATSAPP}
          className="flex w-full items-center justify-center rounded-full bg-[image:var(--gradient-gold)] py-3.5 text-[0.8rem] font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)]"
        >
          Falar com um consultor
        </a>
      </div>
    </main>
  );
}
