import { expect } from "chai"
import { randomFloatBetween } from "./randomFloatBetween"

describe("randomFloatBetween", () => {
  it("should return a number between min and max even after many iterations", () => {
    const min = 0
    const max = 1
    const iterations = 1e3
    const results = new Array(iterations)
      .fill(0)
      .map(() => randomFloatBetween(min, max))
    const average = results.reduce((acc, curr) => acc + curr, 0) / iterations
    expect(average).to.be.greaterThan(min)
    expect(average).to.be.lessThan(max)
  })
})
