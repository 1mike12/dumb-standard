import { expect } from "chai"
import { sampleVariance } from "./sample_variance"

describe("sampleVariance", () => {
  it("should calculate the sample variance correctly for a simple array", () => {
    const data = [2, 4, 6, 8, 10]
    const mean = 6
    const result = sampleVariance(data, mean)
    expect(result).to.be.closeTo(10, 0.0001)
  })

  it("should calculate the sample variance correctly when mean is not provided", () => {
    const data = [1, 2, 3, 4, 5]
    const result = sampleVariance(data)
    expect(result).to.be.closeTo(2.5, 0.0001)
  })

  it("should throw an error when dataset has fewer than two points", () => {
    const singleElementArray = [5]
    expect(() => sampleVariance(singleElementArray)).to.throw(
      "Sample variance requires at least two data points"
    )
  })
})
