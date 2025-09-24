/**
 * Purpose:
 * SpectacleプレゼンテーションのPDFエクスポート機能を提供するコンポーネント。
 * html2canvasとjsPDFを使用してスライドを直接キャプチャしPDFを生成。
 *
 * Context:
 * - Spectacleのスライドを1枚ずつキャプチャ
 * - 画像を含むすべてのコンテンツを正確に出力
 * - プログレスバーによるエクスポート進捗表示
 */

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

interface SpectacleExportPDFProps {
  enabled: boolean;
}

const SpectacleExportPDF = ({ enabled }: SpectacleExportPDFProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    // Spectacleのスライド数を取得
    const getSlideCount = () => {
      // 複数のセレクタを試す
      let slides = document.querySelectorAll(
        '[class*="Slide__SlideContainer"]'
      );

      if (slides.length === 0) {
        // 通常のスライドクラスを探す
        slides = document.querySelectorAll(".spectacle-slide");
      }

      if (slides.length === 0) {
        // divで囲まれたスライドコンテンツを探す
        slides = document.querySelectorAll("[data-slide]");
      }

      if (slides.length === 0) {
        // Portfolio.tsxの縦スクロール用スライドを探す
        slides = document.querySelectorAll(".portfolio-slide");
      }

      console.log("Found slides:", slides.length, slides);
      setTotalSlides(slides.length || 0);
    };

    // 少し待ってからスライド数を取得（レンダリング完了を待つ）
    setTimeout(getSlideCount, 1000);
  }, [enabled]);

  const exportToPDF = async () => {
    setIsExporting(true);
    setProgress(0);

    try {
      // PDFドキュメントを作成（A4横向き）
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // すべてのスライドを取得（複数のセレクタを試す）
      let allSlides = document.querySelectorAll(
        '[class*="Slide__SlideContainer"]'
      );

      if (allSlides.length === 0) {
        allSlides = document.querySelectorAll(".spectacle-slide");
      }

      if (allSlides.length === 0) {
        allSlides = document.querySelectorAll("[data-slide]");
      }

      if (allSlides.length === 0) {
        // Portfolio.tsxの縦スクロール用スライドを探す
        allSlides = document.querySelectorAll(".portfolio-slide");
      }

      console.log("Exporting slides:", allSlides.length, allSlides);

      if (allSlides.length === 0) {
        throw new Error("No slides found");
      }

      // すべてのスライドをキャプチャ
      for (let i = 0; i < allSlides.length; i++) {
        const slideElement = allSlides[i] as HTMLElement;

        if (!slideElement) {
          console.warn(`Slide ${i} not found`);
          continue;
        }

        // スライドのクローンを作成（元のスライドを変更しないため）
        const clonedSlide = slideElement.cloneNode(true) as HTMLElement;
        clonedSlide.style.display = "flex";
        clonedSlide.style.visibility = "visible";
        clonedSlide.style.opacity = "1";
        clonedSlide.style.position = "fixed";
        clonedSlide.style.top = "0";
        clonedSlide.style.left = "0";
        clonedSlide.style.width = "100vw";
        clonedSlide.style.height = "100vh";
        clonedSlide.style.zIndex = "-9999";

        // oklchカラーを事前に変換（より徹底的に）
        const convertOklchInElement = (element: HTMLElement) => {
          // すべてのスタイルプロパティをチェックして変換
          const style = element.style;
          const computedStyle = window.getComputedStyle(element);

          // カラープロパティのリスト
          const colorProperties = [
            "color",
            "backgroundColor",
            "borderColor",
            "borderTopColor",
            "borderRightColor",
            "borderBottomColor",
            "borderLeftColor",
            "outlineColor",
            "textDecorationColor",
            "fill",
            "stroke",
          ];

          // 各プロパティをチェック
          colorProperties.forEach((prop) => {
            const value = computedStyle[
              prop as keyof CSSStyleDeclaration
            ] as string;
            if (value && value.includes("oklch")) {
              // デフォルトのフォールバック色を設定
              if (prop.includes("background") || prop.includes("Background")) {
                style[prop as any] = "#ffffff";
              } else {
                style[prop as any] = "#000000";
              }
            }
          });

          // Tailwindクラスベースの色設定（より確実に）
          const classList = element.classList;

          // テキストカラー
          if (classList.contains("text-gray-900")) {
            element.style.setProperty("color", "#111827", "important");
          } else if (classList.contains("text-gray-800")) {
            element.style.setProperty("color", "#1f2937", "important");
          } else if (classList.contains("text-gray-700")) {
            element.style.setProperty("color", "#374151", "important");
          } else if (classList.contains("text-gray-600")) {
            element.style.setProperty("color", "#4b5563", "important");
          } else if (classList.contains("text-gray-500")) {
            element.style.setProperty("color", "#6b7280", "important");
          } else if (classList.contains("text-gray-400")) {
            element.style.setProperty("color", "#9ca3af", "important");
          } else if (classList.contains("text-gray-300")) {
            element.style.setProperty("color", "#d1d5db", "important");
          } else if (classList.contains("text-blue-600")) {
            element.style.setProperty("color", "#2563eb", "important");
          } else if (classList.contains("text-blue-800")) {
            element.style.setProperty("color", "#1e40af", "important");
          }

          // 背景色
          if (classList.contains("bg-white")) {
            element.style.setProperty(
              "background-color",
              "#ffffff",
              "important"
            );
          } else if (classList.contains("bg-gray-50")) {
            element.style.setProperty(
              "background-color",
              "#f9fafb",
              "important"
            );
          } else if (classList.contains("bg-gray-100")) {
            element.style.setProperty(
              "background-color",
              "#f3f4f6",
              "important"
            );
          } else if (classList.contains("bg-gray-200")) {
            element.style.setProperty(
              "background-color",
              "#e5e7eb",
              "important"
            );
          } else if (classList.contains("bg-gray-300")) {
            element.style.setProperty(
              "background-color",
              "#d1d5db",
              "important"
            );
          }

          // ボーダーカラー
          if (classList.contains("border-gray-200")) {
            element.style.setProperty("border-color", "#e5e7eb", "important");
          } else if (classList.contains("border-gray-300")) {
            element.style.setProperty("border-color", "#d1d5db", "important");
          }

          // インラインスタイルの属性もチェック
          if (style.cssText && style.cssText.includes("oklch")) {
            // oklchを含むインラインスタイルを削除
            const newCssText = style.cssText.replace(/[^;]*oklch[^;]*/gi, "");
            style.cssText = newCssText;
          }

          // 子要素も処理
          Array.from(element.children).forEach((child) => {
            if (child instanceof HTMLElement) {
              convertOklchInElement(child);
            }
          });
        };

        // oklchカラーを変換
        convertOklchInElement(clonedSlide);

        // 少し待ってスタイルが適用されるのを確認
        await new Promise((resolve) => setTimeout(resolve, 100));

        // DOMに一時的に追加
        document.body.appendChild(clonedSlide);

        // スライドの内容をキャプチャ
        const canvas = await html2canvas(clonedSlide, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          imageTimeout: 0,
          ignoreElements: (element) => {
            // oklchを含む要素をスキップ
            if (element instanceof HTMLElement) {
              const style = window.getComputedStyle(element);
              const hasOklch = Object.values(style).some(
                (value) => typeof value === "string" && value.includes("oklch")
              );
              if (hasOklch) {
                console.warn("Skipping element with oklch color:", element);
                return true;
              }
            }
            return false;
          },
          onclone: (clonedDoc) => {
            // クローンされたドキュメント内の画像を確実に表示
            const images = clonedDoc.querySelectorAll("img");
            images.forEach((img) => {
              // 画像のスタイルを調整
              img.style.display = "block";
              img.style.maxWidth = "100%";
              img.style.height = "auto";
            });
          },
        });

        // クローンした要素を削除
        document.body.removeChild(clonedSlide);

        // PDFにページを追加（最初のページ以外）
        if (i > 0) {
          pdf.addPage();
        }

        // キャンバスの画像をPDFに追加
        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // アスペクト比を保持しながらページに収める
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;
        const x = (pdfWidth - scaledWidth) / 2;
        const y = (pdfHeight - scaledHeight) / 2;

        pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);

        // 進捗を更新
        setProgress(Math.round(((i + 1) / allSlides.length) * 100));
      }

      // PDFを保存
      const date = new Date().toISOString().split("T")[0];
      pdf.save(`portfolio-presentation-${date}.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("PDFエクスポートに失敗しました。");
    } finally {
      setIsExporting(false);
      setProgress(0);
    }
  };

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
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: 280,
      }}
      className="no-print"
    >
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>
            PDFエクスポート
          </span>
          <span style={{ fontSize: 12, color: "#6b7280" }}>
            {totalSlides} スライド
          </span>
        </div>

        {isExporting && (
          <div>
            <div
              style={{
                width: "100%",
                height: 4,
                background: "#e5e7eb",
                borderRadius: 2,
                overflow: "hidden",
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "#3b82f6",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              エクスポート中... {progress}%
            </span>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={exportToPDF}
        disabled={isExporting}
        style={{
          width: "100%",
          padding: "8px 16px",
          background: isExporting ? "#9ca3af" : "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: isExporting ? "not-allowed" : "pointer",
          fontSize: 14,
          fontWeight: 500,
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!isExporting) {
            e.currentTarget.style.background = "#2563eb";
          }
        }}
        onMouseLeave={(e) => {
          if (!isExporting) {
            e.currentTarget.style.background = "#3b82f6";
          }
        }}
      >
        {isExporting ? "エクスポート中..." : "PDFをダウンロード"}
      </button>
    </div>
  );
};

export default SpectacleExportPDF;
