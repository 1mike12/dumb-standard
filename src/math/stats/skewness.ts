import { mean } from "../central_tendency/mean"
import { standardDeviation } from "./standardDeviation"

export function skewness(data: number[]): number {
  const m = mean(data)
  const s = standardDeviation(data, m)
  let sum = 0
  for (let i = 0; i < data.length; i++) {
    sum += ((data[i] - m) / s) ** 3
  }
  const skewness = sum / data.length
  return skewness
}
