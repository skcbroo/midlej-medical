"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { EXFINDOS_CONSENT_TEXT } from "@/lib/leadConstants";
import { submitExFindosLead, type ExFindosFormState } from "@/lib/actions";
import { pushEvent } from "@/lib/analytics";

/**
 * Formulário de captação da LP /exercicios-findos.
 *
 * Antecipação de exercícios findos (cessão de crédito) para servidor
 * público do DF. NÃO é investimento — sem CVM, sem promessa de valor/prazo.
 *
 * Single-step (4 campos): nome + WhatsApp + órgão/secretaria + ano(s).
 * Sem multi-step: a LP é curta e de alta conversão.
 *
 * ⚠️ TRACKING — não quebrar:
 *   - `lead_form_submit` (mesmo evento das outras LPs, escutado pelo GTM →
 *     conversão Google Ads) dispara no sucesso, com form_page distinto.
 *   - `exfindos_form_start` dispara no 1º focus de qualquer campo.
 */

const initial: ExFindosFormState = { kind: "idle" };

function maskWhatsapp(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function ExFindosForm({ instanceId = "exf" }: { instanceId?: string }) {
  const [state, action, pending] = useActionState(submitExFindosLead, initial);
  const startedRef = useRef(false);

  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [orgao, setOrgao] = useState("");
  const [ano, setAno] = useState("");
  const [done, setDone] = useState(false);

  function handleFormStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    pushEvent("exfindos_form_start", { form_page: "exercicios-findos" });
  }

  useEffect(() => {
    if (state.kind === "success" && !done) {
      // Evento canônico do funil — GTM → Google Ads. Mesmo nome das outras LPs.
      pushEvent("lead_form_submit", { form_page: "exercicios-findos" });
      setDone(true);
    }
  }, [state, done]);

  const cardClass = "rounded-2xl bg-white border border-[#EDEFF2] p-6 md:p-8 shadow-sm";
  const labelClass = "text-[0.7rem] font-semibold tracking-widest uppercase mb-2 block";
  const inputClass =
    "w-full text-[1.0625rem] py-3 px-4 rounded-lg border bg-white focus:outline-none transition-colors duration-200";
  const errorClass = "block mt-1.5 text-[0.78rem] font-semibold";

  const errors = state.kind === "error" ? state.fields ?? {} : {};

  /* ── Tela de sucesso ── */
  if (done) {
    return (
      <div role="status" aria-live="polite" className={cardClass}>
        <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "#B89840" }}>
          Recebido ✓
        </p>
        <h3 className="text-[clamp(1.375rem,2.4vw,1.75rem)] font-bold leading-tight mb-4" style={{ color: "#2E4659" }}>
          Pronto. Já recebemos os seus dados.
        </h3>
        <p className="text-[1rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
          Um especialista da Midlej vai te chamar no <strong style={{ color: "#2E4659" }}>WhatsApp</strong> para
          analisar o seu caso e explicar como funciona a antecipação. Deixe o telefone por perto.
        </p>
      </div>
    );
  }

  /* ── Formulário (single-step) ── */
  return (
    <div className={cardClass}>
      <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-2" style={{ color: "#4a6b8c" }}>
        Peça a análise do seu caso
      </p>
      <h3 className="text-[clamp(1.25rem,2.2vw,1.5rem)] font-bold leading-snug mb-2" style={{ color: "#2E4659" }}>
        Receba agora, sem esperar anos.
      </h3>
      <p className="text-[0.95rem] leading-[1.55] mb-6" style={{ color: "#6B7B8D" }}>
        Preencha e a Midlej analisa quanto do seu crédito pode ser antecipado à vista.
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
          <label htmlFor={`${instanceId}-whatsapp`} className={labelClass} style={{ color: "#4a6b8c" }}>
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
            placeholder="(61) 91234-5678"
            className={inputClass}
            style={{ borderColor: errors.whatsapp ? "#B23A48" : "#EDEFF2", color: "#2E4659" }}
            aria-invalid={!!errors.whatsapp}
          />
          {errors.whatsapp?.[0] && <span className={errorClass} style={{ color: "#B23A48" }}>{errors.whatsapp[0]}</span>}
        </div>

        <div>
          <label htmlFor={`${instanceId}-orgao`} className={labelClass} style={{ color: "#4a6b8c" }}>
            Órgão ou secretaria
          </label>
          <input
            id={`${instanceId}-orgao`}
            name="orgao"
            type="text"
            required
            value={orgao}
            onChange={(e) => setOrgao(e.target.value)}
            placeholder="Ex.: Secretaria de Saúde do DF"
            className={inputClass}
            style={{ borderColor: errors.orgao ? "#B23A48" : "#EDEFF2", color: "#2E4659" }}
            aria-invalid={!!errors.orgao}
          />
          {errors.orgao?.[0] && <span className={errorClass} style={{ color: "#B23A48" }}>{errors.orgao[0]}</span>}
        </div>

        <div>
          <label htmlFor={`${instanceId}-ano`} className={labelClass} style={{ color: "#4a6b8c" }}>
            Ano(s) dos exercícios findos
          </label>
          <input
            id={`${instanceId}-ano`}
            name="ano"
            type="text"
            required
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            placeholder="Ex.: 2016 (ou não sei ao certo)"
            className={inputClass}
            style={{ borderColor: errors.ano ? "#B23A48" : "#EDEFF2", color: "#2E4659" }}
            aria-invalid={!!errors.ano}
          />
          {errors.ano?.[0] && <span className={errorClass} style={{ color: "#B23A48" }}>{errors.ano[0]}</span>}
        </div>

        <label className="flex items-start gap-3 text-[0.8rem] leading-[1.5]" style={{ color: "#6B7B8D" }}>
          <input type="checkbox" required className="mt-1 shrink-0 accent-[#4a6b8c]" />
          <span>{EXFINDOS_CONSENT_TEXT}</span>
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
          {pending ? "Enviando…" : "Quero antecipar meu crédito"}
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p className="text-[0.75rem] leading-relaxed text-center" style={{ color: "#9BA8B5" }}>
          Sem compromisso. O valor da antecipação depende da análise do seu caso e é
          formalizado por contrato de cessão de crédito.
        </p>
      </form>
    </div>
  );
}
