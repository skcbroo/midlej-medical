// Constants shared between client (LeadForm) and server (LeadSchema).
// Kept zod-free so importing from the client doesn't pull zod into the bundle.

export const BR_UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

export type BrUf = (typeof BR_UFS)[number];

// Snapshot stored with each lead in the backend for legal record.
// Kept brief on purpose — the page is not LGPD-heavy.
export const CONSENT_TEXT =
  "Ao enviar, autorizo a Midlej Capital a entrar em contato pelo WhatsApp informado sobre a mentoria e o envio deste material.";

export const MIDLEJ_WHATSAPP_NUMBER = "5561996204646";
export const MIDLEJ_WHATSAPP_HREF = `https://wa.me/${MIDLEJ_WHATSAPP_NUMBER}`;

// Canal de contato da LP /plenomed (teste: somente WhatsApp).
// Mensagem pré-preenchida exigida pelo briefing; URL-encode no link.
export const PLENOMED_WHATSAPP_MESSAGE =
  "Olá! Sou médico(a) e quero avaliar a proteção do meu patrimônio.";
export const PLENOMED_WHATSAPP_HREF = `${MIDLEJ_WHATSAPP_HREF}?text=${encodeURIComponent(
  PLENOMED_WHATSAPP_MESSAGE,
)}`;

// Canal de contato da LP /consorcio (teste: somente WhatsApp).
export const CONSORCIO_WHATSAPP_MESSAGE =
  "Olá! Quero entender como usar consórcio para alavancar meu patrimônio em imóveis e ativos reais.";
export const CONSORCIO_WHATSAPP_HREF = `${MIDLEJ_WHATSAPP_HREF}?text=${encodeURIComponent(
  CONSORCIO_WHATSAPP_MESSAGE,
)}`;

// Canal de contato da LP /cfo (servidores públicos — somente WhatsApp).
export const CFO_WHATSAPP_MESSAGE =
  "Olá! Sou servidor público e quero transformar minha estabilidade em patrimônio e renda para o futuro. Quero avaliar meu planejamento com a Midlej.";
export const CFO_WHATSAPP_HREF = `${MIDLEJ_WHATSAPP_HREF}?text=${encodeURIComponent(
  CFO_WHATSAPP_MESSAGE,
)}`;

// Canal de contato da LP /raiox (investimentos — WhatsApp + formulário).
export const RAIOX_WHATSAPP_MESSAGE =
  "Olá! Tenho um valor para investir e quero fazer o Raio-X da minha carteira com a Midlej.";
export const RAIOX_WHATSAPP_HREF = `${MIDLEJ_WHATSAPP_HREF}?text=${encodeURIComponent(
  RAIOX_WHATSAPP_MESSAGE,
)}`;

/* LP /raiox-b — variante B do teste A/B (27/07/2026).
   A = /raiox (longa, formulário multi-step + WhatsApp).
   B = /raiox-b (curta, SOMENTE WhatsApp — sem formulário).
   ⚠️ A mensagem pré-preenchida é DELIBERADAMENTE diferente da variante A:
   é o que permite ao time saber, no próprio WhatsApp, de qual LP veio o
   contato — sem depender de UTM (que se perde na transição pro app). */
export const RAIOX_B_WHATSAPP_MESSAGE =
  "Olá! Vi a página do Raio-X e quero saber onde investir meu dinheiro.";
export const RAIOX_B_WHATSAPP_HREF = `${MIDLEJ_WHATSAPP_HREF}?text=${encodeURIComponent(
  RAIOX_B_WHATSAPP_MESSAGE,
)}`;

/* ─────────────────────────────────────────────────────────
   LP /raiox — Raio-X da Carteira (form de qualificação)
   Opções compartilhadas entre o form (client) e o schema (server).
   Mantidas zod-free aqui de propósito.
   ───────────────────────────────────────────────────────── */

// Situação atual do investidor (1ª pergunta do form multi-step).
export const RAIOX_SITUACOES = [
  "Já invisto e quero uma segunda opinião",
  "Recebi herança ou liquidez recente",
  "Estou insatisfeito com meu banco ou assessor",
  "Quero começar a organizar meu patrimônio",
] as const;
export type RaioxSituacao = (typeof RAIOX_SITUACOES)[number];

// Faixa de patrimônio investido (ou a investir). Usada apenas para
// ROTEAR o atendimento (score interno) — NÃO é barreira de exclusão:
// o público é qualquer pessoa com capacidade de contratar consultoria.
export const RAIOX_PATRIMONIOS = [
  "Até R$ 300 mil",
  "R$ 300 mil a R$ 1 milhão",
  "R$ 1 a 5 milhões",
  "Acima de R$ 5 milhões",
] as const;
export type RaioxPatrimonio = (typeof RAIOX_PATRIMONIOS)[number];

export const RAIOX_PROFISSOES = [
  "Médico(a)",
  "Servidor(a) público",
  "Empresário(a)",
  "Aposentado(a)",
  "Outra",
] as const;
export type RaioxProfissao = (typeof RAIOX_PROFISSOES)[number];

// Consentimento específico do Raio-X (form pede e-mail além de WhatsApp).
export const RAIOX_CONSENT_TEXT =
  "Autorizo a Midlej Capital a entrar em contato pelo WhatsApp e e-mail informados sobre o Raio-X da Carteira e concordo com a Política de Privacidade.";

/* ─────────────────────────────────────────────────────────
   LP /blindagem — Proteção patrimonial internacional (dólar)
   Produto internacional (seguro de vida dolarizado). Sem menção
   à CVM em nenhum ponto — não é valor mobiliário local.
   Público: quem vê risco no Brasil, quer dolarizar e exclusividade.
   ───────────────────────────────────────────────────────── */

export const BLINDAGEM_WHATSAPP_MESSAGE =
  "Olá! Quero entender como proteger meu patrimônio fora do Brasil, em dólar, com a Midlej.";
export const BLINDAGEM_WHATSAPP_HREF = `${MIDLEJ_WHATSAPP_HREF}?text=${encodeURIComponent(
  BLINDAGEM_WHATSAPP_MESSAGE,
)}`;

// O que motiva o interesse na proteção internacional (1ª pergunta).
export const BLINDAGEM_MOTIVACOES = [
  "Não confio no rumo do Brasil e quero reduzir esse risco",
  "Quero proteger meu poder de compra em dólar",
  "Quero transmitir patrimônio à família sem inventário",
  "Temo bloqueio, confisco ou mudança de regra sobre meus ativos",
] as const;
export type BlindagemMotivacao = (typeof BLINDAGEM_MOTIVACOES)[number];

// Faixa de patrimônio a proteger no exterior. Só ROTEIA o atendimento
// (score interno) — não é barreira de exclusão.
export const BLINDAGEM_FAIXAS = [
  "Começando a estruturar / até R$ 500 mil",
  "R$ 500 mil a R$ 2 milhões",
  "R$ 2 a 10 milhões",
  "Acima de R$ 10 milhões",
] as const;
export type BlindagemFaixa = (typeof BLINDAGEM_FAIXAS)[number];

// Horizonte pretendido para a proteção (contextualiza a conversa).
export const BLINDAGEM_HORIZONTES = [
  "Proteção de longo prazo (10 anos ou mais)",
  "Médio prazo (5 a 10 anos)",
  "Ainda estou avaliando o horizonte",
] as const;
export type BlindagemHorizonte = (typeof BLINDAGEM_HORIZONTES)[number];

export const BLINDAGEM_CONSENT_TEXT =
  "Autorizo a Midlej Capital a entrar em contato pelo WhatsApp e e-mail informados sobre proteção patrimonial internacional e concordo com a Política de Privacidade.";

/* ─────────────────────────────────────────────────────────
   LP /legacy — Midlej Legacy (patrimônio destinado a filhos)
   Normativo: docs/legacy-plataforma-mensagem.md (revisão 2).

   Os DOIS campos abaixo são exigência de branding (§7) e são a
   razão de a página existir com formulário próprio:
     1. idade do filho  → horizonte + é o campo que a pessoa
        preenche com prazer (o mais emocional da página);
     2. faixa de aporte MENSAL → é a "porta estreita". O Legacy é
        plano de FLUXO, não de estoque: perguntar aporte mensal é
        coerente com a definição nº 2 e é menos invasivo do que
        perguntar patrimônio. Efeito colateral desejado: pela
        primeira vez existe DADO para chamar um lead de qualificado.
   ───────────────────────────────────────────────────────── */

// Faixas de idade em vez de idade exata: 1 toque, zero teclado no
// mobile (de onde vem a maior parte do tráfego pago). A idade exata
// é confirmada no retorno pelo WhatsApp.
export const LEGACY_IDADES = [
  "0 a 3 anos",
  "4 a 7 anos",
  "8 a 11 anos",
  "12 a 15 anos",
  "16 anos ou mais",
] as const;
export type LegacyIdade = (typeof LEGACY_IDADES)[number];

// Faixas exatas definidas em §7 do documento normativo. Não alterar
// sem passar pelo branding: elas são o corte de qualificação.
export const LEGACY_APORTES = [
  "Até R$ 1.000",
  "R$ 1.000 a R$ 3.000",
  "R$ 3.000 a R$ 10.000",
  "Acima de R$ 10.000",
] as const;
export type LegacyAporte = (typeof LEGACY_APORTES)[number];

// Enquadramento obrigatório do campo de faixa (§7). É isto que
// impede que ele seja lido como barreira.
export const LEGACY_APORTE_FRAMING =
  "Para prepararmos o plano, precisamos da ordem de grandeza. Nenhum valor é comprometido agora.";

// SLA de retorno (decisão do Lucas, 04/08/2026). É o ativo comercial
// mais forte da página. Fonte única: aparece acima da dobra, no
// fechamento e na tela de sucesso do formulário.
export const LEGACY_SLA = "Retornamos em até 5 minutos.";

export const LEGACY_CONSENT_TEXT =
  "Autorizo a Midlej Capital a entrar em contato pelo WhatsApp e e-mail informados sobre o Midlej Legacy e concordo com a Política de Privacidade.";
