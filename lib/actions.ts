"use server";

import { Resend } from "resend";
import {
  LeadSchema,
  RaioXLeadSchema,
  raioxScore,
  BlindagemLeadSchema,
  blindagemScore,
  LegacyLeadSchema,
  legacyScore,
  CONSENT_TEXT,
} from "./leadSchema";
import {
  RAIOX_CONSENT_TEXT,
  BLINDAGEM_CONSENT_TEXT,
  LEGACY_CONSENT_TEXT,
} from "./leadConstants";
import { env } from "./env";

export type LeadFormState =
  | { kind: "idle" }
  | { kind: "success" }
  | {
      kind: "error";
      message?: string;
      fields?: Partial<Record<string, string[]>>;
      values?: {
        name: string;
        estado: string;
        whatsapp: string;
      };
    };

function readValues(formData: FormData) {
  return {
    name: (formData.get("name") ?? "").toString(),
    estado: (formData.get("estado") ?? "").toString(),
    whatsapp: (formData.get("whatsapp") ?? "").toString(),
  };
}

function readOrigin(formData: FormData): string {
  const raw = (formData.get("origin") ?? "").toString().trim();
  return raw ? raw.slice(0, 120) : "Site Midlej";
}

export async function submitLeadForm(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const honeypot = (formData.get("website") ?? "").toString();
  if (honeypot.length > 0) return { kind: "success" };

  const values = readValues(formData);
  const parsed = LeadSchema.safeParse(values);

  if (!parsed.success) {
    return {
      kind: "error",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    };
  }

  const origin = readOrigin(formData);
  const { name, estado, whatsapp } = parsed.data;

  try {
    const resend = new Resend(env.RESEND_API_KEY);


    const { error } = await resend.emails.send({
      from: `Midlej Site <onboarding@${env.RESEND_FROM_DOMAIN}>`,
      to: env.LEAD_EMAIL,
      subject: `Novo lead — ${origin}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#F5F7FA;border-radius:12px">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#B89840">Novo lead</p>
          <h2 style="margin:0 0 24px;font-size:22px;color:#2E4659">${origin}</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D;width:110px">Nome</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${whatsapp}</td></tr>
            <tr><td style="padding:10px 0;font-size:12px;color:#6B7B8D">Estado</td><td style="padding:10px 0;font-size:15px;font-weight:600;color:#2E4659">${estado}</td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:11px;color:#9BA8B5">${CONSENT_TEXT}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[submitLeadForm] resend error", JSON.stringify(error));
      return { kind: "error", message: "Algo deu errado. Tente novamente em instantes." };
    }

    return { kind: "success" };
  } catch (err) {
    console.error("[submitLeadForm] resend unreachable", err instanceof Error ? err.message : err);
    return { kind: "error", message: "Não conseguimos enviar agora. Tente novamente em instantes." };
  }
}

/* ─────────────────────────────────────────────────────────
   LP /raiox — Raio-X da Carteira (form de qualificação)
   ───────────────────────────────────────────────────────── */

export type RaioXFormState =
  | { kind: "idle" }
  | { kind: "success" }
  | {
      kind: "error";
      message?: string;
      fields?: Partial<Record<string, string[]>>;
      values?: {
        name: string;
        whatsapp: string;
        email: string;
        situacao: string;
        patrimonio: string;
        profissao: string;
      };
    };

function readRaioXValues(formData: FormData) {
  return {
    name: (formData.get("name") ?? "").toString(),
    whatsapp: (formData.get("whatsapp") ?? "").toString(),
    email: (formData.get("email") ?? "").toString(),
    situacao: (formData.get("situacao") ?? "").toString(),
    patrimonio: (formData.get("patrimonio") ?? "").toString(),
    profissao: (formData.get("profissao") ?? "").toString(),
  };
}

// Prioridade de atendimento por score, exibida no e-mail para o time.
const SCORE_LABEL: Record<"A" | "B" | "C", string> = {
  A: "A · QUENTE — WhatsApp humano em até 15 min",
  B: "B · MORNO — WhatsApp em até 2 h",
  C: "C · FRIO — automação + material educativo",
};

export async function submitRaioXLead(
  _prev: RaioXFormState,
  formData: FormData,
): Promise<RaioXFormState> {
  const honeypot = (formData.get("website") ?? "").toString();
  if (honeypot.length > 0) return { kind: "success" };

  const values = readRaioXValues(formData);
  const parsed = RaioXLeadSchema.safeParse(values);

  if (!parsed.success) {
    return {
      kind: "error",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    };
  }

  const { name, whatsapp, email, situacao, patrimonio, profissao } = parsed.data;
  const score = raioxScore(parsed.data);
  // Enriquecido = já veio com a qualificação (patrimônio/profissão) preenchida
  // na tela de sucesso. Captura = 1º envio, só com contato + situação.
  const enriched = Boolean(patrimonio || profissao);

  try {
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `Midlej Site <onboarding@${env.RESEND_FROM_DOMAIN}>`,
      to: env.LEAD_EMAIL,
      subject: `Raio-X da Carteira · Lead ${score} — ${name}${enriched ? " · atualizado" : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F5F7FA;border-radius:12px">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#B89840">${enriched ? "Lead qualificado (atualizado)" : "Novo lead · aguardando qualificação"} · Raio-X da Carteira</p>
          <h2 style="margin:0 0 8px;font-size:22px;color:#2E4659">${name}</h2>
          <p style="margin:0 0 24px;display:inline-block;padding:6px 12px;border-radius:6px;background:#2E4659;color:#fff;font-size:12px;font-weight:700">${SCORE_LABEL[score]}</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D;width:130px">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${whatsapp}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">E-mail</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">Situação</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${situacao}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">Patrimônio</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${patrimonio || "— a confirmar"}</td></tr>
            <tr><td style="padding:10px 0;font-size:12px;color:#6B7B8D">Profissão</td><td style="padding:10px 0;font-size:15px;font-weight:600;color:#2E4659">${profissao || "— a confirmar"}</td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:11px;color:#9BA8B5">${RAIOX_CONSENT_TEXT}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[submitRaioXLead] resend error", JSON.stringify(error));
      return { kind: "error", message: "Algo deu errado. Tente novamente em instantes." };
    }

    return { kind: "success" };
  } catch (err) {
    console.error("[submitRaioXLead] resend unreachable", err instanceof Error ? err.message : err);
    return { kind: "error", message: "Não conseguimos enviar agora. Tente novamente em instantes." };
  }
}

/* ─────────────────────────────────────────────────────────
   LP /blindagem — Proteção patrimonial internacional (dólar)
   ───────────────────────────────────────────────────────── */

export type BlindagemFormState =
  | { kind: "idle" }
  | { kind: "success" }
  | {
      kind: "error";
      message?: string;
      fields?: Partial<Record<string, string[]>>;
      values?: {
        name: string;
        whatsapp: string;
        email: string;
        motivacao: string;
        faixa: string;
        horizonte: string;
      };
    };

function readBlindagemValues(formData: FormData) {
  return {
    name: (formData.get("name") ?? "").toString(),
    whatsapp: (formData.get("whatsapp") ?? "").toString(),
    email: (formData.get("email") ?? "").toString(),
    motivacao: (formData.get("motivacao") ?? "").toString(),
    faixa: (formData.get("faixa") ?? "").toString(),
    horizonte: (formData.get("horizonte") ?? "").toString(),
  };
}

const BLINDAGEM_SCORE_LABEL: Record<"A" | "B" | "C", string> = {
  A: "A · QUENTE — WhatsApp humano em até 15 min",
  B: "B · MORNO — WhatsApp em até 2 h",
  C: "C · FRIO — automação + material educativo",
};

export async function submitBlindagemLead(
  _prev: BlindagemFormState,
  formData: FormData,
): Promise<BlindagemFormState> {
  const honeypot = (formData.get("website") ?? "").toString();
  if (honeypot.length > 0) return { kind: "success" };

  const values = readBlindagemValues(formData);
  const parsed = BlindagemLeadSchema.safeParse(values);

  if (!parsed.success) {
    return {
      kind: "error",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    };
  }

  const { name, whatsapp, email, motivacao, faixa, horizonte } = parsed.data;
  const score = blindagemScore(parsed.data);

  try {
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `Midlej Site <onboarding@${env.RESEND_FROM_DOMAIN}>`,
      to: env.LEAD_EMAIL,
      subject: `Proteção internacional · Lead ${score} — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F5F7FA;border-radius:12px">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#B89840">Novo lead · Proteção internacional</p>
          <h2 style="margin:0 0 8px;font-size:22px;color:#2E4659">${name}</h2>
          <p style="margin:0 0 24px;display:inline-block;padding:6px 12px;border-radius:6px;background:#2E4659;color:#fff;font-size:12px;font-weight:700">${BLINDAGEM_SCORE_LABEL[score]}</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D;width:130px">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${whatsapp}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">E-mail</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">Motivação</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${motivacao}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">Faixa</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${faixa}</td></tr>
            <tr><td style="padding:10px 0;font-size:12px;color:#6B7B8D">Horizonte</td><td style="padding:10px 0;font-size:15px;font-weight:600;color:#2E4659">${horizonte}</td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:11px;color:#9BA8B5">${BLINDAGEM_CONSENT_TEXT}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[submitBlindagemLead] resend error", JSON.stringify(error));
      return { kind: "error", message: "Algo deu errado. Tente novamente em instantes." };
    }

    return { kind: "success" };
  } catch (err) {
    console.error("[submitBlindagemLead] resend unreachable", err instanceof Error ? err.message : err);
    return { kind: "error", message: "Não conseguimos enviar agora. Tente novamente em instantes." };
  }
}

/* ─────────────────────────────────────────────────────────
   LP /legacy — Midlej Legacy (patrimônio destinado a filhos)
   ───────────────────────────────────────────────────────── */

export type LegacyFormState =
  | { kind: "idle" }
  | { kind: "success" }
  | {
      kind: "error";
      message?: string;
      fields?: Partial<Record<string, string[]>>;
      values?: {
        name: string;
        whatsapp: string;
        email: string;
        idadeFilho: string;
        aporte: string;
      };
    };

function readLegacyValues(formData: FormData) {
  return {
    name: (formData.get("name") ?? "").toString(),
    whatsapp: (formData.get("whatsapp") ?? "").toString(),
    email: (formData.get("email") ?? "").toString(),
    idadeFilho: (formData.get("idadeFilho") ?? "").toString(),
    aporte: (formData.get("aporte") ?? "").toString(),
  };
}

/* O SLA publicado na página é de 5 MINUTOS para todo lead (decisão do
   Lucas, 04/08/2026). O score não altera esse compromisso — ele só diz
   ao time o que esperar da conversa. Prometer 5 min na LP e responder
   em 2 h destrói o único ativo comercial novo que a página tem. */
const LEGACY_SCORE_LABEL: Record<"A" | "B" | "C", string> = {
  A: "A · Aporte declarado a partir de R$ 3.000/mês — capacidade de contratar o onboarding. RETORNO EM ATÉ 5 MIN (SLA publicado).",
  B: "B · Aporte declarado de R$ 1.000 a R$ 3.000/mês. RETORNO EM ATÉ 5 MIN (SLA publicado).",
  C: "C · Aporte declarado até R$ 1.000/mês. RETORNO EM ATÉ 5 MIN (SLA publicado).",
};

export async function submitLegacyLead(
  _prev: LegacyFormState,
  formData: FormData,
): Promise<LegacyFormState> {
  const honeypot = (formData.get("website") ?? "").toString();
  if (honeypot.length > 0) return { kind: "success" };

  const values = readLegacyValues(formData);
  const parsed = LegacyLeadSchema.safeParse(values);

  if (!parsed.success) {
    return {
      kind: "error",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    };
  }

  const { name, whatsapp, email, idadeFilho, aporte } = parsed.data;
  const score = legacyScore(parsed.data);

  try {
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `Midlej Site <onboarding@${env.RESEND_FROM_DOMAIN}>`,
      to: env.LEAD_EMAIL,
      subject: `Midlej Legacy · Lead ${score} — ${name} · responder em 5 min`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F5F7FA;border-radius:12px">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#B89840">Novo lead · Midlej Legacy</p>
          <h2 style="margin:0 0 8px;font-size:22px;color:#2E4659">${name}</h2>
          <p style="margin:0 0 20px;padding:10px 14px;border-radius:6px;background:#8B1E1E;color:#fff;font-size:13px;font-weight:700">SLA PUBLICADO NA PÁGINA: RETORNO EM ATÉ 5 MINUTOS</p>
          <p style="margin:0 0 24px;display:inline-block;padding:6px 12px;border-radius:6px;background:#2E4659;color:#fff;font-size:12px;font-weight:700">${LEGACY_SCORE_LABEL[score]}</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D;width:150px">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${whatsapp}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">E-mail</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">Idade do filho</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${idadeFilho}</td></tr>
            <tr><td style="padding:10px 0;font-size:12px;color:#6B7B8D">Aporte mensal</td><td style="padding:10px 0;font-size:15px;font-weight:600;color:#2E4659">${aporte}</td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#6B7B8D">Na primeira mensagem: identificar a consultoria e o número de registro, <strong>sem nomear indivíduo</strong>. Não citar rentabilidade, percentual nem ativo. Não oferecer holding, doação, previdência de menor ou seguro (fora de escopo). Encerrar com duas opções concretas de horário.</p>
          <p style="margin:16px 0 0;font-size:11px;color:#9BA8B5">${LEGACY_CONSENT_TEXT}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[submitLegacyLead] resend error", JSON.stringify(error));
      return { kind: "error", message: "Algo deu errado. Tente novamente em instantes." };
    }

    return { kind: "success" };
  } catch (err) {
    console.error("[submitLegacyLead] resend unreachable", err instanceof Error ? err.message : err);
    return { kind: "error", message: "Não conseguimos enviar agora. Tente novamente em instantes." };
  }
}
