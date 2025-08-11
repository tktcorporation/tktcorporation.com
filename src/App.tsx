/**
 * Purpose:
 * アプリケーションのルートコンポーネントとルーティング定義。
 * 各ページへのナビゲーションを管理し、SPAとしての動作を実現する。
 *
 * Context:
 * - React Routerを使用したクライアントサイドルーティング
 * - シンプルな3ページ構成（Home、Resume、Technologies）
 * - 全ページ共通の背景エフェクトを提供
 * - 拡張性を考慮した構造
 */

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Technologies from "./pages/Technologies";

// グローバル背景コンポーネント
function GlobalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 浮遊するグラデーションオーブ */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-gradient-to-br from-purple-600/30 via-purple-500/20 to-transparent rounded-full blur-3xl animate-float" />
      <div className="absolute top-[60%] right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-blue-600/30 via-blue-500/20 to-transparent rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute bottom-[20%] left-[30%] w-[600px] h-[600px] bg-gradient-to-br from-pink-600/20 via-pink-500/10 to-transparent rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-[40%] left-[60%] w-[350px] h-[350px] bg-gradient-to-br from-indigo-600/25 via-indigo-500/15 to-transparent rounded-full blur-3xl animate-float" />

      {/* 追加の小さなオーブ */}
      <div className="absolute top-[80%] left-[5%] w-[200px] h-[200px] bg-gradient-to-br from-purple-400/30 to-transparent rounded-full blur-2xl animate-float-delayed" />
      <div className="absolute top-[5%] right-[30%] w-[250px] h-[250px] bg-gradient-to-br from-blue-400/25 to-transparent rounded-full blur-2xl animate-float-slow" />
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
