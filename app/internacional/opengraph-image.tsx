import { ImageResponse } from "next/og";

/* Imagem de compartilhamento dedicada da /blindagem.
   Gerada estaticamente no build — sem assets externos. */

export const alt =
  "Proteção patrimonial internacional em dólar · Midlej Capital";
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
          background: "linear-gradient(135deg, #233853 0%, #4a6b8c 100%)",
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
          Proteção patrimonial internacional · Em dólar
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.05,
              maxWidth: 960,
            }}
          >
            O Brasil é um risco. Seu patrimônio não precisa correr junto.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 32,
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            Patrimônio em dólar, fora do Brasil. Fora de inventário, fora de
            bloqueio, protegido da inflação.
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
              color: "#233853",
              background: "#ffffff",
              padding: "14px 30px",
              borderRadius: 12,
            }}
          >
            midlejcapital.com.br/internacional
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
