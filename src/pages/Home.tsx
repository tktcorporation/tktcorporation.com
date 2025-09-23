/**
 * Purpose:
 * このサイトのランディングページとして、訪問者に対して自己紹介を行い、
 * ソーシャルメディアへのリンクと他のページへのナビゲーションを提供する。
 *
 * Context:
 * - 個人のポートフォリオサイトのエントリーポイント
 * - モダンでインパクトのあるデザインで訪問者の注目を集める
 * - セクション分けによる明確な情報階層
 * - Lucide Iconsを活用した統一感のあるUI
 */

import {
  SiBluesky,
  SiGithub,
  SiInstagram,
  SiQiita,
  SiX,
  SiZenn,
} from "@icons-pack/react-simple-icons";
import { Coffee, Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

// LinkedInアイコン（ブランドガイドラインの問題でsimple-iconsから削除されたためカスタム）
const LinkedInIcon = ({ className }: { className?: string }) => (
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

const socialLinks = [
  {
    href: "https://github.com/tktcorporation",
    Icon: SiGithub,
    alt: "GitHub",
    label: "GitHub",
    color: "hover:text-gray-400",
  },
  {
    href: "https://twitter.com/tktcorporation",
    Icon: SiX,
    alt: "X",
    label: "X (Twitter)",
    color: "hover:text-gray-300",
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

function Home() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション - 全要素を統合 */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* メインタイトル */}
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 animate-gradient">
            tktcorporation
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-4">
            Web Application Developer
          </p>

          <p className="text-lg text-slate-400 mb-12 flex items-center justify-center gap-2">
            <Globe className="w-5 h-5" />
            Based in Japan
          </p>

          {/* ソーシャルリンク */}
          <div className="flex justify-center gap-6 mb-12">
            {socialLinks.map((link) => {
              const Icon = link.Icon;
              return (
                <a
                  key={link.alt}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-slate-400 transition-colors duration-300 ${link.color}`}
                  title={link.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@tktcorporation.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </Button>
            </a>

            <a
              href="https://www.buymeacoffee.com/tktcorporation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Buy me a coffee
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
