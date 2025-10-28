/**
 * Purpose:
 * Convert Markdown resume to plain text format.
 * Generates terminal-friendly, ASCII-formatted output optimized for
 * command-line tools and text-only environments.
 *
 * Context:
 * - Maximum 80-character line width for terminal compatibility
 * - Uses ASCII characters (-, *, =) for visual hierarchy
 * - Preserves all content from Markdown while removing formatting syntax
 */

/**
 * Convert Markdown to plain text
 * Removes Markdown syntax and formats for terminal display
 */
export function markdownToPlainText(markdown: string): string {
  let text = markdown;

  // Remove YAML frontmatter but keep content
  text = text.replace(/^---\n([\s\S]*?)\n---\n/gm, (_match, content) => {
    // Extract key-value pairs from frontmatter
    const lines = content.split("\n");
    let result = "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.endsWith(":")) {
        result += `${trimmed}\n`;
      } else if (trimmed.endsWith(":")) {
        result += `\n${trimmed}\n`;
      }
    }
    return `${result}\n${"=".repeat(80)}\n\n`;
  });

  // Convert headers to uppercase with underlines
  text = text.replace(/^### (.+)$/gm, (_match, heading) => {
    return `\n${heading}\n${"-".repeat(heading.length)}\n`;
  });

  text = text.replace(/^## (.+)$/gm, (_match, heading) => {
    return `\n\n${heading.toUpperCase()}\n${"=".repeat(heading.length)}\n`;
  });

  text = text.replace(/^# (.+)$/gm, (_match, heading) => {
    return `${"=".repeat(80)}\n${heading.toUpperCase()}\n${"=".repeat(80)}\n`;
  });

  // Convert bold (**text**) to uppercase
  text = text.replace(/\*\*(.+?)\*\*/g, (_match, content) => {
    return content.toUpperCase();
  });

  // Remove links but keep text
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, "$1 ($2)");

  // Remove italic markers
  text = text.replace(/\*(.+?)\*/g, "$1");

  // Convert horizontal rules
  text = text.replace(/^---$/gm, "-".repeat(80));

  // Ensure proper line spacing
  text = text.replace(/\n{3,}/g, "\n\n");

  // Wrap long lines at 80 characters (preserve bullet points)
  const lines = text.split("\n");
  const wrapped: string[] = [];

  for (const line of lines) {
    if (line.length <= 80) {
      wrapped.push(line);
      continue;
    }

    // Check if it's a bullet point
    const bulletMatch = line.match(/^(\s*-\s*)/);
    if (bulletMatch) {
      const indent = bulletMatch[1];
      const content = line.substring(indent.length);
      const words = content.split(" ");
      let currentLine = indent;

      for (const word of words) {
        if ((currentLine + word).length <= 80) {
          currentLine += (currentLine === indent ? "" : " ") + word;
        } else {
          wrapped.push(currentLine);
          currentLine = `  ${word}`; // Indent continuation
        }
      }
      if (currentLine.trim()) {
        wrapped.push(currentLine);
      }
    } else {
      // Regular line, just wrap at word boundaries
      const words = line.split(" ");
      let currentLine = "";

      for (const word of words) {
        if ((currentLine + word).length <= 80) {
          currentLine += (currentLine ? " " : "") + word;
        } else {
          if (currentLine) wrapped.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) wrapped.push(currentLine);
    }
  }

  return wrapped.join("\n");
}
