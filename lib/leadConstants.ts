// Constants shared between client (LeadForm) and server (LeadSchema).
// Kept zod-free so importing from the client doesn't pull zod into the bundle.

export const BR_UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

export type BrUf = (typeof BR_UFS)[number];

// Snapshot stored with each lead in the backend for legal record.
// Kept brief on purpose — the page is not LGPD-heavy.
export const CONSENT_TEXT =
  "Ao enviar, autorizo a Midlej Capital a entrar em contato pelo WhatsApp informado sobre a mentoria e o envio deste material.";

export const MIDLEJ_WHATSAPP_NUMBER = "5561983015739";
export const MIDLEJ_WHATSAPP_HREF = `https://wa.me/${MIDLEJ_WHATSAPP_NUMBER}`;

// Canal de contato da LP /plenomed (teste: somente WhatsApp).
// Mensagem pré-preenchida exigida pelo briefing; URL-encode no link.
export const PLENOMED_WHATSAPP_MESSAGE =
  "Olá! Sou médico(a) e quero avaliar a proteção do meu patrimônio.";
export const PLENOMED_WHATSAPP_HREF = `${MIDLEJ_WHATSAPP_HREF}?text=${encodeURIComponent(
  PLENOMED_WHATSAPP_MESSAGE,
)}`;

// Canal de contato da LP /consorcio (teste: somente WhatsApp).
export const CONSORCIO_WHATSAPP_MESSAGE =
  "Olá! Quero entender como usar consórcio para alavancar meu patrimônio em imóveis e ativos reais.";
export const CONSORCIO_WHATSAPP_HREF = `${MIDLEJ_WHATSAPP_HREF}?text=${encodeURIComponent(
  CONSORCIO_WHATSAPP_MESSAGE,
)}`;
