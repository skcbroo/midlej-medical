"use client";

import { useState, useEffect } from "react";

const GOLD = "#B89840";

export function OrgCard() {
  const [phase, setPhase] = useState<"q" | "fade" | "done">("q");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fade"), 900);
    const t2 = setTimeout(() => setPhase("done"), 1250);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes cfoFadeOut { from { opacity:1 } to { opacity:0 } }
        @keyframes cfoFadeIn  { from { opacity:0 } to { opacity:1 } }
        @media (prefers-reduced-motion: reduce) { .cfo-animate { animation:none !important } }
      `}</style>

      <div
        className="rounded-xl overflow-hidden shadow-xl w-full max-w-[300px]"
        style={{ backgroundColor: "white", border: "1px solid #EDEFF2" }}
      >
        <div
          className="px-5 py-3 text-[0.6rem] font-semibold tracking-[0.2em] uppercase"
          style={{ backgroundColor: "#F5F7FA", color: "#6B7B8D", borderBottom: "1px solid #EDEFF2" }}
        >
          Organograma · Sua vida financeira
        </div>

        <div className="px-5 py-6 flex flex-col gap-3">
          <div className="rounded-lg px-5 py-4 flex items-center gap-3" style={{ backgroundColor: "#2E4659" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.70)" }}>
              CEO
            </div>
            <div>
              <p className="text-[0.6rem] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.50)" }}>Posição</p>
              <p className="text-base font-bold text-white">Você</p>
            </div>
          </div>

          <div className="rounded-lg px-5 py-4 flex items-center gap-3" style={{ border: `2px dashed ${GOLD}`, backgroundColor: `${GOLD}10` }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${GOLD}20`, color: GOLD }}>
              CFO
            </div>
            <div>
              <p className="text-[0.6rem] font-semibold tracking-widest uppercase" style={{ color: GOLD }}>Posição</p>
              <div className="relative h-6">
                <span
                  className="cfo-animate absolute inset-0 text-base font-bold flex items-center"
                  style={{
                    color: GOLD,
                    opacity: phase === "done" ? 0 : 1,
                    animation: phase === "fade" ? "cfoFadeOut 0.35s ease-in-out forwards" : "none",
                  }}
                >?</span>
                <span
                  className="cfo-animate absolute inset-0 text-base font-bold flex items-center"
                  style={{
                    color: "#2E4659",
                    opacity: phase === "done" ? 1 : 0,
                    animation: phase === "done" ? "cfoFadeIn 0.35s ease-in-out forwards" : "none",
                  }}
                >Midlej</span>
              </div>
            </div>
          </div>

          <p className="text-[0.78rem] leading-[1.55] mt-1 text-center italic" style={{ color: "#6B7B8D" }}>
            A cadeira de CEO está ocupada. A de CFO, quase nunca.{" "}
            <span style={{ color: "#2E4659", fontStyle: "normal", fontWeight: 600 }}>É ela que a gente preenche.</span>
          </p>
        </div>
      </div>
    </>
  );
}
