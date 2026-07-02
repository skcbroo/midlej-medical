import type { Metadata } from "next";
import { CFOPage } from "./CFOPage";

export const metadata: Metadata = {
  title: "CFO as a Service — Para servidores públicos · Midlej Consultoria",
  description:
    "Você tem a estabilidade. A Midlej é o CFO da sua vida financeira: método e segurança para transformar sua estabilidade em patrimônio e renda para o futuro. Diagnóstico gratuito, sem compromisso.",
};

export default function CfoRoute() {
  return <CFOPage />;
}
