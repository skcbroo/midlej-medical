import type { Metadata } from "next";
import Image from "next/image";
import { StickyCTA } from "../components/StickyCTA";
import { RAIOX_B_WHATSAPP_HREF } from "@/lib/leadConstants";

/* ================================================================
   /raiox-b — VARIANTE B do teste A/B (criada 27/07/2026)

   Hipótese em teste: a /raiox (variante A) converte pouco
   (0,75% clique→lead) porque pede muito antes de dar qualquer
   coisa — formulário de 4 passos, 9 seções de argumento.
   A variante B remove TODA a fricção: uma única ação possível
   (WhatsApp), leitura de ~30 segundos, sem formulário.

   Regras desta página (não violar sem refazer o teste):
   1. SOMENTE WhatsApp. Nenhum formulário, nenhum outro destino.
   2. Curta. Se uma seção não empurra para o WhatsApp, ela sai.
   3. Mesma oferta e mesma prova da variante A — o que muda é a
      FORMA, não a promessa. Se mudar a oferta, o teste não mede
      mais o formato.
   4. noindex: não compete com /raiox na busca orgânica.

   ⚠️ COMPLIANCE CVM — a regra do bloco de prova (Prova()):
   A urgência desta página vem de UMA fonte só: o leitor não sabe
   quanto o próprio dinheiro rendeu. Nunca de projeção de ganho.

   PODE: mostrar rentabilidade PASSADA da carteira própria, rotulada
   com a janela exata, ao lado do CDI do mesmo período; dizer que o
   capital dos sócios está na mesma estratégia (skin in the game);
   perguntar ao leitor quanto o dinheiro dele rendeu.

   NÃO PODE, em nenhuma reescrita: projetar o passado para frente;
   dizer ou insinuar que quem não contratar "vai perder dinheiro";
   simular quanto o leitor teria ganho; usar o CDI como meta ou
   compromisso; indicar ativo; **sugerir que o dinheiro do leitor
   vai para esta carteira** (correção do Lucas, 27/07 — a alocação
   é construída caso a caso e pode nem incluir esta estratégia).
   O disclaimer é obrigatório e anda junto do número — não remover
   nem encolher.
   ================================================================ */

const WPP = RAIOX_B_WHATSAPP_HREF;

/* ⚠️ ARMADILHA DO PROJETO — leia antes de mexer no espaçamento:
   `app/globals.css` (linhas ~428-436) declara, FORA de qualquer @layer:
       h1, h2, h3, h4 { margin: 0; ... }
       p { margin: 0; text-wrap: pretty; }
   No Tailwind v4 as utilities ficam em `@layer utilities`, e CSS sem camada
   vence qualquer camada — independentemente da especificidade. Resultado:
   `mt-*`, `mb-*`, `my-*` e `mx-auto` são SILENCIOSAMENTE IGNORADOS em todo
   <p> e <h1>–<h4> do site. A classe aparece no elemento e o computed é 0px.

   Por isso o espaçamento vertical desta página usa `style={{ marginTop }}`
   (inline vence tudo) em vez de classes. Não "limpe" trocando por mt-*:
   o espaçamento some sem nenhum aviso.

   A correção de verdade é mover aquelas regras para `@layer base` no
   globals.css — mas isso muda o layout de TODAS as LPs de uma vez, inclusive
   a /raiox, que é a variante A deste teste A/B. Fazer isso agora invalidaria
   a comparação. Reportado ao Lucas para decidir depois do teste. */
const MT = (rem: number) => ({ marginTop: `${rem}rem` });

const RAZAO_SOCIAL = "Midlej Consultoria de Valores Mobiliários LTDA";
const CNPJ = "67.608.789/0001-39";
const CVM_REGISTRO = "CVM nº 004770-8";

/* Time — mesmas fotos da variante A, sem as bios (prova de que
   existe gente com nome e rosto por trás, em uma faixa só). */
const TEAM = [
  { name: "Lucas Midlej", role: "Sócio-fundador", photo: "/lucas.jpeg" },
  { name: "Breno Barreto", role: "Sócio", photo: "/breno.jpeg" },
  { name: "Allan Guilherme", role: "Consultor CVM nº 4189-0", photo: "/allan2.jpeg" },
  { name: "Henrique Sgarioni", role: "Gestor Comercial", photo: "/henrique.jpeg" },
  { name: "Guilherme José", role: "Diretor de Tecnologia", photo: "/Guilherme.jpeg" },
];

export const metadata: Metadata = {
  title: { absolute: "Onde investir seu dinheiro? | Midlej Capital" },
  description:
    "Fale com um consultor de investimentos independente pelo WhatsApp e descubra onde seu dinheiro deveria estar. Sem compromisso.",
  alternates: { canonical: "/raiox" },
  // Variante de teste não é indexada — a canonical consolida em /raiox.
  robots: { index: false, follow: false },
};

export default function RaioXBPage() {
  return (
    <main
      data-brand
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen bg-white text-[#2E4659] overflow-x-hidden"
    >
      <Header />
      <Hero />
      <TresPassos />
      <Prova />
      <Time />
      <Fechamento />
      <Rodape />

      <StickyCTA label="Falar no WhatsApp" href={WPP} external variant="whatsapp" />
    </main>
  );
}

/* ================================================================
   Átomos
   ================================================================ */

function WppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.559 4.14 1.532 5.875L0 24l6.27-1.504A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.014-1.382l-.36-.213-3.72.892.924-3.617-.234-.37A9.804 9.804 0 012.182 12c0-5.413 4.405-9.818 9.818-9.818S21.818 6.587 21.818 12 17.413 21.818 12 21.818z" />
    </svg>
  );
}

/** O único CTA da página. Sempre wa.me (GTM mede o clique → Lead WhatsApp). */
function BotaoWpp({
  children,
  tone = "verde",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "verde" | "branco";
  className?: string;
}) {
  const styles =
    tone === "verde"
      ? { backgroundColor: "#25D366", color: "#0B3D24" }
      : { backgroundColor: "#FFFFFF", color: "#2E4659" };
  return (
    <a
      href={WPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg text-[1rem] font-bold shadow-lg transition-transform duration-200 hover:scale-[1.03] active:scale-100 ${className}`}
      style={styles}
    >
      <WppIcon size={22} />
      {children}
    </a>
  );
}

/* ================================================================
   Header — logo + CTA. Sem menu: não existe rota de fuga.
   ================================================================ */

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white border-b border-[#EDEFF2]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">
        <span className="inline-flex items-center gap-3">
          <Image
            src="/icon_midlej.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            aria-hidden
          />
          <span
            style={{
              color: "#2E4659",
              fontFamily: "var(--font-manrope)",
              fontSize: "1.125rem",
              fontWeight: 700,
            }}
          >
            Midlej Capital
          </span>
        </span>
        <a
          href={WPP}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-transform duration-200 hover:scale-[1.03]"
          style={{ backgroundColor: "#25D366", color: "#0B3D24" }}
        >
          <WppIcon size={18} />
          Falar no WhatsApp
        </a>
      </div>
    </header>
  );
}

/* ================================================================
   01 — Hero. Promessa + CTA acima da dobra. Nada mais.
   ================================================================ */

function Hero() {
  return (
    <section
      className="relative"
      style={{
        background: "linear-gradient(160deg, #16242F 0%, #223849 45%, #2E4659 100%)",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-36 md:pb-20">
        <span className="inline-block text-[0.7rem] font-semibold tracking-widest uppercase mb-5 text-white/70">
          Consultoria de investimentos · Brasília
        </span>

        {/* ⚠️ COPY DO HERO — variante "ano eleitoral" (pedido do Lucas, 27/07).
            A formulação é DELIBERADAMENTE sobre EXPOSIÇÃO A RISCO, não sobre
            "aproveitar a oportunidade do ano eleitoral". Afirmar que existe uma
            oportunidade a capturar seria recomendação genérica de investimento
            baseada em cenário macro — exatamente o que uma consultoria CVM não
            pode fazer de forma massificada — além de contradizer o resto da
            página ("não somos a dica da vez"). Falar de risco/exposição é
            território legítimo de consultoria e gera a mesma urgência.
            Ver bloco de compliance no topo do arquivo. */}
        <h1 className="text-[clamp(2.25rem,5.2vw,3.75rem)] font-bold leading-[1.04] tracking-tight text-white max-w-[18ch]">
          Ano eleitoral. Você sabe onde a sua carteira está exposta?
        </h1>

        {/* FOMO do hero = o relógio. O dinheiro dele JÁ está posicionado agora,
            bem ou mal — não existe posição neutra. Fato, não promessa. */}
        <p
          style={MT(2)}
          className="text-[1.125rem] leading-[1.6] max-w-[46ch] text-white/85"
        >
          Seu dinheiro já está posicionado neste exato momento — decidiu você ou
          não. <strong className="text-white">A dúvida é se ele está onde
          deveria estar.</strong> Mande uma mensagem e um consultor mostra a que
          você está exposto hoje.
        </p>

        <div className="mt-9">
          <BotaoWpp>Falar com um consultor agora</BotaoWpp>
          <p style={MT(1.25)} className="text-[0.85rem] text-white/55 max-w-[42ch]">
            Resposta em horário comercial. Não pedimos senha, extrato bancário
            nem acesso à sua conta.
          </p>
        </div>

        {/* Prova institucional em uma linha */}
        <dl className="mt-12 pt-8 border-t border-white/15 flex flex-wrap gap-x-14 gap-y-6">
          {[
            { v: "R$ 120M+", k: "em patrimônio acompanhado" },
            { v: "85+", k: "famílias atendidas" },
          ].map((s) => (
            <div key={s.k}>
              <dt className="text-[clamp(1.875rem,3.4vw,2.5rem)] font-light leading-none tabular-nums text-white">
                {s.v}
              </dt>
              <dd className="mt-2 text-[0.85rem] text-white/60">{s.k}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ================================================================
   02 — O que acontece depois que você clica.
   Existe para matar a objeção "e aí, vão me vender alguma coisa?".
   ================================================================ */

function TresPassos() {
  const passos = [
    {
      n: "01",
      t: "Dois minutos hoje",
      b: "Você conta em duas linhas quanto tem para investir e o que quer resolver. Só isso.",
    },
    {
      n: "02",
      t: "Nós fazemos o Raio-X",
      b: "Onde você paga taxa sem saber, onde está exposto sem perceber e o que está rendendo abaixo do que poderia.",
    },
    {
      n: "03",
      t: "Você sai sabendo",
      b: "Numa conversa direta, com os números do seu caso na mesa. Depois dela, você decide o que fazer com o que viu.",
    },
  ];
  return (
    <section style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-20">
        {/* FOMO deste bloco = assimetria de custo. Dois minutos contra meses
            no lugar errado. O risco de chamar é zero; o de não chamar, não. */}
        <h2
          className="text-[clamp(1.5rem,3vw,2.125rem)] font-bold leading-[1.15] tracking-tight max-w-[26ch]"
          style={{ color: "#2E4659" }}
        >
          Dois minutos agora contra mais um ano no escuro.
        </h2>
        <p
          className="text-[1.0625rem] leading-[1.65] max-w-[52ch]"
          style={{ color: "#6B7B8D", ...MT(1.25) }}
        >
          É o que separa você de saber exatamente onde o seu dinheiro está — e
          quanto ele está deixando na mesa.
        </p>
        <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {passos.map((p) => (
            <li
              key={p.n}
              className="col-span-full md:col-span-1 bg-white rounded-2xl border border-[#EDEFF2] p-6"
            >
              <span
                className="text-[1.75rem] font-light leading-none tabular-nums"
                style={{ color: "#4a6b8c" }}
              >
                {p.n}
              </span>
              <h3
                className="mt-4 text-[1.0625rem] font-bold leading-[1.25]"
                style={{ color: "#2E4659" }}
              >
                {p.t}
              </h3>
              <p
                className="text-[0.9375rem] leading-[1.55]"
                style={{ color: "#6B7B8D", ...MT(0.75) }}
              >
                {p.b}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================
   03 — Prova própria: skin in the game, SEM número.
   ----------------------------------------------------------------
   ⚠️ MUDANÇA 29/07/2026 (decisão do Lucas): a vitrine de rentabilidade
   saiu da /raiox e sai daqui também — não faria sentido tirar o número
   da página principal e republicá-lo na variante de teste.
   Removidos: o comparativo em barras (23,06% da carteira própria vs
   13,82% do CDI no período 31/07/2025–10/07/2026), as cores validadas
   do gráfico e o disclaimer de rentabilidade passada que era obrigatório
   ao lado dele. Número e disclaimer andam juntos: se um voltar, o outro
   volta. Versão com o gráfico: commit 2f6548a (arquivo não versionado
   até aqui — ver também a seção equivalente removida da /raiox).

   O que FICA é o argumento que nunca dependeu do número: a estratégia
   roda com capital dos sócios antes de chegar a qualquer cliente. E a
   pergunta que gera a inquietação continua sendo sobre o dinheiro do
   LEITOR, não sobre o nosso resultado — que é o único gancho que o
   compliance permite aqui. Não reescrever como promessa de retorno.
   ================================================================ */

function Prova() {
  return (
    <section
      style={{
        background: "linear-gradient(155deg, #24394A 0%, #2E4659 55%, #274155 100%)",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4 text-white/50">
          Skin in the game
        </p>
        <h2 className="text-[clamp(1.5rem,3vw,2.125rem)] font-bold leading-[1.12] tracking-tight text-white max-w-[24ch]">
          Testamos com o nosso dinheiro antes de falar do seu.
        </h2>
        <p
          style={MT(1.5)}
          className="text-[1.0625rem] leading-[1.65] max-w-[54ch] text-white/80"
        >
          Toda estratégia da casa passa pelo mesmo critério: nenhuma chega a uma
          conversa com cliente antes de rodar na carteira própria da Midlej, com
          capital dos sócios dentro.{" "}
          <strong className="text-white">
            Nada que a gente indica deixou de ser testado com o nosso próprio
            dinheiro primeiro
          </strong>
          . Quando erra, erra com o nosso junto.
        </p>
        {/* ⚠️ Correção do Lucas (27/07): NÃO dizer nem sugerir que o cliente
            terá esta carteira. A Midlej é consultoria — a alocação é construída
            para o caso de cada um e pode nem incluir esta estratégia. Dizer o
            contrário seria falso, contradiria o "não existe melhor investimento
            universal" que sustenta a oferta, e beiraria indicação de ativo. */}
        <p
          style={MT(1.25)}
          className="text-[1.0625rem] leading-[1.65] max-w-[54ch] text-white/80"
        >
          A sua alocação não vai ser uma cópia da nossa — ela é construída para
          o seu caso, o seu prazo e o seu risco. O que não muda é o padrão:{" "}
          <strong className="text-white">
            não indicamos nada que a gente não esteja disposto a carregar
          </strong>
          .
        </p>

        {/* O gancho: a inquietação vem do que o leitor NÃO sabe sobre o próprio
            dinheiro — nunca de uma projeção de ganho nem de comparação com o
            nosso resultado. Ver nota de compliance no topo do arquivo e o
            bloco 03. Não reescrever isto como promessa. */}
        <p
          style={MT(2.5)}
          className="text-[1.0625rem] leading-[1.65] max-w-[52ch] text-white/80"
        >
          E a pergunta que interessa não é sobre nós.{" "}
          <strong className="text-white">
            Quanto o seu dinheiro rendeu nos últimos doze meses?
          </strong>{" "}
          Se você não sabe responder de cabeça, é exatamente isso que o Raio-X
          coloca na mesa — e não saber já é, por si só, metade do diagnóstico.
        </p>

        <div className="mt-9">
          <BotaoWpp>Quero saber quanto o meu rendeu</BotaoWpp>
        </div>

        <p style={MT(2.5)} className="text-[0.72rem] leading-[1.6] text-white/45 max-w-[92ch]">
          Conteúdo de caráter informativo e educacional. Não constitui
          indicação, recomendação individualizada, promessa de retorno ou oferta
          de compra ou venda de qualquer ativo. Investimentos envolvem risco e
          podem resultar em perdas. A Midlej Capital não realiza gestão de
          recursos de terceiros — a custódia e a decisão permanecem sempre com
          você.
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   04 — Quem responde do outro lado. Fotos e nomes, sem bios.
   ================================================================ */

function Time() {
  return (
    <section className="bg-white">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <h2
          className="text-[clamp(1.5rem,3vw,2.125rem)] font-bold leading-[1.15] tracking-tight max-w-[24ch]"
          style={{ color: "#2E4659" }}
        >
          Quem responde do outro lado.
        </h2>
        {/* FOMO deste bloco = escassez REAL (cinco pessoas, análise à mão),
            nunca fabricada. Não inventar "restam N vagas" nem contador falso. */}
        <p
          className="text-[1rem] leading-[1.6] max-w-[54ch]"
          style={{ color: "#6B7B8D", ...MT(1.5) }}
        >
          Somos cinco. Cada Raio-X é feito por uma dessas pessoas, à mão — não
          por um algoritmo que atende infinita gente ao mesmo tempo.{" "}
          <strong style={{ color: "#2E4659" }}>
            O dia delas tem o mesmo tamanho que o seu
          </strong>
          , e quem chama primeiro é analisado primeiro.
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {TEAM.map((p) => (
            <article key={p.name} className="flex flex-col">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#F5F7FA]">
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <h3
                className="mt-3 text-[0.95rem] font-bold leading-tight tracking-tight"
                style={{ color: "#2E4659" }}
              >
                {p.name}
              </h3>
              <p
                className="text-[0.78rem] font-medium"
                style={{ color: "#4a6b8c", ...MT(0.35) }}
              >
                {p.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   05 — Fechamento. Repete a única ação possível.
   ================================================================ */

function Fechamento() {
  return (
    <section style={{ backgroundColor: "#4a6b8c" }}>
      {/* flex + items-center centraliza os filhos de largura limitada de forma
          confiável (mx-auto em elemento com max-w em `ch` não estava pegando). */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col items-center text-center">
        {/* FOMO do fechamento = o custo de adiar. "Não decidir" também é uma
            decisão, e ela já está em vigor. Fato, não projeção de ganho. */}
        <h2 className="text-[clamp(1.625rem,3.4vw,2.5rem)] font-bold leading-[1.12] tracking-tight text-white max-w-[22ch]">
          Adiar também é uma decisão — e ela já está valendo.
        </h2>
        <p style={MT(1.75)} className="text-[1rem] leading-[1.6] text-white/80 max-w-[48ch]">
          Cada mês que passa, seu dinheiro segue exatamente onde está. Começar a
          descobrir se esse é o lugar certo leva menos de um minuto — e a
          conversa é confidencial.
        </p>
        <div className="mt-10">
          <BotaoWpp tone="branco">Quero meu Raio-X pelo WhatsApp</BotaoWpp>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   06 — Rodapé legal mínimo (identificação regulatória obrigatória)
   ================================================================ */

function Rodape() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-[#EDEFF2]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10">
        <p className="text-[0.72rem] leading-[1.6] max-w-[92ch]" style={{ color: "#8A97A6" }}>
          A {RAZAO_SOCIAL} é registrada na CVM e atua exclusivamente na
          modalidade fee based. Não realiza gestão de recursos de terceiros nem
          garante rentabilidade. Rentabilidade passada não representa garantia
          de rentabilidade futura. Investimentos envolvem riscos e podem
          resultar em perdas. Esta página tem caráter informativo e não
          constitui oferta, recomendação individualizada ou solicitação de
          compra ou venda de ativos.
        </p>
        <p className="text-[0.72rem]" style={{ color: "#8A97A6", ...MT(1) }}>
          {RAZAO_SOCIAL} · CNPJ {CNPJ} · {CVM_REGISTRO} · © {year} Midlej
          Capital.
        </p>
      </div>
    </footer>
  );
}
