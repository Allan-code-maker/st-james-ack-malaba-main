import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Converts nanosecond timestamp (ICP) or millisecond timestamp to a readable date
export function formatNano(timestamp: number | bigint): string {
  const ms = typeof timestamp === "bigint"
    ? Number(timestamp / 1_000_000n)
    : timestamp > 1e12
    ? Math.floor(timestamp / 1_000_000)
    : timestamp;
  return new Date(ms).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Returns a short excerpt of a long text
export function excerpt(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}
