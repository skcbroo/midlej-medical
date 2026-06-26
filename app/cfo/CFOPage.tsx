import Image from "next/image";
import { LPHeader } from "@/app/_hub/LPHeader";
import { LPClosing } from "@/app/_hub/LPClosing";
import { OrgCard } from "./OrgCard";

const GOLD = "#B89840";

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
      style={{ color: dark ? "rgba(255,255,255,0.50)" : "#4a6b8c" }}
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
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,70,89,0.65)" }} />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-48 pb-24 md:pt-60 md:pb-32">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">

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
                href="#contato"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200"
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

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {["Fee based, sem comissão de produto", "Do seu lado da mesa"].map((item) => (
                <span key={item} className="flex items-center gap-2 text-[0.8rem] text-white/65">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
            <OrgCard />
          </div>

        </div>
      </div>
    </section>
  );
}

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
              href="#contato"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#2E4659] hover:bg-[#1d3347] transition-colors duration-200"
            >
              Quero meu Diagnóstico do CFO <Arrow />
            </a>
          </div>

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
                <span className="text-[clamp(1.875rem,3vw,2.5rem)] font-light leading-none tabular-nums" style={{ color: "#4a6b8c" }}>
                  {s.n}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3 className="text-[clamp(1.125rem,1.8vw,1.5rem)] font-bold leading-snug tracking-tight" style={{ color: "#2E4659" }}>
                  {s.title}
                </h3>
                <span
                  className="inline-block mt-2 text-[0.65rem] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(74,107,140,0.10)", color: "#4a6b8c" }}
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
            href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200"
          >
            Quero meu Diagnóstico do CFO <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

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

function Fundador() {
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">

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
              <p className="text-[0.72rem] font-semibold tracking-widest uppercase mt-0.5" style={{ color: "#4a6b8c" }}>
                Fundador · Grupo Midlej
              </p>
            </figcaption>
          </div>

        </div>
      </div>
    </section>
  );
}

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
                style={{ borderColor: "rgba(255,255,255,0.30)", color: "rgba(255,255,255,0.60)" }}
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
            href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#2E4659] hover:bg-[#1d3347] transition-colors duration-200"
          >
            Quero meu Diagnóstico do CFO <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

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
                        style={{ color: "#4a6b8c" }}
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

export function CFOPage() {
  return (
    <main
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen bg-white text-[#2E4659]"
    >
      <LPHeader ctaLabel="Diagnóstico do CFO" />
      <Hero />
      <Dores />
      <Virada />
      <ComoFunciona />
      <Diferencas />
      <Fundador />
      <Padrao />
      <FAQ />
      <LPClosing
        eyebrow="O primeiro passo"
        headline="Solicite seu Diagnóstico do CFO."
        body="Um raio-x completo e gratuito da sua vida financeira. Sem venda de produto, sem compromisso."
        ctaLabel="Solicitar Diagnóstico do CFO"
        origin="CFO as a Service"
        disclaimer="A Midlej Consultoria atua como consultoria de valores mobiliários. As decisões de investimento permanecem do cliente. Rentabilidade passada não representa garantia de rentabilidade futura. Conteúdo de caráter informativo, não constituindo oferta ou recomendação individualizada de investimento."
      />
    </main>
  );
}
