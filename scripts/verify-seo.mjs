#!/usr/bin/env node
/**
 * SEO consistency checks for the bilingual site (no dependencies).
 *
 *   node scripts/verify-seo.mjs                       checks the build output in ./.next
 *   node scripts/verify-seo.mjs --build <project-dir> checks the build output of another dir
 *   node scripts/verify-seo.mjs --live https://domovenok.md   checks the live site
 *
 * Pages to check are taken from the sitemap, so the sitemap is the source of truth
 * for indexed URLs. Checks:
 *   A1 <html lang> equals the self-referencing hreflang (the Ahrefs "hreflang vs html lang" rule)
 *   A2 canonical is absolute and has no trailing slash (except the root)
 *   A3 hreflang set is exactly ro, ru, x-default and every target is in the sitemap
 *   A4 og:locale matches <html lang>
 *   A5 no links to an /index path
 *   A6 sitemap has no duplicate URLs and a single origin
 *   A7 exactly one <html> and one <body>
 *   A8 an unknown URL gives a 404 with a non-empty <html lang> and noindex
 *   A9 canonical and hreflang equal the sitemap <loc> / xhtml:link strings exactly
 * Exit code 1 if any check fails.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const argValue = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const liveOrigin = argValue('--live')?.replace(/\/+$/, '');
const buildDir = argValue('--build') ?? '.';
const OG_LOCALE = { ro: 'ro_RO', ru: 'ru_RU' };
const EXPECTED_HREFLANG = ['ro', 'ru', 'x-default'];

const attr = (tag, name) => (tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i')) || [])[1] ?? null;

function parseSitemap(xml) {
  const entries = new Map();
  const duplicates = [];
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = (m[1].match(/<loc>([^<]+)<\/loc>/) || [])[1];
    if (loc) {
      const alternates = {};
      for (const l of m[1].matchAll(/<xhtml:link\b[^>]*>/g)) alternates[attr(l[0], 'hreflang')] = attr(l[0], 'href');
      if (entries.has(loc)) duplicates.push(loc);
      entries.set(loc, alternates);
    }
  }
  return { entries, duplicates };
}

function analyze(html) {
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
  const hreflang = {};
  let canonical = null;
  links.forEach((tag) => {
    const rel = attr(tag, 'rel');
    if (rel === 'canonical') canonical = attr(tag, 'href');
    if (rel === 'alternate' && attr(tag, 'hreflang')) hreflang[attr(tag, 'hreflang')] = attr(tag, 'href');
  });
  const htmlTag = (html.match(/<html\b[^>]*>/i) || [''])[0];
  return {
    htmlCount: (html.match(/<html[\s>]/gi) || []).length,
    bodyCount: (html.match(/<body[\s>]/gi) || []).length,
    lang: attr(htmlTag, 'lang'),
    canonical,
    hreflang,
    ogLocale: (html.match(/<meta\b[^>]*property="og:locale"[^>]*>/i) || [''])[0].match(/content="([^"]*)"/)?.[1] ?? null,
    robots: (html.match(/<meta\b[^>]*name="robots"[^>]*>/i) || [''])[0].match(/content="([^"]*)"/)?.[1] ?? null,
    indexLinks: [...html.matchAll(/\bhref="([^"]*\/index(?:[?#/][^"]*)?)"/gi)].map((m) => m[1]),
  };
}

async function loadSitemap() {
  if (liveOrigin) {
    const res = await fetch(`${liveOrigin}/sitemap.xml`);
    if (!res.ok) throw new Error(`sitemap.xml: HTTP ${res.status}`);
    return res.text();
  }
  const file = join(buildDir, '.next/server/app/sitemap.xml.body');
  if (!existsSync(file)) throw new Error(`build output not found: ${file} (run the build first)`);
  return readFileSync(file, 'utf8');
}

async function loadPage(loc) {
  const { pathname } = new URL(loc);
  if (liveOrigin) {
    const res = await fetch(`${liveOrigin}${pathname}`, { redirect: 'manual' });
    return { status: res.status, html: await res.text() };
  }
  const name = pathname === '/' ? 'index' : pathname.slice(1);
  const file = join(buildDir, '.next/server/app', `${name}.html`);
  if (!existsSync(file)) return { status: 404, html: '' };
  return { status: 200, html: readFileSync(file, 'utf8') };
}

async function loadNotFound() {
  if (liveOrigin) {
    const res = await fetch(`${liveOrigin}/__verify-seo-missing-page__`, { redirect: 'manual' });
    return { status: res.status, html: await res.text() };
  }
  const file = join(buildDir, '.next/server/app/_not-found.html');
  return existsSync(file) ? { status: 404, html: readFileSync(file, 'utf8') } : { status: null, html: '' };
}

const failures = [];
const fail = (id, where, message) => failures.push({ id, where, message });

const sitemap = parseSitemap(await loadSitemap());
const locs = [...sitemap.entries.keys()];
const origins = new Set(locs.map((l) => new URL(l).origin));

sitemap.duplicates.forEach((d) => fail('A6', d, 'duplicate URL in sitemap'));
if (origins.size !== 1) fail('A6', 'sitemap', `expected a single origin, got: ${[...origins].join(', ')}`);
if (liveOrigin && !locs.every((l) => new URL(l).origin === liveOrigin)) {
  fail('A6', 'sitemap', `sitemap URLs are not on ${liveOrigin}`);
}

for (const loc of locs) {
  const alternates = sitemap.entries.get(loc);
  const { status, html } = await loadPage(loc);
  if (status !== 200) {
    fail('A1', loc, `page not available (HTTP ${status})`);
  } else {
    const p = analyze(html);

    // A1: html lang === self hreflang
    const selfKey = Object.keys(p.hreflang).find((k) => k !== 'x-default' && p.hreflang[k] === p.canonical);
    if (!p.lang) fail('A1', loc, 'missing <html lang>');
    else if (!selfKey) fail('A1', loc, `no self-referencing hreflang (canonical ${p.canonical})`);
    else if (selfKey !== p.lang) fail('A1', loc, `<html lang="${p.lang}"> differs from self hreflang "${selfKey}"`);

    // A2: canonical form
    if (!p.canonical) fail('A2', loc, 'missing canonical');
    else {
      const url = new URL(p.canonical, loc);
      if (p.canonical !== url.href && !p.canonical.startsWith('http')) fail('A2', loc, `canonical is not absolute: ${p.canonical}`);
      if (url.pathname !== '/' && url.pathname.endsWith('/')) fail('A2', loc, `canonical has a trailing slash: ${p.canonical}`);
    }

    // A3: hreflang set and targets present in the sitemap
    const keys = Object.keys(p.hreflang).sort();
    if (keys.join() !== [...EXPECTED_HREFLANG].sort().join()) fail('A3', loc, `unexpected hreflang set: ${keys.join(', ') || 'none'}`);
    Object.values(p.hreflang).forEach((href) => {
      if (!sitemap.entries.has(href)) fail('A3', loc, `hreflang target is not in the sitemap: ${href}`);
    });

    // A4: og:locale
    if (p.lang && OG_LOCALE[p.lang] && p.ogLocale !== OG_LOCALE[p.lang]) fail('A4', loc, `og:locale "${p.ogLocale}" does not match lang "${p.lang}"`);

    // A5: /index links
    p.indexLinks.forEach((href) => fail('A5', loc, `link to an /index path: ${href}`));

    // A7: single html/body
    if (p.htmlCount !== 1 || p.bodyCount !== 1) fail('A7', loc, `html tags: ${p.htmlCount}, body tags: ${p.bodyCount}`);

    // A9: exact parity with the sitemap
    if (p.canonical !== loc) fail('A9', loc, `canonical "${p.canonical}" differs from the sitemap <loc>`);
    const same = JSON.stringify(Object.entries(p.hreflang).sort()) === JSON.stringify(Object.entries(alternates).sort());
    if (!same) fail('A9', loc, `hreflang ${JSON.stringify(p.hreflang)} differs from the sitemap ${JSON.stringify(alternates)}`);
  }
}

// A8: unknown URL
const nf = await loadNotFound();
if (nf.status !== 404) fail('A8', 'unknown URL', `expected 404, got ${nf.status}`);
else {
  const p = analyze(nf.html);
  if (!p.lang) fail('A8', 'unknown URL', 'the 404 page has no <html lang>');
  if (!p.robots || !/noindex/i.test(p.robots)) fail('A8', 'unknown URL', 'the 404 page is not noindex');
}

const checked = locs.length;
console.log(`verify-seo (${liveOrigin ? `live ${liveOrigin}` : `build ${buildDir}`}): ${checked} sitemap URLs checked`);
if (failures.length === 0) {
  console.log('OK: all checks passed (A1-A9)');
} else {
  const byId = failures.reduce((acc, f) => ({ ...acc, [f.id]: (acc[f.id] ?? 0) + 1 }), {});
  console.log(`FAILED: ${failures.length} problem(s) -> ${Object.entries(byId).map(([k, v]) => `${k}: ${v}`).join(', ')}`);
  failures.slice(0, 30).forEach((f) => console.log(`  [${f.id}] ${f.where}: ${f.message}`));
  if (failures.length > 30) console.log(`  ... and ${failures.length - 30} more`);
  process.exit(1);
}
