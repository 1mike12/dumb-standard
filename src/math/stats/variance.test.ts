import { expect } from "chai"
import { variance } from "./variance"

describe("variance", () => {
  it("should calculate the variance correctly for a simple array", () => {
    const data = [2, 4, 6, 8, 10]
    const mean = 6
    const result = variance(data, mean)
    expect(result).to.be.closeTo(8, 0.0001)
  })

  it("should calculate the variance correctly when mean is not provided", () => {
    const data = [1, 2, 3, 4, 5]
    const result = variance(data)
    expect(result).to.be.closeTo(2, 0.0001)
  })
})
