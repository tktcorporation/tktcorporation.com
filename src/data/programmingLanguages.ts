/**
 * Purpose:
 * プログラミング言語とフレームワークの正式名称マッピングデータ。
 * Devicon のデータを基に自動生成し、カスタム拡張を追加。
 *
 * Context:
 * - Devicon パッケージから自動的に言語データを生成
 * - 正式名称、エイリアス、タイプ、色情報を提供
 * - TechnologyTimeline と Resume で使用
 */

import { deviconData, inferTypeFromTags } from "./deviconData";

export interface LanguageInfo {
  name: string;
  type:
    | "programming"
    | "markup"
    | "framework"
    | "database"
    | "tool"
    | "cloud"
    | "mobile"
    | "design"
    | "css"
    | "backend"
    | "hosting"
    | "infrastructure"
    | "ci";
  aliases?: string[];
  color?: string;
}

/**
 * Devicon データから言語情報を自動生成
 */
function generateFromDeviconData(): Record<string, LanguageInfo> {
  const result: Record<string, LanguageInfo> = {};

  for (const entry of deviconData) {
    // 正式名称を生成（特殊なケースを処理）
    let displayName = entry.name;

    // 特殊な表記名のマッピング
    const specialNames: Record<string, string> = {
      amazonwebservices: "AWS",
      angular: "Angular",
      angularjs: "AngularJS",
      angularmaterial: "Angular Material",
      apacheairflow: "Apache Airflow",
      apachekafka: "Apache Kafka",
      apachespark: "Apache Spark",
      apollographql: "Apollo GraphQL",
      azuredevops: "Azure DevOps",
      azuresqldatabase: "Azure SQL Database",
      babylonjs: "Babylon.js",
      backbonejs: "Backbone.js",
      bootstrap: "Bootstrap",
      c: "C",
      cplusplus: "C++",
      csharp: "C#",
      chartjs: "Chart.js",
      circleci: "CircleCI",
      cloudflareworkers: "Cloudflare Workers",
      cloudrun: "Cloud Run",
      coffeescript: "CoffeeScript",
      css3: "CSS3",
      d3js: "D3.js",
      datagrip: "DataGrip",
      dataspell: "DataSpell",
      denojs: "Deno",
      digitalocean: "DigitalOcean",
      discordjs: "Discord.js",
      django: "Django",
      djangorest: "Django REST",
      docker: "Docker",
      "dot-net": ".NET",
      dotnetcore: ".NET Core",
      dreamweaver: "Dreamweaver",
      duckdb: "DuckDB",
      dynamodb: "DynamoDB",
      elasticsearch: "Elasticsearch",
      entityframeworkcore: "Entity Framework Core",
      eslint: "ESLint",
      express: "Express",
      facebook: "Facebook",
      fastapi: "FastAPI",
      fastify: "Fastify",
      faunadb: "FaunaDB",
      feathersjs: "Feathers.js",
      filamentphp: "Filament PHP",
      firebase: "Firebase",
      github: "GitHub",
      githubactions: "GitHub Actions",
      gitlab: "GitLab",
      go: "Go",
      googlecloud: "Google Cloud",
      graphql: "GraphQL",
      html5: "HTML5",
      intellij: "IntelliJ IDEA",
      javascript: "JavaScript",
      jenkins: "Jenkins",
      jest: "Jest",
      jquery: "jQuery",
      julia: "Julia",
      jupyter: "Jupyter",
      kotlin: "Kotlin",
      kubernetes: "Kubernetes",
      laravel: "Laravel",
      linkedin: "LinkedIn",
      materialui: "Material-UI",
      matlab: "MATLAB",
      microsoftsqlserver: "Microsoft SQL Server",
      mobx: "MobX",
      mongodb: "MongoDB",
      mysql: "MySQL",
      neo4j: "Neo4j",
      nestjs: "NestJS",
      nextjs: "Next.js",
      nginx: "Nginx",
      nodejs: "Node.js",
      npm: "npm",
      numpy: "NumPy",
      nuxtjs: "Nuxt.js",
      objectivec: "Objective-C",
      opencv: "OpenCV",
      opengl: "OpenGL",
      pandas: "Pandas",
      photoshop: "Photoshop",
      php: "PHP",
      phpstorm: "PhpStorm",
      playwright: "Playwright",
      postgresql: "PostgreSQL",
      pycharm: "PyCharm",
      python: "Python",
      pytorch: "PyTorch",
      r: "R",
      raspberrypi: "Raspberry Pi",
      react: "React",
      reactnative: "React Native",
      redis: "Redis",
      redux: "Redux",
      ruby: "Ruby",
      rubyonrails: "Ruby on Rails",
      rust: "Rust",
      rxjs: "RxJS",
      sass: "Sass",
      scala: "Scala",
      scikitlearn: "scikit-learn",
      selenium: "Selenium",
      socketio: "Socket.io",
      sourcetree: "SourceTree",
      spring: "Spring",
      sqlite: "SQLite",
      svelte: "Svelte",
      swift: "Swift",
      symfony: "Symfony",
      tailwindcss: "Tailwind CSS",
      tensorflow: "TensorFlow",
      terraform: "Terraform",
      threejs: "Three.js",
      travis: "Travis CI",
      twitter: "Twitter",
      typescript: "TypeScript",
      ubuntu: "Ubuntu",
      unity: "Unity",
      unrealengine: "Unreal Engine",
      vscode: "Visual Studio Code",
      vuejs: "Vue.js",
      vuetify: "Vuetify",
      webassembly: "WebAssembly",
      webpack: "Webpack",
      webstorm: "WebStorm",
      windows: "Windows",
      wordpress: "WordPress",
      xamarin: "Xamarin",
      xml: "XML",
      yaml: "YAML",
      yarn: "Yarn",
      yii: "Yii",
      zend: "Zend",
    };

    // 表示名を決定
    if (specialNames[entry.name]) {
      displayName = specialNames[entry.name];
    } else {
      // キャメルケースやケバブケースを適切に変換
      displayName = entry.name
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/-/g, " ")
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    // タイプを推定
    const type = inferTypeFromTags(entry.tags);

    // エイリアスを収集
    const aliases: string[] = [entry.name];
    if (entry.altnames) {
      aliases.push(...entry.altnames);
    }

    // 言語情報を追加
    result[displayName] = {
      name: displayName,
      type: type as LanguageInfo["type"],
      aliases,
      color: entry.color,
    };
  }

  return result;
}

// Devicon データから自動生成
const baseLanguageData = generateFromDeviconData();

// カスタム拡張データ（Deviconにない技術や追加情報）
const customLanguages: Record<string, LanguageInfo> = {
  // Devicon に含まれていない技術
  Biome: {
    name: "Biome",
    type: "tool",
    aliases: ["biome"],
    color: "#60a5fa",
  },
  Vite: {
    name: "Vite",
    type: "tool",
    aliases: ["vite", "vitejs"],
    color: "#646cff",
  },
  Supabase: {
    name: "Supabase",
    type: "backend",
    aliases: ["supabase"],
    color: "#3fcf8e",
  },
  Vercel: {
    name: "Vercel",
    type: "hosting",
    aliases: ["vercel"],
    color: "#000000",
  },
  Netlify: {
    name: "Netlify",
    type: "hosting",
    aliases: ["netlify"],
    color: "#00c7b7",
  },
  Prisma: {
    name: "Prisma",
    type: "tool",
    aliases: ["prisma"],
    color: "#2d3748",
  },
  Bun: {
    name: "Bun",
    type: "tool",
    aliases: ["bun"],
    color: "#fbf0df",
  },
  Qiita: {
    name: "Qiita",
    type: "tool",
    aliases: ["qiita"],
    color: "#55c500",
  },
  Zenn: {
    name: "Zenn",
    type: "tool",
    aliases: ["zenn"],
    color: "#3ea8ff",
  },
  LAPRAS: {
    name: "LAPRAS",
    type: "tool",
    aliases: ["lapras"],
    color: "#6366f1",
  },
};

// 最終的な言語データ（Devicon + カスタム）
export const programmingLanguages: Record<string, LanguageInfo> = {
  ...baseLanguageData,
  ...customLanguages,
};
