import { randomIntegerBetween } from "./randomIntegerBetween"
import { expect } from "chai"

describe("randomIntegerBetween", () => {
  it("should return a number within the specified range", () => {
    const min = 1
    const max = 10
    const result = randomIntegerBetween(min, max)
    expect(result).greaterThanOrEqual(min)
    expect(result).lessThanOrEqual(max)
  })

  it("should throw an error if min is greater than max", () => {
    const min = 10
    const max = 1
    expect(() => randomIntegerBetween(min, max)).throws(RangeError)
  })
})
