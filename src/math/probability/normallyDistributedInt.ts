import {boxMuller} from "./boxMuller";

/**
 * Generates a random integer between `min` and `max` (inclusive) with a normal distribution. Uses the Box-Muller transform.
 * @param min
 * @param max
 */
export function normallyDistributedInt(min: number, max: number): number {
  if (min > max) {
    throw new RangeError("The minimum value must be less than or equal to the maximum value.")
  }
  const mean = (min + max) / 2
  const stdDev = (max - min) / 6
  let num = boxMuller(mean, stdDev)
  num = num * stdDev + mean
  return Math.max(Math.min(Math.round(num), max), min)
}
