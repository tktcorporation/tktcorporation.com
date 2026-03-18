/**
 * Purpose:
 * バッジコンポーネント - 技術スタックや職種を表示
 * Deviconアイコンをサポートし、統一されたスタイルを提供する。
 *
 * Context:
 * - Resume.tsxおよびTechnologyTimelineで使用
 * - ExperienceCardのPositionBadgeも統合
 * - ミニマルデザイン: 控えめな背景色とボーダー
 */

import { getDeviconClass, isDeviconSupported } from "@/utils/devicon";

type BadgeVariant = "blue" | "purple" | "position";
type BadgeSize = "sm" | "md";
type BadgeShape = "rounded" | "pill";

interface TechBadgeProps {
  name: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  /** Deviconアイコンを表示するか（デフォルト: variant が "position" でなければ true） */
  showIcon?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  purple: "bg-stone-50 text-stone-600 border-stone-200",
  position: "bg-stone-50 text-stone-600 border-stone-200",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs",
  md: "px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm",
};

const shapeStyles: Record<BadgeShape, string> = {
  rounded: "rounded-md",
  pill: "rounded-full",
};

export function TechBadge({
  name,
  variant = "blue",
  size = "sm",
  shape = "rounded",
  showIcon,
}: TechBadgeProps) {
  const shouldShowIcon = showIcon ?? variant !== "position";
  const isSupported = shouldShowIcon && isDeviconSupported(name);

  return (
    <span
      className={`${variantStyles[variant]} ${sizeStyles[size]} ${shapeStyles[shape]} inline-flex items-center gap-1 border`}
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
 */
export function PositionBadge({ name }: { name: string }) {
  return <TechBadge name={name} variant="position" shape="pill" />;
}
