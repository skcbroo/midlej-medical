"use server";

import { Resend } from "resend";
import {
  LeadSchema,
  RaioXLeadSchema,
  raioxScore,
  BlindagemLeadSchema,
  blindagemScore,
  CONSENT_TEXT,
} from "./leadSchema";
import { RAIOX_CONSENT_TEXT, BLINDAGEM_CONSENT_TEXT } from "./leadConstants";
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

  try {
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `Midlej Site <onboarding@${env.RESEND_FROM_DOMAIN}>`,
      to: env.LEAD_EMAIL,
      subject: `Raio-X da Carteira · Lead ${score} — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F5F7FA;border-radius:12px">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#B89840">Novo lead · Raio-X da Carteira</p>
          <h2 style="margin:0 0 8px;font-size:22px;color:#2E4659">${name}</h2>
          <p style="margin:0 0 24px;display:inline-block;padding:6px 12px;border-radius:6px;background:#2E4659;color:#fff;font-size:12px;font-weight:700">${SCORE_LABEL[score]}</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D;width:130px">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${whatsapp}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">E-mail</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">Situação</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${situacao}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">Patrimônio</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${patrimonio}</td></tr>
            <tr><td style="padding:10px 0;font-size:12px;color:#6B7B8D">Profissão</td><td style="padding:10px 0;font-size:15px;font-weight:600;color:#2E4659">${profissao}</td></tr>
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
