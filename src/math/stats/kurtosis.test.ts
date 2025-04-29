import { expect } from "chai"
import { kurtosis } from "./kurtosis"

describe("kurtosis", () => {
  it("should calculate the kurtosis correctly for a normal distribution", () => {
    // Normal distribution has kurtosis of approximately 3
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const result = kurtosis(data)
    expect(result).to.be.closeTo(1.8, 0.3) // Close to mesokurtic (normal) distribution
  })

  it("should calculate the kurtosis correctly for a uniform distribution", () => {
    // Uniform distribution has kurtosis of approximately 1.8
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const result = kurtosis(data)
    expect(result).to.be.closeTo(1.8, 0.3) // Close to platykurtic (flat) distribution
  })
})
