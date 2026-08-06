const required = (key: string) => {
  const val = process.env[key] ?? "";
  if (!val && process.env.NODE_ENV === "production") {
    console.error(`[env] ${key} ausente em produção`);
  }
  return val;
};

export const env = {
  RESEND_API_KEY: required("RESEND_API_KEY"),
  RESEND_FROM_DOMAIN: process.env.RESEND_FROM_DOMAIN ?? "midlejcapital.com.br",
  LEAD_EMAIL: process.env.LEAD_EMAIL ?? "contato@midlejcapital.com.br",
  // OPCIONAL: id da Audience do Resend que armazena os inscritos da Carta
  // Midlej. Fica vazio até o Lucas criar a Audience no painel e setar a
  // variável na Vercel. Enquanto vazio, a inscrição é registrada apenas por
  // e-mail (fallback em submitNewsletterForm) — nada se perde. Não é
  // obrigatória: ausência não quebra o build.
  RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID ?? "",
};
