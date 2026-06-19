"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Simulador      = dynamic(() => import("./_components/Simulador"),      { ssr: false });
const SimuladorFundo = dynamic(() => import("./_components/SimuladorFundo"), { ssr: false });
const SimuladorAnual = dynamic(() => import("./_components/SimuladorAnual"), { ssr: false });

// ─── Senha de acesso ───────────────────────────────────────────────────────
// Altere a constante abaixo para mudar a senha da página.
const ACCESS_PASSWORD = "midlej2026";
const STORAGE_KEY = "midlej_projecao_auth";

// ─── Tabs ──────────────────────────────────────────────────────────────────
const TABS = [
  { id: "cessao", label: "Simulador de Cessão",  sub: "Operação unitária"   },
  { id: "fundo",  label: "Simulador de Fundo",   sub: "Debênture + ciclos"  },
  { id: "anual",  label: "Projeção Anual",        sub: "Captação recorrente" },
] as const;

type TabId = typeof TABS[number]["id"];

// ─── Gate de senha ─────────────────────────────────────────────────────────
function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [input, setInput]   = useState("");
  const [error, setError]   = useState(false);
  const [shake, setShake]   = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === ACCESS_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "1");
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setInput("");
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F1F4] flex items-center justify-center p-6">
      <div className={`bg-white border border-[#E3E4E7] rounded-2xl shadow-lg p-8 w-full max-w-sm ${shake ? "animate-shake" : ""}`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#233853] mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div className="text-sm font-bold text-[#233853] uppercase tracking-widest">Midlej Capital</div>
          <div className="text-[10px] text-[#9AA0B2] tracking-wider mt-0.5">Simuladores Financeiros</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-semibold text-[#9AA0B2] uppercase tracking-widest mb-1.5 block">
              Senha de acesso
            </label>
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="••••••••••"
              autoFocus
              className={[
                "w-full border rounded-lg py-2.5 px-3 text-sm text-[#233853] bg-[#FAFAFB]",
                "focus:outline-none focus:ring-2 transition placeholder-[#C4C7D0]",
                error
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-[#E3E4E7] focus:border-[#C4A664] focus:ring-[#C4A664]/20",
              ].join(" ")}
            />
            {error && (
              <div className="text-[10px] text-red-500 font-semibold mt-1.5">Senha incorreta. Tente novamente.</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#233853] text-white font-bold rounded-xl py-2.5 text-sm hover:bg-[#1a2a3d] transition"
          >
            Entrar
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-5px)}
          80%{transform:translateX(5px)}
        }
        .animate-shake { animation: shake 0.45s ease; }
      `}</style>
    </div>
  );
}

// ─── Aplicação principal ───────────────────────────────────────────────────
export default function ProjecaoPage() {
  const [auth, setAuth]   = useState<boolean | null>(null);
  const [tab, setTab]     = useState<TabId>("cessao");

  useEffect(() => {
    setAuth(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  if (auth === null) return null;

  if (!auth) {
    return <PasswordGate onSuccess={() => setAuth(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F0F1F4]">
      {/* Header com abas */}
      <div className="bg-[#233853] shadow-lg">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white uppercase tracking-widest">Projeção</div>
            <div className="text-[10px] text-[#C4A664] tracking-wider mt-0.5">Simuladores financeiros · Midlej Capital</div>
          </div>

          <div className="flex gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={[
                  "px-4 py-2.5 rounded-xl text-right transition",
                  tab === t.id
                    ? "bg-[#C4A664] text-[#233853]"
                    : "text-white/50 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                <div className={`text-sm font-bold leading-tight ${tab === t.id ? "text-[#233853]" : ""}`}>{t.label}</div>
                <div className={`text-[10px] leading-tight ${tab === t.id ? "text-[#233853]/60" : "text-white/30"}`}>{t.sub}</div>
              </button>
            ))}
          </div>

          <button
            onClick={() => { localStorage.removeItem(STORAGE_KEY); setAuth(false); }}
            className="text-[10px] text-white/30 hover:text-white/60 transition ml-4"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      {tab === "cessao" ? <Simulador /> : tab === "fundo" ? <SimuladorFundo /> : <SimuladorAnual />}
    </div>
  );
}
