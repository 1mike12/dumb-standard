import { pickRandom } from "./pickRandom"
import {expect} from "chai";

describe("pickRandom", () => {
  it("should return the correct number of elements", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const result = pickRandom(array, 5)
    expect(result).lengthOf(5)
  })

  it("should throw an error if n is greater than array length", () => {
    const array = [1, 2, 3, 4, 5]
    expect(() => pickRandom(array, 10)).throws(RangeError)
  })

  it("should throw an error if n is negative", () => {
    const array = [1, 2, 3, 4, 5]
    expect(() => pickRandom(array, -1)).throws(RangeError)
  })
})
