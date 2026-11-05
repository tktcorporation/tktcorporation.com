/**
 * Purpose:
 * Keep page metadata accurate after React Router navigation and back/forward.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getSearchPage } from "@/data/searchPages";

/** Static heads serve crawlers; SPA navigation must describe the current page too. */
export function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = getSearchPage(pathname);
    if (!page) return;
    document.title = page.title;
    document.documentElement.lang = page.language;
    for (const [selector, content] of [
      ['meta[name="description"]', page.description],
      ['meta[property="og:title"]', page.title],
      ['meta[property="og:description"]', page.description],
      ['meta[property="og:url"]', `https://tktcorporation.com${page.path}`],
      ['meta[property="og:locale"]', page.locale],
      ['meta[name="twitter:title"]', page.title],
      ['meta[name="twitter:description"]', page.description],
    ]) {
      document.querySelector(selector)?.setAttribute("content", content);
    }
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `https://tktcorporation.com${page.path}`);
  }, [pathname]);
  return null;
}
