import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { ATUALIZADO } from "./data";

export const metadata: Metadata = {
  title: { absolute: "Painel · Midlej Capital" },
  robots: { index: false, follow: false, nocache: true },
};

const PAGINAS = [
  { href: "", nome: "Geração de demanda" },
  { href: "/comercial", nome: "Comercial" },
  { href: "/carteira", nome: "Carteira própria" },
];

export default async function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  /* O middleware repassa o segmento secreto — os links da navegação
     precisam carregá-lo, senão levariam a 404. */
  const h = await headers();
  const token = h.get("x-midlej-token") ?? "";
  const base = `/dashboard/${token}`;

  return (
    <div className="dash">
      <style>{CSS}</style>

      <header className="head">
        <div className="head-top">
          <h1>Painel · Midlej Capital</h1>
          <span className="atualizado">Atualizado {ATUALIZADO}</span>
        </div>
        <nav className="nav">
          {PAGINAS.map((p) => (
            <Link key={p.nome} href={`${base}${p.href}`} className="nav-link">
              {p.nome}
            </Link>
          ))}
        </nav>
      </header>

      {children}

      <footer>
        Fontes: Google Ads (conta 506-787-3288) · Microsoft Clarity (xphq0aw5wg) ·
        registro interno do Lucas.<br />
        Nenhum número aqui é estimado. O que não foi medido aparece com o estado
        explícito — nunca preenchido por inferência.
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
  --good:#0ca30c; --critical:#d03b3b;
  --good-ink:#006300; --serious-ink:#a34a22; --critical-ink:#b02f2f;
  background:var(--plane); color:var(--ink-1);
  font-family: system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:15px; line-height:1.55; min-height:100vh;
  max-width:64rem; margin:0 auto; padding:2rem 1.25rem 4rem;
  display:flex; flex-direction:column; gap:1.75rem;
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

.dash .head { display:flex; flex-direction:column; gap:1rem;
  border-bottom:1px solid var(--rule); padding-bottom:0; }
.dash .head-top { display:flex; align-items:baseline; justify-content:space-between;
  gap:1rem; flex-wrap:wrap; }
.dash .head h1 { margin:0; font-size:1.35rem; font-weight:700; letter-spacing:-.02em; }
.dash .atualizado { font-size:.75rem; color:var(--ink-3); }
.dash .nav { display:flex; gap:.25rem; flex-wrap:wrap; }
.dash .nav-link { font-size:.85rem; font-weight:600; color:var(--ink-2);
  text-decoration:none; padding:.5rem .8rem; border-bottom:2px solid transparent;
  border-radius:6px 6px 0 0; }
.dash .nav-link:hover { color:var(--ink-1); background:var(--surface-1); }
.dash .nav-link:focus-visible { outline:2px solid var(--f3); outline-offset:2px; }

.dash .pg-head { display:flex; flex-direction:column; gap:.4rem; }
.dash .pg-head h2 { margin:0; font-size:1.5rem; font-weight:700; letter-spacing:-.02em; }
.dash .pg-head p { margin:0; font-size:.9rem; color:var(--ink-2); max-width:64ch; }

.dash section { display:flex; flex-direction:column; gap:.9rem; }
.dash .sec-tit { margin:0; font-size:.72rem; font-weight:700; letter-spacing:.1em;
  text-transform:uppercase; color:var(--ink-3); }

.dash .alert { display:flex; gap:.7rem; align-items:flex-start; padding:.85rem 1rem;
  border-radius:8px; background:var(--surface-1); border:1px solid var(--rule);
  border-left:3px solid var(--critical); }
.dash .alert .ic { flex:none; }
.dash .alert p { margin:0; font-size:.86rem; color:var(--ink-2); }
.dash .alert b { color:var(--ink-1); }

.dash .tiles { display:grid; grid-template-columns:repeat(auto-fit,minmax(10.5rem,1fr));
  gap:1px; background:var(--surface-1); border:1px solid var(--rule);
  border-radius:10px; overflow:hidden; }
.dash .tile { background:var(--surface-1); padding:.9rem 1rem; box-shadow:0 0 0 1px var(--rule);
  display:flex; flex-direction:column; gap:.15rem; min-height:6rem; }
.dash .tile .k { font-size:.72rem; color:var(--ink-3); font-weight:600; }
.dash .tile .v { font-size:1.55rem; font-weight:650; line-height:1.15; letter-spacing:-.02em; }
.dash .tile .v.pend { font-size:1rem; font-weight:600; color:var(--ink-3); }
.dash .tile .n { font-size:.72rem; color:var(--ink-3); margin-top:auto; padding-top:.3rem; }

.dash .chip { display:inline-flex; align-items:center; gap:.3rem; font-size:.68rem;
  font-weight:650; padding:.1rem .4rem; border-radius:4px; border:1px solid currentColor;
  width:fit-content; }
.dash .chip.ok { color:var(--good-ink); }
.dash .chip.wait { color:var(--serious-ink); }
.dash .chip.miss { color:var(--critical-ink); }

.dash .meta-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(15rem,1fr)); gap:1rem; }
.dash .meta-kpi { background:var(--surface-1); border:1px solid var(--rule);
  border-radius:10px; padding:.9rem 1rem; display:flex; flex-direction:column; gap:.55rem; }
.dash .mk-top { display:flex; align-items:baseline; justify-content:space-between; gap:.75rem; }
.dash .mk-tit { font-size:.78rem; color:var(--ink-3); font-weight:600; }
.dash .mk-real { font-size:1.3rem; font-weight:650; letter-spacing:-.02em; }
.dash .mk-track { position:relative; height:8px; background:var(--rule-2);
  border-radius:4px; overflow:hidden; }
.dash .mk-fill { position:absolute; inset:0 auto 0 0; border-radius:4px; }
.dash .mk-sem { position:absolute; inset:0; background:repeating-linear-gradient(
  135deg, var(--rule-2) 0 6px, var(--rule) 6px 12px); }
.dash .mk-nota { margin:0; font-size:.75rem; color:var(--ink-3); }
.dash .mk-bom { color:var(--good-ink); font-weight:650; }
.dash .mk-ruim { color:var(--critical-ink); font-weight:650; }

.dash .chart { background:var(--surface-1); border:1px solid var(--rule);
  border-radius:10px; padding:1.1rem 1.15rem; }
.dash .ch-head { display:flex; align-items:flex-start; justify-content:space-between;
  gap:1rem; flex-wrap:wrap; margin-bottom:.9rem; }
.dash .ch-head h3 { margin:0; font-size:.95rem; font-weight:700; letter-spacing:-.01em; }
.dash .ch-head p { margin:.15rem 0 0; font-size:.78rem; color:var(--ink-3); max-width:52ch; }
.dash .ch-dp { font-size:.75rem; color:var(--ink-3); }
.dash .ch-dp b { color:var(--ink-2); }
.dash .ch-plot { width:100%; height:180px; }
.dash .ch-plot svg { width:100%; height:100%; display:block; }
.dash .ch-vazio { margin:.6rem 0 0; }

.dash .scroller { overflow-x:auto; border:1px solid var(--rule);
  border-radius:10px; background:var(--surface-1); }
.dash table { border-collapse:collapse; width:100%; min-width:32rem; font-size:.85rem; }
.dash th, .dash td { text-align:left; padding:.6rem .85rem; border-bottom:1px solid var(--rule-2); }
.dash th { font-size:.7rem; letter-spacing:.06em; text-transform:uppercase;
  color:var(--ink-3); font-weight:600; border-bottom:1px solid var(--rule); }
.dash th.r, .dash td.r { text-align:right; }
.dash tbody tr:last-child td { border-bottom:none; }

.dash .fine { font-size:.78rem; color:var(--ink-3); margin:0; }
.dash footer { font-size:.73rem; color:var(--ink-3); line-height:1.7;
  border-top:1px solid var(--rule); padding-top:1rem; margin-top:.5rem; }
`;
