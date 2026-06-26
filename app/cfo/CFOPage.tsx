"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ================================================================
   Palette — espelha exatamente a paleta das páginas / e /investimentos
   Gold (#B89840) é o único acento específico da Consultoria
   ================================================================ */
const GOLD = "#B89840";

/* ================================================================
   Shared atoms — mesmos que / e /investimentos
   ================================================================ */

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SectionTag({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <p
      className="text-[0.7rem] font-semibold tracking-widest uppercase mb-3"
      style={{ color: dark ? "rgba(255,255,255,0.50)" : GOLD }}
    >
      {label}
    </p>
  );
}

function GoldCheck() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden className="shrink-0 mt-[3px]">
      <path d="M3 9l4 4 7-8" stroke={GOLD} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RedX() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden className="shrink-0 mt-[3px]">
      <path d="M4.5 4.5l8 8M12.5 4.5l-8 8" stroke="#D64242" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/* ================================================================
   Header — branco, sem nav de fuga (apenas marca + CTA)
   Mesmo padrão estrutural de InvestimentosHeader / HomeHeader
   ================================================================ */

function CFOHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-40 bg-white transition-all duration-300"
        style={{
          boxShadow: scrolled ? "0 2px 20px rgba(74,107,140,0.10)" : "none",
          borderBottom: scrolled ? "none" : "1px solid #EDEFF2",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between gap-8">

          {/* Marca */}
          <a href="#top" aria-label="Midlej Consultoria" className="inline-flex items-center gap-2 shrink-0">
            <span
              style={{
                color: "#2E4659",
                fontFamily: "var(--font-brand)",
                fontSize: "1.125rem",
                fontWeight: 700,
                letterSpacing: "0.01em",
              }}
            >
              MIDLEJ
            </span>
            <span
              className="text-[0.6rem] font-semibold tracking-[0.22em] uppercase leading-none"
              style={{ color: GOLD }}
            >
              CONSULTORIA
            </span>
          </a>

          {/* CTA desktop */}
          <a
            href="#formulario"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors duration-200"
            style={{ backgroundColor: GOLD }}
          >
            Diagnóstico do CFO
          </a>

          {/* Hambúrguer mobile */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-md"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <span className="block w-6 h-[2px] transition-all duration-300 origin-center" style={{ backgroundColor: "#2E4659", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span className="block w-6 h-[2px] transition-all duration-300" style={{ backgroundColor: "#2E4659", opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[2px] transition-all duration-300 origin-center" style={{ backgroundColor: "#2E4659", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 md:hidden bg-white transition-all duration-300 ease-in-out overflow-y-auto"
        style={{ top: "64px", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", transform: menuOpen ? "translateY(0)" : "translateY(-8px)" }}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col px-6 pt-6 pb-10 gap-1">
          <a
            href="#formulario"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: GOLD }}
          >
            Quero meu Diagnóstico do CFO
          </a>
        </div>
      </div>
    </>
  );
}

/* ================================================================
   Mobile sticky bar (brief: CTA fixo no rodapé no mobile)
   ================================================================ */

function MobileStickyBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3"
      style={{ backgroundColor: "#2E4659", borderTop: "1px solid rgba(255,255,255,0.12)" }}
    >
      <a
        href="#formulario"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-semibold text-white"
        style={{ backgroundColor: GOLD }}
      >
        Quero meu Diagnóstico do CFO <Arrow />
      </a>
    </div>
  );
}

/* ================================================================
   Organograma — card assinatura da marca (animação CSS pura)
   ================================================================ */

function OrgCard() {
  const [phase, setPhase] = useState<"q" | "fade" | "done">("q");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fade"), 900);
    const t2 = setTimeout(() => setPhase("done"), 1250);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes cfoFadeOut { from { opacity:1 } to { opacity:0 } }
        @keyframes cfoFadeIn  { from { opacity:0 } to { opacity:1 } }
        @media (prefers-reduced-motion: reduce) { .cfo-animate { animation:none !important } }
      `}</style>

      <div
        className="rounded-xl overflow-hidden shadow-xl w-full max-w-[300px]"
        style={{ backgroundColor: "white", border: "1px solid #EDEFF2" }}
      >
        {/* Header */}
        <div
          className="px-5 py-3 text-[0.6rem] font-semibold tracking-[0.2em] uppercase"
          style={{ backgroundColor: "#F5F7FA", color: "#6B7B8D", borderBottom: "1px solid #EDEFF2" }}
        >
          Organograma · Sua vida financeira
        </div>

        <div className="px-5 py-6 flex flex-col gap-3">
          {/* CEO */}
          <div className="rounded-lg px-5 py-4 flex items-center gap-3" style={{ backgroundColor: "#2E4659" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.70)" }}>
              CEO
            </div>
            <div>
              <p className="text-[0.6rem] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.50)" }}>Posição</p>
              <p className="text-base font-bold text-white">Você</p>
            </div>
          </div>

          {/* CFO animado */}
          <div className="rounded-lg px-5 py-4 flex items-center gap-3" style={{ border: `2px dashed ${GOLD}`, backgroundColor: `${GOLD}10` }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${GOLD}20`, color: GOLD }}>
              CFO
            </div>
            <div>
              <p className="text-[0.6rem] font-semibold tracking-widest uppercase" style={{ color: GOLD }}>Posição</p>
              <div className="relative h-6">
                <span
                  className="cfo-animate absolute inset-0 text-base font-bold flex items-center"
                  style={{
                    color: GOLD,
                    opacity: phase === "done" ? 0 : 1,
                    animation: phase === "fade" ? "cfoFadeOut 0.35s ease-in-out forwards" : "none",
                  }}
                >?</span>
                <span
                  className="cfo-animate absolute inset-0 text-base font-bold flex items-center"
                  style={{
                    color: "#2E4659",
                    opacity: phase === "done" ? 1 : 0,
                    animation: phase === "done" ? "cfoFadeIn 0.35s ease-in-out forwards" : "none",
                  }}
                >Midlej</span>
              </div>
            </div>
          </div>

          {/* Legenda */}
          <p className="text-[0.78rem] leading-[1.55] mt-1 text-center italic" style={{ color: "#6B7B8D" }}>
            A cadeira de CEO está ocupada. A de CFO, quase nunca.{" "}
            <span style={{ color: "#2E4659", fontStyle: "normal", fontWeight: 600 }}>É ela que a gente preenche.</span>
          </p>
        </div>
      </div>
    </>
  );
}

/* ================================================================
   01 — Hero — foto de fundo + overlay (mesmo padrão de / e /investimentos)
   ================================================================ */

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center">
      <Image
        src="/fotos_escritorio/3.jpeg"
        alt="Espaço Midlej Consultoria"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Overlay navy — mesmo rgba que os outros heroes */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,70,89,0.65)" }} />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-48 pb-24 md:pt-60 md:pb-32">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">

          {/* Copy */}
          <div className="col-span-12 lg:col-span-7">
            <span className="inline-block text-[0.7rem] font-semibold tracking-widest uppercase mb-6 text-white/70">
              Para médicos de alta renda
            </span>

            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.06] tracking-tight mb-6 text-white max-w-[20ch]">
              Você é o CEO da sua vida.{" "}
              <em className="not-italic" style={{ color: GOLD }}>
                Quem é o seu CFO?
              </em>
            </h1>

            <p className="text-[1.0625rem] leading-[1.65] mb-10 max-w-[44ch] text-white/75">
              Toda empresa séria tem um CFO cuidando do dinheiro. A sua carreira movimenta
              o equivalente a uma empresa de bom porte, e provavelmente as finanças ficam
              pra hora vaga, entre um plantão e outro. A Midlej assume esse papel:
              o CFO da sua vida financeira.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#formulario"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors duration-200"
                style={{ backgroundColor: GOLD }}
              >
                Quero meu Diagnóstico do CFO <Arrow />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-200"
              >
                Como funciona
              </a>
            </div>

            <p className="mt-5 text-[0.78rem] text-white/45">
              Gratuito e sem compromisso. Leva poucos minutos.
            </p>

            {/* Faixa de confiança */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {["Fee based, sem comissão de produto", "Do seu lado da mesa"].map((item) => (
                <span key={item} className="flex items-center gap-2 text-[0.8rem] text-white/65">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Organograma */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
            <OrgCard />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   02 — Dores — fundo #F5F7FA (mesmo das seções claras)
   ================================================================ */

function Dores() {
  const cards = [
    {
      title: "Dinheiro sem rumo",
      body: "Você ganha muito e não sabe exatamente pra onde vai. Sobra menos do que deveria, e ninguém sabe explicar por quê.",
    },
    {
      title: "Conselho que é venda",
      body: "Seu gerente não é conselheiro. É vendedor da casa, e o produto que ele indica costuma render mais pra ele do que pra você.",
    },
    {
      title: "Gestão no improviso",
      body: "Você administra uma carreira de milhões nas horas vagas, no susto, ouvindo grupo de WhatsApp e dica de plantão.",
    },
    {
      title: "Ninguém responsável pelo todo",
      body: "Investir todo mundo investe. Ter um responsável pela visão completa, com método e accountability, é raro.",
    },
  ];

  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <SectionTag label="O diagnóstico começa por aqui" />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-4 max-w-[22ch]" style={{ color: "#2E4659" }}>
          Você ganha bem. Mas o seu dinheiro tem dono?
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] mb-12 max-w-[50ch]" style={{ color: "#6B7B8D" }}>
          Não é falta de capacidade. É falta de tempo e de alguém responsável pelo conjunto.
          Quase todo médico que conversamos reconhece pelo menos um destes pontos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-xl p-7 flex flex-col gap-3 border border-[#EDEFF2] shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#2E4659" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <circle cx="9" cy="9" r="6.5" stroke={GOLD} strokeWidth="1.6" />
                  <path d="M9 6v4M9 12v.5" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-[1rem] font-bold leading-snug" style={{ color: "#2E4659" }}>{c.title}</h3>
              <p className="text-[0.9375rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   03 — Virada de chave — fundo navy escuro (igual às seções navy de /)
   ================================================================ */

function Virada() {
  const items = [
    "Organização e diagnóstico do todo, não só da carteira.",
    "Planejamento de metas e política de investimento por escrito.",
    "Acompanhamento contínuo, com decisão e responsabilidade.",
    "Relatório no padrão de uma diretoria financeira de verdade.",
  ];

  return (
    <section style={{ backgroundColor: "#4a6b8c" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Copy */}
          <div className="col-span-12 lg:col-span-7 order-2 md:order-1">
            <SectionTag label="A virada de chave" dark />
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.04] tracking-tight mb-8 text-white max-w-[24ch]">
              O que um CFO faz por uma empresa, a Midlej faz{" "}
              <span style={{ color: GOLD }}>pelo seu dinheiro.</span>
            </h2>
            <ul className="flex flex-col gap-4 mb-10">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-[1.6] text-white/80">
                  <GoldCheck />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#formulario"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors duration-200"
              style={{ backgroundColor: GOLD }}
            >
              Quero meu Diagnóstico do CFO <Arrow />
            </a>
          </div>

          {/* Card lateral */}
          <div className="col-span-12 lg:col-span-5 order-1 md:order-2">
            <div className="rounded-xl p-7 md:p-8" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
              <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4 text-white/45">A divisão de papéis</p>
              <p className="text-[1.0625rem] leading-[1.65] mb-8 text-white/70">
                Você toca o consultório, a carreira e a família. Nós rodamos a máquina financeira
                por trás: caixa, alocação, risco, relatório e decisão.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { role: "Sua função", action: "Viver e decidir" },
                  { role: "Nossa função", action: "Cuidar do dinheiro" },
                ].map((it) => (
                  <div key={it.role} className="flex items-center justify-between gap-4 py-3.5 px-4 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                    <p className="text-[0.72rem] font-semibold tracking-widest uppercase text-white/45">{it.role}</p>
                    <p className="text-sm font-bold text-white">{it.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   04 — Como funciona — bg-white com lista numerada (padrão ComoConduzimos)
   ================================================================ */

function ComoFunciona() {
  const steps = [
    {
      n: "01",
      title: "Diagnóstico do CFO",
      body: "Um raio-x da sua situação financeira hoje: o que está organizado, o que está vazando e o que dá pra fazer melhor.",
      tag: "Gratuito",
    },
    {
      n: "02",
      title: "Estruturação",
      body: "Os primeiros 90 dias do seu CFO: organização, metas, política de investimento e montagem da estrutura.",
      tag: "Implantação",
    },
    {
      n: "03",
      title: "CFO em retainer",
      body: "Acompanhamento, rebalanceamento, relatório institucional e board financeiro a cada trimestre.",
      tag: "Contínuo",
    },
  ];

  return (
    <section id="como-funciona" className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <SectionTag label="Como funciona" />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-4 max-w-[20ch]" style={{ color: "#2E4659" }}>
          Três passos para ter um CFO.
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] mb-14 max-w-[46ch]" style={{ color: "#6B7B8D" }}>
          Começa com um raio-x gratuito da sua situação. A partir dele, você decide se faz sentido seguir.
        </p>

        <ol className="border-t border-[#EDEFF2]">
          {steps.map((s) => (
            <li key={s.n} className="border-b border-[#EDEFF2] py-8 md:py-10 grid grid-cols-12 gap-6 items-baseline">
              <div className="col-span-12 md:col-span-2">
                <span className="text-[clamp(1.875rem,3vw,2.5rem)] font-light leading-none tabular-nums" style={{ color: GOLD }}>
                  {s.n}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3 className="text-[clamp(1.125rem,1.8vw,1.5rem)] font-bold leading-snug tracking-tight" style={{ color: "#2E4659" }}>
                  {s.title}
                </h3>
                <span
                  className="inline-block mt-2 text-[0.65rem] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${GOLD}18`, color: GOLD }}
                >
                  {s.tag}
                </span>
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="text-[0.9375rem] leading-[1.65] max-w-[48ch]" style={{ color: "#6B7B8D" }}>
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors duration-200"
            style={{ backgroundColor: GOLD }}
          >
            Quero meu Diagnóstico do CFO <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   05 — Por que somos diferentes — #F5F7FA + 2 colunas
   ================================================================ */

function Diferencas() {
  const assessor = [
    "É comissionado pelo banco ou corretora.",
    "Ganha quando você compra o produto da casa.",
    "Foca na venda, não no conjunto da sua vida.",
  ];
  const midlej = [
    "Fee based: pago por você, não pelo produto.",
    "A gente só cresce quando o seu patrimônio cresce.",
    "Responsável pela visão completa, do seu lado da mesa.",
  ];

  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="Por que somos diferentes" />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-3 max-w-[20ch]" style={{ color: "#2E4659" }}>
          Não somos mais um assessor.
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] mb-12 max-w-[40ch]" style={{ color: "#6B7B8D" }}>
          A diferença está em quem nos paga. Isso muda tudo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Assessor */}
          <div className="bg-white rounded-xl p-7 md:p-8 flex flex-col gap-5 border border-[#EDEFF2]">
            <div>
              <p className="text-[0.65rem] font-semibold tracking-widest uppercase mb-1" style={{ color: "#6B7B8D" }}>
                Assessor / Banco
              </p>
              <h3 className="text-[1.0625rem] font-bold" style={{ color: "#2E4659" }}>
                Trabalha para a casa
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {assessor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-[1.6]" style={{ color: "#6B7B8D" }}>
                  <RedX />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Midlej */}
          <div className="rounded-xl p-7 md:p-8 flex flex-col gap-5" style={{ backgroundColor: "#2E4659" }}>
            <div>
              <p className="text-[0.65rem] font-semibold tracking-widest uppercase mb-1 text-white/45">
                Midlej Consultoria
              </p>
              <h3 className="text-[1.0625rem] font-bold text-white">
                Trabalha para você
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {midlej.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-[1.6] text-white/80">
                  <GoldCheck />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   06 — Quem está por trás — bg-white + foto + citação
   ================================================================ */

function Fundador() {
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">

          {/* Foto */}
          <div className="col-span-12 md:col-span-4 flex justify-center md:justify-start">
            <div className="w-52 h-64 md:w-full md:max-w-[280px] md:h-80 rounded-2xl overflow-hidden border border-[#EDEFF2]" style={{ backgroundColor: "#F5F7FA" }}>
              <Image
                src="/lucas.jpeg"
                alt="Lucas Midlej, fundador da Midlej Consultoria"
                width={280}
                height={380}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Quote */}
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <SectionTag label="Quem está por trás" />
            <blockquote className="text-[clamp(1.25rem,2.4vw,2rem)] font-light leading-[1.4] tracking-tight mb-8 max-w-[34ch]" style={{ color: "#2E4659" }}>
              "Eu construí a Midlej com uma regra simples:{" "}
              <strong className="font-bold" style={{ color: "#2E4659" }}>
                quem cuida do seu dinheiro tem que ser pago por você, e por mais ninguém.
              </strong>{" "}
              É a única forma de estar de verdade do seu lado."
            </blockquote>
            <figcaption>
              <p className="text-sm font-bold" style={{ color: "#2E4659" }}>Lucas Midlej</p>
              <p className="text-[0.72rem] font-semibold tracking-widest uppercase mt-0.5" style={{ color: GOLD }}>
                Fundador · Grupo Midlej
              </p>
            </figcaption>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   07 — O padrão — fundo #4a6b8c (igual às seções navy de /)
   ================================================================ */

function Padrao() {
  const items = [
    {
      n: "01",
      title: "Relatório institucional",
      body: "Você recebe relatórios no padrão usado por grandes bancos, coisa rara na faixa pessoa física.",
    },
    {
      n: "02",
      title: "Board trimestral",
      body: "Uma reunião de diretoria sobre o seu dinheiro a cada três meses. A que você nunca teve.",
    },
    {
      n: "03",
      title: "Consultoria, não gestão",
      body: "As decisões continuam suas. A gente traz estrutura, estratégia e acompanhamento.",
    },
  ];

  return (
    <section style={{ backgroundColor: "#4a6b8c" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <SectionTag label="O padrão" dark />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-4 text-white max-w-[24ch]">
          O nível de uma diretoria financeira.
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] mb-16 max-w-[44ch] text-white/60">
          O mesmo rigor de uma grande empresa, aplicado à sua vida.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.10)" }}>
          {items.map((item) => (
            <div key={item.title} className="p-8 flex flex-col gap-4" style={{ backgroundColor: "#4a6b8c" }}>
              <div
                className="w-8 h-8 flex items-center justify-center text-[0.65rem] font-bold rounded-full border"
                style={{ borderColor: `${GOLD}60`, color: GOLD }}
              >
                {item.n}
              </div>
              <h3 className="text-[1.0625rem] font-bold leading-snug text-white">{item.title}</h3>
              <p className="text-[0.9375rem] leading-[1.65] text-white/60">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors duration-200"
            style={{ backgroundColor: GOLD }}
          >
            Quero meu Diagnóstico do CFO <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   08 — FAQ — #F5F7FA + accordion <details> (mesmo padrão de /investimentos)
   ================================================================ */

function FAQ() {
  const faqs = [
    {
      q: "Quanto custa?",
      a: "O Diagnóstico do CFO é gratuito. A partir dele, o investimento é definido de acordo com a sua realidade e o seu patrimônio, com tudo claro e sem letra miúda. Nada é cobrado antes de você entender exatamente o que recebe.",
    },
    {
      q: "Preciso ter muito dinheiro?",
      a: "Não é serviço para qualquer um, mas também não é só para milionário. O diagnóstico mostra, com honestidade, se faz sentido para você agora ou não.",
    },
    {
      q: "É a mesma coisa que o meu assessor da corretora?",
      a: "Não. O assessor é comissionado pelo banco ou pela corretora. Nós somos fee based, pagos por você, sem comissão de produto nenhum. É a diferença entre um executivo e um vendedor.",
    },
    {
      q: "Vocês vão mexer no meu dinheiro?",
      a: "Não. É consultoria, não gestão discricionária. As decisões continuam sendo suas. A gente entrega a estrutura, a estratégia e o acompanhamento para você decidir com clareza.",
    },
    {
      q: "O diagnóstico tem algum compromisso?",
      a: "Zero. É um raio-x da sua situação. Se fizer sentido seguir, a gente conversa. Se não, você sai com um diagnóstico valioso e nada a perder.",
    },
  ];

  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-40">
        <div className="grid grid-cols-12 gap-10 md:gap-16">

          <div className="col-span-12 md:col-span-4">
            <SectionTag label="Antes de você perguntar" />
            <h2 className="text-[clamp(1.625rem,3vw,2.5rem)] font-bold leading-[1.04] tracking-tight max-w-[16ch]" style={{ color: "#2E4659" }}>
              Dúvidas frequentes.
            </h2>
          </div>

          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <ul className="border-t border-[#EDEFF2]">
              {faqs.map((f) => (
                <li key={f.q} className="border-b border-[#EDEFF2]">
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-baseline justify-between gap-6 py-6 md:py-7">
                      <span className="text-[clamp(1.0625rem,1.4vw,1.1875rem)] font-bold leading-[1.3]" style={{ color: "#2E4659" }}>
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className="font-semibold text-[1rem] transition-transform duration-200 group-open:rotate-45 shrink-0"
                        style={{ color: GOLD }}
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-6 md:pb-7 text-[0.9375rem] leading-[1.65] max-w-[56ch]" style={{ color: "#6B7B8D" }}>
                      {f.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   09 — Formulário — bg-white + card (padrão do Closing de /investimentos)
   ================================================================ */

const PATRIMONIO_OPTIONS = [
  "Até R$ 300 mil",
  "R$ 300 mil a R$ 1 milhão",
  "R$ 1 milhão a R$ 3 milhões",
  "Acima de R$ 3 milhões",
];

function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function CFOForm() {
  const [form, setForm] = useState({ nome: "", whatsapp: "", email: "", patrimonio: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [done, setDone] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const firstName = form.nome.trim().split(" ")[0] ?? "";

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome.";
    if (form.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "WhatsApp inválido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "E-mail inválido.";
    if (!form.patrimonio) e.patrimonio = "Selecione uma faixa.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setDone(true);
    setTimeout(() => successRef.current?.focus(), 80);
  }

  const waLink = `https://wa.me/5561983015739?text=${encodeURIComponent(
    `Olá! Sou ${form.nome.trim()} e quero meu Diagnóstico do CFO. (Patrimônio: ${form.patrimonio})`
  )}`;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #EDEFF2",
    borderRadius: "8px",
    color: "#2E4659",
    fontSize: "0.9375rem",
    fontFamily: "var(--font-brand)",
    outline: "none",
    backgroundColor: "white",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: "6px",
    color: "#6B7B8D",
  };

  return (
    <section id="formulario" className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Copy */}
          <div className="col-span-12 md:col-span-5">
            <SectionTag label="O primeiro passo" />
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-8 max-w-[22ch]" style={{ color: "#2E4659" }}>
              Solicite seu Diagnóstico do CFO.
            </h2>
            <ul className="flex flex-col gap-4">
              {[
                "Um raio-x completo e gratuito da sua vida financeira.",
                "Sem venda de produto e sem compromisso.",
                "Conduzido por quem é pago por você, não pelo banco.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-[1.6]" style={{ color: "#6B7B8D" }}>
                  <GoldCheck />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card do formulário */}
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div
              className="rounded-2xl p-7 md:p-9 border border-[#EDEFF2]"
              style={{ boxShadow: "0 4px 24px rgba(46,70,89,0.07)" }}
            >
              {!done ? (
                <>
                  <h3 className="text-[1.125rem] font-bold mb-1" style={{ color: "#2E4659" }}>Comece agora</h3>
                  <p className="text-[0.875rem] mb-6" style={{ color: "#6B7B8D" }}>
                    Preencha e a gente te chama no WhatsApp para agendar.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    <div>
                      <label htmlFor="cfo-nome" style={labelStyle}>Nome *</label>
                      <input
                        id="cfo-nome"
                        type="text"
                        autoComplete="name"
                        value={form.nome}
                        onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                        style={{ ...inputStyle, borderColor: errors.nome ? "#D64242" : "#EDEFF2" }}
                        placeholder="Seu nome completo"
                      />
                      {errors.nome && <p className="mt-1 text-xs" style={{ color: "#D64242" }}>{errors.nome}</p>}
                    </div>

                    <div>
                      <label htmlFor="cfo-wa" style={labelStyle}>WhatsApp *</label>
                      <input
                        id="cfo-wa"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        value={form.whatsapp}
                        onChange={(e) => setForm((f) => ({ ...f, whatsapp: maskPhone(e.target.value) }))}
                        style={{ ...inputStyle, borderColor: errors.whatsapp ? "#D64242" : "#EDEFF2" }}
                        placeholder="(61) 99999-9999"
                      />
                      {errors.whatsapp && <p className="mt-1 text-xs" style={{ color: "#D64242" }}>{errors.whatsapp}</p>}
                    </div>

                    <div>
                      <label htmlFor="cfo-email" style={labelStyle}>E-mail *</label>
                      <input
                        id="cfo-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        style={{ ...inputStyle, borderColor: errors.email ? "#D64242" : "#EDEFF2" }}
                        placeholder="seu@email.com"
                      />
                      {errors.email && <p className="mt-1 text-xs" style={{ color: "#D64242" }}>{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="cfo-patrimonio" style={labelStyle}>Patrimônio aproximado para investir *</label>
                      <select
                        id="cfo-patrimonio"
                        value={form.patrimonio}
                        onChange={(e) => setForm((f) => ({ ...f, patrimonio: e.target.value }))}
                        style={{ ...inputStyle, borderColor: errors.patrimonio ? "#D64242" : "#EDEFF2", cursor: "pointer" }}
                      >
                        <option value="">Selecione uma faixa</option>
                        {PATRIMONIO_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                      {errors.patrimonio && <p className="mt-1 text-xs" style={{ color: "#D64242" }}>{errors.patrimonio}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-lg text-sm font-semibold text-white mt-1 transition-colors duration-200"
                      style={{ backgroundColor: GOLD }}
                    >
                      Quero meu Diagnóstico do CFO
                    </button>
                  </form>

                  <p className="mt-4 text-center text-[0.75rem]" style={{ color: "#6B7B8D" }}>
                    Seus dados são tratados com sigilo e usados apenas para este contato.
                  </p>
                </>
              ) : (
                <div ref={successRef} tabIndex={-1} className="flex flex-col gap-6 py-4 text-center" aria-live="polite">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
                    style={{ backgroundColor: `${GOLD}18` }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M4 13l5 5 11-11" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[1.25rem] font-bold mb-2" style={{ color: "#2E4659" }}>
                      Quase lá{firstName ? `, ${firstName}` : ""}.
                    </h3>
                    <p className="text-[0.9375rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
                      Clique abaixo para confirmar e falar com a gente agora no WhatsApp.
                    </p>
                  </div>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.559 4.14 1.532 5.875L0 24l6.27-1.504A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.014-1.382l-.36-.213-3.72.892.924-3.617-.234-.37A9.804 9.804 0 012.182 12c0-5.413 4.405-9.818 9.818-9.818S21.818 6.587 21.818 12 17.413 21.818 12 21.818z" />
                    </svg>
                    Confirmar no WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   10 — CTA Final — fundo #4a6b8c centralizado (padrão do /investimentos closing)
   ================================================================ */

function CTAFinal() {
  return (
    <section style={{ backgroundColor: "#4a6b8c" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 text-center">
        <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold leading-[1.05] tracking-tight text-white mb-4 max-w-[28ch] mx-auto">
          Toda empresa do seu tamanho tem um CFO. Sua vida financeira merece o mesmo.
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] mb-10 max-w-[36ch] mx-auto text-white/65">
          O diagnóstico é gratuito. O que você descobre sobre o próprio dinheiro, não tem preço.
        </p>
        <a
          href="#formulario"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-semibold text-white transition-colors duration-200"
          style={{ backgroundColor: GOLD }}
        >
          Quero meu Diagnóstico do CFO <Arrow />
        </a>
      </div>
    </section>
  );
}

/* ================================================================
   Rodapé — mesmo padrão de / e /investimentos
   ================================================================ */

function Rodape() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-[#EDEFF2]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12 flex flex-col gap-8">

        {/* Identidade + CNPJ */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <p className="text-[1.0625rem] font-bold" style={{ color: "#2E4659" }}>
              MIDLEJ <span style={{ color: GOLD }}>CONSULTORIA</span>
            </p>
            <p className="text-[0.78rem] mt-1" style={{ color: "#6B7B8D" }}>
              O CFO da sua vida financeira.
            </p>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <p className="text-[0.72rem]" style={{ color: "#6B7B8D" }}>CNPJ 67.608.789/0001-39</p>
            <p className="text-[0.72rem]" style={{ color: "#6B7B8D" }}>Consultoria de valores mobiliários</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-[#EDEFF2] pt-6">
          <p className="text-[0.72rem] leading-[1.6]" style={{ color: "#9BA8B5" }}>
            A Midlej Consultoria atua como consultoria de valores mobiliários. O serviço de consultoria não se confunde com gestão de recursos: as decisões de investimento permanecem do cliente. Rentabilidade passada não representa garantia de rentabilidade futura. Conteúdo de caráter informativo, não constituindo oferta ou recomendação individualizada de investimento.
          </p>
          <p className="mt-4 text-[0.7rem]" style={{ color: "#9BA8B5" }}>
            © {year} Midlej Consultoria. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}

/* ================================================================
   Page root
   ================================================================ */

export function CFOPage() {
  return (
    <main
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen bg-white text-[#2E4659]"
    >
      <CFOHeader />
      <MobileStickyBar />
      <Hero />
      <Dores />
      <Virada />
      <ComoFunciona />
      <Diferencas />
      <Fundador />
      <Padrao />
      <FAQ />
      <CFOForm />
      <CTAFinal />
      <Rodape />
    </main>
  );
}
