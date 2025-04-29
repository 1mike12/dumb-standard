import { expect } from "chai"
import { zScore } from "./zScore"

describe("zScore", () => {
  it("should correctly calculate z-scores for a simple array", () => {
    // Using data where mean = 50 and stdDev = 14.14
    const data = [30, 40, 50, 60, 70]
    const mean = 50
    const stdDev = 14.14
    const result = zScore(data, mean, stdDev)

    // Each value should be exactly -2, -1, 0, 1, 2 with stdDev=10
    // With stdDev=14.14, values are approximately -1.41, -0.71, 0, 0.71, 1.41
    expect(result[0]).to.be.closeTo(-1.41, 0.01)
    expect(result[1]).to.be.closeTo(-0.71, 0.01)
    expect(result[2]).to.be.closeTo(0, 0.01)
    expect(result[3]).to.be.closeTo(0.71, 0.01)
    expect(result[4]).to.be.closeTo(1.41, 0.01)
  })

  it("should correctly calculate z-scores when mean and stdDev are provided", () => {
    // Using another dataset
    const data = [85, 90, 95, 100, 105, 110, 115]
    const mean = 100
    const stdDev = 10
    const result = zScore(data, mean, stdDev)

    // Each value should be exactly -1.5, -1, -0.5, 0, 0.5, 1, 1.5
    expect(result[0]).to.equal(-1.5)
    expect(result[1]).to.equal(-1)
    expect(result[2]).to.equal(-0.5)
    expect(result[3]).to.equal(0)
    expect(result[4]).to.equal(0.5)
    expect(result[5]).to.equal(1)
    expect(result[6]).to.equal(1.5)
  })
})
