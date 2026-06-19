"use client";
import { useState, useMemo } from "react";
import { calcularFundo } from "../_lib/calcFundo";
import { buildPdfFundoHtml, fmtBRL, fmtPct } from "../_lib/pdf";
import { FLabel, FSectionTitle, FCard, FInput, MetricCard, CostRow, ModalidadeToggle, parseNum } from "./shared";

const DEFAULTS = {
  capitalDebenture: "1000000",
  taxaFunding: "6.5",
  taxaDebenture: "1.8",
  prazoDebenture: "24",
  desagio: "20",
  prazoProcesso: "6",
  taxaOriginacao: "5",
  modalidadeJuros: "final" as "final" | "semestral",
};

export default function SimuladorFundo() {
  const [form, setForm] = useState(DEFAULTS);
  const set = (key: string) => (val: string) => setForm((f) => ({ ...f, [key]: val }));

  const params = useMemo(() => ({
    capitalDebenture: parseNum(form.capitalDebenture),
    taxaFunding: parseNum(form.taxaFunding),
    taxaDebenture: parseNum(form.taxaDebenture),
    prazoDebenture: Math.max(1, Math.round(parseNum(form.prazoDebenture))),
    desagio: parseNum(form.desagio),
    prazoProcesso: Math.max(1, Math.round(parseNum(form.prazoProcesso))),
    taxaOriginacao: parseNum(form.taxaOriginacao),
    modalidadeJuros: form.modalidadeJuros,
  }), [form]);

  const valid = params.capitalDebenture > 0 && params.desagio > 0 && params.desagio < 100;
  const resultado = useMemo(() => valid ? calcularFundo(params) : null, [params, valid]);
  const viavel = resultado?.viavel;
  const isSemestral = form.modalidadeJuros === "semestral";

  function handlePdf() {
    if (!resultado) return;
    const html = buildPdfFundoHtml(params, resultado);
    const w = window.open("", "_blank");
    if (!w) { alert("Pop-up bloqueado. Permita pop-ups para exportar PDF."); return; }
    w.document.write(html);
    w.document.close();
    setTimeout(() => { w.focus(); w.print(); }, 600);
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <div className="flex gap-6 items-start">

        {/* PAINEL ESQUERDO */}
        <div className="w-[300px] shrink-0 space-y-4">
          <FCard>
            <FSectionTitle>Debênture</FSectionTitle>
            <div className="space-y-3">
              <div>
                <FLabel>Capital emitido</FLabel>
                <FInput value={form.capitalDebenture} onChange={set("capitalDebenture")} prefix="R$" placeholder="1.000.000,00" currency />
              </div>
              <div>
                <FLabel>Fee de Funding</FLabel>
                <div className="text-[9px] text-[#9AA0B2] mb-1">Pago upfront sobre o capital captado</div>
                <FInput value={form.taxaFunding} onChange={set("taxaFunding")} suffix="%" placeholder="6.5" />
              </div>
              <div>
                <FLabel>Juro da Debênture</FLabel>
                <div className="text-[9px] text-[#9AA0B2] mb-1">Custo do capital (mensal composto)</div>
                <FInput value={form.taxaDebenture} onChange={set("taxaDebenture")} suffix="% a.m." placeholder="1.8" />
              </div>
              <div>
                <FLabel>Prazo da Debênture</FLabel>
                <FInput value={form.prazoDebenture} onChange={set("prazoDebenture")} suffix="meses" placeholder="24" />
              </div>
              <ModalidadeToggle
                value={form.modalidadeJuros}
                onChange={(v) => setForm((f) => ({ ...f, modalidadeJuros: v }))}
              />
              {isSemestral && resultado && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                  <div className="text-[9px] text-blue-600 uppercase tracking-wider font-semibold">Pagamento por semestre</div>
                  <div className="text-sm font-bold font-mono text-blue-700">{fmtBRL(resultado.jurosSemestral)}</div>
                  <div className="text-[9px] text-blue-500 mt-0.5">a cada 6 meses</div>
                </div>
              )}
            </div>
          </FCard>

          <FCard>
            <FSectionTitle>Operação — Ciclos de Compra</FSectionTitle>
            <div className="space-y-3">
              <div>
                <FLabel>Deságio médio dos processos</FLabel>
                <FInput value={form.desagio} onChange={set("desagio")} suffix="%" placeholder="20" />
              </div>
              <div>
                <FLabel>Prazo médio por ciclo</FLabel>
                <div className="text-[9px] text-[#9AA0B2] mb-1">Meses até receber o processo</div>
                <FInput value={form.prazoProcesso} onChange={set("prazoProcesso")} suffix="meses" placeholder="6" />
              </div>
              <div>
                <FLabel>Taxa de Originação por ciclo</FLabel>
                <div className="text-[9px] text-[#9AA0B2] mb-1">% sobre cessão, pago a cada compra</div>
                <FInput value={form.taxaOriginacao} onChange={set("taxaOriginacao")} suffix="%" placeholder="5" />
              </div>
            </div>
          </FCard>

          {resultado && (
            <div className="space-y-2">
              <div className="bg-white border border-[#E3E4E7] rounded-2xl shadow-sm p-4 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#9AA0B2]">Capital captado</span>
                  <span className="font-bold font-mono text-[#1F2A44]">{fmtBRL(resultado.capitalDebenture)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#9AA0B2]">(-) Fee funding</span>
                  <span className="font-bold font-mono text-red-600">−{fmtBRL(resultado.feeFunding)}</span>
                </div>
                <div className="border-t border-[#E3E4E7] pt-1.5 flex justify-between text-xs">
                  <span className="font-semibold text-[#1F2A44]">Capital disponível</span>
                  <span className="font-extrabold font-mono text-[#C4A664]">{fmtBRL(resultado.capitalDisponivel)}</span>
                </div>
              </div>
              <div className="bg-[#233853] rounded-2xl p-4 text-center">
                <div className="text-[9px] text-white/50 uppercase tracking-wider mb-1">Ciclos possíveis</div>
                <div className="text-4xl font-extrabold text-white">{resultado.nCiclos}</div>
                <div className="text-[10px] text-white/40 mt-1">
                  {params.prazoProcesso}m / ciclo &nbsp;•&nbsp; {resultado.mesesOciosos > 0 ? `${resultado.mesesOciosos}m ociosos` : "encaixe perfeito"}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handlePdf}
            disabled={!valid || !resultado}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#233853] text-white font-bold px-5 py-3 text-sm shadow-md hover:shadow-lg transition hover:bg-[#1a2a3d] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Exportar PDF / Imprimir
          </button>
        </div>

        {/* PAINEL DIREITO */}
        <div className="flex-1 space-y-5">
          {!valid && (
            <div className="bg-white border border-[#E3E4E7] rounded-2xl shadow-sm p-8 text-center">
              <div className="text-[#9AA0B2] text-sm">Preencha os parâmetros para visualizar a simulação.</div>
            </div>
          )}

          {valid && resultado && (
            <>
              <div className="border rounded-2xl p-5 shadow-sm" style={{ borderColor: viavel ? "#86efac" : "#fca5a5", background: viavel ? "#f0fdf4" : "#fff5f5" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: viavel ? "#15803d" : "#dc2626" }} />
                  <span className="text-lg font-extrabold tracking-wide" style={{ color: viavel ? "#15803d" : "#dc2626" }}>{viavel ? "OPERAÇÃO VIÁVEL" : "OPERAÇÃO INVIÁVEL"}</span>
                  {isSemestral && <span className="text-[10px] font-bold bg-[#233853] text-[#C4A664] rounded-full px-2.5 py-0.5 ml-auto">Juros semestrais</span>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[["Capital disponível", fmtBRL(resultado.capitalDisponivel)], ["Ciclos", `${resultado.nCiclos} ciclos`], ["Lucro / ciclo", fmtBRL(resultado.lucroLiquidoCiclo)], ["Custo debênture", fmtBRL(resultado.custoTotalDebenture)]].map(([l, v]) => (
                    <div key={l} className="bg-white/60 rounded-xl px-3 py-2 border border-white/80">
                      <div className="text-[9px] font-semibold text-[#9AA0B2] uppercase tracking-wider">{l}</div>
                      <div className="text-sm font-bold font-mono text-[#1F2A44] mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard label="Lucro Total (ciclos)" value={fmtBRL(resultado.lucroTotalCiclos)} sub={`${resultado.nCiclos} × ${fmtBRL(resultado.lucroLiquidoCiclo)}`} color="#15803d" />
                <MetricCard label="Resultado Líquido" value={fmtBRL(resultado.resultadoLiquido)} sub="Ciclos − custo debênture" color={viavel ? "#15803d" : "#dc2626"} />
                <MetricCard label="ROI s/ capital" value={fmtPct(resultado.roiSobreCapital)} sub="Resultado / capital emitido" color={resultado.roiSobreCapital >= 0 ? "#15803d" : "#dc2626"} />
                <MetricCard label="ROI s/ custos" value={resultado.roiSobreCusto != null ? fmtPct(resultado.roiSobreCusto) : "—"} sub="Resultado / fee + juros" color={resultado.roiSobreCusto != null && resultado.roiSobreCusto >= 0 ? "#C4A664" : "#dc2626"} />
              </div>

              <FCard>
                <FSectionTitle>Breakdown — Ciclos vs. Custo Debênture</FSectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <div>
                    <div className="text-[10px] font-bold text-[#C4A664] uppercase tracking-widest mb-2">Por Ciclo de Compra</div>
                    <CostRow label="Cessão (capital base)" value={fmtBRL(resultado.cessaoCiclo)} sub="Capital disponível após fee" />
                    <CostRow label="Recebimento" value={fmtBRL(resultado.recebimentoCiclo)} sub={`Deságio ${fmtPct(params.desagio)}`} />
                    <CostRow label="Lucro bruto" value={fmtBRL(resultado.lucroBrutoCiclo)} sub="Recebimento − cessão" valueColor="#15803d" />
                    <CostRow label="(−) Originação" value={fmtBRL(resultado.originacaoCiclo)} sub={`${fmtPct(params.taxaOriginacao)} s/ cessão`} valueColor="#dc2626" />
                    <CostRow label="Lucro líquido / ciclo" value={fmtBRL(resultado.lucroLiquidoCiclo)} highlight />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#C4A664] uppercase tracking-widest mb-2">Custo da Debênture</div>
                    <CostRow label="Capital captado" value={fmtBRL(resultado.capitalDebenture)} />
                    <CostRow label="Fee funding (upfront)" value={fmtBRL(resultado.feeFunding)} sub={`${fmtPct(params.taxaFunding)} pago no dia 0`} valueColor="#dc2626" />
                    <CostRow
                      label="Juros ao vencimento"
                      value={fmtBRL(resultado.jurosDebenture)}
                      sub={isSemestral
                        ? `${fmtPct(params.taxaDebenture)}/mês — pagamento semestral (${fmtBRL(resultado.jurosSemestral)}/sem.)`
                        : `${fmtPct(params.taxaDebenture)}/mês × ${params.prazoDebenture}m (bullet)`}
                      valueColor="#dc2626"
                    />
                    <CostRow label="Montante a pagar" value={fmtBRL(resultado.montanteDebenture)} sub="Principal + juros" />
                    <CostRow label="Custo total da operação" value={fmtBRL(resultado.custoTotalDebenture)} highlight sub="Fee + juros" />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E3E4E7]">
                  <div className="text-[10px] font-bold text-[#9AA0B2] uppercase tracking-wider text-center mb-3">Resultado Final — {params.prazoDebenture} meses</div>
                  <div className="flex items-stretch gap-2">
                    <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                      <div className="text-[9px] font-semibold text-green-600 uppercase tracking-wider mb-2">Lucro dos Ciclos</div>
                      <div className="text-lg font-extrabold font-mono text-green-700">{fmtBRL(resultado.lucroTotalCiclos)}</div>
                      <div className="text-[9px] text-green-500 mt-2">{resultado.nCiclos} ciclos × {fmtBRL(resultado.lucroLiquidoCiclo)}</div>
                    </div>
                    <div className="flex items-center text-2xl font-bold text-[#C4C7D0] px-1">−</div>
                    <div className="flex-1 bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                      <div className="text-[9px] font-semibold text-orange-600 uppercase tracking-wider mb-2">
                        Juros Debênture{isSemestral ? " (sem.)" : ""}
                      </div>
                      <div className="text-lg font-extrabold font-mono text-orange-700">{fmtBRL(resultado.jurosDebenture)}</div>
                      <div className="text-[9px] text-orange-400 mt-2">
                        {isSemestral
                          ? `${fmtBRL(resultado.jurosSemestral)}/semestre`
                          : `${fmtPct(params.taxaDebenture)}/mês × ${params.prazoDebenture}m`}
                      </div>
                    </div>
                    <div className="flex items-center text-2xl font-bold text-[#C4C7D0] px-1">−</div>
                    <div className="flex-1 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                      <div className="text-[9px] font-semibold text-red-500 uppercase tracking-wider mb-2">Fee Funding</div>
                      <div className="text-lg font-extrabold font-mono text-red-600">{fmtBRL(resultado.feeFunding)}</div>
                      <div className="text-[9px] text-red-400 mt-2">{fmtPct(params.taxaFunding)} · pago no dia 0</div>
                    </div>
                    <div className="flex items-center text-2xl font-bold text-[#C4C7D0] px-1">=</div>
                    <div className="flex-1 rounded-xl p-4 text-center border-2" style={{ background: viavel ? "#f0fdf4" : "#fff5f5", borderColor: viavel ? "#4ade80" : "#fca5a5" }}>
                      <div className="text-[9px] font-semibold uppercase tracking-wider mb-2" style={{ color: viavel ? "#15803d" : "#dc2626" }}>Resultado Líquido</div>
                      <div className="text-lg font-extrabold font-mono" style={{ color: viavel ? "#15803d" : "#dc2626" }}>{fmtBRL(resultado.resultadoLiquido)}</div>
                      <div className="text-[9px] mt-2" style={{ color: viavel ? "#16a34a" : "#dc2626" }}>{viavel ? "✓ Viável" : "✗ Inviável"} · ROI {fmtPct(resultado.roiSobreCapital)}</div>
                    </div>
                  </div>
                </div>
              </FCard>

              {/* Tabela de ciclos */}
              <FCard className="overflow-hidden p-0">
                <div className="px-5 py-4 border-b border-[#E3E4E7] bg-[#FAFAFB]">
                  <div className="text-sm font-extrabold text-[#1F2A44]">Projeção por Ciclo</div>
                  <div className="text-[10px] text-[#9AA0B2] mt-0.5">Capital base: {fmtBRL(resultado.capitalDisponivel)} por ciclo &nbsp;•&nbsp; {resultado.nCiclos} ciclos em {params.prazoDebenture} meses</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#E9EAEC] text-[#1F2A44] border-b border-[#E3E4E7]">
                        <th className="px-4 py-2.5 text-left font-bold text-xs">Ciclo</th>
                        <th className="px-4 py-2.5 text-center font-bold text-xs">Período</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Cessão</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Recebimento</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">(−) Originação</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Lucro Líquido</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Acumulado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.ciclos.map((c, i) => (
                        <tr key={c.numero} className={`border-b border-[#F0F1F4] ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFB]"}`}>
                          <td className="px-4 py-2.5 text-xs"><span className="bg-[#233853] text-white rounded-full px-2 py-0.5 text-[9px] font-bold">#{c.numero}</span></td>
                          <td className="px-4 py-2.5 text-center text-xs text-[#9AA0B2] font-mono">{c.mesInicio}m → {c.mesFim}m</td>
                          <td className="px-4 py-2.5 text-right font-mono text-xs text-[#1F2A44]">{fmtBRL(c.cessao)}</td>
                          <td className="px-4 py-2.5 text-right font-mono text-xs text-[#1F2A44]">{fmtBRL(c.recebimento)}</td>
                          <td className="px-4 py-2.5 text-right font-mono text-xs text-red-600">−{fmtBRL(c.originacao)}</td>
                          <td className="px-4 py-2.5 text-right font-mono text-xs font-bold text-green-700">{fmtBRL(c.lucroLiquido)}</td>
                          <td className="px-4 py-2.5 text-right font-mono text-xs font-bold text-[#C4A664]">{fmtBRL(c.lucroAcumulado)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#233853]">
                        <td colSpan={5} className="px-4 py-2.5 text-xs font-bold text-white">Total — {resultado.nCiclos} ciclos</td>
                        <td className="px-4 py-2.5 text-right font-mono text-xs font-bold text-green-300">{fmtBRL(resultado.lucroTotalCiclos)}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-xs font-bold text-[#C4A664]">{fmtBRL(resultado.lucroTotalCiclos)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </FCard>

              {/* Projeção mensal */}
              <FCard className="overflow-hidden p-0">
                <div className="px-5 py-4 border-b border-[#E3E4E7] bg-[#FAFAFB]">
                  <div className="text-sm font-extrabold text-[#1F2A44]">Projeção Mensal — Debênture vs. Lucro Acumulado</div>
                  <div className="text-[10px] text-[#9AA0B2] mt-0.5">
                    {isSemestral
                      ? "Saldo = lucro ciclos − juros pagos total − fee funding · Meses de pagamento destacados em azul"
                      : "Saldo = lucro acumulado dos ciclos − fee funding − juros acumulados da debênture"}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#E9EAEC] text-[#1F2A44] border-b border-[#E3E4E7]">
                        <th className="px-4 py-2.5 text-left font-bold text-xs">Mês</th>
                        <th className="px-4 py-2.5 text-center font-bold text-xs">Ciclo</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Montante Devedor</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">{isSemestral ? "Juros Pagos Total" : "Juros Acum."}</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Lucro Acum. Ciclos</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Saldo Projetado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.projecaoMensal.map((p, i) => {
                        const isLast = p.mes === params.prazoDebenture;
                        const isPag = isSemestral && p.pagamentoJuros;
                        return (
                          <tr
                            key={p.mes}
                            className={[
                              "border-b border-[#F0F1F4]",
                              isLast ? "bg-[#233853] text-white" : isPag ? "bg-blue-50" : p.fimCiclo ? "bg-[#FFFDF7]" : i % 2 === 0 ? "bg-white" : "bg-[#FAFAFB]",
                            ].join(" ")}
                          >
                            <td className="px-4 py-2 text-xs font-semibold">
                              <div className="flex items-center gap-1.5">
                                <span style={{ color: isLast ? "white" : "#1F2A44" }}>{p.mes}</span>
                                {isLast && <span className="text-[9px] font-bold bg-[#C4A664] text-[#233853] rounded-full px-2 py-0.5">Vencimento</span>}
                                {p.fimCiclo && !isLast && <span className="text-[9px] font-bold bg-green-100 text-green-700 rounded-full px-2 py-0.5">Recebimento</span>}
                                {isPag && !isLast && <span className="text-[9px] font-bold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">Pag. Juros</span>}
                              </div>
                            </td>
                            <td className={`px-4 py-2 text-center text-xs ${isLast ? "text-white/50" : "text-[#9AA0B2]"}`}>{p.cicloAtivo ? `#${p.cicloAtivo}` : "—"}</td>
                            <td className={`px-4 py-2 text-right font-mono text-xs ${isLast ? "text-white/80" : "text-[#1F2A44]"}`}>{fmtBRL(p.montanteDebenture)}</td>
                            <td className={`px-4 py-2 text-right font-mono text-xs ${isLast ? "text-amber-300" : "text-amber-700"}`}>
                              {isSemestral ? fmtBRL(p.jurosPagosTotal) : fmtBRL(p.jurosAcumulados)}
                            </td>
                            <td className={`px-4 py-2 text-right font-mono text-xs ${isLast ? "text-green-300" : "text-green-700"}`}>{fmtBRL(p.lucroAcumulado)}</td>
                            <td className="px-4 py-2 text-right font-mono text-xs font-bold">
                              <span style={{ color: isLast ? (p.saldo >= 0 ? "#86efac" : "#fca5a5") : (p.saldo >= 0 ? "#15803d" : "#dc2626") }}>{fmtBRL(p.saldo)}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot><tr><td colSpan={6} className="h-1.5 bg-[#C4A664]/30" /></tr></tfoot>
                  </table>
                </div>
              </FCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
