export interface CalcFundoParams {
  capitalDebenture: number;
  taxaFunding: number;
  taxaDebenture: number;
  prazoDebenture: number;
  desagio: number;
  prazoProcesso: number;
  taxaOriginacao: number;
  modalidadeJuros: "final" | "semestral";
}

export interface CicloItem {
  numero: number;
  mesInicio: number;
  mesFim: number;
  cessao: number;
  recebimento: number;
  lucroBruto: number;
  originacao: number;
  lucroLiquido: number;
  lucroAcumulado: number;
}

export interface ProjecaoMensalFundo {
  mes: number;
  montanteDebenture: number;
  jurosAcumulados: number;
  jurosPagosTotal: number;
  lucroAcumulado: number;
  saldo: number;
  cicloAtivo: number | null;
  fimCiclo: boolean;
  pagamentoJuros: boolean;
  valorPagamento: number;
}

export interface CalcFundoResult {
  capitalDebenture: number;
  feeFunding: number;
  capitalDisponivel: number;
  nCiclos: number;
  mesesOciosos: number;
  prazoProcesso: number;
  cessaoCiclo: number;
  recebimentoCiclo: number;
  lucroBrutoCiclo: number;
  originacaoCiclo: number;
  lucroLiquidoCiclo: number;
  lucroTotalCiclos: number;
  originacaoTotal: number;
  fatorDebenture: number;
  montanteDebenture: number;
  jurosDebenture: number;
  custoTotalDebenture: number;
  resultadoLiquido: number;
  viavel: boolean;
  roiSobreCapital: number;
  roiSobreCusto: number | null;
  ciclos: CicloItem[];
  projecaoMensal: ProjecaoMensalFundo[];
  jurosSemestral: number;
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

export function calcularFundo(p: CalcFundoParams): CalcFundoResult {
  const tf  = p.taxaFunding / 100;
  const td  = p.taxaDebenture / 100;
  const des = p.desagio / 100;
  const to  = p.taxaOriginacao / 100;

  const feeFunding        = p.capitalDebenture * tf;
  const capitalDisponivel = p.capitalDebenture - feeFunding;
  const nCiclos           = Math.floor(p.prazoDebenture / p.prazoProcesso);
  const mesesOciosos      = p.prazoDebenture - nCiclos * p.prazoProcesso;

  const cessaoCiclo       = capitalDisponivel;
  const recebimentoCiclo  = des > 0 ? capitalDisponivel / (1 - des) : capitalDisponivel;
  const lucroBrutoCiclo   = recebimentoCiclo - cessaoCiclo;
  const originacaoCiclo   = cessaoCiclo * to;
  const lucroLiquidoCiclo = lucroBrutoCiclo - originacaoCiclo;
  const lucroTotalCiclos  = nCiclos > 0 ? lucroLiquidoCiclo * nCiclos : 0;
  const originacaoTotal   = originacaoCiclo * nCiclos;

  const fatorDebenture   = Math.pow(1 + td, p.prazoDebenture);
  const jurosDebenture   = calcJuros(p.capitalDebenture, td, p.prazoDebenture, p.modalidadeJuros);
  const montanteDebenture = p.capitalDebenture + jurosDebenture;
  const custoTotalDebenture = feeFunding + jurosDebenture;

  const resultadoLiquido = lucroTotalCiclos - custoTotalDebenture;
  const viavel           = resultadoLiquido > 0;
  const roiSobreCapital  = (resultadoLiquido / p.capitalDebenture) * 100;
  const roiSobreCusto    = custoTotalDebenture > 0 ? (resultadoLiquido / custoTotalDebenture) * 100 : null;

  const jurosSemestral = p.capitalDebenture * (Math.pow(1 + td, 6) - 1);

  const ciclos: CicloItem[] = [];
  for (let i = 0; i < nCiclos; i++) {
    ciclos.push({ numero: i + 1, mesInicio: i * p.prazoProcesso + 1, mesFim: (i + 1) * p.prazoProcesso, cessao: cessaoCiclo, recebimento: recebimentoCiclo, lucroBruto: lucroBrutoCiclo, originacao: originacaoCiclo, lucroLiquido: lucroLiquidoCiclo, lucroAcumulado: lucroLiquidoCiclo * (i + 1) });
  }

  const projecaoMensal: ProjecaoMensalFundo[] = [];
  for (let m = 1; m <= p.prazoDebenture; m++) {
    const ciclosCompletos = Math.min(Math.floor(m / p.prazoProcesso), nCiclos);
    const lucroAcumulado  = ciclosCompletos * lucroLiquidoCiclo;
    const cicloAtivo      = Math.ceil(m / p.prazoProcesso);

    let montanteMes: number;
    let jurosAcumulados: number;
    let jurosPagosTotal: number;
    let pagamentoJuros: boolean;
    let valorPagamento: number;

    if (p.modalidadeJuros === "semestral") {
      const monthInPeriod  = ((m - 1) % 6) + 1;
      const isPaymentMonth = (m % 6 === 0) || m === p.prazoDebenture;
      const jurosCurrentPeriod = p.capitalDebenture * (Math.pow(1 + td, monthInPeriod) - 1);

      if (isPaymentMonth) {
        jurosPagosTotal = calcJuros(p.capitalDebenture, td, m, "semestral");
        valorPagamento  = jurosCurrentPeriod;
        montanteMes     = p.capitalDebenture; // after payment, reset to principal
        jurosAcumulados = 0;
      } else {
        const semCompletedBefore = Math.floor((m - 1) / 6);
        jurosPagosTotal = semCompletedBefore * jurosSemestral;
        valorPagamento  = 0;
        montanteMes     = p.capitalDebenture + jurosCurrentPeriod;
        jurosAcumulados = jurosCurrentPeriod;
      }
      pagamentoJuros = isPaymentMonth;
    } else {
      montanteMes     = p.capitalDebenture * Math.pow(1 + td, m);
      jurosAcumulados = montanteMes - p.capitalDebenture;
      jurosPagosTotal = 0;
      pagamentoJuros  = false;
      valorPagamento  = 0;
    }

    const saldo = lucroAcumulado - jurosPagosTotal - jurosAcumulados - feeFunding;

    projecaoMensal.push({ mes: m, montanteDebenture: montanteMes, jurosAcumulados, jurosPagosTotal, lucroAcumulado, saldo, cicloAtivo: cicloAtivo <= nCiclos ? cicloAtivo : null, fimCiclo: m % p.prazoProcesso === 0 && cicloAtivo <= nCiclos, pagamentoJuros, valorPagamento });
  }

  return { capitalDebenture: p.capitalDebenture, feeFunding, capitalDisponivel, nCiclos, mesesOciosos, prazoProcesso: p.prazoProcesso, cessaoCiclo, recebimentoCiclo, lucroBrutoCiclo, originacaoCiclo, lucroLiquidoCiclo, lucroTotalCiclos, originacaoTotal, fatorDebenture, montanteDebenture, jurosDebenture, custoTotalDebenture, resultadoLiquido, viavel, roiSobreCapital, roiSobreCusto, ciclos, projecaoMensal, jurosSemestral };
}
