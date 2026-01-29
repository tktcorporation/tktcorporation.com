/**
 * Purpose:
 * このサイトのランディングページとして、訪問者に対して自己紹介を行い、
 * ソーシャルメディアへのリンクと他のページへのナビゲーションを提供する。
 *
 * Context:
 * - 個人のポートフォリオサイトのエントリーポイント
 * - Swiss Modernism + Bento Grid スタイルでプロフェッショナルな印象を与える
 * - セクション分けによる明確な情報階層
 * - Lucide Iconsを活用した統一感のあるUI
 *
 * Design System:
 * - ui-ux-pro-max Style #1 Minimalism & Swiss Style
 * - ui-ux-pro-max Style #21 Bento Box Grid
 * - Color #12 Portfolio/Personal (Monochrome + blue accent)
 */

import {
  ArrowRight,
  Briefcase,
  Code2,
  Coffee,
  Globe,
  Layers,
  Mail,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/data/socialLinks";

// Bento Grid で表示する能力カード
const CAPABILITIES = [
  {
    icon: Code2,
    title: "Engineering",
    description: "Web・モバイル・デスクトップアプリ開発",
  },
  {
    icon: Briefcase,
    title: "Product Management",
    description: "KPI設計・開発企画・グロースハック",
  },
  {
    icon: Layers,
    title: "Project Management",
    description: "スケジュール管理・チーム調整・リスク管理",
  },
];

function Home() {
  return (
    <div className="min-h-screen">
      {/* ナビゲーションバー - Swiss Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-lg bg-slate-950/80">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">
            tktcorporation
          </span>
          <div className="flex items-center gap-6">
            <Link
              to="/resume"
              className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
            >
              Resume
            </Link>
            <Link
              to="/portfolio"
              className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </nav>

      {/* ヒーローセクション - Swiss Modernism */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-14">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* メインタイトル - Lighter font weight for Swiss style */}
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
            tktcorporation
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 font-light mb-2">
            Software Engineer & Product Manager
          </p>

          <p className="text-base text-slate-400 mb-10 flex items-center justify-center gap-2 font-light">
            <Globe className="w-4 h-4" />
            Based in Japan
          </p>

          {/* ソーシャルリンク */}
          <div className="flex justify-center gap-5 mb-10">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.Icon;
              return (
                <a
                  key={link.alt}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-slate-400 hover:text-slate-100 transition-colors duration-200 ${link.color}`}
                  title={link.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* アクションボタン - Minimal style */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:contact@tktcorporation.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-slate-100 hover:bg-white text-slate-900 font-medium transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </a>

            <a
              href="https://www.buymeacoffee.com/tktcorporation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-slate-300 hover:bg-white/10 hover:text-white font-medium transition-colors"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Buy me a coffee
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Capabilities セクション - Bento Grid */}
      <section className="px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-slate-100 mb-3">
              What I Do
            </h2>
            <div className="w-12 h-px bg-white/20 mx-auto" />
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="bg-white/5 border border-white/10 rounded-lg p-6
                    hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  <Icon className="w-6 h-6 text-purple-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-100 mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-light">
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Work セクション - Minimal */}
      <section className="px-4 py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-light text-slate-100 mb-2">
                Featured Work
              </h2>
              <p className="text-slate-400 font-light text-sm">
                プロダクト開発・VRライブ制作・ゲームワールド開発など
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium transition-colors group"
            >
              <Rocket className="w-4 h-4" />
              View Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* フッター - Minimal */}
      <footer className="px-4 py-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-slate-500 font-light">
            © {new Date().getFullYear()} tktcorporation
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
