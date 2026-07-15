// Server-only by convention: only imported by `lib/actions.ts` (a "use server"
// file). Don't import from client components or zod will be bundled there.
import { z } from "zod";
import {
  BR_UFS,
  RAIOX_SITUACOES,
  RAIOX_PATRIMONIOS,
  RAIOX_PROFISSOES,
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
  patrimonio: z.enum(RAIOX_PATRIMONIOS, { message: "Selecione uma faixa" }),
  profissao: z.enum(RAIOX_PROFISSOES, { message: "Selecione uma opção" }),
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
  return "C"; // Até R$ 300 mil
}
