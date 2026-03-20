/**
 * Purpose:
 * Google Analytics 4 の dataLayer 初期化と型安全なイベント送信を提供する。
 *
 * Context:
 * - gtag.js の <script> タグは index.html に静的配置（GA 検出ツール対応のため）。
 * - dataLayer の初期化と config 送信はこのモジュールで行い、
 *   `import.meta.env.PROD` による環境制御と TypeScript 型付けの恩恵を受ける。
 * - 開発環境では dataLayer を初期化しないため、gtag.js がロードされても
 *   config イベントが送信されずデータは収集されない。
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
 * GA4 の dataLayer を初期化し、config イベントを送信する。
 * 本番環境でのみ実行される。
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
}
