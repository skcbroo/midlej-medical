"use client";
import { useState } from "react";

export function parseNum(v: string): number {
  let clean = String(v).trim();
  if (clean.includes(",")) clean = clean.replace(/\./g, "").replace(",", ".");
  const n = parseFloat(clean);
  return isNaN(n) ? 0 : n;
}

const fmtInputBRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

export function FLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-semibold text-[#9AA0B2] uppercase tracking-widest mb-1.5">{children}</div>;
}

export function FSectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-bold text-[#1F2A44] mb-4 uppercase tracking-wider">{children}</div>;
}

export function FCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-[#E3E4E7] rounded-2xl shadow-sm p-5 ${className}`}>
      {children}
    </div>
  );
}

export function FInput({ value, onChange, placeholder, prefix, suffix, currency = false }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  currency?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const parsed = parseNum(value);
  const displayValue = currency && !focused && value !== "" && parsed !== 0 ? fmtInputBRL(parsed) : value;

  return (
    <div className="relative flex items-center">
      {prefix && <span className="absolute left-3 text-sm font-semibold text-[#9AA0B2] pointer-events-none">{prefix}</span>}
      <input
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        inputMode="decimal"
        className={[
          "w-full border border-[#E3E4E7] rounded-lg py-2 text-sm text-[#1F2A44] bg-[#FAFAFB]",
          "focus:outline-none focus:border-[#C4A664] focus:ring-2 focus:ring-[#C4A664]/20 transition placeholder-[#C4C7D0]",
          prefix ? "pl-7 pr-3" : suffix ? "pl-3 pr-8" : "px-3",
        ].join(" ")}
      />
      {suffix && <span className="absolute right-3 text-sm font-semibold text-[#9AA0B2] pointer-events-none">{suffix}</span>}
    </div>
  );
}

export function MetricCard({ label, value, sub, accent = false, color }: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  color?: string;
}) {
  const borderColor = color || (accent ? "#C4A664" : "#E3E4E7");
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm" style={{ borderColor, borderTopWidth: 3, borderTopColor: borderColor }}>
      <div className="text-[9px] font-semibold text-[#9AA0B2] uppercase tracking-widest mb-1">{label}</div>
      <div className="text-xl font-bold font-mono" style={{ color: color || "#1F2A44" }}>{value}</div>
      {sub && <div className="text-[10px] text-[#9AA0B2] mt-1">{sub}</div>}
    </div>
  );
}

export function CostRow({ label, value, sub, highlight, valueColor }: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  valueColor?: string;
}) {
  return (
    <div className={`flex items-center justify-between py-2.5 border-b border-[#F0F1F4] last:border-0 ${highlight ? "bg-[#FFFDF7] -mx-4 px-4 rounded" : ""}`}>
      <div>
        <div className="text-xs font-semibold text-[#1F2A44]">{label}</div>
        {sub && <div className="text-[10px] text-[#9AA0B2]">{sub}</div>}
      </div>
      <div className="text-sm font-bold font-mono ml-4 text-right" style={{ color: valueColor || "#1F2A44" }}>{value}</div>
    </div>
  );
}

export function ModalidadeToggle({ value, onChange }: { value: "final" | "semestral"; onChange: (v: "final" | "semestral") => void }) {
  return (
    <div>
      <FLabel>Pagamento de juros</FLabel>
      <div className="flex rounded-lg overflow-hidden border border-[#E3E4E7] text-[10px] font-bold">
        <button
          onClick={() => onChange("final")}
          className={["flex-1 px-3 py-1.5 transition", value === "final" ? "bg-[#233853] text-white" : "bg-white text-[#9AA0B2] hover:bg-[#F7F7F8]"].join(" ")}
        >
          Ao final
        </button>
        <button
          onClick={() => onChange("semestral")}
          className={["flex-1 px-3 py-1.5 transition border-l border-[#E3E4E7]", value === "semestral" ? "bg-[#233853] text-white" : "bg-white text-[#9AA0B2] hover:bg-[#F7F7F8]"].join(" ")}
        >
          Semestral
        </button>
      </div>
    </div>
  );
}
