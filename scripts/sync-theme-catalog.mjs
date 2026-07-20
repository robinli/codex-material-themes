#!/usr/bin/env node

import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourceCatalogPath = join(projectRoot, "catalog", "references", "themes.json");
const sourceAssetsPath = join(projectRoot, "catalog", "assets");
const checkOnly = process.argv.includes("--check");
const unsupportedArgs = process.argv.slice(2).filter((arg) => arg !== "--check");

if (unsupportedArgs.length > 0) {
  throw new Error(`Unsupported arguments: ${unsupportedArgs.join(", ")}`);
}

const catalogText = await readFile(sourceCatalogPath, "utf8");
const catalog = JSON.parse(catalogText);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertHex(value, label) {
  assert(/^#[0-9A-F]{6}$/i.test(value), `${label} must be a six-digit hex colour.`);
}

function validateCatalog(value) {
  assert(value.schemaVersion === 1, "schemaVersion must be 1.");
  assert(typeof value.codeThemeId === "string" && value.codeThemeId, "codeThemeId is required.");
  assert(value.defaults?.fonts?.ui, "defaults.fonts.ui is required.");
  assert(value.defaults?.fonts?.code, "defaults.fonts.code is required.");
  assert(Array.isArray(value.fontOptions?.ui) && value.fontOptions.ui.length > 0, "fontOptions.ui is required.");
  assert(Array.isArray(value.fontOptions?.code) && value.fontOptions.code.length > 0, "fontOptions.code is required.");
  assert(Array.isArray(value.themes) && value.themes.length === 12, "themes must contain exactly 12 entries.");

  const ids = new Set();
  const slugs = new Set();
  const previews = new Set();

  for (const theme of value.themes) {
    assert(Number.isInteger(theme.id), "Each theme requires an integer id.");
    assert(!ids.has(theme.id), `Duplicate theme id: ${theme.id}.`);
    ids.add(theme.id);
    assert(typeof theme.slug === "string" && theme.slug, `Theme ${theme.id} requires a slug.`);
    assert(!slugs.has(theme.slug), `Duplicate theme slug: ${theme.slug}.`);
    slugs.add(theme.slug);
    assert(theme.name?.en && theme.name?.zh, `${theme.slug} requires English and Chinese names.`);
    assert(theme.description?.en && theme.description?.zh, `${theme.slug} requires English and Chinese descriptions.`);
    assert(Array.isArray(theme.tags), `${theme.slug}.tags must be an array.`);
    assert(/^\.\.\/assets\/[^/\\]+\.png$/i.test(theme.preview), `${theme.slug}.preview must point to ../assets/<file>.png.`);
    assert(!previews.has(theme.preview), `Duplicate preview path: ${theme.preview}.`);
    previews.add(theme.preview);
    for (const role of ["ui", "code"]) {
      if (theme.fonts?.[role]) {
        assert(value.fontOptions[role].includes(theme.fonts[role]), `${theme.slug}.fonts.${role} must be listed in fontOptions.${role}.`);
      }
    }
    assertHex(theme.surface, `${theme.slug}.surface`);
    assertHex(theme.ink, `${theme.slug}.ink`);
    assertHex(theme.accent, `${theme.slug}.accent`);
    assert(Number.isInteger(theme.contrast) && theme.contrast >= 0 && theme.contrast <= 100, `${theme.slug}.contrast must be an integer from 0 to 100.`);
    assert(theme.semanticColors && typeof theme.semanticColors === "object", `${theme.slug}.semanticColors is required.`);
    for (const [name, colour] of Object.entries(theme.semanticColors)) {
      assertHex(colour, `${theme.slug}.semanticColors.${name}`);
    }
  }
}

validateCatalog(catalog);

const skillRoots = [
  join(projectRoot, ".agents", "skills", "choose-codex-theme"),
  join(projectRoot, "plugins", "codex-material-themes", "skills", "choose-codex-theme"),
];

const staleTargets = [];
const syncedTargets = [];

async function targetMatches(source, target) {
  try {
    const [sourceBytes, targetBytes] = await Promise.all([readFile(source), readFile(target)]);
    return sourceBytes.equals(targetBytes);
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function syncFile(source, target) {
  if (await targetMatches(source, target)) return;
  if (checkOnly) {
    staleTargets.push(target);
    return;
  }
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
  syncedTargets.push(target);
}

async function syncText(content, target) {
  let current;
  try {
    current = await readFile(target, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (current === content) return;
  if (checkOnly) {
    staleTargets.push(target);
    return;
  }
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
  syncedTargets.push(target);
}

for (const skillRoot of skillRoots) {
  await syncFile(sourceCatalogPath, join(skillRoot, "references", "themes.json"));
}

for (const theme of catalog.themes) {
  const previewName = basename(theme.preview);
  const sourcePreview = join(sourceAssetsPath, previewName);
  await readFile(sourcePreview);

  await syncFile(sourcePreview, join(projectRoot, "public", "themes", previewName));
  for (const skillRoot of skillRoots) {
    await syncFile(sourcePreview, join(skillRoot, "assets", previewName));
  }
}

const browserCatalog = [
  "// Generated by scripts/sync-theme-catalog.mjs from catalog/references/themes.json.",
  "// Do not edit this file directly.",
  `globalThis.CODEX_MATERIAL_THEME_CATALOG = ${JSON.stringify(catalog, null, 2)};`,
  "",
].join("\n");

await syncText(browserCatalog, join(projectRoot, "public", "theme-catalog.js"));

if (staleTargets.length > 0) {
  console.error("Generated theme files are out of date:");
  for (const target of staleTargets) console.error(`- ${target}`);
  console.error("Run npm run sync:themes to regenerate them.");
  process.exitCode = 1;
} else if (checkOnly) {
  console.log("Theme catalog outputs are in sync.");
} else if (syncedTargets.length > 0) {
  console.log(`Synchronized ${syncedTargets.length} theme catalog outputs.`);
} else {
  console.log("Theme catalog outputs are already in sync.");
}
