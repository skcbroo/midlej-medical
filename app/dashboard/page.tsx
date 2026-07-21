import type { Metadata } from "next";
import {
  PERIODO, ATUALIZADO, BLOQUEIO, FUNIL,
  PILAR_1, PILAR_2, PILAR_3, PERDAS, INPUTS,
  type Tile, type Estado,
} from "./data";

/* ================================================================
   /dashboard — painel comercial interno (subdomínio painel.*).

   ⚠️ DADOS INTERNOS. Três camadas de proteção:
     1. Basic Auth no middleware (falha fechado sem env);
     2. noindex/nofollow aqui e no header da resposta;
     3. disallow em robots.ts + fora do sitemap.
   Os números vivem em ./data.ts — editar lá, não aqui.

   Paleta do funil: rampa ordinal azul de uma só matiz, validada
   (ΔL monotônico, matiz única, ponta clara acima de 2:1) contra as
   superfícies #fcfcfb (claro) e #1a1a19 (escuro).
   ================================================================ */

export const metadata: Metadata = {
  title: { absolute: "Painel Comercial · Midlej Capital" },
  robots: { index: false, follow: false, nocache: true },
};

const RAMPA = ["var(--f1)", "var(--f2)", "var(--f3)", "var(--f4)", "var(--f5)"];

function Chip({ estado, rotulo }: { estado: Estado; rotulo?: string }) {
  const mapa = {
    medido: { cls: "ok", ic: "✓", txt: "medido" },
    aguarda: { cls: "wait", ic: "◷", txt: "aguarda volume" },
    falta: { cls: "miss", ic: "▲", txt: "falta input" },
  } as const;
  const m = mapa[estado];
  return (
    <span className={`chip ${m.cls}`}>
      <span aria-hidden>{m.ic}</span> {rotulo ?? m.txt}
    </span>
  );
}

function Tiles({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="tiles">
      {tiles.map((t) => (
        <div key={t.k} className="tile">
          <span className="k">{t.k}</span>
          <span
            className={`v ${t.estado === "aguarda" || t.estado === "falta" ? "pend" : "num"}`}
            style={t.critico ? { color: "var(--critical-ink)" } : undefined}
          >
            {t.v}
          </span>
          <span className="n">
            {t.estado === "medido" ? t.nota : <Chip estado={t.estado ?? "medido"} rotulo={t.nota} />}
          </span>
        </div>
      ))}
    </div>
  );
}

function Pilar({
  n, dados,
}: { n: number; dados: { titulo: string; sub: string; tiles: Tile[] } }) {
  return (
    <section>
      <div className="pillar-head">
        <span className="tag">Pilar {n}</span>
        <h2>{dados.titulo}</h2>
      </div>
      <p className="pillar-sub">{dados.sub}</p>
      <Tiles tiles={dados.tiles} />
    </section>
  );
}

export default function DashboardPage() {
  const topo = FUNIL[0].valor;

  return (
    <div className="dash">
      <style>{CSS}</style>

      <header className="head">
        <h1>Painel Comercial · Midlej Capital</h1>
        <div className="meta">
          <span>Período: <b>{PERIODO}</b></span>
          <span>Atualizado: <b>{ATUALIZADO}</b></span>
          <span>Fonte: <b>Google Ads · Clarity · registro do Lucas</b></span>
        </div>
      </header>

      {BLOQUEIO && (
        <div className="alert">
          <span className="ic" aria-hidden>⛔</span>
          <p><b>{BLOQUEIO.titulo}</b> {BLOQUEIO.texto}</p>
        </div>
      )}

      <section className="panel">
        <h2>O funil inteiro</h2>
        <p className="sub">
          Onde a operação está hoje, ponta a ponta. As barras são proporcionais ao
          topo — o colapso entre etapas é o dado.
        </p>

        <div className="fnl">
          {FUNIL.map((f, i) => {
            const pct = topo ? (f.valor / topo) * 100 : 0;
            return (
              <div className="fnl-row" key={f.etapa}>
                <span className="fnl-lab">
                  {f.etapa}<span>{f.sub}</span>
                </span>
                <span className="fnl-track">
                  {f.valor > 0 ? (
                    <span className="fnl-bar" style={{ width: `${pct}%`, background: RAMPA[i] }} />
                  ) : (
                    <span className="fnl-zero" />
                  )}
                </span>
                <span className="fnl-val num">
                  {f.valor}
                  {f.conv && (
                    <span className={`fnl-conv${f.queda ? " fnl-drop" : ""}`}>{f.conv}</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        <div className="legend">
          <span>
            <b>Leitura:</b> a operação atrai e captura pouco, mas o corte total está
            na <b style={{ color: "var(--critical-ink)" }}>qualificação</b> — os 2
            leads que chegaram foram à pré-venda e nenhum virou reunião.
          </span>
        </div>
      </section>

      <Pilar n={1} dados={PILAR_1} />

      <section>
        <div className="pillar-head">
          <span className="tag">Pilar 2</span>
          <h2>{PILAR_2.titulo}</h2>
        </div>
        <p className="pillar-sub">{PILAR_2.sub}</p>
        <Tiles tiles={PILAR_2.tiles} />

        <div className="scroller" style={{ marginTop: "1rem" }}>
          <table>
            <thead>
              <tr><th>Lead</th><th>Origem</th><th>Etapa em que caiu</th><th>Motivo registrado</th></tr>
            </thead>
            <tbody>
              {PERDAS.map((p) => (
                <tr key={p.lead}>
                  <td>{p.lead}</td><td>{p.origem}</td><td>{p.etapa}</td><td>{p.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine">
          Amostra de {PERDAS.length} — insuficiente para concluir padrão. O que ela
          sugere: o filtro precisa acontecer antes da pré-venda, não durante.
        </p>
      </section>

      <Pilar n={3} dados={PILAR_3} />

      <section className="panel">
        <h2>O que falta para o painel ficar completo</h2>
        <p className="sub">
          Cada linha destrava indicadores que hoje aparecem como “falta input”.
          Nenhum deles é computável sem isso.
        </p>

        <div className="scroller" style={{ border: "none" }}>
          <table>
            <thead>
              <tr><th>Input</th><th>Destrava</th><th>Quem fornece</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {INPUTS.map((i) => (
                <tr key={i.input}>
                  <td>{i.input}</td><td>{i.destrava}</td><td>{i.quem}</td>
                  <td><Chip estado={i.estado} rotulo={i.rotulo} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="legend">
          <span><Chip estado="medido" /> número real, de fonte verificada</span>
          <span><Chip estado="aguarda" /> a fórmula existe, falta N &gt; 0</span>
          <span><Chip estado="falta" /> depende de dado que ninguém coleta ainda</span>
        </div>
      </section>

      <footer>
        Janelas de apuração não são idênticas: investimento e cliques cobrem
        26/jun–21/jul (Google Ads, conta 506-787-3288); sessões e rolagem cobrem
        20–21/jul (Microsoft Clarity, projeto xphq0aw5wg, instalado em 20/jul);
        leads, pré-vendas e ativações são registro manual do Lucas.<br />
        Nenhum número aqui é estimado. O que não foi medido aparece como “falta
        input” — nunca preenchido por inferência.
      </footer>
    </div>
  );
}

const CSS = `
.dash {
  color-scheme: light;
  --surface-1:#fcfcfb; --plane:#f4f6f7;
  --ink-1:#0b0b0b; --ink-2:#4e565c; --ink-3:#83898d;
  --rule:#e0e4e6; --rule-2:#eef1f2; --baseline:#c3c6c8;
  --f1:#86b6ef; --f2:#5598e7; --f3:#2a78d6; --f4:#1c5cab; --f5:#104281;
  --critical:#d03b3b; --good-ink:#006300; --serious-ink:#a34a22; --critical-ink:#b02f2f;
  background:var(--plane); color:var(--ink-1);
  font-family: system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:15px; line-height:1.55; min-height:100vh;
  max-width:64rem; margin:0 auto; padding:2.5rem 1.25rem 5rem;
  display:flex; flex-direction:column; gap:2rem;
}
@media (prefers-color-scheme: dark) {
  .dash {
    color-scheme: dark;
    --surface-1:#1a1a19; --plane:#0d0f10;
    --ink-1:#ffffff; --ink-2:#b9c0c4; --ink-3:#8a9094;
    --rule:#2b3033; --rule-2:#212527; --baseline:#383c3e;
    --f1:#9ec5f4; --f2:#6da7ec; --f3:#3987e5; --f4:#256abf; --f5:#184f95;
    --good-ink:#0ca30c; --serious-ink:#ec835a; --critical-ink:#e06b6b;
  }
}
.dash .num { font-variant-numeric:tabular-nums; }
.dash .head { display:flex; flex-direction:column; gap:.75rem;
  border-bottom:2px solid var(--ink-1); padding-bottom:1.25rem; }
.dash .head h1 { margin:0; font-size:clamp(1.5rem,3.5vw,2rem); font-weight:700;
  letter-spacing:-.02em; line-height:1.15; }
.dash .meta { display:flex; flex-wrap:wrap; gap:.4rem 1.25rem; font-size:.78rem; color:var(--ink-3); }
.dash .meta b { color:var(--ink-2); font-weight:600; }
.dash .alert { display:flex; gap:.7rem; align-items:flex-start; padding:.9rem 1rem;
  border-radius:8px; background:var(--surface-1);
  border:1px solid var(--rule); border-left:3px solid var(--critical); }
.dash .alert .ic { flex:none; }
.dash .alert p { margin:0; font-size:.88rem; color:var(--ink-2); }
.dash .alert b { color:var(--ink-1); }
.dash .panel { background:var(--surface-1); border:1px solid var(--rule);
  border-radius:10px; padding:1.4rem 1.25rem; }
.dash .panel > h2 { margin:0 0 .25rem; font-size:1.05rem; font-weight:700; letter-spacing:-.01em; }
.dash .panel > .sub { margin:0 0 1.35rem; font-size:.82rem; color:var(--ink-3); }
.dash .fnl { display:flex; flex-direction:column; }
.dash .fnl-row { display:grid; grid-template-columns:11rem 1fr 5.5rem; align-items:center;
  gap:.85rem; padding:.5rem 0; border-bottom:1px solid var(--rule-2); }
.dash .fnl-row:last-child { border-bottom:none; }
.dash .fnl-lab { font-size:.85rem; color:var(--ink-2); }
.dash .fnl-lab span { display:block; font-size:.7rem; color:var(--ink-3); }
.dash .fnl-track { position:relative; height:22px; display:flex; align-items:center; }
.dash .fnl-bar { height:22px; border-radius:0 4px 4px 0; min-width:3px; }
.dash .fnl-zero { width:3px; height:22px; background:var(--baseline); border-radius:0 2px 2px 0; }
.dash .fnl-val { text-align:right; font-size:1rem; font-weight:650; }
.dash .fnl-conv { font-size:.72rem; color:var(--ink-3); font-weight:400; display:block; }
.dash .fnl-drop { color:var(--critical-ink); font-weight:600; }
.dash .pillar-head { display:flex; align-items:baseline; gap:.75rem; flex-wrap:wrap; margin-bottom:.15rem; }
.dash .pillar-head h2 { margin:0; font-size:1.15rem; font-weight:700; letter-spacing:-.01em; }
.dash .pillar-head .tag { font-size:.68rem; letter-spacing:.1em; text-transform:uppercase;
  color:var(--ink-3); font-weight:600; }
.dash .pillar-sub { margin:0 0 1rem; font-size:.85rem; color:var(--ink-2); max-width:62ch; }
.dash .tiles { display:grid; grid-template-columns:repeat(auto-fit,minmax(10.5rem,1fr));
  gap:1px; background:var(--surface-1); border:1px solid var(--rule);
  border-radius:10px; overflow:hidden; }
.dash .tile { background:var(--surface-1); padding:.95rem 1rem; box-shadow:0 0 0 1px var(--rule);
  display:flex; flex-direction:column; gap:.15rem; min-height:6.2rem; }
.dash .tile .k { font-size:.72rem; color:var(--ink-3); font-weight:600; }
.dash .tile .v { font-size:1.6rem; font-weight:650; line-height:1.15; letter-spacing:-.02em; }
.dash .tile .v.pend { font-size:1.05rem; font-weight:600; color:var(--ink-3); }
.dash .tile .n { font-size:.72rem; color:var(--ink-3); margin-top:auto; padding-top:.3rem; }
.dash .chip { display:inline-flex; align-items:center; gap:.3rem; font-size:.68rem;
  font-weight:650; padding:.1rem .4rem; border-radius:4px; border:1px solid currentColor; width:fit-content; }
.dash .chip.ok { color:var(--good-ink); }
.dash .chip.wait { color:var(--serious-ink); }
.dash .chip.miss { color:var(--critical-ink); }
.dash .scroller { overflow-x:auto; border:1px solid var(--rule); border-radius:10px; background:var(--surface-1); }
.dash table { border-collapse:collapse; width:100%; min-width:34rem; font-size:.85rem; }
.dash th, .dash td { text-align:left; padding:.6rem .85rem; border-bottom:1px solid var(--rule-2); }
.dash th { font-size:.7rem; letter-spacing:.06em; text-transform:uppercase; color:var(--ink-3);
  font-weight:600; border-bottom:1px solid var(--rule); }
.dash tbody tr:last-child td { border-bottom:none; }
.dash .fine { font-size:.78rem; color:var(--ink-3); margin:.6rem 0 0; }
.dash .legend { display:flex; flex-wrap:wrap; gap:.5rem 1rem; font-size:.75rem; color:var(--ink-3);
  margin-top:.9rem; padding-top:.8rem; border-top:1px solid var(--rule-2); }
.dash footer { font-size:.75rem; color:var(--ink-3); line-height:1.7;
  border-top:1px solid var(--rule); padding-top:1rem; }
@media (max-width:32rem) {
  .dash .fnl-row { grid-template-columns:7.5rem 1fr 4.2rem; gap:.5rem; }
  .dash .fnl-lab { font-size:.78rem; }
}
`;
