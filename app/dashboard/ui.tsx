import { desvioDaMeta, desvioPadrao, MIN_PERIODOS_DP } from "./data";

/* ================================================================
   Componentes do painel.

   Princípio: um gráfico só desenha o que foi medido. Sem meta, a
   régua não aparece — e o componente diz por quê. Sem períodos
   suficientes, o desvio-padrão não é calculado: com 1 ou 2 pontos
   ele não descreve dispersão nenhuma, seria número decorativo.

   Cores: rampa ordinal de uma matiz (validada ΔL/matiz/contraste
   contra as superfícies clara e escura) + paleta de status fixa,
   sempre acompanhada de ícone e rótulo — nunca cor sozinha.
   ================================================================ */

export function Tile({
  k, v, nota, estado, critico,
}: {
  k: string; v: string; nota?: string;
  estado?: "medido" | "aguarda" | "falta"; critico?: boolean;
}) {
  const pend = estado === "aguarda" || estado === "falta";
  return (
    <div className="tile">
      <span className="k">{k}</span>
      <span className={`v ${pend ? "pend" : "num"}`}
            style={critico ? { color: "var(--critical-ink)" } : undefined}>
        {v}
      </span>
      <span className="n">
        {pend ? <Chip estado={estado!} rotulo={nota} /> : nota}
      </span>
    </div>
  );
}

export function Chip({
  estado, rotulo,
}: { estado: "medido" | "aguarda" | "falta"; rotulo?: string }) {
  const m = {
    medido: { cls: "ok", ic: "✓", txt: "medido" },
    aguarda: { cls: "wait", ic: "◷", txt: "coletando" },
    falta: { cls: "miss", ic: "▲", txt: "falta input" },
  }[estado];
  return (
    <span className={`chip ${m.cls}`}>
      <span aria-hidden>{m.ic}</span> {rotulo ?? m.txt}
    </span>
  );
}

/* ── KPI contra meta ───────────────────────────────────────────── */
export function MetaKpi({
  titulo, real, meta, formata, inverso, nota,
}: {
  titulo: string;
  real: number;
  meta: number | null;
  formata: (n: number) => string;
  /** true quando MENOR é melhor (custo por lead, CPC) */
  inverso?: boolean;
  nota?: string;
}) {
  const d = desvioDaMeta(real, meta);

  if (!d) {
    return (
      <div className="meta-kpi">
        <div className="mk-top">
          <span className="mk-tit">{titulo}</span>
          <span className="mk-real num">{formata(real)}</span>
        </div>
        <div className="mk-track"><span className="mk-sem" /></div>
        <p className="mk-nota">
          <Chip estado="falta" rotulo="sem meta definida" /> {nota}
        </p>
      </div>
    );
  }

  const bom = inverso ? d.abs <= 0 : d.abs >= 0;
  const preench = Math.max(0, Math.min(1, d.atingido));
  const sinal = d.pct >= 0 ? "+" : "−";

  return (
    <div className="meta-kpi">
      <div className="mk-top">
        <span className="mk-tit">{titulo}</span>
        <span className="mk-real num">{formata(real)}</span>
      </div>
      <div className="mk-track" role="img"
           aria-label={`${formata(real)} de meta ${formata(meta!)}, ${Math.round(d.atingido * 100)} por cento`}>
        <span className="mk-fill"
              style={{ width: `${preench * 100}%`,
                       background: bom ? "var(--good)" : "var(--f3)" }} />
        <span className="mk-meta" />
      </div>
      <p className="mk-nota">
        <span className={bom ? "mk-bom" : "mk-ruim"}>
          <span aria-hidden>{bom ? "▲" : "▼"}</span> {sinal}{Math.abs(Math.round(d.pct * 100))}%
        </span>{" "}
        vs meta {formata(meta!)} · {Math.round(d.atingido * 100)}% atingido
      </p>
    </div>
  );
}

/* ── Série: barras do realizado + linha da meta ────────────────── */
export function SerieChart({
  titulo, sub, dados, meta, formata, cor = "var(--f3)",
}: {
  titulo: string;
  sub?: string;
  dados: { rotulo: string; valor: number }[];
  meta: number | null;
  formata: (n: number) => string;
  cor?: string;
}) {
  const vals = dados.map((d) => d.valor);
  const dp = desvioPadrao(vals);
  const teto = Math.max(...vals, meta ?? 0, 1) * 1.15;

  const W = 560, H = 180, PAD_L = 8, PAD_B = 26, PAD_T = 10;
  const larg = (W - PAD_L) / Math.max(dados.length, 1);
  const barra = Math.min(larg * 0.5, 56);
  const y = (v: number) => PAD_T + (1 - v / teto) * (H - PAD_T - PAD_B);

  return (
    <div className="chart">
      <div className="ch-head">
        <div>
          <h3>{titulo}</h3>
          {sub && <p>{sub}</p>}
        </div>
        <span className="ch-dp">
          {dp !== null ? (
            <>desvio-padrão <b className="num">{formata(dp)}</b></>
          ) : (
            <Chip estado="aguarda" rotulo={`desvio a partir de ${MIN_PERIODOS_DP} meses`} />
          )}
        </span>
      </div>

      <div className="ch-plot">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img"
             aria-label={`${titulo}: ${dados.map((d) => `${d.rotulo} ${formata(d.valor)}`).join(", ")}`}>
          {/* linha de base */}
          <line x1="0" y1={H - PAD_B} x2={W} y2={H - PAD_B}
                stroke="var(--baseline)" strokeWidth="1" />

          {/* régua da meta */}
          {meta !== null && (
            <>
              <line x1="0" y1={y(meta)} x2={W} y2={y(meta)}
                    stroke="var(--critical)" strokeWidth="1.5" strokeDasharray="5 4" />
              <text x={W - 4} y={y(meta) - 5} textAnchor="end"
                    fontSize="11" fill="var(--critical-ink)" fontWeight="600">
                meta {formata(meta)}
              </text>
            </>
          )}

          {dados.map((d, i) => {
            const x = PAD_L + i * larg + (larg - barra) / 2;
            const alt = Math.max(H - PAD_B - y(d.valor), d.valor > 0 ? 2 : 0);
            return (
              <g key={d.rotulo}>
                {d.valor > 0 && (
                  <rect x={x} y={H - PAD_B - alt} width={barra} height={alt}
                        rx="4" ry="4" fill={cor} />
                )}
                <text x={x + barra / 2} y={H - PAD_B + 16} textAnchor="middle"
                      fontSize="11" fill="var(--ink-3)">{d.rotulo}</text>
                {d.valor > 0 && (
                  <text x={x + barra / 2} y={H - PAD_B - alt - 6} textAnchor="middle"
                        fontSize="11" fill="var(--ink-2)" fontWeight="600">
                    {formata(d.valor)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {vals.every((v) => v === 0) && (
        <p className="ch-vazio">
          <Chip estado="aguarda" rotulo="sem movimento no período" />
        </p>
      )}
    </div>
  );
}

/* ── Aviso de bloqueio ─────────────────────────────────────────── */
export function Alerta({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="alert">
      <span className="ic" aria-hidden>⛔</span>
      <p><b>{titulo}</b> {texto}</p>
    </div>
  );
}
