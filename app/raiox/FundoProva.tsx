/* ================================================================
   Fundo dinâmico da seção "Testamos todas as estratégias que
   aplicamos" (#track), que antes era um azul chapado.

   Linguagem: malha estrutural + halos de luz à deriva — mesma
   gramática de arquitetura/engenharia da Ponte JK no hero.

   ⚠️ Deliberadamente ABSTRATO. Nada de curva ascendente ou desenho
   de gráfico: esta seção exibe um número de rentabilidade real e um
   traçado subindo ao fundo poderia ser lido como representação
   daquele retorno. Luz e malha não afirmam nada.

   Puro CSS/SVG (componente de servidor). Suspenso sob
   `prefers-reduced-motion: reduce`.
   ================================================================ */

export function FundoProva() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        .fpv-halo { will-change: transform, opacity; }
        .fpv-halo-a { animation: fpv-deriva-a 26s ease-in-out infinite; }
        .fpv-halo-b { animation: fpv-deriva-b 34s ease-in-out infinite; }
        .fpv-malha  { animation: fpv-respira 18s ease-in-out infinite; }

        @keyframes fpv-deriva-a {
          0%,100% { transform: translate3d(-6%, -4%, 0) scale(1);    opacity: .55; }
          50%     { transform: translate3d(8%, 6%, 0)  scale(1.18);  opacity: .85; }
        }
        @keyframes fpv-deriva-b {
          0%,100% { transform: translate3d(6%, 8%, 0)  scale(1.12);  opacity: .45; }
          50%     { transform: translate3d(-7%, -6%, 0) scale(1);    opacity: .75; }
        }
        @keyframes fpv-respira {
          0%,100% { opacity: .30; }
          50%     { opacity: .52; }
        }

        @media (prefers-reduced-motion: reduce) {
          .fpv-halo-a, .fpv-halo-b, .fpv-malha { animation: none; }
          .fpv-halo-a { opacity: .7; }
          .fpv-halo-b { opacity: .6; }
          .fpv-malha  { opacity: .4; }
        }
      `}</style>

      {/* malha estrutural */}
      <svg className="fpv-malha absolute inset-0 w-full h-full" role="presentation" focusable="false">
        <defs>
          <pattern id="fpv-grade" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M72 0H0V72" fill="none" stroke="#8FB3D4" strokeWidth="0.6" />
          </pattern>
          <linearGradient id="fpv-esmaece" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="0.55" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="fpv-mascara">
            <rect width="100%" height="100%" fill="url(#fpv-esmaece)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#fpv-grade)" mask="url(#fpv-mascara)" />
      </svg>

      {/* halos de luz à deriva */}
      <div
        className="fpv-halo fpv-halo-a absolute"
        style={{
          top: "-25%",
          left: "-10%",
          width: "70%",
          height: "120%",
          background:
            "radial-gradient(closest-side, rgba(143,179,212,0.30) 0%, rgba(143,179,212,0) 100%)",
        }}
      />
      <div
        className="fpv-halo fpv-halo-b absolute"
        style={{
          bottom: "-30%",
          right: "-12%",
          width: "65%",
          height: "115%",
          background:
            "radial-gradient(closest-side, rgba(74,107,140,0.55) 0%, rgba(74,107,140,0) 100%)",
        }}
      />
    </div>
  );
}
