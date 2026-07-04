import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HubLeadForm } from "./_hub/HubLeadForm";
import { SmoothAnchor } from "./_hub/SmoothAnchor";
import { HomeHeader } from "./_hub/HomeHeader";
import { SeguroCompare } from "./_hub/svg/SeguroCompare";
import {
  GlobeClient as Globe,
  AltLayersClient as AltLayers,
  WorkshopRoomClient as WorkshopRoom,
  PrevidenciaStackClient as PrevidenciaStack,
} from "./_hub/scenes/clients";
import { PortalMock } from "./_hub/PortalMock";
import { MentoriaSection } from "./_hub/MentoriaSection";

export const metadata: Metadata = {
  title: "Midlej Capital · Hub de soluções financeiras",
  description:
    "Mentoria, investimentos internacionais, câmbio, seguros, alternativos, previdência e treinamentos. Uma banca de planejamento financeiro sem conflito.",
};

const SERVICES = [
  { n: "01", name: "Mentoria",       desc: "Diagnóstico, arquitetura e sustentação do patrimônio em paralelo.",    href: "#mentoria" },
  { n: "02", name: "Internacionais", desc: "Patrimônio em dólar, contas offshore, trusts e veículos globais.",     href: "#internacionais" },
  { n: "03", name: "Câmbio",         desc: "Compra e envio assistido de dólares americanos para o exterior.",      href: "#cambio" },
  { n: "04", name: "Seguros",        desc: "Cobertura calibrada e custo otimizado fora do balcão de venda.",       href: "#seguro" },
  { n: "05", name: "Alternativos",   desc: "Fundos exclusivos, crédito privado estruturado e private equity.",     href: "#alternativos" },
  { n: "06", name: "Previdência",    desc: "Tabela regressiva e gestor institucional trocado por mérito.",         href: "#previdencia" },
  { n: "07", name: "Workshops",      desc: "Treinamentos estratégicos para executivos, gestores e conselhos.",     href: "#workshops" },
  { n: "08", name: "Investimentos",  desc: "Plataforma de investimentos privados com arquitetura por camadas.",    href: "/investimentos" },
];

const STATS = [
  { value: "R$ 120M+",  label: "em patrimônio acompanhado" },
  { value: "85+",       label: "famílias atendidas" },
  { value: "8 anos",    label: "de experiência" },
  { value: "8 frentes", label: "de atuação" },
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
      <HomeStats />
      <HomeServices />
      <PortalCliente />
      <MentoriaSection />
      <S03_Internacionais />
      <S04_Cambio />
      <S05_Seguro />
      <S06_Alternativos />
      <S07_Previdencia />
      <S08_Workshops />
      <ConhecaInvestimentos />
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

function ProofRow({ items }: { items: { k: string; v: string }[] }) {
  return (
    <dl className="grid grid-cols-3 gap-x-6 border-t border-[#EDEFF2] pt-6 mt-8">
      {items.map((it) => (
        <div key={it.k} className="flex flex-col gap-1">
          <dt className="text-[0.65rem] font-semibold tracking-widest uppercase" style={{ color: "#6B7B8D" }}>
            {it.k}
          </dt>
          <dd className="text-[clamp(1.125rem,1.8vw,1.5rem)] font-bold tabular-nums leading-none" style={{ color: "#2E4659" }}>
            {it.v}
          </dd>
        </div>
      ))}
    </dl>
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
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,70,89,0.58)" }} />
      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-48 pb-24 md:pt-60 md:pb-32">
        <span className="inline-block text-[0.7rem] font-semibold tracking-widest uppercase mb-6 text-white/70">
          Midlej Capital
        </span>
        <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.06] tracking-tight mb-6 text-white max-w-[18ch]">
          Hub de soluções financeiras.
        </h1>
        <p className="text-[1.0625rem] leading-[1.65] mb-10 max-w-[44ch] text-white/75">
          Planejamento financeiro privado sem conflito de interesse.
          Mentoria, investimentos, câmbio, seguros, alternativos,
          previdência e treinamentos em uma única banca.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
            Quero ser cliente <Arrow />
          </Link>
          <Link href="#solucoes" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-200">
            Ver as soluções
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Stats
   ================================================================ */

function HomeStats() {
  return (
    <section style={{ backgroundColor: "#4a6b8c" }} className="py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tabular-nums leading-none mb-2 text-white">
                {s.value}
              </p>
              <p className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.70)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Services grid
   ================================================================ */

function HomeServices() {
  return (
    <section id="solucoes" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-12 md:mb-16">
          <SectionTag label="Nossas soluções" />
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight max-w-[22ch]" style={{ color: "#2E4659" }}>
            Oito frentes de planejamento financeiro.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <Link key={s.n} href={s.href}
              className="group block bg-white rounded-xl p-6 border border-[#EDEFF2] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <span className="inline-block text-[0.65rem] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md mb-4" style={{ backgroundColor: "#F5F7FA", color: "#4a6b8c" }}>
                {s.n}
              </span>
              <h3 className="text-[1rem] font-semibold leading-snug mb-2" style={{ color: "#2E4659" }}>{s.name}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B7B8D" }}>{s.desc}</p>
              <span className="text-xs font-semibold group-hover:text-[#2E4659] transition-colors duration-200" style={{ color: "#4a6b8c" }}>
                {s.n === "08" ? "Ver página →" : "Saiba mais →"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   03 — Internacionais
   ================================================================ */

function S03_Internacionais() {
  return (
    <section id="internacionais" style={{ backgroundColor: "#F5F7FA" }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Copy */}
          <div className="col-span-12 md:col-span-5 order-2 md:order-1">
            <SectionTag label="Onde o capital mora" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-tight tracking-tight mb-6" style={{ color: "#2E4659" }}>
              Patrimônio<br />em dólar.
            </h2>
            <p className="text-[1.0rem] leading-[1.65] mb-4" style={{ color: "#6B7B8D" }}>
              O dólar é a moeda de reserva global e a base dos maiores mercados financeiros do mundo.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-4" style={{ color: "#6B7B8D" }}>
              Conectamos seu patrimônio a estruturas internacionais por meio de contas offshore,
              trusts e veículos globais, com acesso às principais gestoras e instituições financeiras
              do mercado internacional.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-8" style={{ color: "#6B7B8D" }}>
              Diversificação geográfica, proteção cambial e exposição a oportunidades globais,
              sempre através de parceiros especializados e regulados. Abertura de conta
              internacional assistida.
            </p>
            <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
              Quero diversificar globalmente <Arrow />
            </Link>
          </div>
          {/* Globo */}
          <div className="col-span-12 md:col-span-6 md:col-start-7 order-1 md:order-2">
            <div className="w-full aspect-square">
              <Globe className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   04 — Câmbio
   ================================================================ */

function S04_Cambio() {
  return (
    <section id="cambio" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-4">
            <SectionTag label="Operação cambial" />
            <h2 className="text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-tight tracking-tight" style={{ color: "#2E4659" }}>
              Câmbio.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="text-[1.0rem] leading-[1.65] mb-5" style={{ color: "#6B7B8D" }}>
              Compra e envio de dólares americanos para contas no exterior,
              com execução assistida do início ao fim da operação.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-4" style={{ color: "#6B7B8D" }}>
              Trabalhamos com parceiros regulados pelo Banco Central, garantindo
              segurança jurídica, spread competitivo e conformidade fiscal em cada
              remessa — da documentação ao SISBACEN.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-8" style={{ color: "#6B7B8D" }}>
              Ideal para aportes ao exterior, manutenção de contas offshore
              e diversificação cambial planejada.
            </p>
            <ProofRow items={[
              { k: "Parceiros",  v: "Regulados BCB" },
              { k: "Moedas",     v: "USD" },
              { k: "Destinos",   v: "EUA" },
            ]} />
            <div className="mt-8">
              <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
                Operar câmbio <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   05 — Seguros
   ================================================================ */

function S05_Seguro() {
  return (
    <section id="seguro" style={{ backgroundColor: "#F5F7FA" }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="col-span-12 md:col-span-5">
            <SectionTag label="Proteção patrimonial" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-tight tracking-tight mb-3" style={{ color: "#2E4659" }}>
              Seguros.
            </h2>
            <p className="text-[1.125rem] font-medium mb-6" style={{ color: "#4a6b8c" }}>
              Cobertura calibrada, custo otimizado.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-3" style={{ color: "#6B7B8D" }}>
              Análise de necessidade real de capital segurado. Comparação de apólices
              fora do balcão de venda.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-8" style={{ color: "#6B7B8D" }}>
              Principais produtos: seguro de vida, doenças graves e seguro empresarial
              de responsabilidade civil.
            </p>
            <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
              Avaliar minha cobertura <Arrow />
            </Link>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <SeguroCompare className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   06 — Alternativos
   ================================================================ */

function S06_Alternativos() {
  return (
    <section id="alternativos" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <SectionTag label="Fora da prateleira" />
        {/* Canvas com título sobreposto */}
        <div className="mt-4 relative">
          <div className="w-full aspect-[16/10] md:aspect-[16/9] relative">
            <div className="absolute inset-0">
              <AltLayers className="w-full h-full" />
            </div>
            <div className="absolute left-0 bottom-0 p-2 md:p-6 max-w-[20ch]">
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[0.96] tracking-tight" style={{ color: "#2E4659" }}>
                Produtos<br />alternativos.
              </h2>
            </div>
          </div>
        </div>
        {/* Copy + CTA abaixo */}
        <div className="mt-10 grid grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="col-span-12 md:col-span-6">
            <p className="text-[1.0rem] leading-[1.65] mb-4" style={{ color: "#6B7B8D" }}>
              Ativos com baixa correlação estrutural ao mercado local — private equity, crédito privado estruturado e real assets cujo acesso exige relacionamento direto com gestores e originadores, não uma plataforma aberta.
            </p>
            <p className="text-[0.95rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
              Fundos exclusivos, crédito privado estruturado, private equity, real estate.
              Estruturas fora da prateleira de banco.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 flex md:justify-end md:items-end">
            <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
              Ver alternativos em detalhe <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   07 — Previdência
   ================================================================ */

function S07_Previdencia() {
  return (
    <section id="previdencia" style={{ backgroundColor: "#F5F7FA" }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="col-span-12 md:col-span-4">
            <div className="mx-auto w-full max-w-[260px] aspect-[3/4]">
              <PrevidenciaStack className="w-full h-full" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 lg:col-start-6">
            <SectionTag label="Composição temporal" />
            <h2 className="text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-tight tracking-tight mb-6" style={{ color: "#2E4659" }}>
              Previdência privada.<br />
              <span style={{ color: "#6B7B8D" }}>Estrutura tributária e gestor por mérito.</span>
            </h2>
            <p className="text-[0.95rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
              Tabela regressiva trabalhada desde o primeiro aporte. Comparação anual
              dos gestores institucionais e troca quando o desempenho relativo justifica.
            </p>
            <ProofRow items={[
              { k: "IR mínimo",    v: "10%" },
              { k: "Veículos",     v: "PGBL · VGBL" },
              { k: "Diferencial",  v: "Sem come-cotas e ITCMD" },
            ]} />
            <div className="mt-8">
              <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
                Estruturar previdência <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   08 — Workshops
   ================================================================ */

function S08_Workshops() {
  return (
    <section id="workshops" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-8 items-end mb-10">
          <div className="col-span-12 md:col-span-7">
            <SectionTag label="Para grupos" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-tight tracking-tight" style={{ color: "#2E4659" }}>
              Treinamentos<br />e workshops.
            </h2>
          </div>
          <p className="col-span-12 md:col-span-5 text-[1.0625rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
            Conteúdo financeiro estratégico, desenvolvido para atender às necessidades
            específicas de executivos, gestores, conselhos, sindicatos e equipes corporativas.
          </p>
        </div>
        {/* Cena wide */}
        <div className="w-full aspect-[16/8] md:aspect-[16/7]">
          <WorkshopRoom className="w-full h-full" />
        </div>
        <div className="mt-10 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <ProofRow items={[
              { k: "Formato curto", v: "1 a 3h" },
              { k: "Programa",      v: "1 a 2 sessões" },
              { k: "Modalidade",    v: "Presencial · remoto" },
            ]} />
          </div>
          <div className="col-span-12 md:col-span-5 flex md:justify-end">
            <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
              Solicitar proposta <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Equipe
   ================================================================ */

const TEAM = [
  {
    name: "Lucas Midlej",
    role: "Sócio-fundador",
    bio: "Advogado com atuação focada no cruzamento entre direito e mercado financeiro. Especialista em planejamento patrimonial, estruturas societárias e assessoria estratégica para investidores, empresários e famílias.",
    photo: "/lucas.jpeg",
    initials: "LM",
  },
  {
    name: "Breno Barreto",
    role: "Sócio",
    bio: "Responsável pela operação e governança da consultoria. Coordena processos, inovação e segurança das estruturas implementadas, garantindo eficiência e conformidade em cada solução entregue.",
    photo: "/breno.jpeg",
    initials: "BB",
  },
  {
    name: "Allan Guilherme",
    role: "Sócio · Consultor de Investimentos",
    bio: "Atua em análise de investimentos, alocação de ativos e estratégias de preservação e crescimento patrimonial para pessoas físicas e jurídicas.",
    photo: "/allan2.jpeg",
    initials: "AG",
  },
  {
    name: "Henrique Sgarioni",
    role: "Gestor Comercial",
    bio: "MBA em Finanças, Investimentos e Offshore. Especialista em soluções nacionais e internacionais, com foco em planejamento patrimonial, proteção de patrimônio e relacionamento com clientes.",
    photo: "/henrique.jpeg",
    initials: "HS",
  },
  {
    name: "Guilherme José",
    role: "Diretor de Tecnologia",
    bio: "Graduado na área de tecnologia pela Universidade de Brasília. Responsável pelos sistemas, automação de processos e coordenação de projetos da Midlej — trazendo rigor analítico e visão sistêmica para a operação da consultoria.",
    photo: "/Guilherme.jpeg",
    initials: "GJ",
  },
];

/* ================================================================
   Espaço
   ================================================================ */

function EspacoSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <SectionTag label="Nosso espaço" />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7">
            <Image
              src="/fotos_escritorio/3.jpeg"
              alt="Recepção Midlej Capital"
              width={900}
              height={600}
              className="w-full h-[440px] object-cover rounded-2xl"
            />
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
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

function HomeEquipe() {
  return (
    <section id="equipe" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-14">
          <SectionTag label="Nossa equipe" />
          <h2
            className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight tracking-tight"
            style={{ color: "#2E4659" }}
          >
            Profissionais com visão integrada.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="flex flex-row gap-6 p-7 rounded-2xl border border-[#EDEFF2]"
              style={{ backgroundColor: "#F5F7FA" }}
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
  { label: "Mentoria",      href: "#mentoria" },
  { label: "Investimentos", href: "/investimentos" },
  { label: "Câmbio",        href: "#cambio" },
  { label: "Seguros",       href: "#seguro" },
  { label: "Alternativos",  href: "#alternativos" },
  { label: "Previdência",   href: "#previdencia" },
  { label: "Workshops",     href: "#workshops" },
];

function HomeClosing() {
  const year = new Date().getFullYear();
  return (
    <section id="contato" style={{ backgroundColor: "#4a6b8c" }} className="pt-24 md:pt-32 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* ── CTA principal ── */}
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start pb-20 md:pb-24">
          <div className="col-span-12 md:col-span-5">
            <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
              Primeira conversa
            </p>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white mb-6">
              Sem proposta antes da conversa.
            </h2>
            <p className="text-[1.0625rem] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
              A primeira conversa é gratuita, confidencial e sem compromisso.
            </p>
            <p className="text-[0.9375rem] leading-relaxed max-w-[44ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
              Você apresenta seu contexto, seus objetivos e desafios. Nós ouvimos,
              fazemos as perguntas certas e avaliamos como agregar valor ao seu caso.
              Somente depois disso discutimos caminhos e soluções.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <HubLeadForm tone="dark" submitLabel="Solicitar reunião" origin="Hub Midlej Capital" />
          </div>
        </div>

        {/* ── Divisor ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }} className="mb-12 md:mb-14" />

        {/* ── Footer info ── */}
        <div className="grid grid-cols-12 gap-8 items-start mb-10">

          {/* Logo + tagline */}
          <div className="col-span-12 md:col-span-4">
            <Image
              src="/midlej_capital.png"
              alt="Midlej Capital"
              width={320}
              height={130}
              className="h-12 w-auto mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm leading-relaxed max-w-[32ch]" style={{ color: "rgba(255,255,255,0.55)" }}>
              Sem conflito de interesse. Sem produto da prateleira.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-6 md:col-span-3 md:col-start-6">
            <p className="text-[0.6rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              Soluções
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
          <div className="col-span-6 md:col-span-4">
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
          <span>CNPJ 35.340.252/0001-44</span>
          <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
        </div>

      </div>
    </section>
  );
}

/* ================================================================
   Portal do Cliente
   ================================================================ */

function PortalCliente() {
  return (
    <section style={{ backgroundColor: "#F5F7FA" }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Copy */}
          <div className="col-span-12 md:col-span-4 md:sticky md:top-24">
            <SectionTag label="Para clientes" />
            <h2 className="text-[clamp(1.625rem,2.8vw,2.25rem)] font-bold leading-tight tracking-tight mb-5" style={{ color: "#2E4659" }}>
              Acompanhe seu patrimônio online.
            </h2>
            <p className="text-[0.9375rem] leading-[1.7] mb-3" style={{ color: "#6B7B8D" }}>
              Clientes têm acesso a um portal privado com três visões do planejamento:
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                "Mapa de gastos — renda e despesas mês a mês",
                "Evolução patrimonial — histórico, aportes e projeção",
                "Carteira — composição e alocação por ativo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#6B7B8D" }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-[#3FAE7A]" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://planejamento.midlejcapital.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-[#2E4659]"
              style={{ color: "#4a6b8c" }}
            >
              Acessar portal <Arrow />
            </a>
          </div>

          {/* Mock UI */}
          <div className="col-span-12 md:col-span-8">
            <PortalMock />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Conheca Investimentos
   ================================================================ */

function ConhecaInvestimentos() {
  return (
    <section style={{ backgroundColor: "#F5F7FA" }} className="py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <SectionTag label="Banca de investimentos" />
            <h2 className="text-[clamp(1.625rem,3vw,2.5rem)] font-bold leading-tight tracking-tight mb-4" style={{ color: "#2E4659" }}>
              Investimentos é uma frente própria. Tem página própria.
            </h2>
            <p className="text-[1.0rem] leading-[1.65] max-w-[52ch]" style={{ color: "#6B7B8D" }}>
              Como estruturamos a remuneração por honorário fixo, onde alocamos geograficamente o capital, como construímos a carteira em camadas de liquidez e prazo, o que o tempo composto faz a cada ciclo — e o que acontece no primeiro encontro.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <Link href="/investimentos" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
              Conheça os investimentos <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

