#!/usr/bin/env npx tsx

/**
 * Purpose:
 * LAPRAS MCP APIから最新の職歴データを取得して、experiences.jsonを更新する。
 * 認証付きAPI（Bearer token）を使用するため、環境変数 LAPRAS_API_KEY が必要。
 *
 * Context:
 * - 公開API（/public/<username>.json）には職歴データが含まれないため、
 *   MCP API（/api/mcp/experiences）を使用する
 * - update-lapras-data.ts（公開データ）とは別のエンドポイント・認証方式
 * - ExperienceData型によるバリデーションでデータの整合性を保証
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import type { ExperienceData } from "../src/types/experience.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LAPRAS_MCP_API_URL = "https://lapras.com/api/mcp/experiences";
const OUTPUT_PATH = path.join(__dirname, "../src/data/experiences.json");

async function updateExperiences() {
  const apiKey = process.env.LAPRAS_API_KEY;
  if (!apiKey) {
    console.error(
      "❌ LAPRAS_API_KEY environment variable is required.\n" +
        "   Get your API key from: https://lapras.com/settings"
    );
    process.exit(1);
  }

  try {
    console.log("📥 Fetching experiences from:", LAPRAS_MCP_API_URL);

    const response = await fetch(LAPRAS_MCP_API_URL, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}\n${body}`
      );
    }

    const rawData = (await response.json()) as ExperienceData;

    // Basic structure validation
    if (!rawData.experience_list || !Array.isArray(rawData.experience_list)) {
      throw new Error("Invalid response: missing experience_list array");
    }

    for (const exp of rawData.experience_list) {
      if (!exp.id || !exp.organization_name || !exp.start_year) {
        throw new Error(
          `Invalid experience entry: missing required fields (id=${exp.id})`
        );
      }
    }

    console.log("✅ Validation successful");

    // Read existing data for diff reporting
    let oldCount = 0;
    if (fs.existsSync(OUTPUT_PATH)) {
      const oldData = JSON.parse(
        fs.readFileSync(OUTPUT_PATH, "utf-8")
      ) as ExperienceData;
      oldCount = oldData.experience_list.length;
    }

    // Pretty print JSON for readability
    const jsonContent = JSON.stringify(rawData, null, 2) + "\n";

    fs.writeFileSync(OUTPUT_PATH, jsonContent, "utf-8");

    const fileSize = (fs.statSync(OUTPUT_PATH).size / 1024).toFixed(2);
    console.log(`💾 Successfully saved experiences.json (${fileSize} KB)`);
    console.log(`📁 Location: ${OUTPUT_PATH}`);

    console.log(`\n📊 Stats:`);
    console.log(
      `   - Experiences: ${oldCount} → ${rawData.experience_list.length}`
    );

    const orgs = [
      ...new Set(rawData.experience_list.map((e) => e.organization_name)),
    ];
    console.log(`   - Organizations: ${orgs.join(", ")}`);

    const latest = rawData.experience_list.find((e) => e.end_year === null);
    if (latest) {
      console.log(
        `   - Current: ${latest.organization_name} (${latest.start_year}/${latest.start_month}~)`
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error updating experiences:", error.message);
    } else {
      console.error("❌ Unknown error:", error);
    }
    process.exit(1);
  }
}

updateExperiences();
