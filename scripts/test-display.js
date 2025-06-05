const { execSync } = require("child_process");
const { readFileSync } = require("fs");

// build site
execSync("npm run build", { stdio: "inherit" });

const html = readFileSync("dist/index.html", "utf8");
if (!html.includes("Hi")) {
  throw new Error("Built page does not contain expected text");
}
console.log("Site build output contains expected text");
