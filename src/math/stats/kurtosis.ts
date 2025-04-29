import { mean } from "../central_tendency/mean"
import { standardDeviation } from "./standardDeviation"

export function kurtosis(data: number[]): number {
  const m = mean(data)
  const s = standardDeviation(data, m)
  let sum = 0
  for (let i = 0; i < data.length; i++) {
    sum += ((data[i] - m) / s) ** 4
  }
  const kurtosis = sum / data.length
  return kurtosis
}
