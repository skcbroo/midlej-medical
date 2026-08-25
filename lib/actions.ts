"use server";

import { Resend } from "resend";
import {
  LeadSchema,
  RaioXLeadSchema,
  raioxScore,
  BlindagemLeadSchema,
  blindagemScore,
  ObjetivosLeadSchema,
  objetivosScore,
  ExFindosLeadSchema,
  NewsletterSchema,
  CONSENT_TEXT,
} from "./leadSchema";
import {
  RAIOX_CONSENT_TEXT,
  BLINDAGEM_CONSENT_TEXT,
  OBJETIVOS_CONSENT_TEXT,
  EXFINDOS_CONSENT_TEXT,
  NEWSLETTER_CONSENT_TEXT,
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
   LP /objetivos — Planejamento orientado a objetivos de vida
   Captura direta: nome + WhatsApp + patrimônio + experiência.
   ───────────────────────────────────────────────────────── */

export type ObjetivosFormState =
  | { kind: "idle" }
  | { kind: "success" }
  | {
      kind: "error";
      message?: string;
      fields?: Partial<Record<string, string[]>>;
      values?: {
        name: string;
        whatsapp: string;
        patrimonio: string;
        experiencia: string;
      };
    };

function readObjetivosValues(formData: FormData) {
  return {
    name: (formData.get("name") ?? "").toString(),
    whatsapp: (formData.get("whatsapp") ?? "").toString(),
    patrimonio: (formData.get("patrimonio") ?? "").toString(),
    experiencia: (formData.get("experiencia") ?? "").toString(),
  };
}

const OBJETIVOS_SCORE_LABEL: Record<"A" | "B" | "C", string> = {
  A: "A · QUENTE — WhatsApp humano em até 15 min",
  B: "B · MORNO — WhatsApp em até 2 h",
  C: "C · FRIO — automação + material educativo",
};

export async function submitObjetivosLead(
  _prev: ObjetivosFormState,
  formData: FormData,
): Promise<ObjetivosFormState> {
  const honeypot = (formData.get("website") ?? "").toString();
  if (honeypot.length > 0) return { kind: "success" };

  const values = readObjetivosValues(formData);
  const parsed = ObjetivosLeadSchema.safeParse(values);

  if (!parsed.success) {
    return {
      kind: "error",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    };
  }

  const { name, whatsapp, patrimonio, experiencia } = parsed.data;
  const score = objetivosScore(parsed.data);

  try {
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `Midlej Site <onboarding@${env.RESEND_FROM_DOMAIN}>`,
      to: env.LEAD_EMAIL,
      subject: `Objetivos · Lead ${score} — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F5F7FA;border-radius:12px">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#B89840">Novo lead · Planejamento orientado a objetivos</p>
          <h2 style="margin:0 0 8px;font-size:22px;color:#2E4659">${name}</h2>
          <p style="margin:0 0 24px;display:inline-block;padding:6px 12px;border-radius:6px;background:#2E4659;color:#fff;font-size:12px;font-weight:700">${OBJETIVOS_SCORE_LABEL[score]}</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D;width:130px">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${whatsapp}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">Patrimônio investido</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${patrimonio}</td></tr>
            <tr><td style="padding:10px 0;font-size:12px;color:#6B7B8D">Já investiu antes?</td><td style="padding:10px 0;font-size:15px;font-weight:600;color:#2E4659">${experiencia}</td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:11px;color:#9BA8B5">${OBJETIVOS_CONSENT_TEXT}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[submitObjetivosLead] resend error", JSON.stringify(error));
      return { kind: "error", message: "Algo deu errado. Tente novamente em instantes." };
    }

    return { kind: "success" };
  } catch (err) {
    console.error("[submitObjetivosLead] resend unreachable", err instanceof Error ? err.message : err);
    return { kind: "error", message: "Não conseguimos enviar agora. Tente novamente em instantes." };
  }
}

/* ─────────────────────────────────────────────────────────
   LP /exercicios-findos — Antecipação de exercícios findos
   Captura direta: nome + WhatsApp + órgão/secretaria + ano(s).
   Servidor público do DF. Cessão de crédito — NÃO é investimento.
   ───────────────────────────────────────────────────────── */

export type ExFindosFormState =
  | { kind: "idle" }
  | { kind: "success" }
  | {
      kind: "error";
      message?: string;
      fields?: Partial<Record<string, string[]>>;
      values?: {
        name: string;
        whatsapp: string;
        orgao: string;
        ano: string;
      };
    };

function readExFindosValues(formData: FormData) {
  return {
    name: (formData.get("name") ?? "").toString(),
    whatsapp: (formData.get("whatsapp") ?? "").toString(),
    orgao: (formData.get("orgao") ?? "").toString(),
    ano: (formData.get("ano") ?? "").toString(),
  };
}

export async function submitExFindosLead(
  _prev: ExFindosFormState,
  formData: FormData,
): Promise<ExFindosFormState> {
  const honeypot = (formData.get("website") ?? "").toString();
  if (honeypot.length > 0) return { kind: "success" };

  const values = readExFindosValues(formData);
  const parsed = ExFindosLeadSchema.safeParse(values);

  if (!parsed.success) {
    return {
      kind: "error",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    };
  }

  const { name, whatsapp, orgao, ano } = parsed.data;

  try {
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `Midlej Site <onboarding@${env.RESEND_FROM_DOMAIN}>`,
      to: env.LEAD_EMAIL,
      subject: `Exercícios findos (DF) · Novo lead — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F5F7FA;border-radius:12px">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#B89840">Novo lead · Antecipação de exercícios findos (DF)</p>
          <h2 style="margin:0 0 24px;font-size:22px;color:#2E4659">${name}</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D;width:150px">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${whatsapp}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">Órgão / Secretaria</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${orgao}</td></tr>
            <tr><td style="padding:10px 0;font-size:12px;color:#6B7B8D">Ano(s) dos exercícios findos</td><td style="padding:10px 0;font-size:15px;font-weight:600;color:#2E4659">${ano}</td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:11px;color:#9BA8B5">${EXFINDOS_CONSENT_TEXT}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[submitExFindosLead] resend error", JSON.stringify(error));
      return { kind: "error", message: "Algo deu errado. Tente novamente em instantes." };
    }

    return { kind: "success" };
  } catch (err) {
    console.error("[submitExFindosLead] resend unreachable", err instanceof Error ? err.message : err);
    return { kind: "error", message: "Não conseguimos enviar agora. Tente novamente em instantes." };
  }
}

/* ─────────────────────────────────────────────────────────
   LP /carta — Carta Midlej (newsletter de mercado)
   Topo de funil: inscrição na leitura semanal (nome + e-mail).
   Persistência em dois passos, tolerante a config faltando:
     1) Se RESEND_AUDIENCE_ID existir, grava o contato na Audience.
     2) SEMPRE dispara um e-mail de registro para LEAD_EMAIL como
        fallback — assim nenhum inscrito se perde antes da Audience
        existir. Só retorna erro ao usuário se ESTE e-mail falhar.
   ───────────────────────────────────────────────────────── */

export type NewsletterFormState =
  | { kind: "idle" }
  | { kind: "success" }
  | {
      kind: "error";
      message?: string;
      fields?: Partial<Record<string, string[]>>;
      values?: { name: string; email: string; whatsapp: string };
    };

function readNewsletterValues(formData: FormData) {
  return {
    name: (formData.get("name") ?? "").toString(),
    email: (formData.get("email") ?? "").toString(),
    whatsapp: (formData.get("whatsapp") ?? "").toString(),
  };
}

export async function submitNewsletterForm(
  _prev: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const honeypot = (formData.get("website") ?? "").toString();
  if (honeypot.length > 0) return { kind: "success" };

  const values = readNewsletterValues(formData);
  const parsed = NewsletterSchema.safeParse(values);

  if (!parsed.success) {
    return {
      kind: "error",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    };
  }

  const { name, email, whatsapp } = parsed.data;
  const firstName = name.split(/\s+/)[0] ?? name;

  const resend = new Resend(env.RESEND_API_KEY);

  // Passo 1 (best-effort): grava na Audience do Resend se configurada.
  // Falha aqui NÃO é erro pro usuário — o passo 2 garante o registro.
  // O telefone segue no e-mail de registro (passo 2) de todo modo; aqui
  // ele é anexado ao firstName porque a API de contatos do Resend não
  // tem campo de telefone dedicado — assim o número não se perde na lista.
  if (env.RESEND_AUDIENCE_ID) {
    try {
      const { error } = await resend.contacts.create({
        audienceId: env.RESEND_AUDIENCE_ID,
        email,
        firstName: `${firstName} · ${whatsapp}`,
        unsubscribed: false,
      });
      if (error) {
        console.error("[submitNewsletterForm] audience error", JSON.stringify(error));
      }
    } catch (err) {
      console.error(
        "[submitNewsletterForm] audience unreachable",
        err instanceof Error ? err.message : err,
      );
    }
  }

  // Passo 2 (obrigatório): e-mail de registro. É o que garante que a
  // inscrição chegue mesmo sem Audience configurada.
  try {
    const { error } = await resend.emails.send({
      from: `Midlej Site <onboarding@${env.RESEND_FROM_DOMAIN}>`,
      to: env.LEAD_EMAIL,
      subject: "Nova inscrição — Carta Midlej",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#F5F7FA;border-radius:12px">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#B89840">Nova inscrição</p>
          <h2 style="margin:0 0 24px;font-size:22px;color:#2E4659">Carta Midlej</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D;width:90px">Nome</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:12px;color:#6B7B8D">E-mail</td><td style="padding:10px 0;border-bottom:1px solid #EDEFF2;font-size:15px;font-weight:600;color:#2E4659">${email}</td></tr>
            <tr><td style="padding:10px 0;font-size:12px;color:#6B7B8D">WhatsApp</td><td style="padding:10px 0;font-size:15px;font-weight:600;color:#2E4659">${whatsapp}</td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:11px;color:#9BA8B5">${NEWSLETTER_CONSENT_TEXT}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[submitNewsletterForm] resend error", JSON.stringify(error));
      return { kind: "error", message: "Algo deu errado. Tente novamente em instantes." };
    }

    return { kind: "success" };
  } catch (err) {
    console.error("[submitNewsletterForm] resend unreachable", err instanceof Error ? err.message : err);
    return { kind: "error", message: "Não conseguimos enviar agora. Tente novamente em instantes." };
  }
}
