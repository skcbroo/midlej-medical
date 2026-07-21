/* ================================================================
   Fonte única de números do painel. Editar SÓ este arquivo.

   REGRA: nada estimado. Indicador sem medição recebe `null` e a
   interface mostra o estado ("sem meta definida", "coletando",
   "falta input") — nunca um número inferido.

   ⚠️ METAS: só a da carteira (25% a.a.) foi definida pelo Lucas.
   As demais estão como `null` à espera dos valores. Enquanto forem
   null, os gráficos de desvio mostram apenas o realizado e avisam
   que não há alvo para comparar.
   ================================================================ */

export const ATUALIZADO = "21/jul 2026";
export const PERIODO = "26/jun – 21/jul 2026";

/* ── Metas ─────────────────────────────────────────────────────── */
export type Metas = {
  /** por mês, salvo indicação contrária */
  investimentoMkt: number | null;
  leadsQualificados: number | null;
  agendamentos: number | null;
  fechamentos: number | null;
  faturamento: number | null;
  custoPorLead: number | null;
  roi: number | null; // ex.: 3 = 3x
};

export const METAS: Metas = {
  investimentoMkt: null,
  leadsQualificados: null,
  agendamentos: null,
  fechamentos: null,
  faturamento: null,
  custoPorLead: null,
  roi: null,
};

/* ── Série mensal — a espinha de todos os gráficos ─────────────── */
export type Mes = {
  rotulo: string;
  investimento: number;
  cliques: number;
  leads: number;        // contatos reais
  qualificados: number; // = foram para reunião
  agendamentos: number;
  fechamentos: number;
  faturamento: number;
};

export const SERIE: Mes[] = [
  { rotulo: "jun/26", investimento: 115.92, cliques: 14, leads: 0, qualificados: 0, agendamentos: 0, fechamentos: 0, faturamento: 0 },
  { rotulo: "jul/26", investimento: 1084.08, cliques: 168, leads: 2, qualificados: 0, agendamentos: 0, fechamentos: 0, faturamento: 0 },
];

/** Períodos mínimos para o desvio-padrão dizer alguma coisa. */
export const MIN_PERIODOS_DP = 3;

/* ── Carteira proprietária ─────────────────────────────────────── */
export type PontoCarteira = { rotulo: string; saldo: number };

export const CARTEIRA = {
  estrategia: "Buy and Hold",
  descricao:
    "Aporte estável, retorno reinvestido e horizonte longo. Em vez de tentar acertar o momento de entrada, a estratégia deixa o tempo trabalhar: o capital permanece investido e o retorno passa a render sobre si mesmo.",
  inicio: "21/07/2026",
  metaAnual: 0.25, // 25% a.a. — única meta já definida
  /** ⚠️ falta o Lucas informar */
  valorInvestido: null as number | null,
  saldoAtual: null as number | null,
  /** série de saldo ao longo do tempo — começa vazia (partimos hoje) */
  historico: [] as PontoCarteira[],
  /** referência histórica da mesma estratégia, já publicada na /raiox */
  referencia: {
    retorno: 0.2306,
    benchmark: "166,90% do CDI",
    periodo: "31/07/2025 a 10/07/2026",
  },
};

/* ── Bloqueio operacional (aparece no topo de todas as páginas) ── */
export const BLOQUEIO: { titulo: string; texto: string } | null = {
  titulo: "Veiculação bloqueada.",
  texto:
    "O Google exige concluir a verificação do anunciante para continuar exibindo anúncios. Enquanto isso não for feito (exige 2FA), o funil não recebe entrada nova e nenhum número de aquisição se move.",
};

/* ── Perdas — agregado, sem detalhe de terceiros ───────────────── */
export const PERDAS = [
  { etapa: "Pré-venda", qtd: 2, de: 2, motivo: "Sem fit de perfil para a consultoria" },
];

/* ── Inputs pendentes ──────────────────────────────────────────── */
export const INPUTS = [
  { input: "Metas de mkt e comercial", destrava: "Todos os gráficos de desvio", quem: "Lucas", critico: true },
  { input: "Verificação do anunciante", destrava: "Veiculação — todo o funil", quem: "Lucas (2FA)", critico: true },
  { input: "Valor investido na carteira", destrava: "Retorno e desvio da carteira", quem: "Lucas", critico: true },
  { input: "Agendamentos / dia", destrava: "MQL, custo por MQL, show rate", quem: "Lucas (offline)", critico: false },
  { input: "Receita por origem", destrava: "ROI e ROAS por canal", quem: "Lucas / GA4", critico: false },
  { input: "Patrimônio médio + retenção", destrava: "LTV", quem: "Lucas / CRM", critico: false },
];

/* ── Derivadas ─────────────────────────────────────────────────── */
export const soma = (k: keyof Omit<Mes, "rotulo">) =>
  SERIE.reduce((a, m) => a + m[k], 0);

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: v >= 100 ? 0 : 2 });

/** Desvio-padrão amostral. `null` quando não há períodos suficientes. */
export function desvioPadrao(vals: number[]): number | null {
  if (vals.length < MIN_PERIODOS_DP) return null;
  const m = vals.reduce((a, b) => a + b, 0) / vals.length;
  const v = vals.reduce((a, b) => a + (b - m) ** 2, 0) / (vals.length - 1);
  return Math.sqrt(v);
}

/** Distância até a meta. `null` se não há meta definida. */
export function desvioDaMeta(real: number, meta: number | null) {
  if (meta === null || meta === 0) return null;
  return { abs: real - meta, pct: (real - meta) / meta, atingido: real / meta };
}
