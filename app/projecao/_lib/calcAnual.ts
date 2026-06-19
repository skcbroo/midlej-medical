export interface CalcAnualParams {
  captacaoMensal: number;
  taxaFunding: number;
  percentualInutilizavel: number;
  desagio: number;
  prazoProcesso: number;
  taxaOriginacao: number;
  taxaDebenture: number;
  horizonte: number;
  modalidadeJuros: "final" | "semestral";
}

export interface MesAnual {
  mes: number;
  captado: number;
  feeFundingMes: number;
  capitalDisponivel: number;
  efetivo: number;
  ocioso: number;
  opsAtivas: number;
  portfolioEmAberto: number;
  completou: boolean;
  recebimentoMes: number;
  lucroMes: number;
  lucroAcumulado: number;
}

export interface CalcAnualResult {
  cessao: number;
  recebimento: number;
  lucroBruto: number;
  originacao: number;
  custoDebenture: number;
  lucroLiquido: number;
  viavelOp: boolean;
  feeFunding: number;
  capitalDisponivel: number;
  captacaoEfetiva: number;
  capitalOcioso: number;
  totalCaptado: number;
  totalFeeFunding: number;
  totalOcioso: number;
  totalInvestido: number;
  totalLucro: number;
  totalOpsCompletadas: number;
  roi: number;
  meses: MesAnual[];
}

function calcJuros(principal: number, td: number, prazo: number, modalidade: "final" | "semestral"): number {
  if (modalidade === "semestral") {
    const jSem = principal * (Math.pow(1 + td, 6) - 1);
    const n    = Math.floor(prazo / 6);
    const rest = prazo % 6;
    return n * jSem + (rest > 0 ? principal * (Math.pow(1 + td, rest) - 1) : 0);
  }
  return principal * (Math.pow(1 + td, prazo) - 1);
}

export function calcularAnual(p: CalcAnualParams): CalcAnualResult {
  const tf    = p.taxaFunding / 100;
  const pinut = p.percentualInutilizavel / 100;
  const des   = p.desagio / 100;
  const to    = p.taxaOriginacao / 100;
  const td    = p.taxaDebenture / 100;

  const feeFunding        = p.captacaoMensal * tf;
  const capitalDisponivel = p.captacaoMensal - feeFunding;
  const capitalOcioso     = capitalDisponivel * pinut;
  const captacaoEfetiva   = capitalDisponivel - capitalOcioso;

  const cessao        = captacaoEfetiva;
  const recebimento   = des > 0 ? cessao / (1 - des) : cessao;
  const lucroBruto    = recebimento - cessao;
  const originacao    = cessao * to;
  const custoDebenture = td > 0 ? calcJuros(cessao, td, p.prazoProcesso, p.modalidadeJuros) : 0;
  const lucroLiquido  = lucroBruto - originacao - custoDebenture;
  const viavelOp      = lucroLiquido > 0;

  const meses: MesAnual[] = [];
  let lucroAcumulado = 0;

  for (let m = 1; m <= p.horizonte; m++) {
    const opsAtivas         = Math.min(m, p.prazoProcesso);
    const portfolioEmAberto = opsAtivas * captacaoEfetiva;
    const completouEsseMes  = m > p.prazoProcesso;
    const lucroMes          = completouEsseMes ? lucroLiquido : 0;
    const recebimentoMes    = completouEsseMes ? recebimento : 0;
    lucroAcumulado += lucroMes;
    meses.push({ mes: m, captado: p.captacaoMensal, feeFundingMes: feeFunding, capitalDisponivel, efetivo: captacaoEfetiva, ocioso: capitalOcioso, opsAtivas, portfolioEmAberto, completou: completouEsseMes, recebimentoMes, lucroMes, lucroAcumulado });
  }

  const totalOpsCompletadas = Math.max(0, p.horizonte - p.prazoProcesso);
  const totalLucro          = lucroLiquido * totalOpsCompletadas;
  const totalCaptado        = p.captacaoMensal * p.horizonte;
  const totalFeeFunding     = feeFunding * p.horizonte;
  const totalOcioso         = capitalOcioso * p.horizonte;
  const totalInvestido      = captacaoEfetiva * p.horizonte;
  const roi                 = totalInvestido > 0 ? (totalLucro / totalInvestido) * 100 : 0;

  return { cessao, recebimento, lucroBruto, originacao, custoDebenture, lucroLiquido, viavelOp, feeFunding, capitalDisponivel, captacaoEfetiva, capitalOcioso, totalCaptado, totalFeeFunding, totalOcioso, totalInvestido, totalLucro, totalOpsCompletadas, roi, meses };
}
