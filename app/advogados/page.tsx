import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { SmoothAnchor } from "../_hub/SmoothAnchor";
import { ADVOGADOS_WHATSAPP_HREF, MIDLEJ_WHATSAPP_NUMBER } from "@/lib/leadConstants";
import { AdvNav } from "./AdvNav";
import { AdvMotion } from "./AdvMotion";
import { AdvFaq } from "./AdvFaq";
import { AdvWhatsApp, WhatsIcon } from "./AdvWhatsApp";
import "./advogados.css";

/* ================================================================
   /advogados — Nexos Ativos · Antecipação de honorários
   ----------------------------------------------------------------
   Frente NOVA, B2B jurídica. NÃO é a marca Midlej/CFO nem a estética
   de investimentos. É a NEXOS ATIVOS (braço de originação do Grupo
   Midlej) falando com ADVOGADOS trabalhistas que querem antecipar os
   PRÓPRIOS honorários (sucumbência/contratuais).

   Criada 2026-08-30 (especialista-lp). Revisada 2026-08-30 (v2):
   página curta, SEM formulário, CTA direto no WhatsApp em vários
   pontos. Removidas as seções de números/prova, "quem está por trás"
   e "segurança jurídica".

   ⚠️ TOM (correção do Lucas): o público é ADVOGADO — ele JÁ SABE que
   antecipar/ceder honorário é permitido. Tratar "é legal? / é
   permitido? / segurança jurídica / art. 286 CC / art. 23 EOAB" como
   argumento de venda é condescendente. NÃO usar isso em lugar nenhum
   da página (hero, cards, FAQ). Conversa de PAR pra par: o colega que
   resolve o caixa. O FAQ responde dúvida REAL (quanto recebo, em quanto
   tempo, o que é elegível, como funciona a cessão na prática, precisa do
   cliente, e se o processo virar).

   ⚠️ Compliance mantido: sem promessa de deságio/valor/prazo garantido,
   sem "grátis" ("sem taxa de análise"), sem comissão por indicação, e o
   disclaimer de não-exercício da advocacia fica no rodapé (obrigatório).
   Prova social e depoimentos são PLACEHOLDERS — nada inventado.

   Espinha (v2):
     1. Navbar · 2. Hero (CTA WhatsApp) · 3. Dor
     4. Como funciona (4 passos) · 5. Faixa de CTA (WhatsApp)
     6. Por que a Nexos (enxuta) · 7. Depoimentos (2 vídeo + 2 texto — PH)
     8. Gancho da carteira · 9. FAQ · 10. CTA final (WhatsApp) · 11. Rodapé

   Conversão: clique no WhatsApp (link wa.me capturado pelo GTM, igual às
   outras LPs) + evento `lead_whatsapp` no dataLayer (ver AdvWhatsApp).
   ================================================================ */

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-adv-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-adv-body",
  display: "swap",
});

const WHATSAPP_DISPLAY = "(61) 99620-4646";

export const metadata: Metadata = {
  title: {
    absolute: "Antecipe seus honorários — Nexos Ativos | Grupo Midlej",
  },
  description:
    "Advogado trabalhista: seus honorários já são seus. A Nexos Ativos antecipa honorários de sucumbência e contratuais — o valor travado no processo vira caixa agora. Análise da carteira sem taxa. Fale no WhatsApp e peça uma proposta.",
  alternates: { canonical: "/advogados" },
  openGraph: {
    title: "Seus honorários já são seus. Receba agora — Nexos Ativos",
    description:
      "Antecipe honorários de sucumbência e contratuais. Análise da carteira sem taxa e sem compromisso. Proposta pelo WhatsApp.",
    type: "website",
    locale: "pt_BR",
    url: "https://midlejcapital.com.br/advogados",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seus honorários já são seus. Receba agora — Nexos Ativos",
    description:
      "Antecipe honorários travados no processo. Análise da carteira sem taxa. Proposta pelo WhatsApp.",
  },
  robots: { index: true, follow: true },
};

/* ── Ícones (inline, herdam currentColor) ──────────────────────── */
const IconDoc = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 2h8l4 4v16H6V2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M14 2v4h4M8.5 12h7M8.5 16h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconSearch = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconCoins = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
const IconSend = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 3L3 10.5l7 2.5 2.5 7L21 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M10 13.5L21 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4.5 20a7.5 7.5 0 0115 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPlay = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M8 5v14l11-7L8 5z" />
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* FAQ — dúvidas REAIS de um advogado avaliando antecipar o próprio
   honorário. Nada de "é legal/permitido?" (o público já sabe). */
const FAQ_ITEMS = [
  {
    q: "Como o valor da antecipação é calculado?",
    a: (
      <>
        Avaliamos o honorário pela fase do processo, pelo tempo estimado até o
        recebimento e pelo devedor. O deságio é o preço de receber hoje o que só
        entraria em anos — e de passar o tempo e o risco da espera para a gente.
        Você vê o valor líquido antes de assinar qualquer coisa. Não é percentual
        fixo de tabela: cada carteira é analisada caso a caso.
      </>
    ),
  },
  {
    q: "Quais honorários posso antecipar?",
    a: (
      <>
        Sucumbência e contratuais, seus por direito. Avaliamos tanto os já
        reconhecidos quanto os que ainda estão em curso — a fase do processo
        entra na conta (execução mais avançada tende a deságio menor). Manda os
        dados da causa que a gente te diz o enquadramento.
      </>
    ),
  },
  {
    q: "Em quanto tempo o dinheiro entra?",
    a: (
      <>
        Depois que você envia os dados, retornamos rápido com a proposta e o
        valor líquido. Fechado o acerto, o pagamento é à vista, após a assinatura
        do contrato de cessão. Sem fila e sem esperar o fim do processo.
      </>
    ),
  },
  {
    q: "Preciso envolver o meu cliente?",
    a: (
      <>
        Não. O honorário é seu e a decisão de antecipar é só sua — não passa pelo
        seu cliente e não interfere na sua relação com ele. A operação é entre
        você e a Nexos, com a discrição que o assunto pede.
      </>
    ),
  },
  {
    q: "Como funciona a operação, na prática?",
    a: (
      <>
        Você manda os dados da causa; a gente analisa e apresenta a proposta com
        o valor líquido; se fizer sentido, assinamos o contrato de cessão do
        honorário (formalizado e averbado no processo) e o valor entra à vista.
        Direto, documentado, sem etapa escondida.
      </>
    ),
  },
  {
    q: "E se o processo virar depois que eu já recebi?",
    a: (
      <>
        Esse ponto é definido na própria cessão e fica transparente na proposta —
        é um dos itens que acertamos antes de você assinar. Traga o seu caso e a
        gente te mostra exatamente como fica o tratamento do risco no seu
        cenário.
      </>
    ),
  },
];

export default function AdvogadosPage() {
  return (
    <main id="topo" className={`adv-scope ${montserrat.variable} ${inter.variable}`}>
      <SmoothAnchor />
      <AdvMotion />
      <AdvNav />

      {/* ── 1. HERO ───────────────────────────────────────────── */}
      <header className="adv-hero">
        <div className="adv-container">
          <div className="adv-hero__single adv-reveal">
            <div className="adv-seg" role="group" aria-label="Você é advogado ou reclamante?">
              <span data-active="true">Sou advogado(a)</span>
              <a href="https://www.nexosativos.com.br" target="_blank" rel="noopener noreferrer">
                Sou reclamante
              </a>
            </div>

            <h1 className="adv-hero__title">
              Seus honorários já são seus.{" "}
              <span className="adv-teal">Receba agora</span>, sem esperar o fim do
              processo.
            </h1>

            <p className="adv-hero__sub">
              A Nexos antecipa honorários de sucumbência e contratuais — o valor
              que ficaria travado por anos vira caixa no seu escritório.
              Analisamos a sua carteira sem taxa e apresentamos uma proposta.
            </p>

            <div className="adv-hero__actions">
              <AdvWhatsApp variant="teal" location="hero">
                Quero uma proposta
              </AdvWhatsApp>
              <AdvWhatsApp variant="green" location="hero">
                <WhatsIcon /> Falar no WhatsApp
              </AdvWhatsApp>
            </div>

            <ul className="adv-hero__trust">
              <li>
                <IconCoins /> Pagamento à vista
              </li>
              <li>
                <IconSearch /> Sem taxa de análise
              </li>
              <li>
                <IconUser /> Decisão sua, sem envolver o cliente
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* ── 2. DOR ────────────────────────────────────────────── */}
      <section className="adv-section adv-section--navy-deep">
        <div className="adv-container">
          <div className="adv-reveal">
            <p className="adv-eyebrow">O descasamento de todo escritório</p>
            <h2 className="adv-h2">
              Você ganhou a causa. O dinheiro é que ainda não chegou.
            </h2>
            <p className="adv-lead">
              O sucesso do escritório fica preso num ativo ilíquido: a sentença
              saiu, mas o honorário só entra daqui a anos — enquanto aluguel,
              equipe e custas correm todo mês.
            </p>
          </div>

          <div className="adv-pain__grid">
            {[
              {
                t: "Execução que não anda",
                d: "Entre o trânsito em julgado e a liberação dos valores, são anos. O tempo do Judiciário não combina com o dia 5 da folha.",
              },
              {
                t: "Caixa preso, não perdido",
                d: "O honorário existe e é seu. Só está no lugar errado da linha do tempo — travado no processo em vez de no seu caixa.",
              },
              {
                t: "Risco em cima do advogado",
                d: "Enquanto não recebe, você carrega o risco do processo virar, do acordo ruim, do devedor sumir. A espera tem custo e incerteza.",
              },
              {
                t: "Crescimento que fica na mesa",
                d: "Esse caixa poderia estar pegando novos casos, contratando, estruturando. Parado, é oportunidade que não volta.",
              },
            ].map((p, i) => (
              <div key={i} className="adv-pain__card adv-reveal" data-reveal-delay={i * 80}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMO FUNCIONA (4 passos) ───────────────────────── */}
      <section id="como-funciona" className="adv-section adv-section--light">
        <div className="adv-container">
          <div className="adv-reveal">
            <p className="adv-eyebrow">Como funciona</p>
            <h2 className="adv-h2">Da causa ganha ao caixa, em quatro passos.</h2>
            <p className="adv-lead">
              A decisão é só sua — não envolve o seu cliente. Serve honorário já
              reconhecido ou em curso, conforme a fase do processo.
            </p>
          </div>

          <div className="adv-steps">
            {[
              {
                icon: <IconSend />,
                t: "Você manda os dados da causa",
                d: "Processo, fase e o honorário a receber. Rápido, direto pelo WhatsApp.",
              },
              {
                icon: <IconSearch />,
                t: "A gente analisa e propõe",
                d: "Proposta com o valor líquido claro, sem taxa de análise e sem compromisso. Você decide com o número na mão.",
              },
              {
                icon: <IconDoc />,
                t: "Assinatura do contrato",
                d: "Contrato de cessão do honorário, formalizado e averbado no processo. Documentado e transparente.",
              },
              {
                icon: <IconCoins />,
                t: "Pagamento à vista",
                d: "O valor entra no caixa do escritório. A espera do processo passa a ser nossa.",
              },
            ].map((s, i) => (
              <div key={i} className="adv-step adv-reveal" data-reveal-delay={i * 90}>
                <span className="adv-step__n" aria-hidden>
                  {i + 1}
                </span>
                <span className="adv-step__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FAIXA DE CTA (meio da página) ──────────────────── */}
      <section className="adv-midcta">
        <div className="adv-container adv-midcta__inner adv-reveal">
          <div>
            <h2>Prefere resolver agora, sem preencher nada?</h2>
            <p>
              Chama no WhatsApp com os dados da causa. A gente analisa e volta com
              a proposta.
            </p>
          </div>
          <div className="adv-midcta__cta">
            <AdvWhatsApp variant="green" location="meio">
              <WhatsIcon /> Falar no WhatsApp
            </AdvWhatsApp>
          </div>
        </div>
      </section>

      {/* ── 5. POR QUE A NEXOS (enxuta) ───────────────────────── */}
      <section id="por-que" className="adv-section adv-section--navy">
        <div className="adv-container">
          <div className="adv-reveal">
            <p className="adv-eyebrow">Por que pela Nexos</p>
            <h2 className="adv-h2">Feita para o advogado trabalhista.</h2>
          </div>

          <div className="adv-adv__grid">
            {[
              {
                icon: <IconUser />,
                t: "Falamos a sua língua",
                d: "Sucumbência, contratuais, fase de execução, deságio. A conversa é de colega para colega, direto ao caixa do escritório.",
              },
              {
                icon: <IconClock />,
                t: "Liquidez agora, não em anos",
                d: "Você recebe hoje o que só entraria no fim do processo — e transfere para a gente o tempo e o risco da espera.",
              },
              {
                icon: <IconSearch />,
                t: "Você vê o número antes",
                d: "A proposta traz o valor líquido que entra no seu caixa antes de qualquer assinatura. Sem letra miúda depois.",
              },
              {
                icon: <IconCoins />,
                t: "Um caso ou a carteira",
                d: "Comece por um honorário. Quando fizer sentido, estruturamos a liquidez da sua carteira de processos ganhos.",
              },
            ].map((v, i) => (
              <div key={i} className="adv-adv__card adv-reveal" data-reveal-delay={(i % 2) * 90}>
                <span className="adv-adv__icon">{v.icon}</span>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. DEPOIMENTOS (PLACEHOLDER: 2 vídeo + 2 texto) ───────
          ⚠️ NADA inventado. Estruturas prontas para o Lucas trocar por
          depoimentos reais (com autorização do advogado). */}
      <section className="adv-section adv-section--light">
        <div className="adv-container">
          <div className="adv-reveal">
            <p className="adv-eyebrow">Quem já antecipou com a Nexos</p>
            <h2 className="adv-h2">Advogados que destravaram o próprio caixa.</h2>
          </div>

          <div className="adv-testi__grid">
            {/* Espaço de VÍDEO 1 e 2 */}
            {[0, 1].map((i) => (
              <div key={`v${i}`} className="adv-testi adv-reveal" data-reveal-delay={i * 90}>
                <div className="adv-testi__video">
                  <span className="adv-testi__play" aria-hidden>
                    <IconPlay />
                  </span>
                  <span className="adv-ph-tag">[VÍDEO — depoimento de advogado]</span>
                </div>
                <div className="adv-testi__body">
                  <div className="adv-testi__who">
                    <span className="adv-testi__avatar" aria-hidden>
                      ??
                    </span>
                    <div>
                      <div className="adv-testi__name">Nome do advogado(a)</div>
                      <div className="adv-testi__role">OAB/UF · área trabalhista</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Espaço de DEPOIMENTO em texto 1 e 2 */}
            {[0, 1].map((i) => (
              <div key={`t${i}`} className="adv-testi adv-reveal" data-reveal-delay={i * 90}>
                <div className="adv-testi__body">
                  <span className="adv-ph-tag">[DEPOIMENTO EM TEXTO — a preencher]</span>
                  <p className="adv-testi__quote" style={{ marginTop: 18 }}>
                    Espaço reservado para a citação real do advogado sobre como a
                    antecipação ajudou o escritório. Nada é publicado aqui sem
                    autorização.
                  </p>
                  <div className="adv-testi__who">
                    <span className="adv-testi__avatar" aria-hidden>
                      ??
                    </span>
                    <div>
                      <div className="adv-testi__name">Nome do advogado(a)</div>
                      <div className="adv-testi__role">OAB/UF · cidade</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="adv-testi__note">
            Depoimentos reais serão publicados aqui mediante autorização dos
            advogados. Não exibimos nada fictício.
          </p>
        </div>
      </section>

      {/* ── 7. GANCHO DA CARTEIRA ─────────────────────────────── */}
      <section className="adv-section adv-section--navy-deep adv-carteira">
        <div className="adv-container">
          <div className="adv-carteira__inner adv-reveal">
            <div>
              <p className="adv-eyebrow" style={{ color: "#c9a84c" }}>
                Seu maior ativo agora
              </p>
              <h2>Sua carteira de processos ganhos é um ativo. Comece a usá-la.</h2>
              <p>
                Um honorário destrava um caixa pontual. Sua carteira de processos
                ganhos pode virar fôlego recorrente para o escritório — um caso
                por vez, ou vários. Continua sendo crédito seu, decisão sua.
              </p>
            </div>
            <div className="adv-carteira__cta">
              <AdvWhatsApp variant="gold" location="carteira">
                Avaliar minha carteira
              </AdvWhatsApp>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ────────────────────────────────────────────── */}
      <section id="duvidas" className="adv-section adv-section--navy">
        <div className="adv-container">
          <div className="adv-reveal">
            <p className="adv-eyebrow">Direto ao ponto</p>
            <h2 className="adv-h2">As perguntas que um advogado faz.</h2>
          </div>
          <AdvFaq items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ── 9. CTA FINAL ──────────────────────────────────────── */}
      <section className="adv-section adv-section--white">
        <div className="adv-container">
          <div className="adv-final adv-reveal">
            <p className="adv-eyebrow">Peça a sua proposta</p>
            <h2 className="adv-h2">
              O que ficaria preso no processo pode entrar no caixa agora.
            </h2>
            <ul className="adv-cta__checklist adv-final__list">
              <li>
                <IconCheck /> Análise da sua carteira sem taxa e sem compromisso.
              </li>
              <li>
                <IconCheck /> Proposta com o valor líquido claro — você decide
                depois de ver o número.
              </li>
              <li>
                <IconCheck /> Decisão sua, sem envolver o seu cliente.
              </li>
            </ul>

            <div className="adv-final__cta">
              <AdvWhatsApp variant="green" location="final">
                <WhatsIcon /> Falar no WhatsApp — {WHATSAPP_DISPLAY}
              </AdvWhatsApp>
            </div>

            <div className="adv-cta__direct adv-final__direct">
              <a href="mailto:contato@midlejcapital.com.br">
                <IconMail /> contato@midlejcapital.com.br
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. RODAPÉ ────────────────────────────────────────── */}
      <footer className="adv-footer">
        <div className="adv-container">
          <div className="adv-footer__grid">
            <div>
              <a href="#topo" className="adv-logo" aria-label="Nexos Ativos — início">
                <span className="adv-logo__mark" aria-hidden />
                <span>
                  <em style={{ color: "#00b4d8", fontStyle: "normal" }}>NEXOS</em> ATIVOS
                </span>
              </a>
              <p className="adv-footer__about" style={{ marginTop: 16 }}>
                Braço de originação de créditos judiciais do Grupo Midlej.
                Aquisição de honorários e créditos trabalhistas, com pagamento à
                vista.
              </p>
            </div>

            <div>
              <h4>Navegação</h4>
              <ul className="adv-footer__links">
                <li>
                  <a href="#como-funciona">Como funciona</a>
                </li>
                <li>
                  <a href="#por-que">Por que a Nexos</a>
                </li>
                <li>
                  <a href="#duvidas">Dúvidas</a>
                </li>
              </ul>
            </div>

            <div>
              <h4>Contato</h4>
              <ul className="adv-footer__links">
                <li>
                  <a href={ADVOGADOS_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                    WhatsApp {WHATSAPP_DISPLAY}
                  </a>
                </li>
                <li>
                  <a href="mailto:contato@midlejcapital.com.br">
                    contato@midlejcapital.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <p className="adv-footer__legal">
            <strong>Nexos Ativos — Grupo Midlej.</strong> A Nexos Ativos não é
            escritório de advocacia e não presta serviços ou atividades
            jurídicas. As operações consistem em aquisição de crédito por cessão;
            o valor de cada antecipação depende da análise do caso e é formalizado
            por contrato. Este material não constitui promessa de resultado, de
            valor ou de prazo de pagamento. Razão social e CNPJ:{" "}
            <strong>[a confirmar com o Lucas]</strong>. WhatsApp oficial:{" "}
            {WHATSAPP_DISPLAY} · nº {MIDLEJ_WHATSAPP_NUMBER}.
          </p>
        </div>
      </footer>
    </main>
  );
}
