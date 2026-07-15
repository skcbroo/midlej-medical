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

export const MIDLEJ_WHATSAPP_NUMBER = "5561996204646";
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

// Canal de contato da LP /cfo (servidores públicos — somente WhatsApp).
export const CFO_WHATSAPP_MESSAGE =
  "Olá! Sou servidor público e quero transformar minha estabilidade em patrimônio e renda para o futuro. Quero avaliar meu planejamento com a Midlej.";
export const CFO_WHATSAPP_HREF = `${MIDLEJ_WHATSAPP_HREF}?text=${encodeURIComponent(
  CFO_WHATSAPP_MESSAGE,
)}`;

// Canal de contato da LP /raiox (investimentos — WhatsApp + formulário).
export const RAIOX_WHATSAPP_MESSAGE =
  "Olá! Tenho um valor para investir e quero fazer o Raio-X gratuito da minha carteira com a Midlej.";
export const RAIOX_WHATSAPP_HREF = `${MIDLEJ_WHATSAPP_HREF}?text=${encodeURIComponent(
  RAIOX_WHATSAPP_MESSAGE,
)}`;

/* ─────────────────────────────────────────────────────────
   LP /raiox — Raio-X da Carteira (form de qualificação)
   Opções compartilhadas entre o form (client) e o schema (server).
   Mantidas zod-free aqui de propósito.
   ───────────────────────────────────────────────────────── */

// Situação atual do investidor (1ª pergunta do form multi-step).
export const RAIOX_SITUACOES = [
  "Já invisto e quero uma segunda opinião",
  "Recebi herança ou liquidez recente",
  "Estou insatisfeito com meu banco ou assessor",
  "Quero começar a organizar meu patrimônio",
] as const;
export type RaioxSituacao = (typeof RAIOX_SITUACOES)[number];

// Faixa de patrimônio investido (ou a investir). Usada apenas para
// ROTEAR o atendimento (score interno) — NÃO é barreira de exclusão:
// o público é qualquer pessoa com capacidade de contratar consultoria.
export const RAIOX_PATRIMONIOS = [
  "Até R$ 300 mil",
  "R$ 300 mil a R$ 1 milhão",
  "R$ 1 a 5 milhões",
  "Acima de R$ 5 milhões",
] as const;
export type RaioxPatrimonio = (typeof RAIOX_PATRIMONIOS)[number];

export const RAIOX_PROFISSOES = [
  "Médico(a)",
  "Servidor(a) público",
  "Empresário(a)",
  "Aposentado(a)",
  "Outra",
] as const;
export type RaioxProfissao = (typeof RAIOX_PROFISSOES)[number];

// Consentimento específico do Raio-X (form pede e-mail além de WhatsApp).
export const RAIOX_CONSENT_TEXT =
  "Autorizo a Midlej Capital a entrar em contato pelo WhatsApp e e-mail informados sobre o Raio-X da Carteira e concordo com a Política de Privacidade.";
