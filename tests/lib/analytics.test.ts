/**
 * Purpose:
 * GA4 初期化ロジック (initAnalytics) のテスト。
 * dataLayer の初期化と config イベント送信が正しく行われることを保証する。
 *
 * Context:
 * - gtag.js の <script> タグは index.html に静的配置。
 * - initAnalytics() は dataLayer 初期化と config 送信のみ担当。
 * - import.meta.env.PROD の切り替えで本番/開発の挙動が変わることを検証。
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("initAnalytics", () => {
  beforeEach(() => {
    // DOM をクリーンな状態にする
    delete (window as Record<string, unknown>).dataLayer;
    delete (window as Record<string, unknown>).gtag;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
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
  });
});
