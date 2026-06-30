import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consórcio como alavancagem patrimonial · Midlej Capital",
  description:
    "Consórcio não é compra parcelada — é uma ferramenta de alavancagem patrimonial. Forme poder de compra sem juros para adquirir imóveis e ativos reais, com estratégia e acompanhamento.",
  openGraph: {
    title: "Consórcio como alavancagem patrimonial · Midlej Capital",
    description:
      "Use o consórcio como alavanca: poder de compra à vista, sem juros, para imóveis e ativos reais — dentro de um plano patrimonial.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function ConsorcioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
