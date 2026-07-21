/* ================================================================
   Ponte JK estilizada — plano de fundo do hero da /raiox.
   Line art dos três arcos, ancorando a marca em Brasília.

   Movimento (puro CSS/SVG, sem JS — o componente é de servidor):
     1. desenho: os traços se desenham na entrada (stroke-dashoffset);
     2. varredura: um facho de luz percorre a ponte em loop;
     3. reflexo: a lâmina d'água oscila devagar.
   Tudo suspenso sob `prefers-reduced-motion: reduce`.
   ================================================================ */

/* viewBox alto (1200×700) para a ponte ocupar o hero inteiro: com um
   viewBox baixo ela ficava presa no rodapé da seção e sumia da dobra. */
const DECK_Y = 520;
const WATER_Y = 600;

type Arco = { x0: number; x2: number; cx: number; cy: number };

/* cy = 2·apex − deck (o ápice da quadrática fica na média ponderada) */
const ARCOS: Arco[] = [
  { x0: 60, x2: 440, cx: 250, cy: -80 },
  { x0: 400, x2: 800, cx: 600, cy: -140 },
  { x0: 760, x2: 1140, cx: 950, cy: -80 },
];

const pontoQuad = (a: number, b: number, c: number, t: number) =>
  (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;

const caminhoArco = (a: Arco) =>
  `M ${a.x0} ${DECK_Y} Q ${a.cx} ${a.cy} ${a.x2} ${DECK_Y}`;

/* Pendurais: da curva até o tabuleiro, em posições regulares. */
const TS = [0.16, 0.28, 0.4, 0.52, 0.64, 0.76, 0.88];

export function PonteJK() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] select-none overflow-hidden"
    >
      <style>{`
        .pjk-traco {
          stroke-dasharray: var(--len, 1400);
          stroke-dashoffset: var(--len, 1400);
          animation: pjk-desenha 2.6s cubic-bezier(.22,.61,.36,1) forwards;
        }
        .pjk-cabo   { opacity: 0; animation: pjk-surge .9s ease-out forwards; }
        .pjk-sweep  { animation: pjk-varre 7s linear infinite; }
        .pjk-agua   { animation: pjk-onda 9s ease-in-out infinite; }

        @keyframes pjk-desenha { to { stroke-dashoffset: 0; } }
        @keyframes pjk-surge   { to { opacity: 1; } }
        @keyframes pjk-varre {
          from { transform: translateX(-420px); }
          to   { transform: translateX(1260px); }
        }
        @keyframes pjk-onda {
          0%,100% { opacity: .16; transform: translateY(0); }
          50%     { opacity: .30; transform: translateY(2px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .pjk-traco { animation: none; stroke-dashoffset: 0; }
          .pjk-cabo  { animation: none; opacity: 1; }
          .pjk-sweep { display: none; }
          .pjk-agua  { animation: none; opacity: .2; }
        }
      `}</style>

      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full block"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient id="pjk-facho" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000" />
            <stop offset="0.5" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id="pjk-mascara" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="700">
            <rect
              className="pjk-sweep"
              x="0"
              y="0"
              width="420"
              height="700"
              fill="url(#pjk-facho)"
            />
          </mask>
          {/* Esmaece no topo (atrás do título) e na base (funde ao gradiente) */}
          <linearGradient id="pjk-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
            <stop offset="0.32" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="0.78" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="pjk-base" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="700">
            <rect x="0" y="0" width="1200" height="700" fill="url(#pjk-fade)" />
          </mask>
        </defs>

        <g mask="url(#pjk-base)">
          {/* ── camada base ── */}
          <g fill="none" stroke="#8FB3D4" strokeLinecap="round" opacity="0.34">
            {/* tabuleiro */}
            <line
              className="pjk-traco"
              style={{ ["--len" as string]: 1200, animationDelay: "0.1s" }}
              x1="0"
              y1={DECK_Y}
              x2="1200"
              y2={DECK_Y}
              strokeWidth="2"
            />

            {ARCOS.map((a, i) => (
              <g key={i}>
                <path
                  className="pjk-traco"
                  style={{ ["--len" as string]: 1100, animationDelay: `${0.25 + i * 0.22}s` }}
                  d={caminhoArco(a)}
                  strokeWidth="2.4"
                />
                {TS.map((t) => {
                  const x = pontoQuad(a.x0, a.cx, a.x2, t);
                  const y = pontoQuad(DECK_Y, a.cy, DECK_Y, t);
                  return (
                    <line
                      key={t}
                      className="pjk-cabo"
                      style={{ animationDelay: `${1.0 + i * 0.22 + t * 0.5}s` }}
                      x1={x}
                      y1={y}
                      x2={x}
                      y2={DECK_Y}
                      strokeWidth="0.9"
                      opacity="0.75"
                    />
                  );
                })}
                {/* pilar na nascença do arco */}
                <line
                  className="pjk-cabo"
                  style={{ animationDelay: `${1.2 + i * 0.22}s` }}
                  x1={a.x0}
                  y1={DECK_Y}
                  x2={a.x0}
                  y2={WATER_Y}
                  strokeWidth="1.6"
                />
              </g>
            ))}
            <line
              className="pjk-cabo"
              style={{ animationDelay: "1.9s" }}
              x1={ARCOS[2].x2}
              y1={DECK_Y}
              x2={ARCOS[2].x2}
              y2={WATER_Y}
              strokeWidth="1.6"
            />
          </g>

          {/* ── lâmina d'água ── */}
          <g className="pjk-agua">
            <line x1="0" y1={WATER_Y} x2="1200" y2={WATER_Y} stroke="#8FB3D4" strokeWidth="1" opacity="0.5" />
            <g fill="none" stroke="#8FB3D4" strokeWidth="1.4" opacity="0.35">
              {ARCOS.map((a, i) => (
                <path
                  key={i}
                  d={`M ${a.x0} ${WATER_Y + 18} Q ${a.cx} ${WATER_Y + 18 + (DECK_Y - a.cy) * 0.22} ${a.x2} ${WATER_Y + 18}`}
                />
              ))}
            </g>
          </g>

          {/* ── facho de luz percorrendo a estrutura ── */}
          <g
            mask="url(#pjk-mascara)"
            fill="none"
            stroke="#DCE8F0"
            strokeLinecap="round"
            opacity="0.85"
          >
            <line x1="0" y1={DECK_Y} x2="1200" y2={DECK_Y} strokeWidth="2" />
            {ARCOS.map((a, i) => (
              <path key={i} d={caminhoArco(a)} strokeWidth="2.4" />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
