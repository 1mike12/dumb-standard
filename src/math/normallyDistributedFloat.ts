export function normallyDistributedFloat(minValue: number, maxValue: number) {
  const range = maxValue - minValue
  const mean = minValue + range / 2
  const stdDev = range / 6 // Approximately 99.7% of data falls within 3 standard deviations

  let num: number
  do {
    num = mean + (Math.random() * 2 - 1) * stdDev // Generate a random number within the range of mean ± stdDev
  } while (num < minValue || num > maxValue)

  return num
}
