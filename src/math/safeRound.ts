/**
 * Rounds a number to a specified number of decimal places, while avoiding floating-point errors.
 *
 * the epsilon adjustment is added or subtracted depending on the number's sign to ensure
 * that values exactly at the midpoint round away from zero, following standard rounding conventions.
 *
 * @param num
 * @param decimalPlaces
 */
export function safeRound(num: number, decimalPlaces: number): number {
  const multiplier = 10 ** decimalPlaces
  // Add epsilon for positive numbers, subtract for negative to ensure proper rounding
  const adjustment = num >= 0 ? Number.EPSILON : -Number.EPSILON
  return Math.round((num + adjustment) * multiplier) / multiplier
}
