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
 * - 縦スクロール表示（通常のWebページ形式）
 * - レスポンシブデザイン対応
 * - ミニマルデザインで信頼性を演出
 */

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

const Portfolio = () => {
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

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* ヘッダー */}
      <div className="bg-background/95 sticky top-0 z-50 border-b border-stone-200 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold text-stone-900">Portfolio</h1>
        </div>
      </div>

      {/* スクロール可能なコンテンツ */}
      <div id="portfolio-content" className="mx-auto max-w-6xl px-4 py-8">
        {slides.map((slide) => (
          <section
            key={slide.id}
            className="flex min-h-screen items-center justify-center py-16"
          >
            {slide.content}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
