/**
 * Purpose:
 * 技術スタックを表示するバッジコンポーネント。
 * Deviconアイコンをサポートし、統一されたスタイルを提供する。
 *
 * Context:
 * - Resume.tsxおよびTechnologyTimelineで使用
 * - 重複していたバッジスタイルを共通化
 */

import { getDeviconClass, isDeviconSupported } from "@/utils/devicon";

interface TechBadgeProps {
  name: string;
  variant?: "blue" | "purple";
  size?: "sm" | "md";
}

const variantStyles = {
  blue: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30",
  purple:
    "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30",
};

const sizeStyles = {
  sm: "px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs",
  md: "px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm",
};

export function TechBadge({
  name,
  variant = "blue",
  size = "sm",
}: TechBadgeProps) {
  const isSupported = isDeviconSupported(name);

  return (
    <span
      className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-md border inline-flex items-center gap-1`}
    >
      {isSupported && (
        <i className={`${getDeviconClass(name, "plain")} text-xs md:text-sm`} />
      )}
      {name}
    </span>
  );
}
