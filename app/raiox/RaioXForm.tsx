"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  RAIOX_SITUACOES,
  RAIOX_PATRIMONIOS,
  RAIOX_PROFISSOES,
  RAIOX_CONSENT_TEXT,
} from "@/lib/leadConstants";
import { submitRaioXLead, type RaioXFormState } from "@/lib/actions";
import { pushEvent } from "@/lib/analytics";

/**
 * Formulário de captação da LP /raiox (Raio-X da Carteira).
 *
 * CRO (reestruturado 20/07/2026 — funil de aquisição):
 *   Fase 1 — CAPTURA (converte cedo, pouca fricção):
 *     passo 1: situação (1 toque) → passo 2: nome + WhatsApp + e-mail → SUBMIT.
 *     A conversão (`lead_form_submit`) e o e-mail ao time acontecem AQUI —
 *     mesmo que o lead abandone a qualificação, o contato já foi capturado.
 *   Fase 2 — ENRIQUECIMENTO (opcional, na tela de sucesso):
 *     patrimônio + profissão → reenvia o mesmo lead já qualificado (score A/B/C).
 *     Se o lead pular, o time já tem o contato para retornar.
 *
 * A faixa de patrimônio roteia o atendimento (score) — nunca é barreira de
 * exclusão: o público é qualquer pessoa com capacidade de contratar consultoria.
 */

const initial: RaioXFormState = { kind: "idle" };

function maskWhatsapp(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const TOTAL_STEPS = 2; // 0 = situação, 1 = contato (submit)

export function RaioXForm() {
  const [state, action, pending] = useActionState(submitRaioXLead, initial);
  const [enrichState, enrichAction, enrichPending] = useActionState(submitRaioXLead, initial);
  const enrichFormRef = useRef<HTMLFormElement>(null);
  const enrichTried = useRef(false);

  // fluxo: "form" (captura) → "enrich" (qualificação opcional) → "done"
  const [phase, setPhase] = useState<"form" | "enrich" | "done">("form");
  const [step, setStep] = useState(0);

  // valores controlados (persistem para o reenvio do enriquecimento)
  const [situacao, setSituacao] = useState("");
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [email, setEmail] = useState("");
  const [patrimonio, setPatrimonio] = useState("");
  const [profissao, setProfissao] = useState("");

  // Captura concluída → mede a conversão (só em sucesso real) e abre a fase 2.
  useEffect(() => {
    if (state.kind === "success" && phase === "form") {
      pushEvent("lead_form_submit", { form_page: "raiox" });
      setPhase("enrich");
    }
    if (state.kind === "error") setStep(TOTAL_STEPS - 1);
  }, [state, phase]);

  // Enriquecimento concluído → tela final. Erro é best-effort: o contato já
  // foi capturado na fase 1, então seguimos para a tela final mesmo assim.
  useEffect(() => {
    if (enrichState.kind === "success") {
      pushEvent("raiox_form_enriched", { form_page: "raiox" });
      setPhase("done");
    } else if (enrichState.kind === "error") {
      setPhase("done");
    }
  }, [enrichState]);

  // Quando patrimônio E profissão são escolhidos, reenvia o lead qualificado
  // UMA vez (a guarda evita loop caso o reenvio falhe).
  useEffect(() => {
    if (
      phase === "enrich" &&
      patrimonio &&
      profissao &&
      !enrichTried.current &&
      !enrichPending
    ) {
      enrichTried.current = true;
      enrichFormRef.current?.requestSubmit();
    }
  }, [phase, patrimonio, profissao, enrichPending]);

  const cardClass = "rounded-2xl bg-white border border-[#EDEFF2] p-6 md:p-8 shadow-sm";
  const labelClass = "text-[0.7rem] font-semibold tracking-widest uppercase mb-2 block";
  const inputClass =
    "w-full text-[1.0625rem] py-3 px-4 rounded-lg border bg-white focus:outline-none transition-colors duration-200";
  const errorClass = "block mt-1.5 text-[0.78rem] font-semibold";
  const chipClass =
    "text-left w-full rounded-lg border px-4 py-3.5 text-[0.95rem] font-medium transition-all duration-150 hover:border-[#4a6b8c] hover:bg-[#F5F7FA] flex items-center justify-between gap-3";

  function ChipArrow() {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color: "#4a6b8c", flexShrink: 0 }}>
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  const errors = state.kind === "error" ? state.fields ?? {} : {};

  /* ── Fase 2 concluída ── */
  if (phase === "done") {
    return (
      <div role="status" aria-live="polite" className={cardClass}>
        <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "#B89840" }}>
          Recebemos seu pedido
        </p>
        <h3 className="text-[clamp(1.375rem,2.4vw,1.75rem)] font-bold leading-tight mb-4" style={{ color: "#2E4659" }}>
          Nossa equipe entrará em contato pelo WhatsApp em breve.
        </h3>
        <p className="text-[1rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
          Prepararemos a análise adequada ao seu caso e combinaremos o melhor horário
          para a sua sessão de Raio-X — on-line ou presencial em Brasília. Sem compromisso.
        </p>
      </div>
    );
  }

  /* ── Fase 2 — enriquecimento (contato já capturado) ── */
  if (phase === "enrich") {
    const enrichStep: "patrimonio" | "profissao" = !patrimonio ? "patrimonio" : "profissao";
    return (
      <div role="status" aria-live="polite" className={cardClass}>
        <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-3" style={{ color: "#B89840" }}>
          Contato recebido ✓
        </p>
        <h3 className="text-[1.25rem] font-bold leading-snug mb-2" style={{ color: "#2E4659" }}>
          Retornamos pelo WhatsApp em até 4 horas úteis.
        </h3>
        <p className="text-[0.9rem] leading-[1.6] mb-6" style={{ color: "#6B7B8D" }}>
          Para já preparar o seu Raio-X e priorizar o atendimento, responda mais duas —
          é rápido e opcional.
        </p>

        {enrichPending ? (
          <p className="text-[0.95rem] font-medium" style={{ color: "#4a6b8c" }}>Salvando…</p>
        ) : (
          <div>
            <h4 className="text-[1.0625rem] font-bold leading-snug mb-4" style={{ color: "#2E4659" }}>
              {enrichStep === "patrimonio"
                ? "Faixa de patrimônio investido (ou a investir):"
                : "Como você se descreve?"}
            </h4>
            <div className="flex flex-col gap-3">
              {(enrichStep === "patrimonio" ? RAIOX_PATRIMONIOS : RAIOX_PROFISSOES).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    enrichStep === "patrimonio" ? setPatrimonio(opt) : setProfissao(opt)
                  }
                  className={chipClass}
                  style={{ borderColor: "#EDEFF2", color: "#2E4659", backgroundColor: "#fff" }}
                >
                  {opt}
                  <ChipArrow />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPhase("done")}
              className="mt-5 text-[0.85rem] font-medium underline"
              style={{ color: "#9BA8B5" }}
            >
              Pular — já tenho tudo que preciso
            </button>
          </div>
        )}

        {/* Reenvio do lead já qualificado (mesmo contato + qualificação) */}
        <form ref={enrichFormRef} action={enrichAction} className="hidden" aria-hidden>
          <input type="hidden" name="name" value={name} />
          <input type="hidden" name="whatsapp" value={wa} />
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="situacao" value={situacao} />
          <input type="hidden" name="patrimonio" value={patrimonio} />
          <input type="hidden" name="profissao" value={profissao} />
        </form>
      </div>
    );
  }

  /* ── Fase 1 — captura ── */
  const isDataStep = step === TOTAL_STEPS - 1;

  return (
    <div className={cardClass}>
      {/* Progresso (2 passos) */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 flex-1 rounded-full transition-colors duration-300"
            style={{ backgroundColor: i <= step ? "#4a6b8c" : "#EDEFF2" }}
          />
        ))}
      </div>
      <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-5" style={{ color: "#9BA8B5" }}>
        Passo {step + 1} de {TOTAL_STEPS}
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(0)}
            className="ml-3 normal-case tracking-normal font-medium underline"
            style={{ color: "#4a6b8c" }}
          >
            voltar
          </button>
        )}
      </p>

      {/* Passo 1: situação (micro-compromisso) */}
      {!isDataStep && (
        <div>
          <h3 className="text-[clamp(1.125rem,2vw,1.375rem)] font-bold leading-snug mb-5" style={{ color: "#2E4659" }}>
            Qual sua principal situação hoje?
          </h3>
          <div className="flex flex-col gap-3">
            {RAIOX_SITUACOES.map((opt) => {
              const active = situacao === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setSituacao(opt);
                    setStep(1);
                    pushEvent("raiox_form_step", { form_page: "raiox", step: 1, field: "situacao" });
                  }}
                  className={chipClass}
                  style={{
                    borderColor: active ? "#4a6b8c" : "#EDEFF2",
                    color: "#2E4659",
                    backgroundColor: active ? "#F5F7FA" : "#fff",
                  }}
                >
                  {opt}
                  <ChipArrow />
                </button>
              );
            })}
          </div>
          <p className="text-[0.78rem] leading-relaxed mt-5" style={{ color: "#9BA8B5" }}>
            Não solicitamos dados bancários, senhas ou extratos. Leva cerca de um minuto.
          </p>
        </div>
      )}

      {/* Passo 2: contato + submit (a conversão acontece aqui) */}
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
          {/* Situação escolhida no passo 1 (patrimônio/profissão vêm depois) */}
          <input type="hidden" name="situacao" value={situacao} />

          <h3 className="text-[clamp(1.125rem,2vw,1.375rem)] font-bold leading-snug -mb-1" style={{ color: "#2E4659" }}>
            Para onde enviamos o seu Raio-X?
          </h3>

          <div>
            <label htmlFor="rx-name" className={labelClass} style={{ color: "#4a6b8c" }}>
              Nome completo
            </label>
            <input
              id="rx-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              style={{ borderColor: errors.name ? "#B23A48" : "#EDEFF2", color: "#2E4659" }}
              aria-invalid={!!errors.name}
            />
            {errors.name?.[0] && <span className={errorClass} style={{ color: "#B23A48" }}>{errors.name[0]}</span>}
          </div>

          <div>
            <label htmlFor="rx-whatsapp" className={labelClass} style={{ color: "#4a6b8c" }}>
              WhatsApp
            </label>
            <input
              id="rx-whatsapp"
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
              style={{ borderColor: errors.whatsapp ? "#B23A48" : "#EDEFF2", color: "#2E4659" }}
              aria-invalid={!!errors.whatsapp}
            />
            {errors.whatsapp?.[0] && <span className={errorClass} style={{ color: "#B23A48" }}>{errors.whatsapp[0]}</span>}
          </div>

          <div>
            <label htmlFor="rx-email" className={labelClass} style={{ color: "#4a6b8c" }}>
              E-mail
            </label>
            <input
              id="rx-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              className={inputClass}
              style={{ borderColor: errors.email ? "#B23A48" : "#EDEFF2", color: "#2E4659" }}
              aria-invalid={!!errors.email}
            />
            {errors.email?.[0] && <span className={errorClass} style={{ color: "#B23A48" }}>{errors.email[0]}</span>}
          </div>

          <label className="flex items-start gap-3 text-[0.8rem] leading-[1.5] mt-1" style={{ color: "#6B7B8D" }}>
            <input type="checkbox" required className="mt-1 shrink-0 accent-[#4a6b8c]" />
            <span>{RAIOX_CONSENT_TEXT}</span>
          </label>

          {state.kind === "error" && state.message && (
            <p className={errorClass} style={{ color: "#B23A48" }}>{state.message}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 min-h-[52px] rounded-lg text-[1rem] font-semibold text-white shadow-md disabled:opacity-50 transition-colors duration-200"
            style={{ backgroundColor: "#4a6b8c" }}
          >
            {pending ? "Enviando…" : "Quero o Raio-X da minha carteira"}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="text-[0.75rem] leading-relaxed text-center" style={{ color: "#9BA8B5" }}>
            Retorno pelo WhatsApp em até 4 horas úteis. Sem compromisso.
          </p>
        </form>
      )}
    </div>
  );
}
