/**
 * Purpose:
 * GA4 初期化ロジック (initAnalytics) のテスト。
 * ビルド済み JS に GA コードが含まれ、本番環境で正しく動作することを保証する。
 *
 * Context:
 * - GA をインラインスクリプトから Vite モジュールに移行したため、
 *   静的 HTML には gtag が現れない。JS 側で正しく初期化されることをテストで担保する。
 * - import.meta.env.PROD の切り替えで本番/開発の挙動が変わることを検証。
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("initAnalytics", () => {
  let appendChildSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // DOM をクリーンな状態にする
    delete (window as Record<string, unknown>).dataLayer;
    delete (window as Record<string, unknown>).gtag;
    appendChildSpy = vi.spyOn(document.head, "appendChild");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    // テストで追加された script タグを除去
    document.head
      .querySelectorAll('script[src*="googletagmanager"]')
      .forEach((el) => el.remove());
  });

  it("本番環境で gtag.js の script タグを挿入する", async () => {
    vi.stubEnv("PROD", true);

    const { initAnalytics } = await import("@/lib/analytics");
    initAnalytics();

    const scripts = document.head.querySelectorAll(
      'script[src*="googletagmanager.com/gtag/js"]'
    );
    expect(scripts.length).toBe(1);

    const script = scripts[0] as HTMLScriptElement;
    expect(script.src).toContain("id=G-TNFY35RTNP");
    expect(script.async).toBe(true);
  });

  it("本番環境で window.dataLayer と window.gtag を設定する", async () => {
    vi.stubEnv("PROD", true);

    const { initAnalytics } = await import("@/lib/analytics");
    initAnalytics();

    expect(window.dataLayer).toBeDefined();
    expect(Array.isArray(window.dataLayer)).toBe(true);
    expect(typeof window.gtag).toBe("function");
  });

  it("本番環境で dataLayer に初期イベント (js, config) をプッシュする", async () => {
    vi.stubEnv("PROD", true);

    const { initAnalytics } = await import("@/lib/analytics");
    initAnalytics();

    // dataLayer には [["js", Date], ["config", "G-..."]] が入る
    expect(window.dataLayer.length).toBeGreaterThanOrEqual(2);

    const jsEvent = window.dataLayer[0] as unknown[];
    expect(jsEvent[0]).toBe("js");
    expect(jsEvent[1]).toBeInstanceOf(Date);

    const configEvent = window.dataLayer[1] as unknown[];
    expect(configEvent[0]).toBe("config");
    expect(configEvent[1]).toBe("G-TNFY35RTNP");
  });

  it("開発環境では何も実行しない", async () => {
    vi.stubEnv("PROD", false);

    const { initAnalytics } = await import("@/lib/analytics");
    initAnalytics();

    expect(window.dataLayer).toBeUndefined();
    expect(window.gtag).toBeUndefined();
    expect(appendChildSpy).not.toHaveBeenCalled();
  });
});
