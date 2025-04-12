import { rotate2DArray } from "./rotate2DArray"
import {expect} from "chai";

describe("rotate2DArray", () => {
  it("should correctly rotate a 2D array", () => {
    const arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]
    const rotated = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ]
    expect(rotate2DArray(arr)).deep.equal(rotated)
  })

  it("should handle arrays with varying row lengths", () => {
    const arr = [[1, 2, 3], [4, 5], [6]]
    const rotated = [[1, 4, 6], [2, 5], [3]]
    expect(rotate2DArray(arr)).deep.equal(rotated)
  })
})
