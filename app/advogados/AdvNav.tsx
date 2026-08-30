"use client";

import { useEffect, useState } from "react";
import { AdvWhatsApp } from "./AdvWhatsApp";

/**
 * Navbar fixa da /advogados (Nexos). Muda opacidade/blur no scroll e
 * abre um menu slide-in no mobile. Links usam âncoras # — o SmoothAnchor
 * global cuida do scroll suave com offset. O CTA é o WhatsApp (esta página
 * não tem formulário), medido pelo componente AdvWhatsApp.
 */
const LINKS = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#por-que", label: "Por que a Nexos" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function AdvNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`adv-nav${scrolled ? " adv-nav--scrolled" : ""}`} aria-label="Principal">
        <div className="adv-container adv-nav__inner">
          <a href="#topo" className="adv-logo" aria-label="Nexos Ativos — início">
            <span className="adv-logo__mark" aria-hidden />
            <span>
              <em>NEXOS</em> ATIVOS
            </span>
          </a>

          <div className="adv-nav__links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>

          <AdvWhatsApp variant="teal" location="nav" className="adv-nav__cta">
            Quero uma proposta
          </AdvWhatsApp>

          <button
            type="button"
            className="adv-burger"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="adv-mobilemenu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        id="adv-mobilemenu"
        className={`adv-mobilemenu${open ? " adv-mobilemenu--open" : ""}`}
      >
        <div className="adv-mobilemenu__list" onClick={() => setOpen(false)}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <AdvWhatsApp variant="green" block location="nav-mobile">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              Falar no WhatsApp
            </span>
          </AdvWhatsApp>
        </div>
      </div>
    </>
  );
}
