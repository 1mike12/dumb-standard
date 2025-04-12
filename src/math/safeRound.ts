/**
 * Rounds a number to a specified number of decimal places, while avoiding floating-point errors.
 *
 * the epsilon as suggested by dr gpt is there to bump up the number by a tiny amount that may mathematically be a round up operation but after floating point results in
 * a round down.
 *
 * @param num
 * @param decimalPlaces
 */
export function safeRound(num: number, decimalPlaces: number): number {
  const multiplier = 10 ** decimalPlaces
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier
}
