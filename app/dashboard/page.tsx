import {
  SERIE, METAS, BLOQUEIO, PERIODO, INPUTS, soma, brl,
} from "./data";
import { Tile, MetaKpi, SerieChart, Alerta, Chip } from "./ui";

/* ================================================================
   Página 1 — Geração de demanda.
   Pergunta que ela responde: o marketing está dando retorno, e
   esse retorno é previsível?

   Previsibilidade = meta vs realizado ao longo dos meses + o
   desvio-padrão da série. Com 2 meses o desvio ainda não é
   calculado (precisa de 3): dispersão sobre 2 pontos não descreve
   comportamento nenhum.
   ================================================================ */

export default function DemandaPage() {
  const investimento = soma("investimento");
  const leads = soma("leads");
  const qualificados = soma("qualificados");
  const agendamentos = soma("agendamentos");
  const fechamentos = soma("fechamentos");
  const faturamento = soma("faturamento");

  const custoPorLead = leads > 0 ? investimento / leads : null;
  const roi = investimento > 0 ? (faturamento - investimento) / investimento : null;

  return (
    <>
      <div className="pg-head">
        <h2>Geração de demanda</h2>
        <p>
          O retorno efetivo do marketing e o quanto ele é previsível. Cada gráfico
          traz a régua da meta — quando ela existir — e a distância até ela.
          Período: {PERIODO}.
        </p>
      </div>

      {BLOQUEIO && <Alerta {...BLOQUEIO} />}

      <section>
        <h3 className="sec-tit">O funil no período</h3>
        <div className="tiles">
          <Tile k="Investimento em mkt" v={brl(investimento)} nota="jun + jul" estado="medido" />
          <Tile k="Leads" v={String(leads)} nota="contatos reais" estado="medido" />
          <Tile k="Leads qualificados" v={String(qualificados)} nota="foram para reunião"
                estado="medido" critico={qualificados === 0} />
          <Tile k="Agendamentos" v={String(agendamentos)} estado="medido"
                critico={agendamentos === 0} />
          <Tile k="Fechamentos" v={String(fechamentos)} estado="medido"
                critico={fechamentos === 0} />
          <Tile k="Faturamento" v={brl(faturamento)} estado="medido" critico={faturamento === 0} />
          <Tile k="Custo por lead"
                v={custoPorLead !== null ? brl(custoPorLead) : "Sem lead"}
                nota={custoPorLead === null ? "aguarda lead" : "referência: onboarding R$ 6.000"}
                estado={custoPorLead !== null ? "medido" : "aguarda"} />
          <Tile k="Custo por qualificado"
                v={qualificados > 0 ? brl(investimento / qualificados) : "Sem qualificado"}
                nota="aguarda MQL" estado={qualificados > 0 ? "medido" : "aguarda"} />
          <Tile k="ROI"
                v={roi !== null && faturamento > 0 ? `${(roi * 100).toFixed(0)}%` : "Sem receita"}
                nota={faturamento > 0 ? "(receita − custo) ÷ custo" : "aguarda faturamento"}
                estado={faturamento > 0 ? "medido" : "aguarda"} />
        </div>
      </section>

      <section>
        <h3 className="sec-tit">Distância até a meta</h3>
        <div className="meta-grid">
          <MetaKpi titulo="Investimento em mkt" real={investimento} meta={METAS.investimentoMkt}
                   formata={brl} nota="quanto planejamos gastar por mês" />
          <MetaKpi titulo="Leads qualificados" real={qualificados} meta={METAS.leadsQualificados}
                   formata={(n) => String(Math.round(n))} nota="quantos MQL por mês" />
          <MetaKpi titulo="Faturamento" real={faturamento} meta={METAS.faturamento}
                   formata={brl} nota="receita esperada por mês" />
          <MetaKpi titulo="Custo por lead" real={custoPorLead ?? 0} meta={METAS.custoPorLead}
                   formata={brl} inverso nota="teto aceitável por lead" />
        </div>
      </section>

      <section>
        <h3 className="sec-tit">Previsibilidade mês a mês</h3>

        <SerieChart
          titulo="Investimento em marketing"
          sub="Quanto entrou de dinheiro no canal a cada mês."
          dados={SERIE.map((m) => ({ rotulo: m.rotulo, valor: m.investimento }))}
          meta={METAS.investimentoMkt} formata={brl} cor="var(--f3)"
        />

        <SerieChart
          titulo="Faturamento"
          sub="Receita atribuída ao marketing. É a linha que transforma gasto em retorno."
          dados={SERIE.map((m) => ({ rotulo: m.rotulo, valor: m.faturamento }))}
          meta={METAS.faturamento} formata={brl} cor="var(--f4)"
        />

        <SerieChart
          titulo="Leads qualificados"
          sub="Contatos que chegaram a reunião — o insumo direto do comercial."
          dados={SERIE.map((m) => ({ rotulo: m.rotulo, valor: m.qualificados }))}
          meta={METAS.leadsQualificados} formata={(n) => String(Math.round(n))} cor="var(--f2)"
        />
      </section>

      <section>
        <h3 className="sec-tit">O que trava esta página</h3>
        <div className="scroller">
          <table>
            <thead>
              <tr><th>Input</th><th>Destrava</th><th>Quem</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {INPUTS.map((i) => (
                <tr key={i.input}>
                  <td>{i.input}</td><td>{i.destrava}</td><td>{i.quem}</td>
                  <td><Chip estado={i.critico ? "falta" : "aguarda"}
                            rotulo={i.critico ? "bloqueante" : "em coleta"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine">
          Sem metas definidas, os gráficos mostram só o realizado — não há régua para
          medir distância. O desvio-padrão entra a partir do terceiro mês de série.
        </p>
      </section>
    </>
  );
}
