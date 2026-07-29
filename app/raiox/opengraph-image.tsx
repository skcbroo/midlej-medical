import { ImageResponse } from "next/og";

/* Imagem de compartilhamento dedicada da /raiox (Eixo 5 da auditoria).
   Substitui o LINK.png genérico herdado da home no preview do WhatsApp.
   Gerada estaticamente no build — sem assets externos. */

export const alt =
  "Raio-X da sua carteira de investimentos · Midlej Capital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #2E4659 0%, #4a6b8c 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
            fontWeight: 600,
          }}
        >
          Consultoria de investimentos · Registro CVM
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.05,
              maxWidth: 940,
            }}
          >
            Raio-X da sua carteira de investimentos
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 32,
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.35,
              maxWidth: 880,
            }}
          >
            Onde investir sem ser a meta de vendas de alguém. Sem comissão,
            sem rebate, sem produto de prateleira.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: 1,
            }}
          >
            Midlej Capital
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              color: "#2E4659",
              background: "#ffffff",
              padding: "14px 30px",
              borderRadius: 12,
            }}
          >
            midlejcapital.com.br/raiox
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
