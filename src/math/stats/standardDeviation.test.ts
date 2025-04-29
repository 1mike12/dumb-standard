import { expect } from "chai"
import { standardDeviation } from "./standardDeviation"

describe("standardDeviation", () => {
  it("should calculate the standard deviation correctly for a simple array", () => {
    const data = [2, 4, 6, 8, 10]
    const mean = 6
    const result = standardDeviation(data, mean)
    expect(result).to.be.closeTo(2.8284, 0.0001) // sqrt(8)
  })

  it("should calculate the standard deviation correctly when mean is not provided", () => {
    const data = [1, 2, 3, 4, 5]
    const result = standardDeviation(data)
    expect(result).to.be.closeTo(1.4142, 0.0001) // sqrt(2)
  })
})
