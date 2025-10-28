# Development Process - Test-Driven Specification

このプロジェクトの開発プロセスガイド。機能開発時は必ずこのプロセスに従ってください。

## 🎯 基本方針

**テストコードが仕様書であり、進捗管理ツールである**

- テストを見れば機能の仕様と進捗が分かる
- 仕様変更時はテストコードを更新する
- 実装はテストの通過状況で管理する

## 📋 開発フロー

### 1. 仕様の決定

機能を実装する前に、以下を明確にする：

```
- What: 何を作るか
- Why: なぜ作るか（解決する問題）
- How: どう実現するか（設計判断）
- When: どこまで作るか（スコープ）
```

### 2. E2Eテストの作成

仕様をE2Eテストとして記述する。

**ファイル作成**:
```bash
tests/e2e/[feature-name].spec.ts
```

**テンプレート**:
```typescript
/**
 * ============================================================================
 * [Feature Name] - Specification
 * ============================================================================
 *
 * ## Purpose (Why)
 * この機能が解決する問題と目的
 *
 * ## Implementation Status
 * ✅ Completed:
 * - 完了した機能のリスト
 *
 * ⏳ In Progress:
 * - 実装中の機能のリスト
 *
 * 📝 Planned (Skipped Tests):
 * - まだ実装していない機能のリスト
 *
 * ## Design Decisions
 * 重要な設計判断とその理由
 *
 * ## Technical Architecture
 * データフロー、主要なコンポーネント
 *
 * ============================================================================
 * EXECUTABLE SPECIFICATION TESTS BELOW
 * ============================================================================
 */

import { expect, test } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should implement basic functionality", async ({ page }) => {
    // 実装済みの機能のテスト
  });

  test.skip("should support advanced feature", async ({ page }) => {
    // TODO: まだ実装していない機能
    // スキップしておいて、後で実装する
  });
});
```

### 3. テストコード内での進捗管理

#### チェックリスト方式

```typescript
/**
 * ## Implementation Checklist
 *
 * ### Phase 1: Core Functionality
 * - [x] Basic data parsing
 * - [x] Error handling
 * - [ ] Advanced validation (test.skip)
 *
 * ### Phase 2: UI Integration
 * - [x] Display component
 * - [ ] Edit component (test.skip)
 * - [ ] Delete component (test.skip)
 *
 * ### Phase 3: Polish
 * - [ ] Loading states (test.skip)
 * - [ ] Error states (test.skip)
 * - [ ] Accessibility (test.skip)
 */
```

#### 進捗の確認方法

```bash
# E2Eテストを実行して進捗確認
npm run test:e2e

# 結果例:
# 5 passed
# 3 skipped  ← これが未実装の機能数
```

### 4. ユニットテストの作成

必要に応じてユニットテストを追加する。全部を最初に書く必要はない。

**ファイル作成**:
```bash
tests/utils/[module-name].test.ts
```

**書き方**:
```typescript
/**
 * ============================================================================
 * [Module Name] - Unit Test Specification
 * ============================================================================
 *
 * ## Module Purpose
 * このモジュールの役割と責務
 *
 * ## Design Decisions
 * 実装方法の選択理由
 *
 * ## Input/Output Specification
 * 入力フォーマット、出力フォーマット、エッジケース
 *
 * ============================================================================
 */

describe("Module Name", () => {
  describe("Basic Functionality", () => {
    it("should handle normal case", () => {
      // 実装済み
    });
  });

  describe.skip("Advanced Features", () => {
    it("should handle complex case", () => {
      // TODO: 後で実装
    });
  });
});
```

### 5. 実装

テストが通るように実装を進める。

**実装の順序**:
1. 失敗するテストを書く（Red）
2. 最小限の実装でテストを通す（Green）
3. コードをきれいにする（Refactor）

**進捗の見方**:
```bash
# ユニットテスト実行
npm run test:run

# 結果:
# Test Files  2 passed | 1 skipped (3)
# Tests  43 passed | 12 skipped (55)
#
# ↑ 12個のテストがスキップ = 12機能が未実装
```

### 6. 実装完了後

1. **テストを有効化**: `.skip()` を削除
2. **仕様更新**: テストコード内の Implementation Status を更新
3. **チェックリスト更新**: 完了項目に `[x]` をつける

```typescript
/**
 * ## Implementation Status
 * ✅ Completed:
 * - Basic functionality
 * - Error handling
 * - Advanced validation  ← NEW!
 *
 * ⏳ In Progress:
 * - UI integration
 *
 * 📝 Planned:
 * - Performance optimization
 */
```

## 🔄 仕様変更時の対応

### 手順

1. **テストコードを更新**: 新しい仕様に合わせてテストを書き換える
2. **実装を修正**: テストが通るように修正
3. **ドキュメント更新**: テスト内の Purpose や Design Decisions を更新

### 例

```typescript
// 仕様変更前
test("should export as PDF", async ({ page }) => {
  // PDF export test
});

// 仕様変更: PDF→Markdown に変更
test("should export as Markdown", async ({ page }) => {
  // Markdown export test
});

// Implementation Status も更新
/**
 * ## Design Decisions
 *
 * ### Export Format: Markdown (Changed from PDF)
 * Reason: Better compatibility with AI agents
 * - Markdown is more parseable
 * - Lighter weight than PDF
 * - Changed on 2025-10-28
 */
```

## 📊 進捗管理の実例

### 集計コマンド

```bash
# E2Eテストの進捗
npm run test:e2e | grep -E "(passed|skipped)"
# → "5 passed, 3 skipped" = 5/8 完了

# ユニットテストの進捗
npm run test:run | grep -E "Tests.*skipped"
# → "43 passed | 12 skipped" = 43/55 完了
```

### チェックリスト例（テストコード内）

```typescript
/**
 * ## Feature Roadmap
 *
 * ### v1.0 - MVP
 * - [x] URL-based exports (/resume.md)
 * - [x] Markdown generation
 * - [x] Minimal UI
 * - [x] Build-time generation
 *
 * ### v1.1 - Enhancements (Current Sprint)
 * - [x] JSON export
 * - [x] Plain text export
 * - [ ] Multi-language support (test.skip)
 *
 * ### v2.0 - Future
 * - [ ] PDF export (test.skip)
 * - [ ] Custom styling (test.skip)
 * - [ ] RSS feed (test.skip)
 */
```

## 🎨 テストコードの役割

### 1. 仕様書として

```typescript
test("should display resume in simple pre tag", async ({ page }) => {
  // この test の存在自体が
  // 「シンプルなpreタグで表示する」という仕様を表す
});
```

### 2. 進捗管理として

```typescript
test("implemented feature", () => {});           // ✅ 完了
test.skip("planned feature", () => {});          // 📝 未実装
test.only("debugging this feature", () => {});   // 🔍 デバッグ中
```

### 3. ドキュメントとして

```typescript
/**
 * ## Why This Design?
 *
 * We chose Zod for validation because:
 * 1. Runtime type checking catches data corruption
 * 2. Self-documenting schema
 * 3. Automatic TypeScript inference
 *
 * Alternatives considered:
 * - Manual validation: Too error-prone
 * - JSON Schema: Less TypeScript-friendly
 */
test("should validate with Zod", () => {});
```

## ✅ ベストプラクティス

### DO

- ✅ テストコードに仕様を書く
- ✅ `.skip()` で未実装を明示する
- ✅ チェックリストで進捗を可視化する
- ✅ 設計判断の理由を残す
- ✅ テストの説明を読めば何をテストしているか分かるようにする

### DON'T

- ❌ 別ファイルに仕様を書いて放置する
- ❌ 未実装機能のテストを削除する（skip にする）
- ❌ テストなしで実装を進める
- ❌ 設計判断の理由を省略する
- ❌ テストの説明が `test("should work")` のような曖昧なもの

## 🔧 ツール活用

### スキップ数の集計

```bash
# E2Eテストのスキップ数
npm run test:e2e 2>&1 | grep skipped | awk '{print $3}'

# ユニットテストのスキップ数
npm run test:run 2>&1 | grep "Tests" | grep -oP '\d+(?= skipped)'
```

### テスト実行の効率化

```bash
# 特定のファイルだけ実行
npm run test:e2e tests/e2e/resume-export.spec.ts

# UI モードで実行（進捗確認しやすい）
npm run test:e2e:ui

# watch モードで開発
npm run test
```

## 📚 参考: 実際の例

このプロジェクトでの実装例：

- **E2E仕様**: [`tests/e2e/resume-export.spec.ts`](./tests/e2e/resume-export.spec.ts)
- **Unit仕様**: [`tests/utils/parseExperienceDescription.test.ts`](./tests/utils/parseExperienceDescription.test.ts)
- **概要ドキュメント**: [`IMPLEMENTATION_AI_EXPORT.md`](./IMPLEMENTATION_AI_EXPORT.md)

## 🎓 まとめ

1. **仕様を決める** → E2Eテストに書く
2. **チェックリストを作る** → テストコード内に記述
3. **`.skip()` で未実装を管理** → 後から集計可能
4. **テストを通す** → 実装を進める
5. **スキップを減らす** → 進捗を確認
6. **仕様変更時はテストを更新** → コードと仕様が常に同期

このプロセスを守ることで：
- ✅ 仕様とコードが乖離しない
- ✅ 進捗が可視化される
- ✅ 設計意図が保存される
- ✅ 他の開発者（AI含む）が理解しやすい

---

**次に機能開発をする際は、必ずこのプロセスに従ってください。**
