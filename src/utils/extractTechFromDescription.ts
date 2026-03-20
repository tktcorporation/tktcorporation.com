/**
 * Purpose:
 * 経験データの description フィールドから技術スタック行と本文を分離するユーティリティ。
 *
 * Context:
 * - experiences.json の description は1行目が "Tech1 / Tech2 / Tech3" 形式
 * - この行をテックバッジ用の配列に分割し、残りを Markdown 本文として返す
 * - ExperienceCard で技術バッジとMarkdown描画の両方に使用
 */

/**
 * description の1行目がスラッシュ区切りの技術スタック行かを判定し、
 * テック配列と本文に分離する。
 *
 * 1行目が "AWS / Docker / Python" のような形式であればテック行とみなす。
 * 判定基準: スラッシュで区切った各トークンが3単語以内であること。
 */
export function splitTechAndDescription(description: string): {
  technologies: string[];
  body: string;
} {
  if (!description.trim()) {
    return { technologies: [], body: "" };
  }

  const lines = description.split("\n");
  const firstLine = lines[0].trim();

  // スラッシュ区切りかチェック
  if (firstLine.includes(" / ")) {
    const tokens = firstLine.split(" / ").map((t) => t.trim());
    // 各トークンが短い（技術名として妥当な長さ）かチェック
    const isTechLine = tokens.every(
      (t) => t.length > 0 && t.split(/\s+/).length <= 3
    );

    if (isTechLine) {
      // 残りのテキスト（先頭の空行を除去）
      const rest = lines.slice(1).join("\n").replace(/^\n+/, "");
      return { technologies: tokens, body: rest };
    }
  }

  return { technologies: [], body: description };
}
