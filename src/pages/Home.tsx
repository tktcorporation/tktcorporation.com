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

import { Coffee, Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/data/socialLinks";

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
            {SOCIAL_LINKS.map((link) => {
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
