#!/usr/bin/env node
/**
 * check-mobile-grids.mjs — evita o bug de overflow horizontal no mobile.
 *
 * O QUE PEGA (anti-padrão que cortou a /raiox em 16/07/2026):
 *   1) `grid grid-cols-N` (N>=2) SEM virar coluna única no mobile.
 *      Num grid de N colunas, os N-1 column-gaps (ex.: gap-10 = 40px ->
 *      11 gaps = 440px) nao cabem numa tela de ~375px -> estoura.
 *      Correto: `grid grid-cols-1 md:grid-cols-N`.
 *   2) `col-span-N` de base (N>=2, sem prefixo de breakpoint). Num grid de
 *      1 coluna, `span N` cria N-1 colunas IMPLICITAS com gaps -> recria o
 *      overflow. Correto (largura total no mobile): `col-span-full`.
 *
 * USO:
 *   node scripts/check-mobile-grids.mjs           # checa (exit 1 se achar)
 *   node scripts/check-mobile-grids.mjs --fix     # corrige os arquivos
 *   node scripts/check-mobile-grids.mjs app/raiox # limita a um caminho
 *
 * Pensado p/ CI e pre-commit. Escaneia os .tsx sob app/ (recursivo) por padrao.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const FIX = process.argv.includes("--fix");
const roots = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const SCAN_ROOTS = roots.length ? roots : ["app"];

// ── regras ────────────────────────────────────────────────────────────────
// 1a) grid de LAYOUT (6..12 colunas) sem base mobile de 1 coluna.
//     É o caso perigoso: muitos column-gaps estouram a viewport. AUTO-FIX.
const GRID_HIGH_RE = /\bgrid grid-cols-([6-9]|1[0-2])\b/g;
const gridFix = (_m, n) => `grid grid-cols-1 md:grid-cols-${n}`;

// 1b) grid pequeno (2..5 colunas): costuma ser grade de cards proposital no
//     mobile. Só AVISA (revisar à mão) — empilhar pode não ser o desejado.
const GRID_LOW_RE = /\bgrid grid-cols-([2-5])\b/g;

// 2) col-span-N de base (>=2) sem prefixo de breakpoint (md:/sm:/lg:/xl:/2xl:).
//    lookbehind evita casar "md:col-span-6"; exige N>=2 (col-span-1 é ok).
//    `col-span-full` ocupa a largura total sem criar colunas implícitas —
//    é seguro em qualquer grid. AUTO-FIX.
const SPAN_RE = /(?<![\w:-])col-span-([2-9]|1[0-2])\b/g;
const spanFix = () => `col-span-full`;

// ── util ────────────────────────────────────────────────────────────────
function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (name === "node_modules" || name === ".next" || name === ".git") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(tsx|jsx)$/.test(name)) out.push(p);
  }
  return out;
}

function lineOf(src, index) {
  return src.slice(0, index).split("\n").length;
}

// ── varredura ───────────────────────────────────────────────────────────
const files = SCAN_ROOTS.flatMap((r) => walk(r));
let autoFindings = 0; // auto-corrigíveis (grid 6-12 + col-span)
let warnFindings = 0; // revisar à mão (grid 2-5)
let filesFixed = 0;

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const hits = [];

  for (const [re, label, kind] of [
    [GRID_HIGH_RE, "grid de layout sem coluna única no mobile", "auto"],
    [SPAN_RE, "col-span-N de base (cria colunas implícitas)", "auto"],
    [GRID_LOW_RE, "grid pequeno — REVISAR à mão (empilha cards?)", "warn"],
  ]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src))) {
      hits.push({ index: m.index, match: m[0], label, kind });
      if (kind === "auto") autoFindings++;
      else warnFindings++;
    }
  }

  if (!hits.length) continue;

  const rel = relative(process.cwd(), file).replace(/\\/g, "/");
  for (const h of hits.sort((a, b) => a.index - b.index)) {
    const tag = h.kind === "warn" ? "⚠ " : "";
    console.log(`${rel}:${lineOf(src, h.index)}  ${tag}[${h.label}]  "${h.match}"`);
  }

  if (FIX) {
    // Só auto-corrige o padrão seguro: grids 6-12 e col-span de base.
    const fixed = src.replace(GRID_HIGH_RE, gridFix).replace(SPAN_RE, spanFix);
    if (fixed !== src) {
      writeFileSync(file, fixed);
      filesFixed++;
    }
  }
}

// ── resumo ────────────────────────────────────────────────────────────────
console.log("");
if (!autoFindings && !warnFindings) {
  console.log("✓ Nenhum anti-padrão de grid/col-span mobile encontrado.");
  process.exit(0);
}
if (FIX) {
  console.log(`✓ Auto-corrigidas ${autoFindings} ocorrência(s) em ${filesFixed} arquivo(s).`);
  if (warnFindings) {
    console.log(`⚠ ${warnFindings} grid(s) pequeno(s) (2-5 col) NÃO tocados — revise se devem empilhar no mobile.`);
  }
  console.log("  Rode o app e confira o mobile antes de commitar.");
  process.exit(0);
}
console.log(`✗ ${autoFindings} auto-corrigível(is) + ${warnFindings} p/ revisar. Rode com --fix.`);
console.log("  grid de layout: `grid grid-cols-1 md:grid-cols-N`;");
console.log("  filho de largura total no mobile: `col-span-full md:col-span-X`.");
process.exit(autoFindings ? 1 : 0);
