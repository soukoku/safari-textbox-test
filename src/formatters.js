
/**
 * Restricts a number to the specified range.
 * @param num value to clamp
 * @param min minimum value
 * @param max maxium value
 * @returns clamped value
 */
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max)
}
