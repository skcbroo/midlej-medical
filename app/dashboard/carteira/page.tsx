import { CARTEIRA, brl } from "../data";
import { Tile, SerieChart, Chip } from "../ui";

/* ================================================================
   Página 3 — Carteira proprietária.
   Meta: 25% a.a. Início: 21/07/2026.

   A régua honesta aqui NÃO é 25% desde o primeiro dia — é a meta
   proporcional ao tempo decorrido. Comparar o retorno de uma semana
   contra 25% faria a carteira parecer catastrófica sempre. Por isso
   a página calcula a meta pro-rata e mostra as duas coisas.
   ================================================================ */

const pct = (n: number) => `${(n * 100).toFixed(2).replace(".", ",")}%`;

/** Meta proporcional aos dias corridos, com juros compostos. */
function metaProRata(anual: number, dias: number) {
  return Math.pow(1 + anual, dias / 365) - 1;
}

function diasDesde(ddmmyyyy: string) {
  const [d, m, a] = ddmmyyyy.split("/").map(Number);
  const inicio = new Date(a, m - 1, d);
  const hoje = new Date(2026, 6, 21); // data de apuração deste painel
  return Math.max(0, Math.round((hoje.getTime() - inicio.getTime()) / 86400000));
}

export default function CarteiraPage() {
  const { valorInvestido, saldoAtual, metaAnual, historico, referencia } = CARTEIRA;
  const dias = diasDesde(CARTEIRA.inicio);

  const temPosicao = valorInvestido !== null && saldoAtual !== null;
  const retorno = temPosicao && valorInvestido! > 0
    ? (saldoAtual! - valorInvestido!) / valorInvestido!
    : null;

  const alvoHoje = metaProRata(metaAnual, dias);
  const desvio = retorno !== null ? retorno - alvoHoje : null;

  return (
    <>
      <div className="pg-head">
        <h2>Carteira proprietária</h2>
        <p>
          Desempenho do capital próprio da Midlej sob a estratégia {CARTEIRA.estrategia},
          contra a meta de {pct(metaAnual)} ao ano. Início em {CARTEIRA.inicio} —
          {dias === 0 ? " hoje é o primeiro dia." : ` ${dias} dia${dias > 1 ? "s" : ""} corridos.`}
        </p>
      </div>

      <section>
        <h3 className="sec-tit">Posição</h3>
        <div className="tiles">
          <Tile k="Estratégia" v={CARTEIRA.estrategia} nota={`desde ${CARTEIRA.inicio}`} estado="medido" />
          <Tile k="Valor investido"
                v={valorInvestido !== null ? brl(valorInvestido) : "Falta input"}
                nota="aporte inicial"
                estado={valorInvestido !== null ? "medido" : "falta"} />
          <Tile k="Saldo atual"
                v={saldoAtual !== null ? brl(saldoAtual) : "Falta input"}
                nota="posição de hoje"
                estado={saldoAtual !== null ? "medido" : "falta"} />
          <Tile k="Retorno acumulado"
                v={retorno !== null ? pct(retorno) : "Falta input"}
                nota={retorno !== null ? `em ${dias} dias` : "precisa de investido + saldo"}
                estado={retorno !== null ? "medido" : "falta"} />
          <Tile k="Meta anual" v={pct(metaAnual)} nota="definida pelo Lucas" estado="medido" />
          <Tile k="Meta até hoje"
                v={dias === 0 ? "0,00%" : pct(alvoHoje)}
                nota={`${pct(metaAnual)} a.a. proporcional a ${dias} dia${dias === 1 ? "" : "s"}`}
                estado="medido" />
        </div>
      </section>

      <section>
        <h3 className="sec-tit">Contra a meta</h3>
        {desvio === null ? (
          <div className="chart">
            <div className="ch-head">
              <div>
                <h3>Retorno vs. meta proporcional</h3>
                <p>
                  A comparação justa não é contra {pct(metaAnual)} cheios, e sim contra a
                  fração da meta correspondente ao tempo decorrido. Hoje esse alvo é{" "}
                  <b>{pct(alvoHoje)}</b>.
                </p>
              </div>
            </div>
            <p className="ch-vazio">
              <Chip estado="falta" rotulo="informe valor investido e saldo atual" />
            </p>
          </div>
        ) : (
          <div className="meta-grid">
            <div className="meta-kpi">
              <div className="mk-top">
                <span className="mk-tit">Desvio da meta</span>
                <span className="mk-real num">{pct(desvio)}</span>
              </div>
              <p className="mk-nota">
                <span className={desvio >= 0 ? "mk-bom" : "mk-ruim"}>
                  <span aria-hidden>{desvio >= 0 ? "▲" : "▼"}</span>{" "}
                  {desvio >= 0 ? "acima" : "abaixo"} do alvo
                </span>{" "}
                — realizado {pct(retorno!)} contra {pct(alvoHoje)} esperados em {dias} dias
              </p>
            </div>
          </div>
        )}
      </section>

      <section>
        <h3 className="sec-tit">Evolução do saldo</h3>
        {historico.length === 0 ? (
          <div className="chart">
            <div className="ch-head">
              <div>
                <h3>Saldo ao longo do tempo</h3>
                <p>A série começa hoje. Cada apuração registrada aqui vira um ponto.</p>
              </div>
            </div>
            <p className="ch-vazio">
              <Chip estado="aguarda" rotulo="série inicia em 21/07/2026" />
            </p>
          </div>
        ) : (
          <SerieChart
            titulo="Saldo da carteira"
            sub="Posição apurada a cada período."
            dados={historico.map((h) => ({ rotulo: h.rotulo, valor: h.saldo }))}
            meta={null} formata={brl} cor="var(--f4)"
          />
        )}
      </section>

      <section>
        <h3 className="sec-tit">A estratégia</h3>
        <div className="chart">
          <div className="ch-head">
            <div>
              <h3>{CARTEIRA.estrategia}</h3>
              <p>{CARTEIRA.descricao}</p>
            </div>
          </div>
          <div className="scroller" style={{ border: "none" }}>
            <table>
              <thead>
                <tr><th>Referência histórica</th><th className="r">Retorno</th><th className="r">Benchmark</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>{referencia.periodo}</td>
                  <td className="r num">{pct(referencia.retorno)}</td>
                  <td className="r num">{referencia.benchmark}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="fine" style={{ marginTop: ".7rem" }}>
            Resultado de período anterior da mesma estratégia, apurado na carteira própria.
            Rentabilidade passada não representa garantia de rentabilidade futura;
            investimentos envolvem risco e podem resultar em perdas. Este ciclo, iniciado
            em {CARTEIRA.inicio}, é apurado do zero — a referência acima não entra no
            cálculo de desvio desta página.
          </p>
        </div>
      </section>
    </>
  );
}
