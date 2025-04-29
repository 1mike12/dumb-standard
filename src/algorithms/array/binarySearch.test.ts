import { binarySearch } from "./binarySearch"
import { expect } from "chai"

describe("binarySearch", () => {
  it("finds the correct index of an element in the array", () => {
    const arr = [1, 3, 5, 7, 9]
    expect(binarySearch(arr, 3)).equal(1)
  })

  it("returns the correct index where the element should be if it is not present in the array", () => {
    const arr = [1, 3, 5, 7, 9]
    expect(binarySearch(arr, 4)).equal(2) // 4 should be placed at index 2
  })

  it("returns 0 for an element smaller than all elements in the array", () => {
    const arr = [10, 20, 30, 40, 50]
    expect(binarySearch(arr, 5)).equal(0)
  })

  it("returns the length of the array for an element larger than all elements in the array", () => {
    const arr = [10, 20, 30, 40, 50]
    expect(binarySearch(arr, 60)).equal(arr.length)
  })

  it("returns 0 for an empty array", () => {
    const arr = []
    expect(binarySearch(arr, 10)).equal(0)
  })

  it("handles arrays with a single element correctly", () => {
    const arr = [5]
    expect(binarySearch(arr, 5)).equal(0)
    expect(binarySearch(arr, 3)).equal(0)
    expect(binarySearch(arr, 8)).equal(1)
  })

  it("works correctly with a custom comparator", () => {
    const arr = ["a", "c", "e", "g"]
    const comparator = (a, b) => a.localeCompare(b)
    expect(binarySearch(arr, "c", comparator)).equal(1)
    expect(binarySearch(arr, "b", comparator)).equal(1) // 'b' should be placed at index 1
  })
})
