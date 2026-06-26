"use server";

import { Resend } from "resend";
import { LeadSchema, CONSENT_TEXT } from "./leadSchema";
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
      from: `Midlej Site <leads@${env.RESEND_FROM_DOMAIN}>`,
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
      console.error("[submitLeadForm] resend error", error);
      return { kind: "error", message: "Algo deu errado. Tente novamente em instantes." };
    }

    return { kind: "success" };
  } catch (err) {
    console.error("[submitLeadForm] resend unreachable", err instanceof Error ? err.message : err);
    return { kind: "error", message: "Não conseguimos enviar agora. Tente novamente em instantes." };
  }
}
