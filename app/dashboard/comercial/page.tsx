import {
  SERIE, METAS, PERIODO, PERDAS, soma, brl,
} from "../data";
import { Tile, MetaKpi, SerieChart, Chip } from "../ui";

/* ================================================================
   Página 2 — Comercial.
   Só o que acontece depois do lead: agendar e fechar. Aquisição
   fica de fora de propósito — aqui a pergunta é o aproveitamento
   do que já chegou, não o volume que chega.
   ================================================================ */

export default function ComercialPage() {
  const leads = soma("leads");
  const agendamentos = soma("agendamentos");
  const fechamentos = soma("fechamentos");
  const faturamento = soma("faturamento");

  const taxaAgendamento = leads > 0 ? agendamentos / leads : null;
  const taxaFechamento = agendamentos > 0 ? fechamentos / agendamentos : null;
  const ticket = fechamentos > 0 ? faturamento / fechamentos : null;

  const pct = (n: number) => `${Math.round(n * 100)}%`;

  return (
    <>
      <div className="pg-head">
        <h2>Comercial</h2>
        <p>
          Aproveitamento do que já chegou: quanto vira reunião e quanto vira cliente.
          Volume de topo não entra aqui — isso é assunto da página de demanda.
          Período: {PERIODO}.
        </p>
      </div>

      <section>
        <h3 className="sec-tit">O período</h3>
        <div className="tiles">
          <Tile k="Leads recebidos" v={String(leads)} nota="insumo do comercial" estado="medido" />
          <Tile k="Agendamentos" v={String(agendamentos)} estado="medido" critico={agendamentos === 0} />
          <Tile k="Fechamentos" v={String(fechamentos)} estado="medido" critico={fechamentos === 0} />
          <Tile k="Faturamento" v={brl(faturamento)} estado="medido" critico={faturamento === 0} />
          <Tile k="Taxa lead → reunião"
                v={taxaAgendamento !== null ? pct(taxaAgendamento) : "Sem lead"}
                nota={taxaAgendamento !== null ? `${agendamentos} de ${leads}` : "aguarda lead"}
                estado={taxaAgendamento !== null ? "medido" : "aguarda"}
                critico={taxaAgendamento === 0} />
          <Tile k="Taxa reunião → cliente"
                v={taxaFechamento !== null ? pct(taxaFechamento) : "Sem reunião"}
                nota="aguarda agendamento"
                estado={taxaFechamento !== null ? "medido" : "aguarda"} />
          <Tile k="Ticket médio"
                v={ticket !== null ? brl(ticket) : "R$ 6.000"}
                nota={ticket !== null ? "realizado" : "referência: onboarding + fee 1% a.a."}
                estado={ticket !== null ? "medido" : "aguarda"} />
        </div>
      </section>

      <section>
        <h3 className="sec-tit">Distância até a meta</h3>
        <div className="meta-grid">
          <MetaKpi titulo="Agendamentos" real={agendamentos} meta={METAS.agendamentos}
                   formata={(n) => String(Math.round(n))} nota="reuniões marcadas por mês" />
          <MetaKpi titulo="Fechamentos" real={fechamentos} meta={METAS.fechamentos}
                   formata={(n) => String(Math.round(n))} nota="clientes novos por mês" />
          <MetaKpi titulo="Faturamento" real={faturamento} meta={METAS.faturamento}
                   formata={brl} nota="receita esperada por mês" />
        </div>
      </section>

      <section>
        <h3 className="sec-tit">Evolução mês a mês</h3>

        <SerieChart
          titulo="Agendamentos"
          sub="Reuniões marcadas. É o primeiro sinal de que a pré-venda funciona."
          dados={SERIE.map((m) => ({ rotulo: m.rotulo, valor: m.agendamentos }))}
          meta={METAS.agendamentos} formata={(n) => String(Math.round(n))} cor="var(--f2)"
        />

        <SerieChart
          titulo="Fechamentos"
          sub="Clientes ativados no mês."
          dados={SERIE.map((m) => ({ rotulo: m.rotulo, valor: m.fechamentos }))}
          meta={METAS.fechamentos} formata={(n) => String(Math.round(n))} cor="var(--f4)"
        />
      </section>

      <section>
        <h3 className="sec-tit">Onde os leads caem</h3>
        <div className="scroller">
          <table>
            <thead>
              <tr><th>Etapa</th><th>Motivo</th><th className="r">Perdidos</th></tr>
            </thead>
            <tbody>
              {PERDAS.map((p) => (
                <tr key={p.etapa}>
                  <td>{p.etapa}</td><td>{p.motivo}</td>
                  <td className="r num">{p.qtd} de {p.de}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine">
          Amostra pequena — insuficiente para concluir padrão. O que ela sugere: o
          filtro precisa acontecer antes da pré-venda, não durante. O detalhe por
          lead fica no registro interno, fora desta página.
        </p>
      </section>

      <section>
        <p className="fine">
          <Chip estado="falta" rotulo="metas não definidas" /> Sem alvo de
          agendamentos e fechamentos por mês, esta página mostra desempenho mas não
          consegue dizer se ele é bom.
        </p>
      </section>
    </>
  );
}
