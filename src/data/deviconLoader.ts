/**
 * Purpose:
 * Devicon データを public ディレクトリから動的に読み込むモジュール。
 * ビルド時のインポート問題を回避し、実行時にデータを取得する。
 *
 * Context:
 * - devicon.json を public/data に配置
 * - 実行時に fetch で読み込み
 * - キャッシュによる効率化
 */

export interface DeviconEntry {
  name: string;
  altnames: string[];
  tags: string[];
  versions: {
    svg: string[];
    font: string[];
  };
  color?: string;
  aliases?: Array<{
    base: string;
    alias: string;
  }>;
}

// キャッシュ用の変数
let deviconData: DeviconEntry[] | null = null;
let deviconMap: Map<string, DeviconEntry> | null = null;
let deviconAltNameMap: Map<string, DeviconEntry> | null = null;
let loadingPromise: Promise<void> | null = null;

/**
 * Devicon データを読み込み
 */
async function loadDeviconData(): Promise<void> {
  if (deviconData) return;

  if (loadingPromise) {
    await loadingPromise;
    return;
  }

  loadingPromise = (async () => {
    try {
      const response = await fetch("/data/devicon.json");
      if (!response.ok) {
        throw new Error(`Failed to load devicon data: ${response.status}`);
      }

      const data = await response.json();
      deviconData = data as DeviconEntry[];

      // マップを作成
      deviconMap = new Map<string, DeviconEntry>();
      deviconAltNameMap = new Map<string, DeviconEntry>();

      for (const entry of deviconData) {
        // 正式名称でマップ
        deviconMap.set(entry.name.toLowerCase(), entry);

        // 代替名でもマップ
        for (const altname of entry.altnames || []) {
          deviconAltNameMap.set(altname.toLowerCase(), entry);
        }
      }

      console.log(`Loaded ${deviconData.length} devicon entries`);
    } catch (error) {
      console.error("Failed to load devicon data:", error);
      // フォールバックとして空のデータを設定
      deviconData = [];
      deviconMap = new Map();
      deviconAltNameMap = new Map();
    }
  })();

  await loadingPromise;
}

/**
 * 技術名から Devicon エントリーを取得
 * @param name - 技術名
 * @returns Devicon エントリーまたは undefined
 */
export async function getDeviconEntry(
  name: string
): Promise<DeviconEntry | undefined> {
  await loadDeviconData();

  if (!deviconMap || !deviconAltNameMap) return undefined;

  const normalized = name.toLowerCase();
  return deviconMap.get(normalized) || deviconAltNameMap.get(normalized);
}

/**
 * 技術名が Devicon でサポートされているかチェック
 * @param name - 技術名
 * @returns サポートされている場合は true
 */
export async function isDeviconSupported(name: string): Promise<boolean> {
  const entry = await getDeviconEntry(name);
  return entry !== undefined;
}

/**
 * Devicon クラス名を生成
 * @param name - 言語/フレームワーク名
 * @param variant - アイコンのバリアント
 * @param colored - カラー版を使用するか
 * @returns Devicon クラス名
 */
export async function getDeviconClass(
  name: string,
  variant:
    | "plain"
    | "original"
    | "line"
    | "plain-wordmark"
    | "original-wordmark" = "plain",
  colored = true
): Promise<string | null> {
  const entry = await getDeviconEntry(name);

  if (!entry) {
    return null;
  }

  // Devicon エントリーが見つかった場合
  const deviconName = entry.name;

  // バリアントがサポートされているかチェック
  let actualVariant = variant;
  if (!entry.versions.font.includes(variant)) {
    // バリアントがサポートされていない場合、エイリアスをチェック
    const alias = entry.aliases?.find((a) => a.alias === variant);
    if (alias) {
      actualVariant = alias.base as typeof variant;
    } else {
      // それでもない場合は、利用可能な最初のバリアントを使用
      actualVariant = entry.versions.font[0] as typeof variant;
    }
  }

  return `devicon-${deviconName}-${actualVariant}${colored ? "" : " colored"}`;
}

/**
 * 初期化（プリロード用）
 */
export function preloadDeviconData(): void {
  loadDeviconData().catch(console.error);
}
