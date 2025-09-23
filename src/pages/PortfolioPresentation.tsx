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
import SpectaclePDFExport from "../components/SpectaclePDFExport";
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

// カスタムテーマ定義（最小限のテーマ設定）
const theme = {
  colors: {
    primary: "#1f2937",
    secondary: "#4b5563",
    background: "#ffffff",
    text: "#1f2937",
  },
  fonts: {
    header:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    text: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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

    // exportModeが有効な場合、自動的に印刷ダイアログを開く
    if (
      params.get("exportMode") === "true" &&
      params.get("printMode") === "true"
    ) {
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, []);

  return (
    <>
      {/* PDFエクスポートコンポーネント */}
      <SpectaclePDFExport
        enabled={exportMode || printMode}
        autoOpen={exportMode}
      />

      <Deck
        theme={theme}
        template={() =>
          // exportModeの時はテンプレートを非表示
          exportMode || printMode ? null : (
            <Box position="absolute" left={0} right={0} bottom={0} height={5}>
              <FullScreen size={30} color="#9ca3af" />
              <Progress color="#1f2937" />
            </Box>
          )
        }
      >
        {/* スライド1: タイトル */}
        <Slide backgroundColor="background">
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
        <Slide backgroundColor="background">
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
        <Slide backgroundColor="background">
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
        <Slide backgroundColor="background">
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
        <Slide backgroundColor="background">
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
        <Slide backgroundColor="background">
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
        <Slide backgroundColor="background">
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
        <Slide backgroundColor="background">
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
