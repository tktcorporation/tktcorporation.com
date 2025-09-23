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
            <p className="text-lg text-gray-500 mb-4 font-light">2022 - 現在</p>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              toCプロダクトマネージャー
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Webアプリケーションサービス企業
            </p>
            <div className="w-16 h-px bg-gray-300 mx-auto mt-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    主な責任
                  </h3>
                  <ul className="space-y-2 text-gray-600 font-light">
                    <li>• KPI設定に基づいた機能企画</li>
                    <li>• リリース計画の策定と実行管理</li>
                    <li>• グロース施策の企画・実行・効果測定</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    成果・インパクト
                  </h3>
                  <ul className="space-y-2 text-gray-600 font-light">
                    <li>• ユーザー獲得・維持率の改善施策実行</li>
                    <li>• データドリブンな意思決定プロセスの確立</li>
                    <li>• ステークホルダーとの密な連携体制構築</li>
                    <li>• プロダクトロードマップの策定と管理</li>
                  </ul>
                </div>
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
            <p className="text-lg text-gray-500 mb-4 font-light">2020 - 2022</p>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              フルスタックエンジニア
            </h2>
            <p className="text-xl text-gray-600 font-light">
              B2B/B2C両面のプロダクト開発
            </p>
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

    // サンリオVフェス プロジェクト
    {
      id: 5,
      title: "サンリオVフェス 2024",
      content: (
        <div className="flex flex-col justify-center h-full">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-500 mb-4 font-light">2024</p>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              サンリオVフェス 2024
            </h2>
            <p className="text-xl text-gray-600 font-light">
              プロジェクトマネージャー補佐 (副業)
            </p>
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
                    <li>• 100以上のイベントの進行管理</li>
                    <li>• 出演者との調整とスケジューリング</li>
                    <li>• 配信スケジュールの管理と最適化</li>
                    <li>• リアルタイムでの課題解決と調整</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    システム開発
                  </h3>
                  <ul className="space-y-2 text-gray-600 font-light">
                    <li>• 内部カレンダーシステムの構築</li>
                    <li>• 進行管理ツールの開発と運用</li>
                    <li>• 効率化ツールの企画・実装</li>
                    <li>• リアルタイム情報共有システム</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // VRChatゲーム開発プロジェクト
    {
      id: 6,
      title: "VRChatゲーム開発",
      content: (
        <div className="flex flex-col justify-center h-full">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-500 mb-4 font-light">現在進行中</p>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              VRChatゲーム開発
            </h2>
            <p className="text-xl text-gray-600 font-light">
              PM補助・仕様策定 (5人チーム)
            </p>
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
                    <li>• 仕様決定と要件定義</li>
                    <li>• 5人チームの進捗管理</li>
                    <li>• リスク対応と課題解決</li>
                    <li>• 2025年リリースに向けたロードマップ策定</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    開発貢献
                  </h3>
                  <ul className="space-y-2 text-gray-600 font-light">
                    <li>• Unity開発補助（約20%の貢献）</li>
                    <li>• ゲーム設計とバランス調整</li>
                    <li>• VRChat SDK活用とワールド構築</li>
                    <li>• プレイテストとフィードバック収集</li>
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
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 5));
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev < 5 ? prev + 1 : 0));
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
