/* ================================================================
   Fonte única de números do painel comercial.
   Editar SÓ este arquivo para atualizar o dashboard — o layout lê daqui.

   Regra: nada estimado. Um indicador que não foi medido recebe
   estado "aguarda" (a fórmula existe, falta N>0) ou "falta"
   (depende de dado que ninguém coleta ainda) — nunca um número
   inferido.
   ================================================================ */

export const PERIODO = "26/jun – 21/jul 2026";
export const ATUALIZADO = "21/jul 2026";

/** Bloqueio operacional exibido no topo. `null` esconde o alerta. */
export const BLOQUEIO: { titulo: string; texto: string } | null = {
  titulo: "Veiculação bloqueada.",
  texto:
    "O Google exige concluir a verificação do anunciante para continuar exibindo anúncios. Enquanto isso não for feito (exige 2FA — só o Lucas), o funil não recebe entrada nova e nenhum número abaixo se move.",
};

export type Estado = "medido" | "aguarda" | "falta";

export type Tile = {
  k: string;
  v: string;
  nota?: string;
  estado?: Estado;
  /** destaca o valor como crítico (ex.: uma etapa zerada do funil) */
  critico?: boolean;
};

/** Funil ponta a ponta. `conv` = conversão vindo da etapa anterior. */
export const FUNIL = [
  { etapa: "Cliques pagos", sub: "tráfego que chegou", valor: 182, conv: null, queda: false },
  { etapa: "Leads reais", sub: "e-mail + WhatsApp", valor: 2, conv: "1,1%", queda: true },
  { etapa: "Pré-venda feita", sub: "contato trabalhado", valor: 2, conv: "100%", queda: false },
  { etapa: "Reuniões agendadas", sub: "= lead qualificado", valor: 0, conv: "0%", queda: true },
  { etapa: "Ativações", sub: "cliente fechado", valor: 0, conv: "—", queda: false },
] as const;

export const PILAR_1: { titulo: string; sub: string; tiles: Tile[] } = {
  titulo: "Geração de demanda",
  sub: "Quanto custa trazer alguém e quantos viram contato. É o único pilar com volume suficiente para ler hoje.",
  tiles: [
    { k: "Investimento", v: "R$ 1.200", nota: "jun R$ 116 · jul R$ 1.084", estado: "medido" },
    { k: "Cliques", v: "182", nota: "4.284 impressões", estado: "medido" },
    { k: "CPC médio", v: "R$ 4,06", nota: "teto de lance R$ 14", estado: "medido" },
    { k: "Leads reais", v: "2", nota: "1 form + 1 WhatsApp", estado: "medido" },
    { k: "Custo por lead", v: "R$ 600", nota: "referência: onboarding R$ 6.000", estado: "medido" },
    { k: "Taxa clique → lead", v: "1,1%", nota: "2 em 182 cliques", estado: "medido" },
    { k: "Sessões no site", v: "42", nota: "pixel · 20–21/jul", estado: "medido" },
    { k: "Rolagem média", v: "37%", nota: "LP antiga · form a 87% da página", estado: "medido" },
    { k: "Viu o formulário", v: "12%", nota: "LP nova põe o form a 1,7% — em medição", estado: "medido" },
  ],
};

export const PILAR_2: { titulo: string; sub: string; tiles: Tile[] } = {
  titulo: "Agendamento",
  sub: "Do contato até a reunião marcada. Hoje é aqui que a operação para: 100% dos leads foram trabalhados e 100% caíram.",
  tiles: [
    { k: "Leads recebidos", v: "2", nota: "no período inteiro", estado: "medido" },
    { k: "Pré-vendas feitas", v: "2", nota: "100% dos leads trabalhados", estado: "medido" },
    { k: "Reuniões agendadas", v: "0", nota: "= leads qualificados (MQL)", estado: "medido", critico: true },
    { k: "Taxa lead → reunião", v: "0%", nota: "2 desqualificados de 2", estado: "medido", critico: true },
    { k: "Custo por MQL", v: "Sem MQL", estado: "aguarda" },
    { k: "Show rate", v: "Sem reunião", estado: "aguarda" },
  ],
};

/* Perdas — AGREGADO, por linha de corte.
   O painel está aberto ao público (decisão do Lucas, 21/07). O detalhe
   por lead descrevia a situação financeira de pessoas identificáveis que
   deixaram o contato com a Midlej — isso não vai para uma página pública,
   com ou sem nome. A informação gerencial (onde e por que caem) está
   preservada na forma agregada abaixo.
   O detalhe individual continua no registro interno do Lucas. */
export const PERDAS = [
  { etapa: "Pré-venda", qtd: 2, de: 2, motivo: "Sem fit de perfil para a consultoria" },
];

export const PILAR_3: { titulo: string; sub: string; tiles: Tile[] } = {
  titulo: "Fechamento",
  sub: "Da reunião ao cliente ativo. Ainda não começou — sem reunião não há fechamento, então todo indicador aqui está zerado por consequência, não por desempenho.",
  tiles: [
    { k: "Reuniões realizadas", v: "0", nota: "nenhuma agendada ainda", estado: "medido" },
    { k: "Propostas enviadas", v: "0", nota: "—", estado: "medido" },
    { k: "Ativações", v: "0", nota: "clientes fechados", estado: "medido" },
    { k: "Receita", v: "R$ 0", nota: "—", estado: "medido" },
    { k: "CAC", v: "Sem ativação", estado: "aguarda" },
    { k: "Ticket de referência", v: "R$ 6.000", nota: "onboarding + fee 1% a.a.", estado: "medido" },
    { k: "LTV", v: "Falta input", nota: "patrimônio médio + retenção", estado: "falta" },
    { k: "ROI / ROAS", v: "Falta input", nota: "receita por origem", estado: "falta" },
    { k: "Churn / NPS", v: "Falta input", nota: "base de clientes + pesquisa", estado: "falta" },
  ],
};

export const INPUTS: {
  input: string;
  destrava: string;
  quem: string;
  estado: Estado;
  rotulo: string;
}[] = [
  { input: "Verificação do anunciante", destrava: "Veiculação — todo o funil", quem: "Lucas (2FA)", estado: "falta", rotulo: "bloqueante" },
  { input: "Calls agendadas / dia", destrava: "MQL, custo por MQL, show rate", quem: "Lucas (offline)", estado: "aguarda", rotulo: "rotina diária" },
  { input: "Patrimônio médio + retenção", destrava: "LTV", quem: "Lucas / CRM", estado: "falta", rotulo: "pendente" },
  { input: "Receita por origem", destrava: "ROI, ROAS", quem: "Lucas / GA4", estado: "falta", rotulo: "pendente" },
  { input: "Base de clientes no tempo", destrava: "Churn", quem: "CRM", estado: "falta", rotulo: "pendente" },
  { input: "Pesquisa periódica", destrava: "NPS", quem: "Lucas", estado: "falta", rotulo: "pendente" },
  { input: "Eventos-chave no GA4", destrava: "Taxa de conversão do site, leads orgânicos", quem: "marcar após 1º disparo", estado: "aguarda", rotulo: "aguarda 1º lead" },
];
