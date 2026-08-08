import { z } from "zod";

/**
 * Store compartilhado do Painel Comercial (/dash).
 *
 * Todo o estado do painel vive como UM único JSON string sob a chave
 * "dash:comercial:v1" num KV compatível com a REST API do Upstash
 * (Vercel KV / Upstash Redis). Falamos com ele por fetch puro — sem SDK —
 * usando duas env vars injetadas pelo Vercel ao criar o storage:
 *   KV_REST_API_URL   e   KV_REST_API_TOKEN
 *
 * Degradação graciosa: se as env vars NÃO existirem (store ainda não
 * provisionado), a LEITURA devolve null (o cliente cai no exemplo do data.js)
 * e a ESCRITA responde 503. Nada aqui pode quebrar o build nem a página por
 * falta de env — por isso lemos process.env sempre em runtime, nunca no topo.
 *
 * Leitura: PÚBLICA (o painel é público). Escrita: exige a senha em
 * DASH_EDIT_PASSWORD, comparada server-side. A senha nunca vai ao cliente.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KEY = "dash:comercial:v1";

/* ---- validação do corpo (POST) ---- */
const num = z.coerce.number();
// [semana, consultor, canal, tipo, topo, meio, agen, real, vendas, receita, speed]
const rawRow = z.tuple([
  num, // semana (índice)
  z.string(), // consultor
  z.string(), // canal
  z.string(), // tipo (out/in)
  num, // topo
  num, // meio
  num, // agen
  num, // real
  num, // vendas
  num, // receita
  z.union([z.null(), z.coerce.number()]), // speed (null = sem valor)
]);

const dashSchema = z.object({
  consultores: z.array(z.string()),
  semanas: z.array(z.string()),
  metas: z.object({
    leadsSemana: num,
    receitaMes: num,
    reunioesSemana: num,
    porConsultor: z.record(z.string(), num),
  }),
  bench: z.record(z.string(), z.any()),
  raw: z.array(rawRow),
  updatedAt: z.string().optional(),
});

/* ---- config do KV lida em runtime ---- */
function kvConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/+$/, ""), token };
}

async function kvCommand(
  cfg: { url: string; token: string },
  command: unknown[],
): Promise<unknown> {
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`KV HTTP ${res.status}`);
  }
  const data = (await res.json()) as { result?: unknown; error?: string };
  if (data && typeof data === "object" && "error" in data && data.error) {
    throw new Error(`KV: ${data.error}`);
  }
  return data?.result ?? null;
}

const READ_HEADERS = {
  "x-robots-tag": "noindex, nofollow",
  "Cache-Control": "no-store",
};

/* ================= GET — leitura pública ================= */
export async function GET(): Promise<Response> {
  const cfg = kvConfig();
  // Sem store configurado: devolve null; o cliente usa o exemplo do data.js.
  if (!cfg) return Response.json(null, { headers: READ_HEADERS });

  try {
    const result = await kvCommand(cfg, ["GET", KEY]);
    if (result == null) return Response.json(null, { headers: READ_HEADERS });
    const parsed = typeof result === "string" ? JSON.parse(result) : result;
    return Response.json(parsed, { headers: READ_HEADERS });
  } catch (err) {
    console.error("[dash/data GET]", err instanceof Error ? err.message : err);
    // Nunca quebra a página — fallback para o exemplo local.
    return Response.json(null, { headers: READ_HEADERS });
  }
}

/* ================= POST — gravação com senha ================= */
export async function POST(req: Request): Promise<Response> {
  const password = process.env.DASH_EDIT_PASSWORD;
  // Nunca aceita gravação sem senha configurada.
  if (!password) {
    return Response.json(
      { error: "Senha de edição não configurada" },
      { status: 503 },
    );
  }

  const cfg = kvConfig();
  if (!cfg) {
    return Response.json(
      { error: "Armazenamento não configurado" },
      { status: 503 },
    );
  }

  const provided = req.headers.get("x-dash-password") ?? "";
  if (provided !== password) {
    return Response.json({ error: "Senha incorreta" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = dashSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Dados inválidos", detail: parsed.error.issues.slice(0, 6) },
      { status: 400 },
    );
  }

  const updatedAt = new Date().toISOString();
  const payload = { ...parsed.data, updatedAt };

  try {
    await kvCommand(cfg, ["SET", KEY, JSON.stringify(payload)]);
  } catch (err) {
    console.error("[dash/data POST]", err instanceof Error ? err.message : err);
    return Response.json(
      { error: "Falha ao gravar no armazenamento" },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, updatedAt });
}
