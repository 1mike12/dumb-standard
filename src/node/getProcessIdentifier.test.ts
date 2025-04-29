import { expect } from "chai"
import { getProcessIdentifier } from "./getProcessIdentifier"

describe("getProcessIdentifier", () => {
  it("should return something", () => {
    const id = getProcessIdentifier()
    expect(id).to.be.a("string")
    expect(id.length).to.be.greaterThan(0)
  })
})
