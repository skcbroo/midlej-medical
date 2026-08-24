/* ================================================================
   HeroBackdrop — camada de movimento do hero da /objetivos.

   Motivo: "trajetória rumo a um alvo" — conversa com o conceito de
   objetivos com prazo. Hairlines finas de instrumento financeiro que
   derivam devagar, uma linha de tendência ascendente, um ponto de luz
   que percorre a linha até o alvo, e um anel-alvo (única pontuação de
   oxblood, <1% da área) com pulso lento.

   Regras respeitadas (DESIGN.md):
   - Superfície ink; movimento sutil, GPU-friendly (transform/opacity/
     stroke). Nada de gradiente colorido fintech.
   - Legibilidade acima de tudo: tudo em alpha baixo, atrás do conteúdo.
   - `prefers-reduced-motion: reduce` congela TODAS as animações, deixando
     uma composição estática (linha + alvo) — sem movimento.
   - Encapsulado e reversível: para desligar, remova <HeroBackdrop/> do Hero.
   ================================================================ */

const OXBLOOD = "#9B3221"; // oklch(46% 0.115 30) — acento raro de alvo

export function HeroBackdrop() {
  // Linha de tendência ascendente (uptrend técnico), ancorada à direita
  // onde fica o alvo. Segmentos retos = registro de instrumento, não decorativo.
  const TREND = "M140 760 L360 700 L520 724 L720 560 L900 604 L1080 372 L1200 300";

  return (
    <div
      aria-hidden
      className="obj-hb absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <svg
        className="obj-hb-svg"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMaxYMid slice"
        width="100%"
        height="100%"
        role="presentation"
        focusable="false"
      >
        {/* Grade de hairlines — deriva vertical quase imperceptível */}
        <g className="obj-hb-grid" stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          <line x1="0" y1="180" x2="1400" y2="180" />
          <line x1="0" y1="330" x2="1400" y2="330" />
          <line x1="0" y1="480" x2="1400" y2="480" />
          <line x1="0" y1="630" x2="1400" y2="630" />
          <line x1="0" y1="780" x2="1400" y2="780" />
        </g>

        {/* Linha de tendência — base estática, alpha baixo */}
        <path
          d={TREND}
          fill="none"
          stroke="rgba(255,255,255,0.11)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ponto de luz que percorre a linha até o alvo */}
        <path
          className="obj-hb-comet"
          d={TREND}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Alvo — anel oxblood com pulso lento (única pontuação de cor).
            Grupo externo posiciona; interno anima só escala + opacidade. */}
        <g transform="translate(1200 300)">
          <g className="obj-hb-target" fill="none">
            <circle r="26" stroke={OXBLOOD} strokeWidth="1" opacity="0.28" />
            <circle r="14" stroke={OXBLOOD} strokeWidth="1.25" opacity="0.5" />
            <circle r="2.5" fill={OXBLOOD} stroke="none" opacity="0.7" />
          </g>
        </g>
      </svg>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .obj-hb-svg { display: block; }

            .obj-hb-comet {
              stroke-dasharray: 3 1300;
              stroke-dashoffset: 1300;
              animation: obj-hb-run 9s linear infinite;
            }
            @keyframes obj-hb-run {
              to { stroke-dashoffset: 0; }
            }

            .obj-hb-grid {
              animation: obj-hb-drift 22s ease-in-out infinite;
              will-change: transform;
            }
            @keyframes obj-hb-drift {
              0%, 100% { transform: translateY(0); }
              50%      { transform: translateY(-14px); }
            }

            .obj-hb-target {
              transform-box: fill-box;
              transform-origin: center;
              animation: obj-hb-pulse 6s ease-in-out infinite;
              will-change: transform, opacity;
            }
            @keyframes obj-hb-pulse {
              0%, 100% { transform: scale(0.92); opacity: 0.75; }
              50%      { transform: scale(1.06); opacity: 1; }
            }

            @media (prefers-reduced-motion: reduce) {
              .obj-hb-comet { animation: none; stroke-dasharray: none; stroke-dashoffset: 0; opacity: 0; }
              .obj-hb-grid,
              .obj-hb-target { animation: none; }
            }
          `,
        }}
      />
    </div>
  );
}
