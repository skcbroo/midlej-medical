/* ================================================================
   Gráfico: poder de compra do REAL vs DÓLAR desde o Plano Real (1994).
   ----------------------------------------------------------------
   Índice 100 = poder de compra de 1994. A linha mostra quanto desse
   poder de compra sobrou em cada moeda, corroído pela inflação.
   - Real:  corroído pelo IPCA acumulado (~+775% até 2026).
   - Dólar: corroído pelo CPI dos EUA (~+122% no mesmo período).
   Resultado: o real conserva ~11% do poder de compra de 1994; o
   dólar, ~45%. O real perdeu cerca de 6x mais que o dólar.

   MOBILE-FIRST: viewBox compacto (500×440) + fontes grandes em
   unidades de viewBox, para que ao escalar para a largura de um
   celular o texto continue legível (~10px+). No desktop, a largura
   é limitada (maxWidth) para o texto não ficar exagerado.
   Componente presentacional (SVG estático, sem JS) — renderiza no
   servidor. Âncoras defensáveis (IBGE/BLS); pontos intermediários
   aproximados (ver nota da seção).
   ================================================================ */

type Pt = { year: number; real: number; dolar: number };

const DATA: Pt[] = [
  { year: 1994, real: 100, dolar: 100 },
  { year: 1999, real: 69, dolar: 88 },
  { year: 2002, real: 57, dolar: 83 },
  { year: 2008, real: 43, dolar: 69 },
  { year: 2015, real: 30, dolar: 63 },
  { year: 2020, real: 23, dolar: 57 },
  { year: 2024, real: 12, dolar: 47 },
  { year: 2026, real: 11, dolar: 45 },
];

const W = 500;
const H = 440;
const PAD_L = 40;
const PAD_R = 88;
const PAD_T = 48;
const PAD_B = 54;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

const Y0 = 1994;
const Y1 = 2026;

const REAL = "#B23A48";
const DOLAR = "#2E4659";

function x(year: number) {
  return PAD_L + ((year - Y0) / (Y1 - Y0)) * PLOT_W;
}
function y(val: number) {
  return PAD_T + ((100 - val) / 100) * PLOT_H;
}
function line(key: "real" | "dolar") {
  return DATA.map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.year).toFixed(1)} ${y(d[key]).toFixed(1)}`).join(" ");
}

const last = DATA[DATA.length - 1];

export function PurchasingPowerChart() {
  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="auto"
        role="img"
        aria-label="Gráfico do poder de compra do real e do dólar desde 1994. O real conserva cerca de 11% do poder de compra de 1994; o dólar, cerca de 45%."
        style={{ display: "block", width: "100%", maxWidth: 560, margin: "0 auto" }}
      >
        {/* Gridlines horizontais + rótulos do eixo Y */}
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={PAD_L} x2={PAD_L + PLOT_W} y1={y(v)} y2={y(v)} stroke="#EDEFF2" strokeWidth={1} />
            <text
              x={PAD_L - 8}
              y={y(v) + 5}
              textAnchor="end"
              fontSize={16}
              fill="#9BA8B5"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {v}
            </text>
          </g>
        ))}

        {/* Rótulos do eixo X (anos) */}
        {DATA.map((d) => (
          <text
            key={d.year}
            x={x(d.year)}
            y={PAD_T + PLOT_H + 28}
            textAnchor="middle"
            fontSize={15}
            fill="#9BA8B5"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {d.year === 1994 ? "1994" : `’${String(d.year).slice(2)}`}
          </text>
        ))}

        {/* Área entre as moedas (o "prêmio" de estar em dólar) */}
        <path
          d={`${line("dolar")} L ${x(last.year).toFixed(1)} ${y(last.real).toFixed(1)} ${DATA.slice()
            .reverse()
            .map((d) => `L ${x(d.year).toFixed(1)} ${y(d.real).toFixed(1)}`)
            .join(" ")} Z`}
          fill={DOLAR}
          fillOpacity={0.05}
        />

        {/* Linhas */}
        <path d={line("real")} fill="none" stroke={REAL} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
        <path d={line("dolar")} fill="none" stroke={DOLAR} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />

        {/* Pontos nos marcos */}
        {DATA.map((d) => (
          <g key={`p-${d.year}`}>
            <circle cx={x(d.year)} cy={y(d.dolar)} r={3.6} fill={DOLAR} />
            <circle cx={x(d.year)} cy={y(d.real)} r={3.6} fill={REAL} />
          </g>
        ))}

        {/* Rótulos finais diretos (dispensam legenda separada) */}
        <g>
          <text x={x(last.year) + 12} y={y(last.dolar) - 3} fontSize={19} fontWeight={700} fill={DOLAR}>
            Dólar
          </text>
          <text x={x(last.year) + 12} y={y(last.dolar) + 17} fontSize={16} fill={DOLAR} fillOpacity={0.7} style={{ fontVariantNumeric: "tabular-nums" }}>
            ~45%
          </text>
        </g>
        <g>
          <text x={x(last.year) + 12} y={y(last.real) + 2} fontSize={19} fontWeight={700} fill={REAL}>
            Real
          </text>
          <text x={x(last.year) + 12} y={y(last.real) + 22} fontSize={16} fill={REAL} fillOpacity={0.85} style={{ fontVariantNumeric: "tabular-nums" }}>
            ~11%
          </text>
        </g>

        {/* Base */}
        <text x={PAD_L} y={PAD_T - 16} textAnchor="start" fontSize={14} fill="#6B7B8D">
          Base 1994 = 100
        </text>
      </svg>
    </figure>
  );
}
