"use client";
import { useState, useMemo } from "react";
import { calcularAnual } from "../_lib/calcAnual";
import { buildPdfAnualHtml, fmtBRL, fmtPct } from "../_lib/pdf";
import { FLabel, FSectionTitle, FCard, FInput, MetricCard, CostRow, ModalidadeToggle, parseNum } from "./shared";

const DEFAULTS = {
  captacaoMensal: "200000",
  taxaFunding: "6.5",
  taxaDebenture: "1.8",
  horizonte: "12",
  desagio: "20",
  prazoProcesso: "6",
  taxaOriginacao: "5",
  percentualInutilizavel: "15",
  modalidadeJuros: "final" as "final" | "semestral",
};

export default function SimuladorAnual() {
  const [form, setForm] = useState(DEFAULTS);
  const set = (key: string) => (val: string) => setForm((f) => ({ ...f, [key]: val }));

  const params = useMemo(() => ({
    captacaoMensal: parseNum(form.captacaoMensal),
    taxaFunding: parseNum(form.taxaFunding),
    taxaDebenture: parseNum(form.taxaDebenture),
    horizonte: Math.max(1, Math.min(60, Math.round(parseNum(form.horizonte)))),
    desagio: parseNum(form.desagio),
    prazoProcesso: Math.max(1, Math.round(parseNum(form.prazoProcesso))),
    taxaOriginacao: parseNum(form.taxaOriginacao),
    percentualInutilizavel: parseNum(form.percentualInutilizavel),
    modalidadeJuros: form.modalidadeJuros,
  }), [form]);

  const valid = params.captacaoMensal > 0 && params.desagio > 0 && params.desagio < 100;
  const resultado = useMemo(() => valid ? calcularAnual(params) : null, [params, valid]);
  const isSemestral = form.modalidadeJuros === "semestral";

  function handlePdf() {
    if (!resultado) return;
    const html = buildPdfAnualHtml(params, resultado);
    const w = window.open("", "_blank");
    if (!w) { alert("Pop-up bloqueado. Permita pop-ups para exportar PDF."); return; }
    w.document.write(html);
    w.document.close();
    setTimeout(() => { w.focus(); w.print(); }, 600);
  }

  const semRecebimento = resultado && params.horizonte <= params.prazoProcesso;

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <div className="flex gap-6 items-start">

        {/* PAINEL ESQUERDO */}
        <div className="w-[300px] shrink-0 space-y-4">
          <FCard>
            <FSectionTitle>Debênture</FSectionTitle>
            <div className="space-y-3">
              <div>
                <FLabel>Capital captado / mês</FLabel>
                <FInput value={form.captacaoMensal} onChange={set("captacaoMensal")} prefix="R$" currency placeholder="200.000,00" />
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
                <FLabel>Período da projeção</FLabel>
                <FInput value={form.horizonte} onChange={set("horizonte")} suffix="meses" placeholder="12" />
              </div>
              <ModalidadeToggle
                value={form.modalidadeJuros}
                onChange={(v) => setForm((f) => ({ ...f, modalidadeJuros: v }))}
              />
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
              <div>
                <FLabel>Capital inutilizável</FLabel>
                <div className="text-[9px] text-[#9AA0B2] mb-1">% do capital disponível que fica ocioso</div>
                <FInput value={form.percentualInutilizavel} onChange={set("percentualInutilizavel")} suffix="%" placeholder="15" />
              </div>
            </div>
          </FCard>

          {resultado && (
            <div className="bg-white border border-[#E3E4E7] rounded-2xl shadow-sm p-4 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#9AA0B2]">Capital captado/mês</span>
                <span className="font-bold font-mono text-[#1F2A44]">{fmtBRL(params.captacaoMensal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#9AA0B2]">(−) Fee funding</span>
                <span className="font-bold font-mono text-red-600">−{fmtBRL(resultado.feeFunding)}</span>
              </div>
              <div className="border-t border-[#E3E4E7] pt-1.5 flex justify-between text-xs">
                <span className="font-semibold text-[#1F2A44]">Capital disponível</span>
                <span className="font-extrabold font-mono text-[#C4A664]">{fmtBRL(resultado.capitalDisponivel)}</span>
              </div>
              {params.percentualInutilizavel > 0 && (
                <>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">(−) Inutilizável ({fmtPct(params.percentualInutilizavel)})</span>
                    <span className="font-bold font-mono text-amber-600">−{fmtBRL(resultado.capitalOcioso)}</span>
                  </div>
                  <div className="border-t border-[#E3E4E7] pt-1.5 flex justify-between text-xs">
                    <span className="font-semibold text-[#1F2A44]">Capital efetivo/mês</span>
                    <span className="font-extrabold font-mono text-[#1F2A44]">{fmtBRL(resultado.captacaoEfetiva)}</span>
                  </div>
                </>
              )}
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
              <div className="text-[#9AA0B2] text-sm">Preencha os parâmetros para visualizar a projeção.</div>
            </div>
          )}

          {valid && resultado && (
            <>
              <div className="border rounded-2xl p-5 shadow-sm" style={{ borderColor: resultado.viavelOp ? "#86efac" : "#fca5a5", background: resultado.viavelOp ? "#f0fdf4" : "#fff5f5" }}>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: resultado.viavelOp ? "#15803d" : "#dc2626" }} />
                  <span className="text-lg font-extrabold tracking-wide" style={{ color: resultado.viavelOp ? "#15803d" : "#dc2626" }}>{resultado.viavelOp ? "OPERAÇÃO VIÁVEL" : "OPERAÇÃO INVIÁVEL"}</span>
                  {isSemestral && <span className="text-[10px] font-bold bg-[#233853] text-[#C4A664] rounded-full px-2.5 py-0.5 ml-auto">Juros semestrais</span>}
                </div>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[["Captação efetiva/mês", fmtBRL(resultado.captacaoEfetiva)], ["Lucro por operação", fmtBRL(resultado.lucroLiquido)], ["Ops. completadas", resultado.totalOpsCompletadas + " em " + params.horizonte + "m"], ["ROI s/ investido", fmtPct(resultado.roi)]].map(([l, v]) => (
                    <div key={l} className="bg-white/60 rounded-xl px-3 py-2 border border-white/80">
                      <div className="text-[9px] font-semibold text-[#9AA0B2] uppercase tracking-wider">{l}</div>
                      <div className="text-sm font-bold font-mono text-[#1F2A44] mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {semRecebimento && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 font-semibold">
                  O horizonte ({params.horizonte}m) é menor que o prazo do ciclo ({params.prazoProcesso}m) — nenhuma operação completa neste período.
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard label="Lucro Total" value={fmtBRL(resultado.totalLucro)} sub={params.horizonte + " meses"} color={resultado.totalLucro >= 0 ? "#15803d" : "#dc2626"} />
                <MetricCard label="ROI" value={fmtPct(resultado.roi)} sub="Lucro / total investido" color={resultado.roi >= 0 ? "#15803d" : "#dc2626"} />
                <MetricCard label="Capital Ocioso Total" value={fmtBRL(resultado.totalOcioso)} sub={fmtPct(params.percentualInutilizavel) + " × " + params.horizonte + " meses"} color="#b45309" />
                <MetricCard label="Ops. Completadas" value={String(resultado.totalOpsCompletadas)} sub={"1º recebimento: mês " + (params.prazoProcesso + 1)} />
              </div>

              <FCard>
                <FSectionTitle>Por Ciclo de Compra — Cessão de {fmtBRL(resultado.captacaoEfetiva)}</FSectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <div>
                    <div className="text-[10px] font-bold text-[#C4A664] uppercase tracking-widest mb-2">Receita</div>
                    <CostRow label="Cessão (capital efetivo)" value={fmtBRL(resultado.cessao)} />
                    <CostRow label="Recebimento" value={fmtBRL(resultado.recebimento)} sub={"Deságio de " + fmtPct(params.desagio)} valueColor="#15803d" />
                    <CostRow label="Lucro Bruto" value={fmtBRL(resultado.lucroBruto)} highlight />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#C4A664] uppercase tracking-widest mb-2">Custos</div>
                    <CostRow label="Originação" value={fmtBRL(resultado.originacao)} sub={fmtPct(params.taxaOriginacao) + " s/ cessão"} valueColor="#dc2626" />
                    {params.taxaDebenture > 0 && (
                      <CostRow
                        label="Juro da Debênture"
                        value={fmtBRL(resultado.custoDebenture)}
                        sub={isSemestral
                          ? `${fmtPct(params.taxaDebenture)}/mês × ${params.prazoProcesso}m (semestral)`
                          : `${fmtPct(params.taxaDebenture)}/mês × ${params.prazoProcesso}m (bullet)`}
                        valueColor="#dc2626"
                      />
                    )}
                    <CostRow label="Lucro Líquido / ciclo" value={fmtBRL(resultado.lucroLiquido)} highlight valueColor={resultado.viavelOp ? "#15803d" : "#dc2626"} />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E3E4E7] grid grid-cols-4 gap-3">
                  {[["Total captado", fmtBRL(resultado.totalCaptado), "text-[#1F2A44]"], ["Fee funding acum.", fmtBRL(resultado.totalFeeFunding), "text-red-600"], ["Capital ocioso acum.", fmtBRL(resultado.totalOcioso), "text-amber-600"], ["Capital investido", fmtBRL(resultado.totalInvestido), "text-[#1F2A44]"]].map(([l, v, c]) => (
                    <div key={l} className="text-center">
                      <div className={`text-[9px] ${c} uppercase tracking-wider`}>{l}</div>
                      <div className={`text-sm font-bold font-mono ${c} mt-0.5`}>{v}</div>
                    </div>
                  ))}
                </div>
              </FCard>

              <FCard className="overflow-hidden p-0">
                <div className="px-5 py-4 border-b border-[#E3E4E7] bg-[#FAFAFB]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-extrabold text-[#1F2A44]">Projeção Mensal — {params.horizonte} Meses</div>
                      <div className="text-[10px] text-[#9AA0B2] mt-0.5">
                        {fmtBRL(params.captacaoMensal)}/mês captado · {fmtPct(params.percentualInutilizavel)} ocioso · ciclos de {params.prazoProcesso} meses
                        {isSemestral && " · juros semestrais por operação"}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-[9px] text-[#9AA0B2] uppercase tracking-wider">1º recebimento</div>
                      <div className="text-xs font-bold text-[#1F2A44]">Mês {params.prazoProcesso + 1}</div>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#E9EAEC] text-[#1F2A44] border-b border-[#E3E4E7]">
                        <th className="px-4 py-2.5 text-left font-bold text-xs">Mês</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Efetivo</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Ocioso</th>
                        <th className="px-4 py-2.5 text-center font-bold text-xs">Ops. Ativas</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Recebimento</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Lucro Mês</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Lucro Acum.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.meses.map((m, i) => {
                        const isLast = m.mes === params.horizonte;
                        const rowBg = isLast ? "bg-[#233853]" : m.completou ? "bg-[#FFFDF7]" : i % 2 === 0 ? "bg-white" : "bg-[#FAFAFB]";
                        return (
                          <tr key={m.mes} className={`border-b border-[#F0F1F4] ${rowBg}`}>
                            <td className="px-4 py-2.5 text-xs font-semibold">
                              <div className="flex items-center gap-2">
                                <span style={{ color: isLast ? "white" : "#1F2A44" }}>{m.mes}</span>
                                {m.completou && !isLast && <span className="text-[9px] font-bold bg-green-100 text-green-700 rounded-full px-2 py-0.5">Recebimento</span>}
                                {isLast && <span className="text-[9px] font-bold bg-[#C4A664] text-[#233853] rounded-full px-2 py-0.5">Final</span>}
                              </div>
                            </td>
                            <td className={`px-4 py-2.5 text-right font-mono text-xs ${isLast ? "text-white/80" : "text-[#1F2A44]"}`}>{fmtBRL(m.efetivo)}</td>
                            <td className={`px-4 py-2.5 text-right font-mono text-xs ${isLast ? "text-amber-300" : "text-amber-600"}`}>{fmtBRL(m.ocioso)}</td>
                            <td className={`px-4 py-2.5 text-center font-mono text-xs font-bold ${isLast ? "text-white/60" : "text-[#9AA0B2]"}`}>{m.opsAtivas}</td>
                            <td className="px-4 py-2.5 text-right font-mono text-xs">
                              <span style={{ color: m.completou ? (isLast ? "#86efac" : "#15803d") : (isLast ? "rgba(255,255,255,0.25)" : "#C4C7D0") }}>
                                {m.completou ? fmtBRL(m.recebimentoMes) : "—"}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-right font-mono text-xs font-bold">
                              <span style={{ color: m.lucroMes > 0 ? (isLast ? "#86efac" : "#15803d") : (isLast ? "rgba(255,255,255,0.25)" : "#C4C7D0") }}>
                                {m.lucroMes > 0 ? fmtBRL(m.lucroMes) : "—"}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-right font-mono text-xs font-bold">
                              <span style={{ color: isLast ? "#C4A664" : "#1F2A44" }}>{fmtBRL(m.lucroAcumulado)}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot><tr><td colSpan={7} className="h-1.5 bg-[#C4A664]/30" /></tr></tfoot>
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
