#!/usr/bin/env npx tsx

/**
 * Purpose:
 * LAPRAS APIから最新のデータを取得して、ローカルのJSONファイルを更新する。
 * このスクリプトによりLAPRASのデータを静的アセットとして
 * アプリケーションに組み込むことができる。
 *
 * Context:
 * - CI/CDパイプラインやローカル開発での定期的な実行を想定
 * - Zodスキーマによるバリデーションでデータの整合性を保証
 * - 静的なデータ配信によりAPI呼び出しのオーバーヘッドを削減
 * - エラーハンドリングと詳細なログで運用を支援
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { z } from "zod";
import { LaprasDataSchema } from "../src/data/laprasSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LAPRAS_API_URL = "https://lapras.com/public/tktcorporation.json";
const OUTPUT_PATH = path.join(__dirname, "../src/data/lapras-data.json");

async function updateLaprasData() {
  try {
    console.log("📥 Fetching LAPRAS data from:", LAPRAS_API_URL);

    const response = await fetch(LAPRAS_API_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    const rawData = await response.json();

    // Validate data with Zod schema
    console.log("🔍 Validating data structure...");
    const validatedData = LaprasDataSchema.parse(rawData);
    console.log("✅ Data validation successful");

    // Pretty print JSON for readability
    const jsonContent = JSON.stringify(validatedData, null, 2);

    // Write to file
    fs.writeFileSync(OUTPUT_PATH, jsonContent, "utf-8");

    const fileSize = (fs.statSync(OUTPUT_PATH).size / 1024).toFixed(2);
    console.log(`💾 Successfully saved lapras-data.json (${fileSize} KB)`);
    console.log(`📁 Location: ${OUTPUT_PATH}`);

    // Show validated stats
    console.log(`\n📊 Validated Data Stats:`);
    console.log(`   - Name: ${validatedData.name}`);
    console.log(
      `   - GitHub repositories: ${validatedData.github_repositories.length}`
    );
    console.log(`   - Qiita articles: ${validatedData.qiita_articles.length}`);
    console.log(`   - Zenn articles: ${validatedData.zenn_articles.length}`);
    console.log(
      `   - Scores: E=${validatedData.e_score}, B=${validatedData.b_score}, I=${validatedData.i_score}`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error updating LAPRAS data:", error.message);

      // Show detailed validation errors if it's a Zod error
      if (error.name === "ZodError") {
        console.error("\n📋 Validation errors:");
        const zodError = error as z.ZodError;
        zodError.issues?.forEach((err) => {
          console.error(`   - ${err.path.join(".")}: ${err.message}`);
        });
      }
    } else {
      console.error("❌ Unknown error:", error);
    }
    process.exit(1);
  }
}

// Run the update
updateLaprasData();
