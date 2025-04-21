/**
 * Calculates the Shapiro-Wilk statistic for a given array of numbers. The output is between 0 and 1, where 0 is a
 * perfect normal distribution and 1 is a perfect non-normal distribution.
 * @param data
 */
export function shapiroWilk(data: number[]) {
  const sortedData = data.slice().sort((a, b) => a - b)
  const n = sortedData.length

  const mean = sortedData.reduce((acc, val) => acc + val, 0) / n
  const deviations = sortedData.map((val) => val - mean)

  const sumSquares = deviations.reduce((acc, val) => acc + val ** 2, 0)
  const sampleVariance = sumSquares / (n - 1)

  const a = sortedData.map((_, i) => i + 1).reduce((acc, val, index) => acc + val * deviations[index], 0)
  const w = a ** 2 / (sampleVariance * sumSquares)

  return w
}
