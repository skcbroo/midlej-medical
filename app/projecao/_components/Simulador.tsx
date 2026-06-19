"use client";
import { useState, useMemo } from "react";
import { calcular } from "../_lib/calc";
import { buildPdfHtml, fmtBRL, fmtPct } from "../_lib/pdf";
import { FLabel, FSectionTitle, FCard, FInput, MetricCard, CostRow, ModalidadeToggle, parseNum } from "./shared";

const DEFAULTS = {
  identificacao: "",
  valorRecebimento: "100000",
  valorCessao: "80000",
  usarPercentual: false,
  percentualCessao: "80",
  prazo: "4",
  taxaOriginacao: "5",
  taxaFunding: "6.5",
  taxaDebenture: "1.8",
  modalidadeJuros: "final" as "final" | "semestral",
};

export default function Simulador() {
  const [form, setForm] = useState(DEFAULTS);

  const set = (key: string) => (val: string) => {
    setForm((f) => {
      const next = { ...f, [key]: val };
      if ((key === "valorRecebimento" || key === "percentualCessao") && next.usarPercentual) {
        const vr = parseNum(next.valorRecebimento);
        const pct = parseNum(next.percentualCessao);
        next.valorCessao = vr > 0 && pct > 0 ? String((vr * pct / 100).toFixed(2)) : next.valorCessao;
      }
      if (key === "valorCessao") {
        const vr = parseNum(next.valorRecebimento);
        const vc = parseNum(val);
        if (vr > 0 && vc > 0) next.percentualCessao = ((vc / vr) * 100).toFixed(2);
      }
      return next;
    });
  };

  const togglePercentual = () => {
    setForm((f) => {
      const next = { ...f, usarPercentual: !f.usarPercentual };
      if (!f.usarPercentual) {
        const vr = parseNum(f.valorRecebimento);
        const vc = parseNum(f.valorCessao);
        if (vr > 0 && vc > 0) next.percentualCessao = ((vc / vr) * 100).toFixed(2);
      }
      return next;
    });
  };

  const params = useMemo(() => ({
    valorRecebimento: parseNum(form.valorRecebimento),
    valorCessao: parseNum(form.valorCessao),
    prazo: Math.max(1, Math.round(parseNum(form.prazo))),
    taxaOriginacao: parseNum(form.taxaOriginacao),
    taxaFunding: parseNum(form.taxaFunding),
    taxaDebenture: parseNum(form.taxaDebenture),
    modalidadeJuros: form.modalidadeJuros,
    identificacao: form.identificacao,
  }), [form]);

  const valid = params.valorRecebimento > 0 && params.valorCessao > 0 && params.valorCessao < params.valorRecebimento;
  const resultado = useMemo(() => valid ? calcular(params) : null, [params, valid]);
  const viavel = resultado?.viavel;
  const isSemestral = form.modalidadeJuros === "semestral";

  function handlePdf() {
    if (!resultado) return;
    const html = buildPdfHtml(params as Record<string, unknown>, resultado as Record<string, unknown>);
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
            <FSectionTitle>Identificação (opcional)</FSectionTitle>
            <FInput value={form.identificacao} onChange={set("identificacao")} placeholder="Ex: Processo João Silva — 2024" />
          </FCard>

          <FCard>
            <FSectionTitle>Valores</FSectionTitle>
            <div className="space-y-3">
              <div>
                <FLabel>Valor de Recebimento</FLabel>
                <FInput value={form.valorRecebimento} onChange={set("valorRecebimento")} prefix="R$" placeholder="100.000,00" currency />
              </div>
              <div className="flex items-center justify-between">
                <FLabel>Valor da Cessão</FLabel>
                <button
                  onClick={togglePercentual}
                  className={["text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition", form.usarPercentual ? "bg-[#1F2A44] text-white border-[#1F2A44]" : "bg-white text-[#1F2A44] border-[#E3E4E7] hover:bg-[#F7F7F8]"].join(" ")}
                >
                  {form.usarPercentual ? "% ativo" : "usar %"}
                </button>
              </div>
              {form.usarPercentual ? (
                <div className="space-y-1.5">
                  <FInput
                    value={form.percentualCessao}
                    onChange={(v) => {
                      const vr = parseNum(form.valorRecebimento);
                      const pct = parseNum(v);
                      setForm((f) => ({ ...f, percentualCessao: v, valorCessao: vr > 0 && pct > 0 ? String((vr * pct / 100).toFixed(2)) : f.valorCessao }));
                    }}
                    suffix="%"
                    placeholder="80"
                  />
                  <div className="text-[10px] text-[#9AA0B2] pl-1">= {fmtBRL(parseNum(form.valorCessao))}</div>
                </div>
              ) : (
                <FInput value={form.valorCessao} onChange={set("valorCessao")} prefix="R$" placeholder="80.000,00" currency />
              )}
              {resultado && (
                <div className="bg-[#FAFAFB] border border-[#E3E4E7] rounded-lg px-3 py-2">
                  <div className="text-[9px] text-[#9AA0B2] uppercase tracking-wider">Deságio</div>
                  <div className="text-sm font-bold text-[#C4A664]">{fmtPct(resultado.desagio)}</div>
                </div>
              )}
            </div>
          </FCard>

          <FCard>
            <FSectionTitle>Prazo da Operação</FSectionTitle>
            <FInput value={form.prazo} onChange={set("prazo")} suffix="meses" placeholder="12" />
          </FCard>

          <FCard>
            <FSectionTitle>Taxas e Comissões</FSectionTitle>
            <div className="space-y-3">
              <div>
                <FLabel>Taxa de Originação</FLabel>
                <div className="text-[9px] text-[#9AA0B2] mb-1">% sobre valor da cessão — pago em caixa</div>
                <FInput value={form.taxaOriginacao} onChange={set("taxaOriginacao")} suffix="%" placeholder="5" />
              </div>
              <div>
                <FLabel>Taxa de Funding</FLabel>
                <div className="text-[9px] text-[#9AA0B2] mb-1">% sobre valor da cessão — pago em caixa</div>
                <FInput value={form.taxaFunding} onChange={set("taxaFunding")} suffix="%" placeholder="6.5" />
              </div>
              <div>
                <FLabel>Taxa da Debênture</FLabel>
                <div className="text-[9px] text-[#9AA0B2] mb-1">Custo do capital (juro mensal composto)</div>
                <FInput value={form.taxaDebenture} onChange={set("taxaDebenture")} suffix="% a.m." placeholder="1.8" />
              </div>
              <ModalidadeToggle
                value={form.modalidadeJuros}
                onChange={(v) => setForm((f) => ({ ...f, modalidadeJuros: v }))}
              />
            </div>
          </FCard>

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
              <div className="text-[#9AA0B2] text-sm">Preencha os valores no painel esquerdo para visualizar a simulação.</div>
            </div>
          )}

          {valid && resultado && (
            <>
              <div className="border rounded-2xl p-5 shadow-sm" style={{ borderColor: viavel ? "#86efac" : "#fca5a5", background: viavel ? "#f0fdf4" : "#fff5f5" }}>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: viavel ? "#15803d" : "#dc2626" }} />
                  <span className="text-lg font-extrabold tracking-wide" style={{ color: viavel ? "#15803d" : "#dc2626" }}>
                    {viavel ? "OPERAÇÃO VIÁVEL" : "OPERAÇÃO INVIÁVEL"}
                  </span>
                  {isSemestral && <span className="text-[10px] font-bold bg-[#233853] text-[#C4A664] rounded-full px-2.5 py-0.5 ml-auto">Juros semestrais</span>}
                </div>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[["Recebimento", fmtBRL(resultado.valorRecebimento)], ["Cessão", fmtBRL(resultado.valorCessao)], ["Deságio", fmtPct(resultado.desagio)], ["Prazo", params.prazo + " meses"]].map(([l, v]) => (
                    <div key={l} className="bg-white/60 rounded-xl px-3 py-2 border border-white/80">
                      <div className="text-[9px] font-semibold text-[#9AA0B2] uppercase tracking-wider">{l}</div>
                      <div className="text-sm font-bold font-mono text-[#1F2A44] mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard label="Resultado Líquido" value={fmtBRL(resultado.lucro)} sub={`${params.prazo} meses`} color={viavel ? "#15803d" : "#dc2626"} />
                <MetricCard label="ROI sobre fees" value={resultado.roi != null ? fmtPct(resultado.roi) : "—"} sub="Retorno / caixa próprio" color={resultado.roi != null && resultado.roi >= 0 ? "#15803d" : "#dc2626"} />
                <MetricCard label="Máx. Valor Cessão" value={fmtBRL(resultado.valorMaxCessao)} sub={fmtPct(resultado.percentualMaxCessao) + " do recebimento"} accent />
                <MetricCard label="Custo Total" value={fmtBRL(resultado.totalCusto)} sub="Debênture + Fees" />
              </div>

              <FCard>
                <FSectionTitle>Breakdown de Custos — Cenário {params.prazo} Meses</FSectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <div>
                    <div className="text-[10px] font-bold text-[#C4A664] uppercase tracking-widest mb-2">Fees (caixa próprio)</div>
                    <CostRow label="Comissão Originação" value={fmtBRL(resultado.comissaoOriginacao)} sub={`${fmtPct(params.taxaOriginacao)} s/ cessão`} />
                    <CostRow label="Comissão Funding" value={fmtBRL(resultado.comissaoFunding)} sub={`${fmtPct(params.taxaFunding)} s/ cessão`} />
                    <CostRow label="Total de Fees" value={fmtBRL(resultado.totalFees)} highlight />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#C4A664] uppercase tracking-widest mb-2">Debênture</div>
                    <CostRow label="Principal (cessão)" value={fmtBRL(resultado.valorCessao)} sub="Capital captado" />
                    <CostRow
                      label="Juros Debênture"
                      value={fmtBRL(resultado.juroDebenture)}
                      sub={isSemestral
                        ? `${fmtPct(params.taxaDebenture)}/mês — pagamento semestral`
                        : `${fmtPct(params.taxaDebenture)}/mês × ${params.prazo} meses (bullet)`}
                    />
                    <CostRow label="Montante Debênture" value={fmtBRL(resultado.montanteDebenture)} highlight />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E3E4E7] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#1F2A44]">Custo Total da Operação</div>
                    <div className="text-[10px] text-[#9AA0B2]">Montante Debênture + Fees</div>
                  </div>
                  <div className="text-xl font-extrabold font-mono text-[#1F2A44]">{fmtBRL(resultado.totalCusto)}</div>
                </div>
              </FCard>

              <FCard className="border-l-4 border-l-[#C4A664]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[#C4A664] uppercase tracking-widest mb-1">Valor Máximo de Cessão (Break-even)</div>
                    <div className="text-2xl font-extrabold font-mono text-[#1F2A44]">{fmtBRL(resultado.valorMaxCessao)}</div>
                    <div className="text-xs text-[#4A5568] mt-1">
                      {fmtPct(resultado.percentualMaxCessao)} do valor de recebimento &nbsp;•&nbsp; Pagar acima deste valor resulta em prejuízo
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-6">
                    <div className="text-[9px] text-[#9AA0B2] uppercase tracking-wider mb-1">Diferença atual</div>
                    <div className="text-lg font-bold font-mono" style={{ color: resultado.valorCessao <= resultado.valorMaxCessao ? "#15803d" : "#dc2626" }}>
                      {fmtBRL(resultado.valorMaxCessao - resultado.valorCessao)}
                    </div>
                    <div className="text-[9px] text-[#9AA0B2]">{resultado.valorCessao <= resultado.valorMaxCessao ? "margem disponível" : "excedido"}</div>
                  </div>
                </div>
              </FCard>

              <FCard className="overflow-hidden p-0">
                <div className="px-5 py-4 border-b border-[#E3E4E7] bg-[#FAFAFB]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-extrabold text-[#1F2A44]">Projeção Mensal da Operação</div>
                      <div className="text-[10px] text-[#9AA0B2] mt-0.5">
                        {isSemestral ? "Juros pagos a cada semestre — destaque nos meses de pagamento" : "Evolução do custo e resultado a cada mês"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#9AA0B2]">Prazo atual:</span>
                      <span className="text-xs font-bold text-[#1F2A44] bg-[#E9EAEC] rounded-full px-2.5 py-0.5">{params.prazo}m</span>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#E9EAEC] text-[#1F2A44] border-b border-[#E3E4E7]">
                        <th className="px-4 py-2.5 text-left font-bold text-xs">Mês</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Montante Devedor</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">{isSemestral ? "Juros Pagos Total" : "Juros Acumulados"}</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Custo Total</th>
                        <th className="px-4 py-2.5 text-right font-bold text-xs">Resultado Líquido</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.projecao.map((p, i) => {
                        const isCurrent = p.mes === params.prazo;
                        const isPag = isSemestral && p.pagamentoJuros;
                        const rowBg = isCurrent ? "bg-[#233853] text-white" : isPag ? "bg-blue-50" : i % 2 === 0 ? "bg-white" : "bg-[#FAFAFB]";
                        return (
                          <tr key={p.mes} className={`border-b border-[#F0F1F4] ${rowBg}`}>
                            <td className="px-4 py-2.5 font-semibold text-xs">
                              <div className="flex items-center gap-2">
                                <span style={{ color: isCurrent ? "white" : "#1F2A44" }}>{p.mes}</span>
                                {isCurrent && <span className="text-[9px] font-bold bg-[#C4A664] text-[#1F2A44] rounded-full px-2 py-0.5">Atual</span>}
                                {isPag && !isCurrent && <span className="text-[9px] font-bold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">Pag. Juros</span>}
                              </div>
                            </td>
                            <td className={`px-4 py-2.5 text-right font-mono text-xs ${isCurrent ? "text-white/80" : "text-[#1F2A44]"}`}>
                              {fmtBRL(p.montanteDebenture)}
                            </td>
                            <td className={`px-4 py-2.5 text-right font-mono text-xs ${isCurrent ? "text-amber-300" : "text-amber-700"}`}>
                              {isSemestral ? fmtBRL(p.jurosPagosTotal) : fmtBRL(p.jurosAcumulados)}
                            </td>
                            <td className={`px-4 py-2.5 text-right font-mono text-xs ${isCurrent ? "text-white/80" : "text-[#1F2A44]"}`}>
                              {fmtBRL(p.custoTotal)}
                            </td>
                            <td className="px-4 py-2.5 text-right font-mono text-xs font-bold">
                              <span style={{ color: isCurrent ? (p.viavel ? "#86efac" : "#fca5a5") : (p.viavel ? "#15803d" : "#dc2626") }}>{fmtBRL(p.lucro)}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot><tr><td colSpan={5} className="h-1.5 bg-[#C4A664]/30" /></tr></tfoot>
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
