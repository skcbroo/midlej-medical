import Image from "next/image";
import Link from "next/link";
import { HubLeadForm } from "./HubLeadForm";

const FOOTER_LINKS = [
  { label: "Hub",             href: "/" },
  { label: "Investimentos",   href: "/investimentos" },
  { label: "Seguro de vida",  href: "/seguro" },
  { label: "Proteção médica", href: "/plenomed" },
  { label: "Internacional",   href: "/dolar" },
  { label: "Sucessão",        href: "/sucessao" },
];

interface LPClosingProps {
  eyebrow: string;
  headline: string;
  body: string;
  ctaLabel: string;
  origin: string;
  disclaimer: string;
}

export function LPClosing({ eyebrow, headline, body, ctaLabel, origin, disclaimer }: LPClosingProps) {
  const year = new Date().getFullYear();
  return (
    <section id="contato" style={{ backgroundColor: "#4a6b8c" }} className="pt-24 md:pt-32 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* CTA + form */}
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start pb-20 md:pb-24">
          <div className="col-span-12 md:col-span-5">
            <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
              {eyebrow}
            </p>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white mb-6">
              {headline}
            </h2>
            <p className="text-[1.0625rem] leading-relaxed max-w-[44ch]" style={{ color: "rgba(255,255,255,0.70)" }}>
              {body}
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <HubLeadForm tone="dark" submitLabel={ctaLabel} origin={origin} />
          </div>
        </div>

        {/* Divisor */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }} className="mb-12 md:mb-14" />

        {/* Footer info */}
        <div className="grid grid-cols-12 gap-8 items-start mb-10">
          <div className="col-span-12 md:col-span-4">
            <Image
              src="/midlej_capital.png"
              alt="Midlej Capital"
              width={320}
              height={130}
              className="h-12 w-auto mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm leading-relaxed max-w-[32ch]" style={{ color: "rgba(255,255,255,0.55)" }}>
              Sem conflito de interesse. Sem produto da prateleira.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3 md:col-start-6">
            <p className="text-[0.6rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              Soluções
            </p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors duration-200" style={{ color: "rgba(255,255,255,0.60)" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <p className="text-[0.6rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              Contato
            </p>
            <a
              href="mailto:contato@midlejcapital.com.br"
              className="text-sm hover:text-white transition-colors duration-200 block"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              contato@midlejcapital.com.br
            </a>
          </div>
        </div>

        {/* Barra legal */}
        <div className="border-t pt-6 flex flex-col gap-3" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            <span>CNPJ 35.340.252/0001-44</span>
            <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
          </div>
          <p className="text-[0.7rem] leading-relaxed max-w-[80ch]" style={{ color: "rgba(255,255,255,0.28)" }}>
            {disclaimer}
          </p>
        </div>

      </div>
    </section>
  );
}
