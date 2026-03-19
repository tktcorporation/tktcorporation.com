/**
 * Purpose:
 * 経験の説明文をReactエレメントに変換するユーティリティ。
 * マークダウン風の記法（●、○、■など）をリスト形式に変換する。
 *
 * Context:
 * - LAPRASから取得した経験データの description フィールドを整形
 * - 階層構造を持つリスト表示をサポート
 * - Resume.tsx から抽出したロジックを一元管理
 */

import type React from "react";

/**
 * 説明文の各行の種類を判定するための型
 */
type LineType = "disc" | "sub" | "circle" | "paragraph";

/**
 * 行の種類を判定する
 */
function getLineType(line: string): LineType {
  if (line.startsWith("●") || line.startsWith("*")) {
    return "disc";
  }
  if (line.startsWith("　　■") || line.startsWith("    *")) {
    return "sub";
  }
  if (line.startsWith("　○") || line.startsWith("  *")) {
    return "circle";
  }
  return "paragraph";
}

/**
 * 行のプレフィックスを除去してテキストを取得する
 */
function extractLineText(line: string, lineType: LineType): string {
  switch (lineType) {
    case "disc":
      return line.substring(1).trim();
    case "sub":
      return line.replace(/^[　■\s*]+/, "");
    case "circle":
      return line.replace(/^[　○\s*]+/, "");
    case "paragraph":
      return line.trim();
  }
}

/**
 * 行の種類に応じたReact要素を生成する
 */
function createLineElement(
  text: string,
  lineType: LineType,
  index: number
): React.ReactElement {
  switch (lineType) {
    case "disc":
      return (
        <li key={`${index}-disc`} className="ml-4 list-disc">
          {text}
        </li>
      );
    case "sub":
      return (
        <li key={`${index}-sub`} className="list-circle ml-8 text-sm">
          {text}
        </li>
      );
    case "circle":
      return (
        <li key={`${index}-circle`} className="list-circle ml-6">
          {text}
        </li>
      );
    case "paragraph":
      // 「担当:」などのラベル行やプロジェクト概要は少し目立たせる
      if (text.endsWith(":") || text.endsWith("：")) {
        return (
          <p
            key={`${index}-para`}
            className="mt-2 mb-0.5 text-xs font-medium text-stone-600 md:text-sm"
          >
            {text}
          </p>
        );
      }
      return (
        <p key={`${index}-para`} className="mb-1 font-medium text-stone-700">
          {text}
        </p>
      );
  }
}

/**
 * 技術スタック行かどうかを判定する
 * "AWS / Docker / Python" のような " / " 区切りの行を検出
 */
function isTechStackLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  // " / " で区切られた2つ以上の項目があり、各項目が短い単語である場合
  const parts = trimmed.split(" / ");
  return parts.length >= 2 && parts.every((p) => p.trim().length <= 30);
}

/**
 * 経験の説明文をReactエレメントの配列に変換する
 *
 * 対応する記法:
 * - ● または * で始まる行 → 第1レベルのリスト項目
 * - 　　■ または "    *" で始まる行 → 第3レベルのサブ項目
 * - 　○ または "  *" で始まる行 → 第2レベルの項目
 * - その他 → 段落テキスト
 *
 * 技術スタック行（"AWS / Docker / Python" 形式）は自動的にスキップする。
 * 技術情報はTechBadgeで別途表示されるため冗長。
 *
 * @param description - 変換する説明文
 * @returns Reactエレメントの配列
 */
export function formatDescription(description: string): React.ReactElement[] {
  if (!description) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "formatDescription: received empty or undefined description"
      );
    }
    return [];
  }

  return description
    .split("\n")
    .map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;

      // 技術スタック行はスキップ（TechBadgeで表示済み）
      if (isTechStackLine(trimmedLine)) return null;

      const lineType = getLineType(line);
      const text = extractLineText(line, lineType);
      return createLineElement(text, lineType, index);
    })
    .filter(Boolean) as React.ReactElement[];
}
