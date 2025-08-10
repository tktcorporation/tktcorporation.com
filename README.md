# tktcorporation.com

tktの個人サイト - プロフィール情報と職歴を表示するWebアプリケーション

## 概要

このプロジェクトは、Webアプリケーション開発者であるtktの個人サイトです。メインページではプロフィールとソーシャルリンクを表示し、履歴書ページではLAPRASと連携した職歴情報を提供しています。

### 主な機能

- **ホームページ**: プロフィール情報、ソーシャルメディアリンク、サポートリンク
- **履歴書ページ**: LAPRAS連携による職歴の自動表示、スキル抽出、レスポンシブデザイン
- **モダンUI**: グラデーション背景、アニメーション効果、ダークテーマ

## 技術スタック

- **フレームワーク**: React 19 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **ルーティング**: React Router
- **ホスティング**: Firebase
- **データソース**: LAPRAS API (MCP統合)
- **コード品質**: Biome (linting & formatting)

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
npm run lint         # 全てのlintチェック実行
npm run lint:biome   # Biome linter実行
npm run typecheck    # TypeScript型チェック
npm run format       # コードフォーマット
npm run lint:fix     # 自動修正可能なlint問題を修正
```

### テスト・スクリーンショット
```bash
npm run test         # 表示テスト実行
npm run screenshot   # PRスクリーンショット生成
```

## プロジェクト構成

```
src/
├── pages/           # ページコンポーネント
│   ├── Home.tsx     # ホームページ
│   └── Resume.tsx   # 履歴書ページ
├── data/            # データファイル
│   └── experiences.json # 職歴データ（LAPRAS連携）
├── types/           # TypeScript型定義
└── styles/          # スタイルファイル
```

## LAPRAS連携

このサイトは[LAPRAS](https://lapras.com/)のAPIと連携し、職歴データを自動的に取得・表示します。MCPプロトコルを使用してデータの同期を行っています。

## デプロイ

このサイトはFirebaseにホスティングされており、GitHub Actionsを通じて自動デプロイされます。

## 開発について

### コード規約
- インデント: 2スペース
- 行の長さ: 80文字
- クォート: ダブルクォート使用
- セミコロン: 必須

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