/**
 * Purpose:
 * React Iconsを使用した技術アイコンのマッピング。
 * 各言語/フレームワークに対応するReact Iconコンポーネントを提供する。
 *
 * Context:
 * - React Icons (Devicons)を使用
 * - Tailwind CSSとの競合を回避
 * - TypeScriptの型安全性を保証
 */

import type { IconType } from "react-icons";
import {
  DiAndroid,
  DiAngularSimple,
  DiApple,
  DiBootstrap,
  DiCode,
  DiCss3,
  DiDart,
  DiDjango,
  DiDocker,
  DiGit,
  DiGithubBadge,
  DiGo,
  DiGrails,
  DiHaskell,
  DiHtml5,
  DiJava,
  DiJavascript1,
  DiLaravel,
  DiLinux,
  DiMarkdown,
  DiMongodb,
  DiMysql,
  DiNginx,
  DiNodejsSmall,
  DiPerl,
  DiPhp,
  DiPostgresql,
  DiPython,
  DiReact,
  DiRedis,
  DiRuby,
  DiSass,
  DiScala,
  DiSwift,
  DiSymfonyBadge,
  DiTerminal,
  DiUbuntu,
  DiWindows,
} from "react-icons/di";

import {
  SiAuth0,
  SiBabel,
  SiC,
  SiClojure,
  SiCplusplus,
  SiDeno,
  SiElasticsearch,
  SiElectron,
  SiElixir,
  SiEslint,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFlask,
  SiFlutter,
  SiGatsby,
  SiGitlab,
  SiGnubash,
  SiGooglecloud,
  SiGraphql,
  SiJest,
  SiJetbrains,
  SiJson,
  SiJulia,
  SiKotlin,
  SiKubernetes,
  SiLua,
  SiMariadb,
  SiNestjs,
  SiNetlify,
  SiNextdotjs,
  SiNuxtdotjs,
  SiOpenai,
  SiOracle,
  SiR,
  SiReddit,
  SiRubyonrails,
  SiRust,
  SiSharp,
  SiSlack,
  SiSpring,
  SiSqlite,
  SiSvelte,
  SiTailwindcss,
  SiThreedotjs,
  SiTrello,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiWebpack,
  SiYaml,
  SiYarn,
} from "react-icons/si";

// 技術名からアイコンへのマッピング
const iconMap: Record<string, IconType> = {
  // プログラミング言語
  JavaScript: DiJavascript1,
  TypeScript: SiTypescript,
  Python: DiPython,
  Java: DiJava,
  Ruby: DiRuby,
  Go: DiGo,
  Rust: SiRust,
  "C++": SiCplusplus,
  C: SiC,
  "C#": SiSharp,
  PHP: DiPhp,
  Swift: DiSwift,
  Kotlin: SiKotlin,
  Dart: DiDart,
  Scala: DiScala,
  Elixir: SiElixir,
  Clojure: SiClojure,
  Haskell: DiHaskell,
  Lua: SiLua,
  Perl: DiPerl,
  R: SiR,
  Julia: SiJulia,
  "Objective-C": DiApple,
  Shell: DiTerminal,
  Bash: SiGnubash,
  PowerShell: DiWindows,

  // フレームワーク
  React: DiReact,
  Vue: SiVuedotjs,
  "Vue.js": SiVuedotjs,
  Angular: DiAngularSimple,
  Svelte: SiSvelte,
  "Next.js": SiNextdotjs,
  "Nuxt.js": SiNuxtdotjs,
  Gatsby: SiGatsby,
  Express: SiExpress,
  FastAPI: SiFastapi,
  Django: DiDjango,
  Flask: SiFlask,
  Rails: SiRubyonrails,
  "Ruby on Rails": SiRubyonrails,
  Spring: SiSpring,
  Laravel: DiLaravel,
  Symfony: DiSymfonyBadge,
  NestJS: SiNestjs,

  // ツール・プラットフォーム
  "Node.js": DiNodejsSmall,
  Deno: SiDeno,
  Docker: DiDocker,
  Kubernetes: SiKubernetes,
  Git: DiGit,
  GitHub: DiGithubBadge,
  GitLab: SiGitlab,
  Jenkins: SiJetbrains,
  AWS: SiGooglecloud,
  Azure: DiWindows,
  "Google Cloud": SiGooglecloud,
  Firebase: SiGooglecloud,
  Heroku: DiGrails,
  Vercel: SiVercel,
  Netlify: SiNetlify,

  // データベース
  MySQL: DiMysql,
  PostgreSQL: DiPostgresql,
  MongoDB: DiMongodb,
  Redis: DiRedis,
  SQLite: SiSqlite,
  Oracle: SiOracle,
  MariaDB: SiMariadb,
  Elasticsearch: SiElasticsearch,

  // その他
  HTML: DiHtml5,
  HTML5: DiHtml5,
  CSS: DiCss3,
  CSS3: DiCss3,
  Sass: DiSass,
  SCSS: DiSass,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: DiBootstrap,
  Webpack: SiWebpack,
  Vite: SiVite,
  Babel: SiBabel,
  ESLint: SiEslint,
  Jest: SiJest,
  GraphQL: SiGraphql,
  Nginx: DiNginx,
  Linux: DiLinux,
  Ubuntu: DiUbuntu,
  Android: DiAndroid,
  Flutter: SiFlutter,
  "React Native": DiReact,
  Electron: SiElectron,
  Figma: SiFigma,

  // 追加の言語
  YAML: SiYaml,
  JSON: SiJson,
  Markdown: DiMarkdown,
  Dockerfile: DiDocker,

  // AI関連
  OpenAI: SiOpenai,
  "GPT-3": SiOpenai,
  "GPT-4": SiOpenai,

  // その他のツール
  Yarn: SiYarn,
  npm: DiNodejsSmall,
  "Three.js": SiThreedotjs,
  Auth0: SiAuth0,
  Reddit: SiReddit,
  Slack: SiSlack,
  Trello: SiTrello,
};

/**
 * 技術名から対応するReact Iconコンポーネントを取得
 * @param techName - 技術名
 * @returns React Iconコンポーネント、見つからない場合はnull
 */
export function getTechIcon(techName: string): IconType | null {
  return iconMap[techName] || null;
}

/**
 * 技術がアイコンを持っているかチェック
 * @param techName - 技術名
 * @returns アイコンが存在する場合はtrue
 */
export function hasTechIcon(techName: string): boolean {
  return techName in iconMap;
}

/**
 * デフォルトのコードアイコンを取得
 * @returns デフォルトのアイコンコンポーネント
 */
export function getDefaultCodeIcon(): IconType {
  return DiCode;
}
