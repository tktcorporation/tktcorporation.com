/**
 * Purpose:
 * 経験の説明文をReact要素に変換するユーティリティ。
 * react-markdown + remark-gfm で Markdown を汎用的に描画する。
 *
 * Context:
 * - experiences.json の description を整形して表示
 * - 1行目のテック行は splitTechAndDescription で除去済みの本文を受け取る
 * - Tailwind スタイルを components prop で適用
 */

import type React from "react";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { splitTechAndDescription } from "./extractTechFromDescription";

/**
 * react-markdown の components prop に渡すスタイル定義
 * design-system.md のトークンに準拠
 */
const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="mb-1.5 text-xs leading-relaxed text-stone-500 md:text-sm">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="ml-4 list-disc space-y-0.5">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="text-xs leading-relaxed text-stone-500 md:text-sm">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-stone-600">{children}</strong>
  ),
};

/**
 * 経験の説明文をReact要素に変換する
 *
 * description 全体を受け取り、1行目のテック行を除去した本文を
 * react-markdown で描画する。
 *
 * @param description - 変換する説明文
 * @returns React要素
 */
export function formatDescription(description: string): React.ReactNode {
  if (!description) {
    return null;
  }

  const { body } = splitTechAndDescription(description);

  if (!body.trim()) {
    return null;
  }

  return (
    <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {body}
    </Markdown>
  );
}
