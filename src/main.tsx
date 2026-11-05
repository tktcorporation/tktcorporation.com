/**
 * Purpose:
 * Reactアプリケーションのエントリーポイント。
 * DOMへのReactアプリケーションのマウントと初期化を行う。
 *
 * Context:
 * - React 19のcreateRootでビルド済みHTMLを操作可能な画面へ置換
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
  // Replace the static snapshot rather than hydrate it: activity windows and
  // dates depend on the visitor's current time and timezone, not build time.
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
