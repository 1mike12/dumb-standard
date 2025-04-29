/**
 * Calculate the median of an array of numbers
 * @param data - The array of numbers to calculate the median of
 * @returns The median of the array
 */
export function median(data: number[]): number {
  const sorted = data.sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2
}
