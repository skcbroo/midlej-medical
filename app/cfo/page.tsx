import type { Metadata } from "next";
import { CFOPage } from "./CFOPage";

export const metadata: Metadata = {
  title: "CFO as a Service — Para médicos de alta renda · Midlej Consultoria",
  description:
    "Toda empresa séria tem um CFO. A Midlej assume esse papel na sua vida financeira. Diagnóstico gratuito, sem compromisso.",
};

export default function CfoRoute() {
  return <CFOPage />;
}
