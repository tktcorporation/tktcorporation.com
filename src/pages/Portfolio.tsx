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

import { Download, Presentation, ScrollText } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import "@/styles/animations.css";
import {
  B2CProductManagerSlide,
  CapabilitiesSlide,
  ContentOptimizationSlide,
  EventCalendarSlide,
  FullstackEngineerSlide,
  TitleSlide,
  VRChatGameSlide,
  VRLiveProductionSlide,
} from "./PortfolioSlides";

// Spectacleコンポーネントの動的インポート
const PortfolioPresentation = lazy(() => import("./PortfolioPresentation"));

const Portfolio = () => {
  const [_currentSlide, setCurrentSlide] = useState(0);
  const [_isFullscreen, setIsFullscreen] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  // スライドのコンテンツ配列
  const slides = [
    {
      id: 1,
      title: "タイトル",
      content: <TitleSlide />,
    },
    {
      id: 2,
      title: "できること",
      content: <CapabilitiesSlide />,
    },
    // B2Cプロダクトマネージャー経験
    {
      id: 3,
      title: "B2Cプロダクトマネージャー",
      content: <B2CProductManagerSlide />,
    },

    // フルスタックエンジニア経験
    {
      id: 4,
      title: "フルスタックエンジニア",
      content: <FullstackEngineerSlide />,
    },

    // サンリオVフェス - VRライブ制作
    {
      id: 5,
      title: "VRライブ制作",
      content: <VRLiveProductionSlide />,
    },

    // サンリオVフェス - 軽量化プロジェクト
    {
      id: 6,
      title: "コンテンツ軽量化",
      content: <ContentOptimizationSlide />,
    },

    // サンリオVフェス - イベントカレンダー制作
    {
      id: 7,
      title: "イベントカレンダー制作",
      content: <EventCalendarSlide />,
    },

    // VRChatゲーム開発プロジェクト
    {
      id: 8,
      title: "VRChatゲームワールド開発",
      content: <VRChatGameSlide />,
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

  const exportToPDF = () => {
    // Spectacleのプレゼンテーションモードを新しいウィンドウで開き、印刷ダイアログを表示
    const url = new URL(window.location.href);
    url.searchParams.set("mode", "presentation");
    url.searchParams.set("exportMode", "true");
    url.searchParams.set("printMode", "true");

    // 新しいウィンドウを開く
    const printWindow = window.open(url.toString(), "_blank");

    if (!printWindow) {
      alert(
        "ポップアップがブロックされました。ポップアップを許可してください。"
      );
      return;
    }

    // 印刷ダイアログが自動的に開くようにSpectaclePDFExportコンポーネントで設定済み
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
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                PDFダウンロード
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
              // SpectacleのexportModeを使用してPDF出力用URLを開く
              const url = new URL(window.location.href);
              url.searchParams.set("exportMode", "true");
              url.searchParams.set("printMode", "true");
              // 新しいタブで開く
              const printWindow = window.open(url.toString(), "_blank");

              // 印刷ダイアログを自動的に開くためのメッセージ
              if (printWindow) {
                setTimeout(() => {
                  alert(
                    "新しいタブでPDFエクスポートモードが開きました。\n\nブラウザの印刷機能(Ctrl+P / Cmd+P)を使用してPDFとして保存してください。"
                  );
                }, 500);
              }
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
