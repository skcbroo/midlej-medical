const D = RAW.map(r=>({sem:r[0],consultor:r[1],canal:r[2],tipo:r[3],topo:r[4],meio:r[5],agen:r[6],real:r[7],vendas:r[8],receita:r[9],speed:r[10]}));
const $=id=>document.getElementById(id);
const fmt=n=>n.toLocaleString('pt-BR');
const brl=n=>'R$ '+Math.round(n).toLocaleString('pt-BR');
const pct=(a,b,d=1)=>b?((a/b*100).toFixed(d).replace('.',',')+'%'):'—';
const sum=(arr,k)=>arr.reduce((s,x)=>s+(x[k]||0),0);

function status(v, [lo,hi], invert=false){
  if(v==null||isNaN(v)) return 'warn';
  if(invert) return v<=lo?'ok':(v<=hi?'warn':'bad');
  return v>=lo?(v>=hi?'ok':'ok'):(v>=lo*0.7?'warn':'bad');
}
function stDot(s){return `<span class="dot ${s}"></span>`}

CONSULTORES.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;$('fConsultor').appendChild(o)});
['fPeriodo','fConsultor','fCanal'].forEach(id=>$(id).addEventListener('change',render));

function filtered(){
  const p=$('fPeriodo').value, c=$('fConsultor').value, k=$('fCanal').value;
  return D.filter(r=>{
    if(p==='7'&&r.sem!==3)return false;
    if(c!=='all'&&r.consultor!==c)return false;
    if(k==='out'&&r.tipo!=='out')return false;
    if(k==='in'&&r.tipo!=='in')return false;
    if(!['all','out','in'].includes(k)&&r.canal!==k)return false;
    return true;
  });
}

function render(){
  const f=filtered();
  const weeks=$('fPeriodo').value==='7'?1:4;
  const out=f.filter(r=>r.tipo==='out'), inb=f.filter(r=>r.tipo==='in');

  /* ---- métricas agregadas ---- */
  const m={
    leads:sum(inb,'topo'), qual:sum(inb,'meio'),
    tent:sum(out,'topo'), conex:sum(out,'meio'),
    agen:sum(f,'agen'), real:sum(f,'real'),
    vendas:sum(f,'vendas'), receita:sum(f,'receita'),
    connect:sum(out,'topo')?sum(out,'meio')/sum(out,'topo'):null,
    agendOut:sum(out,'meio')?sum(out,'agen')/sum(out,'meio'):null,
    showOut:sum(out,'agen')?sum(out,'real')/sum(out,'agen'):null,
    winOut:sum(out,'real')?sum(out,'vendas')/sum(out,'real'):null,
    qualR:sum(inb,'topo')?sum(inb,'meio')/sum(inb,'topo'):null,
    agendIn:sum(inb,'meio')?sum(inb,'agen')/sum(inb,'meio'):null,
    showIn:sum(inb,'agen')?sum(inb,'real')/sum(inb,'agen'):null,
    winIn:sum(inb,'real')?sum(inb,'vendas')/sum(inb,'real'):null,
    speed:inb.length?inb.reduce((s,x)=>s+(x.speed||0),0)/inb.filter(x=>x.speed!=null).length:null,
    noshow:sum(f,'agen')?1-sum(f,'real')/sum(f,'agen'):null
  };
  const metaLeads=METAS.leadsSemana*weeks;
  const metaRec=METAS.receitaMes*(weeks/4);

  /* ---- KPIs ---- */
  const kpi=(lbl,val,meta,pill,color)=>`
    <div class="kpi" style="--kc:${color}">
      <div class="lbl">${lbl}</div><div class="val num">${val}</div>
      <div class="meta num">${meta}</div>${pill||''}
    </div>`;
  const pLeads=m.leads/metaLeads, pRec=m.receita/metaRec;
  $('kpis').innerHTML =
    kpi('Leads inbound', fmt(m.leads), `Meta: <b>${fmt(metaLeads)}</b>`,
      `<span class="pill ${pLeads>=.9?'ok':pLeads>=.5?'warn':'bad'}">${pct(m.leads,metaLeads,1)} da meta</span>`, 'var(--teal)') +
    kpi('Contatos efetivos', fmt(m.conex), `Connect rate: <b>${m.connect!=null?pct(m.connect*100,100):'—'}</b>`,
      `<span class="pill ${m.connect>=.05?'ok':m.connect>=.035?'warn':'bad'}">benchmark 5–10%</span>`, 'var(--navy-3)') +
    kpi('Reuniões agendadas', fmt(m.agen), `Realizadas: <b>${fmt(m.real)}</b>`,
      `<span class="pill ${m.noshow<=.25?'ok':m.noshow<=.35?'warn':'bad'}">no-show ${m.noshow!=null?pct(m.noshow*100,100):'—'}</span>`, 'var(--gold)') +
    kpi('Vendas fechadas', fmt(m.vendas), `Ticket médio: <b>${m.vendas?brl(m.receita/m.vendas):'—'}</b>`,
      `<span class="pill ${(m.winOut||0)>=.15||(m.winIn||0)>=.25?'ok':'warn'}">win out ${m.winOut!=null?pct(m.winOut*100,100,0):'—'} · in ${m.winIn!=null?pct(m.winIn*100,100,0):'—'}</span>`, 'var(--ok)') +
    kpi('Receita no período', brl(m.receita), `Meta: <b>${brl(metaRec)}</b>`,
      `<span class="pill ${pRec>=.9?'ok':pRec>=.6?'warn':'bad'}">${pct(m.receita,metaRec,1)} da meta</span>`, 'var(--gold)');

  /* ---- Funis ---- */
  const funnel=(el,stages,benchMap)=>{
    if(!stages[0].v){el.innerHTML='<div class="empty">Sem dados no filtro atual</div>';return}
    const max=stages[0].v||1;
    el.innerHTML=stages.map((s,i)=>{
      let conv='',st='';
      if(i>0&&stages[i-1].v){
        const r=s.v/stages[i-1].v, b=benchMap[i-1];
        st=b?status(r,b):'ok';
        conv=`${stDot(st)} ${pct(s.v,stages[i-1].v,0)} ${b?`<span class="bench">bmk ${Math.round(b[0]*100)}–${Math.round(b[1]*100)}%</span>`:''}`;
      } else conv='<span class="bench">100%</span>';
      return `<div class="fstage"><span class="name">${s.n}</span>
        <div class="fbar"><i style="--w:${Math.max(6,s.v/max*100)}%"></i><b class="num">${fmt(s.v)}</b></div>
        <span class="fconv num">${conv}</span></div>`;
    }).join('');
  };
  funnel($('funOut'),[
    {n:'Tentativas',v:m.tent},{n:'Contatos efetivos',v:m.conex},
    {n:'Agendadas',v:sum(out,'agen')},{n:'Realizadas',v:sum(out,'real')},{n:'Vendas',v:sum(out,'vendas')}
  ],[BENCH.connect,BENCH.agendOut,BENCH.show,BENCH.winOut]);
  funnel($('funIn'),[
    {n:'Leads',v:m.leads},{n:'Qualificados',v:m.qual},
    {n:'Agendadas',v:sum(inb,'agen')},{n:'Realizadas',v:sum(inb,'real')},{n:'Vendas',v:sum(inb,'vendas')}
  ],[BENCH.qual,BENCH.agendIn,BENCH.show,BENCH.winIn]);

  /* ---- Qualidade ---- */
  const mini=(lbl,val,bench,st)=>`<div class="mini"><div class="lbl">${lbl}</div>
    <div class="val num">${stDot(st)} ${val}</div><div class="bench">${bench}</div></div>`;
  $('quality').innerHTML =
    mini('Speed to lead', m.speed!=null?Math.round(m.speed)+' min':'—','meta &lt; 5 min', m.speed==null?'warn':(m.speed<=5?'ok':m.speed<=15?'warn':'bad')) +
    mini('No-show', m.noshow!=null?pct(m.noshow*100,100):'—','benchmark ≤ 25%', m.noshow==null?'warn':(m.noshow<=.25?'ok':m.noshow<=.35?'warn':'bad')) +
    mini('Win rate outbound', m.winOut!=null?pct(m.winOut*100,100,0):'—','benchmark 15–25%', m.winOut==null?'warn':status(m.winOut,BENCH.winOut)) +
    mini('Win rate inbound', m.winIn!=null?pct(m.winIn*100,100,0):'—','benchmark 25–40%', m.winIn==null?'warn':status(m.winIn,BENCH.winIn));

  /* ---- Canais ---- */
  const canais=[...new Set(f.map(r=>r.canal))];
  const agg=canais.map(c=>{
    const rs=f.filter(r=>r.canal===c);
    return {c, topo:sum(rs,'topo'), vendas:sum(rs,'vendas'), real:sum(rs,'real'),
      win:sum(rs,'real')?sum(rs,'vendas')/sum(rs,'real'):null, tipo:rs[0].tipo};
  }).sort((a,b)=>b.topo-a.topo);
  const maxT=Math.max(...agg.map(a=>a.topo),1);
  $('chan').innerHTML=agg.map(a=>`
    <div class="chanrow"><div class="name">${a.c}<span>${a.tipo==='out'?'tentativas':'leads'}</span></div>
      <div class="cbar"><i style="--w:${Math.max(3,a.topo/maxT*100)}%;--cc:${a.tipo==='out'?'var(--navy-3)':'var(--teal)'}"></i></div>
      <div class="stats num"><b>${fmt(a.topo)}</b> · ${a.vendas} venda${a.vendas===1?'':'s'} · win ${a.win!=null?pct(a.win*100,100,0):'—'}</div>
    </div>`).join('');

  /* ---- Evolução semanal (SVG) ---- */
  const semShow=$('fPeriodo').value==='7'?[3]:[0,1,2,3];
  const wk=semShow.map(s=>sum(f.filter(r=>r.sem===s),'real'));
  const metaW=METAS.reunioesSemana*($('fConsultor').value==='all'?1:1/3);
  const W=460,H=150,pad=28,maxY=Math.max(...wk,metaW)*1.25||1;
  const X=i=>wk.length>1?pad+i*(W-pad*2)/(wk.length-1):W/2, Y=v=>H-18-(v/maxY)*(H-42);
  const pts=wk.map((v,i)=>`${X(i)},${Y(v)}`).join(' ');
  $('weekly').innerHTML=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto" role="img" aria-label="Reuniões realizadas por semana">
    <line x1="${pad}" y1="${Y(metaW)}" x2="${W-pad}" y2="${Y(metaW)}" stroke="#B9C2D0" stroke-width="2" stroke-dasharray="5 5"/>
    <polyline points="${pts}" fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${wk.map((v,i)=>`<circle cx="${X(i)}" cy="${Y(v)}" r="4" fill="var(--navy)" stroke="var(--gold)" stroke-width="2"/>
      <text x="${X(i)}" y="${Y(v)-10}" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2536">${v}</text>
      <text x="${X(i)}" y="${H-2}" text-anchor="middle" font-size="10.5" fill="#6B7484">${SEMANAS[semShow[i]]}</text>`).join('')}
  </svg>`;

  /* ---- Consultores ---- */
  const consSel=$('fConsultor').value==='all'?CONSULTORES:[$('fConsultor').value];
  $('cons').innerHTML=consSel.map(c=>{
    const rs=f.filter(r=>r.consultor===c);
    const rec=sum(rs,'receita'), meta=METAS.porConsultor[c]*(weeks/4);
    const w=Math.min(100,rec/(meta*1.15)*100), mpos=Math.min(100,100/1.15);
    const win=sum(rs,'real')?sum(rs,'vendas')/sum(rs,'real'):null;
    const p=rec/meta, st=p>=.9?'ok':p>=.6?'warn':'bad';
    return `<div class="conrow"><div class="who">${stDot(st)} ${c}<span>meta ${brl(meta)}</span></div>
      <div><div class="conbar"><i style="--w:${w}%"></i><em style="--m:${mpos}%"></em></div>
        <div class="constats num"><span><b>${brl(rec)}</b> (${pct(rec,meta,0)})</span>
          <span>Reuniões: <b>${sum(rs,'real')}</b></span>
          <span>Vendas: <b>${sum(rs,'vendas')}</b></span>
          <span>Win rate: <b>${win!=null?pct(win*100,100,0):'—'}</b></span></div></div></div>`;
  }).join('');

  /* ---- Reuniões ---- */
  const maxM=Math.max(m.agen,1);
  $('meet').innerHTML=`
    <div class="mb"><b class="num">${m.agen}</b><i style="height:${m.agen/maxM*90+8}px;background:var(--navy-3)"></i>Agendadas</div>
    <div class="mb"><b class="num">${m.real}</b><i style="height:${m.real/maxM*90+8}px;background:var(--gold)"></i>Realizadas</div>
    <div class="mb"><b class="num">${m.agen-m.real}</b><i style="height:${(m.agen-m.real)/maxM*90+8}px;background:var(--bad)"></i>No-show</div>`;
  $('meetkpis').innerHTML =
    mini('Taxa de no-show', m.noshow!=null?pct(m.noshow*100,100):'—','benchmark ≤ 25%', m.noshow==null?'warn':(m.noshow<=.25?'ok':m.noshow<=.35?'warn':'bad')) +
    mini('Show rate', m.agen?pct(m.real,m.agen):'—','benchmark 70–80%', m.agen?(m.real/m.agen>=.7?'ok':m.real/m.agen>=.55?'warn':'bad'):'warn');

  /* ---- Diagnóstico automático de gargalo ---- */
  const checks=[
    {k:'Geração de leads inbound', ratio:m.leads/metaLeads, val:`${fmt(m.leads)} de ${fmt(metaLeads)} (${pct(m.leads,metaLeads,1)})`,
     rec:'O gargalo está <b>antes do funil de vendas</b>. Prioridade: destravar Google Ads (campanha, lance e página) e cadenciar conteúdo no Instagram e nas redes dos sócios. Nada no funil compensa falta de lead.'},
    {k:'Connect rate outbound', ratio:m.connect!=null?m.connect/BENCH.connect[0]:1, val:m.connect!=null?pct(m.connect*100,100)+' (bmk 5–10%)':'—',
     rec:'Poucos decisores atendem. Revisar <b>qualidade e enriquecimento da lista</b>, janelas de ligação (8h–9h30 / 17h30–19h) e alternar canal (WhatsApp + ligação).'},
    {k:'Agendamento outbound', ratio:m.agendOut!=null?m.agendOut/BENCH.agendOut[0]:1, val:m.agendOut!=null?pct(m.agendOut*100,100)+' (bmk 15–25%)':'—',
     rec:'A conversa acontece mas não vira reunião. Revisar o <b>script de abertura e a oferta do diagnóstico gratuito</b> — vender a reunião, não o serviço.'},
    {k:'Show rate', ratio:m.agen? (m.real/m.agen)/BENCH.show[0]:1, val:m.agen?pct(m.real,m.agen)+' (bmk 70–80%)':'—',
     rec:'Reunião marcada não acontece. Implantar <b>ritual de confirmação</b>: convite na agenda na hora, lembrete D-1 e 2h antes, reagendamento ativo no no-show.'},
    {k:'Win rate', ratio:Math.min(m.winOut!=null?m.winOut/BENCH.winOut[0]:1, m.winIn!=null?m.winIn/BENCH.winIn[0]:1),
     val:`out ${m.winOut!=null?pct(m.winOut*100,100,0):'—'} · in ${m.winIn!=null?pct(m.winIn*100,100,0):'—'}`,
     rec:'Volume ok, fechamento fraco: gargalo na <b>condução da call</b>. Gravar reuniões, calibrar o assessment e coaching individual do gestor comercial.'},
    {k:'Speed to lead', ratio:m.speed!=null?BENCH.speed/m.speed:1, val:m.speed!=null?Math.round(m.speed)+' min (meta < 5 min)':'—',
     rec:'Lead esfriando na fila. Criar <b>alerta imediato + dono do plantão de atendimento</b>: responder em 5 min multiplica a conversão em relação a 30 min.'}
  ].filter(c=>!isNaN(c.ratio)&&c.ratio!=null);
  const worst=checks.sort((a,b)=>a.ratio-b.ratio)[0];
  $('diag').innerHTML=`
    <div class="seal"><b>M</b><span>DIAGNÓSTICO</span></div>
    <div><h4>Principal gargalo do período</h4>
      <div class="main">${worst.k}: <span class="num">${worst.val}</span> — o elo mais distante do benchmark neste filtro.</div></div>
    <div class="rec"><b>Recomendação ·</b> ${worst.rec}</div>`;
}
render();
