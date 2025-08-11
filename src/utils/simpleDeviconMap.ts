/**
 * Purpose:
 * Devicon クラス名の簡易マッピング。
 * LAPRAS から取得される言語名を Devicon のクラス名に変換する。
 *
 * Context:
 * - devicon.json のインポート問題を回避するための簡易実装
 * - 主要な言語とフレームワークのみをサポート
 */

// 言語名から Devicon クラス名へのマッピング
const DEVICON_MAP: Record<string, string> = {
  // プログラミング言語
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "java",
  Ruby: "ruby",
  Go: "go",
  Rust: "rust",
  "C++": "cplusplus",
  C: "c",
  "C#": "csharp",
  PHP: "php",
  Swift: "swift",
  Kotlin: "kotlin",
  Dart: "dart",
  Scala: "scala",
  Elixir: "elixir",
  Clojure: "clojure",
  Haskell: "haskell",
  Lua: "lua",
  Perl: "perl",
  R: "r",
  MATLAB: "matlab",
  Julia: "julia",
  Groovy: "groovy",
  "Objective-C": "objectivec",

  // フレームワーク
  React: "react",
  Vue: "vuejs",
  "Vue.js": "vuejs",
  Angular: "angular",
  Svelte: "svelte",
  "Next.js": "nextjs",
  "Nuxt.js": "nuxtjs",
  Gatsby: "gatsby",
  Express: "express",
  FastAPI: "fastapi",
  Django: "django",
  Flask: "flask",
  Rails: "rails",
  "Ruby on Rails": "rails",
  Spring: "spring",
  Laravel: "laravel",
  Symfony: "symfony",
  NestJS: "nestjs",

  // ツール・プラットフォーム
  "Node.js": "nodejs",
  Deno: "denojs",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Git: "git",
  GitHub: "github",
  GitLab: "gitlab",
  Jenkins: "jenkins",
  CircleCI: "circleci",
  AWS: "amazonwebservices",
  Azure: "azure",
  "Google Cloud": "googlecloud",
  Firebase: "firebase",
  Heroku: "heroku",

  // データベース
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  Redis: "redis",
  SQLite: "sqlite",
  Oracle: "oracle",
  MariaDB: "mariadb",
  Elasticsearch: "elasticsearch",

  // その他
  HTML: "html5",
  HTML5: "html5",
  CSS: "css3",
  CSS3: "css3",
  Sass: "sass",
  SCSS: "sass",
  Less: "less",
  "Tailwind CSS": "tailwindcss",
  Bootstrap: "bootstrap",
  Webpack: "webpack",
  Vite: "vitejs",
  Babel: "babel",
  ESLint: "eslint",
  Jest: "jest",
  GraphQL: "graphql",
  Nginx: "nginx",
  Apache: "apache",
  Linux: "linux",
  Ubuntu: "ubuntu",
  Android: "android",
  Flutter: "flutter",
  "React Native": "react",
  Electron: "electron",
  Figma: "figma",

  // 追加の言語（LAPRAS データに出現する可能性のあるもの）
  Shell: "bash",
  Bash: "bash",
  YAML: "yaml",
  JSON: "json",
  XML: "xml",
  Markdown: "markdown",
  Dockerfile: "docker",
  ANTLR: "antlr",
};

/**
 * 言語名から Devicon クラス名を取得
 * @param languageName - 言語/フレームワーク名
 * @returns Devicon クラス名、見つからない場合は null
 */
export function getDeviconName(languageName: string): string | null {
  return DEVICON_MAP[languageName] || null;
}

/**
 * 言語が Devicon でサポートされているかチェック
 * @param languageName - 言語/フレームワーク名
 * @returns サポートされている場合は true
 */
export function isLanguageSupported(languageName: string): boolean {
  return languageName in DEVICON_MAP;
}

/**
 * Devicon クラス名を生成
 * @param languageName - 言語/フレームワーク名
 * @param variant - バリアント (plain, original, line など)
 * @returns 完全な Devicon クラス名
 */
export function getDeviconClassName(
  languageName: string,
  variant: string = "plain"
): string | null {
  const deviconName = getDeviconName(languageName);
  if (!deviconName) return null;
  return `devicon-${deviconName}-${variant}`;
}
