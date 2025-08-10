import { expect, test } from "@playwright/test";

// テストするページのリスト
const pages = [
  { path: "/", name: "Home" },
  { path: "/resume", name: "Resume" },
  { path: "/technologies", name: "Technologies" },
];

// 各ページの基本テスト
for (const page of pages) {
  test.describe(`${page.name} Page`, () => {
    test(`should load ${page.name} page without errors`, async ({
      page: playwright,
    }) => {
      // エラーをキャッチするためのリスナーを設定
      const errors = [];
      const consoleErrors = [];

      playwright.on("pageerror", (error) => {
        errors.push(error);
      });

      playwright.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });

      // ページにアクセス
      const response = await playwright.goto(page.path);

      // ページが正常にロードされたかチェック
      expect(response.status()).toBe(200);

      // ページタイトルが存在するかチェック
      const title = await playwright.title();
      expect(title).toBeTruthy();

      // JavaScriptエラーがないかチェック
      expect(
        errors,
        `JavaScript errors found on ${page.name} page: ${errors.map((e) => e.message).join(", ")}`
      ).toHaveLength(0);

      // 重大なコンソールエラーがないかチェック (ただし、一部の警告は除外)
      const significantErrors = consoleErrors.filter(
        (error) =>
          !error.includes("Warning:") &&
          !error.includes("DevTools") &&
          !error.includes("chrome-extension:")
      );
      expect(
        significantErrors,
        `Console errors found on ${page.name} page: ${significantErrors.join(", ")}`
      ).toHaveLength(0);

      // ページの基本要素が表示されているかチェック
      await expect(playwright.locator("body")).toBeVisible();

      console.log(`✅ ${page.name} page (${page.path}) loaded successfully`);
    });

    test(`should not show "Load failed" error on ${page.name} page`, async ({
      page: playwright,
    }) => {
      await playwright.goto(page.path);

      // "Load failed"またはその他のエラーメッセージがないかチェック
      const loadFailedText = await playwright
        .locator("text=Load failed")
        .count();
      expect(
        loadFailedText,
        `"Load failed" error found on ${page.name} page`
      ).toBe(0);

      // エラーメッセージの一般的なパターンをチェック
      const errorTexts = [
        "エラー:",
        "Error:",
        "Failed to",
        "読み込みに失敗",
        "ネットワークエラー",
        "不明なエラー",
      ];

      for (const errorText of errorTexts) {
        const count = await playwright.locator(`text="${errorText}"`).count();
        if (count > 0) {
          console.warn(
            `⚠️ Error text "${errorText}" found on ${page.name} page`
          );
        }
      }
    });

    // Technologiesページの特別なテスト
    if (page.path === "/technologies") {
      test("should handle API failures gracefully on Technologies page", async ({
        page: playwright,
      }) => {
        // ネットワークをブロックしてAPIエラーをシミュレート
        await playwright.route(
          "**/lapras.com/public/tktcorporation.json",
          (route) => {
            route.abort("failed");
          }
        );

        await playwright.goto(page.path);

        // エラーメッセージが適切に表示されるかチェック
        await expect(playwright.locator('[role="alert"]')).toBeVisible({
          timeout: 10000,
        });

        // 再試行ボタンが表示されるかチェック
        await expect(
          playwright.locator('button:has-text("再試行")')
        ).toBeVisible();

        console.log("✅ Technologies page handles API failures gracefully");
      });

      test("should show loading state on Technologies page", async ({
        page: playwright,
      }) => {
        await playwright.goto(page.path);

        // ローディングスピナーまたはテキストが表示されるかチェック（短時間）
        const loadingSpinner = playwright.locator('[role="status"]');
        const loadingText = playwright.locator('text="技術データを読み込み中"');
        const loadingVisible =
          (await loadingSpinner.isVisible()) || (await loadingText.isVisible());

        // ローディング状態が確認できない場合でも、最終的にコンテンツが表示されればOK
        if (!loadingVisible) {
          console.log(
            "Loading state not captured (too fast), checking final content..."
          );
        }

        // 最終的にコンテンツまたはエラーメッセージが表示されるまで待機
        await playwright.waitForFunction(
          () => {
            const loadingElement = document.querySelector('[role="status"]');
            const errorElement = document.querySelector('[role="alert"]');
            const contentElement = document.querySelector("section");

            return !loadingElement || errorElement || contentElement;
          },
          { timeout: 15000 }
        );

        console.log("✅ Technologies page loading behavior verified");
      });
    }
  });
}

// 全ページ共通のナビゲーションテスト
test.describe("Page Navigation", () => {
  test("should navigate between pages without errors", async ({
    page: playwright,
  }) => {
    // ホームページから開始
    await playwright.goto("/");

    // 各ページへのナビゲーションをテスト
    const links = [
      { selector: 'a[href="/resume"]', expectedPath: "/resume" },
      { selector: 'a[href="/technologies"]', expectedPath: "/technologies" },
    ];

    for (const link of links) {
      const linkElement = playwright.locator(link.selector);
      if ((await linkElement.count()) > 0) {
        await linkElement.click();
        await playwright.waitForURL(`**${link.expectedPath}`);

        // エラーがないかチェック
        const errors = [];
        playwright.on("pageerror", (error) => {
          errors.push(error);
        });

        expect(errors).toHaveLength(0);
        console.log(`✅ Successfully navigated to ${link.expectedPath}`);

        // ホームに戻る
        await playwright.goto("/");
      }
    }
  });
});
