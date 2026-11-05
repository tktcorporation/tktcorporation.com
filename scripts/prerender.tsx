/**
 * Purpose:
 * Generate crawlable GitHub Pages documents from the existing React pages.
 * Uses the built asset template so crawlers and browsers receive the same UI.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "../src/App";
import { SEARCH_PAGES } from "../src/data/searchPages";

// Render the real components, rather than maintaining crawler-only copies.
// Directory index files let GitHub Pages serve deep links without its 404 SPA redirect.
const dist = resolve("dist");
const template = readFileSync(resolve(dist, "index.html"), "utf8");
// Fail the build if the Vite template contract changes instead of publishing empty pages.
if (!template.includes('<div id="root"></div>')) {
  throw new Error(
    "Prerender requires an empty root in the built HTML template"
  );
}
const escapeAttribute = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
for (const page of SEARCH_PAGES) {
  const body = renderToString(
    <StaticRouter location={page.path}>
      <App />
    </StaticRouter>
  );
  let html = template
    .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
    .replace(/<html lang="[^"]*">/, `<html lang="${page.language}">`)
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escapeAttribute(page.title)}</title>`
    );
  for (const [attribute, name, value] of [
    ["name", "description", page.description],
    ["property", "og:title", page.title],
    ["property", "og:description", page.description],
    ["property", "og:url", `https://tktcorporation.com${page.path}`],
    ["property", "og:locale", page.locale],
    ["name", "twitter:title", page.title],
    ["name", "twitter:description", page.description],
  ]) {
    html = html.replace(
      new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="[^"]*"\\s*/?>`),
      () =>
        `<meta ${attribute}="${name}" content="${escapeAttribute(value)}" />`
    );
  }
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="https://tktcorporation.com${page.path}" />`
  );
  const directory = resolve(dist, `.${page.path}`);
  mkdirSync(directory, { recursive: true });
  writeFileSync(resolve(directory, "index.html"), html);
}
writeFileSync(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${SEARCH_PAGES.map((page) => `  <url><loc>https://tktcorporation.com${page.path}</loc></url>`).join("\n")}\n</urlset>\n`
);
console.log(
  `✓ Prerendered ${SEARCH_PAGES.length} search pages and sitemap.xml`
);
