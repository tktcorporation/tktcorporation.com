/**
 * Purpose:
 * Devicon データを React コンポーネントで使用するためのフック。
 * 非同期データ読み込みを管理し、適切な状態を提供する。
 *
 * Context:
 * - deviconLoader から非同期でデータを取得
 * - React の状態管理でローディング状態を管理
 * - キャッシュ済みのデータは即座に利用可能
 */

import { useEffect, useState } from "react";
import { getDeviconClass, preloadDeviconData } from "@/data/deviconLoader";

interface DeviconState {
  isLoaded: boolean;
  getClassName: (name: string, variant?: string) => string | null;
}

// グローバルキャッシュ
const classNameCache = new Map<string, string | null>();

export function useDeviconData(): DeviconState {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // データをプリロード
    preloadDeviconData();

    // 少し待ってからロード完了とマーク
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getClassName = (
    name: string,
    variant: string = "plain"
  ): string | null => {
    const cacheKey = `${name}-${variant}`;

    // キャッシュから取得
    if (classNameCache.has(cacheKey)) {
      return classNameCache.get(cacheKey) || null;
    }

    // 非同期で取得してキャッシュに保存
    getDeviconClass(
      name,
      variant as
        | "plain"
        | "original"
        | "line"
        | "plain-wordmark"
        | "original-wordmark"
    ).then((className) => {
      classNameCache.set(cacheKey, className);
    });

    // 初回は null を返す（次回のレンダリングで表示される）
    return null;
  };

  return {
    isLoaded,
    getClassName,
  };
}
