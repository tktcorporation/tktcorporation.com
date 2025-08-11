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
  ArrowRight,
  Briefcase,
  Code2,
  Coffee,
  FileText,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Monitor,
  Sparkles,
  Twitter,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// カスタムアイコンコンポーネント（Lucideにないサービス用）
const QiitaIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Qiita"
  >
    <title>Qiita</title>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14L12 13.5 8.5 16l1.5-4L6.5 9h4l1.5-4 1.5 4h4l-3.5 3 1.5 4z" />
  </svg>
);

const ZennIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Zenn"
  >
    <title>Zenn</title>
    <path d="M2.4 9.6h4.8V12H4.8v7.2H2.4V9.6zm14.4 0c-.72 0-1.32.24-1.8.72-.48.48-.72 1.08-.72 1.8v5.28c0 .72.24 1.32.72 1.8.48.48 1.08.72 1.8.72h2.4c.72 0 1.32-.24 1.8-.72.48-.48.72-1.08.72-1.8v-5.28c0-.72-.24-1.32-.72-1.8-.48-.48-1.08-.72-1.8-.72h-2.4zm.6 2.4h1.2c.24 0 .42.06.54.18.12.12.18.3.18.54v4.56c0 .24-.06.42-.18.54-.12.12-.3.18-.54.18h-1.2c-.24 0-.42-.06-.54-.18-.12-.12-.18-.3-.18-.54v-4.56c0-.24.06-.42.18-.54.12-.12.3-.18.54-.18zM8.4 9.6v2.4h2.4v1.2H8.4v4.32c0 .24.06.42.18.54.12.12.3.18.54.18h1.68V19.2H8.4c-.72 0-1.32-.24-1.8-.72-.48-.48-.72-1.08-.72-1.8V9.6h2.52z" />
  </svg>
);

const socialLinks = [
  {
    href: "https://github.com/tktcorporation",
    icon: Github,
    alt: "GitHub",
    label: "GitHub",
    color: "hover:text-gray-400",
  },
  {
    href: "https://twitter.com/tktcorporation",
    icon: Twitter,
    alt: "Twitter",
    label: "Twitter",
    color: "hover:text-blue-400",
  },
  {
    href: "https://linkedin.com/in/tktcorporation",
    icon: Linkedin,
    alt: "LinkedIn",
    label: "LinkedIn",
    color: "hover:text-blue-600",
  },
  {
    href: "https://qiita.com/tktcorporation",
    icon: QiitaIcon,
    alt: "Qiita",
    label: "Qiita",
    color: "hover:text-green-500",
  },
  {
    href: "https://zenn.dev/tktcorporation",
    icon: ZennIcon,
    alt: "Zenn",
    label: "Zenn",
    color: "hover:text-blue-500",
  },
  {
    href: "https://instagram.com/tktcorporation",
    icon: Instagram,
    alt: "Instagram",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
];

const navigationLinks = [
  {
    to: "/resume",
    icon: FileText,
    title: "Resume",
    description: "職歴・スキル・実績",
    gradient: "from-purple-600 to-pink-600",
    hoverGradient: "hover:from-purple-700 hover:to-pink-700",
  },
  {
    to: "/technologies",
    icon: Monitor,
    title: "Technology Timeline",
    description: "技術活動の履歴",
    gradient: "from-blue-600 to-cyan-600",
    hoverGradient: "hover:from-blue-700 hover:to-cyan-700",
  },
];

function Home() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* アバター */}
          <div className="mb-8 relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center backdrop-blur-sm">
                <User className="w-16 h-16 md:w-20 md:h-20 text-slate-300" />
              </div>
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
          </div>

          {/* メインタイトル */}
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 animate-gradient">
            Hi, I'm tkt
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-4">
            Web Application Developer
          </p>

          <p className="text-lg text-slate-400 mb-8 flex items-center justify-center gap-2">
            <Globe className="w-5 h-5" />
            Based in Japan
          </p>

          {/* スキルバッジ */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Badge
              variant="secondary"
              className="bg-purple-500/20 text-purple-200 border-purple-500/30"
            >
              <Code2 className="w-3 h-3 mr-1" />
              Full Stack
            </Badge>
            <Badge
              variant="secondary"
              className="bg-blue-500/20 text-blue-200 border-blue-500/30"
            >
              <Monitor className="w-3 h-3 mr-1" />
              React
            </Badge>
            <Badge
              variant="secondary"
              className="bg-green-500/20 text-green-200 border-green-500/30"
            >
              <Briefcase className="w-3 h-3 mr-1" />
              TypeScript
            </Badge>
          </div>

          {/* CTA ボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/resume">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group"
              >
                <FileText className="w-5 h-5 mr-2" />
                View Resume
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a
              href="mailto:contact@tktcorporation.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-200 hover:bg-slate-800 group"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ソーシャルリンクセクション */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Connect With Me
            </h2>
            <p className="text-slate-400">Find me on these platforms</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.alt}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <Icon
                        className={cn(
                          "w-8 h-8 text-slate-400 transition-colors",
                          link.color
                        )}
                      />
                      <span className="text-xs text-slate-400 mt-2 group-hover:text-slate-200 transition-colors">
                        {link.label}
                      </span>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ナビゲーションセクション */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explore More
            </h2>
            <p className="text-slate-400">詳細な情報をご覧ください</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.to} to={link.to} className="group">
                  <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 h-full">
                    <CardContent className="p-8">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-2xl bg-gradient-to-r mb-4 flex items-center justify-center",
                          link.gradient
                        )}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                        {link.title}
                      </h3>
                      <p className="text-slate-400">{link.description}</p>
                      <div className="mt-4 flex items-center text-purple-400 group-hover:text-pink-400 transition-colors">
                        <span className="text-sm">View Details</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* サポートセクション */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border-purple-800/50">
            <CardContent className="p-12">
              <Coffee className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Support My Work
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                もし私の活動を応援していただけるなら、コーヒーを一杯おごっていただけると嬉しいです！
              </p>
              <a
                href="https://www.buymeacoffee.com/tktcorporation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold group"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  Buy me a coffee
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* フッター */}
      <footer className="relative py-8 px-4 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} tkt. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
