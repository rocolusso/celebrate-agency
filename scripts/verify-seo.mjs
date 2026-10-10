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
 *   A10 Open Graph set is complete (title, description, type, url, image, site_name, locale),
 *       og:url equals the canonical, og:locale:alternate lists the other locale, twitter:card is set
 *   A11 og:image is an absolute same-origin URL with width, height, type and alt; twitter:image equals it
 *   A12 the og:image file really exists (build: in public/, live: HTTP 200 + image content-type)
 *       and its real format and dimensions equal og:image:type / width / height
 *   A13 JSON-LD: every page has one LocalBusiness whose url is the canonical home of the page's locale;
 *       the two home pages (and only they) have one WebSite (url = canonical, name = og:site_name,
 *       alternateName set, publisher -> the LocalBusiness @id); @id values are unique per page
 *   A14 title shape: home pages start with "<site name>: ", every other page ends with " | <site name>"
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
const OG_REQUIRED = ['og:title', 'og:description', 'og:type', 'og:url', 'og:image', 'og:site_name', 'og:locale'];
const OG_SINGLE = [...OG_REQUIRED, 'og:image:width', 'og:image:height', 'og:image:type', 'og:image:alt', 'twitter:card', 'twitter:image'];

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

function imageInfo(buf) {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { type: 'image/png', width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i += 1; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { type: 'image/jpeg', height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
    return { type: 'image/jpeg', width: null, height: null };
  }
  return { type: null, width: null, height: null };
}

const imageCache = new Map();
function loadImage(url) {
  const { pathname } = new URL(url);
  if (!imageCache.has(pathname)) {
    imageCache.set(pathname, (async () => {
      if (liveOrigin) {
        const res = await fetch(`${liveOrigin}${pathname}`, { redirect: 'manual' });
        const buf = Buffer.from(await res.arrayBuffer());
        return { status: res.status, contentType: res.headers.get('content-type') ?? '', ...imageInfo(buf) };
      }
      const file = join(buildDir, 'public', decodeURIComponent(pathname));
      if (!existsSync(file)) return { status: 404, contentType: '', type: null, width: null, height: null };
      return { status: 200, contentType: '', ...imageInfo(readFileSync(file)) };
    })());
  }
  return imageCache.get(pathname);
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
  const meta = {};
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const key = attr(m[0], 'property') ?? attr(m[0], 'name');
    if (key && /^(og|twitter):/i.test(key)) (meta[key] ??= []).push(attr(m[0], 'content') ?? '');
  }
  const jsonLd = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => {
    try {
      return JSON.parse(m[1]);
    } catch {
      return { parseError: true };
    }
  });
  return {
    meta,
    jsonLd,
    title: (html.match(/<title>([^<]*)<\/title>/i) || [])[1] ?? null,
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
// The sitemap entry of the root lists the home page of every locale (hreflang value = <html lang>).
const rootLoc = locs.find((l) => new URL(l).pathname === '/');
const localeHomes = rootLoc ? sitemap.entries.get(rootLoc) : {};
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

    // A10: Open Graph completeness
    const one = (k) => p.meta[k]?.[0];
    OG_REQUIRED.forEach((k) => {
      if (!one(k)) fail('A10', loc, `missing ${k}`);
    });
    OG_SINGLE.forEach((k) => {
      if ((p.meta[k]?.length ?? 0) > 1) fail('A10', loc, `duplicate ${k}`);
    });
    if (one('og:url') && one('og:url') !== p.canonical) fail('A10', loc, `og:url "${one('og:url')}" differs from canonical "${p.canonical}"`);
    if (p.lang && OG_LOCALE[p.lang]) {
      const expectedAlt = Object.values(OG_LOCALE).filter((v) => v !== OG_LOCALE[p.lang]).sort().join();
      const actualAlt = [...(p.meta['og:locale:alternate'] ?? [])].sort().join();
      if (actualAlt !== expectedAlt) fail('A10', loc, `og:locale:alternate "${actualAlt}" instead of "${expectedAlt}"`);
    }
    if (one('twitter:card') !== 'summary_large_image') fail('A10', loc, `twitter:card is "${one('twitter:card') ?? 'missing'}", expected summary_large_image`);

    // A11: og:image tags
    const img = one('og:image');
    if (img) {
      if (!/^https?:\/\//.test(img)) fail('A11', loc, `og:image is not absolute: ${img}`);
      else if (new URL(img).origin !== new URL(loc).origin) fail('A11', loc, `og:image origin differs from the page origin: ${img}`);
      ['og:image:width', 'og:image:height'].forEach((k) => {
        if (!/^[1-9]\d*$/.test(one(k) ?? '')) fail('A11', loc, `${k} is missing or not a positive integer: ${one(k)}`);
      });
      if (!/^image\/(jpeg|png|webp)$/.test(one('og:image:type') ?? '')) fail('A11', loc, `og:image:type is missing or unsupported: ${one('og:image:type')}`);
      if (!one('og:image:alt')) fail('A11', loc, 'missing og:image:alt');
      if (one('twitter:image') !== img) fail('A11', loc, `twitter:image "${one('twitter:image')}" differs from og:image`);

      // A12: the image file itself
      if (/^https?:\/\//.test(img)) {
        const file = await loadImage(img);
        if (file.status !== 200) fail('A12', loc, `og:image is not available (HTTP ${file.status}): ${img}`);
        else {
          if (liveOrigin && !/^image\//i.test(file.contentType)) fail('A12', loc, `og:image content-type is "${file.contentType}": ${img}`);
          if (!file.type) fail('A12', loc, `og:image is not a JPEG/PNG file: ${img}`);
          else if (file.type !== one('og:image:type')) fail('A12', loc, `og:image:type "${one('og:image:type')}" differs from the real format "${file.type}"`);
          if (String(file.width) !== one('og:image:width') || String(file.height) !== one('og:image:height')) {
            fail('A12', loc, `og:image size ${one('og:image:width')}x${one('og:image:height')} differs from the real ${file.width}x${file.height}`);
          }
        }
      }
    }

    // A13: JSON-LD (LocalBusiness everywhere, WebSite only on the locale home pages)
    const home = localeHomes[p.lang];
    const isHome = Boolean(home) && p.canonical === home;
    const nodes = p.jsonLd.filter((n) => !n.parseError);
    if (p.jsonLd.some((n) => n.parseError)) fail('A13', loc, 'invalid JSON-LD');
    if (!home) fail('A13', loc, `no home URL for lang "${p.lang}" in the sitemap`);
    const businesses = nodes.filter((n) => n['@type'] === 'LocalBusiness');
    const websites = nodes.filter((n) => n['@type'] === 'WebSite');
    if (businesses.length !== 1) fail('A13', loc, `expected 1 LocalBusiness, found ${businesses.length}`);
    else if (home && businesses[0].url !== home) fail('A13', loc, `LocalBusiness url "${businesses[0].url}" differs from the home canonical "${home}"`);
    if (!isHome && websites.length > 0) fail('A13', loc, 'WebSite JSON-LD is only expected on the home pages');
    if (isHome) {
      if (websites.length !== 1) fail('A13', loc, `expected 1 WebSite on the home page, found ${websites.length}`);
      else {
        const site = websites[0];
        if (site.url !== p.canonical) fail('A13', loc, `WebSite url "${site.url}" differs from the canonical "${p.canonical}"`);
        if (!site.name || site.name !== one('og:site_name')) fail('A13', loc, `WebSite name "${site.name}" differs from og:site_name "${one('og:site_name')}"`);
        if (typeof site.alternateName !== 'string' || !site.alternateName.trim()) fail('A13', loc, 'WebSite alternateName is missing');
        if (!site['@id']) fail('A13', loc, 'WebSite has no @id');
        if (businesses.length === 1 && site.publisher?.['@id'] !== businesses[0]['@id']) fail('A13', loc, 'WebSite publisher does not reference the LocalBusiness @id');
      }
    }
    const ids = nodes.map((n) => n['@id']).filter(Boolean);
    if (new Set(ids).size !== ids.length) fail('A13', loc, `duplicate JSON-LD @id: ${ids.join(', ')}`);

    // A14: title shape
    const siteName = one('og:site_name');
    if (!p.title || !siteName) fail('A14', loc, 'missing <title> or og:site_name');
    else if (isHome && !p.title.startsWith(`${siteName}: `)) fail('A14', loc, `home title must start with "${siteName}: ": ${p.title}`);
    else if (!isHome && !p.title.endsWith(` | ${siteName}`)) fail('A14', loc, `title must end with " | ${siteName}": ${p.title}`);

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
  console.log('OK: all checks passed (A1-A14)');
} else {
  const byId = failures.reduce((acc, f) => ({ ...acc, [f.id]: (acc[f.id] ?? 0) + 1 }), {});
  console.log(`FAILED: ${failures.length} problem(s) -> ${Object.entries(byId).map(([k, v]) => `${k}: ${v}`).join(', ')}`);
  failures.slice(0, 30).forEach((f) => console.log(`  [${f.id}] ${f.where}: ${f.message}`));
  if (failures.length > 30) console.log(`  ... and ${failures.length - 30} more`);
  process.exit(1);
}
