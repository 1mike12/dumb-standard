import { expect } from "chai"
import { normallyDistributedInt } from "./normallyDistributedInt"

describe("normallyDistributedInt", () => {
  it("should respect min and max bounds", () => {
    const min = 0
    const max = 10
    const iterations = 1e3
    const results = new Array(iterations)
      .fill(0)
      .map(() => normallyDistributedInt(min, max))

    // Check that all values are within bounds
    results.forEach((value) => {
      expect(value).to.be.at.least(min)
      expect(value).to.be.at.most(max)
    })
  })

  it("should have a mean close to the expected mean", () => {
    const min = 0
    const max = 100
    const expectedMean = (min + max) / 2
    const iterations = 1e4 // Large sample size for statistical reliability
    const results = new Array(iterations)
      .fill(0)
      .map(() => normallyDistributedInt(min, max))
    const actualMean = results.reduce((acc, curr) => acc + curr, 0) / iterations

    // For a normal distribution with many samples, the mean should be reasonably close
    // to the expected mean, but allow for some statistical variance
    const tolerance = (max - min) * 0.1 // 10% tolerance
    expect(actualMean).to.be.approximately(expectedMean, tolerance)
  })

  it("should produce a variety of values that follow normal distribution", () => {
    const min = 0
    const max = 10
    const iterations = 1e3
    const results = new Array(iterations)
      .fill(0)
      .map(() => normallyDistributedInt(min, max))

    // Normal distribution should produce multiple different values
    const uniqueValues = new Set(results)
    expect(uniqueValues.size).to.be.greaterThan(3)

    // Count occurrences of each value
    const counts = {}
    results.forEach((val) => {
      counts[val] = (counts[val] || 0) + 1
    })

    // Values closer to the mean should generally appear more frequently
    // than values at the extremes
    const mean = (min + max) / 2
    const countAtMean = counts[Math.round(mean)] || 0
    const countAtMin = counts[min] || 0
    const countAtMax = counts[max] || 0

    // The values at the mean should be more frequent than at the extremes
    // This test is probabilistic but should almost always pass with
    // enough iterations for a true normal distribution
    expect(countAtMean).to.be.greaterThan(Math.min(countAtMin, countAtMax))
  })
})
