import { type NextRequest, NextResponse } from "next/server";

/**
 * Subdomain routing — Midlej Capital.
 *
 * Vercel project serve 3 domínios apontando pra mesma build:
 *   - midlejcapital.com.br        → hub principal, /investimentos, /plenomed
 *   - www.midlejcapital.com.br    → mesmo que acima (tratado como root)
 *   - education.midlejcapital.com.br → APENAS /mentoria/*
 *
 * Este middleware reescreve a URL internamente quando o host é o
 * subdomínio education:
 *   - education.midlejcapital.com.br/           → rewrite /mentoria
 *   - education.midlejcapital.com.br/raio-x     → rewrite /mentoria/raio-x
 *   - education.midlejcapital.com.br/ebook      → rewrite /mentoria/ebook
 *
 * A URL na barra do navegador permanece limpa (sem o prefixo /mentoria) —
 * é rewrite, não redirect. Para o usuário, education é uma propriedade
 * independente da mentoria.
 *
 * Os outros domínios (midlejcapital.com.br + www) seguem o roteamento
 * nativo do Next: /, /investimentos, /mentoria/*, /plenomed continuam
 * acessíveis para devs e fallback. A canonicalização SEO entre os
 * domínios deve ser feita via `metadataBase` + `alternates.canonical`
 * por rota, em iteração futura.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Skip assets e API — middleware não deve interceptar isso.
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname === "/favicon.ico" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  /* ── painel comercial ──
     Endereços válidos:
       midlejcapital.com.br/dashboard/<segredo>
       painel.midlejcapital.com.br/<segredo>
     Qualquer outra coisa sob /dashboard responde 404.

     Dados de terceiros (situação financeira de leads identificáveis) seguem
     agregados em data.ts — não voltam ao detalhe individual. */
  if (host.startsWith("painel.") || pathname.startsWith("/dashboard")) {
    /* Segmento secreto na URL, sem tela de login (decisão do Lucas, 21/07).
       O valor padrão está no código e este repositório é PÚBLICO — logo isto
       é obscuridade, não controle de acesso: quem vir o repo (ou a busca de
       código do GitHub) descobre o endereço. Serve para não ser tropeçado por
       acaso, não para resistir a quem procura.
       DASHBOARD_TOKEN permite trocar o segmento sem alterar o código, se um
       dia fizer sentido rotacionar. */
    const SEGREDO = process.env.DASHBOARD_TOKEN || "x7k2m9";

    const seg = pathname.split("/").filter(Boolean);
    const token = host.startsWith("painel.") ? seg[0] : seg[1];

    /* Sem o segmento certo: 404 seco. Nem 401 nem 403 — não confirmamos que
       existe algo aqui. */
    if (token !== SEGREDO) {
      return new NextResponse("Não encontrado.", {
        status: 404,
        headers: { "x-robots-tag": "noindex, nofollow" },
      });
    }

    /* Marca a requisição como área privada. O layout raiz lê este header
       e NÃO injeta GTM/Clarity aqui — por dois motivos: (1) não mandar
       dados comerciais internos para gravação de sessão de terceiro;
       (2) não contaminar as métricas do pixel, que são a régua do
       experimento da /raiox. */
    const privado = new Headers(request.headers);
    privado.set("x-midlej-private", "1");

    /* O segmento secreto é só a chave — as páginas vivem sob /dashboard.
       Rewrite (não redirect): a URL na barra continua com o segredo, e o
       endereço interno nunca é revelado.
         /dashboard/<segredo>            → /dashboard
         /dashboard/<segredo>/comercial  → /dashboard/comercial
       O token vai num header para o layout montar os links da navegação
       (a página não conhece o segredo de outra forma). */
    const resto = (host.startsWith("painel.") ? seg.slice(1) : seg.slice(2)).join("/");
    privado.set("x-midlej-token", SEGREDO);

    url.pathname = resto ? `/dashboard/${resto}` : "/dashboard";
    const res = NextResponse.rewrite(url, { request: { headers: privado } });
    res.headers.set("x-robots-tag", "noindex, nofollow");
    return res;
  }

  // education.* → reescreve para /mentoria{path}.
  if (host.startsWith("education.")) {
    // Se já vier prefixado por algum motivo, deixa fluir.
    if (pathname.startsWith("/mentoria")) {
      return NextResponse.next();
    }
    url.pathname = pathname === "/" ? "/mentoria" : `/mentoria${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Outros hosts: passa direto. /mentoria, /investimentos, /plenomed
  // seguem disponíveis no domínio principal por enquanto.
  return NextResponse.next();
}

/**
 * Matcher: roda em tudo exceto rotas internas do Next e assets.
 * O check de extensão dentro do middleware é defensivo (matcher
 * regex ignora muitos casos mas não todos).
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
