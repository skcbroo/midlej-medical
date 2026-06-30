import Image from "next/image";
import Link from "next/link";
import { HubLeadForm } from "./HubLeadForm";

const FOOTER_LINKS = [
  { label: "Hub",             href: "/" },
  { label: "Investimentos",   href: "/investimentos" },
  { label: "Seguro de vida",  href: "/seguro" },
  { label: "Proteção médica", href: "/plenomed" },
  { label: "Internacional",   href: "/dolar" },
  { label: "Consórcio",       href: "/consorcio" },
  { label: "Sucessão",        href: "/sucessao" },
];

interface LPClosingProps {
  eyebrow: string;
  headline: string;
  body: string;
  ctaLabel: string;
  origin: string;
  disclaimer: string;
  /**
   * Canal de contato deste fechamento:
   *   - "form" (default): renderiza o formulário de lead (HubLeadForm).
   *   - "whatsapp": renderiza um bloco de CTA que abre o WhatsApp.
   */
  contact?: "form" | "whatsapp";
  /** Link do WhatsApp quando contact === "whatsapp". */
  whatsappHref?: string;
  /** Dispara `lead_form_submit` no GTM em sucesso (apenas variante "form"). */
  gtmFormPage?: string;
}

export function LPClosing({
  eyebrow,
  headline,
  body,
  ctaLabel,
  origin,
  disclaimer,
  contact = "form",
  whatsappHref,
  gtmFormPage,
}: LPClosingProps) {
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
            {contact === "whatsapp" && whatsappHref ? (
              <div className="flex flex-col gap-5">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ctaLabel}
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl text-[1.0625rem] font-semibold text-white min-h-[56px] shadow-lg transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.559 4.14 1.532 5.875L0 24l6.27-1.504A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.014-1.382l-.36-.213-3.72.892.924-3.617-.234-.37A9.804 9.804 0 012.182 12c0-5.413 4.405-9.818 9.818-9.818S21.818 6.587 21.818 12 17.413 21.818 12 21.818z" />
                  </svg>
                  {ctaLabel}
                </a>
                <p className="text-[0.9375rem] leading-relaxed max-w-[40ch]" style={{ color: "rgba(255,255,255,0.70)" }}>
                  Atendimento direto pelo WhatsApp. Resposta rápida, sem formulário.
                </p>
              </div>
            ) : (
              <HubLeadForm tone="dark" submitLabel={ctaLabel} origin={origin} gtmFormPage={gtmFormPage} />
            )}
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
