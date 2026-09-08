import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HubLeadForm } from "./_hub/HubLeadForm";
import { SmoothAnchor } from "./_hub/SmoothAnchor";
import { HomeHeader } from "./_hub/HomeHeader";

export const metadata: Metadata = {
  title: "Midlej Capital · Special Situations",
  description:
    "Aquisição e gestão de ativos estressados: créditos judiciais, dívida inadimplida, carteiras de NPL e imóveis em situação especial. Compramos o ativo que trava o seu balanço e estruturamos operações para quem quer investir nesse mercado.",
};

/* ================================================================
   Dados
   ================================================================ */

const FRENTES = [
  {
    n: "01",
    name: "Créditos judiciais",
    desc: "Aquisição de créditos reconhecidos em juízo e direitos litigiosos, inclusive precatórios selecionados. Transformamos uma vitória lenta em liquidez hoje.",
  },
  {
    n: "02",
    name: "Dívida estressada",
    desc: "Compra de dívida inadimplida e renegociação direta com o devedor. Assumimos o risco e a operação de recuperação de ponta a ponta.",
  },
  {
    n: "03",
    name: "Carteiras de NPL",
    desc: "Due diligence e aquisição de carteiras de crédito não performado. Avaliamos, precificamos e limpamos o balanço de quem carrega o passivo.",
  },
  {
    n: "04",
    name: "Imóveis em situação especial",
    desc: "Ativos imobiliários com pendência judicial, dação em pagamento ou distressed. Estruturamos a aquisição e destravamos o ativo.",
  },
];

const AUDIENCES = [
  {
    tag: "Sell-side",
    title: "Tem um ativo para vender",
    text: "Empresas, credores, massas falidas e fundos que precisam converter um crédito travado em caixa. Avaliamos, fazemos proposta e assumimos o risco da recuperação.",
    cta: "Vender um ativo",
  },
  {
    tag: "Buy-side",
    title: "Quer investir em special situations",
    text: "Investidores e parceiros que buscam retorno descorrelacionado do mercado tradicional. Estruturamos operações de co-investimento em ativos que originamos e analisamos.",
    cta: "Investir em parceria",
  },
];

const STEPS = [
  {
    index: "01",
    title: "Originação",
    text: "Mapeamos o ativo, o contexto do impasse e a documentação. Uma conversa reservada é suficiente para dizer se há caso.",
  },
  {
    index: "02",
    title: "Due diligence",
    text: "Análise pelas duas lentes, jurídica e financeira. Medimos risco processual, prazo de recuperação e valor real do ativo.",
  },
  {
    index: "03",
    title: "Aquisição ou estruturação",
    text: "Proposta com preço, prazo e condições antes de qualquer decisão. Compramos direto ou montamos a operação com parceiros.",
  },
  {
    index: "04",
    title: "Recuperação e gestão",
    text: "Conduzimos a recuperação e a gestão do ativo até o desfecho, com acompanhamento e prestação de contas ao investidor.",
  },
];

const TEAM = [
  {
    name: "Lucas Midlej",
    role: "Sócio-fundador",
    bio: "Advogado empresarial e presidente da Comissão de Recuperação de Crédito e Execução Cível da OAB/DF. Lidera a originação e a estruturação jurídica das operações de special situations e a aquisição de ativos judiciais.",
    photo: "/lucas.jpeg",
    initials: "LM",
  },
  {
    name: "Elisa Teles",
    role: "Diretora Financeira · Sócia",
    bio: "Advogada com vasta experiência em finanças, adquirida em escritório de grande porte. Responsável pela estruturação financeira das operações e pela análise de viabilidade e precificação das aquisições.",
    photo: "/elisa-teles.jpg",
    initials: "ET",
  },
  {
    name: "Breno Barreto",
    role: "Sócio",
    bio: "Responsável pela operação e governança das aquisições. Coordena os processos de due diligence, o acompanhamento das recuperações e a conformidade de cada operação estruturada.",
    photo: "/breno.jpeg",
    initials: "BB",
  },
  {
    name: "Guilherme José",
    role: "Diretor de Tecnologia",
    bio: "Graduado na área de tecnologia pela Universidade de Brasília. Responsável pelos sistemas de originação, pela análise de dados das carteiras e pela automação que dá escala à avaliação de ativos.",
    photo: "/Guilherme.jpeg",
    initials: "GJ",
  },
];

export default function HubPage() {
  return (
    <main
      data-brand
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen bg-white text-[#2E4659]"
    >
      <SmoothAnchor />
      <HomeHeader />
      <HomeHero />
      <Tese />
      <Atuacao />
      <ParaQuem />
      <Processo />
      <EspacoSection />
      <HomeEquipe />
      <HomeClosing />
    </main>
  );
}

/* ================================================================
   Shared atoms
   ================================================================ */

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SectionTag({ label }: { label: string }) {
  return (
    <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-3" style={{ color: "#4a6b8c" }}>
      {label}
    </p>
  );
}

/* ================================================================
   Hero
   ================================================================ */

function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background */}
      <Image
        src="/fotos_escritorio/1.jpeg"
        alt="Espaço Midlej Capital"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Overlay navy */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,70,89,0.62)" }} />
      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-48 pb-24 md:pt-60 md:pb-32">
        <span className="inline-block text-[0.7rem] font-semibold tracking-widest uppercase mb-6 text-white/70">
          Midlej Capital
        </span>
        <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.06] tracking-tight mb-6 text-white max-w-[16ch]">
          Special situations.
        </h1>
        <p className="text-[1.0625rem] leading-[1.65] mb-10 max-w-[52ch] text-white/75">
          Aquisição e gestão de ativos estressados. Compramos o crédito judicial,
          a dívida inadimplida ou o imóvel que trava o seu balanço, e estruturamos
          operações para quem quer investir nesse mercado.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
            Tenho um ativo para vender <Arrow />
          </Link>
          <Link href="#para-quem" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-200">
            Quero investir em parceria
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Tese
   ================================================================ */

function Tese() {
  return (
    <section id="tese" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-full md:col-span-5">
            <SectionTag label="A tese" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-tight tracking-tight" style={{ color: "#2E4659" }}>
              Todo impasse<br />tem um preço.
            </h2>
          </div>
          <div className="col-span-full md:col-span-6 md:col-start-7">
            <p className="text-[1.0625rem] leading-[1.7] mb-5" style={{ color: "#6B7B8D" }}>
              Um crédito reconhecido em juízo, uma dívida que não volta, uma carteira
              inadimplida ou um imóvel preso em litígio são ativos reais presos por
              tempo, risco processual e falta de liquidez.
            </p>
            <p className="text-[1.0rem] leading-[1.7] mb-5" style={{ color: "#6B7B8D" }}>
              Quem carrega esse ativo raramente quer conduzir a recuperação: quer caixa
              hoje. É aí que entramos. Compramos o ativo com desconto, assumimos o risco
              e a operação, e conduzimos a recuperação até o desfecho.
            </p>
            <p className="text-[1.0rem] leading-[1.7]" style={{ color: "#6B7B8D" }}>
              Do outro lado, estruturamos operações para investidores que buscam retorno
              descorrelacionado do mercado tradicional. Duas pontas, uma disciplina:
              análise jurídica e financeira na mesma mesa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   O que fazemos
   ================================================================ */

function Atuacao() {
  return (
    <section id="atuacao" style={{ backgroundColor: "#F5F7FA" }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-12 md:mb-16 max-w-[52ch]">
          <SectionTag label="O que fazemos" />
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight" style={{ color: "#2E4659" }}>
            Quatro classes de ativos estressados.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FRENTES.map((f) => (
            <div key={f.n} className="bg-white rounded-xl p-7 border border-[#EDEFF2]">
              <span className="inline-block text-[0.65rem] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md mb-4" style={{ backgroundColor: "#F5F7FA", color: "#4a6b8c" }}>
                {f.n}
              </span>
              <h3 className="text-[1.125rem] font-semibold leading-snug mb-2.5" style={{ color: "#2E4659" }}>{f.name}</h3>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: "#6B7B8D" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Para quem
   ================================================================ */

function ParaQuem() {
  return (
    <section id="para-quem" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-12 md:mb-16">
          <SectionTag label="Para quem" />
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
            Dois lados da mesma operação.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="flex flex-col p-8 rounded-2xl border border-[#EDEFF2]" style={{ backgroundColor: "#F5F7FA" }}>
              <p className="text-[0.65rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "#4a6b8c" }}>
                {a.tag}
              </p>
              <h3 className="text-[1.375rem] font-bold leading-snug mb-3" style={{ color: "#2E4659" }}>{a.title}</h3>
              <p className="text-[0.95rem] leading-[1.7] mb-8 flex-1" style={{ color: "#6B7B8D" }}>{a.text}</p>
              <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200 self-start">
                {a.cta} <Arrow />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Como atuamos
   ================================================================ */

function Processo() {
  return (
    <section id="processo" style={{ backgroundColor: "#F5F7FA" }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-12 md:mb-16">
          <SectionTag label="Como atuamos" />
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
            Da originação ao desfecho.
          </h2>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STEPS.map((s) => (
            <li key={s.index} className="border-t pt-6" style={{ borderColor: "#D6DCE3" }}>
              <p className="text-[0.9rem] font-bold tabular-nums mb-3" style={{ color: "#4a6b8c" }}>{s.index}</p>
              <h3 className="text-[1.0625rem] font-semibold mb-2.5" style={{ color: "#2E4659" }}>{s.title}</h3>
              <p className="text-[0.9rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================
   Espaço
   ================================================================ */

function EspacoSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <SectionTag label="Nosso espaço" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-full md:col-span-7">
            <Image
              src="/fotos_escritorio/3.jpeg"
              alt="Recepção Midlej Capital"
              width={900}
              height={600}
              className="w-full h-[440px] object-cover rounded-2xl"
            />
          </div>
          <div className="col-span-full md:col-span-5 flex flex-col gap-4">
            <Image
              src="/fotos_escritorio/5.jpeg"
              alt="Sala de reunião"
              width={600}
              height={400}
              className="w-full h-[210px] object-cover rounded-2xl"
            />
            <Image
              src="/fotos_escritorio/6.jpeg"
              alt="Espaço externo"
              width={600}
              height={400}
              className="w-full h-[210px] object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Equipe
   ================================================================ */

function HomeEquipe() {
  return (
    <section id="equipe" style={{ backgroundColor: "#F5F7FA" }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-14">
          <SectionTag label="Nossa equipe" />
          <h2
            className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight tracking-tight"
            style={{ color: "#2E4659" }}
          >
            Jurídico e financeiro na mesma mesa.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="flex flex-row gap-6 p-7 rounded-2xl border border-[#EDEFF2] bg-white"
            >
              {/* Foto / placeholder lateral */}
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-xl object-cover object-top flex-shrink-0 self-center"
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <div
                  className="rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 self-center"
                  style={{ width: 100, height: 100, backgroundColor: "#4a6b8c" }}
                >
                  {member.initials}
                </div>
              )}

              {/* Texto */}
              <div className="min-w-0">
                <p
                  className="text-[0.65rem] font-semibold tracking-widest uppercase mb-1"
                  style={{ color: "#4a6b8c" }}
                >
                  {member.role}
                </p>
                <h3
                  className="text-[1.0625rem] font-bold mb-2"
                  style={{ color: "#2E4659" }}
                >
                  {member.name}
                </h3>
                <p className="text-sm leading-[1.7] text-justify" style={{ color: "#6B7B8D" }}>
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Closing — contato + footer fundidos
   ================================================================ */

const FOOTER_LINKS = [
  { label: "A tese",         href: "#tese" },
  { label: "O que fazemos",  href: "#atuacao" },
  { label: "Para quem",      href: "#para-quem" },
  { label: "Como atuamos",   href: "#processo" },
  { label: "Equipe",         href: "#equipe" },
];

function HomeClosing() {
  const year = new Date().getFullYear();
  return (
    <section id="contato" style={{ backgroundColor: "#4a6b8c" }} className="pt-24 md:pt-32 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* ── CTA principal ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start pb-20 md:pb-24">
          <div className="col-span-full md:col-span-5">
            <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
              Primeira conversa
            </p>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white mb-6">
              Traga o caso. A conversa é reservada.
            </h2>
            <p className="text-[1.0625rem] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
              A primeira conversa é gratuita, confidencial e sem compromisso.
            </p>
            <p className="text-[0.9375rem] leading-relaxed max-w-[44ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
              Você apresenta o ativo ou o interesse em investir. Nós ouvimos, fazemos as
              perguntas certas e dizemos se há caso. Só depois disso discutimos preço,
              estrutura e prazo.
            </p>
          </div>
          <div className="col-span-full md:col-span-6 md:col-start-7">
            <HubLeadForm tone="dark" submitLabel="Solicitar reunião" origin="Home Special Situations" />
          </div>
        </div>

        {/* ── Divisor ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }} className="mb-12 md:mb-14" />

        {/* ── Footer info ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">

          {/* Logo + tagline */}
          <div className="col-span-full md:col-span-4">
            <Image
              src="/midlej_capital.png"
              alt="Midlej Capital"
              width={320}
              height={130}
              className="h-12 w-auto mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm leading-relaxed max-w-[32ch]" style={{ color: "rgba(255,255,255,0.55)" }}>
              Aquisição e gestão de ativos estressados.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-full md:col-span-6 md:col-span-3 md:col-start-6">
            <p className="text-[0.6rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              Navegar
            </p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors duration-200" style={{ color: "rgba(255,255,255,0.60)" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="col-span-full md:col-span-6 md:col-span-4">
            <p className="text-[0.6rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              Contato
            </p>
            <a
              href="mailto:contato@midlejcapital.com.br"
              className="text-sm hover:text-white transition-colors duration-200 block"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              contato@midlejcapital.com.br
            </a>
          </div>

        </div>

        {/* ── Barra legal ── */}
        <div className="border-t pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.35)" }}>
          <span>Midlej Consultoria de Valores Mobiliários LTDA · CNPJ 67.608.789/0001-39</span>
          <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
        </div>

      </div>
    </section>
  );
}
