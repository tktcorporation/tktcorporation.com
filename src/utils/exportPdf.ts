/**
 * Purpose:
 * SpectacleプレゼンテーションのPDF出力ユーティリティ。
 * spectacle-rendererを使用して高品質なPDFエクスポートを実現。
 *
 * Context:
 * - spectacle-rendererは、Puppeteerを使用してSpectacleスライドをPDF化
 * - クライアントサイドでのPDF生成には制限があるため、サーバーサイドまたは別ウィンドウで処理
 */

export const exportPresentationToPdf = async () => {
  // Note: spectacle-rendererは通常Node.js環境で動作するため、
  // クライアントサイドでの直接的なPDF生成は難しい。
  // 代替案として、以下のアプローチを使用：

  // 1. Print CSS を使ってブラウザの印刷機能でPDF化
  window.print();

  // または

  // 2. URLパラメータを付けて新しいタブで開き、印刷用レイアウトで表示
  const url = new URL(window.location.href);
  url.searchParams.set("export", "pdf");
  url.searchParams.set("print", "true");
  window.open(url.toString(), "_blank");
};

// Spectacle用のPrint CSSを動的に追加
export const addPrintStyles = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    @media print {
      /* 不要な要素を非表示 */
      .spectacle-progress-indicator,
      .spectacle-fullscreen-button,
      .spectacle-controls,
      button,
      nav {
        display: none !important;
      }

      /* スライドごとに改ページ */
      .spectacle-slide {
        page-break-after: always;
        page-break-inside: avoid;
        height: 100vh;
        width: 100vw;
        display: flex !important;
        justify-content: center;
        align-items: center;
        background: white !important;
      }

      /* フォントサイズと余白の調整 */
      body {
        font-size: 16px !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      /* 画像の最適化 */
      img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
      }

      /* リンクの色を印刷用に調整 */
      a {
        color: #1e40af !important;
        text-decoration: underline !important;
      }

      /* テキストのコントラストを高める */
      h1, h2, h3, h4, h5, h6 {
        color: #111827 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* 背景色の保持 */
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }

    /* PDF出力モード用のスタイル */
    @media screen and (min-width: 1px) {
      body.pdf-export {
        width: 1920px;
        height: 1080px;
        overflow: hidden;
      }

      body.pdf-export .spectacle-slide {
        width: 1920px !important;
        height: 1080px !important;
        transform: scale(1) !important;
      }
    }
  `;
  document.head.appendChild(style);
};
