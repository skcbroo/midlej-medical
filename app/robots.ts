import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Painel comercial — dados internos. Bloqueado também por Basic Auth
      // no middleware e por noindex na própria rota; isto é a terceira camada.
      disallow: ["/dashboard"],
    },
    sitemap: "https://midlejcapital.com.br/sitemap.xml",
  };
}
