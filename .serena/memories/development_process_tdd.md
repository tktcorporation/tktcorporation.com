# Test-Driven Development Process

このプロジェクトの開発プロセス概要。詳細は `/workspaces/tktcorporation.com/DEVELOPMENT_PROCESS.md` を参照。

## 基本方針

**テストコードが仕様書であり、進捗管理ツール**

## 開発フロー

1. **仕様決定**: What, Why, How, When を明確化
2. **E2Eテスト作成**: `tests/e2e/[feature].spec.ts` に仕様を記述
3. **チェックリスト**: テストコード内で進捗管理
4. **ユニットテスト**: 必要に応じて `tests/utils/[module].test.ts` 作成
5. **実装**: Red-Green-Refactor サイクル
6. **完了**: `.skip()` 削除、Implementation Status 更新

## 未実装機能の管理

- `.skip()` でテストをスキップ → 後から集計可能
- スキップ数 = 未実装機能数
- チェックリスト `[ ]` で視覚的に管理

## 仕様変更時

1. テストコードを更新
2. 実装を修正
3. テスト内のドキュメント（Purpose, Design Decisions）を更新

## テストコードの役割

- **仕様書**: テストの存在自体が仕様を表す
- **進捗管理**: `.skip()` の数で未実装を把握
- **ドキュメント**: 設計判断の理由を記述

## コマンド

```bash
npm run test:e2e        # E2Eテスト実行
npm run test:run        # ユニットテスト実行
npm run test:all        # 全テスト実行
```

## 実例

- E2E仕様: `tests/e2e/resume-export.spec.ts`
- Unit仕様: `tests/utils/parseExperienceDescription.test.ts`
- 概要: `IMPLEMENTATION_AI_EXPORT.md`

## 重要

次に機能開発をする際は、必ず `DEVELOPMENT_PROCESS.md` のプロセスに従う。
