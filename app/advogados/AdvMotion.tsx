"use client";

import { useEffect } from "react";

/**
 * Motion controller da /advogados. Um único IntersectionObserver anima:
 *   - reveal (fade/slide-up) de qualquer `.adv-reveal` ao entrar na viewport;
 *   - counter-up de qualquer `[data-count-to]` (número real) ao aparecer.
 *
 * Placeholders de prova social (ex.: "R$ —") NÃO têm `data-count-to`, então
 * ficam estáticos. Quando o Lucas liberar os números reais, basta preencher
 * `data-count-to` / `data-count-prefix` / `data-count-suffix` no span do
 * número (ver comentários em AdvStats) e a contagem passa a animar sozinha.
 *
 * Respeita prefers-reduced-motion: mostra tudo já no estado final.
 */
export function AdvMotion() {
  useEffect(() => {
    const scope = document.querySelector(".adv-scope");
    if (!scope) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveals = Array.from(scope.querySelectorAll<HTMLElement>(".adv-reveal"));
    const counters = Array.from(scope.querySelectorAll<HTMLElement>("[data-count-to]"));

    if (reduce || typeof IntersectionObserver === "undefined") {
      reveals.forEach((el) => el.classList.add("adv-reveal--in"));
      counters.forEach((el) => {
        const to = Number(el.dataset.countTo);
        if (!Number.isNaN(to)) el.textContent = format(el, to);
      });
      return;
    }

    const revObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = Number(el.dataset.revealDelay ?? 0);
            window.setTimeout(() => el.classList.add("adv-reveal--in"), delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((el) => revObs.observe(el));

    const numObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          animate(e.target as HTMLElement);
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.4 },
    );
    counters.forEach((el) => numObs.observe(el));

    return () => {
      revObs.disconnect();
      numObs.disconnect();
    };
  }, []);

  return null;
}

function format(el: HTMLElement, n: number): string {
  const prefix = el.dataset.countPrefix ?? "";
  const suffix = el.dataset.countSuffix ?? "";
  const rounded = Math.round(n);
  return `${prefix}${rounded.toLocaleString("pt-BR")}${suffix}`;
}

function animate(el: HTMLElement) {
  const to = Number(el.dataset.countTo);
  if (Number.isNaN(to)) return;
  const duration = 1400;
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = format(el, to * eased);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
