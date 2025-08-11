/**
 * Purpose:
 * アプリケーションのルートコンポーネントとルーティング定義。
 * 各ページへのナビゲーションを管理し、SPAとしての動作を実現する。
 *
 * Context:
 * - React Routerを使用したクライアントサイドルーティング
 * - シンプルな3ページ構成（Home、Resume、Technologies）
 * - 拡張性を考慮した構造
 */

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Technologies from "./pages/Technologies";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/technologies" element={<Technologies />} />
    </Routes>
  );
}

export default App;
