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
};
