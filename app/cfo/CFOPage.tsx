import Image from "next/image";
import { LPHeader } from "@/app/_hub/LPHeader";
import { LPClosing } from "@/app/_hub/LPClosing";
import { StickyCTA } from "@/app/components/StickyCTA";
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
              Para servidores públicos
            </span>

            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.06] tracking-tight mb-6 text-white max-w-[20ch]">
              Você conquistou a estabilidade. Agora vamos transformá-la em{" "}
              <em className="not-italic" style={{ color: GOLD }}>
                renda para o futuro.
              </em>
            </h1>

            <p className="text-[1.0625rem] leading-[1.65] mb-10 max-w-[46ch] text-white/75">
              Você tem a segurança que a maioria sonha. Mas estabilidade sem estratégia é só
              um salário que entra e sai. A Midlej é o CFO da sua vida financeira: método,
              segurança e um plano para o seu dinheiro começar a trabalhar por você — no seu
              ritmo, sem arriscar o que você já construiu.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contato"
                aria-label="Quero avaliar meu planejamento"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[52px] rounded-lg text-[1.0625rem] font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] shadow-md transition-colors duration-200"
              >
                Quero avaliar meu planejamento <Arrow />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-lg text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-200"
              >
                Como funciona
              </a>
            </div>

            <p className="mt-5 text-[0.78rem] text-white/45">
              Diagnóstico gratuito e sem compromisso. Leva poucos minutos.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {["Fee based, sem comissão de produto", "Consultoria registrada na CVM", "Do seu lado da mesa"].map((item) => (
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
      title: "Seu salário é estável — mas e quando ele parar?",
      body: "O contracheque não acompanha você para sempre. Um dia a aposentadoria chega, e com ela costuma vir uma renda menor. O que vai sustentar o seu padrão de vida quando o salário mudar?",
      icon: (
        // Calendário com contracheque = o dia em que o salário muda
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <rect x="3" y="4" width="12" height="11" rx="1" stroke={GOLD} strokeWidth="1.5" />
          <path d="M3 7.5h12" stroke={GOLD} strokeWidth="1.5" />
          <path d="M6 2.5v3M12 2.5v3" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 11h4" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Estabilidade não é o mesmo que patrimônio.",
      body: "Ter o emprego garantido protege o presente. Mas estabilidade parada no contracheque não vira patrimônio sozinha. Sem um plano, o dinheiro entra e sai — e no fim do ano você não sabe o que ficou.",
      icon: (
        // Cofre / base sólida = estabilidade que fica parada
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <rect x="3" y="4.5" width="12" height="9" rx="1" stroke={GOLD} strokeWidth="1.5" />
          <circle cx="9" cy="9" r="2" stroke={GOLD} strokeWidth="1.4" />
          <path d="M9 9v-.01" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4.5 13.5v1.5M13.5 13.5v1.5" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Sem renda passiva, a dependência é permanente.",
      body: "Hoje tudo depende de você trabalhar; nada trabalha pelo seu dinheiro. Construir patrimônio ao longo do tempo é o que separa quem só recebe salário de quem tem tranquilidade para o futuro.",
      icon: (
        // Semente / broto crescendo = patrimônio construído no tempo
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path d="M9 15V8" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 9c0-2 1.5-3.5 4-3.5C13 7.5 11.5 9 9 9z" stroke={GOLD} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M9 10.5C9 8.5 7.5 7 5 7c0 2 1.5 3.5 4 3.5z" stroke={GOLD} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M5.5 15h7" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <SectionTag label="Por onde o diagnóstico começa" />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-4 max-w-[22ch]" style={{ color: "#2E4659" }}>
          Você tem estabilidade. Mas o seu dinheiro trabalha por você?
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] mb-12 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
          Não é falta de disciplina. É falta de método e de alguém responsável por transformar
          a sua estabilidade em patrimônio. Quase todo servidor com quem conversamos reconhece
          pelo menos um destes pontos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-xl p-7 flex flex-col gap-3 border border-[#EDEFF2] shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#2E4659" }}>
                {c.icon}
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
    "Diagnóstico do todo: para onde vai o seu dinheiro hoje e o que dá pra organizar.",
    "Um plano por escrito, conservador, feito para o seu perfil e para o longo prazo.",
    "Acompanhamento contínuo, com método — decisões seguras, sem susto e sem aposta.",
    "Estratégia para transformar a sua estabilidade em patrimônio e renda para o futuro.",
  ];

  return (
    <section style={{ backgroundColor: "#4a6b8c" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">

          <div className="col-span-12 lg:col-span-7 order-2 md:order-1">
            <SectionTag label="A ponte entre estabilidade e renda" dark />
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.04] tracking-tight mb-8 text-white max-w-[24ch]">
              O que um CFO faz por uma empresa, a Midlej faz{" "}
              <span style={{ color: GOLD }}>pela sua estabilidade.</span>
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
                Você cuida da sua carreira e da sua família. Nós cuidamos da máquina financeira
                por trás: organização, plano, risco e acompanhamento — para a sua estabilidade
                virar patrimônio.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { role: "Sua função", action: "Viver com tranquilidade" },
                  { role: "Nossa função", action: "Cuidar do seu dinheiro" },
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
      title: "Diagnóstico",
      body: "Um raio-x da sua vida financeira hoje: o que está organizado, o que está parado e o que dá pra transformar em patrimônio.",
      tag: "Gratuito",
    },
    {
      n: "02",
      title: "Plano",
      body: "Montamos, por escrito, um plano conservador e no seu ritmo: organização, metas e a estratégia para construir renda no futuro.",
      tag: "Estruturação",
    },
    {
      n: "03",
      title: "Execução acompanhada",
      body: "Acompanhamento próximo, revisão periódica e ajuste de rota. Você decide com clareza; a gente cuida do método.",
      tag: "Contínuo",
    },
  ];

  return (
    <section id="como-funciona" className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <SectionTag label="Como funciona" />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-4 max-w-[22ch]" style={{ color: "#2E4659" }}>
          Três passos para transformar estabilidade em renda.
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] mb-14 max-w-[46ch]" style={{ color: "#6B7B8D" }}>
          Começa com um raio-x gratuito da sua situação. A partir dele, você decide, com calma, se faz sentido seguir.
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
    "É comissionado pelo banco ou pela corretora.",
    "Ganha quando você compra o produto da casa.",
    "Foca na venda, não no conjunto da sua vida.",
  ];
  const midlej = [
    "Fee based: pago por você, não pelo produto.",
    "Consultoria registrada na CVM, com interesses alinhados aos seus.",
    "Responsável pela visão completa, do seu lado da mesa.",
  ];

  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="Segurança e alinhamento" />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-3 max-w-[22ch]" style={{ color: "#2E4659" }}>
          Método conservador, sem conflito de interesse.
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] mb-12 max-w-[46ch]" style={{ color: "#6B7B8D" }}>
          A Midlej é uma consultoria fee based registrada na CVM. A diferença está em quem nos
          paga — e isso muda tudo.
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
                src="/lucas2.jpeg"
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
              &ldquo;Eu construí a Midlej com uma regra simples:{" "}
              <strong className="font-bold" style={{ color: "#2E4659" }}>
                quem cuida do seu dinheiro tem que ser pago por você, e por mais ninguém.
              </strong>{" "}
              É a única forma de estar de verdade do seu lado.&rdquo;
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
      title: "Plano por escrito",
      body: "Sua estratégia documentada e conservadora, feita para o longo prazo. Nada de dica de grupo de WhatsApp ou decisão no susto.",
    },
    {
      n: "02",
      title: "Revisão periódica",
      body: "Encontros para acompanhar o seu dinheiro e ajustar a rota com calma. O acompanhamento próximo que você nunca teve.",
    },
    {
      n: "03",
      title: "Consultoria, não gestão",
      body: "As decisões continuam suas. A gente traz estrutura, estratégia e método — você segue no controle.",
    },
  ];

  return (
    <section style={{ backgroundColor: "#4a6b8c" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <SectionTag label="O padrão" dark />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-4 text-white max-w-[24ch]">
          O rigor de quem cuida de grandes patrimônios.
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] mb-16 max-w-[44ch] text-white/60">
          O mesmo método e cuidado de uma diretoria financeira, aplicado à sua vida — com a
          segurança que o seu perfil pede.
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
            aria-label="Quero avaliar meu planejamento"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[52px] rounded-lg text-[1.0625rem] font-semibold text-white bg-[#2E4659] hover:bg-[#1d3347] shadow-md transition-colors duration-200"
          >
            Quero avaliar meu planejamento <Arrow />
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
      a: "O diagnóstico é gratuito. A partir dele, o investimento no planejamento é definido de acordo com a sua realidade, com tudo claro e sem letra miúda. Nada é cobrado antes de você entender exatamente o que recebe.",
    },
    {
      q: "Preciso ter muito dinheiro para começar?",
      a: "Não. O serviço é para quem tem estabilidade e quer construir patrimônio com método, não só para quem já é milionário. O diagnóstico mostra, com honestidade, se faz sentido para você agora ou não.",
    },
    {
      q: "Sou conservador e tenho medo de arriscar. Isso é para mim?",
      a: "Sim — é justamente por isso. Trabalhamos com método e planejamento de longo prazo, respeitando o seu perfil. A ideia não é arriscar o que você construiu, e sim organizar e proteger para o seu dinheiro trabalhar com segurança.",
    },
    {
      q: "É a mesma coisa que o assessor da minha corretora?",
      a: "Não. O assessor é comissionado pelo banco ou pela corretora. Nós somos fee based, pagos por você, sem comissão de produto nenhum. É a diferença entre um conselheiro e um vendedor.",
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
        headline="Solicite seu diagnóstico gratuito."
        body="Um raio-x completo da sua vida financeira e o primeiro passo para transformar a sua estabilidade em patrimônio e renda. Sem venda de produto, sem compromisso."
        ctaLabel="Quero avaliar meu planejamento"
        origin="CFO as a Service — Servidores públicos"
        gtmFormPage="cfo"
        disclaimer="A Midlej Consultoria atua como consultoria de valores mobiliários registrada na CVM, no modelo fee based. As decisões de investimento permanecem do cliente. Rentabilidade passada não representa garantia de rentabilidade futura. Conteúdo de caráter informativo, não constituindo oferta ou recomendação individualizada de investimento."
      />

      {/* Barra fixa mobile → formulário de contato */}
      <StickyCTA label="Quero avaliar meu planejamento" href="#contato" />
    </main>
  );
}
