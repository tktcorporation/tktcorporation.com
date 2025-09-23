/**
 * Purpose:
 * SpectacleプレゼンテーションのPDFエクスポート機能を提供するコンポーネント。
 * ブラウザの印刷機能を使用して高品質なPDFを生成。
 *
 * Context:
 * - SpectacleのexportModeとprintModeを活用
 * - ブラウザの印刷ダイアログを自動的に開く
 * - A4横向きに最適化されたレイアウト
 */

import { useEffect } from "react";

interface SpectaclePDFExportProps {
  enabled: boolean;
  autoOpen?: boolean;
}

const SpectaclePDFExport = ({
  enabled,
  autoOpen = true,
}: SpectaclePDFExportProps) => {
  useEffect(() => {
    if (!enabled) return;

    // スタイルを動的に追加
    const addPrintStyles = () => {
      const styleId = "spectacle-pdf-export-styles";

      // 既存のスタイルがあれば削除
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }

      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        @media print {
          /* ページ設定 */
          @page {
            size: A4 landscape;
            margin: 0;
          }

          /* 不要な要素を非表示 */
          button,
          nav,
          [role="navigation"],
          [aria-label*="navigation"],
          [class*="Progress"],
          [class*="FullScreen"],
          [class*="template"],
          .no-print {
            display: none !important;
          }

          /* ボディとHTML */
          html, body {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
          }

          /* スライドのコンテナ設定 */
          [class*="Deck"],
          [class*="deck"] {
            width: 100% !important;
            height: 100% !important;
          }

          /* スライドの設定 */
          [class*="Slide__SlideContainer"],
          [class*="SlideWrapper"],
          .spectacle-slide,
          [class*="slide"] {
            page-break-after: always !important;
            page-break-inside: avoid !important;
            width: 100vw !important;
            height: 100vh !important;
            overflow: visible !important;
            position: relative !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 40px !important;
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* 最後のスライド */
          [class*="Slide__SlideContainer"]:last-child,
          [class*="slide"]:last-of-type {
            page-break-after: auto !important;
          }

          /* Flexboxレイアウトの保持 */
          .flex {
            display: flex !important;
          }

          .flex-col {
            flex-direction: column !important;
          }

          .items-center {
            align-items: center !important;
          }

          .justify-center {
            justify-content: center !important;
          }

          .justify-between {
            justify-content: space-between !important;
          }

          /* グリッドレイアウトの保持 */
          .grid {
            display: grid !important;
          }

          /* テキストスタイルの保持 */
          .text-center {
            text-align: center !important;
          }

          .text-left {
            text-align: left !important;
          }

          .text-right {
            text-align: right !important;
          }

          /* 画像の表示を確実にする */
          img {
            display: block !important;
            max-width: 100% !important;
            height: auto !important;
            page-break-inside: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* object-coverクラスの画像 */
          .object-cover {
            object-fit: cover !important;
          }

          /* 画像コンテナの保持 */
          [class*="bg-gray"] {
            background-color: #f3f4f6 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* 背景色と画像の保持 */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* フォントサイズの調整 */
          .text-6xl {
            font-size: 3.75rem !important;
          }

          .text-5xl {
            font-size: 3rem !important;
          }

          .text-4xl {
            font-size: 2.25rem !important;
          }

          .text-3xl {
            font-size: 1.875rem !important;
          }

          .text-2xl {
            font-size: 1.5rem !important;
          }

          .text-xl {
            font-size: 1.25rem !important;
          }

          .text-lg {
            font-size: 1.125rem !important;
          }

          /* マージンとパディングの保持 */
          [class*="p-"],
          [class*="m-"],
          [class*="gap-"] {
            /* Tailwindのクラスを維持 */
          }

          /* ボーダーとシャドウ */
          [class*="border"],
          [class*="rounded"] {
            /* スタイルを維持 */
          }

          /* アニメーション無効化 */
          *,
          *::before,
          *::after {
            animation: none !important;
            transition: none !important;
          }

          /* オーバーフローの制御 */
          .overflow-hidden {
            overflow: visible !important;
          }

          /* 幅と高さの固定 */
          .w-72 {
            width: 18rem !important;
          }

          .h-96 {
            height: 24rem !important;
          }

          .w-full {
            width: 100% !important;
          }

          .h-full {
            height: 100% !important;
          }

          /* max-widthの保持 */
          .max-w-4xl {
            max-width: 56rem !important;
          }

          .max-w-5xl {
            max-width: 64rem !important;
          }

          /* スライド内のコンテンツ調整 */
          [class*="slide"] > div {
            width: 100% !important;
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }
      `;
      document.head.appendChild(style);
    };

    addPrintStyles();

    // 自動的に印刷ダイアログを開く
    if (autoOpen) {
      const timer = setTimeout(() => {
        window.print();
      }, 1500); // ページが完全に読み込まれるのを待つ

      return () => clearTimeout(timer);
    }

    // クリーンアップ
    return () => {
      const style = document.getElementById("spectacle-pdf-export-styles");
      if (style) {
        style.remove();
      }
    };
  }, [enabled, autoOpen]);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        background: "white",
        padding: "12px 24px",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
      className="no-print"
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#10b981",
          animation: "pulse 2s infinite",
        }}
      />
      <span style={{ fontSize: 14, color: "#374151" }}>
        PDFエクスポートモード - Ctrl+P / Cmd+P で印刷
      </span>
      <button
        type="button"
        onClick={() => window.print()}
        style={{
          marginLeft: 16,
          padding: "6px 12px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        今すぐ印刷
      </button>
    </div>
  );
};

export default SpectaclePDFExport;
