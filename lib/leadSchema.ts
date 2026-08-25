// Server-only by convention: only imported by `lib/actions.ts` (a "use server"
// file). Don't import from client components or zod will be bundled there.
import { z } from "zod";
import {
  BR_UFS,
  RAIOX_SITUACOES,
  RAIOX_PATRIMONIOS,
  RAIOX_PROFISSOES,
  BLINDAGEM_MOTIVACOES,
  BLINDAGEM_FAIXAS,
  BLINDAGEM_HORIZONTES,
  OBJETIVOS_PATRIMONIOS,
  OBJETIVOS_EXPERIENCIAS,
} from "./leadConstants";

export { CONSENT_TEXT } from "./leadConstants";

const nome = z
  .string()
  .trim()
  .min(2, "Nome muito curto")
  .max(80, "Nome muito longo")
  .regex(/^[\p{L}\s'.-]+$/u, "Use apenas letras");

const whatsapp = z
  .string()
  .trim()
  .regex(/^[\d\s()\-+]+$/, "Telefone inválido")
  .refine((s) => {
    const digits = s.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 11;
  }, "Use DDD + número");

export const LeadSchema = z.object({
  name: nome,
  estado: z.enum(BR_UFS, { message: "Selecione seu estado" }),
  whatsapp,
});

export type LeadInput = z.infer<typeof LeadSchema>;

// Lead da LP /raiox (Raio-X da Carteira): form de qualificação multi-step.
// Coleta situação, faixa de patrimônio e profissão para rotear atendimento.
export const RaioXLeadSchema = z.object({
  name: nome,
  whatsapp,
  email: z.string().trim().email("E-mail inválido").max(120),
  situacao: z.enum(RAIOX_SITUACOES, { message: "Selecione uma opção" }),
  // Qualificação OPCIONAL (CRO): capturamos o contato primeiro — menos
  // fricção para o lead de alta intenção — e enriquecemos patrimônio/
  // profissão depois, na tela de sucesso. "" (não informado) → undefined.
  patrimonio: z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    z.enum(RAIOX_PATRIMONIOS, { message: "Selecione uma faixa" }).optional(),
  ),
  profissao: z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    z.enum(RAIOX_PROFISSOES, { message: "Selecione uma opção" }).optional(),
  ),
});

export type RaioXLeadInput = z.infer<typeof RaioXLeadSchema>;

/**
 * Score de qualificação (Seção 5 do plano) — roteia a velocidade do
 * atendimento, NÃO exclui ninguém. A = quente (WhatsApp em 15 min),
 * B = morno (até 2 h), C = frio (automação + material).
 */
export function raioxScore(lead: RaioXLeadInput): "A" | "B" | "C" {
  const { patrimonio, situacao } = lead;
  const altaIntencao =
    situacao === "Estou insatisfeito com meu banco ou assessor" ||
    situacao === "Recebi herança ou liquidez recente";

  if (patrimonio === "R$ 1 a 5 milhões" || patrimonio === "Acima de R$ 5 milhões") {
    return "A";
  }
  if (patrimonio === "R$ 300 mil a R$ 1 milhão") {
    return altaIntencao ? "A" : "B";
  }
  if (!patrimonio) {
    // Lead capturado antes da qualificação (faixa ainda não informada):
    // prioriza pela intenção da situação. O enriquecimento recalcula.
    return altaIntencao ? "B" : "C";
  }
  return "C"; // Até R$ 300 mil
}

/* ─────────────────────────────────────────────────────────
   LP /blindagem — Proteção patrimonial internacional (dólar)
   Form de qualificação: motivação → faixa → horizonte → dados.
   ───────────────────────────────────────────────────────── */

export const BlindagemLeadSchema = z.object({
  name: nome,
  whatsapp,
  email: z.string().trim().email("E-mail inválido").max(120),
  motivacao: z.enum(BLINDAGEM_MOTIVACOES, { message: "Selecione uma opção" }),
  faixa: z.enum(BLINDAGEM_FAIXAS, { message: "Selecione uma faixa" }),
  horizonte: z.enum(BLINDAGEM_HORIZONTES, { message: "Selecione uma opção" }),
});

export type BlindagemLeadInput = z.infer<typeof BlindagemLeadSchema>;

/* ─────────────────────────────────────────────────────────
   LP /objetivos — Planejamento orientado a objetivos de vida
   Captura direta de 4 campos (todos obrigatórios): nome +
   WhatsApp + patrimônio investido + experiência prévia.
   ───────────────────────────────────────────────────────── */

export const ObjetivosLeadSchema = z.object({
  name: nome,
  whatsapp,
  patrimonio: z.enum(OBJETIVOS_PATRIMONIOS, { message: "Selecione uma faixa" }),
  experiencia: z.enum(OBJETIVOS_EXPERIENCIAS, { message: "Selecione uma opção" }),
});

export type ObjetivosLeadInput = z.infer<typeof ObjetivosLeadSchema>;

/**
 * Score de atendimento da /objetivos. A = quente, B = morno, C = frio.
 * Roteia a velocidade do contato; não exclui ninguém. Faixa de patrimônio
 * é o principal driver; a experiência prévia desempata.
 */
export function objetivosScore(lead: ObjetivosLeadInput): "A" | "B" | "C" {
  const { patrimonio, experiencia } = lead;
  if (patrimonio === "Acima de R$ 1M" || patrimonio === "R$ 500k–1M") return "A";
  if (patrimonio === "R$ 200k–500k") {
    return experiencia === "Já diversifiquei" ? "A" : "B";
  }
  if (patrimonio === "R$ 50k–200k") return "B";
  return "C"; // Até R$ 50k
}

/* ─────────────────────────────────────────────────────────
   LP /exercicios-findos — Antecipação de exercícios findos
   Captura direta (4 campos, single-step): nome + WhatsApp +
   órgão/secretaria + ano(s) dos exercícios findos. Órgão e ano
   são texto livre — a secretaria varia e o ano pode ser múltiplo
   ou incerto ("2016", "2012 e 2015", "não sei ao certo").
   ───────────────────────────────────────────────────────── */

export const ExFindosLeadSchema = z.object({
  name: nome,
  whatsapp,
  orgao: z
    .string()
    .trim()
    .min(2, "Informe o órgão ou secretaria")
    .max(120, "Muito longo"),
  ano: z
    .string()
    .trim()
    .min(2, "Informe o ano dos exercícios findos")
    .max(60, "Muito longo"),
});

export type ExFindosLeadInput = z.infer<typeof ExFindosLeadSchema>;

/* ─────────────────────────────────────────────────────────
   LP /carta — Carta Midlej (newsletter de mercado)
   Topo de funil: só o essencial (nome + e-mail) para reduzir
   fricção. Não é lead qualificado — é inscrição na leitura semanal.
   ───────────────────────────────────────────────────────── */

export const NewsletterSchema = z.object({
  name: nome,
  email: z.string().trim().email("E-mail inválido").max(120),
  whatsapp,
});

export type NewsletterInput = z.infer<typeof NewsletterSchema>;

/**
 * Score de atendimento da /blindagem. A = quente, B = morno, C = frio.
 * Roteia a velocidade do contato; não exclui ninguém. Faixa de patrimônio
 * é o principal driver — é um produto internacional de ticket relevante.
 */
export function blindagemScore(lead: BlindagemLeadInput): "A" | "B" | "C" {
  const { faixa } = lead;
  if (faixa === "R$ 2 a 10 milhões" || faixa === "Acima de R$ 10 milhões") {
    return "A";
  }
  if (faixa === "R$ 500 mil a R$ 2 milhões") return "B";
  return "C"; // Começando a estruturar / até R$ 500 mil
}
