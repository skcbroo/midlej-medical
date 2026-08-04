"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  LEGACY_IDADES,
  LEGACY_APORTES,
  LEGACY_APORTE_FRAMING,
  LEGACY_CONSENT_TEXT,
} from "@/lib/leadConstants";
import { submitLegacyLead, type LegacyFormState } from "@/lib/actions";
import { pushEvent } from "@/lib/analytics";

/**
 * Formulário de captação da LP /legacy (Midlej Legacy).
 *
 * TRÊS PASSOS, e a ordem é deliberada (normativo §7):
 *   1. idade do filho  — 1 toque, zero teclado. É o campo mais fácil e o
 *      mais emocional da página: a pessoa entra pensando no filho dela,
 *      não em preencher um formulário.
 *   2. faixa de aporte MENSAL — 1 toque. É a PORTA ESTREITA. Vem antes do
 *      contato de propósito: quem não se reconhece na ordem de grandeza
 *      sai aqui, antes de virar mais um formulário de perfil C. E quem
 *      segue chega ao time já com o dado que qualifica.
 *   3. contato + submit — a conversão acontece aqui.
 *
 * Diferença em relação à /raiox: lá a qualificação é opcional e vem DEPOIS
 * da captura (maximiza volume de contato). Aqui ela é obrigatória e vem
 * ANTES — porque a categoria "investimento para filhos" é de massa e sem
 * trava produziria mais perfil C do que qualquer LP nossa até hoje. Trocar
 * volume por qualificação é o objetivo declarado desta página.
 *
 * Rede de resgate: quem abandona no passo 3 depois de já ter digitado
 * contato é enviado por sendBeacon para /api/legacy-partial — e esse
 * parcial já vem com idade e faixa preenchidas.
 */

const initial: LegacyFormState = { kind: "idle" };

const INK = "#233853";
const PAPER = "oklch(96.8% 0.010 78)";
const INK_SOFT = "oklch(48% 0.040 240)";
const INK_MUTE = "oklch(62% 0.020 240)";
const LINE = "oklch(20% 0.04 240 / 0.16)";
const LINE_STRONG = "oklch(20% 0.04 240 / 0.34)";
const OXBLOOD = "oklch(46% 0.115 30)";

function maskWhatsapp(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const TOTAL_STEPS = 3;

/**
 * `instanceId` prefixa os ids dos campos. A página renderiza o form duas
 * vezes (hero e fechamento) — sem o prefixo os ids colidiriam e cada
 * <label> apontaria para o campo da primeira instância.
 */
export function LegacyForm({ instanceId = "lg" }: { instanceId?: string }) {
  const [state, action, pending] = useActionState(submitLegacyLead, initial);

  const [step, setStep] = useState(0);
  const [idadeFilho, setIdadeFilho] = useState("");
  const [aporte, setAporte] = useState("");
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [email, setEmail] = useState("");

  // ── Captura de formulário INCOMPLETO (partial lead) ──
  const submittedRef = useRef(false);
  const partialSentRef = useRef(false);
  const snapshotRef = useRef({ name: "", wa: "", email: "", idadeFilho: "", aporte: "" });
  snapshotRef.current = { name, wa, email, idadeFilho, aporte };

  useEffect(() => {
    if (state.kind === "success") {
      submittedRef.current = true;
      // Evento de conversão. Mesmo nome usado pela /raiox de propósito: é o
      // que a tag "Lead Formulário" do GTM já escuta. `form_page` separa as
      // páginas nos relatórios sem exigir uma tag nova no container.
      pushEvent("lead_form_submit", { form_page: "legacy" });
    }
    if (state.kind === "error") setStep(TOTAL_STEPS - 1);
  }, [state]);

  useEffect(() => {
    function flushPartial() {
      if (partialSentRef.current || submittedRef.current) return;
      const s = snapshotRef.current;
      if (!s.wa && !s.email) return; // sem contato mínimo, nada a resgatar
      partialSentRef.current = true;
      try {
        const blob = new Blob(
          [
            JSON.stringify({
              name: s.name,
              whatsapp: s.wa,
              email: s.email,
              idadeFilho: s.idadeFilho,
              aporte: s.aporte,
            }),
          ],
          { type: "application/json" },
        );
        navigator.sendBeacon?.("/api/legacy-partial", blob);
      } catch {
        /* best-effort: nunca interromper a navegação do usuário */
      }
    }
    function onVisibility() {
      if (document.visibilityState === "hidden") flushPartial();
    }
    window.addEventListener("pagehide", flushPartial);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", flushPartial);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const errors = state.kind === "error" ? state.fields ?? {} : {};

  const cardStyle = {
    backgroundColor: PAPER,
    border: `1px solid ${LINE}`,
  } as const;
  const cardClass = "p-5 md:p-8";
  const labelClass = "block mb-2 text-[0.7rem] font-medium uppercase tracking-[0.14em]";
  const inputClass =
    "w-full text-[1.0625rem] py-3.5 px-4 bg-white border focus:outline-none transition-colors duration-200";
  const chipClass =
    "text-left w-full border px-4 py-4 text-[1rem] font-medium transition-colors duration-150 flex items-center justify-between gap-3 bg-white hover:border-[color:oklch(20%_0.04_240_/_0.34)]";

  function ChipArrow() {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color: OXBLOOD, flexShrink: 0 }}>
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  /* ── Sucesso ── */
  if (state.kind === "success") {
    return (
      <div role="status" aria-live="polite" className={cardClass} style={cardStyle}>
        {/* ⚠️ `p {margin:0}` e `h1..h4 {margin:0}` vêm de globals.css FORA de
            @layer e anulam `mt-*`/`mb-*` do Tailwind nestes elementos.
            Todo espaçamento vertical de <p> e de títulos aqui é inline. */}
        <p
          className="text-[0.7rem] font-medium uppercase tracking-[0.14em]"
          style={{ color: OXBLOOD, marginBottom: "1rem" }}
        >
          Pedido recebido
        </p>
        <h3
          className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
          style={{ color: INK, marginBottom: "1rem" }}
        >
          Retornamos em até 5 minutos.
        </h3>
        <p className="text-[1rem] leading-[1.6]" style={{ color: INK_SOFT }}>
          O retorno vem pelo WhatsApp que você informou, com duas opções de horário
          para a conversa. Ela leva cerca de 45 minutos, on-line ou presencial em
          Brasília, e é nela que o destino, o valor mensal e a data da revisão são
          definidos.
        </p>
        <p
          className="text-[0.85rem] leading-[1.6] pt-5"
          style={{ color: INK_MUTE, borderTop: `1px solid ${LINE}`, marginTop: "1.25rem" }}
        >
          Midlej Consultoria de Valores Mobiliários LTDA, registrada na CVM sob o
          nº 004770-8.
        </p>
      </div>
    );
  }

  const isDataStep = step === TOTAL_STEPS - 1;
  const chipStep: "idade" | "aporte" = step === 0 ? "idade" : "aporte";

  return (
    <div className={cardClass} style={cardStyle}>
      {/* Progresso */}
      <div className="flex items-center gap-1.5 mb-3.5">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span
            key={i}
            className="h-[3px] flex-1 transition-colors duration-300"
            style={{ backgroundColor: i <= step ? INK : LINE }}
          />
        ))}
      </div>
      <p
        className="text-[0.7rem] font-medium uppercase tracking-[0.14em]"
        style={{ color: INK_MUTE, marginBottom: "0.75rem" }}
      >
        Passo {step + 1} de {TOTAL_STEPS}
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="ml-3 normal-case tracking-normal font-medium underline"
            style={{ color: OXBLOOD }}
          >
            voltar
          </button>
        )}
      </p>

      {/* Passos 1 e 2: um toque cada */}
      {!isDataStep && (
        <div>
          <h3
            className="text-[clamp(1.25rem,2.2vw,1.625rem)] font-semibold leading-[1.15] tracking-[-0.02em]"
            style={{ color: INK, marginBottom: "0.5rem" }}
          >
            {chipStep === "idade"
              ? "Quantos anos tem o seu filho?"
              : "Quanto você consegue destinar por mês, hoje?"}
          </h3>
          <p className="text-[0.9rem] leading-[1.5]" style={{ color: INK_MUTE, marginBottom: "0.875rem" }}>
            {chipStep === "idade"
              ? "A idade define as revisões possíveis."
              : LEGACY_APORTE_FRAMING}
          </p>
          <div className="flex flex-col gap-2.5">
            {(chipStep === "idade" ? LEGACY_IDADES : LEGACY_APORTES).map((opt) => {
              const active = chipStep === "idade" ? idadeFilho === opt : aporte === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    if (chipStep === "idade") {
                      setIdadeFilho(opt);
                      setStep(1);
                      pushEvent("legacy_form_step", { form_page: "legacy", step: 1, field: "idade_filho" });
                    } else {
                      setAporte(opt);
                      setStep(2);
                      pushEvent("legacy_form_step", { form_page: "legacy", step: 2, field: "aporte" });
                    }
                  }}
                  className={chipClass}
                  style={{ borderColor: active ? LINE_STRONG : LINE, color: INK }}
                >
                  {opt}
                  <ChipArrow />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Passo 3: contato + submit (a conversão acontece aqui) */}
      {isDataStep && (
        <form action={action} noValidate className="flex flex-col gap-5">
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            aria-hidden
            autoComplete="off"
            defaultValue=""
            style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
          />
          <input type="hidden" name="idadeFilho" value={idadeFilho} />
          <input type="hidden" name="aporte" value={aporte} />

          <div>
            <h3
              className="text-[clamp(1.25rem,2.2vw,1.625rem)] font-semibold leading-[1.15] tracking-[-0.02em]"
              style={{ color: INK }}
            >
              Para onde retornamos.
            </h3>
            <p className="text-[0.9rem] leading-[1.55]" style={{ color: INK_MUTE, marginTop: "0.5rem" }}>
              Retornamos em até 5 minutos pelo WhatsApp informado.
            </p>
          </div>

          <div>
            <label htmlFor={`${instanceId}-name`} className={labelClass} style={{ color: INK_SOFT }}>
              Nome completo
            </label>
            <input
              id={`${instanceId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              style={{ borderColor: errors.name ? OXBLOOD : LINE, color: INK }}
              aria-invalid={!!errors.name}
            />
            {errors.name?.[0] && (
              <span className="block mt-1.5 text-[0.78rem] font-semibold" style={{ color: OXBLOOD }}>
                {errors.name[0]}
              </span>
            )}
          </div>

          <div>
            <label htmlFor={`${instanceId}-whatsapp`} className={labelClass} style={{ color: INK_SOFT }}>
              WhatsApp
            </label>
            <input
              id={`${instanceId}-whatsapp`}
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              required
              value={wa}
              onChange={(e) => setWa(maskWhatsapp(e.target.value))}
              maxLength={16}
              placeholder="(11) 91234-5678"
              className={inputClass}
              style={{ borderColor: errors.whatsapp ? OXBLOOD : LINE, color: INK }}
              aria-invalid={!!errors.whatsapp}
            />
            {errors.whatsapp?.[0] && (
              <span className="block mt-1.5 text-[0.78rem] font-semibold" style={{ color: OXBLOOD }}>
                {errors.whatsapp[0]}
              </span>
            )}
          </div>

          <div>
            <label htmlFor={`${instanceId}-email`} className={labelClass} style={{ color: INK_SOFT }}>
              E-mail
            </label>
            <input
              id={`${instanceId}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              className={inputClass}
              style={{ borderColor: errors.email ? OXBLOOD : LINE, color: INK }}
              aria-invalid={!!errors.email}
            />
            {errors.email?.[0] && (
              <span className="block mt-1.5 text-[0.78rem] font-semibold" style={{ color: OXBLOOD }}>
                {errors.email[0]}
              </span>
            )}
          </div>

          <label className="flex items-start gap-3 text-[0.8rem] leading-[1.5]" style={{ color: INK_SOFT }}>
            <input type="checkbox" required className="mt-1 shrink-0" style={{ accentColor: INK }} />
            <span>{LEGACY_CONSENT_TEXT}</span>
          </label>

          {state.kind === "error" && state.message && (
            <p className="text-[0.85rem] font-semibold" style={{ color: OXBLOOD }}>
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 min-h-[54px] text-[1rem] font-semibold disabled:opacity-50 transition-colors duration-200"
            style={{ backgroundColor: INK, color: PAPER }}
          >
            {pending ? "Enviando…" : "Quero definir o plano do meu filho"}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="text-[0.78rem] leading-[1.55] text-center" style={{ color: INK_MUTE }}>
            Não pedimos senha, extrato nem acesso à sua conta.
          </p>
        </form>
      )}
    </div>
  );
}
