/**
 * Purpose:
 * バッジコンポーネント - 技術スタックや職種を表示
 * Deviconアイコンをサポートし、統一されたスタイルを提供する。
 *
 * Context:
 * - Resume.tsxおよびTechnologyTimelineで使用
 * - ExperienceCardのPositionBadgeも統合
 * - ボーダーなし: 背景色のみで軽く存在を示す。余白で語るデザイン。
 */

import { getDeviconClass, isDeviconSupported } from "@/utils/devicon";

type BadgeVariant = "blue" | "purple" | "position";
type BadgeSize = "sm" | "md";

interface TechBadgeProps {
  name: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Deviconアイコンを表示するか（デフォルト: variant が "position" でなければ true） */
  showIcon?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  blue: "bg-blue-50/80 text-blue-700",
  purple: "bg-stone-100/70 text-stone-600",
  position: "text-stone-500",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px] md:text-xs",
  md: "px-2 py-0.5 text-xs md:text-sm",
};

export function TechBadge({
  name,
  variant = "blue",
  size = "sm",
  showIcon,
}: TechBadgeProps) {
  const shouldShowIcon = showIcon ?? variant !== "position";
  const isSupported = shouldShowIcon && isDeviconSupported(name);

  return (
    <span
      className={`${variantStyles[variant]} ${sizeStyles[size]} inline-flex items-center gap-1 rounded-sm`}
    >
      {isSupported && (
        <i className={`${getDeviconClass(name, "plain")} text-xs md:text-sm`} />
      )}
      {name}
    </span>
  );
}

/**
 * 職種バッジ - TechBadge の position バリアントのラッパー
 * ボーダーなし、テキストのみで職種を控えめに表示
 */
export function PositionBadge({ name }: { name: string }) {
  return <TechBadge name={name} variant="position" size="sm" />;
}
