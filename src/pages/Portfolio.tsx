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
 * - デフォルトは縦スクロール表示（通常のWebページ形式）
 * - プレゼンテーションモードでスライド形式に切り替え可能
 * - PDF出力時に適切なレイアウトになることを想定
 * - キーボードナビゲーション対応
 * - レスポンシブデザイン対応
 * - Appleライクなミニマルデザインで信頼性を演出
 */

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Minimize2,
  Presentation,
  ScrollText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import "@/styles/animations.css";

const Portfolio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);

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
      title: "VRChatゲーム開発",
      content: (
        <div className="flex flex-col justify-center h-full">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-500 mb-4 font-light">2025 - 現在</p>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              VRChatゲーム開発
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
                    プロジェクト管理
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

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const toggleFullscreen = () => {
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

  // 縦スクロール表示（デフォルト）
  if (!isPresentationMode) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        {/* ヘッダー */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-lg font-light text-gray-600">Portfolio</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={togglePresentationMode}
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Presentation className="h-4 w-4" />
              プレゼンテーションモード
            </Button>
          </div>
        </div>

        {/* スクロール可能なコンテンツ */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {slides.map((slide, index) => (
            <section
              key={slide.id}
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

  // プレゼンテーションモード（スライド形式）
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* ヘッダー */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
        <div className="text-sm text-gray-600">
          スライド {currentSlide + 1} / {slides.length}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePresentationMode}
            title="スクロールモードに戻る (Esc)"
            className="border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ScrollText className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFullscreen}
            title={
              isFullscreen ? "フルスクリーン終了 (F)" : "フルスクリーン (F)"
            }
            className="border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* メインコンテンツエリア */}
      <div className="flex-1 relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="min-w-full h-full flex items-center justify-center p-8"
              style={{
                // PDF出力時のページ区切りを考慮
                pageBreakAfter: index < slides.length - 1 ? "always" : "avoid",
              }}
            >
              <div className="w-full max-w-6xl mx-auto">{slide.content}</div>
            </div>
          ))}
        </div>

        {/* ナビゲーションボタン */}
        <button
          type="button"
          onClick={goToPreviousSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
          aria-label="前のスライド"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
          aria-label="次のスライド"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* スライドインジケーター */}
      <div className="flex justify-center gap-2 p-4 bg-white border-t border-gray-200">
        {slides.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-gray-700 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`スライド ${index + 1} へ移動`}
          />
        ))}
      </div>

      {/* キーボードショートカットのヒント */}
      <div className="text-xs text-gray-500 text-center pb-2 bg-white">
        ← → でスライド切り替え | F でフルスクリーン | Esc でスクロールモードへ
      </div>
    </div>
  );
};

export default Portfolio;
