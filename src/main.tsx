/**
 * Purpose:
 * Reactアプリケーションのエントリーポイント。
 * DOMへのReactアプリケーションのマウントと初期化を行う。
 *
 * Context:
 * - React 18のcreateRootを使用した最新のレンダリング方法
 * - StrictModeで開発時の潜在的な問題を検出
 * - BrowserRouterでSPAルーティングを有効化
 * - グローバルCSSの適用
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
