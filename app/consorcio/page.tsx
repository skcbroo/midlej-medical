import type { Metadata } from "next";
import Image from "next/image";
import { LPHeader } from "@/app/_hub/LPHeader";
import { LPClosing } from "@/app/_hub/LPClosing";
import { SmoothAnchor } from "@/app/_hub/SmoothAnchor";
import { StickyCTA } from "@/app/components/StickyCTA";
import { CONSORCIO_WHATSAPP_HREF } from "@/lib/leadConstants";

export const metadata: Metadata = {
  title: "Consórcio: construa patrimônio real sem juros · Midlej Capital",
  description:
    "Transforme disciplina em patrimônio real. Conquiste imóveis e ativos reais sem juros, com estratégia de consórcio dentro de um plano patrimonial.",
};

const WA_CTA_LABEL = "Quero alavancar meu patrimônio";

const DISCLAIMER =
  "Consórcio é regido pela Lei 11.795/2008 e administrado por instituições autorizadas e fiscalizadas pelo Banco Central. A contemplação ocorre por sorteio ou lance e não tem prazo garantido. Esta página tem caráter educativo e não constitui oferta, recomendação individualizada ou promessa de rentabilidade. Consórcio não é aplicação financeira com retorno garantido.";

function SectionTag({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-3" style={{ color: dark ? "rgba(255,255,255,0.50)" : "#4a6b8c" }}>
      {label}
    </p>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WaGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.559 4.14 1.532 5.875L0 24l6.27-1.504A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.014-1.382l-.36-.213-3.72.892.924-3.617-.234-.37A9.804 9.804 0 012.182 12c0-5.413 4.405-9.818 9.818-9.818S21.818 6.587 21.818 12 17.413 21.818 12 21.818z" />
    </svg>
  );
}

/** CTA primário de WhatsApp da LP /consorcio (teste: somente WhatsApp). */
function WhatsAppCTA({ size = "lg", className = "" }: { size?: "lg" | "md"; className?: string }) {
  const pad =
    size === "lg"
      ? "px-8 py-4 text-[1.0625rem] min-h-[52px]"
      : "px-6 py-3 text-sm min-h-[48px]";
  return (
    <a
      href={CONSORCIO_WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={WA_CTA_LABEL}
      className={`inline-flex items-center justify-center gap-2.5 rounded-lg font-semibold text-white shadow-md transition-all duration-200 hover:brightness-95 active:scale-[0.99] ${pad} ${className}`}
      style={{ backgroundColor: "#25D366" }}
    >
      <WaGlyph />
      {WA_CTA_LABEL}
    </a>
  );
}

export default function ConsorcioPage() {
  return (
    <main
      id="main"
      className="bg-white text-[#2E4659]"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
    >
      <LPHeader ctaLabel={WA_CTA_LABEL} ctaHref={CONSORCIO_WHATSAPP_HREF} ctaExternal />
      <SmoothAnchor />

      {/* ── Hero — aspiracional ── */}
      <section id="top" className="relative min-h-screen flex items-center">
        <Image
          src="/fotos_escritorio/2.jpeg"
          alt="Escritório Midlej Capital"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,70,89,0.66)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-40 md:py-56 w-full">
          <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            Consórcio · Patrimônio real, sem juros
          </p>
          <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.04] tracking-tight text-white mb-8 max-w-[18ch]">
            Transforme disciplina em patrimônio real.
          </h1>
          <p className="text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-relaxed mb-6 max-w-[44ch]" style={{ color: "rgba(255,255,255,0.82)" }}>
            Consórcio é a ponte, sem juros, entre o que você guarda hoje e os imóveis e ativos reais que você quer conquistar amanhã.
          </p>
          <p className="text-[clamp(0.95rem,1.4vw,1.0625rem)] leading-relaxed mb-14 max-w-[42ch]" style={{ color: "rgba(255,255,255,0.62)" }}>
            Com método e estratégia — não no improviso, e sem entregar parte do seu patrimônio em juros.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <WhatsAppCTA size="lg" />
            <a
              href="#passo-a-passo"
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-lg text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-200"
            >
              Como funciona <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── O que é — reframe emocional ── */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="col-span-full md:col-span-5">
              <SectionTag label="O que é, de verdade" />
              <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[16ch]" style={{ color: "#2E4659" }}>
                Não é compra parcelada. É um plano de conquista.
              </h2>
            </div>
            <div className="col-span-full md:col-span-7">
              <p className="text-[1.125rem] leading-[1.65] mb-6 max-w-[52ch]" style={{ color: "#4a6b8c" }}>
                Imagine ter, no momento certo, o valor à vista para comprar o imóvel ou o ativo real que você quer — sem ter pago um centavo de juros para chegar lá.
              </p>
              <p className="text-[1.0625rem] leading-[1.65] mb-6 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
                É isso que o consórcio faz quando bem usado: reúne pessoas com o mesmo objetivo, que se autofinanciam com disciplina e transformam aporte mensal em poder de compra. Ao ser contemplado, a carta de crédito vale como pagamento à vista.
              </p>
              <p className="text-[1.0625rem] leading-[1.65] max-w-[52ch]" style={{ color: "#6B7B8D" }}>
                Cada real que você coloca trabalha pelo seu patrimônio — não pelo lucro de um banco.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Passo a passo — jornada ── */}
      <section id="passo-a-passo" style={{ backgroundColor: "#F5F7FA" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <SectionTag label="Passo a passo" />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight mb-6 max-w-[22ch]" style={{ color: "#2E4659" }}>
            Do objetivo à carta na mão — quatro passos.
          </h2>
          <p className="text-[1.0625rem] leading-relaxed mb-16 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
            Uma jornada clara, conduzida ao seu lado, do primeiro plano até a hora de conquistar o ativo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                n: "01",
                title: "Defina o que quer conquistar",
                body: "Imóvel, terreno, expansão ou outro ativo real. Começamos pelo seu objetivo — e pelo seu fluxo de caixa.",
              },
              {
                n: "02",
                title: "Monte sua estratégia de cartas",
                body: "Valor, prazo, quantidade de cartas e uma política de lance, calibrados à velocidade que você precisa.",
              },
              {
                n: "03",
                title: "Seja contemplado",
                body: "Por sorteio ou lance, a carta de crédito vira poder de compra à vista nas suas mãos.",
              },
              {
                n: "04",
                title: "Conquiste e construa",
                body: "Use a carta para realizar a aquisição e seguir construindo patrimônio, dentro do seu plano.",
              },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl bg-white border border-[#EDEFF2] p-7 shadow-sm flex flex-col gap-4">
                <span className="text-[clamp(1.75rem,3vw,2.25rem)] font-light leading-none tabular-nums" style={{ color: "#4a6b8c" }}>
                  {s.n}
                </span>
                <h3 className="text-[1.0625rem] font-bold leading-snug" style={{ color: "#2E4659" }}>{s.title}</h3>
                <p className="text-[0.9375rem] leading-[1.6]" style={{ color: "#6B7B8D" }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <WhatsAppCTA size="lg" />
          </div>
        </div>
      </section>

      {/* ── O custo invisível dos juros — dor emocional ── */}
      <section style={{ backgroundColor: "#4a6b8c" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="col-span-full md:col-span-7">
              <SectionTag label="O custo invisível" dark />
              <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight text-white mb-6 max-w-[22ch]">
                No financiamento, parte do seu sonho vira juros.
              </h2>
              <p className="text-[1.0625rem] leading-[1.65] mb-6 max-w-[52ch]" style={{ color: "rgba(255,255,255,0.78)" }}>
                Mês após mês, uma fatia de cada parcela não constrói o seu patrimônio — paga o lucro do banco. No fim do contrato, você pode ter desembolsado muito mais do que o bem vale.
              </p>
              <p className="text-[1.0625rem] leading-[1.65] max-w-[52ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
                O consórcio inverte essa lógica: sem juros, com uma taxa de administração definida e transparente, o seu esforço fica concentrado onde importa — em virar patrimônio seu.
              </p>
            </div>
            <div className="col-span-full md:col-span-4 md:col-start-9">
              <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
                <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                  A pergunta que importa
                </p>
                <p className="text-[1.25rem] leading-[1.4] font-semibold text-white mb-6">
                  Para onde está indo o dinheiro que você junta todo mês?
                </p>
                <p className="text-[0.95rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Construir patrimônio é decidir que ele trabalhe por você — não por juros que você nem vê.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparativo financiamento x consórcio ── */}
      <section style={{ backgroundColor: "#F5F7FA" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <SectionTag label="Duas formas de chegar ao mesmo bem" />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight mb-6 max-w-[24ch]" style={{ color: "#2E4659" }}>
            Cada caminho tem o seu lugar. O segredo é escolher com estratégia.
          </h2>
          <p className="text-[1.0625rem] leading-relaxed mb-16 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
            Nenhum é “melhor” em todo cenário. O papel da consultoria é encaixar a ferramenta certa no seu objetivo e no seu fluxo de caixa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8 md:p-10 border bg-white" style={{ borderColor: "#EDEFF2" }}>
              <p className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: "#6B7B8D" }}>
                Financiamento
              </p>
              <p className="text-sm font-semibold mb-6" style={{ color: "#4a6b8c" }}>
                Posse imediata, com custo de juros
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Você usa o bem desde o primeiro dia.",
                  "Paga juros sobre o saldo ao longo de todo o prazo.",
                  "Depende de aprovação e análise de crédito.",
                  "Faz sentido quando a posse imediata é inegociável.",
                ].map((item) => (
                  <li key={item} className="text-[0.9375rem] leading-snug flex gap-2" style={{ color: "#6B7B8D" }}>
                    <span aria-hidden style={{ color: "#EDEFF2", flexShrink: 0 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-8 md:p-10 border" style={{ backgroundColor: "#2E4659", borderColor: "transparent" }}>
              <p className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.50)" }}>
                Consórcio
              </p>
              <p className="text-sm font-semibold mb-6" style={{ color: "rgba(255,255,255,0.70)" }}>
                Poder de compra planejado, sem juros
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Sem juros — há taxa de administração, definida e transparente.",
                  "Cada aporte vira poder de compra seu, não lucro do banco.",
                  "Contemplação por sorteio ou lance (sem prazo garantido).",
                  "Carta vale como pagamento à vista — poder de negociação.",
                ].map((item) => (
                  <li key={item} className="text-[0.9375rem] leading-snug flex gap-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                    <span aria-hidden style={{ color: "rgba(255,255,255,0.30)", flexShrink: 0 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-[0.8rem] leading-relaxed mt-8 max-w-[70ch]" style={{ color: "#9BA8B5" }}>
            Comparação educativa e simplificada. Condições variam por administradora, grupo e perfil. O consórcio não garante prazo de contemplação nem rentabilidade.
          </p>
        </div>
      </section>

      {/* ── Formas de conquistar — estratégias ── */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <SectionTag label="Formas de usar como alavanca" />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight mb-16 max-w-[26ch]" style={{ color: "#2E4659" }}>
            Uma ferramenta. Muitas formas de conquistar.
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Lance estratégico", body: "Antecipe a contemplação quando o timing do negócio pede poder de compra mais cedo." },
              { label: "Múltiplas cartas", body: "Escalone cartas de valores diferentes para acompanhar cada etapa do seu plano de aquisição." },
              { label: "Imóveis e ativos reais", body: "Direcione a carta para imóveis, terrenos e outros bens, formando patrimônio físico com disciplina." },
              { label: "Caixa de oportunidade", body: "Mantenha poder de compra à vista pronto para entrar nas boas janelas, sem travar sua liquidez." },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-[#EDEFF2] bg-white p-7 shadow-sm">
                <dt className="text-sm font-bold mb-3" style={{ color: "#2E4659" }}>{c.label}</dt>
                <dd className="text-[0.9375rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Por que a Midlej ── */}
      <section style={{ backgroundColor: "#F5F7FA" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <SectionTag label="Por que a Midlej" />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight mb-16 max-w-[28ch]" style={{ color: "#2E4659" }}>
            Do seu lado da mesa — estratégia, não venda de cota.
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Consultoria independente", body: "Olhamos o conjunto do seu patrimônio. O consórcio só entra quando é a ferramenta certa para o seu objetivo." },
              { label: "Estratégia, não prateleira", body: "Estruturamos cartas, lances e o uso da contemplação dentro de um plano — não empurramos uma cota qualquer." },
              { label: "Acompanhamento de longo prazo", body: "Seguimos com você da definição da estratégia até o uso da carta, integrando ao restante do seu planejamento." },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-[#EDEFF2] bg-white p-7 shadow-sm">
                <dt className="text-sm font-bold mb-3" style={{ color: "#2E4659" }}>{c.label}</dt>
                <dd className="text-[0.9375rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Closing — somente WhatsApp ── */}
      <LPClosing
        eyebrow="Comece pelo primeiro passo"
        headline="O patrimônio que você quer começa com uma conversa."
        body="Vamos entender seu objetivo e mostrar se — e como — o consórcio pode ser a alavanca certa para você conquistar imóveis e ativos reais. A primeira conversa é gratuita e sem compromisso."
        ctaLabel={WA_CTA_LABEL}
        origin="LP · Consórcio"
        disclaimer={DISCLAIMER}
        contact="whatsapp"
        whatsappHref={CONSORCIO_WHATSAPP_HREF}
      />

      {/* Barra fixa mobile → WhatsApp */}
      <StickyCTA
        label={WA_CTA_LABEL}
        href={CONSORCIO_WHATSAPP_HREF}
        external
        variant="whatsapp"
      />
    </main>
  );
}
