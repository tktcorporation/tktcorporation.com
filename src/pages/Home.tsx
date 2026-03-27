/**
 * Purpose:
 * このサイトのランディングページとして、訪問者に対して自己紹介を行い、
 * ソーシャルメディアへのリンクと他のページへのナビゲーションを提供する。
 *
 * Context:
 * - 個人サイトのエントリーポイント
 * - ミニマルなデザインに手書き風イラストでアクセントを加える
 * - タイポグラフィ主導の情報階層
 * - 余白を活かしたクリーンなレイアウト
 */

import { Coffee, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import {
  DotPattern,
  HandArrow,
  WavyUnderline,
} from "@/components/illustrations";
import { SOCIAL_LINKS } from "@/data/socialLinks";

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-xl">
          {/* 名前とタイトル */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              tktcorporation
            </h1>
            <WavyUnderline className="mt-2 mb-4 text-blue-500" />
            <p className="text-lg text-stone-500">Web Application Developer</p>
            <p className="mt-1 text-sm text-stone-400">Based in Japan</p>
          </div>

          {/* ナビゲーション */}
          <nav className="mb-12">
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/resume"
                  className="group flex items-center gap-2 text-stone-700 transition-colors duration-200 hover:text-blue-600"
                >
                  <HandArrow className="text-stone-300 transition-colors duration-200 group-hover:text-blue-400" />
                  <span className="text-base">Resume</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/technologies"
                  className="group flex items-center gap-2 text-stone-700 transition-colors duration-200 hover:text-blue-600"
                >
                  <HandArrow className="text-stone-300 transition-colors duration-200 group-hover:text-blue-400" />
                  <span className="text-base">Technologies</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* ソーシャルリンク */}
          <div className="mb-10">
            <DotPattern className="mb-4 text-stone-300" />
            <div className="flex gap-5">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.Icon;
                return (
                  <a
                    key={link.alt}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-400 transition-colors duration-200 hover:text-stone-700"
                    title={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* アクションリンク */}
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="mailto:contact@tktcorporation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-b border-stone-200 pb-0.5 text-stone-500 transition-colors duration-200 hover:border-blue-300 hover:text-blue-600"
            >
              <Mail className="h-4 w-4" />
              Contact
            </a>
            <a
              href="https://www.buymeacoffee.com/tktcorporation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-b border-stone-200 pb-0.5 text-stone-500 transition-colors duration-200 hover:border-amber-300 hover:text-amber-600"
            >
              <Coffee className="h-4 w-4" />
              Buy me a coffee
            </a>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-stone-400">
        <p>© {new Date().getFullYear()} tktcorporation</p>
      </footer>
    </div>
  );
}

export default Home;
