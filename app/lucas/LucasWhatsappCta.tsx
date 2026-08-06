"use client";

import { useEffect, useState } from "react";
import { buildLucasWhatsappHref, LUCAS_WHATSAPP_HREF } from "@/lib/leadConstants";

type Variant = "solid" | "outline" | "accent";

type Props = {
  source: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

/**
 * CTA de WhatsApp da /lucas. Renderiza no servidor com o href base
 * (mensagem pré-preenchida) e, após a hidratação, reescreve o link
 * anexando as UTMs da URL — para que a origem (bio do Instagram,
 * campanha) viaje para dentro da conversa. Nenhum botão flutuante:
 * o <WhatsAppFloat/> global já cobre isso no layout.
 */
export function LucasWhatsappCta({
  source,
  children,
  variant = "solid",
  className = "",
}: Props) {
  const [href, setHref] = useState(LUCAS_WHATSAPP_HREF);

  useEffect(() => {
    setHref(buildLucasWhatsappHref(source, window.location.search));
  }, [source]);

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium tracking-wide transition-colors";
  const styles =
    variant === "solid"
      ? "bg-foreground text-background hover:bg-accent"
      : variant === "accent"
        ? "bg-accent text-accent-foreground hover:opacity-90"
        : "border border-border text-foreground hover:bg-secondary";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <WhatsappGlyph />
      {children}
    </a>
  );
}

function WhatsappGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[1.15em] w-[1.15em]"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.966 1.164-.198.199-.396.223-.693.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.174-.297-.019-.458.13-.606.132-.132.297-.347.446-.52.15-.174.199-.298.298-.497.099-.198.05-.371-.05-.52-.099-.149-.669-1.612-.916-2.207-.242-.579-.487-.487-.669-.497-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.36-.214-3.742.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.437-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.886-9.886 9.886m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
    </svg>
  );
}
