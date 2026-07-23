import { Resend } from "resend";
import { env } from "@/lib/env";

/**
 * Captura de formulário INCOMPLETO da LP /raiox.
 *
 * O RaioXForm envia (via navigator.sendBeacon, no pagehide/visibilitychange)
 * um snapshot do que o visitante preencheu quando ele sai sem concluir o envio.
 * Só chega aqui quando há contato mínimo (WhatsApp ou e-mail). O lead COMPLETO
 * continua indo por submitRaioXLead — este endpoint é só a rede de resgate.
 *
 * Base legal do tratamento: definida internamente pela Midlej.
 */

export const runtime = "nodejs";

function clean(v: unknown, max: number): string {
  return (v ?? "")
    .toString()
    .slice(0, max)
    .trim()
    .replace(/[<>&]/g, (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"));
}

export async function POST(req: Request): Promise<Response> {
  // sendBeacon não lê a resposta — retornamos 204 em qualquer caminho.
  const ok = () => new Response(null, { status: 204 });

  try {
    const data = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!data || typeof data !== "object") return ok();

    // Honeypot (mesmo campo do form)
    if (clean(data.website, 1).length > 0) return ok();

    const name = clean(data.name, 120);
    const whatsapp = clean(data.whatsapp, 40);
    const email = clean(data.email, 160);
    const situacao = clean(data.situacao, 200);

    // Sem meio de contato não há o que resgatar.
    if (!whatsapp && !email) return ok();

    const resend = new Resend(env.RESEND_API_KEY);

    await resend.emails.send({
      from: `Midlej Site <onboarding@${env.RESEND_FROM_DOMAIN}>`,
      to: env.LEAD_EMAIL,
      subject: `Raio-X · LEAD INCOMPLETO${name ? ` — ${name}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#FFF6E9;border-radius:12px;border:1px solid #F0D9A8">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#B8860B">Lead incompleto · não finalizou o envio</p>
          <h2 style="margin:0 0 8px;font-size:22px;color:#2E4659">${name || "(sem nome)"}</h2>
          <p style="margin:0 0 20px;font-size:13px;line-height:1.5;color:#6B7B8D">Este visitante começou o Raio-X e saiu antes de concluir. Os dados abaixo são o que ele preencheu até sair — <strong>podem estar parciais ou não validados</strong>. Sugerido: retorno leve, sem assumir que ele concluiu o pedido.</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDE0C4;font-size:12px;color:#6B7B8D;width:130px">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #EDE0C4;font-size:15px;font-weight:600;color:#2E4659">${whatsapp || "—"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #EDE0C4;font-size:12px;color:#6B7B8D">E-mail</td><td style="padding:10px 0;border-bottom:1px solid #EDE0C4;font-size:15px;font-weight:600;color:#2E4659">${email || "—"}</td></tr>
            <tr><td style="padding:10px 0;font-size:12px;color:#6B7B8D">Situação</td><td style="padding:10px 0;font-size:15px;font-weight:600;color:#2E4659">${situacao || "—"}</td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:11px;color:#9BA8B5">Captura de formulário não finalizado (/raiox). Tratar conforme a política interna de dados da Midlej.</p>
        </div>
      `,
    });

    return ok();
  } catch (err) {
    console.error("[raiox-partial] error", err instanceof Error ? err.message : err);
    return ok();
  }
}
