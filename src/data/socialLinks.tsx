/**
 * Purpose:
 * ソーシャルメディアリンクの設定データ。
 * アイコン、URL、スタイルを一元管理する。
 *
 * Context:
 * - Home.tsxから抽出されたデータ定義
 * - 他のコンポーネントでも再利用可能
 * - アイコンコンポーネントの関係でTSXファイルとして定義
 */

import {
  SiBluesky,
  SiGithub,
  SiInstagram,
  SiQiita,
  SiX,
  SiZenn,
} from "@icons-pack/react-simple-icons";
import type { ComponentType } from "react";

/**
 * LinkedInアイコン
 * ブランドガイドラインの問題でsimple-iconsから削除されたためカスタム実装
 */
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="LinkedIn"
    >
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * ソーシャルリンクの型定義
 */
export interface SocialLink {
  /** リンク先URL */
  href: string;
  /** アイコンコンポーネント */
  Icon: ComponentType<{ className?: string }>;
  /** alt/key用のテキスト */
  alt: string;
  /** 表示ラベル */
  label: string;
  /** ホバー時の色クラス */
  color: string;
}

/**
 * ソーシャルメディアリンクの設定
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://github.com/tktcorporation",
    Icon: SiGithub,
    alt: "GitHub",
    label: "GitHub",
    color: "hover:text-slate-400",
  },
  {
    href: "https://twitter.com/tktcorporation",
    Icon: SiX,
    alt: "X",
    label: "X (Twitter)",
    color: "hover:text-slate-300",
  },
  {
    href: "https://linkedin.com/in/tktcorporation",
    Icon: LinkedInIcon,
    alt: "LinkedIn",
    label: "LinkedIn",
    color: "hover:text-blue-600",
  },
  {
    href: "https://qiita.com/tktcorporation",
    Icon: SiQiita,
    alt: "Qiita",
    label: "Qiita",
    color: "hover:text-green-500",
  },
  {
    href: "https://zenn.dev/tktcorporation",
    Icon: SiZenn,
    alt: "Zenn",
    label: "Zenn",
    color: "hover:text-blue-500",
  },
  {
    href: "https://bsky.app/profile/tkt.bsky.social",
    Icon: SiBluesky,
    alt: "Bluesky",
    label: "Bluesky",
    color: "hover:text-sky-500",
  },
  {
    href: "https://instagram.com/tktcorporation",
    Icon: SiInstagram,
    alt: "Instagram",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
];
