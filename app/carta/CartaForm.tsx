"use client";

import { useActionState, useEffect } from "react";
import { NEWSLETTER_CONSENT_TEXT } from "@/lib/leadConstants";
import { submitNewsletterForm, type NewsletterFormState } from "@/lib/actions";
import { pushEvent } from "@/lib/analytics";

/**
 * Formulário de inscrição da Carta Midlej (newsletter de mercado).
 *
 * Topo de funil: só nome + e-mail, para reduzir fricção ao máximo.
 * Posta em `submitNewsletterForm` (Server Action), que grava na Audience
 * do Resend (quando configurada) e sempre dispara um e-mail de registro.
 *
 * No sucesso empurra `newsletter_signup` no dataLayer — evento próprio de
 * topo de funil, DISTINTO de `lead_form_submit` (que é lead qualificado).
 *
 * Renderiza sobre superfície ink (dark): tipografia Bricolage via classes
 * .t-*, inputs de aresta viva, botão quadrado, asterisco oxblood.
 */

const initial: NewsletterFormState = { kind: "idle" };
const emptyVals = { name: "", email: "" };
const FIELD_ORDER = ["name", "email"] as const;

export function CartaForm() {
  const [state, action, pending] = useActionState(submitNewsletterForm, initial);

  useEffect(() => {
    if (state.kind !== "error") return;
    const first = FIELD_ORDER.find((n) => state.fields?.[n]?.length);
    if (first) document.getElementById(`carta-${first}`)?.focus();
  }, [state]);

  // Mede a inscrição SOMENTE em sucesso real (não no clique nem em erro).
  useEffect(() => {
    if (state.kind === "success") {
      pushEvent("newsletter_signup");
    }
  }, [state.kind]);

  if (state.kind === "success") {
    return (
      <div role="status" aria-live="polite" className="text-on-ink-strong">
        <p
          className="t-mono text-[0.72rem] tracking-[0.18em] uppercase mb-4"
          style={{ color: "#B89840" }}
        >
          Inscrição confirmada
        </p>
        <p className="t-display text-[clamp(1.375rem,2.4vw,1.875rem)] leading-[1.08] max-w-[22ch]">
          Pronto. Você vai receber a próxima Carta Midlej no seu e-mail.
        </p>
        <p className="t-body text-[0.9375rem] leading-[1.6] mt-5 max-w-[40ch] text-on-ink-soft">
          A leitura chega toda semana. Pode cancelar quando quiser, direto no
          rodapé de qualquer edição.
        </p>
      </div>
    );
  }

  const errors = state.kind === "error" ? state.fields ?? {} : {};
  const values = state.kind === "error" ? state.values ?? emptyVals : emptyVals;

  const labelClass =
    "t-mono text-[0.72rem] tracking-[0.14em] uppercase text-on-ink-mute";
  const inputClass =
    "w-full t-body text-[1.0625rem] py-3 border-b border-line-on-ink bg-transparent text-on-ink-strong placeholder:text-on-ink-mute focus:outline-none focus:border-current transition-colors duration-200";
  const errorClass =
    "block mt-2 t-mono text-[0.72rem] tracking-[0.06em] uppercase text-emphasis";

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      {/* Honeypot anti-spam */}
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
        <label htmlFor="carta-name" className={labelClass}>
          Nome
        </label>
        <input
          id="carta-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={values.name}
          className={inputClass}
          aria-invalid={!!errors.name}
        />
        {errors.name?.[0] && <span className={errorClass}>{errors.name[0]}</span>}
      </div>

      <div>
        <label htmlFor="carta-email" className={labelClass}>
          E-mail
        </label>
        <input
          id="carta-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          defaultValue={values.email}
          placeholder="voce@email.com"
          className={inputClass}
          aria-invalid={!!errors.email}
        />
        {errors.email?.[0] && <span className={errorClass}>{errors.email[0]}</span>}
      </div>

      {state.kind === "error" && state.message && (
        <p className={errorClass}>{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary-inverse inline-flex items-center justify-center gap-2.5 disabled:opacity-50 mt-1 self-start"
      >
        {pending ? "Enviando…" : "Quero receber a Carta"}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
          <path
            d="M1 5h12m0 0L9 1m4 4L9 9"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
          />
        </svg>
      </button>

      <p className="t-body text-[0.78rem] leading-[1.55] mt-1 max-w-[46ch] text-on-ink-mute">
        <span className="asterisk" />
        {NEWSLETTER_CONSENT_TEXT}
      </p>
    </form>
  );
}
