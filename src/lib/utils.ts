/**
 * Purpose:
 * Utility functions for shadcn/ui components, including class name merging
 * and conditional class application using clsx and tailwind-merge.
 *
 * Context:
 * This is the standard utility file used by shadcn/ui components for
 * consistent class name handling and Tailwind CSS conflict resolution.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
