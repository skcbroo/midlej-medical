/**
 * Régua de tempo do bloco "O efeito do tempo" (/legacy).
 *
 * ⚠️ SPEC FECHADO — normativo §6. Este componente só é publicável como
 * está. Qualquer desvio vira projeção de rentabilidade.
 *
 * O que ele mede: NÚMERO DE REVISÕES ANUAIS pela frente. Nada mais.
 *   começando aos 2  → revisões aos 3, 4, … 18 = 16
 *   começando aos 15 → revisões aos 16, 17, 18 = 3
 * Ambos os números são verificáveis por aritmética simples.
 *
 * PROIBIDO neste desenho, sem exceção:
 *   · qualquer valor em reais, em qualquer eixo ou legenda;
 *   · qualquer percentual;
 *   · qualquer curva, barra ou área ASCENDENTE (sugeriria acúmulo).
 * Por isso os ticks têm todos a MESMA altura e as duas linhas são
 * horizontais: o que varia é a QUANTIDADE de marcas, nunca o tamanho
 * delas. Teste de aprovação: se der para inferir quanto dinheiro
 * existirá no fim, o bloco está errado e volta para o branding.
 *
 * As legendas ficam dentro do SVG em corpo grande de propósito: em
 * viewBox estreito elas sobrevivem à redução no mobile.
 */

const PAPER = "oklch(96.8% 0.010 78)";
const ON_INK_SOFT = "oklch(96.8% 0.010 78 / 0.68)";
const ON_INK_MUTE = "oklch(96.8% 0.010 78 / 0.45)";
const LINE_ON_INK = "oklch(96.8% 0.010 78 / 0.22)";
const OXBLOOD_LIGHT = "oklch(62% 0.130 30)";

const X0 = 30;
const X18 = 420;
const STEP = (X18 - X0) / 18;
const x = (age: number) => X0 + age * STEP;

const ROW_A_Y = 62;
const ROW_B_Y = 128;
const AXIS_Y = 180;
const TICK = 17;

/* A legenda de cada linha fica ancorada ao INÍCIO dela. Quando o início
   cai na metade direita da régua (caso da linha de 15 anos), o texto
   corrido para a direita atropelava o contador. Nesse caso alinhamos a
   legenda pela direita, no fim da régua. */
function Row({
  y,
  from,
  count,
  label,
}: {
  y: number;
  from: number;
  count: number;
  label: string;
}) {
  const alignEnd = x(from) > (X0 + X18) / 2;
  // Uma marca por revisão anual: idades from+1 … 18.
  const ticks = Array.from({ length: count }, (_, i) => from + 1 + i);
  return (
    <g>
      {/* Trilho horizontal. Horizontal por exigência do spec. */}
      <line x1={x(from)} y1={y} x2={X18} y2={y} stroke={LINE_ON_INK} strokeWidth="1" />
      {/* Marca de início */}
      <rect x={x(from) - 3} y={y - 3} width="6" height="6" fill={PAPER} />
      {/* Uma marca por revisão. Todas com a MESMA altura. */}
      {ticks.map((age) => (
        <line
          key={age}
          x1={x(age)}
          y1={y}
          x2={x(age)}
          y2={y - TICK}
          stroke={OXBLOOD_LIGHT}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      <text
        x={alignEnd ? X18 : x(from)}
        y={y + 18}
        fontSize="12.5"
        fill={ON_INK_MUTE}
        letterSpacing="0.02em"
        textAnchor={alignEnd ? "end" : "start"}
      >
        {label}
      </text>
      <text x={450} y={y - 4} fontSize="30" fontWeight="600" fill={PAPER} letterSpacing="-0.02em">
        {count}
      </text>
      <text x={450} y={y + 13} fontSize="12.5" fill={ON_INK_SOFT} letterSpacing="0.02em">
        {count === 1 ? "revisão" : "revisões"}
      </text>
    </g>
  );
}

export function ReguaTempo() {
  const years = Array.from({ length: 19 }, (_, i) => i);

  return (
    <svg
      // altura 216 (e não 200): a legenda do eixo fica em y=204 e estava
      // sendo cortada pela borda do viewBox.
      viewBox="0 0 560 216"
      className="w-full h-auto"
      role="img"
      aria-label="Régua de 0 a 18 anos. Começando aos 2 anos existem dezesseis revisões anuais pela frente. Começando aos 15 anos existem três."
    >
      <Row y={ROW_A_Y} from={2} count={16} label="início aos 2 anos" />
      <Row y={ROW_B_Y} from={15} count={3} label="início aos 15 anos" />

      {/* Eixo de idade. Só anos. Nenhum eixo de valor existe neste desenho. */}
      <line x1={X0} y1={AXIS_Y} x2={X18} y2={AXIS_Y} stroke={LINE_ON_INK} strokeWidth="1" />
      {years.map((age) => (
        <line
          key={age}
          x1={x(age)}
          y1={AXIS_Y}
          x2={x(age)}
          y2={AXIS_Y + (age % 6 === 0 ? 7 : 4)}
          stroke={LINE_ON_INK}
          strokeWidth="1"
        />
      ))}
      <text x={X0} y={AXIS_Y + 24} fontSize="12.5" fill={ON_INK_MUTE}>
        0
      </text>
      <text x={X18} y={AXIS_Y + 24} fontSize="12.5" fill={ON_INK_MUTE} textAnchor="end">
        18 anos
      </text>
    </svg>
  );
}
