# Resume 職歴セクション リデザイン

## Context

職歴セクションの情報構成とビジュアルを改善する。現状の問題：

- 同じ会社（LAPRAS）がフリーランス/正社員で別グループに分かれる
- 連続期間サブグルーピングが`end_year=null`のエントリで壊れ、ソート順がおかしい
- `formatDescription`が`●○■*`のみ対応で、実際のデータの`-`リストを正しく描画できない
- 区切りが余白のみで、スクロール時に会社の境界が分かりにくい

## 方針

1. **グルーピング簡素化**: `organization_name`のみで集約、連続期間サブグルーピング廃止、全エントリ新しい順
2. **Markdown汎用描画**: `react-markdown` + `remark-gfm`でdescriptionを描画
3. **タイムラインUI**: 左ボーダー+ドットマーカーで視覚的な構造を表現

## 実装ステップ

### Step 1: 依存追加

```bash
npm install react-markdown remark-gfm
```

### Step 2: テック抽出ユーティリティ作成

**新規**: `src/utils/extractTechFromDescription.ts`

```typescript
export function splitTechAndDescription(description: string): {
  technologies: string[];
  body: string;
};
```

- 1行目が`Tech1 / Tech2 / Tech3`形式→テック配列に分割
- 残りのテキスト（先頭の空行除去）→bodyとして返す

### Step 3: `formatDescription.tsx`をreact-markdown化

- 現在の独自パーサーを削除
- `splitTechAndDescription`でbody部分を取得
- `<ReactMarkdown remarkPlugins={[remarkGfm]}>`で描画
- Tailwindスタイルを`components`propで適用:
  - `p`: `mb-1.5 text-xs md:text-sm text-stone-500 leading-relaxed`
  - `ul`: `ml-4 list-disc space-y-0.5`
  - `li`: `text-xs md:text-sm text-stone-500 leading-relaxed`
  - `strong`: `font-medium text-stone-600`

### Step 4: 型定義更新 — `src/types/experience.ts`

- `DescriptionFormatter`の戻り値を`React.ReactElement[]` → `React.ReactNode`に変更

### Step 5: グルーピング簡素化 — `src/utils/experienceGrouping.ts`

- `getGroupKey()`: `organization_name`のみで集約（`is_client_work`/`client_company_name`を除去）
- `groupExperiences()`: `splitIntoConsecutiveGroups()`呼び出しを除去、各org内で全experienceを新しい順ソート
- `createGroupedExperience()`: 最古のstart、最新のend（nullあり）で期間計算
- `groupByCompany()`: 1対1マッピングになるが互換性のため維持

### Step 6: タイムラインUI — `src/components/resume/ExperienceCard.tsx`

**構造:**

```
[●] LAPRAS株式会社                    2021/02 - Present    ← 会社ヘッダー
 │
 │  [·] Webアプリケーションエンジニア    2025/08 - Present    ← ロール
 │      AWS  Docker  Python  ...                              ← テックバッジ
 │      C向けプロダクト開発                                    ← Markdown描画
 │      - 目標設定から企画...
 │
 │  [·] Webアプリケーションエンジニア    2024/11 - 2025/07
 │      業務委託                                              ← client workラベル
 │      ...
```

**CSS構成:**

- 会社セクション: `relative pl-6 md:pl-8`
- 縦線: 専用div `absolute left-[5px] top-3 bottom-0 w-px bg-stone-200`（最後の会社では高さを制限）
- 会社ドット: `absolute left-0 top-1.5 w-3 h-3 rounded-full bg-blue-400`
- ロールドット: `absolute left-[3px] top-2 w-1.5 h-1.5 rounded-full bg-stone-300`
- ロール間: `space-y-8`
- 会社間: `space-y-14 md:space-y-16`

**client workラベル:**

```tsx
{
  exp.is_client_work && exp.client_company_name && (
    <span className="text-[10px] text-stone-400">業務委託</span>
  );
}
```

### Step 7: ExperienceSection/Resume.tsx 更新

- `extractTechTags`を`splitTechAndDescription`ベースに変更
- `formatDescription`の戻り値型変更に対応
- スケルトンのタイムラインスタイル対応

### Step 8: 検証

```bash
npm run check     # lint + fmt + typecheck
npm run test      # 既存テスト
npm run build     # ビルド + エクスポートファイル生成確認
```

- ブラウザでResumeページのスクリーンショット確認
- モバイル幅でのレスポンシブ確認

## 変更対象ファイル

| ファイル                                      | 変更内容                   |
| --------------------------------------------- | -------------------------- |
| `src/utils/extractTechFromDescription.ts`     | **新規** テック抽出        |
| `src/utils/formatDescription.tsx`             | react-markdown化           |
| `src/utils/experienceGrouping.ts`             | グルーピング簡素化         |
| `src/types/experience.ts`                     | DescriptionFormatter型変更 |
| `src/components/resume/ExperienceCard.tsx`    | タイムラインUI             |
| `src/components/resume/ExperienceSection.tsx` | スペーシング調整           |
| `src/pages/Resume.tsx`                        | テック抽出関数差し替え     |

## 変更しないもの

- `src/data/experiences.json` — データ構造はそのまま
- `src/utils/parseExperienceDescription.ts` — エクスポート用パーサーは維持
- `src/utils/exportResume*.ts` — エクスポート機能は維持
- `src/components/resume/SkillsSection.tsx` — 今回のスコープ外
- `src/components/resume/TechBadge.tsx` — 既存のまま再利用
