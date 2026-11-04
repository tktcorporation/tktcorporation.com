/**
 * Purpose:
 * 手書き風のSVGイラストアクセントコンポーネント群。
 * ミニマルなデザインに個性と温かみを加えるための装飾要素。
 *
 * Context:
 * - 各ページに配置して「人がデザインした」感を演出
 * - SVGパスは手書き風の不規則さを持たせている
 * - 色はアクセントカラー（blue-600）またはニュートラル（stone-300）
 * - 装飾目的のため aria-hidden="true" を設定
 */

interface AccentProps {
  className?: string;
}

/**
 * 手書き風の波線アンダーライン
 * 見出しの下などに配置して視覚的なアクセントを加える
 */
export function WavyUnderline({ className = "" }: AccentProps) {
  return (
    <svg
      className={className}
      width="120"
      height="12"
      viewBox="0 0 120 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 6.5C8 3 14 3 20 6.5C26 10 32 10 38 6.5C44 3 50 3 56 6.5C62 10 68 10 74 6.5C80 3 86 3 92 6.5C98 10 104 10 110 6.5C113 4.8 116 4 118 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 手書き風の小さなドットパターン
 * セクション間の区切りやアクセントに使用
 */
export function DotPattern({ className = "" }: AccentProps) {
  return (
    <svg
      className={className}
      width="60"
      height="8"
      viewBox="0 0 60 8"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="4" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="34" cy="4" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="48" cy="4" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="58" cy="4" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/**
 * 手書き風の矢印（右向き）
 * CTAやリンクの横に配置
 */
export function HandArrow({ className = "" }: AccentProps) {
  return (
    <svg
      className={className}
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 9C6 8.5 10 7.5 14 8C15.5 8.2 17 8.5 18 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 5C17 7 19 8 22 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 12C17 10 19 9 22 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 手書き風の小さな星/スパークル
 * 強調したいテキストの近くに配置
 */
export function SmallStar({ className = "" }: AccentProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 1.5V6M8 10V14.5M1.5 8H6M10 8H14.5M3 3L5.5 5.5M10.5 10.5L13 13M13 3L10.5 5.5M5.5 10.5L3 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 手書き風のサークル（囲み線）
 * テキストやアイコンを強調する際に背景として使用
 */
export function LooseCircle({ className = "" }: AccentProps) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 4C35 3 44 11 44 24C44 37 35 45 24 44C13 43 4 35 4 24C4 13 12 5 24 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 手書き風のブラケット装飾
 * セクションの開始を示すアクセント
 */
export function SketchBracket({ className = "" }: AccentProps) {
  return (
    <svg
      className={className}
      width="12"
      height="40"
      viewBox="0 0 12 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 2C5 4 3 10 3 20C3 30 5 36 10 38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
