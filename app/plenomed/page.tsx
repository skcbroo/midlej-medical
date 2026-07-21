import type { Metadata } from "next";
import Image from "next/image";
import { LPHeader } from "@/app/_hub/LPHeader";
import { LPClosing } from "@/app/_hub/LPClosing";
import { SmoothAnchor } from "@/app/_hub/SmoothAnchor";
import { StickyCTA } from "@/app/components/StickyCTA";
import { PLENOMED_WHATSAPP_HREF } from "@/lib/leadConstants";

const WA_CTA_LABEL = "Quero avaliar minha proteção";

export const metadata: Metadata = {
  title: "Proteção Patrimonial para Médicos · Midlej Capital",
  description:
    "Um processo pode custar mais que sua carreira. Descubra se seu patrimônio pessoal está protegido — RC profissional + blindagem patrimonial com consultoria financeira e jurídica integradas.",
  openGraph: {
    title: "Proteção Patrimonial para Médicos · Midlej Capital",
    description: "RC profissional na cobertura certa + blindagem patrimonial. Consultoria financeira e jurídica sob o mesmo teto.",
    type: "website",
    locale: "pt_BR",
  },
};

const DISCLAIMER =
  "Esta página tem caráter educativo e não constitui recomendação individualizada de seguro ou consultoria jurídica. Dados de judicialização são de fontes públicas e variam por especialidade e região.";

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

/** CTA primário de WhatsApp da LP /plenomed (teste: somente WhatsApp). */
function WhatsAppCTA({ size = "lg", className = "" }: { size?: "lg" | "md"; className?: string }) {
  const pad =
    size === "lg"
      ? "px-8 py-4 text-[1.0625rem] min-h-[52px]"
      : "px-6 py-3 text-sm min-h-[48px]";
  return (
    <a
      href={PLENOMED_WHATSAPP_HREF}
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

export default function PlenomedPage() {
  return (
    <main
      className="bg-white text-[#2E4659]"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
    >
      <LPHeader ctaLabel={WA_CTA_LABEL} ctaHref={PLENOMED_WHATSAPP_HREF} ctaExternal />
      <SmoothAnchor />

      {/* ── Hero ── */}
      <section id="top" className="relative min-h-screen flex items-center">
        <Image
          src="/fotos_escritorio/3.jpeg"
          alt="Escritório Midlej Capital"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,70,89,0.65)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-40 md:py-56 w-full">
          <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            Proteção Patrimonial · Médicos
          </p>
          <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.04] tracking-tight text-white mb-8 max-w-[18ch]">
            Um processo pode custar mais que sua carreira.
          </h1>
          <p className="text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-relaxed mb-14 max-w-[38ch]" style={{ color: "rgba(255,255,255,0.78)" }}>
            A judicialização contra médicos cresce todo ano. Saber se o seu patrimônio pessoal está realmente protegido é a pergunta que ninguém faz — até precisar.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <WhatsAppCTA size="lg" />
            <a
              href="#exposicao"
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-lg text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-200"
            >
              Avaliar minha exposição <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── Agitação ── */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="col-span-full md:col-span-5">
              <SectionTag label="O cenário atual" />
              <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[18ch] mb-8 md:mb-0" style={{ color: "#2E4659" }}>
                O risco cresce. A proteção fica estagnada.
              </h2>
            </div>
            <div className="col-span-full md:col-span-7">
              <p className="text-[1.0625rem] leading-[1.65] mb-10 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
                Três realidades que médicos com RC ativa frequentemente ignoram — e que podem custar décadas de construção patrimonial.
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { n: "↑ todo ano", label: "Judicialização médica", sub: "Processos por erro médico crescem sistematicamente no Brasil" },
                  { n: "Anos", label: "O que uma indenização pode levar", sub: "Uma sentença de R$500mil a R$2mi pode absorver anos de renda" },
                  { n: "⚠", label: "Patrimônio pessoal na linha", sub: "RC com cobertura errada deixa imóveis e investimentos expostos" },
                ].map((s) => (
                  <div key={s.n} className="rounded-xl border border-[#EDEFF2] p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <dt className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-none tracking-tight mb-2" style={{ color: "#4a6b8c" }}>
                      {s.n}
                    </dt>
                    <dd className="text-sm font-semibold leading-snug mb-1" style={{ color: "#2E4659" }}>{s.label}</dd>
                    <dd className="text-[0.8rem] leading-snug" style={{ color: "#6B7B8D" }}>{s.sub}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diagnóstico de exposição ── */}
      <section id="exposicao" style={{ backgroundColor: "#F5F7FA" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <SectionTag label="Diagnóstico de exposição" />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight mb-6 max-w-[24ch]" style={{ color: "#2E4659" }}>
            Qual é o seu nível de exposição hoje?
          </h2>
          <p className="text-[1.0625rem] leading-relaxed mb-16 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
            O risco varia com especialidade, tempo de carreira e estrutura patrimonial. Identifique onde você está.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "Exposição Alta",
                tagColor: "#c0392b",
                title: "RC com cobertura abaixo do risco",
                items: [
                  "Especialidade de alto risco cirúrgico",
                  "Apólice antiga sem revisão de cobertura",
                  "Patrimônio pessoal sem proteção jurídica",
                  "Sem separação entre PF e PJ",
                ],
                highlight: false,
              },
              {
                tag: "Exposição Média",
                tagColor: "#c07a17",
                title: "Proteção parcial — pontos cegos",
                items: [
                  "RC ativa, mas limites desatualizados",
                  "Nenhuma auditoria nos últimos 2 anos",
                  "Bens pessoais sem blindagem específica",
                  "Orientação de seguradora, não de consultoria",
                ],
                highlight: false,
              },
              {
                tag: "Exposição Controlada",
                tagColor: "#27ae60",
                title: "Estrutura completa e revisada",
                items: [
                  "RC com cobertura calibrada à especialidade",
                  "Patrimônio pessoal estruturado juridicamente",
                  "Revisão anual com consultoria independente",
                  "Plano integrado: finanças + proteção",
                ],
                highlight: true,
              },
            ].map((c) => (
              <div
                key={c.tag}
                className="rounded-2xl p-8 border"
                style={{
                  backgroundColor: c.highlight ? "#2E4659" : "white",
                  borderColor: c.highlight ? "transparent" : "#EDEFF2",
                }}
              >
                <p className="text-[0.66rem] font-bold tracking-widest uppercase mb-4" style={{ color: c.highlight ? "rgba(255,255,255,0.55)" : c.tagColor }}>
                  {c.tag}
                </p>
                <h3 className="text-[1.0625rem] font-bold mb-6 leading-snug" style={{ color: c.highlight ? "white" : "#2E4659" }}>
                  {c.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {c.items.map((item) => (
                    <li key={item} className="text-[0.9rem] leading-snug flex gap-2" style={{ color: c.highlight ? "rgba(255,255,255,0.65)" : "#6B7B8D" }}>
                      <span aria-hidden style={{ color: c.highlight ? "rgba(255,255,255,0.30)" : "#EDEFF2", flexShrink: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solução ── */}
      <section style={{ backgroundColor: "#4a6b8c" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="col-span-full md:col-span-7">
              <SectionTag label="Nossa diferença" dark />
              <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight text-white mb-6 max-w-[22ch]">
                Outros vendem a apólice. Nós protegemos o patrimônio inteiro.
              </h2>
              <p className="text-[1.0625rem] leading-[1.65] mb-6 max-w-[52ch]" style={{ color: "rgba(255,255,255,0.75)" }}>
                A MIDLEJ reúne consultoria financeira e jurídica sob o mesmo teto. Calibramos a RC certa para a especialidade — e estruturamos o patrimônio pessoal para que nenhuma sentença apague décadas de trabalho.
              </p>
              <p className="text-[1.0625rem] leading-[1.65] max-w-[52ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
                Um único interlocutor. Sem conflito de interesse. Sem produto de prateleira.
              </p>
            </div>
            <div className="col-span-full md:col-span-4 md:col-start-9">
              <WhatsAppCTA size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="col-span-full md:col-span-4">
              <SectionTag label="Como funciona" />
              <h2 className="text-[clamp(1.625rem,3vw,2.5rem)] font-bold leading-[1.04] tracking-tight max-w-[16ch]" style={{ color: "#2E4659" }}>
                Três etapas. Uma blindagem completa.
              </h2>
            </div>
            <div className="col-span-full md:col-span-8 md:col-start-5">
              <ol className="flex flex-col divide-y divide-[#EDEFF2]">
                {[
                  {
                    n: "I",
                    title: "Raio-X de exposição",
                    body: "Avaliamos sua especialidade, apólice atual, estrutura patrimonial e regime societário. Mapeamos onde está o risco real — não o que a seguradora quer te vender.",
                  },
                  {
                    n: "II",
                    title: "Calibração de cobertura + blindagem jurídica",
                    body: "Nossa equipe recomenda o limite de RC adequado e, em paralelo, estrutura juridicamente o patrimônio pessoal: holding familiar, separação PF/PJ, doações em vida.",
                  },
                  {
                    n: "III",
                    title: "Revisão anual e acompanhamento",
                    body: "O risco muda. A carreira evolui. Revisamos anualmente — cobertura, estrutura e finanças — para que a proteção nunca fique defasada.",
                  },
                ].map((s) => (
                  <li key={s.n} className="py-8 md:py-10 flex gap-6 md:gap-10 items-start">
                    <span className="text-[clamp(1.875rem,3vw,2.5rem)] font-light leading-none tabular-nums shrink-0" style={{ color: "#4a6b8c" }}>
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-[1.0625rem] font-bold mb-3" style={{ color: "#2E4659" }}>{s.title}</h3>
                      <p className="text-[0.95rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── Autoridade ── */}
      <section style={{ backgroundColor: "#F5F7FA" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <SectionTag label="Por que a Midlej" />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight mb-16 max-w-[28ch]" style={{ color: "#2E4659" }}>
            Finanças e direito. Sob o mesmo teto.
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Consultoria independente", body: "Obrigação fiduciária ao cliente — não ao produto ou à seguradora." },
              { label: "Parceiro jurídico", body: "Equipe jurídica especializada em proteção patrimonial integrada ao planejamento financeiro. Mesmo time. Mesma estratégia." },
              { label: "Fee fixo · sem comissão", body: "Não recebemos comissão da seguradora. Nossa remuneração é por honorários — alinhada ao seu interesse, não ao prêmio." },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-[#EDEFF2] bg-white p-7 shadow-sm">
                <dt className="text-sm font-bold mb-3" style={{ color: "#2E4659" }}>{c.label}</dt>
                <dd className="text-[0.9375rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Closing ── */}
      <LPClosing
        eyebrow="Diagnóstico gratuito"
        headline="Descubra se seu patrimônio está realmente protegido."
        body="A primeira conversa é gratuita, confidencial e sem compromisso. Avaliamos sua exposição atual e apresentamos o que precisa mudar — sem vender apólice antes da análise."
        ctaLabel={WA_CTA_LABEL}
        origin="LP2 · RC Médico"
        disclaimer={DISCLAIMER}
        contact="whatsapp"
        whatsappHref={PLENOMED_WHATSAPP_HREF}
      />

      {/* Barra fixa mobile → WhatsApp */}
      <StickyCTA
        label={WA_CTA_LABEL}
        href={PLENOMED_WHATSAPP_HREF}
        external
        variant="whatsapp"
      />
    </main>
  );
}
