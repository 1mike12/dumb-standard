import { expect } from "chai"
import { isValidTimeZone } from "./isValidTimeZone"

describe("isValidTimeZone", () => {
  it("should return true", () => {
    expect(isValidTimeZone("America/New_York")).equal(true)
  })

  it("should return false", () => {
    expect(isValidTimeZone("not/real")).false
  })
})
