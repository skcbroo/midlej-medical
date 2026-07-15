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
 * Formulário de qualificação da LP /raiox (Raio-X da Carteira).
 *
 * Multi-step (Seção 5 do plano): situação → patrimônio → profissão → dados.
 * Multi-step gera micro-compromissos e converte melhor que um form longo.
 * As escolhas dos passos 1–3 viajam como hidden inputs; só o passo 4 tem
 * o submit. Mede conversão SOMENTE em sucesso real (evento lead_form_submit).
 *
 * A faixa de patrimônio roteia o atendimento no servidor (score A/B/C) —
 * não é barreira: ninguém é excluído por patrimônio.
 */

const initial: RaioXFormState = { kind: "idle" };
const emptyVals = {
  name: "",
  whatsapp: "",
  email: "",
  situacao: "",
  patrimonio: "",
  profissao: "",
};

const TOTAL_STEPS = 4;

function maskWhatsapp(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const STEPS: {
  key: "situacao" | "patrimonio" | "profissao";
  label: string;
  question: string;
  options: readonly string[];
}[] = [
  {
    key: "situacao",
    label: "Sua situação",
    question: "Qual sua principal situação hoje?",
    options: RAIOX_SITUACOES,
  },
  {
    key: "patrimonio",
    label: "Patrimônio",
    question: "Faixa de patrimônio investido (ou a investir):",
    options: RAIOX_PATRIMONIOS,
  },
  {
    key: "profissao",
    label: "Perfil",
    question: "Como você se descreve?",
    options: RAIOX_PROFISSOES,
  },
];

export function RaioXForm() {
  const [state, action, pending] = useActionState(submitRaioXLead, initial);
  const [step, setStep] = useState(0); // 0..2 = escolhas; 3 = dados
  const [choices, setChoices] = useState({
    situacao: "",
    patrimonio: "",
    profissao: "",
  });
  const [wa, setWa] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  // Se o servidor rejeitar (whatsapp/e-mail inválidos), volta ao passo de dados.
  useEffect(() => {
    if (state.kind === "error") setStep(TOTAL_STEPS - 1);
  }, [state]);

  // Conversão medida só em sucesso real (não no clique, não em erro).
  useEffect(() => {
    if (state.kind === "success") {
      pushEvent("lead_form_submit", { form_page: "raiox" });
    }
  }, [state.kind]);

  function choose(key: "situacao" | "patrimonio" | "profissao", value: string) {
    setChoices((c) => ({ ...c, [key]: value }));
    const next = Math.min(step + 1, TOTAL_STEPS - 1);
    setStep(next);
    // Evento por etapa (Seção 10 da auditoria): mede o funil interno do form
    // no GTM/GA4 — em que passo o lead avança e onde abandona.
    pushEvent("raiox_form_step", { form_page: "raiox", step: step + 1, field: key });
    topRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  if (state.kind === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl bg-white border border-[#EDEFF2] p-8 md:p-10 shadow-sm">
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

  const errors = state.kind === "error" ? state.fields ?? {} : {};
  const values = state.kind === "error" ? state.values ?? emptyVals : emptyVals;
  const isDataStep = step === TOTAL_STEPS - 1;

  const labelClass = "text-[0.7rem] font-semibold tracking-widest uppercase mb-2 block";
  const inputClass =
    "w-full text-[1.0625rem] py-3 px-4 rounded-lg border bg-white focus:outline-none transition-colors duration-200";
  const errorClass = "block mt-1.5 text-[0.78rem] font-semibold";

  return (
    <div ref={topRef} className="rounded-2xl bg-white border border-[#EDEFF2] p-6 md:p-8 shadow-sm">
      {/* Progresso */}
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
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            className="ml-3 normal-case tracking-normal font-medium underline"
            style={{ color: "#4a6b8c" }}
          >
            voltar
          </button>
        )}
      </p>

      {/* Passos 1–3: escolhas */}
      {!isDataStep && (
        <div>
          <h3 className="text-[clamp(1.125rem,2vw,1.375rem)] font-bold leading-snug mb-5" style={{ color: "#2E4659" }}>
            {STEPS[step].question}
          </h3>
          <div className="flex flex-col gap-3">
            {STEPS[step].options.map((opt) => {
              const active = choices[STEPS[step].key] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => choose(STEPS[step].key, opt)}
                  className="text-left w-full rounded-lg border px-4 py-3.5 text-[0.95rem] font-medium transition-all duration-150 hover:border-[#4a6b8c] hover:bg-[#F5F7FA] flex items-center justify-between gap-3"
                  style={{
                    borderColor: active ? "#4a6b8c" : "#EDEFF2",
                    color: "#2E4659",
                    backgroundColor: active ? "#F5F7FA" : "#fff",
                  }}
                >
                  {opt}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color: "#4a6b8c", flexShrink: 0 }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              );
            })}
          </div>
          <p className="text-[0.78rem] leading-relaxed mt-5" style={{ color: "#9BA8B5" }}>
            Não solicitamos dados bancários, senhas ou extratos. Leva cerca de dois minutos.
          </p>
        </div>
      )}

      {/* Passo 4: dados de contato + submit */}
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
          {/* Escolhas dos passos anteriores */}
          <input type="hidden" name="situacao" value={choices.situacao} />
          <input type="hidden" name="patrimonio" value={choices.patrimonio} />
          <input type="hidden" name="profissao" value={choices.profissao} />

          <h3 className="text-[clamp(1.125rem,2vw,1.375rem)] font-bold leading-snug -mb-1" style={{ color: "#2E4659" }}>
            Para onde enviamos o retorno?
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
              defaultValue={values.name}
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
              value={wa || maskWhatsapp(values.whatsapp)}
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
              defaultValue={values.email}
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
        </form>
      )}
    </div>
  );
}
