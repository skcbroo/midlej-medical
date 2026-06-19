import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projeção · Simuladores Financeiros",
  robots: { index: false, follow: false },
};

export default function ProjecaoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
