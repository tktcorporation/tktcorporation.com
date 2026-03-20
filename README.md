# tktcorporation.com

tktの個人サイト - プロフィール情報と職歴を表示するWebアプリケーション

## 概要

このプロジェクトは、Webアプリケーション開発者であるtktの個人サイトです。メインページではプロフィールとソーシャルリンクを表示し、履歴書ページではLAPRASと連携した職歴情報を提供しています。

### 主な機能

- **ホームページ**: プロフィール情報、ソーシャルメディアリンク、サポートリンク
- **履歴書ページ**: LAPRAS連携による職歴の自動表示、スキル抽出、AI向けエクスポート
- **技術ページ**: 使用技術の一覧表示
- **ミニマルUI**: 温かみのあるライトテーマ、手書き風SVGイラストアクセント

## 技術スタック

- **フレームワーク**: React 19 + TypeScript
- **ビルドツール**: Vite+ (vite-plus)
- **スタイリング**: Tailwind CSS
- **ルーティング**: React Router
- **ホスティング**: GitHub Pages
- **データソース**: LAPRAS API (MCP統合)
- **コード品質**: Oxlint (linting) + Oxfmt (formatting)

## セットアップ

### 必要な環境

- Node.js >= 24.0.0
- npm

### インストールと起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動（http://localhost:3000）
npm run dev
```

## 開発コマンド

### 基本コマンド

```bash
npm run dev        # 開発サーバー起動
npm run build      # 本番ビルド
npm run preview    # ビルド結果のプレビュー
```

### コード品質

```bash
npm run check      # 全チェック実行 (lint + format + typecheck)
npm run lint       # Oxlint + GitHub Actions lintチェック
npm run lint:fix   # 自動修正可能なlint問題を修正
npm run format     # Oxfmtでコードフォーマット
npm run typecheck  # TypeScript型チェック
```

### テスト

```bash
npm run test           # ユニットテスト実行 (Vitest)
npm run test:run       # ユニットテスト1回実行
npm run test:coverage  # カバレッジ付きテスト
npm run test:e2e       # E2Eテスト実行 (Playwright)
npm run test:all       # 全テスト実行 (unit + E2E)
npm run screenshot     # PRスクリーンショット生成
```

## プロジェクト構成

```
src/
├── pages/           # ページコンポーネント
│   ├── Home.tsx     # ホームページ
│   ├── Resume.tsx   # 履歴書ページ
│   └── Technologies.tsx # 技術ページ
├── components/      # UIコンポーネント
│   ├── resume/      # 履歴書関連コンポーネント
│   ├── ui/          # 汎用UIコンポーネント
│   └── illustrations/ # 手書き風SVGイラスト
├── data/            # データファイル
│   └── experiences.json # 職歴データ（LAPRAS連携）
├── utils/           # ユーティリティ関数
├── hooks/           # カスタムフック
├── types/           # TypeScript型定義
├── lib/             # ライブラリユーティリティ
└── styles/          # スタイルファイル
```

## LAPRAS連携

このサイトは[LAPRAS](https://lapras.com/)のAPIと連携し、職歴データを自動的に取得・表示します。MCPプロトコルを使用してデータの同期を行っています。

## デプロイ

このサイトはGitHub Pagesにホスティングされており、masterブランチへのpush時にGitHub Actionsを通じて自動デプロイされます。

## 開発について

### コード規約

- インデント: 2スペース
- 行の長さ: 80文字
- クォート: ダブルクォート使用
- セミコロン: 必須
- フォーマッター: Oxfmt

### TypeScript設定

- strict mode有効
- ES2020ターゲット
- React JSX transform使用

## ライセンス

© 2025 tkt - 個人使用

## お問い合わせ

- Website: https://tktcorporation.com
- GitHub: [@tktcorporation](https://github.com/tktcorporation)
- LAPRAS: https://lapras.com/public/tktcorporation
