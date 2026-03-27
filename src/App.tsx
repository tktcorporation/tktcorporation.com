/**
 * Purpose:
 * アプリケーションのルートコンポーネントとルーティング定義。
 * 各ページへのナビゲーションを管理し、SPAとしての動作を実現する。
 *
 * Context:
 * - React Routerを使用したクライアントサイドルーティング
 * - 3ページ構成（Home、Resume、Technologies）
 * - ミニマルなライトテーマ。装飾的な背景エフェクトは排除。
 */

import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Resume from "./pages/Resume";
import {
  ResumeJsonExport,
  ResumeMarkdownExport,
  ResumeTextExport,
} from "./pages/ResumeExports";
import Technologies from "./pages/Technologies";

function App() {
  return (
    <div className="bg-background min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/technologies" element={<Technologies />} />
        {/* Export routes for AI-friendly access */}
        <Route path="/resume.md" element={<ResumeMarkdownExport />} />
        <Route path="/resume.txt" element={<ResumeTextExport />} />
        <Route path="/resume.json" element={<ResumeJsonExport />} />
      </Routes>
    </div>
  );
}

export default App;
