/**
 * Purpose:
 * ポートフォリオのスライドコンテンツコンポーネント。
 * 縦スクロール版とSpectacle版の両方で同じJSXを共有し、
 * スタイルの一貫性を保つ。
 *
 * Context:
 * - 縦スクロール版とまったく同じHTMLとスタイルを使用
 * - Spectacleのコンテナに入れても崩れないように設計
 * - 画像の表示/非表示などの条件分岐もここで管理
 */

import { ExternalLink } from "lucide-react";

// 画像をインポート
import vfesArtistImage from "../assets/vfes2025-artist.png";
import vfesCalendarImage from "../assets/vfes2025-comm-calendar.png";
import vfesOptimiseImage from "../assets/vfes2025-optimise.png";

interface SlideContentProps {
  exportMode?: boolean;
}

// タイトルスライド
export const TitleSlide = () => (
  <div className="flex h-full flex-col items-center justify-center text-center">
    <h1 className="mb-6 text-6xl font-light tracking-tight text-slate-100 md:text-7xl">
      tktcorporation
    </h1>
    <p className="text-2xl font-light text-slate-200 md:text-3xl">
      Software Engineer / Product Manager
    </p>
  </div>
);

// Capabilitiesスライド
export const CapabilitiesSlide = () => (
  <div className="flex h-full flex-col justify-center">
    <div className="mb-12 text-center">
      <h2 className="mb-4 text-5xl font-light text-slate-100 md:text-6xl">
        Capabilities
      </h2>
      <p className="text-xl font-light text-slate-400">
        ソフトウェアの企画から開発、リリース、グロースまで
      </p>
      <div className="mx-auto mt-6 h-px w-16 bg-white/20" />
    </div>

    <div className="mx-auto max-w-6xl space-y-8">
      {/* Engineering Category */}
      <div className="text-center">
        <h3 className="mb-4 text-xl font-medium text-slate-200">Engineering</h3>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            Webサイト / Webアプリ開発
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            iOS / Androidアプリ開発
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            Mac / Windowsアプリ開発
          </span>
        </div>
      </div>

      {/* Project Management Category */}
      <div className="text-center">
        <h3 className="mb-4 text-xl font-medium text-slate-200">
          Project Management
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            スケジュール管理
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            チーム調整
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            ステークホルダー対応
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            リスク管理
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            進捗可視化
          </span>
        </div>
      </div>

      {/* Product Management Category */}
      <div className="text-center">
        <h3 className="mb-4 text-xl font-medium text-slate-200">
          Product Management
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            KPI設定・分析
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            開発企画
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            リリース計画策定
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            ユーザー分析
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-light text-slate-200 transition-colors">
            グロースハック
          </span>
        </div>
      </div>
    </div>
  </div>
);

// B2Cプロダクトマネージャー
export const B2CProductManagerSlide = () => (
  <div className="flex h-full flex-col justify-center">
    <div className="mb-16 text-center">
      <p className="mb-4 text-lg font-light text-slate-400">2025 - 現在</p>
      <h2 className="mb-6 text-5xl font-light text-slate-100 md:text-6xl">
        toC Webプロダクト開発
      </h2>
      <div className="flex items-center justify-center gap-4">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-light text-slate-300">
          フルタイム
        </span>
        <p className="text-xl font-light text-slate-300">
          プロダクトマネージャー
        </p>
      </div>
      <div className="mx-auto mt-6 h-px w-16 bg-white/20" />
    </div>

    <div className="mx-auto max-w-6xl">
      <div className="flex gap-8">
        <div className="flex-1">
          <h3 className="mb-3 text-lg font-medium text-slate-100">主な責任</h3>
          <ul className="space-y-2 text-sm font-light text-slate-300">
            <li>• KPI設定に基づいた機能企画</li>
            <li>• リリース計画の策定と実行管理</li>
            <li>• グロース施策の企画・実行・効果測定</li>
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="mb-3 text-lg font-medium text-slate-100">
            成果・インパクト
          </h3>
          <ul className="space-y-2 text-sm font-light text-slate-300">
            <li>• ユーザー獲得・維持率の改善施策実行</li>
            <li>• 機能リリースによるWAU向上 / メールパフォーマンス改善</li>
            <li>• PdM2人,開発者4人 チームでのスクラム開発</li>
            <li>• 必要に応じて開発者としても稼働</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// フルスタックエンジニア
export const FullstackEngineerSlide = () => (
  <div className="flex h-full flex-col justify-center">
    <div className="mb-16 text-center">
      <p className="mb-4 text-lg font-light text-slate-400">2020 - 2025</p>
      <h2 className="mb-6 text-5xl font-light text-slate-100 md:text-6xl">
        toB SaaS Webプロダクト開発
      </h2>
      <div className="flex items-center justify-center gap-4">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-light text-slate-300">
          フルタイム
        </span>
        <p className="text-xl font-light text-slate-300">
          Webアプリケーションエンジニア
        </p>
      </div>
      <div className="mx-auto mt-6 h-px w-16 bg-white/20" />
    </div>

    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-medium text-slate-100">
              技術的な担当領域
            </h3>
            <ul className="space-y-2 font-light text-slate-300">
              <li>• フロントエンド・バックエンド開発</li>
              <li>• RESTful API設計と実装</li>
              <li>• AWS インフラ構築と運用</li>
              <li>• データベース設計・最適化</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-medium text-slate-100">
              ビジネス貢献
            </h3>
            <ul className="space-y-2 font-light text-slate-300">
              <li>• 顧客要件のヒアリングと要件定義</li>
              <li>• システム改善提案と実装</li>
              <li>• 技術課題の解決とパフォーマンス向上</li>
              <li>• チーム開発におけるコードレビュー</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// VRライブ制作
export const VRLiveProductionSlide = ({
  exportMode = false,
}: SlideContentProps) => (
  <div className="flex h-full flex-col justify-center">
    <div className="mb-12 text-center">
      <p className="mb-4 text-lg font-light text-slate-400">2025</p>
      <h2 className="mb-4 text-4xl font-light text-slate-100 md:text-5xl">
        サンリオキャラVRライブ制作
      </h2>
      <a
        href="https://v-fes.sanrio.co.jp/"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 inline-flex items-center text-lg font-light text-slate-400 transition-colors hover:text-purple-400"
      >
        <ExternalLink className="mr-1 inline-block h-4 w-4" />
        Sanrio Virtual Festival 2025
      </a>
      <div className="flex items-center justify-center gap-4">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-light text-slate-300">
          副業
        </span>
        <p className="text-lg font-light text-slate-300">
          プロジェクトマネージャー補助
        </p>
      </div>
      <div className="mx-auto mt-6 h-px w-16 bg-white/20" />
    </div>

    <div className="mx-auto flex max-w-6xl gap-8">
      {/* 左側: 画像プレースホルダー（3:4比率） */}
      {!exportMode && (
        <div className="flex-shrink-0">
          <div className="h-96 w-72 overflow-hidden rounded-lg bg-white/5">
            <img
              src={vfesArtistImage}
              alt="VRライブのスクリーンショット"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* 右側: 説明文 */}
      <div className="flex-1 space-y-6">
        <div>
          <h3 className="mb-3 text-lg font-medium text-slate-100">担当業務</h3>
          <ul className="space-y-2 text-sm font-light text-slate-300">
            <li>• プロジェクトの進捗管理</li>
            <li>• 進捗を鑑みた制作スコープの調整</li>
            <li>• プロジェクト管理ツールの選定・セットアップ</li>
            <li>• 技術的な課題解決のサポート</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-medium text-slate-100">
            関連リンク
          </h3>
          <div className="space-y-2">
            <a
              href="https://v-fes.sanrio.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-light text-purple-400 hover:text-purple-300"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              公式サイト: Sanrio Virtual Festival
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// コンテンツ軽量化
export const ContentOptimizationSlide = ({
  exportMode = false,
}: SlideContentProps) => (
  <div className="flex h-full flex-col justify-center">
    <div className="mb-12 text-center">
      <p className="mb-4 text-lg font-light text-slate-400">2025</p>
      <h2 className="mb-4 text-4xl font-light text-slate-100 md:text-5xl">
        既存VRコンテンツ軽量化
      </h2>
      <a
        href="https://v-fes.sanrio.co.jp/"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 inline-flex items-center text-lg font-light text-slate-400 transition-colors hover:text-purple-400"
      >
        <ExternalLink className="mr-1 inline-block h-4 w-4" />
        Sanrio Virtual Festival 2025
      </a>
      <div className="flex items-center justify-center gap-4">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-light text-slate-300">
          副業
        </span>
        <p className="text-lg font-light text-slate-300">
          プロジェクトマネージャー
        </p>
      </div>
      <div className="mx-auto mt-6 h-px w-16 bg-white/20" />
    </div>

    <div className="mx-auto flex max-w-6xl gap-8">
      {/* 左側: 画像（3:4比率） */}
      {!exportMode && (
        <div className="flex-shrink-0">
          <div className="h-96 w-72 overflow-hidden rounded-lg bg-white/5">
            <img
              src={vfesOptimiseImage}
              alt="コンテンツ軽量化のスクリーンショット"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* 右側: 説明文 */}
      <div className="flex-1 space-y-6">
        <div>
          <h3 className="mb-3 text-lg font-medium text-slate-100">
            責務・役割
          </h3>
          <ul className="space-y-2 text-sm font-light text-slate-300">
            <li>• 進行管理</li>
            <li>• 要件/着地点のすり合わせ</li>
            <li>• 先方Unityエンジニアとの技術的調整</li>
            <li>• 軽量化前後の品質確認</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-medium text-slate-100">
            関連リンク
          </h3>
          <div className="flex flex-col space-y-2 pt-4">
            <a
              href="https://v-fes.sanrio.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-light text-purple-400 hover:text-purple-300"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              公式サイト: Sanrio Virtual Festival
            </a>
            <a
              href="https://x.com/QuestMaker_/status/1970336011558498585"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-light text-purple-400 hover:text-purple-300"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Xポスト: 制作担当しました
            </a>
            <a
              href="https://x.com/SANRIO_Vfes/status/1960266010264764865"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-light text-purple-400 hover:text-purple-300"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Xポスト: 軽量化対象のコンテンツ告知
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// イベントカレンダー制作
export const EventCalendarSlide = ({
  exportMode = false,
}: SlideContentProps) => (
  <div className="flex h-full flex-col justify-center">
    <div className="mb-12 text-center">
      <p className="mb-4 text-lg font-light text-slate-400">2025</p>
      <h2 className="mb-4 text-4xl font-light text-slate-100 md:text-5xl">
        イベントカレンダーシステム開発
      </h2>
      <a
        href="https://v-fes.sanrio.co.jp/"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 inline-flex items-center text-lg font-light text-slate-400 transition-colors hover:text-purple-400"
      >
        <ExternalLink className="mr-1 inline-block h-4 w-4" />
        Sanrio Virtual Festival 2025
      </a>
      <div className="flex items-center justify-center gap-4">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-light text-slate-300">
          副業
        </span>
        <p className="text-lg font-light text-slate-300">
          PM / デザイン / 開発
        </p>
      </div>
      <div className="mx-auto mt-6 h-px w-16 bg-white/20" />
    </div>

    <div className="mx-auto flex max-w-6xl gap-8">
      {/* 左側: 画像（3:4比率） */}
      {!exportMode && (
        <div className="flex-shrink-0">
          <div className="h-96 w-72 overflow-hidden rounded-lg bg-white/5">
            <img
              src={vfesCalendarImage}
              alt="カレンダーシステムのスクリーンショット"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* 右側: 説明文 */}
      <div className="flex-1 space-y-6">
        <div>
          <h3 className="mb-3 text-lg font-medium text-slate-100">
            責務・役割
          </h3>
          <ul className="space-y-2 text-sm font-light text-slate-300">
            <li>• 要件ヒアリング / 仕様策定</li>
            <li>• UIデザイン</li>
            <li>• Web/データ配信基盤実装</li>
            <li>• Unity側実装調整</li>
            <li>• オンボーディングドキュメント作成</li>
            <li>• 顧客への説明・サポート</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// VRChatゲーム開発
export const VRChatGameSlide = () => (
  <div className="flex h-full flex-col justify-center">
    <div className="mb-16 text-center">
      <p className="mb-4 text-lg font-light text-slate-400">2025 - 現在</p>
      <h2 className="mb-6 text-5xl font-light text-slate-100 md:text-6xl">
        VRChatゲームワールド開発
      </h2>
      <div className="flex items-center justify-center gap-4">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-light text-slate-300">
          副業
        </span>
        <p className="text-xl font-light text-slate-300">
          PM補助 / 仕様・ロードマップ策定
        </p>
      </div>
      <div className="mx-auto mt-6 h-px w-16 bg-white/20" />
    </div>

    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-medium text-slate-100">
              担当業務
            </h3>
            <ul className="space-y-2 font-light text-slate-300">
              <li>• 要件ヒアリングと仕様決定</li>
              <li>• リリースに向けたロードマップ策定</li>
              <li>• ビデオコンテの制作</li>
              <li>• チームメンバーへの作業割り当て</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);
