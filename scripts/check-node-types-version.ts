/**
 * Purpose:
 * @types/node のメジャーバージョンが engines.node と一致しているか検証する。
 * 不一致の場合はエラーで終了し、CI やpre-pushで検出できるようにする。
 *
 * Context:
 * @types/node のバージョンが engines.node と乖離すると、
 * 実行環境に存在しないAPIを使ってしまうリスクがある。
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const pkgPath = resolve(import.meta.dirname, "../package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

const enginesNode = pkg.engines?.node;
if (!enginesNode) {
  console.error("ERROR: engines.node is not defined in package.json");
  process.exit(1);
}

const enginesMajor = enginesNode.replace(/[^0-9]/g, "").slice(0, 2);

const typesNodeVersion =
  pkg.devDependencies?.["@types/node"] || pkg.dependencies?.["@types/node"];
if (!typesNodeVersion) {
  console.error("ERROR: @types/node is not in package.json");
  process.exit(1);
}

const typesMajor = typesNodeVersion.replace(/[^0-9.]/, "").split(".")[0];

if (enginesMajor !== typesMajor) {
  console.error(
    `ERROR: @types/node major version (${typesMajor}) does not match engines.node (${enginesMajor})`
  );
  console.error(`  Fix: npm install @types/node@${enginesMajor} --save-dev`);
  process.exit(1);
}

console.log(
  `OK: @types/node@${typesNodeVersion} matches engines.node "${enginesNode}"`
);
