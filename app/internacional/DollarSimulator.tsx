"use client";

import { useState } from "react";

/* ================================================================
   Simulador interativo: "quanto valia X há 15 anos vs hoje".
   ----------------------------------------------------------------
   Janela dos ÚLTIMOS 15 ANOS (2011 → hoje). O visitante arrasta um
   valor. Mostramos, lado a lado e sem juros — só o efeito da MOEDA:
     • dolarizado = valor × (câmbio hoje / câmbio 2011) ≈ ×3,2;
     • em real    = o mesmo número, corroído no poder de compra.
   Deixa tangível a "força da moeda" que o gráfico demonstra.
   Números defensáveis; sem promessa de retorno (é só câmbio).
   ================================================================ */

const START_YEAR = 2011; // 15 anos atrás
const RATE_START = 1.7; // USD/BRL aprox. em 2011
const RATE_HOJE = 5.4; // USD/BRL aprox. hoje
const MULT = RATE_HOJE / RATE_START; // ≈ 3,18× só pelo câmbio
const IPCA_FATOR = 2.3; // R$1 de 2011 precisa de ~R$2,30 hoje p/ mesmo poder de compra

const MIN = 1_000;
const MAX = 500_000;
const STEP = 1_000;

const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

export function DollarSimulator() {
  const [valor, setValor] = useState(10_000);

  const dolarizado = valor * MULT; // valor nominal hoje, em reais
  const diferenca = dolarizado - valor;
  const poderReal = valor / IPCA_FATOR; // poder de compra hoje, em moeda de 2011

  const pct = ((valor - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="rounded-2xl border border-[#EDEFF2] bg-white p-6 md:p-9">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
        <div>
          <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-2" style={{ color: "#4a6b8c" }}>
            Simule você mesmo · arraste o valor
          </p>
          <h3 className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold leading-[1.2] tracking-tight max-w-[24ch]" style={{ color: "#2E4659" }}>
            Se você tivesse esse valor há 15 anos, onde ele estaria melhor hoje?
          </h3>
        </div>
        <div className="shrink-0">
          <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-1" style={{ color: "#9BA8B5" }}>
            Valor em {START_YEAR}
          </p>
          <p className="text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-none tabular-nums" style={{ color: "#2E4659" }}>
            {brl(valor)}
          </p>
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
        aria-label="Valor em reais em 1994"
        className="w-full cursor-pointer appearance-none bg-transparent"
        style={{
          height: 8,
          borderRadius: 999,
          background: `linear-gradient(to right, #4a6b8c 0%, #4a6b8c ${pct}%, #EDEFF2 ${pct}%, #EDEFF2 100%)`,
        }}
      />
      <div className="flex justify-between mt-2 text-[0.72rem]" style={{ color: "#9BA8B5" }}>
        <span>{brl(MIN)}</span>
        <span>{brl(MAX)}</span>
      </div>

      {/* Resultados */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Dolarizado */}
        <div className="col-span-full sm:col-span-6 rounded-xl p-6" style={{ backgroundColor: "#233853" }}>
          <p className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
            Se tivesse convertido em dólar
          </p>
          <p className="text-[clamp(2rem,4.5vw,3rem)] font-light leading-none tabular-nums text-white">
            {brl(dolarizado)}
          </p>
          <p className="mt-3 text-[0.85rem] leading-[1.5]" style={{ color: "rgba(255,255,255,0.65)" }}>
            Só pela força da moeda, multiplicou por <strong className="text-white">{MULT.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}×</strong> — sem contar nenhum juro.
          </p>
        </div>
        {/* Em real */}
        <div className="col-span-full sm:col-span-6 rounded-xl p-6 border" style={{ backgroundColor: "#F5F7FA", borderColor: "#EDEFF2" }}>
          <p className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase mb-3" style={{ color: "#B23A48" }}>
            Se tivesse ficado em real
          </p>
          <p className="text-[clamp(2rem,4.5vw,3rem)] font-light leading-none tabular-nums" style={{ color: "#2E4659" }}>
            {brl(valor)}
          </p>
          <p className="mt-3 text-[0.85rem] leading-[1.5]" style={{ color: "#6B7B8D" }}>
            O mesmo número — mas hoje compra o que <strong style={{ color: "#B23A48" }}>{brl(poderReal)}</strong> compravam em {START_YEAR}.
          </p>
        </div>
      </div>

      <p className="mt-6 text-[0.9375rem] leading-[1.5] text-center md:text-left" style={{ color: "#2E4659" }}>
        <span style={{ color: "#B23A48" }}>*</span> Ficar em dólar teria preservado{" "}
        <strong>{brl(diferenca)}</strong> a mais — apenas por causa da moeda.
      </p>
      <p className="mt-3 text-[0.72rem] leading-[1.55]" style={{ color: "#9BA8B5" }}>
        Simulação ilustrativa dos últimos 15 anos, sem considerar juros de nenhuma aplicação. Em {START_YEAR},
        US$ 1,00 ≈ R$ {RATE_START.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}; hoje, US$ 1,00 ≈
        R$ {RATE_HOJE.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}. Poder de compra estimado pela
        inflação acumulada do IPCA no período. Câmbio passado não garante câmbio futuro.
      </p>
    </div>
  );
}
