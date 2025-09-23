/**
 * Purpose:
 * 自分の能力・経験・実績を示すポートフォリオページ。
 * 名刺代わりとして、様々なシーンで活用できる汎用性の高い自己紹介ツール。
 *
 * Portfolio Intent（ポートフォリオの意図）:
 * - 「こんなことができる」というスキルセットの明示
 * - 「こんなことをやったことがある」という実績の提示
 * - 「こういう人間です」という人物像の伝達
 * - プロジェクトアサイン、転職、協業など多様な場面で使用可能
 *
 * Context:
 * - Spectacleライブラリを使用した高品質なプレゼンテーション機能
 * - デフォルトは縦スクロール表示（通常のWebページ形式）
 * - プレゼンテーションモードでSpectacle形式に切り替え可能
 * - PDF出力時に適切なレイアウトになることを想定
 * - キーボードナビゲーション対応
 * - レスポンシブデザイン対応
 * - Appleライクなミニマルデザインで信頼性を演出
 */

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, ExternalLink, Presentation, ScrollText } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import "@/styles/animations.css";

// Spectacleコンポーネントの動的インポート
const PortfolioPresentation = lazy(() => import("./PortfolioPresentation"));

const Portfolio = () => {
  const [_currentSlide, setCurrentSlide] = useState(0);
  const [_isFullscreen, setIsFullscreen] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // スライドのコンテンツ配列
  const slides = [
    {
      id: 1,
      title: "タイトル",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-6xl md:text-7xl font-light tracking-tight mb-6 text-gray-900">
            tktcorporation
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-light">
            Software Engineer / Product Manager
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "できること",
      content: (
        <div className="flex flex-col justify-center h-full">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">
              Capabilities
            </h2>
            <p className="text-xl text-gray-500 font-light">
              ソフトウェアの企画から開発、リリース、グロースまで
            </p>
            <div className="w-16 h-px bg-gray-300 mx-auto mt-6"></div>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Engineering Category */}
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Engineering
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  Webサイト / Webアプリ開発
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  iOS / Androidアプリ開発
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  Mac / Windowsアプリ開発
                </span>
              </div>
            </div>

            {/* Project Management Category */}
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Project Management
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  スケジュール管理
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  チーム調整
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  ステークホルダー対応
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  リスク管理
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  進捗可視化
                </span>
              </div>
            </div>

            {/* Product Management Category */}
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Product Management
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  KPI設定・分析
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  開発企画
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  リリース計画策定
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  ユーザー分析
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-light transition-colors">
                  グロースハック
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // B2Cプロダクトマネージャー経験
    {
      id: 3,
      title: "B2Cプロダクトマネージャー",
      content: (
        <div className="flex flex-col justify-center h-full">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-500 mb-4 font-light">2025 - 現在</p>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              toC Webプロダクト開発
            </h2>
            <div className="flex items-center justify-center gap-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-light">
                フルタイム
              </span>
              <p className="text-xl text-gray-600 font-light">
                プロダクトマネージャー
              </p>
            </div>
            <div className="w-16 h-px bg-gray-300 mx-auto mt-6"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex gap-8">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  主な責任
                </h3>
                <ul className="space-y-2 text-gray-600 font-light text-sm">
                  <li>• KPI設定に基づいた機能企画</li>
                  <li>• リリース計画の策定と実行管理</li>
                  <li>• グロース施策の企画・実行・効果測定</li>
                </ul>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  成果・インパクト
                </h3>
                <ul className="space-y-2 text-gray-600 font-light text-sm">
                  <li>• ユーザー獲得・維持率の改善施策実行</li>
                  <li>
                    • 機能リリースによるWAU向上 / メールパフォーマンス改善
                  </li>
                  <li>• PdM2人,開発者4人 チームでのスクラム開発</li>
                  <li>• 必要に忌じて開発者としても稼働</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // フルスタックエンジニア経験
    {
      id: 4,
      title: "フルスタックエンジニア",
      content: (
        <div className="flex flex-col justify-center h-full">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-500 mb-4 font-light">2020 - 2025</p>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              toB SaaS Webプロダクト開発
            </h2>
            <div className="flex items-center justify-center gap-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-light">
                フルタイム
              </span>
              <p className="text-xl text-gray-600 font-light">
                Webアプリケーションエンジニア
              </p>
            </div>
            <div className="w-16 h-px bg-gray-300 mx-auto mt-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    技術的な担当領域
                  </h3>
                  <ul className="space-y-2 text-gray-600 font-light">
                    <li>• フロントエンド・バックエンド開発</li>
                    <li>• RESTful API設計と実装</li>
                    <li>• AWS インフラ構築と運用</li>
                    <li>• データベース設計・最適化</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    ビジネス貢献
                  </h3>
                  <ul className="space-y-2 text-gray-600 font-light">
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
      ),
    },

    // サンリオVフェス - VRライブ制作
    {
      id: 5,
      title: "VRライブ制作",
      content: (
        <div className="flex flex-col justify-center h-full">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-500 mb-4 font-light">2025</p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              サンリオキャラVRライブ制作
            </h2>
            <a
              href="https://v-fes.sanrio.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg text-gray-500 font-light mb-4 hover:text-blue-600 transition-colors"
            >
              <ExternalLink className="inline-block w-4 h-4 mr-1" />
              Sanrio Virtual Festival 2025
            </a>
            <div className="flex items-center justify-center gap-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-light">
                副業
              </span>
              <p className="text-lg text-gray-600 font-light">
                プロジェクトマネージャー補助
              </p>
            </div>
            <div className="w-16 h-px bg-gray-300 mx-auto mt-6"></div>
          </div>

          <div className="max-w-6xl mx-auto flex gap-8">
            {/* 左側: 画像プレースホルダー（3:4比率） */}
            <div className="flex-shrink-0">
              <div className="w-72 h-96 bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src="/src/assets/vfes2025-artist.png"
                  alt="VRライブのスクリーンショット"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 右側: 説明文 */}
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  担当業務
                </h3>
                <ul className="space-y-2 text-gray-600 font-light text-sm">
                  <li>• プロジェクトの進捗管理</li>
                  <li>• 進捗を鑑みた制作スコープの調整</li>
                  <li>• プロジェクト管理ツールの選定・セットアップ</li>
                  <li>• 技術的な課題解決のサポート</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  関連リンク
                </h3>
                <div className="space-y-2">
                  <a
                    href="https://v-fes.sanrio.co.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-light text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    公式サイト: Sanrio Virtual Festival
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // サンリオVフェス - 軽量化プロジェクト
    {
      id: 6,
      title: "コンテンツ軽量化",
      content: (
        <div className="flex flex-col justify-center h-full">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-500 mb-4 font-light">2025</p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              既存VRコンテンツ軽量化
            </h2>
            <a
              href="https://v-fes.sanrio.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg text-gray-500 font-light mb-4 hover:text-blue-600 transition-colors"
            >
              <ExternalLink className="inline-block w-4 h-4 mr-1" />
              Sanrio Virtual Festival 2025
            </a>
            <div className="flex items-center justify-center gap-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-light">
                副業
              </span>
              <p className="text-lg text-gray-600 font-light">
                プロジェクトマネージャー
              </p>
            </div>
            <div className="w-16 h-px bg-gray-300 mx-auto mt-6"></div>
          </div>

          <div className="max-w-6xl mx-auto flex gap-8">
            {/* 左側: 画像（3:4比率） */}
            <div className="flex-shrink-0">
              <div className="w-72 h-96 bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src="/src/assets/vfes2025-optimise.png"
                  alt="コンテンツ軽量化のスクリーンショット"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 右側: 説明文 */}
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  責務・役割
                </h3>
                <ul className="space-y-2 text-gray-600 font-light text-sm">
                  <li>• 進行管理</li>
                  <li>• 要件/着地点のすり合わせ</li>
                  <li>• 先方Unityエンジニアとの技術的調整</li>
                  <li>• 軽量化前後の品質確認</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  関連リンク
                </h3>
                <div className="pt-4 flex flex-col space-y-2">
                  <a
                    href="https://v-fes.sanrio.co.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-light text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    公式サイト: Sanrio Virtual Festival
                  </a>
                  <a
                    href="https://x.com/QuestMaker_/status/1970336011558498585"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-light text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Xポスト: 制作担当しました
                  </a>
                  <a
                    href="https://x.com/SANRIO_Vfes/status/1960266010264764865"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-light text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Xポスト: 軽量化対象のコンテンツ告知
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // サンリオVフェス - イベントカレンダー制作
    {
      id: 7,
      title: "イベントカレンダー制作",
      content: (
        <div className="flex flex-col justify-center h-full">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-500 mb-4 font-light">2025</p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              イベントカレンダーシステム開発
            </h2>
            <a
              href="https://v-fes.sanrio.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg text-gray-500 font-light mb-4 hover:text-blue-600 transition-colors"
            >
              <ExternalLink className="inline-block w-4 h-4 mr-1" />
              Sanrio Virtual Festival 2025
            </a>
            <div className="flex items-center justify-center gap-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-light">
                副業
              </span>
              <p className="text-lg text-gray-600 font-light">
                プロジェクトマネージャー
              </p>
            </div>
            <div className="w-16 h-px bg-gray-300 mx-auto mt-6"></div>
          </div>

          <div className="max-w-6xl mx-auto flex gap-8">
            {/* 左側: 画像（3:4比率） */}
            <div className="flex-shrink-0">
              <div className="w-72 h-96 bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src="/src/assets/vfes2025-comm-calendar.png"
                  alt="カレンダーシステムのスクリーンショット"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 右側: 説明文 */}
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  責務・役割
                </h3>
                <ul className="space-y-2 text-gray-600 font-light text-sm">
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
      ),
    },

    // VRChatゲーム開発プロジェクト
    {
      id: 8,
      title: "VRChatゲームワールド開発",
      content: (
        <div className="flex flex-col justify-center h-full">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-500 mb-4 font-light">2025 - 現在</p>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              VRChatゲームワールド開発
            </h2>
            <div className="flex items-center justify-center gap-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-light">
                副業
              </span>
              <p className="text-xl text-gray-600 font-light">
                PM補助 / 仕様・ロードマップ策定
              </p>
            </div>
            <div className="w-16 h-px bg-gray-300 mx-auto mt-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    担当業務
                  </h3>
                  <ul className="space-y-2 text-gray-600 font-light">
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
      ),
    },
  ];

  // キーボードナビゲーション（プレゼンテーションモード時のみ）
  useEffect(() => {
    if (!isPresentationMode) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 7));
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev < 7 ? prev + 1 : 0));
      } else if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        } else {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      } else if (e.key === "Escape") {
        setIsPresentationMode(false);
        if (document.fullscreenElement) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPresentationMode]);

  const _goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const _goToNextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const _toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const togglePresentationMode = () => {
    setIsPresentationMode(!isPresentationMode);
    if (isPresentationMode && document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      // PDFドキュメントの作成
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // 各スライドを処理
      for (let i = 0; i < slides.length; i++) {
        // 既存のDOM要素を取得
        const slideElement = document.querySelector(`#slide-${i}`);
        if (!slideElement) continue;

        // 一時的なコンテナを作成
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.left = "-9999px";
        container.style.top = "0";
        container.style.width = "1920px";
        container.style.height = "1080px";
        container.style.backgroundColor = "white";
        container.style.padding = "60px";
        container.style.boxSizing = "border-box";
        container.style.fontFamily =
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
        document.body.appendChild(container);

        // スライドのクローンを作成して、完全に新しいHTML構造を作成
        const clonedSlide = slideElement.cloneNode(true) as HTMLElement;

        // すべてのインラインスタイルをクリア
        const clearAllStyles = (element: HTMLElement) => {
          // 既存のクラスを削除
          element.removeAttribute("class");
          element.removeAttribute("style");

          Array.from(element.children).forEach((child) => {
            if (child instanceof HTMLElement) {
              clearAllStyles(child);
            }
          });
        };

        clearAllStyles(clonedSlide);

        // 必要なスタイルを直接適用する関数
        const applyCleanStyles = (
          element: HTMLElement,
          originalElement: HTMLElement
        ) => {
          const computedStyle = window.getComputedStyle(originalElement);

          // 基本的なレイアウトスタイル
          if (computedStyle.display && computedStyle.display !== "inline") {
            element.style.display = computedStyle.display;
          }
          if (computedStyle.flexDirection) {
            element.style.flexDirection = computedStyle.flexDirection;
          }
          if (computedStyle.justifyContent) {
            element.style.justifyContent = computedStyle.justifyContent;
          }
          if (computedStyle.alignItems) {
            element.style.alignItems = computedStyle.alignItems;
          }
          if (computedStyle.textAlign) {
            element.style.textAlign = computedStyle.textAlign;
          }
          if (computedStyle.gap && computedStyle.gap !== "0px") {
            element.style.gap = computedStyle.gap;
          }
          if (computedStyle.padding && computedStyle.padding !== "0px") {
            element.style.padding = computedStyle.padding;
          }
          if (computedStyle.margin && computedStyle.margin !== "0px") {
            element.style.margin = computedStyle.margin;
          }
          if (computedStyle.maxWidth && computedStyle.maxWidth !== "none") {
            element.style.maxWidth = computedStyle.maxWidth;
          }

          // フォントスタイル
          if (computedStyle.fontSize) {
            element.style.fontSize = computedStyle.fontSize;
          }
          if (computedStyle.fontWeight) {
            element.style.fontWeight = computedStyle.fontWeight;
          }
          if (computedStyle.lineHeight) {
            element.style.lineHeight = computedStyle.lineHeight;
          }

          // 色の変換（oklchを使わずに固定値を設定）
          const colorValue = computedStyle.color;
          if (colorValue) {
            // テキストの明度に基づいて色を設定
            if (originalElement.classList.contains("text-gray-900")) {
              element.style.color = "#1f2937";
            } else if (originalElement.classList.contains("text-gray-800")) {
              element.style.color = "#374151";
            } else if (originalElement.classList.contains("text-gray-700")) {
              element.style.color = "#4b5563";
            } else if (originalElement.classList.contains("text-gray-600")) {
              element.style.color = "#6b7280";
            } else if (originalElement.classList.contains("text-gray-500")) {
              element.style.color = "#9ca3af";
            } else if (originalElement.classList.contains("text-gray-400")) {
              element.style.color = "#d1d5db";
            } else if (originalElement.classList.contains("text-blue-600")) {
              element.style.color = "#2563eb";
            } else if (originalElement.classList.contains("text-blue-800")) {
              element.style.color = "#1e40af";
            } else {
              element.style.color = "#1f2937"; // デフォルト
            }
          }

          // 背景色
          const bgValue = computedStyle.backgroundColor;
          if (
            bgValue &&
            bgValue !== "rgba(0, 0, 0, 0)" &&
            bgValue !== "transparent"
          ) {
            if (originalElement.classList.contains("bg-gray-100")) {
              element.style.backgroundColor = "#f3f4f6";
            } else if (originalElement.classList.contains("bg-gray-50")) {
              element.style.backgroundColor = "#f9fafb";
            } else if (originalElement.classList.contains("bg-gray-200")) {
              element.style.backgroundColor = "#e5e7eb";
            } else if (bgValue.includes("oklch")) {
              element.style.backgroundColor = "#ffffff";
            } else if (bgValue.includes("rgb")) {
              element.style.backgroundColor = bgValue;
            }
          }

          // ボーダー
          if (
            computedStyle.borderWidth &&
            computedStyle.borderWidth !== "0px"
          ) {
            element.style.borderWidth = computedStyle.borderWidth;
            element.style.borderStyle = "solid";
            element.style.borderColor = "#d1d5db";
          }

          // 角丸
          if (
            computedStyle.borderRadius &&
            computedStyle.borderRadius !== "0px"
          ) {
            element.style.borderRadius = computedStyle.borderRadius;
          }

          // 子要素も処理
          const originalChildren = Array.from(originalElement.children);
          const clonedChildren = Array.from(element.children);

          for (let i = 0; i < clonedChildren.length; i++) {
            const clonedChild = clonedChildren[i];
            const originalChild = originalChildren[i];
            if (
              clonedChild instanceof HTMLElement &&
              originalChild instanceof HTMLElement
            ) {
              applyCleanStyles(clonedChild, originalChild);
            }
          }
        };

        // スタイルを適用
        clonedSlide.style.width = "100%";
        clonedSlide.style.height = "100%";
        clonedSlide.style.display = "flex";
        clonedSlide.style.alignItems = "center";
        clonedSlide.style.justifyContent = "center";
        clonedSlide.style.backgroundColor = "white";

        // オリジナル要素に基づいてスタイルを適用
        if (slideElement instanceof HTMLElement) {
          applyCleanStyles(clonedSlide, slideElement);
        }

        container.appendChild(clonedSlide);

        // 少し待機して、レンダリングを完了させる
        await new Promise((resolve) => setTimeout(resolve, 100));

        // キャプチャ
        const canvas = await html2canvas(container, {
          scale: 2,
          logging: false,
          useCORS: true,
          backgroundColor: "#ffffff",
          allowTaint: true,
          foreignObjectRendering: false,
        });

        // PDFに追加
        if (i > 0) {
          pdf.addPage();
        }

        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = (pdfHeight - imgHeight * ratio) / 2;

        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );

        // クリーンアップ
        document.body.removeChild(container);
      }

      // PDFを保存
      pdf.save(`portfolio-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("Failed to export PDF:", error);
      alert("PDF出力に失敗しました。再度お試しください。");
    } finally {
      setIsExporting(false);
    }
  };

  // 縦スクロール表示（デフォルト）
  if (!isPresentationMode) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        {/* ヘッダー */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-lg font-light text-gray-600">Portfolio</h1>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={exportToPDF}
                disabled={isExporting}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {isExporting ? "エクスポート中..." : "PDFダウンロード"}
              </Button>
              <Button
                size="sm"
                onClick={togglePresentationMode}
                className="bg-gray-700 hover:bg-gray-800 text-white transition-colors flex items-center gap-2"
              >
                <Presentation className="h-4 w-4" />
                プレゼンテーションモード
              </Button>
            </div>
          </div>
        </div>

        {/* スクロール可能なコンテンツ */}
        <div id="portfolio-content" className="max-w-6xl mx-auto px-4 py-8">
          {slides.map((slide, index) => (
            <section
              key={slide.id}
              id={`slide-${index}`}
              className="min-h-screen flex items-center justify-center py-16"
              style={{
                // PDF出力時のページ区切りを考慮
                pageBreakAfter: index < slides.length - 1 ? "always" : "avoid",
              }}
            >
              {slide.content}
            </section>
          ))}
        </div>
      </div>
    );
  }

  // プレゼンテーションモード（Spectacle形式）
  return (
    <div className="min-h-screen bg-white">
      {/* コントロールバー */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <h1 className="text-lg font-light text-gray-600">
          Portfolio Presentation
        </h1>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => {
              // PDF出力用URLを新しいタブで開く
              const url = new URL(window.location.href);
              url.searchParams.set("export", "pdf");
              window.open(url.toString(), "_blank");
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            PDFエクスポート
          </Button>
          <Button
            size="sm"
            onClick={togglePresentationMode}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-2"
          >
            <ScrollText className="h-4 w-4" />
            スクロールモードに戻る
          </Button>
        </div>
      </div>

      {/* Spectacleプレゼンテーション */}
      <div className="pt-16">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-gray-500">
                プレゼンテーションを読み込み中...
              </div>
            </div>
          }
        >
          <PortfolioPresentation />
        </Suspense>
      </div>
    </div>
  );
};

export default Portfolio;
