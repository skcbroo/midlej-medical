"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  OBJETIVOS_PATRIMONIOS,
  OBJETIVOS_EXPERIENCIAS,
  OBJETIVOS_CONSENT_TEXT,
} from "@/lib/leadConstants";
import { submitObjetivosLead, type ObjetivosFormState } from "@/lib/actions";
import { pushEvent } from "@/lib/analytics";

/**
 * Formulário de captura da LP /objetivos (script "Riscos Ocultos", 24/08/2026).
 *
 * 4 campos, todos obrigatórios: nome + WhatsApp + patrimônio investido +
 * experiência prévia. Envio único (sem multi-step): manda o lead por e-mail
 * via Resend (server action submitObjetivosLead) e, em sucesso real, dispara
 * o evento canônico do funil.
 *
 * ⚠️ TRACKING — não quebrar:
 *   - `lead_form_submit` dispara no useEffect de sucesso (dataLayer → GTM →
 *     conversão Google Ads). Mesmo nome/semântica da /raiox.
 *   - `objetivos_form_start` dispara no 1º focus de qualquer campo.
 */

const initial: ObjetivosFormState = { kind: "idle" };

function maskWhatsapp(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function ObjetivosForm({ instanceId = "obj" }: { instanceId?: string }) {
  const [state, action, pending] = useActionState(submitObjetivosLead, initial);
  const startedRef = useRef(false);

  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [patrimonio, setPatrimonio] = useState("");
  const [experiencia, setExperiencia] = useState("");

  function handleFormStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    pushEvent("objetivos_form_start", { form_page: "objetivos" });
  }

  // Sucesso real → dispara a conversão canônica do funil. Não renomear.
  useEffect(() => {
    if (state.kind === "success") {
      pushEvent("lead_form_submit", { form_page: "objetivos" });
    }
  }, [state]);

  const labelClass =
    "text-[0.7rem] font-semibold tracking-widest uppercase mb-2 block";
  const inputClass =
    "w-full text-[1.0625rem] py-3 px-4 border bg-white focus:outline-none focus:border-[#2E4659] transition-colors duration-200";
  const errorClass = "block mt-1.5 text-[0.78rem] font-semibold";
  const errors = state.kind === "error" ? state.fields ?? {} : {};

  /* ── Tela de confirmação (pós-envio) — texto exato do script ── */
  if (state.kind === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-white border p-8 md:p-9"
        style={{ borderColor: "#E2E6EA" }}
      >
        <p
          className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4"
          style={{ color: "#4a6b8c" }}
        >
          Recebido
        </p>
        <h3
          className="text-[clamp(1.375rem,2.4vw,1.75rem)] font-bold leading-tight mb-4"
          style={{ color: "#2E4659" }}
        >
          O primeiro passo para conquista dos seus objetivos foi dado.
        </h3>
        <p className="text-[1.0625rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
          Em até 10 minutos um especialista vai entrar em contato.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border p-7 md:p-9" style={{ borderColor: "#E2E6EA" }}>
      <p
        className="text-[0.7rem] font-semibold tracking-widest uppercase mb-2"
        style={{ color: "#4a6b8c" }}
      >
        Quero ver os meus números
      </p>
      <p className="text-[0.95rem] leading-[1.55] mb-6" style={{ color: "#6B7B8D" }}>
        Preencha e a gente entra em contato para mostrar onde você está e o que muda.
      </p>

      <form
        action={action}
        onFocus={handleFormStart}
        noValidate
        className="flex flex-col gap-5"
      >
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

        <div>
          <label
            htmlFor={`${instanceId}-name`}
            className={labelClass}
            style={{ color: "#4a6b8c" }}
          >
            Nome
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
            style={{ borderColor: errors.name ? "#B23A48" : "#D9DEE3", color: "#2E4659" }}
            aria-invalid={!!errors.name}
          />
          {errors.name?.[0] && (
            <span className={errorClass} style={{ color: "#B23A48" }}>
              {errors.name[0]}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor={`${instanceId}-whatsapp`}
            className={labelClass}
            style={{ color: "#4a6b8c" }}
          >
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
            style={{ borderColor: errors.whatsapp ? "#B23A48" : "#D9DEE3", color: "#2E4659" }}
            aria-invalid={!!errors.whatsapp}
          />
          {errors.whatsapp?.[0] && (
            <span className={errorClass} style={{ color: "#B23A48" }}>
              {errors.whatsapp[0]}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor={`${instanceId}-patrimonio`}
            className={labelClass}
            style={{ color: "#4a6b8c" }}
          >
            Patrimônio investido
          </label>
          <select
            id={`${instanceId}-patrimonio`}
            name="patrimonio"
            required
            value={patrimonio}
            onChange={(e) => setPatrimonio(e.target.value)}
            className={inputClass}
            style={{
              borderColor: errors.patrimonio ? "#B23A48" : "#D9DEE3",
              color: patrimonio ? "#2E4659" : "#9BA8B5",
            }}
            aria-invalid={!!errors.patrimonio}
          >
            <option value="" disabled>
              Selecione uma faixa
            </option>
            {OBJETIVOS_PATRIMONIOS.map((opt) => (
              <option key={opt} value={opt} style={{ color: "#2E4659" }}>
                {opt}
              </option>
            ))}
          </select>
          {errors.patrimonio?.[0] && (
            <span className={errorClass} style={{ color: "#B23A48" }}>
              {errors.patrimonio[0]}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor={`${instanceId}-experiencia`}
            className={labelClass}
            style={{ color: "#4a6b8c" }}
          >
            Já investiu antes?
          </label>
          <select
            id={`${instanceId}-experiencia`}
            name="experiencia"
            required
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
            className={inputClass}
            style={{
              borderColor: errors.experiencia ? "#B23A48" : "#D9DEE3",
              color: experiencia ? "#2E4659" : "#9BA8B5",
            }}
            aria-invalid={!!errors.experiencia}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {OBJETIVOS_EXPERIENCIAS.map((opt) => (
              <option key={opt} value={opt} style={{ color: "#2E4659" }}>
                {opt}
              </option>
            ))}
          </select>
          {errors.experiencia?.[0] && (
            <span className={errorClass} style={{ color: "#B23A48" }}>
              {errors.experiencia[0]}
            </span>
          )}
        </div>

        <label
          className="flex items-start gap-3 text-[0.8rem] leading-[1.5]"
          style={{ color: "#6B7B8D" }}
        >
          <input type="checkbox" required className="mt-1 shrink-0 accent-[#2E4659]" />
          <span>{OBJETIVOS_CONSENT_TEXT}</span>
        </label>

        {state.kind === "error" && state.message && (
          <p className={errorClass} style={{ color: "#B23A48" }}>
            {state.message}
          </p>
        )}

        {/* Botão quadrado (sistema de marca: sem border-radius) */}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2.5 px-6 py-4 min-h-[52px] text-[1rem] font-semibold text-white disabled:opacity-50 transition-colors duration-200"
          style={{ backgroundColor: "#2E4659" }}
        >
          {pending ? "Enviando…" : "Quero ver meus números"}
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path
              d="M1 5h12m0 0L9 1m4 4L9 9"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p className="text-[0.8rem] leading-relaxed text-center" style={{ color: "#9BA8B5" }}>
          Sem compromisso. A gente entra em contato em até 24h.
        </p>
      </form>
    </div>
  );
}
