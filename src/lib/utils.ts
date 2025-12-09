import { CharacterConfig } from "./types";

/**
 * Utility functions for the character library
 */

/**
 * Get size classes based on size preset
 */
export function getSizeClasses(size: CharacterConfig["size"] = "medium"): string {
  const sizeMap = {
    small: "w-32 h-32",
    medium: "w-48 h-48",
    large: "w-64 h-64",
    xlarge: "w-80 h-80",
  };
  return sizeMap[size];
}

/**
 * Get shadow size classes based on character size
 */
export function getShadowSizeClasses(
  size: CharacterConfig["size"] = "medium"
): string {
  const sizeMap = {
    small: "w-20 h-3",
    medium: "w-32 h-4",
    large: "w-40 h-5",
    xlarge: "w-48 h-6",
  };
  return sizeMap[size];
}

/**
 * Get shadow position classes based on character size
 */
export function getShadowPositionClasses(
  size: CharacterConfig["size"] = "medium"
): string {
  const positionMap = {
    small: "-bottom-2",
    medium: "-bottom-4",
    large: "-bottom-5",
    xlarge: "-bottom-6",
  };
  return `absolute ${positionMap[size]} left-1/2 -translate-x-1/2`;
}

/**
 * Default auto-reset durations for different reactions (in milliseconds)
 */
export const DEFAULT_DURATIONS = {
  correct: 3000,
  wrong: 2500,
  smile: 0, // No auto-reset for smile state
} as const;
