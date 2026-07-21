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

  /* ── painel.* → /dashboard (dados comerciais · SEMPRE protegido) ──
     Este subdomínio expõe investimento, CAC, receita, leads e motivo de
     perda. Nunca pode servir sem autenticação: se as variáveis de ambiente
     não estiverem configuradas, a rota RECUSA em vez de liberar. Falhar
     fechado é intencional — um deploy sem env não vaza o painel. */
  if (host.startsWith("painel.") || pathname.startsWith("/dashboard")) {
    const user = process.env.DASHBOARD_USER;
    const pass = process.env.DASHBOARD_PASSWORD;

    if (!user || !pass) {
      return new NextResponse(
        "Painel indisponível: autenticação não configurada (DASHBOARD_USER / DASHBOARD_PASSWORD).",
        { status: 503, headers: { "x-robots-tag": "noindex, nofollow" } },
      );
    }

    const header = request.headers.get("authorization") ?? "";
    let ok = false;
    if (header.startsWith("Basic ")) {
      try {
        const [u, ...rest] = atob(header.slice(6)).split(":");
        ok = u === user && rest.join(":") === pass;
      } catch {
        ok = false;
      }
    }

    if (!ok) {
      return new NextResponse("Autenticação necessária.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Painel Midlej", charset="UTF-8"',
          "x-robots-tag": "noindex, nofollow",
        },
      });
    }

    /* Marca a requisição como área privada. O layout raiz lê este header
       e NÃO injeta GTM/Clarity aqui — por dois motivos: (1) não mandar
       dados comerciais internos para gravação de sessão de terceiro;
       (2) não contaminar as métricas do pixel, que são a régua do
       experimento da /raiox. */
    const privado = new Headers(request.headers);
    privado.set("x-midlej-private", "1");

    if (host.startsWith("painel.") && !pathname.startsWith("/dashboard")) {
      url.pathname = pathname === "/" ? "/dashboard" : `/dashboard${pathname}`;
      const res = NextResponse.rewrite(url, { request: { headers: privado } });
      res.headers.set("x-robots-tag", "noindex, nofollow");
      return res;
    }
    const res = NextResponse.next({ request: { headers: privado } });
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
