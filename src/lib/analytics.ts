/**
 * Purpose:
 * Google Analytics 4 の初期化と型安全なイベント送信を提供する。
 *
 * Context:
 * - index.html のインラインスクリプトから Vite モジュールに移行し、
 *   Tree-shaking・環境変数制御・TypeScript 型付けの恩恵を受ける。
 * - `import.meta.env.PROD` で本番のみロードし、開発時のノイズを排除。
 * - gtag.js は動的に <script> を挿入して非同期ロードする。
 */

const GA_MEASUREMENT_ID = "G-TNFY35RTNP";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]): void {
  window.dataLayer.push(args);
}

/**
 * GA4 を初期化する。本番環境でのみ gtag.js をロードする。
 *
 * 呼び出し元: src/main.tsx (アプリ起動時に1回)
 * 不要になる条件: GA4 を廃止する場合
 */
export function initAnalytics(): void {
  if (!import.meta.env.PROD) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);
}
