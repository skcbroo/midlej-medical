export interface CalcParams {
  valorRecebimento: number;
  valorCessao: number;
  prazo: number;
  taxaOriginacao: number;
  taxaFunding: number;
  taxaDebenture: number;
  modalidadeJuros: "final" | "semestral";
  identificacao?: string;
}

export interface ProjecaoMes {
  mes: number;
  montanteDebenture: number;
  jurosAcumulados: number;
  jurosPagosTotal: number;
  custoTotal: number;
  lucro: number;
  viavel: boolean;
  pagamentoJuros: boolean;
}

export interface CalcResult {
  valorRecebimento: number;
  valorCessao: number;
  desagio: number;
  comissaoOriginacao: number;
  comissaoFunding: number;
  totalFees: number;
  montanteDebenture: number;
  juroDebenture: number;
  totalCusto: number;
  lucro: number;
  roi: number | null;
  viavel: boolean;
  valorMaxCessao: number;
  percentualMaxCessao: number;
  projecao: ProjecaoMes[];
}

function calcJuros(principal: number, td: number, prazo: number, modalidade: "final" | "semestral"): number {
  if (modalidade === "semestral") {
    const jSem = principal * (Math.pow(1 + td, 6) - 1);
    const n = Math.floor(prazo / 6);
    const resto = prazo % 6;
    return n * jSem + (resto > 0 ? principal * (Math.pow(1 + td, resto) - 1) : 0);
  }
  return principal * (Math.pow(1 + td, prazo) - 1);
}

export function calcular(p: CalcParams): CalcResult {
  const to = p.taxaOriginacao / 100;
  const tf = p.taxaFunding / 100;
  const td = p.taxaDebenture / 100;

  const comissaoOriginacao = p.valorCessao * to;
  const comissaoFunding    = p.valorCessao * tf;
  const totalFees          = comissaoOriginacao + comissaoFunding;

  const juroDebenture     = calcJuros(p.valorCessao, td, p.prazo, p.modalidadeJuros);
  const montanteDebenture = p.valorCessao + juroDebenture;

  const totalCusto = montanteDebenture + totalFees;
  const lucro      = p.valorRecebimento - totalCusto;
  const desagio    = ((p.valorRecebimento - p.valorCessao) / p.valorRecebimento) * 100;
  const roi        = totalFees > 0 ? (lucro / totalFees) * 100 : null;

  // Break-even: valorRecebimento = valorMaxCessao * (fatorJuros + to + tf)
  // fatorJuros = montante/cessao = 1 + juros/cessao
  const juroFatorFinal    = Math.pow(1 + td, p.prazo);
  const juroFatorSem      = 1 + calcJuros(1, td, p.prazo, p.modalidadeJuros);
  const fatorTotal        = (p.modalidadeJuros === "semestral" ? juroFatorSem : juroFatorFinal) + to + tf;
  const valorMaxCessao    = p.valorRecebimento / fatorTotal;
  const percentualMaxCessao = (valorMaxCessao / p.valorRecebimento) * 100;

  const jSem = p.valorCessao * (Math.pow(1 + td, 6) - 1);

  const projecao: ProjecaoMes[] = [];
  for (let m = 1; m <= Math.max(p.prazo, 1); m++) {
    let montanteMes: number;
    let jurosAcumulados: number;
    let jurosPagosTotal: number;
    let pagamentoJuros: boolean;

    if (p.modalidadeJuros === "semestral") {
      const monthInPeriod = ((m - 1) % 6) + 1;
      const isPaymentMonth = (m % 6 === 0) || m === p.prazo;
      const semCompletedBefore = Math.floor((m - 1) / 6);
      const jurosCurrentPeriod = p.valorCessao * (Math.pow(1 + td, monthInPeriod) - 1);

      if (isPaymentMonth) {
        jurosPagosTotal = calcJuros(p.valorCessao, td, m, "semestral");
        montanteMes     = p.valorCessao; // after payment, back to principal
        jurosAcumulados = 0;
      } else {
        jurosPagosTotal = semCompletedBefore * jSem;
        montanteMes     = p.valorCessao + jurosCurrentPeriod;
        jurosAcumulados = jurosCurrentPeriod;
      }
      pagamentoJuros = isPaymentMonth;
    } else {
      montanteMes     = p.valorCessao * Math.pow(1 + td, m);
      jurosAcumulados = montanteMes - p.valorCessao;
      jurosPagosTotal = 0;
      pagamentoJuros  = false;
    }

    const custoTotalMes = montanteDebenture - juroDebenture + jurosPagosTotal + jurosAcumulados + totalFees;
    // = valorCessao + total_interest_cost_up_to_m + fees
    const lucroMes = p.valorRecebimento - (p.valorCessao + calcJuros(p.valorCessao, td, m, p.modalidadeJuros) + totalFees);

    projecao.push({
      mes: m,
      montanteDebenture: montanteMes,
      jurosAcumulados,
      jurosPagosTotal,
      custoTotal: custoTotalMes,
      lucro: lucroMes,
      viavel: lucroMes > 0,
      pagamentoJuros,
    });
  }

  return { valorRecebimento: p.valorRecebimento, valorCessao: p.valorCessao, desagio, comissaoOriginacao, comissaoFunding, totalFees, montanteDebenture, juroDebenture, totalCusto, lucro, roi, viavel: lucro > 0, valorMaxCessao, percentualMaxCessao, projecao };
}
