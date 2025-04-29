import { expect } from "chai"
import { median } from "./median"

describe("median", () => {
  it("should return the median of an array of numbers", () => {
    expect(median([1, 2, 3])).to.equal(2)
  })

  it("should return the median of an array of numbers with an even number of elements", () => {
    expect(median([1, 2, 3, 4])).to.equal(2.5)
  })
})
