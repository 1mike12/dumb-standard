import { expect } from "chai"
import { percentile } from "./percentile"

describe("percentile", () => {
  it("should correctly find the 25th percentile", () => {
    const data = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    const result = percentile(data, 25)

    expect(result).to.equal(30)
  })

  it("should correctly find the 50th percentile (median)", () => {
    const data = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    const result = percentile(data, 50)

    expect(result).to.equal(50)
  })

  it("should correctly find the 75th percentile", () => {
    const data = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    const result = percentile(data, 75)

    expect(result).to.equal(70)
  })

  it("should work with unsorted input data", () => {
    const data = [90, 30, 70, 20, 50, 10, 80, 60, 40]
    const result = percentile(data, 50)

    expect(result).to.equal(50)
  })
})
