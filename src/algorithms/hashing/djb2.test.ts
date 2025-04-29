import { djb2 } from "./djb2"
import { expect } from "chai"

describe("djb2", () => {
  it("should return different hashes for different strings", () => {
    expect(djb2("abc")).not.equal(djb2("abcd"))
  })

  it("should return the same hash for the same string", () => {
    expect(djb2("abc")).equal(djb2("abc"))
  })
})
