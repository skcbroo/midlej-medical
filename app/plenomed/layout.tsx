import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proteção Patrimonial para Médicos · Midlej Capital",
  description:
    "Um processo pode custar mais que sua carreira. Descubra se seu patrimônio pessoal está protegido — RC profissional + blindagem patrimonial com consultoria financeira e jurídica integradas.",
  openGraph: {
    title: "Proteção Patrimonial para Médicos · Midlej Capital",
    description:
      "RC profissional na cobertura certa + blindagem patrimonial. Consultoria financeira e jurídica sob o mesmo teto.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function PlenomedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
