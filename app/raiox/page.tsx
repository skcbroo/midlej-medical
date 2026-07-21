import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { InvestimentosHeader } from "../_hub/InvestimentosHeader";
import { SmoothAnchor } from "../_hub/SmoothAnchor";
import { StickyCTA } from "../components/StickyCTA";
import { RaioXForm } from "./RaioXForm";
import { PonteJK } from "./PonteJK";
import { FundoProva } from "./FundoProva";

/* ================================================================
   /raiox — LP de resposta direta (serviços financeiros)
   Ângulo 1 (hero): alta intenção — "onde investir", "recebi herança".
   Ângulo 2 (prova): track record da carteira, blindado pela CVM.
   Conversão: RaioXForm (lead_form_submit → GTM/Ads) + WhatsApp.

   Auditoria aplicada (brief CMO 15/07/2026):
   metadados/OG próprios · CTA unificado · rótulo de rentabilidade
   coerente · passo 3 = diagnóstico · SLA de retorno · bloco de
   autoridade + verificação CVM · prateleira removida · variantes
   de hero por dor (message match, noindex) · JSON-LD FAQPage.
   ================================================================ */

/* ----------------------------------------------------------------
   Verificação CVM (Eixo 4 da auditoria — prova verificável)
   ⚠️ Lucas: preencher CVM_REGISTRO com o número do registro de
   consultor de valores mobiliários. Enquanto vazio, exibimos o
   nome + CNPJ (verificáveis) e o link para a consulta pública.
   CVM_CONSULTA_URL: trocar pela deep-link da consulta se preferir.
   ---------------------------------------------------------------- */
const CVM_REGISTRO = "CVM nº 004770-8";
const RAZAO_SOCIAL = "Midlej Consultoria de Valores Mobiliários LTDA";
const CNPJ = "67.608.789/0001-39";

/* ----------------------------------------------------------------
   Autoridade — "quem conduz a sua análise" (Eixo 4 / Ação 9)
   ⚠️ Lucas: para o maior salto de conversão da auditoria, preencha
   RESPONSAVEL.nome e troque RESPONSAVEL.foto por um retrato real.
   Com nome preenchido, a página exibe o cartão pessoal (rosto +
   nome + credencial). Vazio, exibe a versão institucional segura.
   ---------------------------------------------------------------- */
const RESPONSAVEL = {
  nome: "Allan Guilherme",
  cargo: "Sócio · Responsável pela estratégia de investimentos",
  credencial: "CEA nº 004189-0 (Anbima)",
  foto: "/allan.jpeg", // retrato real do Allan Guilherme
  bio: "Sócio responsável pela estratégia de investimentos da Midlej. É a estratégia que ele conduz que orienta cada Raio-X — a análise é feita por gente, não por um algoritmo genérico, e você sabe exatamente quem responde por cada recomendação.",
};

/* ----------------------------------------------------------------
   Variantes de hero por dor de entrada (Seção 11/13 — message match)
   Ativadas por ?dor=heranca|parado|insatisfeito|metodo. A variante
   recebe noindex (só a principal é indexada) e casa 1:1 com o
   grupo de anúncios correspondente no Google Ads (utm_content).
   ---------------------------------------------------------------- */
type Dor = "heranca" | "parado" | "insatisfeito" | "metodo";
/* Headlines curtas: o hero agora é de duas colunas (texto + formulário) e
   títulos longos quebravam em excesso na coluna estreita. */
const DOR_VARIANTS: Record<Dor, { eyebrow: string; h1: string; sub: string }> = {
  heranca: {
    eyebrow: "Herança · Venda de imóvel · Liquidez",
    h1: "Recebeu uma herança? Nós te mostramos onde investir.",
    sub: "A primeira alocação é a que mais pesa. Peça o Raio-X da sua carteira — somos remunerados por você, não por comissão de produto.",
  },
  parado: {
    eyebrow: "Capital parado no banco",
    h1: "Dinheiro parado no banco? Nós te mostramos onde investir.",
    sub: "Cada mês no lugar errado é retorno que não volta. Peça o Raio-X da sua carteira — somos remunerados por você, não por comissão de produto.",
  },
  insatisfeito: {
    eyebrow: "Segunda opinião · Sem conflito",
    h1: "Seu banco vende, mas não orienta? Nós te mostramos onde investir.",
    sub: "Uma segunda opinião sobre a carteira que você já tem. Peça o Raio-X — somos remunerados por você, não por comissão de produto.",
  },
  metodo: {
    eyebrow: "Método · Responsável por cada recomendação",
    h1: "Você já investe. Falta método — nós te mostramos o seu.",
    sub: "Uma tese por trás de cada posição e alguém que responde por ela. Peça o Raio-X da sua carteira — somos remunerados por você, não por comissão de produto.",
  },
};

const HERO_DEFAULT = {
  eyebrow: "Consultoria de investimentos",
  h1: "Onde investir seu dinheiro? Nós te mostramos.",
  sub: "Não existe “melhor investimento” universal — existe a carteira certa para o seu momento. O Raio-X da Midlej mostra a sua, sem custo e sem compromisso. Somos remunerados por você, não por comissão de produto.",
};

/* Números institucionais (mesma fonte da home) — barra de credibilidade do hero. */
const HERO_STATS = [
  { v: "R$ 120M+", k: "em patrimônio acompanhado" },
  { v: "85+", k: "famílias atendidas" },
];

/* ----------------------------------------------------------------
   Equipe — mesma fonte da home (app/page.tsx). Substitui o antigo
   bloco de responsável único: a página passa a mostrar o time inteiro.
   ---------------------------------------------------------------- */
const TEAM = [
  {
    name: "Lucas Midlej",
    role: "Sócio-fundador",
    bio: "Advogado com atuação focada no cruzamento entre direito e mercado financeiro. Especialista em planejamento patrimonial, estruturas societárias e assessoria estratégica para investidores, empresários e famílias.",
    photo: "/lucas.jpeg",
  },
  {
    name: "Breno Barreto",
    role: "Sócio",
    bio: "Responsável pela operação e governança da consultoria. Coordena processos, inovação e segurança das estruturas implementadas, garantindo eficiência e conformidade em cada solução entregue.",
    photo: "/breno.jpeg",
  },
  {
    name: "Allan Guilherme",
    role: "Sócio · Consultor de Investimentos",
    bio: "Atua em análise de investimentos, alocação de ativos e estratégias de preservação e crescimento patrimonial para pessoas físicas e jurídicas.",
    photo: "/allan2.jpeg",
  },
  {
    name: "Henrique Sgarioni",
    role: "Gestor Comercial",
    bio: "MBA em Finanças, Investimentos e Offshore. Especialista em soluções nacionais e internacionais, com foco em planejamento patrimonial, proteção de patrimônio e relacionamento com clientes.",
    photo: "/henrique.jpeg",
  },
  {
    name: "Guilherme José",
    role: "Diretor de Tecnologia",
    bio: "Graduado na área de tecnologia pela Universidade de Brasília. Responsável pelos sistemas, automação de processos e coordenação de projetos da Midlej — trazendo rigor analítico e visão sistêmica para a operação da consultoria.",
    photo: "/Guilherme.jpeg",
  },
];

function resolveDor(raw: string | string[] | undefined): Dor | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v && v in DOR_VARIANTS) return v as Dor;
  return null;
}

/* ----------------------------------------------------------------
   FAQ (fonte única — alimenta a seção visível e o JSON-LD FAQPage)
   ---------------------------------------------------------------- */
const FAQ_ITEMS = [
  {
    q: "O Raio-X é realmente gratuito?",
    a: "A primeira análise e a conversa são gratuitas e sem compromisso. Só há custo caso você decida contratar a consultoria em seguida — e o valor é conhecido e acordado antes de qualquer aceite.",
  },
  {
    q: "A Midlej passa a administrar o meu dinheiro?",
    a: "Não. A Midlej Capital é consultoria, não gestão de recursos. Recomendamos e acompanhamos, mas a conta, a custódia e as ordens de compra e venda permanecem sempre com você. Em nenhum momento operamos a sua conta.",
  },
  {
    q: "Preciso informar senha ou extrato bancário?",
    a: "Em nenhuma hipótese. Não solicitamos senha, token ou acesso à sua conta. Para pedir o Raio-X, você informa apenas o seu contexto e um contato para o nosso retorno.",
  },
  {
    q: "Tenho um valor menor para investir. Faz sentido?",
    a: "Não trabalhamos com um piso rígido. Avaliamos se a consultoria independente é adequada ao seu caso e, seja qual for o caminho, damos clareza sobre o que você estará investindo e os riscos envolvidos — para que a decisão seja sua, com informação.",
  },
];

/* ================================================================
   Metadados — próprios da página (corrige título duplicado e o
   Open Graph genérico herdado da home; Eixo 5 da auditoria).
   Título "absolute" evita o template "· Midlej Capital" duplicar.
   Variantes por dor recebem noindex.
   ================================================================ */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const dor = resolveDor((await searchParams).dor);
  return {
    title: {
      absolute: "Raio-X gratuito da sua carteira de investimentos | Midlej Capital",
    },
    description:
      "Herança, venda de imóvel ou capital parado? Nós te mostramos onde investir. Peça o Raio-X da sua carteira — somos remunerados por você, não por comissão.",
    alternates: { canonical: "/raiox" },
    openGraph: {
      title: "Raio-X gratuito da sua carteira de investimentos",
      description:
        "Segunda opinião independente antes de decidir onde investir. Somos remunerados por você, não por comissão de produto.",
      type: "website",
      locale: "pt_BR",
      url: "https://midlejcapital.com.br/raiox",
    },
    twitter: {
      card: "summary_large_image",
      title: "Raio-X gratuito da sua carteira de investimentos",
      description:
        "Segunda opinião independente antes de decidir onde investir. Somos remunerados por você, não por comissão de produto.",
    },
    // Variantes de campanha não são indexadas (evita conteúdo duplicado);
    // a canonical acima consolida tudo em /raiox.
    robots: dor ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export default async function RaioXPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const dor = resolveDor((await searchParams).dor);
  const hero = dor ? DOR_VARIANTS[dor] : HERO_DEFAULT;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main
      data-brand
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen bg-white text-[#2E4659] overflow-x-hidden"
    >
      {/* Dados estruturados FAQPage (Eixo 5 — presença em busca) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <SmoothAnchor />
      {/* Header minimal: sem menu, logo aponta p/ o topo, CTA unificado (Eixo 3) */}
      <InvestimentosHeader hideNav ctaLabel="Descubra onde investir" logoHref="#top" />

      {/* Ordem espelhada na estrutura da Assessoria Alpha (ref. 21/07/2026):
          captura no hero → prova própria → quem somos → método → o resto.
          A prova e o time sobem para logo depois da captura; o argumento
          longo (dor, para quem, FAQ) vai para o fim. Sem depoimentos de
          cliente — ainda não temos. */}
      <Hero hero={hero} />
      <Resposta />
      <TrackRecord />
      <Equipe />
      <ComoFunciona />
      <Dor />
      <PorQueConfiar />
      <ParaQuem />
      <FAQSection />
      <Closing />

      <StickyCTA label="Quero meu Raio-X gratuito" href="#contato" />
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

/* ================================================================
   01 — Hero (alta intenção · variante por dor)
   ================================================================ */

function Hero({ hero }: { hero: { eyebrow: string; h1: string; sub: string } }) {
  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #16242F 0%, #223849 45%, #2E4659 100%)",
      }}
    >
      {/* Ponte JK — movimento e âncora de território (Brasília) */}
      <PonteJK />

      {/* Halo atrás do formulário — puxa o olho para a captura */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(58% 52% at 78% 38%, rgba(143,179,212,0.20) 0%, rgba(143,179,212,0) 70%)",
        }}
      />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">

          {/* Esquerda: promessa */}
          <div className="col-span-full md:col-span-6">
            <span className="inline-block text-[0.7rem] font-semibold tracking-widest uppercase mb-5 text-white/70">
              {hero.eyebrow}
            </span>
            <h1 className="text-[clamp(2.125rem,4.4vw,3.75rem)] font-bold leading-[1.05] tracking-tight mb-5 text-white max-w-[16ch]">
              {hero.h1}
            </h1>
            <p className="text-[1.0625rem] leading-[1.65] max-w-[48ch] text-white/80">
              {hero.sub}
            </p>
            <p className="mt-6 text-[0.8rem] text-white/55 max-w-[46ch]">
              Análise sem custo e sem compromisso. Não solicitamos senha, extrato
              bancário ou acesso à sua conta.
            </p>
          </div>

          {/* Direita: captura acima da dobra (o formulário É o CTA) */}
          <div className="col-span-full md:col-span-5 md:col-start-8">
            <RaioXForm instanceId="hero" />
          </div>
        </div>

        {/* Barra de credibilidade */}
        <dl className="mt-12 md:mt-16 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[46rem]">
          {HERO_STATS.map((s) => (
            <div key={s.k}>
              <dt className="text-[clamp(2.25rem,4vw,3.25rem)] font-light leading-[0.95] tabular-nums text-white">
                {s.v}
              </dt>
              <dd className="mt-2.5 text-[0.85rem]" style={{ color: "rgba(255,255,255,0.65)" }}>
                {s.k}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ================================================================
   01b — A resposta (message match: pega a pergunta da keyword e a
   conduz até "você descobre com o Raio-X da Midlej"). Foco nas
   queries reais que trazem cliques: "onde investir meu dinheiro",
   "dinheiro parado no banco", "onde investir 100/500 mil".
   ⚠️ COMPLIANCE CVM: a resposta é sempre "depende do seu caso → o
   Raio-X revela" — nunca uma indicação de ativo nem promessa de retorno.
   ================================================================ */

function Resposta() {
  const perguntas = [
    {
      q: "“Onde investir R$ 100 mil, R$ 500 mil, R$ 1 milhão?”",
      a: "O valor muda as opções, mas não a lógica: a carteira certa é a que cabe no seu caso, não a dica da vez. O Raio-X mostra a sua.",
    },
    {
      q: "“Onde investir com segurança?”",
      a: "Segurança se constrói entendendo o risco de cada posição — não fugindo de todas. O Raio-X aponta onde você está exposto sem perceber.",
    },
    {
      q: "“Quais os melhores investimentos para 2026?”",
      a: "Não existe uma lista pronta que sirva para todo mundo. “Melhor” é o que atende ao seu objetivo, prazo e risco — o Raio-X aponta o que faz sentido para o seu caso agora.",
    },
    {
      q: "“Como aplicar meu dinheiro — por onde começar?”",
      a: "O primeiro passo é entender o que você já tem e onde quer chegar. O Raio-X organiza isso e mostra o próximo passo concreto, sem jargão e sem pressão de venda.",
    },
  ];
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="A pergunta que te trouxe aqui" />
        <h2 className="text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
          “Onde eu invisto meu dinheiro?” — nós te mostramos.
        </h2>
        <div className="mt-8 max-w-[60ch] space-y-5 text-[1.0625rem] leading-[1.7]" style={{ color: "#6B7B8D" }}>
          <p>
            Todo blog vai te empurrar um produto. Todo gerente, o produto do mês. Nós
            fazemos o contrário: olhamos o <strong style={{ color: "#2E4659" }}>seu</strong> caso
            e mostramos onde o seu dinheiro deveria estar — porque{" "}
            <strong style={{ color: "#2E4659" }}>a alocação certa não é a mesma para todo mundo.</strong>
          </p>
          <p>
            É isso que o <strong style={{ color: "#2E4659" }}>Raio-X da Carteira da
            Midlej</strong> entrega, sem custo: o que está caro, onde o risco não se
            justifica e onde o dinheiro pode trabalhar melhor. Uma resposta construída
            sobre a sua realidade — não sobre uma tabela genérica.
          </p>
        </div>

        <Link
          href="#top"
          className="mt-9 inline-flex items-center gap-2 px-7 py-4 rounded-lg text-[0.95rem] font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200 shadow-lg"
        >
          Descubra onde investir <Arrow />
        </Link>

        <div className="mt-14 pt-10 border-t border-[#E1E6EC] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">
          {perguntas.map((p) => (
            <div key={p.q} className="col-span-full md:col-span-6 flex flex-col">
              <p className="text-[1.125rem] font-bold leading-[1.3]" style={{ color: "#2E4659" }}>
                {p.q}
              </p>
              <p className="mt-3 text-[0.95rem] leading-[1.6]" style={{ color: "#6B7B8D" }}>
                {p.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   02 — A dor / o conflito de interesse (#manifesto p/ o header)
   ================================================================ */

function Dor() {
  return (
    <section id="manifesto" className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="Por que a maioria investe mal" />
        <h2 className="text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
          O problema não é falta de opções. É o excesso de intermediários remunerados por comissão.
        </h2>
        <div className="mt-14 pt-10 border-t border-[#EDEFF2] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">
          {[
            {
              k: "No banco",
              v: "Você é uma meta de vendas",
              note: "O gerente é remunerado para distribuir o produto do momento. O que é mais rentável para a instituição nem sempre é o mais adequado ao seu patrimônio.",
            },
            {
              k: "Na poupança / CDB",
              v: "Tempo é retorno que não volta",
              note: "Cada mês no ativo errado é rendimento que não se recupera. O custo de adiar a decisão costuma superar o de tomá-la ao lado de quem não distribui produtos.",
            },
            {
              k: "Na Midlej",
              v: "Ninguém é remunerado por comissão",
              note: "Somos remunerados exclusivamente por você. Sem rebate e sem produto de prateleira. A recomendação existe para servir ao seu patrimônio — e apenas a ele.",
            },
          ].map((m) => (
            <div key={m.k} className="col-span-full md:col-span-4 flex flex-col">
              <p className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase" style={{ color: "#6B7B8D" }}>
                {m.k}
              </p>
              <p className="mt-4 text-[clamp(1.375rem,2.4vw,1.875rem)] font-light leading-[1.1]" style={{ color: "#2E4659" }}>
                {m.v}
              </p>
              <p className="mt-4 text-[0.95rem] leading-[1.6]" style={{ color: "#6B7B8D" }}>
                {m.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   03 — Resultado próprio + método (ÂNGULO 2) — BLINDADO CVM
   ----------------------------------------------------------------
   ⚠️ ENQUADRAMENTO (definido pelo Lucas / CEA):
   NÃO recomendamos ativos nem indicamos ações a comprar — isso seria
   atividade de consultor/analista. Aqui apenas DEMONSTRAMOS o resultado
   próprio da nossa estratégia e COMO chegamos nele (método/educacional).
   ----------------------------------------------------------------
   ⚠️ COMPLIANCE: divulgação de rentabilidade passada.
   Dados CONFIRMADOS pelo Lucas (15/07/2026):
     • período: 31/07/2025 a 10/07/2026;
     • rentabilidade: 23,06%; benchmark: 166,90% do CDI no mesmo período.
   Rótulo corrigido de "12 meses" p/ "acumulada no período" (Eixo 6:
   a janela real é ~11 meses e 10 dias — o rótulo agora fecha com as datas).
   O disclaimer abaixo é obrigatório e não deve ser removido.
   ================================================================ */

function TrackRecord() {
  return (
    <section
      id="track"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(155deg, #24394A 0%, #2E4659 55%, #274155 100%)",
      }}
    >
      <FundoProva />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="max-w-[46ch] mb-12 md:mb-16">
          <SectionTag label="Prova própria" dark />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight text-white">
            Testamos todas as estratégias que aplicamos.
          </h2>
          <p className="mt-6 text-[0.95rem] leading-[1.65]" style={{ color: "rgba(255,255,255,0.75)" }}>
            Nenhuma tese vai para a carteira de um cliente antes de passar pela nossa.
            O <strong className="text-white/90">Buy and Hold</strong> é uma delas — e este
            é o resultado que ela entregou na carteira própria da Midlej.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Card único: a estratégia Buy and Hold e o resultado dela */}
          <div className="col-span-full md:col-span-8">
            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-8 md:p-10">
              <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.50)" }}>
                Estratégia Buy and Hold · carteira própria
              </p>
              <h3 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.05] tracking-tight text-white mb-2">
                Buy and Hold
              </h3>
              <p className="text-[0.95rem] leading-[1.6] max-w-[46ch]" style={{ color: "rgba(255,255,255,0.75)" }}>
                Aporte estável, retorno reinvestido e horizonte longo. Em vez de tentar
                acertar o momento de entrada, a estratégia deixa o tempo trabalhar: o
                capital permanece investido e o retorno passa a render sobre si mesmo.
              </p>

              <div className="flex flex-wrap items-end gap-x-12 gap-y-6 mt-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-[clamp(4rem,10vw,7rem)] font-light leading-[0.88] tabular-nums text-white">
                    23,06%
                  </p>
                  <p className="mt-3 text-[0.85rem]" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Rentabilidade acumulada no período <br />31/07/2025 a 10/07/2026
                  </p>
                </div>
                <div className="h-20 w-px bg-white/15 hidden sm:block" aria-hidden />
                <div>
                  <p className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-light leading-[1] tabular-nums" style={{ color: "rgba(255,255,255,0.85)" }}>
                    166,90%
                  </p>
                  <p className="mt-3 text-[0.85rem]" style={{ color: "rgba(255,255,255,0.6)" }}>
                    do CDI no mesmo <br />período
                  </p>
                </div>
              </div>

              <ul className="mt-8 pt-6 border-t border-white/10 space-y-3">
                {[
                  "Aporte estável, retorno reinvestido, horizonte longo — sem tentar adivinhar o timing.",
                  "O método é o que apresentamos na primeira conversa. Não uma lista de ativos.",
                  "A decisão e a custódia permanecem sempre com você.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-white">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="mt-0.5 shrink-0">
                      <path d="M3.5 9.5l3.5 3.5 7.5-8" stroke="#8FB3D4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>

              <Link
                href="#contato"
                className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-lg text-[0.95rem] font-semibold text-[#2E4659] bg-white hover:bg-[#dce8f0] transition-colors duration-200 shadow-lg"
              >
                Quero entender essa estratégia <Arrow />
              </Link>
            </div>
          </div>

          {/* Disclaimer CVM — obrigatório */}
          <div className="col-span-full">
            <p className="mt-5 text-[0.72rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.45)" }}>
              Resultado da carteira própria da Midlej Capital no período de 31/07/2025
              a 10/07/2026: 23,06% de rentabilidade, equivalente a 166,90%
              do CDI no mesmo período. <strong style={{ color: "rgba(255,255,255,0.65)" }}>Rentabilidade passada não representa
              garantia de rentabilidade futura.</strong> Investimentos envolvem risco e
              podem resultar em perdas. Conteúdo de caráter informativo e educacional,
              que apenas demonstra o resultado da carteira própria da Midlej e não
              constitui indicação, recomendação ou oferta de compra ou venda de qualquer
              ativo. A Midlej Capital não realiza gestão de recursos de terceiros.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   04 — Como funciona o Raio-X (3 passos)
   Passo 3 reescrito (Seção 11): "diagnóstico", não "recomendações"
   gratuitas — não borra a fronteira com o serviço contratado, e
   promove a ponte para a próxima etapa (Eixo 1 / Eixo 6).
   ================================================================ */

function ComoFunciona() {
  const steps = [
    {
      n: "01",
      title: "Você apresenta seu contexto",
      body: "Em cerca de dois minutos, sem senha ou extrato bancário. Apenas a sua situação atual e o que deseja resolver — herança, capital parado, insatisfação com o banco ou a montagem da primeira carteira.",
    },
    {
      n: "02",
      title: "Fazemos o Raio-X",
      body: "Nossa equipe analisa o seu cenário e prepara uma leitura do que é adequado ao seu caso — o que ajustar, onde há custos excessivos e onde a exposição a risco não se justifica.",
    },
    {
      n: "03",
      title: "Você recebe o diagnóstico",
      body: "Em uma conversa gratuita e confidencial, sem pressão de venda, apresentamos a leitura do seu cenário. Se fizer sentido seguir com a Midlej, a proposta é apresentada com valores conhecidos e acordados antes de qualquer aceite. A custódia e a decisão permanecem sempre com você.",
    },
  ];
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="O Raio-X da Carteira" />
        <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[22ch] mb-4" style={{ color: "#2E4659" }}>
          Gratuito, em três passos.
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] max-w-[54ch] mb-12 md:mb-16" style={{ color: "#6B7B8D" }}>
          Uma segunda opinião independente antes de qualquer decisão de investimento.
        </p>
        <ol className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {steps.map((s) => (
            <li key={s.n} className="col-span-full md:col-span-4 bg-white rounded-2xl border border-[#EDEFF2] p-8 flex flex-col">
              <span className="text-[clamp(2rem,3vw,2.75rem)] font-light leading-none tabular-nums" style={{ color: "#4a6b8c" }}>
                {s.n}
              </span>
              <h3 className="mt-6 text-[1.25rem] font-bold leading-[1.2] tracking-tight" style={{ color: "#2E4659" }}>
                {s.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.6]" style={{ color: "#6B7B8D" }}>
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================
   05 — Quem conduz a sua análise
   Em ticket alto, confiança é depositada em pessoas antes de
   instituições. A identificação regulatória fica na barra legal do
   rodapé — cumprida, sem virar argumento de venda.
   ================================================================ */

function Equipe() {
  return (
    <section id="equipe" className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="max-w-[46ch]">
          <SectionTag label="Quem conduz a sua análise" />
          <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight" style={{ color: "#2E4659" }}>
            Seu Raio-X é feito por gente, com nome e rosto.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
            Nenhum algoritmo genérico assina a sua análise. Este é o time que responde
            por cada recomendação — e que continua ao seu lado depois da primeira conversa.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TEAM.map((p) => (
            <article key={p.name} className="flex flex-col">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#F5F7FA]">
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="mt-5 text-[1.25rem] font-bold leading-tight tracking-tight" style={{ color: "#2E4659" }}>
                {p.name}
              </h3>
              <p className="mt-1.5 text-[0.85rem] font-medium" style={{ color: "#4a6b8c" }}>
                {p.role}
                {p.name === "Allan Guilherme" && ` · ${RESPONSAVEL.credencial}`}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-[1.6]" style={{ color: "#6B7B8D" }}>
                {p.bio}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ================================================================
   06 — Por que confiar (autoridade)
   ================================================================ */

function PorQueConfiar() {
  const items = [
    { k: "Estratégia", v: "Testada em casa", note: "Nenhuma tese vai para a sua carteira antes de passar pela nossa." },
    { k: "Remuneração", v: "Só o cliente", note: "Fee pago por você. Zero rebate, zero comissão de produto." },
    { k: "Custódia", v: "Fica com você", note: "Seu dinheiro nunca passa por conta da Midlej. Acesso e ordem são seus." },
    { k: "Relação", v: "Contínua", note: "Acompanhamento plurianual, não venda pontual de um produto." },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="Por que confiar" />
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight mb-12 md:mb-16 max-w-[26ch]" style={{ color: "#2E4659" }}>
          Independência não é discurso. É o nosso modelo de remuneração.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 border-t border-[#EDEFF2] pt-10">
          {items.map((m) => (
            <div key={m.k} className="col-span-full md:col-span-6 lg:col-span-3 flex flex-col">
              <p className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase" style={{ color: "#6B7B8D" }}>
                {m.k}
              </p>
              <p className="mt-4 text-[clamp(1.5rem,2.6vw,2.125rem)] font-light leading-[1.04]" style={{ color: "#2E4659" }}>
                {m.v}
              </p>
              <p className="mt-4 text-[0.95rem] leading-[1.55] max-w-[34ch]" style={{ color: "#6B7B8D" }}>
                {m.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   07 — Para quem (#para-quem p/ o header)
   ================================================================ */

function ParaQuem() {
  const profiles = [
    {
      tag: "Recebeu herança ou liquidez",
      body: "Um valor relevante ingressou de uma só vez — herança, venda de imóvel ou de uma empresa — e você não quer errar a primeira decisão de alocação.",
    },
    {
      tag: "Tem capital parado",
      body: "R$ 100 mil, R$ 500 mil ou mais na poupança, no CDB do banco ou em conta corrente, rendendo abaixo do potencial enquanto a decisão é adiada.",
    },
    {
      tag: "Insatisfeito com banco ou assessor",
      body: "Suspeita que paga taxas em excesso, que é direcionado a produtos e que não há ninguém zelando pelos seus interesses. Busca uma segunda opinião sem conflito.",
    },
    {
      tag: "Quer investir melhor",
      body: "Já investe por conta própria, mas deseja método, uma tese por trás de cada posição e um responsável pelas recomendações — não um algoritmo genérico.",
    },
  ];
  return (
    <section id="para-quem" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14 md:mb-20">
          <div className="col-span-full md:col-span-9">
            <SectionTag label="Para quem é o Raio-X" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
              Se você tem recursos para investir e quer decidir sem pressão de venda, é para você.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          {profiles.map((p) => (
            <article key={p.tag} className="col-span-full md:col-span-6 border-t border-[#EDEFF2] pt-8">
              <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase" style={{ color: "#4a6b8c" }}>
                {p.tag}
              </p>
              <p className="mt-6 text-[1.0625rem] leading-[1.65] max-w-[48ch]" style={{ color: "#6B7B8D" }}>
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   08 — FAQ (objeções) — fonte: FAQ_ITEMS
   ================================================================ */

function FAQSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-full md:col-span-4">
            <SectionTag label="Dúvidas frequentes" />
            <h2 className="text-[clamp(1.625rem,3vw,2.5rem)] font-bold leading-[1.04] tracking-tight max-w-[16ch]" style={{ color: "#2E4659" }}>
              As dúvidas mais comuns antes da primeira conversa.
            </h2>
          </div>
          <div className="col-span-full md:col-span-8 md:col-start-5">
            <ul className="border-t border-[#EDEFF2]">
              {FAQ_ITEMS.map((f, i) => (
                <li key={i} className="border-b border-[#EDEFF2]">
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-baseline justify-between gap-6 py-6 md:py-7">
                      <span className="text-[clamp(1.0625rem,1.4vw,1.25rem)] font-bold leading-[1.3]" style={{ color: "#2E4659" }}>
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className="font-semibold text-[0.95rem] transition-transform duration-200 group-open:rotate-45"
                        style={{ color: "#4a6b8c" }}
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-6 md:pb-7 text-[0.95rem] leading-[1.65] max-w-[56ch]" style={{ color: "#6B7B8D" }}>
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
   09 — Closing (form + footer)
   Prateleira de soluções REMOVIDA (Eixo 3 + Eixo 6: elimina rota
   de fuga e a contradição com "sem produto de prateleira").
   SLA de retorno publicado (Eixo 2). "Quatro perguntas" alinhado
   ao "Passo 1 de 4" do formulário (Eixo 3).
   ================================================================ */

function Closing() {
  const year = new Date().getFullYear();
  return (
    <section id="contato" style={{ backgroundColor: "#4a6b8c" }} className="pt-24 md:pt-32 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* ── CTA + form ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start pb-20 md:pb-24">
          <div className="col-span-full md:col-span-5">
            <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
              Raio-X gratuito da carteira
            </p>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white mb-6">
              Descubra onde investir antes de tomar qualquer decisão.
            </h2>
            <p className="text-[1.0625rem] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.80)" }}>
              Gratuito, confidencial e sem compromisso. Sem senha, sem extrato
              e sem oferta de produtos.
            </p>
            <p className="text-[0.9375rem] leading-relaxed max-w-[44ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
              Você responde a quatro perguntas rápidas, nossa equipe prepara a análise
              do seu caso e retorna pelo WhatsApp para agendar a conversa — on-line ou
              presencial em Brasília.
            </p>
          </div>
          <div className="col-span-full md:col-span-6 md:col-start-7">
            <RaioXForm instanceId="closing" />
          </div>
        </div>

        {/* ── Divisor ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }} className="mb-12 md:mb-14" />

        {/* ── Footer info ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
          <div className="col-span-full md:col-span-6">
            <Image
              src="/midlej_capital.png"
              alt="Midlej Capital"
              width={320}
              height={130}
              className="h-12 w-auto mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm leading-relaxed max-w-[40ch]" style={{ color: "rgba(255,255,255,0.55)" }}>
              Consultoria de investimentos. Sem conflito de interesse, sem produto
              de prateleira.
            </p>
          </div>

          <div className="col-span-full md:col-span-5 md:col-start-8">
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
        <div className="border-t pt-6 flex flex-col gap-3 text-xs" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.38)" }}>
          <p className="max-w-[92ch] leading-[1.6]">
            A Midlej Consultoria de Valores Mobiliários LTDA é registrada na CVM e
            atua exclusivamente na modalidade fee based. Não realiza gestão de recursos
            de terceiros nem garante rentabilidade. Rentabilidade passada não representa
            garantia de rentabilidade futura. Investimentos envolvem riscos e podem
            resultar em perdas. Este site tem caráter informativo e não constitui oferta,
            recomendação individualizada ou solicitação de compra ou venda de ativos.
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <span>{RAZAO_SOCIAL} · CNPJ {CNPJ} · {CVM_REGISTRO}</span>
            <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
