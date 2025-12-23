/**
 * Purpose:
 * 共通スケルトン/ローディングコンポーネント群。
 * 一貫したローディング状態のUIを提供する。
 *
 * Context:
 * - ExperienceSection、SkillsSectionなどで使用
 * - アニメーション付きのプレースホルダーUI
 * - 再利用可能なスケルトンプリミティブ
 */

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * 基本スケルトン要素
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("bg-white/10 rounded animate-pulse", className)}
      aria-hidden="true"
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

/**
 * テキスト行のスケルトン
 */
export function SkeletonText({ lines = 1, className }: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={`skeleton-text-${i}`}
          className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps {
  className?: string;
  showHeader?: boolean;
  showContent?: boolean;
}

/**
 * カード形式のスケルトン
 */
export function SkeletonCard({
  className,
  showHeader = true,
  showContent = true,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-4 md:p-6 bg-white/5 backdrop-blur-lg border border-white/10 animate-pulse",
        className
      )}
      aria-hidden="true"
    >
      {showHeader && (
        <>
          <Skeleton className="h-5 md:h-6 w-1/3 mb-3 md:mb-4" />
          <Skeleton className="h-4 w-1/2 mb-2" />
        </>
      )}
      {showContent && <Skeleton className="h-4 w-full" />}
    </div>
  );
}

interface SkeletonGridProps {
  cols?: number;
  rows?: number;
  className?: string;
  itemClassName?: string;
}

/**
 * グリッド形式のスケルトン
 */
export function SkeletonGrid({
  cols = 4,
  rows = 2,
  className,
  itemClassName,
}: SkeletonGridProps) {
  const count = cols * rows;

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3",
        className
      )}
      aria-busy="true"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`skeleton-grid-${i}`}
          className={cn(
            "rounded-md p-2 md:p-3 bg-white/5 backdrop-blur-lg border border-white/10 animate-pulse",
            itemClassName
          )}
        >
          <Skeleton className="h-4 w-2/3 mb-1" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}

interface SkeletonListProps {
  count?: number;
  className?: string;
}

/**
 * リスト形式のスケルトン（タイムライン用）
 */
export function SkeletonList({ count = 2, className }: SkeletonListProps) {
  return (
    <div
      className={cn("space-y-6 md:space-y-8", className)}
      aria-busy="true"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={`skeleton-list-${i}`} />
      ))}
    </div>
  );
}
