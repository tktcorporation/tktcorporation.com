/**
 * Purpose:
 * Copy-to-clipboard button for AI-friendly resume export.
 * Provides visual feedback and error handling for clipboard operations.
 *
 * Context:
 * - Uses modern Clipboard API (navigator.clipboard)
 * - Accessible design with keyboard support
 * - Mobile-friendly with touch optimization
 * - Integrates with existing design system (purple/pink gradient theme)
 */

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export interface CopyResumeButtonProps {
  /** Markdown content to copy to clipboard */
  markdown: string;
  /** Button style variant */
  variant?: "primary" | "secondary";
  /** Additional CSS classes */
  className?: string;
}

export function CopyResumeButton({
  markdown,
  variant = "primary",
  className = "",
}: CopyResumeButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      // Modern Clipboard API
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(markdown);
        setCopied(true);
        setError(null);

        // Reset copied state after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = markdown;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.setAttribute("aria-hidden", "true");
        document.body.appendChild(textArea);
        textArea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (successful) {
          setCopied(true);
          setError(null);
          setTimeout(() => setCopied(false), 2000);
        } else {
          throw new Error("Fallback copy failed");
        }
      }
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      setError("Failed to copy. Please try again.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCopy();
    }
  };

  const baseClasses =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900";

  const variantClasses =
    variant === "primary"
      ? "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600"
      : "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700";

  const stateClasses = copied
    ? "!bg-slate-700 !text-green-400 !border-slate-600"
    : "";

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleCopy}
        onKeyDown={handleKeyDown}
        className={`${baseClasses} ${variantClasses} ${stateClasses} ${className}`}
        aria-label={copied ? "Copied to clipboard" : "Copy resume for AI"}
        title={copied ? "Copied!" : "Copy AI-friendly Markdown"}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Copy</span>
          </>
        )}
      </button>

      {error && (
        <div
          className="absolute top-full mt-2 left-0 right-0 bg-red-500 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap z-10"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}
