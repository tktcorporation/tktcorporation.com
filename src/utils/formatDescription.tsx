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
        <li key={`${index}-sub`} className="ml-8 text-sm list-circle">
          {text}
        </li>
      );
    case "circle":
      return (
        <li key={`${index}-circle`} className="ml-6 list-circle">
          {text}
        </li>
      );
    case "paragraph":
      return (
        <p key={`${index}-para`} className="mb-1">
          {text}
        </p>
      );
  }
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

      const lineType = getLineType(line);
      const text = extractLineText(line, lineType);
      return createLineElement(text, lineType, index);
    })
    .filter(Boolean) as React.ReactElement[];
}
