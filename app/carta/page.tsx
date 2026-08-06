import type { Metadata } from "next";
import { LPHeader } from "../_hub/LPHeader";
import { SmoothAnchor } from "../_hub/SmoothAnchor";
import { CartaForm } from "./CartaForm";

/* ─────────────────────────────────────────────────────────
   LP /carta — Carta Midlej (newsletter de mercado)
   Página CURTA, uma dobra, objetivo único: capturar a inscrição
   na leitura de mercado semanal da banca. Topo de funil — não é
   lead qualificado. Sistema de marca (Bricolage, ink/paper,
   .t-*, botão quadrado).
   ───────────────────────────────────────────────────────── */

const RAZAO_SOCIAL = "Midlej Consultoria de Valores Mobiliários LTDA";
const CNPJ = "67.608.789/0001-39";
const CVM_REGISTRO = "CVM nº 004770-8";

const title = "Carta Midlej — leitura de mercado semanal";
const description =
  "Assine a Carta Midlej e receba toda semana, no e-mail, a leitura de mercado da banca: contexto macro e o que a mesa de investimentos está acompanhando.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/carta" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/carta",
    locale: "pt_BR",
  },
  twitter: { card: "summary_large_image" },
};

const BULLETS = [
  {
    k: "Contexto macro",
    v: "O que moveu juros, câmbio e bolsa na semana e por que isso importa para quem já tem patrimônio.",
  },
  {
    k: "Leitura da banca",
    v: "A interpretação dos nossos analistas sobre os fatos, sem jargão e sem ruído de mercado.",
  },
  {
    k: "O que estamos acompanhando",
    v: "Os temas e riscos no radar da mesa para as próximas semanas, com clareza sobre o cenário.",
  },
];

export default function CartaPage() {
  const year = new Date().getFullYear();

  return (
    <main
      data-brand
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen"
    >
      <SmoothAnchor />
      <LPHeader ctaLabel="Assinar a Carta" ctaHref="#assinar" />

      {/* ── Hero + inscrição (uma dobra, superfície ink) ── */}
      <section
        id="assinar"
        data-tone="dark"
        className="min-h-screen flex items-center"
        style={{ backgroundColor: "#233853" }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

            {/* Copy */}
            <div className="col-span-full md:col-span-6">
              <p
                className="t-mono text-[0.72rem] tracking-[0.18em] uppercase mb-6"
                style={{ color: "#B89840" }}
              >
                Carta Midlej · Leitura de mercado semanal
              </p>

              <h1 className="t-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-on-ink-strong max-w-[16ch]">
                A leitura de mercado da banca, no seu e-mail toda semana.
              </h1>

              <p className="t-lede text-[1.0625rem] md:text-[1.2rem] leading-[1.55] mt-7 max-w-[46ch] text-on-ink-soft">
                Uma leitura curada do que aconteceu no mercado, o contexto macro
                por trás dos números e os temas que a nossa mesa de investimentos
                está acompanhando. Sem promessa de retorno, sem indicação de
                ativo. Clareza para decidir com critério.
              </p>

              <ul className="mt-10 flex flex-col">
                {BULLETS.map((b) => (
                  <li
                    key={b.k}
                    className="border-t border-line-on-ink py-5 first:border-t-0 first:pt-0"
                  >
                    <p className="t-mono text-[0.72rem] tracking-[0.14em] uppercase text-on-ink-mute mb-2">
                      {b.k}
                    </p>
                    <p className="t-body text-[0.9375rem] md:text-[1rem] leading-[1.55] text-on-ink-soft max-w-[52ch]">
                      {b.v}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="col-span-full md:col-span-5 md:col-start-8">
              <div
                className="border-t pt-8 md:pt-0 md:border-t-0"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <p className="t-mono text-[0.72rem] tracking-[0.14em] uppercase text-on-ink-mute mb-6">
                  Assine em 15 segundos
                </p>
                <CartaForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Rodapé institucional + disclaimer CVM ── */}
      <footer style={{ backgroundColor: "#1d3347" }} className="py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div
            className="flex flex-col gap-3 text-xs"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            <p className="max-w-[92ch] leading-[1.6]">
              A Midlej Consultoria de Valores Mobiliários LTDA é registrada na CVM
              e atua exclusivamente na modalidade fee based. Não realiza gestão de
              recursos de terceiros nem garante rentabilidade. Rentabilidade passada
              não representa garantia de rentabilidade futura. Investimentos envolvem
              riscos e podem resultar em perdas. A Carta Midlej tem caráter
              informativo e educacional e não constitui oferta, recomendação
              individualizada ou solicitação de compra ou venda de ativos.
            </p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <span>
                {RAZAO_SOCIAL} · CNPJ {CNPJ} · {CVM_REGISTRO}
              </span>
              <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.30)" }}>
              Responsável pela estratégia de investimentos: Allan Guilherme · CEA,
              Consultor CVM nº 4189-0. Contato:{" "}
              <a
                href="mailto:contato@midlejcapital.com.br"
                className="hover:text-white transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                contato@midlejcapital.com.br
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
