import { normallyDistributedFloat } from "./normallyDistributedFloat"
import { shapiroWilk } from "./shapiroWilk"
import { expect } from "chai"

describe("generateNormalDistribution", function () {
  it("should generate a number within the specified range", function () {
    const min = 0
    const max = 100

    const generatedNumber = normallyDistributedFloat(min, max)
    expect(generatedNumber).greaterThanOrEqual(min)
    expect(generatedNumber).lessThanOrEqual(max)
  })

  it("should not generate a bad number even if repeated many times", function () {
    const min = 0
    const max = 100
    const count = 1000
    const data: number[] = []
    for (let i = 0; i < count; i++) {
      const generatedNumber = normallyDistributedFloat(min, max)
      data.push(generatedNumber)
    }
    const w = shapiroWilk(data)
    const criticalValue = 0.9

    expect(w).greaterThanOrEqual(criticalValue)
  })

  it("should return different numbers for multiple calls", function () {
    const min = 0
    const max = 100

    const generatedNumber1 = normallyDistributedFloat(min, max)
    const generatedNumber2 = normallyDistributedFloat(min, max)
    expect(generatedNumber1).not.equal(generatedNumber2)
  })
})
