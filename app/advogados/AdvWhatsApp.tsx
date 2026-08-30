"use client";

import { ADVOGADOS_WHATSAPP_HREF } from "@/lib/leadConstants";
import { pushEvent, readUtms } from "@/lib/analytics";

/**
 * Botão/CTA de WhatsApp da LP /advogados. Esta página NÃO tem formulário —
 * a conversão é o clique no WhatsApp, então é ele que precisa ser medido.
 *
 * ⚠️ TRACKING — não quebrar:
 *   - O `href` é um link wa.me real (target=_blank). É esse clique de link
 *     que o GTM já captura e converte em "Lead WhatsApp" no Google Ads —
 *     exatamente o mesmo mecanismo das outras LPs (nenhuma delas empurra o
 *     evento por código; o gatilho do GTM é a URL wa.me).
 *   - Além disso, empurramos `lead_whatsapp` no dataLayer com
 *     `form_page: "advogados"` (mesma convenção de `form_page` que o
 *     `lead_form_submit` usa), enriquecido com UTMs, para o GA4/Ads terem
 *     um sinal de evento explícito desta página.
 */
export function AdvWhatsApp({
  children,
  variant = "teal",
  block = false,
  location,
  className,
}: {
  children: React.ReactNode;
  variant?: "teal" | "gold" | "outline" | "green";
  block?: boolean;
  location: string; // onde na página o botão está (hero, meio, final, nav…)
  className?: string;
}) {
  const variantClass =
    variant === "teal"
      ? "adv-btn adv-btn--teal"
      : variant === "gold"
        ? "adv-btn adv-btn--gold"
        : variant === "green"
          ? "adv-btn adv-btn--whats"
          : "adv-btn adv-btn--outline";

  function handleClick() {
    pushEvent("lead_whatsapp", { form_page: "advogados", location, ...readUtms() });
  }

  return (
    <a
      href={ADVOGADOS_WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${variantClass}${block ? " adv-btn--block" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </a>
  );
}

/** Ícone WhatsApp reutilizável (herda currentColor). */
export function WhatsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.559 4.14 1.532 5.875L0 24l6.27-1.504A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.014-1.382l-.36-.213-3.72.892.924-3.617-.234-.37A9.804 9.804 0 012.182 12c0-5.413 4.405-9.818 9.818-9.818S21.818 6.587 21.818 12 17.413 21.818 12 21.818z" />
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}
