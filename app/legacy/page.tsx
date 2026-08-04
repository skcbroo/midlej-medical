import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SmoothAnchor } from "../_hub/SmoothAnchor";
import { StickyCTA } from "../components/StickyCTA";
import { LegacyForm } from "./LegacyForm";
import { ReguaTempo } from "./ReguaTempo";

/* ================================================================
   /legacy — MIDLEJ LEGACY
   Patrimônio destinado a filhos. Porta de entrada da consultoria.

   NORMATIVO: docs/legacy-plataforma-mensagem.md (revisão 2) no repo
   do CMO. A copy desta página não é preferência de redação: os
   blocos, a ordem, as três definições, o spec da régua de tempo, o
   texto da porta estreita e as seis perguntas vêm de lá.

   DECISÕES DO LUCAS (04/08/2026) que PREVALECEM sobre o normativo:
     1. SLA de 5 MINUTOS publicado. Acima da dobra e no fechamento.
        É o ativo comercial mais forte que a operação tem hoje, e não
        estava em lugar nenhum do site. Não amaciar para "em breve".
     2. O entregável é um PLANO DE ACOMPANHAMENTO CONTÍNUO, não um
        resumo escrito. A palavra "resumo" não aparece na página: a
        pessoa não agenda uma conversa, ela começa um plano.
     3. Endereço comercial deve aparecer. Não existe endereço completo
        em lugar nenhum do repo (verificado em 04/08), então publicamos
        "Brasília, DF" e a pendência foi reportada. NÃO INVENTAR.
     4. Quem conduz NÃO é personalizado. Zero nome de pessoa física
        nesta página. A âncora é a razão social + o registro CVM.
     5. Escopo: só consultoria de investimentos.
     6. A carta do fundador (§13 do normativo) NÃO vai ao ar: não foi
        aprovada por escrito. Sem placeholder, sem "em breve".

   TRAVAS QUE NÃO PODEM SER AFROUXADAS SEM VOLTAR AO BRANDING:
     · Zero promessa de retorno, zero cifra futura, zero percentual,
       zero nome de ativo. O número da carteira própria (23,06%) é
       PROIBIDO nesta página até com disclaimer: numa página sobre
       filhos ele é lido como promessa de que o objetivo será atingido.
     · Zero "grátis/gratuito/sem custo/sem compromisso".
     · Zero sucessão, holding, doação, usufruto, seguro, inventário e
       zero "se você não estiver aqui". Fora de escopo (§11-Bloco 8).
     · Zero imagem de criança, de família ou de banco de imagens.
     · Zero número de casos, famílias ou clientes. Experiência pode ser
       afirmada QUALITATIVAMENTE, quantidade não (§11-Bloco 9).
     · Sem travessão na copy publicada (DESIGN.md §9).

   FORMULAÇÃO "QUEM CONDUZ": o normativo (§4-RTB1) condiciona a frase
   "conduzida por consultor registrado na CVM" à confirmação de que
   TODA pessoa que pode conduzir uma sessão tem registro próprio. Essa
   confirmação (item 6 do pedido ao Lucas) NÃO voltou. Então a página
   usa a formulação alternativa, que é igualmente forte e é verdadeira
   sob qualquer resposta: "conduzida pela Midlej Consultoria de Valores
   Mobiliários, registrada na CVM sob o nº 004770-8". Se o Lucas
   confirmar o item 6, a frase pode ser trocada.

   SISTEMA VISUAL: DESIGN.md (ink/paper/bone, Bricolage, botão quadrado,
   oxblood como pontuação), e não o padrão azul/arredondado da /raiox.
   Motivo: sem rosto e sem depoimento, o registro de "banca privada
   discreta" é o que sustenta a confiança da página.
   ================================================================ */

const RAZAO_SOCIAL = "Midlej Consultoria de Valores Mobiliários LTDA";
const CNPJ = "67.608.789/0001-39";
const CVM_REGISTRO = "CVM nº 004770-8";
/* ⚠️ PENDENTE: não existe endereço comercial completo em nenhum ponto do
   repositório (busca exaustiva em 04/08/2026: nenhum logradouro, nenhum
   CEP, nenhum JSON-LD de PostalAddress). Publicado no nível de cidade,
   como o normativo autoriza. Quando o Lucas fornecer o endereço, trocar
   aqui e considerar um JSON-LD LocalBusiness. */
const CIDADE = "Brasília, DF";

/* Fonte única do SLA. Decisão do Lucas 04/08. Aparece 3x na página. */
const SLA = "Retornamos em até 5 minutos.";

/* Paleta DESIGN.md, inline por segurança: não depende de classe Tailwind
   ser gerada no build. */
const INK = "#233853";
const PAPER = "oklch(96.8% 0.010 78)";
const BONE = "oklch(94.5% 0.014 78)";
const INK_SOFT = "oklch(48% 0.040 240)";
const INK_MUTE = "oklch(62% 0.020 240)";
const LINE = "oklch(20% 0.04 240 / 0.14)";
const OXBLOOD = "oklch(46% 0.115 30)";
const ON_INK_STRONG = "oklch(96.8% 0.010 78)";
const ON_INK_SOFT = "oklch(96.8% 0.010 78 / 0.72)";
const ON_INK_MUTE = "oklch(96.8% 0.010 78 / 0.55)";
const LINE_ON_INK = "oklch(96.8% 0.010 78 / 0.18)";

const WRAP = "max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16";
const SECTION_PAD = "py-20 md:py-28";

/* ----------------------------------------------------------------
   As seis perguntas (§8 do normativo, texto pronto). Fonte única:
   alimenta a seção visível e o JSON-LD FAQPage.
   Nenhuma resposta contém "grátis", "gratuito", "sem custo" ou
   "sem compromisso". Isso é intencional e não pode ser suavizado.
   ---------------------------------------------------------------- */
const FAQ_ITEMS = [
  {
    q: "Quanto custa?",
    a: "O Legacy não é um produto à venda. É a etapa em que os dois lados decidem se faz sentido trabalhar juntos, e não emitimos cobrança por ela. O que tem preço é a consultoria, e o valor é apresentado por escrito, com o escopo, antes de qualquer aceite. Você não assina nada na conversa.",
  },
  {
    q: "O dinheiro fica sob controle de quem?",
    a: "Seu. A Midlej é consultoria, não gestão de recursos de terceiros. A conta, a custódia e as ordens permanecem sempre com você, e em nenhum momento operamos a sua conta. O que estruturamos é a decisão, não a movimentação.",
  },
  {
    q: "Meu filho já tem quinze anos. Ainda faz sentido?",
    a: "Faz, e o que muda é o tipo de decisão. Com horizonte mais curto existem menos ajustes possíveis pela frente, o que torna a definição do destino e do prazo mais determinante, não menos. A conversa é a mesma.",
  },
  {
    q: "E se eu precisar desse dinheiro antes?",
    a: "O prazo e a liquidez fazem parte da definição, e são tratados antes de qualquer decisão. Vale dizer o que isso significa na prática: a Midlej é consultoria de investimentos, e nada do que definimos aqui cria uma trava jurídica sobre o seu dinheiro. O que passa a existir é um plano com prazo declarado e revisto todo ano, que pode ser reaberto quando a sua vida mudar. Um plano que não pode ser ajustado não é um plano, é uma amarra.",
  },
  {
    q: "Vocês vão me recomendar algum investimento na conversa?",
    a: "Não, e desconfie de quem faz isso antes de conhecer o seu caso. Consultoria de valores mobiliários trata de estratégia, alocação e adequação. Recomendação individualizada existe dentro de um contrato, com o seu perfil formalizado.",
  },
  {
    q: "E a parte jurídica: doação, holding, inventário?",
    a: "Não é o nosso escopo, e preferimos dizer isso antes. A Midlej é consultoria de investimentos: definimos destino, valor mensal, prazo e revisão. Instrumentos jurídicos são tratados pelo advogado da sua família, e o plano que estruturamos funciona com ou sem eles.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Midlej Legacy · o plano do patrimônio que você separa para o seu filho",
  },
  description:
    "Você separa dinheiro para o seu filho. Falta dizer para quê, quanto e quando. O Midlej Legacy define destino, valor mensal e revisão anual. Retornamos em até 5 minutos.",
  alternates: { canonical: "/legacy" },
  openGraph: {
    title: "Midlej Legacy",
    description:
      "Você separa dinheiro para o seu filho. Falta dizer para quê, quanto e quando. Destino declarado, valor mensal definido e revisão todo ano.",
    type: "website",
    locale: "pt_BR",
    url: "https://midlejcapital.com.br/legacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midlej Legacy",
    description:
      "Você separa dinheiro para o seu filho. Falta dizer para quê, quanto e quando.",
  },
  robots: { index: true, follow: true },
};

export default function LegacyPage() {
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
      style={{
        fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif",
        backgroundColor: PAPER,
        color: INK,
      }}
      className="min-h-screen overflow-x-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <SmoothAnchor />
      <Header />

      <Hero />
      <Tensao />
      <Tempo />
      <Definicoes />
      <ComoFunciona />
      <ParaQuem />
      <Perguntas />
      <Fechamento />

      <StickyCTA label="Definir o plano" href="#contato" />
    </main>
  );
}

/* ================================================================
   Átomos
   ================================================================ */

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ⚠️ ARMADILHA DO globals.css, vale para a página inteira:
   `p { margin: 0 }` e `h1,h2,h3,h4 { margin: 0 }` estão declarados FORA
   de @layer, então vencem as utilities do Tailwind. Em <p> e em títulos,
   `mt-*` / `mb-*` são SILENCIOSAMENTE ignorados: o texto encosta e o
   layout parece "quase certo" na revisão de código, mas quebra na tela.
   Espaçamento vertical desses elementos vai por `style` inline (vence
   tudo) ou por `gap` do flex/grid do pai. Nunca por className. */
function SectionTag({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <p
      className="text-[0.7rem] font-medium uppercase tracking-[0.14em]"
      style={{ color: dark ? ON_INK_MUTE : OXBLOOD, marginBottom: "1rem" }}
    >
      {label}
    </p>
  );
}

/* Header fixo, sem estado e sem JS: a rota inteira abre em ink, então
   não há necessidade do header tone-aware do hub. Sem menu: LP de
   tráfego pago não oferece rota de fuga. */
function Header() {
  return (
    <header
      className="fixed top-0 inset-x-0 z-40"
      style={{ backgroundColor: INK, borderBottom: `1px solid ${LINE_ON_INK}` }}
    >
      <div className={`${WRAP} h-16 flex items-center justify-between gap-6`}>
        <Link href="#top" aria-label="Midlej Capital" className="inline-flex items-center shrink-0">
          <Image
            src="/midlej_capital.png"
            alt="Midlej Capital"
            width={320}
            height={130}
            className="h-7 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
            priority
          />
        </Link>
        <Link
          href="#contato"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.85rem] font-semibold transition-opacity duration-200 hover:opacity-90"
          style={{ backgroundColor: PAPER, color: INK }}
        >
          Definir o plano
        </Link>
      </div>
    </header>
  );
}

/* ================================================================
   01 — HERO (ink) + 02 — REGISTRO, ambos acima da dobra.

   MESSAGE MATCH: a página recebe quem buscou "onde investir para meus
   filhos", "quero guardar dinheiro para meus filhos". A primeira linha
   do H1 RECONHECE essa busca com as palavras da pessoa ("você separa
   dinheiro para o seu filho") e só a segunda linha reenquadra para
   estrutura ("falta dizer para quê, quanto e quando"). É deliberado:
   a razão nº 1 de a /raiox nunca ter gerado lead qualificado é anúncio
   prometendo uma coisa e página entregando outra.

   ⚠️ A frase de busca literal NÃO pode virar headline: "onde investir
   para o seu filho" está na lista de proibidas (§11-Bloco 1), porque
   sugere recomendação de ativo. Reconhecer a busca sem repeti-la é o
   caminho estreito entre message match e compliance.
   ================================================================ */

function Hero() {
  return (
    <section id="top" style={{ backgroundColor: INK }} data-tone="dark">
      {/* ⚠️ ORÇAMENTO VERTICAL DO MOBILE. Medido em viewport CSS real de
          375x812 (iframe, não resize_window, que não muda o viewport CSS).
          A meta é que a PRIMEIRA OPÇÃO do formulário caia acima da dobra e
          acima da barra fixa: metade do tráfego nunca passa de 35% de
          scroll, então tudo que empurra o formulário para baixo custa lead.
          Qualquer linha acrescentada ao hero tem que ser paga com a remoção
          de outra. Remedir antes de publicar mudança aqui. */}
      <div className={`${WRAP} pt-20 pb-14 md:pt-40 md:pb-20`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Esquerda: promessa */}
          <div className="col-span-full md:col-span-6">
            {/* Eyebrow curto de propósito: a versão longa quebrava em duas
                linhas no mobile e cada linha aqui empurra o formulário. */}
            <p
              className="text-[0.66rem] md:text-[0.7rem] font-medium uppercase tracking-[0.14em]"
              style={{ color: ON_INK_MUTE, marginBottom: "1rem" }}
            >
              Midlej Legacy · {CVM_REGISTRO}
            </p>

            <h1
              className="text-[clamp(1.75rem,4.6vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.028em] max-w-[19ch]"
              style={{ color: ON_INK_STRONG }}
            >
              Você separa dinheiro para o seu filho. Falta dizer para quê, quanto e quando.
            </h1>

            <p
              className="text-[1.0625rem] md:text-[1.15rem] leading-[1.5] max-w-[46ch]"
              style={{ color: ON_INK_SOFT, marginTop: "1rem" }}
            >
              O Midlej Legacy transforma essa intenção em um plano de acompanhamento
              contínuo: destino declarado, valor mensal definido e revisão todo ano.
            </p>

            {/* SLA acima da dobra, colado ao formulário. Decisão do Lucas 04/08.
                É o ativo comercial mais forte que a operação tem e não estava
                em lugar nenhum do site. Não amaciar para "em breve". */}
            <div
              className="mt-4 inline-flex items-baseline gap-3 px-4 py-2"
              style={{ border: `1px solid ${LINE_ON_INK}` }}
            >
              <span className="text-[1rem] font-semibold" style={{ color: ON_INK_STRONG }}>
                {SLA}
              </span>
              <span className="text-[0.8rem]" style={{ color: ON_INK_MUTE }}>
                pelo WhatsApp
              </span>
            </div>
          </div>

          {/* Direita: o formulário É o CTA. Metade do tráfego nunca passa de
              35% de scroll, então a decisão precisa ser possível aqui. */}
          <div className="col-span-full md:col-span-5 md:col-start-8">
            <LegacyForm instanceId="hero" />
          </div>
        </div>

        {/* ── 02 REGISTRO ── acima da dobra, e é a prova principal da página.
            Sem rosto e sem depoimento, o número de registro é tratado como
            elemento gráfico, nunca como rodapé. */}
        <div
          className="mt-12 md:mt-16 pt-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start"
          style={{ borderTop: `1px solid ${LINE_ON_INK}` }}
        >
          <div className="col-span-full md:col-span-4">
            <p
              className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-[1.02] tracking-[-0.022em] tabular-nums"
              style={{ color: ON_INK_STRONG }}
            >
              {CVM_REGISTRO}
            </p>
            <p className="text-[0.8rem]" style={{ color: ON_INK_MUTE, marginTop: "0.5rem" }}>
              {CIDADE}
            </p>
          </div>
          <div className="col-span-full md:col-span-7 md:col-start-6">
            <p className="text-[0.95rem] leading-[1.6]" style={{ color: ON_INK_SOFT }}>
              {RAZAO_SOCIAL}, CNPJ {CNPJ}. Consultoria de valores mobiliários
              registrada, consultável na base pública da CVM antes de você entregar
              o seu contato. A conversa é conduzida pela consultoria, e o plano é
              estruturado sem que você precise trocar de banco ou de corretora.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   03 — A TENSÃO (paper)
   Texto corrido, sem lista, sem card, sem ícone. Ordem obrigatória:
   camada 1 (reconhecimento: ele tem fluxo, não estrutura) → camada 2
   (desconforto nomeado: o que é "do filho" nunca foi separado).
   Invertida, a página vira cobrança moral e o leitor de alta renda sai.
   A emoção está no fato, nunca no adjetivo.
   ================================================================ */

function Tensao() {
  return (
    <section style={{ backgroundColor: PAPER }} data-tone="light">
      <div className={`${WRAP} ${SECTION_PAD}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-full md:col-span-8">
            <SectionTag label="A conversa que ninguém teve com você" />
            <div className="max-w-[58ch]">
              <p
                className="text-[clamp(1.25rem,2.2vw,1.6rem)] font-light leading-[1.35] tracking-[-0.012em]"
                style={{ color: INK }}
              >
                Tudo o que o seu filho tem hoje depende de você continuar exatamente
                onde está. A escola, a rotina, o conforto: nada disso é patrimônio,
                é consumo financiado pela sua renda.
              </p>
              <p
                className="text-[1.0625rem] leading-[1.65]"
                style={{ color: INK_SOFT, marginTop: "1.75rem" }}
              >
                Você já pretende deixar alguma coisa para ele, e provavelmente já
                existe um valor guardado. Só que ele está na mesma conta que o resto,
                sem destino, sem prazo e sem ninguém revisando. Não é falta de
                dinheiro. É falta de decisão, e ninguém nunca sentou com você para
                tomá-la.
              </p>
            </div>

            <div className="mt-10 pt-8 max-w-[52ch]" style={{ borderTop: `1px solid ${LINE}` }}>
              <p
                className="text-[clamp(1.375rem,2.6vw,2rem)] font-light leading-[1.18] tracking-[-0.012em]"
                style={{ color: INK }}
              >
                <span style={{ color: OXBLOOD }}>*</span> Seu filho não herda o que
                você ganha. Herda o que você estruturou.
              </p>
              <p className="text-[0.95rem] leading-[1.6]" style={{ color: INK_MUTE, marginTop: "1.5rem" }}>
                Um CFO cuida das decisões financeiras que uma família toma. O Legacy
                é a única delas que tem data de entrega.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   04 — O EFEITO DO TEMPO (ink)
   Bloco de maior risco regulatório da página. Ver ReguaTempo.tsx:
   spec fechado. Mede DECISÕES, nunca dinheiro. O texto abaixo é o do
   normativo §6 e não admite variação.
   ================================================================ */

function Tempo() {
  return (
    <section style={{ backgroundColor: INK }} data-tone="dark">
      <div className={`${WRAP} ${SECTION_PAD}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="col-span-full md:col-span-5">
            <SectionTag label="O efeito do tempo" dark />
            <h2
              className="text-[clamp(1.625rem,3vw,2.375rem)] font-semibold leading-[1.08] tracking-[-0.024em] max-w-[20ch]"
              style={{ color: ON_INK_STRONG }}
            >
              Começando aos 2 anos, existem dezesseis revisões anuais pela frente.
              Começando aos 15, existem três.
            </h2>
            <p
              className="text-[1.0625rem] leading-[1.6] max-w-[44ch]"
              style={{ color: ON_INK_SOFT, marginTop: "1.75rem" }}
            >
              Tempo não é rentabilidade. Tempo é margem para errar, corrigir e mudar
              de ideia sem que a decisão inteira precise dar certo de primeira.
            </p>
          </div>
          <div className="col-span-full md:col-span-6 md:col-start-7">
            <ReguaTempo />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   05 — AS TRÊS DEFINIÇÕES (paper)
   Nomes canônicos, sempre nesta ordem: o destino, o aporte, a revisão.
   A terceira JÁ NÃO É "a continuidade": sob o escopo de só consultoria
   de investimentos, aquela definição exigiria doação, holding ou seguro,
   que não são nossos. Não reintroduzir por insinuação.

   Lista dividida por hairline, e não três cards iguais (DESIGN.md §8).
   ================================================================ */

function Definicoes() {
  const itens = [
    {
      n: "I",
      t: "O destino",
      d: "Para que esse patrimônio existe e quando ele é entregue. Formação, primeiro capital, autonomia aos 18, aos 21, aos 25. Um patrimônio sem data de entrega não é um plano, é uma sobra.",
    },
    {
      n: "II",
      t: "O aporte",
      d: "Quanto da sua renda atual pode ser separado todos os meses sem comprometer o presente da sua família. Isto é fluxo de caixa, é a leitura mais elementar de um CFO, e é a pergunta que ninguém faz antes de vender um produto.",
    },
    {
      n: "III",
      t: "A revisão",
      d: "Quando o plano é revisto e o que dispara um ajuste: mudança de renda, mudança de objetivo, um filho a mais, ou a aproximação da data de entrega. Um plano de dezesseis anos que nunca é reaberto vira um plano de um ano repetido dezesseis vezes.",
    },
  ];

  return (
    <section style={{ backgroundColor: PAPER }} data-tone="light">
      <div className={`${WRAP} ${SECTION_PAD}`}>
        <SectionTag label="O que fica definido" />
        <h2
          className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.026em] max-w-[24ch]"
          style={{ color: INK }}
        >
          Você não sai com uma conversa. Sai com um plano de acompanhamento
          contínuo, definido em três pontos.
        </h2>

        <ul className="mt-12 md:mt-16">
          {itens.map((i) => (
            <li
              key={i.n}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10"
              style={{ borderTop: `1px solid ${LINE}` }}
            >
              <div className="col-span-full md:col-span-3">
                <span
                  className="text-[0.95rem] font-medium tracking-[0.14em]"
                  style={{ color: OXBLOOD }}
                >
                  {i.n}
                </span>
                <h3
                  className="text-[clamp(1.375rem,2.4vw,1.875rem)] font-light leading-[1.1] tracking-[-0.022em]"
                  style={{ color: INK, marginTop: "0.5rem" }}
                >
                  {i.t}
                </h3>
              </div>
              <p
                className="col-span-full md:col-span-8 md:col-start-5 text-[1.0625rem] leading-[1.65] max-w-[56ch]"
                style={{ color: INK_SOFT }}
              >
                {i.d}
              </p>
            </li>
          ))}
        </ul>

        {/* CTA do meio da página. Família única de CTA (§9). */}
        <div className="mt-12" style={{ borderTop: `1px solid ${LINE}`, paddingTop: "2.5rem" }}>
          <Link
            href="#contato"
            className="inline-flex items-center gap-3 px-7 py-4 text-[0.95rem] font-semibold transition-opacity duration-200 hover:opacity-90"
            style={{ backgroundColor: INK, color: PAPER }}
          >
            Quero definir o plano do meu filho <Arrow />
          </Link>
          <p className="text-[0.85rem]" style={{ color: INK_MUTE, marginTop: "1rem" }}>
            {SLA}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   06 — COMO FUNCIONA (ink)
   Remove o medo de entrar num processo de vendas. Sem rosto e sem
   depoimento, a PRECISÃO é a prova: quanto mais específico o processo
   descrito, mais real a empresa parece. Vaguidão aqui custa caro.
   Experiência afirmada QUALITATIVAMENTE, nunca com número.
   ================================================================ */

function ComoFunciona() {
  const passos = [
    {
      n: "01",
      t: "Você envia o contexto",
      d: "Três passos, cerca de um minuto: a idade do seu filho, a ordem de grandeza do que consegue separar por mês e um contato. Não pedimos senha, extrato nem acesso à sua conta.",
    },
    {
      n: "02",
      t: "Retornamos em até 5 minutos",
      d: "Pelo WhatsApp, com duas opções de horário. A conversa leva cerca de 45 minutos, on-line ou presencial em Brasília, e é conduzida pela Midlej Consultoria de Valores Mobiliários, registrada na CVM sob o nº 004770-8.",
    },
    {
      n: "03",
      t: "O plano passa a existir",
      d: "Você sai com o destino, o valor mensal e a data da próxima revisão definidos. Se fizer sentido para os dois lados, a consultoria continua daí, e a proposta vem por escrito, com escopo e valor conhecidos antes de qualquer aceite.",
    },
  ];

  return (
    <section style={{ backgroundColor: INK }} data-tone="dark">
      <div className={`${WRAP} ${SECTION_PAD}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-full md:col-span-7">
            <SectionTag label="Como funciona" dark />
            <h2
              className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.026em] max-w-[22ch]"
              style={{ color: ON_INK_STRONG }}
            >
              Você sabe exatamente o que vai acontecer, e nada obriga você a nada.
            </h2>
            <p
              className="text-[1.0625rem] leading-[1.6] max-w-[52ch]"
              style={{ color: ON_INK_SOFT, marginTop: "1.5rem" }}
            >
              Estruturar patrimônio destinado a filhos já faz parte do que a
              consultoria entrega. O que o Legacy muda é que essa decisão passa a ter
              destino, prazo e uma data de revisão no calendário.
            </p>
          </div>
        </div>

        <ol className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-8">
          {passos.map((p) => (
            <li
              key={p.n}
              className="col-span-full md:col-span-4 pt-6"
              style={{ borderTop: `1px solid ${LINE_ON_INK}` }}
            >
              <span
                className="text-[0.8rem] font-medium tracking-[0.14em] tabular-nums"
                style={{ color: ON_INK_MUTE }}
              >
                {p.n}
              </span>
              <h3
                className="text-[1.375rem] font-light leading-[1.15] tracking-[-0.02em]"
                style={{ color: ON_INK_STRONG, marginTop: "0.75rem" }}
              >
                {p.t}
              </h3>
              <p className="text-[0.95rem] leading-[1.6]" style={{ color: ON_INK_SOFT, marginTop: "0.75rem" }}>
                {p.d}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================
   07 — PARA QUEM É (bone) — A PORTA ESTREITA
   Não é detalhe de conversão: é a condição de viabilidade da página.
   "Investimento para filhos" é a categoria financeira mais buscada por
   quem tem menos dinheiro. Sem trava, esta LP produz formulário de
   perfil C em volume maior do que qualquer outra nossa.

   O corte é por CAPACIDADE, e capacidade não se filtra com humilhação:
   por isso não existe aqui o contra-filtro agressivo da /raiox. A frase
   "sobre a renda que existe hoje, não sobre um valor que ainda vai
   aparecer" faz o corte de forma autoexcludente e elegante.
   ================================================================ */

function ParaQuem() {
  return (
    <section style={{ backgroundColor: BONE }} data-tone="light">
      <div className={`${WRAP} ${SECTION_PAD}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <div className="col-span-full md:col-span-6">
            <SectionTag label="Para quem é" />
            <h2
              className="text-[clamp(1.625rem,3vw,2.375rem)] font-semibold leading-[1.06] tracking-[-0.024em] max-w-[20ch]"
              style={{ color: INK }}
            >
              Para quem o Legacy foi desenhado
            </h2>
            <p
              className="text-[1.0625rem] leading-[1.65] max-w-[50ch]"
              style={{ color: INK_SOFT, marginTop: "1.5rem" }}
            >
              Para famílias com renda organizada, que já conseguem separar um valor
              mensal relevante e querem que ele tenha destino, prazo e acompanhamento.
              O plano é estruturado sobre a renda que existe hoje, não sobre um valor
              que ainda vai aparecer.
            </p>
          </div>

          <div className="col-span-full md:col-span-5 md:col-start-8">
            <div className="pt-6" style={{ borderTop: `1px solid ${LINE}` }}>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em]" style={{ color: OXBLOOD }}>
                Antes de você preencher
              </p>
              <p className="text-[1rem] leading-[1.65]" style={{ color: INK_SOFT, marginTop: "1.25rem" }}>
                O Legacy é a porta de entrada da consultoria da Midlej. A conversa não
                tem proposta comercial. Se fizer sentido para os dois lados, a
                consultoria é contratada depois, por escrito, com escopo e valor
                conhecidos antes de qualquer aceite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   08 — PERGUNTAS (paper). Seis, e seis é o teto.
   A sexta existe porque quem chega falando de filhos pergunta sobre a
   parte jurídica. Responder na página custa uma linha. Descobrir na
   reunião custa a reunião, que foi exatamente como a /raiox produziu
   lead com expectativa errada.
   ================================================================ */

function Perguntas() {
  return (
    <section style={{ backgroundColor: PAPER }} data-tone="light">
      <div className={`${WRAP} ${SECTION_PAD}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14">
          <div className="col-span-full md:col-span-4">
            <SectionTag label="Perguntas" />
            <h2
              className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.06] tracking-[-0.024em] max-w-[16ch]"
              style={{ color: INK }}
            >
              O que costuma ser perguntado antes de preencher.
            </h2>
          </div>
          <div className="col-span-full md:col-span-8 md:col-start-5">
            <ul>
              {FAQ_ITEMS.map((f, i) => (
                <li key={i} style={{ borderTop: `1px solid ${LINE}` }}>
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-baseline justify-between gap-6 py-6">
                      <span
                        className="text-[clamp(1.0625rem,1.5vw,1.25rem)] font-medium leading-[1.3]"
                        style={{ color: INK }}
                      >
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className="text-[1rem] transition-transform duration-200 group-open:rotate-45 shrink-0"
                        style={{ color: OXBLOOD }}
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-7 text-[1rem] leading-[1.65] max-w-[60ch]" style={{ color: INK_SOFT }}>
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
   09 — FECHAMENTO + FORMULÁRIO (ink) + BARRA LEGAL
   Repete a promessa em uma linha, repete o SLA e pede o contato.
   O CTA é o FORMULÁRIO, não o WhatsApp: WhatsApp como CTA principal é
   o que produziu sete "conversões" que nunca foram lead.
   ================================================================ */

function Fechamento() {
  const year = new Date().getFullYear();

  return (
    <section id="contato" style={{ backgroundColor: INK }} data-tone="dark" className="pt-20 md:pt-28 pb-10">
      <div className={WRAP}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start pb-16 md:pb-20">
          <div className="col-span-full md:col-span-5">
            <SectionTag label="Midlej Legacy" dark />
            <h2
              className="text-[clamp(1.875rem,3.6vw,3rem)] font-semibold leading-[1.04] tracking-[-0.028em] max-w-[18ch]"
              style={{ color: ON_INK_STRONG }}
            >
              O que você separa para o seu filho pode ter destino, valor e data.
            </h2>
            <p
              className="text-[1.0625rem] leading-[1.6] max-w-[44ch]"
              style={{ color: ON_INK_SOFT, marginTop: "1.5rem" }}
            >
              Você pode adiar a decisão. A idade dele não adia.
            </p>

            <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${LINE_ON_INK}` }}>
              <p className="text-[1.125rem] font-semibold" style={{ color: ON_INK_STRONG }}>
                {SLA}
              </p>
              <p className="text-[0.9rem] leading-[1.6] max-w-[44ch]" style={{ color: ON_INK_MUTE, marginTop: "0.75rem" }}>
                Três passos, cerca de um minuto. Não pedimos senha, extrato nem acesso
                à sua conta. A conversa é conduzida pela {RAZAO_SOCIAL}, registrada na
                CVM sob o nº 004770-8.
              </p>
            </div>
          </div>

          <div className="col-span-full md:col-span-6 md:col-start-7">
            <LegacyForm instanceId="closing" />
          </div>
        </div>

        {/* ── Barra legal ── */}
        <div
          className="pt-8 flex flex-col gap-4 text-[0.75rem]"
          style={{ borderTop: `1px solid ${LINE_ON_INK}`, color: ON_INK_MUTE }}
        >
          <p className="max-w-[92ch] leading-[1.65]">
            {RAZAO_SOCIAL} é consultoria de valores mobiliários registrada na CVM sob
            o nº 004770-8 e atua na modalidade fee based. Não realiza gestão de
            recursos de terceiros nem garante rentabilidade. Investimentos envolvem
            riscos e podem resultar em perdas. Esta página tem caráter informativo e
            não constitui oferta, promessa de resultado, recomendação individualizada
            ou solicitação de compra ou venda de ativos. Instrumentos jurídicos de
            planejamento familiar não integram o escopo da consultoria.
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <span>
              {RAZAO_SOCIAL} · CNPJ {CNPJ} · {CVM_REGISTRO} · {CIDADE} ·{" "}
              contato@midlejcapital.com.br
            </span>
            <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
