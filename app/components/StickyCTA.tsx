/**
 * Barra fixa de CTA no rodapé — visível somente no mobile (md:hidden).
 *
 * Usada no teste de canal de contato:
 *   - /plenomed → leva ao WhatsApp (external)
 *   - /cfo e /dolar → leva ao formulário de contato (#contato)
 *
 * Acessibilidade: aria-label explícito e alvo de toque >= 44px (min-h-[52px]).
 */
export function StickyCTA({
  label,
  href,
  external = false,
  variant = "brand",
}: {
  label: string;
  href: string;
  external?: boolean;
  variant?: "brand" | "whatsapp";
}) {
  const bg = variant === "whatsapp" ? "#25D366" : "#4a6b8c";
  const hover = variant === "whatsapp" ? "hover:brightness-95" : "hover:bg-[#2E4659]";

  return (
    <>
      {/* Espaçador para o conteúdo não ficar encoberto pela barra fixa */}
      <div className="md:hidden h-24" aria-hidden />
      <div
        className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[#EDEFF2] bg-white/95 backdrop-blur px-4 pt-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href={href}
          aria-label={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`flex items-center justify-center gap-2 w-full min-h-[52px] px-6 rounded-lg text-[0.95rem] font-semibold text-white transition-all duration-200 ${hover}`}
          style={{ backgroundColor: bg }}
        >
          {variant === "whatsapp" && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.559 4.14 1.532 5.875L0 24l6.27-1.504A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.014-1.382l-.36-.213-3.72.892.924-3.617-.234-.37A9.804 9.804 0 012.182 12c0-5.413 4.405-9.818 9.818-9.818S21.818 6.587 21.818 12 17.413 21.818 12 21.818z" />
            </svg>
          )}
          {label}
        </a>
      </div>
    </>
  );
}
