/**
 * Purpose:
 * Spectacleベースのポートフォリオプレゼンテーションコンポーネント。
 * 高品質なPDF出力と洗練されたプレゼンテーション機能を提供。
 *
 * Context:
 * - Spectacleライブラリを使用したプロフェッショナルなスライド機能
 * - 共通のスライドコンポーネントを使用して縦スクロール版と同じスタイルを保持
 * - PDF出力時に適切なレイアウトとスタイルを保持
 * - キーボードショートカットとナビゲーション機能
 */

import { useEffect, useState } from "react";
import { Box, Deck, FullScreen, Progress, Slide } from "spectacle";
import SpectacleExportPDF from "../components/SpectacleExportPDF";
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

// カスタムテーマ定義（ダークテーマに統一）
const theme = {
  colors: {
    primary: "#a855f7", // purple-500
    secondary: "#94a3b8", // slate-400
    background: "#020617", // slate-950
    text: "#f1f5f9", // slate-100
  },
  fonts: {
    header:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    text: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

const PortfolioPresentation = () => {
  const [exportMode, setExportMode] = useState(false);
  const [printMode, setPrintMode] = useState(false);

  // PDF出力モード判定（URLパラメータをチェック）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Spectacleの標準exportModeパラメータを使用
    setExportMode(params.get("exportMode") === "true");
    setPrintMode(params.get("printMode") === "true");
  }, []);

  return (
    <>
      {/* PDFエクスポートコンポーネント */}
      <SpectacleExportPDF enabled={exportMode || printMode} />

      <Deck
        theme={theme}
        template={() =>
          // exportModeの時はテンプレートを非表示
          exportMode || printMode ? null : (
            <Box position="absolute" left={0} right={0} bottom={0} height={5}>
              <FullScreen size={30} color="#94a3b8" />
              <Progress color="#a855f7" />
            </Box>
          )
        }
      >
        {/* スライド1: タイトル */}
        <Slide
          backgroundColor="background"
          className="spectacle-slide"
          data-slide="1"
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: "1200px", padding: "32px" }}>
              <TitleSlide />
            </div>
          </Box>
        </Slide>

        {/* スライド2: Capabilities */}
        <Slide
          backgroundColor="background"
          className="spectacle-slide"
          data-slide="2"
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: "1200px", padding: "32px" }}>
              <CapabilitiesSlide />
            </div>
          </Box>
        </Slide>

        {/* スライド3: B2Cプロダクトマネージャー経験 */}
        <Slide
          backgroundColor="background"
          className="spectacle-slide"
          data-slide="3"
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: "1200px", padding: "32px" }}>
              <B2CProductManagerSlide />
            </div>
          </Box>
        </Slide>

        {/* スライド4: フルスタックエンジニア経験 */}
        <Slide
          backgroundColor="background"
          className="spectacle-slide"
          data-slide="4"
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: "1200px", padding: "32px" }}>
              <FullstackEngineerSlide />
            </div>
          </Box>
        </Slide>

        {/* スライド5: VRライブ制作 */}
        <Slide
          backgroundColor="background"
          className="spectacle-slide"
          data-slide="5"
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: "1200px", padding: "32px" }}>
              <VRLiveProductionSlide exportMode={exportMode || printMode} />
            </div>
          </Box>
        </Slide>

        {/* スライド6: コンテンツ軽量化 */}
        <Slide
          backgroundColor="background"
          className="spectacle-slide"
          data-slide="6"
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: "1200px", padding: "32px" }}>
              <ContentOptimizationSlide exportMode={exportMode || printMode} />
            </div>
          </Box>
        </Slide>

        {/* スライド7: イベントカレンダー制作 */}
        <Slide
          backgroundColor="background"
          className="spectacle-slide"
          data-slide="7"
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: "1200px", padding: "32px" }}>
              <EventCalendarSlide exportMode={exportMode || printMode} />
            </div>
          </Box>
        </Slide>

        {/* スライド8: VRChatゲーム開発 */}
        <Slide
          backgroundColor="background"
          className="spectacle-slide"
          data-slide="8"
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: "1200px", padding: "32px" }}>
              <VRChatGameSlide />
            </div>
          </Box>
        </Slide>
      </Deck>
    </>
  );
};

export default PortfolioPresentation;
