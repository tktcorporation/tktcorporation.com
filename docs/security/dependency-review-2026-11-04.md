# 依存関係のセキュリティ確認（2026-11-04）

基準: master `5573f70`、Node 24.22.1 / npm 11.9.0。`npm audit --json` の17パッケージ指摘（2 moderate / 12 high / 3 critical）を分類した。
以下の影響範囲はコード・実行構成からの判断であり、脆弱性の到達・悪用を実証したものではない。
監査は npm パッケージを対象とし、ネイティブバイナリやOS全体の安全性を保証しない。

## 対応方針

- React Router・Zod・knipを修正版へ更新。
- Vite+ 1.5.0が使用する実コアを `vp toolchain` と `import { version } from 'vite'` で確認: Vite 8.3.5。
- [公式手順](https://viteplus.dev/guide/local-cli)に従いviteを同一coreにalias/overrideし、Vitest 5.1.0を固定。
- NodeはVite+の要件に合わせ24.11.0以上の24系へ制限。
- [既存PR #742](https://github.com/tktcorporation/tktcorporation.com/pull/742)のpicomatch対応を重複作成せず、最新masterに追従させる。
- `@tailwindcss/typography` 最新0.5.20もparser 6.0.10を固定しているため、同じ6系の修正版へ限定override。上流修正後に削除する。

## パッケージごとの影響と対応

| パッケージ              | このリポジトリでの影響・前提                                                                                                                            | 対応                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| react-router            | BrowserRouter の静的SPA。SSR/RSC/サーバーactions・manifest・single-fetch・prerenderは未使用。Link/navigate/マッチングは利用するため更新対象。           | react-router-dom 7.18.5                         |
| vite                    | 開発サーバー（host 0.0.0.0）。ファイル取得・deny/allow回避は開発環境で影響。Windows editor系は現在のLinuxでは非該当。静的配信物にサーバーは含まれない。 | vite-plus/core 1.5.0（実Vite 8.3.5）            |
| zod                     | アプリとknipで使用。現状は同梱データを検証し、攻撃者の大容量コレクション入力経路は未確認。制限の回避を修正。                                            | 4.6.6 + knip 5.88.1                             |
| picomatch               | CLIのglob処理（knip/actionlint）。外部の任意パターンを受けるサービスなし。既存PR #742で2.x/4.xを更新。                                                  | 既存PR #742                                     |
| js-yaml                 | knipの設定ファイル解析。攻撃者が設定YAMLを変更できる場合のCPU消費。                                                                                     | lockfile更新                                    |
| smol-toml               | knipの設定ファイル解析。不正・大容量TOMLを入力した場合のCPU消費。                                                                                       | lockfile更新                                    |
| nanoid                  | PostCSS等のツール内のID生成。外部からサイズを指定する呼び出しは未確認。                                                                                 | lockfile更新                                    |
| postcss                 | CSSビルド処理。不正なCSS/sourceMappingURLを入力した場合の読み取り・CSSをHTML埋め込みした場合のXSS。現在はリポジトリ内CSSを処理。                        | core更新 + lockfile更新                         |
| postcss-selector-parser | typographyのCSSセレクター解析。攻撃者の長大セレクターを処理する経路は未確認。上流の6.0.10固定を6.1.5へ限定override。                                    | 6.1.5 override                                  |
| source-map-js           | ビルドツールのsource map処理。不正なindexed mapを入力する場合のCPU消費。                                                                                | lockfile更新                                    |
| tinypool                | formatterのworker実行。prototype pollution成立後の実行オプション改変が前提。アプリ配信物には含まれず、到達可能な汚染経路は未確認。                      | vite-plus 1.5.0 / oxfmt 0.76.0 / tinypool 2.2.0 |

`@tailwindcss/typography`、`knip`、`react-router-dom`、`oxfmt`、`vite-plus`、`zod-validation-error` の指摘は上表の依存の伝播で、独立したadvisoryではない。

## 全advisoryの一覧

同一advisoryの複数メジャーバージョン向けレコードは統合した。影響・対応は上表の該当パッケージを参照。

| パッケージ              | Advisory                                                                 | 重要度   | 内容                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| js-yaml                 | [GHSA-h67p-54hq-rp68](https://github.com/advisories/GHSA-h67p-54hq-rp68) | moderate | JS-YAML: Quadratic-complexity DoS in merge key handling via repeated aliases                                                          |
| js-yaml                 | [GHSA-52cp-r559-cp3m](https://github.com/advisories/GHSA-52cp-r559-cp3m) | high     | js-yaml: YAML merge-key chains can force quadratic CPU consumption                                                                    |
| js-yaml                 | [GHSA-5p4m-2wfm-xmqj](https://github.com/advisories/GHSA-5p4m-2wfm-xmqj) | high     | JS-YAML: Quadratic CPU consumption in !!omap resolution (3.x and 4.x) — CVE-2026-59870 fix not backported                             |
| js-yaml                 | [GHSA-2883-xcg3-v3hh](https://github.com/advisories/GHSA-2883-xcg3-v3hh) | high     | js-yaml: maxTotalMergeKeys does not limit CPU use for empty merge sources                                                             |
| nanoid                  | [GHSA-28wg-ghj8-5hjv](https://github.com/advisories/GHSA-28wg-ghj8-5hjv) | high     | nanoid: non-secure generators can loop indefinitely with negative size                                                                |
| nanoid                  | [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8) | high     | nanoid: custom generators can loop indefinitely when size is zero                                                                     |
| nanoid                  | [GHSA-xwg4-73v4-xw9w](https://github.com/advisories/GHSA-xwg4-73v4-xw9w) | high     | nanoid: Integer Overflow or Wraparound                                                                                                |
| picomatch               | [GHSA-3v7f-55p6-f55p](https://github.com/advisories/GHSA-3v7f-55p6-f55p) | moderate | Picomatch: Method Injection in POSIX Character Classes causes incorrect Glob Matching                                                 |
| picomatch               | [GHSA-c2c7-rcm5-vvqj](https://github.com/advisories/GHSA-c2c7-rcm5-vvqj) | high     | Picomatch has a ReDoS vulnerability via extglob quantifiers                                                                           |
| postcss                 | [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) | moderate | PostCSS has XSS via Unescaped </style> in its CSS Stringify Output                                                                    |
| postcss                 | [GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q) | high     | PostCSS: Arbitrary file read and information disclosure via attacker-controlled sourceMappingURL in CSS comments                      |
| postcss                 | [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) | moderate | PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappingURL reads arbitrary .map files when `from` is unset |
| postcss                 | [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849) | high     | PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) leads to Arbitrary .map File Disclosure                |
| postcss-selector-parser | [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) | moderate | PostCSS: Quadratic complexity in flat selector parsing allows CPU exhaustion                                                          |
| react-router            | [GHSA-49rj-9fvp-4h2h](https://github.com/advisories/GHSA-49rj-9fvp-4h2h) | high     | React Router's vendored turbo-stream v2 allows arbitrary constructor invocation via TYPE_ERROR deserialization leading to Unauth RCE  |
| react-router            | [GHSA-8646-j5j9-6r62](https://github.com/advisories/GHSA-8646-j5j9-6r62) | high     | React Router vulnerable to XSS in unstable RSC redirect handling via javascript: redirect targets                                     |
| react-router            | [GHSA-8x6r-g9mw-2r78](https://github.com/advisories/GHSA-8x6r-g9mw-2r78) | high     | React Router vulnerable to DoS via unbounded path expansion in __manifest endpoint                                                    |
| react-router            | [GHSA-rxv8-25v2-qmq8](https://github.com/advisories/GHSA-rxv8-25v2-qmq8) | high     | React Router vulnerable to Denial of Service via reflected user input in single-fetch                                                 |
| react-router            | [GHSA-84g9-w2xq-vcv6](https://github.com/advisories/GHSA-84g9-w2xq-vcv6) | low      | React Router: Potential CSRF via PUT/PATCH/DELETE document requests                                                                   |
| react-router            | [GHSA-wrjc-x8rr-h8h6](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) | moderate | React Router: Open redirect via backslash in <Link> and useNavigate (CVE-2025-68470 bypass)                                           |
| react-router            | [GHSA-h8fp-f39c-q6mh](https://github.com/advisories/GHSA-h8fp-f39c-q6mh) | moderate | React Router: RSCErrorHandler Missing Protocol Validation (XSS)                                                                       |
| react-router            | [GHSA-337j-9hxr-rhxg](https://github.com/advisories/GHSA-337j-9hxr-rhxg) | moderate | React Router: Arbitrary Constructor Injection via deserializeErrors() in React Router SSR Hydration                                   |
| react-router            | [GHSA-chx6-hx7r-mcp5](https://github.com/advisories/GHSA-chx6-hx7r-mcp5) | high     | React Router: Unauthenticated Denial of Service via Inefficient Route Matching                                                        |
| react-router            | [GHSA-2j2x-hqr9-3h42](https://github.com/advisories/GHSA-2j2x-hqr9-3h42) | moderate | React Router's same-origin redirect with path starting // causes open redirect via protocol-relative URL reinterpretation             |
| react-router            | [GHSA-qwww-vcr4-c8h2](https://github.com/advisories/GHSA-qwww-vcr4-c8h2) | high     | React Router: RSC Mode CSRF Bypass Allows Action Execution Before 400 Response                                                        |
| react-router            | [GHSA-f22v-gfqf-p8f3](https://github.com/advisories/GHSA-f22v-gfqf-p8f3) | moderate | React Router has stored XSS via unescaped Location header in prerendered redirect HTML                                                |
| smol-toml               | [GHSA-v3rj-xjv7-4jmq](https://github.com/advisories/GHSA-v3rj-xjv7-4jmq) | moderate | smol-toml: Denial of Service via TOML documents containing thousands of consecutive commented lines                                   |
| smol-toml               | [GHSA-7w5x-hrqm-74c2](https://github.com/advisories/GHSA-7w5x-hrqm-74c2) | high     | smol-toml: Denial of Service via malformed TOML documents                                                                             |
| smol-toml               | [GHSA-r4xh-jqrq-34v2](https://github.com/advisories/GHSA-r4xh-jqrq-34v2) | moderate | smol-toml: Quadratic-time parse() from parseKey rescanning to end of document on each key line                                        |
| source-map-js           | [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) | high     | source-map-js allows event-loop denial of service through indexed source-map section offsets                                          |
| tinypool                | [GHSA-5gmw-xhrv-c9v3](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3) | critical | Tinypool: Prototype Pollution gadget in worker options leads to Remote Code Execution                                                 |
| tinypool                | [GHSA-85c8-ppgw-ccpr](https://github.com/advisories/GHSA-85c8-ppgw-ccpr) | critical | Tinypool: Prototype Pollution Gadget to RCE in run() options                                                                          |
| vite                    | [GHSA-4w7w-66w2-5vf9](https://github.com/advisories/GHSA-4w7w-66w2-5vf9) | moderate | Vite Vulnerable to Path Traversal in Optimized Deps `.map` Handling                                                                   |
| vite                    | [GHSA-v2wj-q39q-566r](https://github.com/advisories/GHSA-v2wj-q39q-566r) | high     | Vite: `server.fs.deny` bypassed with queries                                                                                          |
| vite                    | [GHSA-p9ff-h696-f583](https://github.com/advisories/GHSA-p9ff-h696-f583) | high     | Vite Vulnerable to Arbitrary File Read via Vite Dev Server WebSocket                                                                  |
| vite                    | [GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3) | moderate | launch-editor: NTLMv2 hash disclosure via UNC path handling on Windows                                                                |
| vite                    | [GHSA-698v-4r3x-3vcv](https://github.com/advisories/GHSA-698v-4r3x-3vcv) | moderate | launch-editor: escapeCmdArgs() omits % escaping on Windows                                                                            |
| vite                    | [GHSA-r825-w8mm-5pxw](https://github.com/advisories/GHSA-r825-w8mm-5pxw) | moderate | launch-editor: Editor CLI flag misinterpretation causing arbitrary command execution for some editors                                 |
| vite                    | [GHSA-587h-7wmj-h5pm](https://github.com/advisories/GHSA-587h-7wmj-h5pm) | high     | launch-editor: `fs.existsSync()` existence check can be bypassed on Windows                                                           |
| vite                    | [GHSA-9jrq-w75r-8gcw](https://github.com/advisories/GHSA-9jrq-w75r-8gcw) | low      | Vite: Cross origin script execution through Vite custom middleware                                                                    |
| vite                    | [GHSA-rq7h-c2jc-7f22](https://github.com/advisories/GHSA-rq7h-c2jc-7f22) | moderate | Vite: Files outside `server.fs.allow` could be served when project paths match system paths on non-Windows machine                    |
| vite                    | [GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff) | moderate | vite: `server.fs.deny` bypass on Windows alternate paths                                                                              |
| zod                     | [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) | high     | Zod can exhaust memory while validating oversized constrained collections                                                             |

合計 43 advisory。更新後の監査結果と検証結果はPR本文に記載する。
