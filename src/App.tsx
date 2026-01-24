/**
 * Purpose:
 * アプリケーションのルートコンポーネントとルーティング定義。
 * 各ページへのナビゲーションを管理し、SPAとしての動作を実現する。
 *
 * Context:
 * - React Routerを使用したクライアントサイドルーティング
 * - 4ページ構成（Home、Resume、Technologies、Portfolio）
 * - 全ページ共通の背景エフェクトを提供
 * - 拡張性を考慮した構造
 */

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Resume from "./pages/Resume";
import {
  ResumeJsonExport,
  ResumeMarkdownExport,
  ResumeTextExport,
} from "./pages/ResumeExports";
import Technologies from "./pages/Technologies";

// グローバル背景コンポーネント
// Note: UI/UXガイドラインに従い、装飾的なアニメーションを排除しシンプルな背景に統一
function GlobalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 静的なグラデーション背景 - 控えめなアクセント */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* グローバル背景エフェクト */}
      <GlobalBackground />

      {/* ページコンテンツ */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/portfolio" element={<Portfolio />} />
          {/* Export routes for AI-friendly access */}
          <Route path="/resume.md" element={<ResumeMarkdownExport />} />
          <Route path="/resume.txt" element={<ResumeTextExport />} />
          <Route path="/resume.json" element={<ResumeJsonExport />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
