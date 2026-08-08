/* Painel Comercial — Midlej.
   Dados: no load, busca /api/dash/data (store compartilhado). Se vier JSON
   válido, usa ele; se vier null/erro, usa os globais do data.js (exemplo).
   O painel NUNCA aparece vazio. Aba "Atualizar" grava no store via POST com
   senha (header x-dash-password). Vanilla JS, sem libs. */
(function () {
  "use strict";

  /* ---------- fallback = exemplo do data.js ---------- */
  const FALLBACK = {
    consultores: typeof CONSULTORES !== "undefined" ? CONSULTORES.slice() : [],
    semanas: typeof SEMANAS !== "undefined" ? SEMANAS.slice() : [],
    metas: typeof METAS !== "undefined" ? JSON.parse(JSON.stringify(METAS)) : {},
    bench: typeof BENCH !== "undefined" ? JSON.parse(JSON.stringify(BENCH)) : {},
    raw: typeof RAW !== "undefined" ? JSON.parse(JSON.stringify(RAW)) : [],
  };

  /* ---------- estado vivo (sombra dos globais) ---------- */
  let CONS = [],
    SEM = [],
    MET = {},
    BEN = {},
    ROWS = [],
    D = [];

  function applyData(data) {
    CONS = Array.isArray(data.consultores) ? data.consultores : [];
    SEM = Array.isArray(data.semanas) ? data.semanas : [];
    MET = data.metas || {};
    BEN = data.bench || {};
    ROWS = Array.isArray(data.raw) ? data.raw : [];
    D = ROWS.map((r) => ({
      sem: r[0],
      consultor: r[1],
      canal: r[2],
      tipo: r[3],
      topo: r[4],
      meio: r[5],
      agen: r[6],
      real: r[7],
      vendas: r[8],
      receita: r[9],
      speed: r[10],
    }));
  }

  /* ---------- helpers ---------- */
  const $ = (id) => document.getElementById(id);
  const fmt = (n) => Number(n || 0).toLocaleString("pt-BR");
  const brl = (n) => "R$ " + Math.round(Number(n || 0)).toLocaleString("pt-BR");
  const pct = (a, b, d = 1) =>
    b ? ((a / b) * 100).toFixed(d).replace(".", ",") + "%" : "—";
  const sum = (arr, k) => arr.reduce((s, x) => s + (x[k] || 0), 0);
  const el = (tag, attrs) => {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) e[k] = attrs[k];
    return e;
  };

  function status(v, range, invert = false) {
    const [lo, hi] = range || [0, 0];
    if (v == null || isNaN(v)) return "warn";
    if (invert) return v <= lo ? "ok" : v <= hi ? "warn" : "bad";
    return v >= lo ? (v >= hi ? "ok" : "ok") : v >= lo * 0.7 ? "warn" : "bad";
  }
  const stDot = (s) => `<span class="dot ${s}"></span>`;

  /* ---------- filtro de consultor (dropdown) ---------- */
  function populateConsultorFilter() {
    const sel = $("fConsultor");
    if (!sel) return;
    const cur = sel.value;
    sel.innerHTML = '<option value="all">Todos</option>';
    CONS.forEach((c) => {
      const o = el("option", { value: c, textContent: c });
      sel.appendChild(o);
    });
    sel.value = CONS.includes(cur) || cur === "all" ? cur : "all";
  }

  function filtered() {
    const p = $("fPeriodo").value,
      c = $("fConsultor").value,
      k = $("fCanal").value;
    const lastWeek = SEM.length ? SEM.length - 1 : 3;
    return D.filter((r) => {
      if (p === "7" && r.sem !== lastWeek) return false;
      if (c !== "all" && r.consultor !== c) return false;
      if (k === "out" && r.tipo !== "out") return false;
      if (k === "in" && r.tipo !== "in") return false;
      if (!["all", "out", "in"].includes(k) && r.canal !== k) return false;
      return true;
    });
  }

  /* ================= RENDER ================= */
  function render() {
    const f = filtered();
    const weeks = $("fPeriodo").value === "7" ? 1 : SEM.length || 4;
    const out = f.filter((r) => r.tipo === "out"),
      inb = f.filter((r) => r.tipo === "in");
    const P = MET.porConsultor || {};

    const m = {
      leads: sum(inb, "topo"),
      qual: sum(inb, "meio"),
      tent: sum(out, "topo"),
      conex: sum(out, "meio"),
      agen: sum(f, "agen"),
      real: sum(f, "real"),
      vendas: sum(f, "vendas"),
      receita: sum(f, "receita"),
      connect: sum(out, "topo") ? sum(out, "meio") / sum(out, "topo") : null,
      agendOut: sum(out, "meio") ? sum(out, "agen") / sum(out, "meio") : null,
      showOut: sum(out, "agen") ? sum(out, "real") / sum(out, "agen") : null,
      winOut: sum(out, "real") ? sum(out, "vendas") / sum(out, "real") : null,
      qualR: sum(inb, "topo") ? sum(inb, "meio") / sum(inb, "topo") : null,
      agendIn: sum(inb, "meio") ? sum(inb, "agen") / sum(inb, "meio") : null,
      showIn: sum(inb, "agen") ? sum(inb, "real") / sum(inb, "agen") : null,
      winIn: sum(inb, "real") ? sum(inb, "vendas") / sum(inb, "real") : null,
      speed: inb.filter((x) => x.speed != null).length
        ? inb.reduce((s, x) => s + (x.speed || 0), 0) /
          inb.filter((x) => x.speed != null).length
        : null,
      noshow: sum(f, "agen") ? 1 - sum(f, "real") / sum(f, "agen") : null,
    };
    const metaLeads = (MET.leadsSemana || 0) * weeks;
    const metaRec = (MET.receitaMes || 0) * ((SEM.length ? weeks : 1) / (SEM.length || 4));

    const kpi = (lbl, val, meta, pill, color) => `
      <div class="kpi" style="--kc:${color}">
        <div class="lbl">${lbl}</div><div class="val num">${val}</div>
        <div class="meta num">${meta}</div>${pill || ""}
      </div>`;
    const pLeads = metaLeads ? m.leads / metaLeads : 0,
      pRec = metaRec ? m.receita / metaRec : 0;
    $("kpis").innerHTML =
      kpi(
        "Leads inbound",
        fmt(m.leads),
        `Meta: <b>${fmt(metaLeads)}</b>`,
        `<span class="pill ${pLeads >= 0.9 ? "ok" : pLeads >= 0.5 ? "warn" : "bad"}">${pct(m.leads, metaLeads, 1)} da meta</span>`,
        "var(--teal)",
      ) +
      kpi(
        "Contatos efetivos",
        fmt(m.conex),
        `Connect rate: <b>${m.connect != null ? pct(m.connect * 100, 100) : "—"}</b>`,
        `<span class="pill ${m.connect >= 0.05 ? "ok" : m.connect >= 0.035 ? "warn" : "bad"}">benchmark 5–10%</span>`,
        "var(--navy-3)",
      ) +
      kpi(
        "Reuniões agendadas",
        fmt(m.agen),
        `Realizadas: <b>${fmt(m.real)}</b>`,
        `<span class="pill ${m.noshow <= 0.25 ? "ok" : m.noshow <= 0.35 ? "warn" : "bad"}">no-show ${m.noshow != null ? pct(m.noshow * 100, 100) : "—"}</span>`,
        "var(--gold)",
      ) +
      kpi(
        "Vendas fechadas",
        fmt(m.vendas),
        `Ticket médio: <b>${m.vendas ? brl(m.receita / m.vendas) : "—"}</b>`,
        `<span class="pill ${(m.winOut || 0) >= 0.15 || (m.winIn || 0) >= 0.25 ? "ok" : "warn"}">win out ${m.winOut != null ? pct(m.winOut * 100, 100, 0) : "—"} · in ${m.winIn != null ? pct(m.winIn * 100, 100, 0) : "—"}</span>`,
        "var(--ok)",
      ) +
      kpi(
        "Receita no período",
        brl(m.receita),
        `Meta: <b>${brl(metaRec)}</b>`,
        `<span class="pill ${pRec >= 0.9 ? "ok" : pRec >= 0.6 ? "warn" : "bad"}">${pct(m.receita, metaRec, 1)} da meta</span>`,
        "var(--gold)",
      );

    const funnel = (node, stages, benchMap) => {
      if (!stages[0].v) {
        node.innerHTML = '<div class="empty">Sem dados no filtro atual</div>';
        return;
      }
      const max = stages[0].v || 1;
      node.innerHTML = stages
        .map((s, i) => {
          let conv = "",
            st = "";
          if (i > 0 && stages[i - 1].v) {
            const r = s.v / stages[i - 1].v,
              b = benchMap[i - 1];
            st = b ? status(r, b) : "ok";
            conv = `${stDot(st)} ${pct(s.v, stages[i - 1].v, 0)} ${b ? `<span class="bench">bmk ${Math.round(b[0] * 100)}–${Math.round(b[1] * 100)}%</span>` : ""}`;
          } else conv = '<span class="bench">100%</span>';
          return `<div class="fstage"><span class="name">${s.n}</span>
          <div class="fbar"><i style="--w:${Math.max(6, (s.v / max) * 100)}%"></i><b class="num">${fmt(s.v)}</b></div>
          <span class="fconv num">${conv}</span></div>`;
        })
        .join("");
    };
    funnel(
      $("funOut"),
      [
        { n: "Tentativas", v: m.tent },
        { n: "Contatos efetivos", v: m.conex },
        { n: "Agendadas", v: sum(out, "agen") },
        { n: "Realizadas", v: sum(out, "real") },
        { n: "Vendas", v: sum(out, "vendas") },
      ],
      [BEN.connect, BEN.agendOut, BEN.show, BEN.winOut],
    );
    funnel(
      $("funIn"),
      [
        { n: "Leads", v: m.leads },
        { n: "Qualificados", v: m.qual },
        { n: "Agendadas", v: sum(inb, "agen") },
        { n: "Realizadas", v: sum(inb, "real") },
        { n: "Vendas", v: sum(inb, "vendas") },
      ],
      [BEN.qual, BEN.agendIn, BEN.show, BEN.winIn],
    );

    const mini = (lbl, val, bench, st) => `<div class="mini"><div class="lbl">${lbl}</div>
      <div class="val num">${stDot(st)} ${val}</div><div class="bench">${bench}</div></div>`;
    $("quality").innerHTML =
      mini(
        "Speed to lead",
        m.speed != null ? Math.round(m.speed) + " min" : "—",
        "meta &lt; 5 min",
        m.speed == null ? "warn" : m.speed <= 5 ? "ok" : m.speed <= 15 ? "warn" : "bad",
      ) +
      mini(
        "No-show",
        m.noshow != null ? pct(m.noshow * 100, 100) : "—",
        "benchmark ≤ 25%",
        m.noshow == null ? "warn" : m.noshow <= 0.25 ? "ok" : m.noshow <= 0.35 ? "warn" : "bad",
      ) +
      mini(
        "Win rate outbound",
        m.winOut != null ? pct(m.winOut * 100, 100, 0) : "—",
        "benchmark 15–25%",
        m.winOut == null ? "warn" : status(m.winOut, BEN.winOut),
      ) +
      mini(
        "Win rate inbound",
        m.winIn != null ? pct(m.winIn * 100, 100, 0) : "—",
        "benchmark 25–40%",
        m.winIn == null ? "warn" : status(m.winIn, BEN.winIn),
      );

    const canais = [...new Set(f.map((r) => r.canal))];
    const agg = canais
      .map((c) => {
        const rs = f.filter((r) => r.canal === c);
        return {
          c,
          topo: sum(rs, "topo"),
          vendas: sum(rs, "vendas"),
          real: sum(rs, "real"),
          win: sum(rs, "real") ? sum(rs, "vendas") / sum(rs, "real") : null,
          tipo: rs[0].tipo,
        };
      })
      .sort((a, b) => b.topo - a.topo);
    const maxT = Math.max(...agg.map((a) => a.topo), 1);
    $("chan").innerHTML = agg
      .map(
        (a) => `
      <div class="chanrow"><div class="name">${a.c}<span>${a.tipo === "out" ? "tentativas" : "leads"}</span></div>
        <div class="cbar"><i style="--w:${Math.max(3, (a.topo / maxT) * 100)}%;--cc:${a.tipo === "out" ? "var(--navy-3)" : "var(--teal)"}"></i></div>
        <div class="stats num"><b>${fmt(a.topo)}</b> · ${a.vendas} venda${a.vendas === 1 ? "" : "s"} · win ${a.win != null ? pct(a.win * 100, 100, 0) : "—"}</div>
      </div>`,
      )
      .join("");

    /* ---- Evolução semanal (SVG) ---- */
    const nWeeks = SEM.length || 4;
    const semShow =
      $("fPeriodo").value === "7"
        ? [nWeeks - 1]
        : Array.from({ length: nWeeks }, (_, i) => i);
    const wk = semShow.map((s) => sum(f.filter((r) => r.sem === s), "real"));
    const metaW = MET.reunioesSemana || 0;
    const W = 460,
      H = 150,
      pad = 28,
      maxY = Math.max(...wk, metaW) * 1.25 || 1;
    const X = (i) => (wk.length > 1 ? pad + (i * (W - pad * 2)) / (wk.length - 1) : W / 2),
      Y = (v) => H - 18 - (v / maxY) * (H - 42);
    const pts = wk.map((v, i) => `${X(i)},${Y(v)}`).join(" ");
    $("weekly").innerHTML = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto" role="img" aria-label="Reuniões realizadas por semana">
      <line x1="${pad}" y1="${Y(metaW)}" x2="${W - pad}" y2="${Y(metaW)}" stroke="#B9C2D0" stroke-width="2" stroke-dasharray="5 5"/>
      <polyline points="${pts}" fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${wk
        .map(
          (v, i) => `<circle cx="${X(i)}" cy="${Y(v)}" r="4" fill="var(--navy)" stroke="var(--gold)" stroke-width="2"/>
        <text x="${X(i)}" y="${Y(v) - 10}" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2536">${v}</text>
        <text x="${X(i)}" y="${H - 2}" text-anchor="middle" font-size="10.5" fill="#6B7484">${SEM[semShow[i]] || ""}</text>`,
        )
        .join("")}
    </svg>`;

    /* ---- Consultores ---- */
    const consSel = $("fConsultor").value === "all" ? CONS : [$("fConsultor").value];
    $("cons").innerHTML = consSel
      .map((c) => {
        const rs = f.filter((r) => r.consultor === c);
        const rec = sum(rs, "receita"),
          meta = (P[c] || 0) * (weeks / (SEM.length || 4));
        const w = meta ? Math.min(100, (rec / (meta * 1.15)) * 100) : 0,
          mpos = Math.min(100, 100 / 1.15);
        const win = sum(rs, "real") ? sum(rs, "vendas") / sum(rs, "real") : null;
        const p = meta ? rec / meta : 0,
          st = p >= 0.9 ? "ok" : p >= 0.6 ? "warn" : "bad";
        return `<div class="conrow"><div class="who">${stDot(st)} ${c}<span>meta ${brl(meta)}</span></div>
        <div><div class="conbar"><i style="--w:${w}%"></i><em style="--m:${mpos}%"></em></div>
          <div class="constats num"><span><b>${brl(rec)}</b> (${pct(rec, meta, 0)})</span>
            <span>Reuniões: <b>${sum(rs, "real")}</b></span>
            <span>Vendas: <b>${sum(rs, "vendas")}</b></span>
            <span>Win rate: <b>${win != null ? pct(win * 100, 100, 0) : "—"}</b></span></div></div></div>`;
      })
      .join("");

    const maxM = Math.max(m.agen, 1);
    $("meet").innerHTML = `
      <div class="mb"><b class="num">${m.agen}</b><i style="height:${(m.agen / maxM) * 90 + 8}px;background:var(--navy-3)"></i>Agendadas</div>
      <div class="mb"><b class="num">${m.real}</b><i style="height:${(m.real / maxM) * 90 + 8}px;background:var(--gold)"></i>Realizadas</div>
      <div class="mb"><b class="num">${m.agen - m.real}</b><i style="height:${((m.agen - m.real) / maxM) * 90 + 8}px;background:var(--bad)"></i>No-show</div>`;
    $("meetkpis").innerHTML =
      mini(
        "Taxa de no-show",
        m.noshow != null ? pct(m.noshow * 100, 100) : "—",
        "benchmark ≤ 25%",
        m.noshow == null ? "warn" : m.noshow <= 0.25 ? "ok" : m.noshow <= 0.35 ? "warn" : "bad",
      ) +
      mini(
        "Show rate",
        m.agen ? pct(m.real, m.agen) : "—",
        "benchmark 70–80%",
        m.agen ? (m.real / m.agen >= 0.7 ? "ok" : m.real / m.agen >= 0.55 ? "warn" : "bad") : "warn",
      );

    /* ---- Diagnóstico automático ---- */
    const b = BEN;
    const checks = [
      {
        k: "Geração de leads inbound",
        ratio: metaLeads ? m.leads / metaLeads : 1,
        val: `${fmt(m.leads)} de ${fmt(metaLeads)} (${pct(m.leads, metaLeads, 1)})`,
        rec: "O gargalo está <b>antes do funil de vendas</b>. Prioridade: destravar Google Ads (campanha, lance e página) e cadenciar conteúdo no Instagram e nas redes dos sócios. Nada no funil compensa falta de lead.",
      },
      {
        k: "Connect rate outbound",
        ratio: m.connect != null && b.connect ? m.connect / b.connect[0] : 1,
        val: m.connect != null ? pct(m.connect * 100, 100) + " (bmk 5–10%)" : "—",
        rec: "Poucos decisores atendem. Revisar <b>qualidade e enriquecimento da lista</b>, janelas de ligação (8h–9h30 / 17h30–19h) e alternar canal (WhatsApp + ligação).",
      },
      {
        k: "Agendamento outbound",
        ratio: m.agendOut != null && b.agendOut ? m.agendOut / b.agendOut[0] : 1,
        val: m.agendOut != null ? pct(m.agendOut * 100, 100) + " (bmk 15–25%)" : "—",
        rec: "A conversa acontece mas não vira reunião. Revisar o <b>script de abertura e a oferta do diagnóstico</b> — vender a reunião, não o serviço.",
      },
      {
        k: "Show rate",
        ratio: m.agen && b.show ? m.real / m.agen / b.show[0] : 1,
        val: m.agen ? pct(m.real, m.agen) + " (bmk 70–80%)" : "—",
        rec: "Reunião marcada não acontece. Implantar <b>ritual de confirmação</b>: convite na agenda na hora, lembrete D-1 e 2h antes, reagendamento ativo no no-show.",
      },
      {
        k: "Win rate",
        ratio: Math.min(
          m.winOut != null && b.winOut ? m.winOut / b.winOut[0] : 1,
          m.winIn != null && b.winIn ? m.winIn / b.winIn[0] : 1,
        ),
        val: `out ${m.winOut != null ? pct(m.winOut * 100, 100, 0) : "—"} · in ${m.winIn != null ? pct(m.winIn * 100, 100, 0) : "—"}`,
        rec: "Volume ok, fechamento fraco: gargalo na <b>condução da call</b>. Gravar reuniões, calibrar o assessment e coaching individual do gestor comercial.",
      },
      {
        k: "Speed to lead",
        ratio: m.speed != null && b.speed ? b.speed / m.speed : 1,
        val: m.speed != null ? Math.round(m.speed) + " min (meta < 5 min)" : "—",
        rec: "Lead esfriando na fila. Criar <b>alerta imediato + dono do plantão de atendimento</b>: responder em 5 min multiplica a conversão em relação a 30 min.",
      },
    ].filter((c) => !isNaN(c.ratio) && c.ratio != null);
    const worst = checks.sort((a, b) => a.ratio - b.ratio)[0] || {
      k: "—",
      val: "—",
      rec: "Sem dados suficientes para diagnóstico.",
    };
    $("diag").innerHTML = `
      <div class="seal"><b>M</b><span>DIAGNÓSTICO</span></div>
      <div><h4>Principal gargalo do período</h4>
        <div class="main">${worst.k}: <span class="num">${worst.val}</span> — o elo mais distante do benchmark neste filtro.</div></div>
      <div class="rec"><b>Recomendação ·</b> ${worst.rec}</div>`;
  }

  /* ================= EDITOR (aba Atualizar) ================= */
  const RAW_COLS = [
    { key: "sem", label: "Semana", type: "week" },
    { key: "consultor", label: "Consultor", type: "consultor" },
    { key: "canal", label: "Canal", type: "text" },
    { key: "tipo", label: "Tipo", type: "tipo" },
    { key: "topo", label: "Topo", type: "num" },
    { key: "meio", label: "Meio", type: "num" },
    { key: "agen", label: "Agen.", type: "num" },
    { key: "real", label: "Real.", type: "num" },
    { key: "vendas", label: "Vendas", type: "num" },
    { key: "receita", label: "Receita", type: "num" },
    { key: "speed", label: "Speed", type: "numnull" },
  ];

  let ed = null; // estado de edição (clone)

  function cloneState() {
    return {
      semanas: SEM.slice(),
      consultores: CONS.slice(),
      porConsultor: Object.assign({}, MET.porConsultor || {}),
      metas: {
        leadsSemana: MET.leadsSemana || 0,
        receitaMes: MET.receitaMes || 0,
        reunioesSemana: MET.reunioesSemana || 0,
      },
      bench: JSON.parse(JSON.stringify(BEN || {})),
      raw: JSON.parse(JSON.stringify(ROWS)),
    };
  }

  function buildEditorShell() {
    const panel = el("section", { className: "editor", id: "editor" });
    panel.hidden = true;
    panel.innerHTML = `
      <div class="ed-head">
        <h2>Atualizar dados do painel</h2>
        <button type="button" class="ed-x" id="edClose" aria-label="Fechar">✕</button>
      </div>
      <p class="ed-note">Edite os números abaixo e salve com a senha de edição. Os dados ficam compartilhados — quem abrir o painel vê a última atualização.</p>

      <div class="ed-grid">
        <div class="ed-box">
          <h3>Metas da casa</h3>
          <label>Leads inbound / semana <input type="number" id="edLeads" class="ed-in"></label>
          <label>Receita / mês (R$) <input type="number" id="edRec" class="ed-in"></label>
          <label>Reuniões realizadas / semana <input type="number" id="edReun" class="ed-in"></label>
        </div>
        <div class="ed-box">
          <div class="ed-box-h"><h3>Consultores <span>· nome e meta individual (R$)</span></h3>
            <button type="button" class="ed-add" id="edAddCons">+ consultor</button></div>
          <div id="edConsList" class="ed-list"></div>
        </div>
        <div class="ed-box">
          <div class="ed-box-h"><h3>Semanas <span>· rótulos</span></h3>
            <button type="button" class="ed-add" id="edAddSem">+ semana</button></div>
          <div id="edSemList" class="ed-list"></div>
        </div>
      </div>

      <div class="ed-box">
        <div class="ed-box-h"><h3>Registros <span>· 1 linha = semana × consultor × canal</span></h3>
          <button type="button" class="ed-add" id="edAddRow">+ linha</button></div>
        <div class="ed-tablewrap"><table class="ed-table" id="edTable"></table></div>
      </div>

      <div class="ed-save">
        <label class="ed-pw">Senha de edição <input type="password" id="edPw" class="ed-in" autocomplete="off"></label>
        <button type="button" class="ed-btn" id="edSave">Salvar</button>
        <span class="ed-status" id="edStatus"></span>
      </div>`;
    return panel;
  }

  /* ---- leitura da tabela/inputs para o modelo ed ---- */
  function readEditor() {
    ed.metas.leadsSemana = Number($("edLeads").value) || 0;
    ed.metas.receitaMes = Number($("edRec").value) || 0;
    ed.metas.reunioesSemana = Number($("edReun").value) || 0;

    // consultores + porConsultor
    const cons = [];
    const por = {};
    document.querySelectorAll("#edConsList .ed-row").forEach((row) => {
      const name = row.querySelector(".ed-cons-name").value.trim();
      if (!name) return;
      cons.push(name);
      por[name] = Number(row.querySelector(".ed-cons-meta").value) || 0;
    });
    ed.consultores = cons;
    ed.porConsultor = por;

    // semanas
    const sem = [];
    document.querySelectorAll("#edSemList .ed-sem-in").forEach((i) => {
      sem.push(i.value.trim());
    });
    ed.semanas = sem;

    // raw
    const raw = [];
    document.querySelectorAll("#edTable tbody tr").forEach((tr) => {
      const cells = tr.querySelectorAll("[data-key]");
      const r = [];
      RAW_COLS.forEach((col, idx) => {
        const inp = cells[idx];
        let v = inp.value;
        if (col.type === "num" || col.type === "week") v = Number(v) || 0;
        else if (col.type === "numnull") v = v === "" ? null : Number(v);
        else v = (v || "").toString();
        r.push(v);
      });
      raw.push(r);
    });
    ed.raw = raw;
  }

  function renderConsList() {
    const box = $("edConsList");
    box.innerHTML = "";
    ed.consultores.forEach((name) => {
      const row = el("div", { className: "ed-row" });
      row.innerHTML = `<input class="ed-in ed-cons-name" type="text" value="${escapeAttr(name)}" placeholder="Nome">
        <input class="ed-in ed-cons-meta" type="number" value="${ed.porConsultor[name] || 0}" placeholder="Meta R$">
        <button type="button" class="ed-del" aria-label="Remover">✕</button>`;
      row.querySelector(".ed-del").addEventListener("click", () => {
        readEditor();
        const nm = row.querySelector(".ed-cons-name").value.trim();
        ed.consultores = ed.consultores.filter((c) => c !== nm);
        delete ed.porConsultor[nm];
        renderConsList();
        renderTable();
      });
      box.appendChild(row);
    });
  }

  function renderSemList() {
    const box = $("edSemList");
    box.innerHTML = "";
    ed.semanas.forEach((label, i) => {
      const row = el("div", { className: "ed-row" });
      row.innerHTML = `<input class="ed-in ed-sem-in" type="text" value="${escapeAttr(label)}" placeholder="Rótulo da semana ${i + 1}">
        <button type="button" class="ed-del" aria-label="Remover">✕</button>`;
      row.querySelector(".ed-del").addEventListener("click", () => {
        readEditor();
        ed.semanas.splice(i, 1);
        renderSemList();
        renderTable();
      });
      box.appendChild(row);
    });
  }

  function cellInput(col, value) {
    if (col.type === "week") {
      const opts = ed.semanas
        .map((s, i) => `<option value="${i}"${Number(value) === i ? " selected" : ""}>${i + 1}. ${escapeHtml(s)}</option>`)
        .join("");
      return `<select class="ed-in ed-cell" data-key="${col.key}">${opts}</select>`;
    }
    if (col.type === "consultor") {
      const opts = ed.consultores
        .map((c) => `<option value="${escapeAttr(c)}"${c === value ? " selected" : ""}>${escapeHtml(c)}</option>`)
        .join("");
      return `<select class="ed-in ed-cell" data-key="${col.key}">${opts}</select>`;
    }
    if (col.type === "tipo") {
      return `<select class="ed-in ed-cell" data-key="${col.key}">
        <option value="out"${value === "out" ? " selected" : ""}>out</option>
        <option value="in"${value === "in" ? " selected" : ""}>in</option></select>`;
    }
    if (col.type === "num") {
      return `<input class="ed-in ed-cell ed-num" data-key="${col.key}" type="number" value="${value == null ? 0 : value}">`;
    }
    if (col.type === "numnull") {
      return `<input class="ed-in ed-cell ed-num" data-key="${col.key}" type="number" value="${value == null ? "" : value}" placeholder="—">`;
    }
    return `<input class="ed-in ed-cell" data-key="${col.key}" type="text" value="${escapeAttr(value == null ? "" : value)}">`;
  }

  function renderTable() {
    const t = $("edTable");
    const head =
      "<thead><tr>" +
      RAW_COLS.map((c) => `<th>${c.label}</th>`).join("") +
      "<th></th></tr></thead>";
    const rows = ed.raw
      .map((r) => {
        const tds = RAW_COLS.map((c, i) => `<td>${cellInput(c, r[i])}</td>`).join("");
        return `<tr>${tds}<td><button type="button" class="ed-del" aria-label="Remover linha">✕</button></td></tr>`;
      })
      .join("");
    t.innerHTML = head + "<tbody>" + rows + "</tbody>";
    t.querySelectorAll(".ed-del").forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        readEditor();
        ed.raw.splice(idx, 1);
        renderTable();
      });
    });
  }

  function renderEditor() {
    $("edLeads").value = ed.metas.leadsSemana;
    $("edRec").value = ed.metas.receitaMes;
    $("edReun").value = ed.metas.reunioesSemana;
    renderConsList();
    renderSemList();
    renderTable();
  }

  function openEditor() {
    ed = cloneState();
    renderEditor();
    $("editor").hidden = false;
    setStatus("", "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function closeEditor() {
    $("editor").hidden = true;
  }

  function setStatus(msg, kind) {
    const s = $("edStatus");
    s.textContent = msg;
    s.className = "ed-status" + (kind ? " " + kind : "");
  }

  async function saveEditor() {
    readEditor();
    const pw = $("edPw").value;
    if (!pw) {
      setStatus("Informe a senha de edição.", "bad");
      return;
    }
    const payload = {
      consultores: ed.consultores,
      semanas: ed.semanas,
      metas: {
        leadsSemana: ed.metas.leadsSemana,
        receitaMes: ed.metas.receitaMes,
        reunioesSemana: ed.metas.reunioesSemana,
        porConsultor: ed.porConsultor,
      },
      bench: ed.bench,
      raw: ed.raw,
    };
    setStatus("Salvando…", "");
    $("edSave").disabled = true;
    try {
      const res = await fetch("/api/dash/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-dash-password": pw,
        },
        body: JSON.stringify(payload),
      });
      let body = {};
      try {
        body = await res.json();
      } catch (_) {}
      if (res.ok) {
        applyData(Object.assign({}, payload, { updatedAt: body.updatedAt }));
        populateConsultorFilter();
        render();
        markUpdated(body.updatedAt);
        $("edPw").value = "";
        closeEditor();
      } else if (res.status === 401) {
        setStatus("Senha incorreta.", "bad");
      } else if (res.status === 503) {
        setStatus(body.error || "Armazenamento/senha não configurados no servidor.", "bad");
      } else if (res.status === 400) {
        setStatus("Dados inválidos: revise os campos.", "bad");
      } else {
        setStatus(body.error || "Falha ao salvar. Tente de novo.", "bad");
      }
    } catch (err) {
      setStatus("Erro de rede ao salvar.", "bad");
    } finally {
      $("edSave").disabled = false;
    }
  }

  /* ---- utils de escape ---- */
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[<>&]/g, (c) =>
      c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;",
    );
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, "&quot;");
  }

  /* ---- badge "última atualização" ---- */
  function markUpdated(iso) {
    const b = $("edUpdated");
    if (!b) return;
    if (!iso) {
      b.textContent = "";
      return;
    }
    const d = new Date(iso);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    b.textContent = `atualizado ${dd}/${mo} às ${hh}:${mm}`;
  }

  /* ================= BOOT ================= */
  function mountControls() {
    // botão "Atualizar" + badge, junto dos filtros
    const filters = document.querySelector(".filters");
    if (filters) {
      const wrap = el("div", { className: "filter ed-toggle-wrap" });
      wrap.innerHTML = `<label>&nbsp;</label>
        <button type="button" class="ed-toggle" id="edToggle">Atualizar dados</button>
        <span class="ed-updated" id="edUpdated"></span>`;
      filters.appendChild(wrap);
    }
    document.body.appendChild(buildEditorShell());

    const toggle = $("edToggle");
    if (toggle)
      toggle.addEventListener("click", () => {
        const p = $("editor");
        if (p.hidden) openEditor();
        else closeEditor();
      });
    $("edClose").addEventListener("click", closeEditor);
    $("edSave").addEventListener("click", saveEditor);
    $("edAddCons").addEventListener("click", () => {
      readEditor();
      ed.consultores.push("");
      renderConsList();
      renderTable();
    });
    $("edAddSem").addEventListener("click", () => {
      readEditor();
      ed.semanas.push("");
      renderSemList();
      renderTable();
    });
    $("edAddRow").addEventListener("click", () => {
      readEditor();
      const first = ed.consultores[0] || "";
      ed.raw.push([0, first, "", "out", 0, 0, 0, 0, 0, 0, null]);
      renderTable();
    });
  }

  function initFilters() {
    populateConsultorFilter();
    ["fPeriodo", "fConsultor", "fCanal"].forEach((id) => {
      const node = $(id);
      if (node) node.addEventListener("change", render);
    });
  }

  function boot() {
    // 1) render imediato com o exemplo (nunca vazio)
    applyData(FALLBACK);
    initFilters();
    mountControls();
    render();

    // 2) busca o store compartilhado; se houver, sobrepõe
    fetch("/api/dash/data", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data === "object" && Array.isArray(data.raw)) {
          applyData(data);
          populateConsultorFilter();
          render();
          markUpdated(data.updatedAt);
        }
      })
      .catch(() => {
        /* offline / sem store: mantém o exemplo */
      });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
