"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { SPECIAL_FAIXAS, SPECIAL_CONSENT_TEXT } from "@/lib/leadConstants";
import { submitSpecialLead, type SpecialFormState } from "@/lib/actions";
import { pushEvent } from "@/lib/analytics";

/**
 * Formulário de captação da LP /special-situations.
 *
 * Oferta: investimento em ativos judiciais trabalhistas (special
 * situations). CTA = AGENDAR CONVERSA. Captura de baixa fricção,
 * single-step: nome + e-mail + telefone + faixa de capital (opcional).
 *
 * ⚠️ TRACKING — não quebrar:
 *   - `lead_form_submit` dispara no useEffect de sucesso (dataLayer → GTM
 *     → conversão Ads). form_page = "special-situations".
 *   - `special_form_start` dispara no 1º focus de qualquer campo.
 */

const initial: SpecialFormState = { kind: "idle" };

function maskWhatsapp(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function SpecialForm({ instanceId = "ss" }: { instanceId?: string }) {
  const [state, action, pending] = useActionState(submitSpecialLead, initial);
  const startedRef = useRef(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wa, setWa] = useState("");

  function handleFormStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    pushEvent("special_form_start", { form_page: "special-situations" });
  }

  useEffect(() => {
    if (state.kind === "success") {
      // Evento canônico do funil — GTM → Google Ads. Não renomear.
      pushEvent("lead_form_submit", { form_page: "special-situations" });
    }
  }, [state.kind]);

  const cardClass = "rounded-2xl bg-white border border-[#EDEFF2] p-6 md:p-8 shadow-sm";
  const labelClass = "text-[0.7rem] font-semibold tracking-widest uppercase mb-2 block";
  const inputClass =
    "w-full text-[1.0625rem] py-3 px-4 rounded-lg border bg-white focus:outline-none transition-colors duration-200";
  const errorClass = "block mt-1.5 text-[0.78rem] font-semibold";

  const errors = state.kind === "error" ? state.fields ?? {} : {};

  /* ── Sucesso ── */
  if (state.kind === "success") {
    return (
      <div role="status" aria-live="polite" className={cardClass}>
        <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "#B89840" }}>
          Recebido ✓
        </p>
        <h3 className="text-[clamp(1.375rem,2.4vw,1.75rem)] font-bold leading-tight mb-4" style={{ color: "#2E4659" }}>
          Pronto. Seu pedido de conversa chegou.
        </h3>
        <p className="text-[1rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
          Um responsável da Midlej vai entrar em contato para agendar uma conversa e
          apresentar a operação em detalhe. Deixe o telefone por perto.
        </p>
      </div>
    );
  }

  /* ── Captura ── */
  return (
    <div className={cardClass}>
      <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-2" style={{ color: "#4a6b8c" }}>
        Conheça essa alternativa
      </p>
      <h3 className="text-[clamp(1.25rem,2.2vw,1.5rem)] font-bold leading-snug mb-2" style={{ color: "#2E4659" }}>
        Entenda como se expor a esses ativos.
      </h3>
      <p className="text-[0.95rem] leading-[1.55] mb-6" style={{ color: "#6B7B8D" }}>
        Deixe seus dados. Um responsável apresenta a tese, a estrutura e os riscos numa
        conversa reservada, sem compromisso.
      </p>

      <form action={action} onFocus={handleFormStart} noValidate className="flex flex-col gap-5">
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
          <label htmlFor={`${instanceId}-name`} className={labelClass} style={{ color: "#4a6b8c" }}>
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
            style={{ borderColor: errors.name ? "#B23A48" : "#EDEFF2", color: "#2E4659" }}
            aria-invalid={!!errors.name}
          />
          {errors.name?.[0] && <span className={errorClass} style={{ color: "#B23A48" }}>{errors.name[0]}</span>}
        </div>

        <div>
          <label htmlFor={`${instanceId}-email`} className={labelClass} style={{ color: "#4a6b8c" }}>
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
            style={{ borderColor: errors.email ? "#B23A48" : "#EDEFF2", color: "#2E4659" }}
            aria-invalid={!!errors.email}
          />
          {errors.email?.[0] && <span className={errorClass} style={{ color: "#B23A48" }}>{errors.email[0]}</span>}
        </div>

        <div>
          <label htmlFor={`${instanceId}-whatsapp`} className={labelClass} style={{ color: "#4a6b8c" }}>
            Telefone (WhatsApp)
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
            style={{ borderColor: errors.whatsapp ? "#B23A48" : "#EDEFF2", color: "#2E4659" }}
            aria-invalid={!!errors.whatsapp}
          />
          {errors.whatsapp?.[0] && <span className={errorClass} style={{ color: "#B23A48" }}>{errors.whatsapp[0]}</span>}
        </div>

        <div>
          <label htmlFor={`${instanceId}-faixa`} className={labelClass} style={{ color: "#4a6b8c" }}>
            Capital disponível para investir <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 500, color: "#9BA8B5" }}>(opcional)</span>
          </label>
          <select
            id={`${instanceId}-faixa`}
            name="faixa"
            defaultValue=""
            className={`${inputClass} appearance-none`}
            style={{ borderColor: errors.faixa ? "#B23A48" : "#EDEFF2", color: "#2E4659" }}
            aria-invalid={!!errors.faixa}
          >
            <option value="">Prefiro informar na conversa</option>
            {SPECIAL_FAIXAS.filter((f) => f !== "Prefiro informar na conversa").map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          {errors.faixa?.[0] && <span className={errorClass} style={{ color: "#B23A48" }}>{errors.faixa[0]}</span>}
        </div>

        <label className="flex items-start gap-3 text-[0.8rem] leading-[1.5]" style={{ color: "#6B7B8D" }}>
          <input type="checkbox" required className="mt-1 shrink-0 accent-[#4a6b8c]" />
          <span>{SPECIAL_CONSENT_TEXT}</span>
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
          {pending ? "Enviando…" : "Quero conhecer"}
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p className="text-[0.75rem] leading-relaxed text-center" style={{ color: "#9BA8B5" }}>
          Conversa reservada, sem compromisso de investir. Apresentamos a tese, a
          estrutura e os riscos antes de qualquer decisão.
        </p>
      </form>
    </div>
  );
}
