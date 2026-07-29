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
  credencial: "CEA, Consultor CVM nº 4189-0",
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
    h1: "Uma geração para construir. Uma decisão para comprometer.",
    sub: "Quando o patrimônio entra de uma vez, a primeira alocação é a que mais pesa — e é a que mais gente decide sozinha, no susto. O Raio-X mostra onde investir antes de qualquer movimento irreversível.",
  },
  parado: {
    eyebrow: "Capital parado no banco",
    h1: "Dinheiro parado rende. Para o banco.",
    sub: "Enquanto a decisão é adiada, o capital fica onde é conveniente para a instituição — não para você. O Raio-X mostra onde ele deveria estar. Somos remunerados por você, não por comissão de produto.",
  },
  insatisfeito: {
    eyebrow: "Segunda opinião · Sem conflito",
    h1: "Ele te liga para orientar — ou para oferecer?",
    sub: "Se a resposta é “para oferecer”, você não tem um consultor: tem um canal de distribuição. Peça uma segunda opinião sobre a carteira que você já tem, de quem não ganha comissão por ela.",
  },
  metodo: {
    eyebrow: "Método · Alguém que responde por cada posição",
    h1: "Você investe. Mas cada posição tem uma tese?",
    sub: "Carteira não é coleção de dicas. Se não dá para justificar por que cada ativo está lá, ele está lá por acaso. O Raio-X mostra o que sustenta a sua — e o que não sustenta.",
  },
};

const HERO_DEFAULT = {
  eyebrow: "Consultoria de investimentos · Registro CVM",
  h1: "Onde investir sem ser a meta de vendas de alguém.",
  sub: "Todo gerente tem uma meta. Todo assessor tem um rebate. Nós somos remunerados por uma pessoa só: você. O Raio-X da Midlej mostra onde o seu dinheiro deveria estar — e o que o modelo atual está custando.",
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
    q: "O Raio-X tem algum custo?",
    a: "A primeira análise e a conversa são sem compromisso e não têm custo. Há investimento apenas se você decidir contratar a consultoria em seguida — sempre com o valor conhecido e acordado antes de qualquer aceite.",
  },
  {
    q: "Vocês indicam qual ação eu devo comprar?",
    a: "Não é assim que funciona, e desconfie de quem faz isso na primeira conversa. Consultoria de valores mobiliários trata de estratégia, alocação e adequação ao seu caso. Recomendação individualizada existe dentro de um contrato de consultoria, com o seu perfil formalizado — nunca como isca.",
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
    a: "Não trabalhamos com um piso rígido. O que avaliamos é se a consultoria independente é adequada ao seu caso — e, seja qual for o caminho, você sai da conversa sabendo no que estaria investindo e a que riscos estaria exposto. A decisão é sua, mas com informação.",
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
      absolute: "Raio-X da sua carteira de investimentos | Midlej Capital",
    },
    description:
      "Todo gerente tem uma meta. Todo assessor tem um rebate. Peça o Raio-X da sua carteira e veja onde investir — somos remunerados por você, não por comissão de produto.",
    alternates: { canonical: "/raiox" },
    openGraph: {
      title: "Raio-X da sua carteira de investimentos",
      description:
        "Onde investir sem ser a meta de vendas de alguém. Segunda opinião de quem é remunerado por você, não por comissão de produto.",
      type: "website",
      locale: "pt_BR",
      url: "https://midlejcapital.com.br/raiox",
    },
    twitter: {
      card: "summary_large_image",
      title: "Raio-X da sua carteira de investimentos",
      description:
        "Onde investir sem ser a meta de vendas de alguém. Segunda opinião de quem é remunerado por você, não por comissão de produto.",
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

      <StickyCTA label="Quero meu Raio-X" href="#contato" />
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
              Duas etapas, cerca de dois minutos. Sem senha, sem extrato,
              sem acesso à sua conta.
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
      a: "O valor muda as opções. Não muda a lógica: a carteira certa é a que cabe no seu caso, não a dica da vez. O Raio-X mostra a sua.",
    },
    {
      q: "“Onde investir com segurança?”",
      a: "Segurança não é fugir de todo risco — é saber exatamente qual risco você está correndo. O Raio-X aponta onde você está exposto sem perceber.",
    },
    {
      q: "“Quais os melhores investimentos para 2026?”",
      a: "Se existisse uma lista que serve para todo mundo, ela já teria parado de funcionar. “Melhor” é o que atende ao seu objetivo, prazo e risco — e isso só aparece olhando o seu caso.",
    },
    {
      q: "“Como aplicar meu dinheiro — por onde começar?”",
      a: "Comece por onde ninguém começa: pelo que você já tem. O Raio-X organiza o cenário atual e mostra o próximo passo concreto, sem jargão e sem pressão de venda.",
    },
  ];
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="A pergunta que te trouxe aqui" />
        <h2 className="text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
          “Onde eu invisto meu dinheiro?” — quem responde de graça, ganha para responder assim.
        </h2>
        {/* space-y-* também aplica margin-top nos filhos <p> — anulado pelo reset
            sem camada do globals.css. Espaçamento por style inline (vence tudo). */}
        <div className="mt-8 max-w-[60ch] text-[1.0625rem] leading-[1.7]" style={{ color: "#6B7B8D" }}>
          <p>
            Todo blog tem um produto para indicar. Todo gerente tem uma meta para bater.
            Todo assessor tem um rebate para receber. A resposta que você recebe hoje já
            chega <strong style={{ color: "#2E4659" }}>contaminada pelo modo como quem responde é pago</strong>.
          </p>
          <p style={{ marginTop: "1.25rem" }}>
            A Midlej é remunerada por uma pessoa só: você. É por isso que podemos dizer o
            que a maioria não diz — inclusive que a sua carteira já está adequada, se
            estiver. O <strong style={{ color: "#2E4659" }}>Raio-X da Carteira</strong> mostra
            o que está caro, onde o risco não se justifica e onde o capital pode trabalhar
            melhor. Uma leitura do <strong style={{ color: "#2E4659" }}>seu</strong> caso —
            não de uma tabela genérica.
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
        <SectionTag label="O inimigo" />
        <h2 className="text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
          Ninguém está sentado do seu lado da mesa.
        </h2>
        {/* ⚠️ globals.css declara `p { margin: 0 }` FORA de @layer — `mt-*` em <p>
            é silenciosamente ignorado. Espaçamento vertical de parágrafo aqui vai
            por wrapper <div> ou style inline. */}
        <div className="mt-8 max-w-[60ch]">
          <p className="text-[1.0625rem] leading-[1.7]" style={{ color: "#6B7B8D" }}>
            O problema não é falta de opção. É que quase todo mundo que te orienta ganha
            para te orientar daquele jeito.
          </p>
        </div>
        <div className="mt-14 pt-10 border-t border-[#EDEFF2] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">
          {[
            {
              k: "No banco",
              v: "Você é uma meta",
              note: "O gerente é avaliado pelo que distribui, não pelo que o seu patrimônio construiu. O produto do mês existe porque alguém precisa vendê-lo — e o mês que vem terá outro.",
            },
            {
              k: "Na assessoria",
              v: "Você é um rebate",
              note: "A remuneração vem da instituição que emite o produto, não de quem investe. Quanto mais movimento na carteira, melhor para quem intermedia. Nem sempre para quem é dono do dinheiro.",
            },
            {
              k: "Na Midlej",
              v: "Você é o cliente",
              note: "Somos remunerados exclusivamente por você. Sem rebate, sem comissão, sem produto de prateleira. A recomendação existe para servir ao seu patrimônio — e apenas a ele.",
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

        {/* Nomeia o inimigo (manifesto de marca): a ineficiência é o adversário,
            nunca o cliente. Sem quantificar perda do leitor — compliance CVM. */}
        <div className="mt-14 pt-10 border-t border-[#EDEFF2] max-w-[60ch]">
          <p className="text-[1.0625rem] leading-[1.7]" style={{ color: "#6B7B8D" }}>
            O inimigo tem nome: <strong style={{ color: "#2E4659" }}>ineficiência patrimonial</strong>.
            Tributária, alocativa, sucessória. Ela não aparece no extrato, não gera aviso e
            não dói — até alguém acender a luz. É exatamente isso que o Raio-X faz.
          </p>
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
            Não comentamos o mercado. Operamos nele — com capital próprio.
          </h2>
          <p className="text-[0.95rem] leading-[1.65]" style={{ color: "rgba(255,255,255,0.75)", marginTop: "1.5rem" }}>
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

              {/* A pergunta é a única fonte de urgência permitida aqui: devolve ao
                  leitor a dúvida sobre o próprio resultado. Nunca projetar o passado
                  para frente nem simular quanto ele teria ganho (compliance CVM). */}
              <p className="text-[1.125rem] font-bold leading-[1.35] text-white" style={{ marginTop: "2rem" }}>
                E a sua? Quanto rendeu no mesmo período?
              </p>
              <p className="text-[0.9375rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.7)", marginTop: "0.75rem" }}>
                A maioria das pessoas não sabe responder. Não saber já é, por si só,
                metade do diagnóstico.
              </p>

              <ul className="mt-8 pt-6 border-t border-white/10 space-y-3">
                {[
                  "É a carteira própria da Midlej: testamos em casa antes de levar a qualquer cliente.",
                  "O que apresentamos na primeira conversa é o método. Não uma lista de ativos.",
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
      title: "Você apresenta o seu caso",
      body: "Duas etapas, cerca de dois minutos. Sem senha, sem extrato, sem acesso à conta. Apenas a sua situação hoje e o que precisa resolver — herança, capital parado, insatisfação com o banco ou a montagem da primeira carteira.",
    },
    {
      n: "02",
      title: "Nós fazemos o Raio-X",
      body: "A equipe analisa o seu cenário e prepara a leitura: o que está caro, onde o risco não se justifica, o que está exposto sem necessidade e onde o capital pode trabalhar melhor.",
    },
    {
      n: "03",
      title: "Você recebe o diagnóstico",
      body: "Em uma conversa confidencial, sem pressão de venda. Você sai dela com a leitura do seu cenário — tenha ou não interesse em seguir. Se fizer sentido continuar com a Midlej, a proposta vem com valores conhecidos e acordados antes de qualquer aceite. A custódia e a decisão permanecem sempre com você.",
    },
  ];
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionTag label="O Raio-X da Carteira" />
        <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[22ch] mb-4" style={{ color: "#2E4659" }}>
          Três passos. Nenhuma proposta comercial antes do diagnóstico.
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] max-w-[54ch] mb-12 md:mb-16" style={{ color: "#6B7B8D" }}>
          O diagnóstico vem primeiro — para você decidir com informação, e para nós
          avaliarmos se faz sentido conduzir o seu caso.
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
            Alguém assina a sua análise. Com nome, rosto e registro.
          </h2>
          <p className="text-[1.0625rem] leading-[1.65]" style={{ color: "#6B7B8D", marginTop: "1.5rem" }}>
            Nenhum algoritmo genérico assina o seu Raio-X. Este é o time que responde por
            cada recomendação — e que continua ao seu lado depois da primeira conversa.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
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
    { k: "Remuneração", v: "Só o cliente", note: "Fee pago por você. Zero rebate, zero comissão de produto, zero meta de distribuição." },
    { k: "Custódia", v: "Fica com você", note: "Seu dinheiro nunca passa por conta da Midlej. O acesso e a ordem são sempre seus." },
    { k: "Relação", v: "Contínua", note: "Acompanhamento plurianual. Não é a venda de um produto que termina no aceite." },
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
      body: "Um valor relevante entrou de uma só vez — herança, venda de imóvel ou de uma empresa. A primeira decisão é a que mais pesa, e você não quer tomá-la no susto nem no balcão.",
    },
    {
      tag: "Tem capital parado",
      body: "R$ 100 mil, R$ 500 mil ou mais na poupança, no CDB do bancão ou na conta corrente. Não é falta de dinheiro: é falta de uma decisão que ninguém tomou por você até hoje.",
    },
    {
      tag: "Insatisfeito com banco ou assessor",
      body: "Desconfia que paga taxa que não vê, que é direcionado a produto e que ninguém ali zela pelo seu interesse. Quer uma segunda opinião de quem não ganha nada com a sua escolha.",
    },
    {
      tag: "Quer investir melhor",
      body: "Você já investe. Falta uma tese por trás de cada posição e alguém com nome para responder por ela — em vez de um algoritmo genérico ou do grupo de dicas.",
    },
  ];

  /* Filtro explícito. Repele o tráfego que hoje mais consome verba sem virar
     cliente (busca de valores esquecidos, caçador de dica de ação) e reforça o
     enquadramento regulatório: consultoria ≠ gestão, consultoria ≠ dica. */
  const naoEPara = [
    "Você procura dica de ação, promessa de retorno ou o “investimento que mais rende”.",
    "Você quer alguém para operar a sua conta. Não fazemos gestão de recursos de terceiros.",
    "Você busca valores esquecidos ou dinheiro a receber de terceiros — não é o serviço que prestamos.",
  ];
  return (
    <section id="para-quem" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14 md:mb-20">
          <div className="col-span-full md:col-span-9">
            <SectionTag label="Para quem é o Raio-X" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
              Quatro situações. Se você se reconhece em uma delas, o Raio-X é para você.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          {profiles.map((p) => (
            <article key={p.tag} className="col-span-full md:col-span-6 border-t border-[#EDEFF2] pt-8">
              <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase" style={{ color: "#4a6b8c" }}>
                {p.tag}
              </p>
              <p className="text-[1.0625rem] leading-[1.65] max-w-[48ch]" style={{ color: "#6B7B8D", marginTop: "1.5rem" }}>
                {p.body}
              </p>
            </article>
          ))}
        </div>

        {/* Contra-filtro: dizer para quem NÃO é qualifica mais do que qualquer
            promessa — e corta o tráfego que não tem como virar cliente. */}
        <div className="mt-16 md:mt-20 rounded-2xl border border-[#E1E6EC] bg-white p-8 md:p-10">
          <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase" style={{ color: "#4a6b8c" }}>
            E não é para você se
          </p>
          <ul className="mt-6 space-y-4 max-w-[62ch]">
            {naoEPara.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[1rem] leading-[1.6]" style={{ color: "#6B7B8D" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="mt-1 shrink-0">
                  <path d="M5 5l8 8M13 5l-8 8" stroke="#9BA8B5" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
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
              Raio-X da carteira
            </p>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white mb-6">
              A próxima decisão do seu patrimônio pode ser a primeira com método.
            </h2>
            <p className="text-[1.0625rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.80)" }}>
              Confidencial e sem compromisso. Sem senha, sem extrato e sem oferta de produto.
            </p>
            <p className="text-[0.9375rem] leading-relaxed max-w-[44ch]" style={{ color: "rgba(255,255,255,0.60)", marginTop: "1rem" }}>
              Duas etapas rápidas, a equipe prepara a análise do seu caso e retorna pelo
              WhatsApp para agendar a conversa — on-line ou presencial em Brasília.
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
