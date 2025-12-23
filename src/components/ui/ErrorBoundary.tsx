/**
 * Purpose:
 * Reactエラー境界コンポーネント。
 * 子コンポーネントでのエラーをキャッチし、フォールバックUIを表示する。
 *
 * Context:
 * - データ取得失敗時のグレースフルなエラーハンドリング
 * - ページ全体がクラッシュするのを防ぐ
 * - Resume、Technologiesなどのデータ依存セクションで使用
 */

import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="rounded-lg p-6 bg-red-500/10 border border-red-500/30 text-red-300"
          role="alert"
        >
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="text-sm opacity-80">
            An error occurred while rendering this section.
          </p>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre className="mt-4 text-xs bg-black/20 p-2 rounded overflow-auto">
              {this.state.error.message}
            </pre>
          )}
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * 関数コンポーネント用のエラーハンドリングHOC
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
