/**
 * Purpose:
 * Share canonical page URLs and factual descriptions between static output and SPA navigation.
 */

/** Shared page descriptions keep generated HTML and client navigation consistent. */
export const SEARCH_PAGES = [
  {
    path: "/",
    title: "tkt - Web Application Developer",
    description:
      "tktcorporation is a web application developer based in Japan. Explore professional experience, development activities, and social profiles.",
    language: "en",
    locale: "en_US",
  },
  {
    path: "/resume/",
    title: "Resume - tkt | Professional Experience",
    description:
      "tktの職務経歴書。企業ごとの職種・役職・在籍期間と開発経験を紹介しています。Markdown・テキスト・JSON形式でも閲覧できます。",
    language: "ja",
    locale: "ja_JP",
  },
  {
    path: "/technologies/",
    title: "Activities - tkt | Development, Articles and Events",
    description:
      "Explore tktcorporation's development activities, GitHub repositories, technical articles, and events through activity charts and a timeline.",
    language: "en",
    locale: "en_US",
  },
] as const;

/** Normalize existing extensionless links to GitHub Pages directory URLs. */
export function getSearchPage(pathname: string) {
  const path = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
  return SEARCH_PAGES.find((page) => page.path === path);
}
