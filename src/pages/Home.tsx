/**
 * Purpose:
 * このサイトのランディングページとして、訪問者に対して自己紹介を行い、
 * ソーシャルメディアへのリンクと他のページへのナビゲーションを提供する。
 *
 * Context:
 * - 個人のポートフォリオサイトのエントリーポイント
 * - シンプルで直感的なナビゲーションを重視
 * - ソーシャルメディアでのプレゼンスを可視化
 */

import { Link } from "react-router-dom";

const socialLinks = [
  {
    href: "https://lapras.com/public/tktcorporation",
    icon: "https://assets.lapras.com/static/assets/bundles/media/logo-symbol.5c8467f1.svg",
    alt: "LAPRAS",
  },
  {
    href: "https://github.com/tktcorporation",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg",
    alt: "GitHub",
  },
  {
    href: "https://twitter.com/tktcorporation",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/twitter.svg",
    alt: "Twitter",
  },
  {
    href: "https://qiita.com/tktcorporation",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/qiita.svg",
    alt: "Qiita",
  },
  {
    href: "https://zenn.dev/tktcorporation",
    icon: "https://simpleicons.org/icons/zenn.svg",
    alt: "Zenn",
  },
  {
    href: "https://stackoverflow.com/users/12852199",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/stackoverflow.svg",
    alt: "Stack Overflow",
  },
  {
    href: "https://instagram.com/tktcorporation",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg",
    alt: "Instagram",
  },
  {
    href: "https://medium.com/@tktcorporation",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/medium.svg",
    alt: "Medium",
  },
  {
    href: "https://dev.to/tktcorporation",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/dev-dot-to.svg",
    alt: "Dev.to",
  },
  {
    href: "https://linkedin.com/in/tktcorporation",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg",
    alt: "LinkedIn",
  },
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950 text-slate-200">
      <main className="container px-4 py-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Hi 👋, I'm tkt.</h1>
          <h3 className="text-xl mt-16 text-slate-300">
            I'm a web application developer from Japan.
          </h3>

          <h3 className="text-xl mt-16 text-slate-200">Connect with me:</h3>

          <div className="flex flex-row mt-8 flex-wrap">
            {socialLinks.map((link) => (
              <a
                key={link.alt}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 hover:transform hover:scale-110 transition-transform duration-200"
              >
                <img
                  className="h-10 w-10 md:h-16 md:w-16"
                  style={{
                    filter:
                      "invert(88%) sepia(61%) saturate(0%) hue-rotate(229deg) brightness(107%) contrast(101%)",
                  }}
                  width="64"
                  height="64"
                  src={link.icon}
                  alt={link.alt}
                />
              </a>
            ))}
          </div>

          <h3 className="text-xl mt-16 text-slate-200">Pages:</h3>
          <div className="flex flex-col gap-3 mt-8">
            <Link
              to="/resume"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 w-fit"
            >
              📄 Resume
            </Link>
            <Link
              to="/technologies"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 w-fit"
            >
              💻 Technology Timeline
            </Link>
          </div>

          <h3 className="text-xl mt-16 text-slate-200">Support:</h3>
          <div className="mt-8">
            <a
              href="https://www.buymeacoffee.com/tktcorporation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-64"
                height="72"
                width="272"
                src="/bmc-button.svg"
                alt="Buy me a coffee"
              />
            </a>
          </div>
        </div>
      </main>

      <footer className="mt-8 text-sm">© {new Date().getFullYear()} tkt</footer>
    </div>
  );
}

export default Home;
