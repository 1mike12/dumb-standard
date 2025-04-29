import { expect } from "chai"
import { isFalsy } from "./isFalsy"

describe("isFalsy", () => {
  it("should return false for 0", () => {
    expect(isFalsy(0)).to.be.false
  })

  it("should return false for empty string", () => {
    expect(isFalsy("")).to.be.false
  })

  it("should return true for null", () => {
    expect(isFalsy(null)).to.be.true
  })

  it("should return true for undefined", () => {
    expect(isFalsy(undefined)).to.be.true
  })

  it("should return true for boolean false", () => {
    expect(isFalsy(false)).to.be.true
  })

  it("should return true for NaN", () => {
    expect(isFalsy(NaN)).to.be.true
  })

  it("should return false for non-empty strings", () => {
    expect(isFalsy("test")).to.be.false
    expect(isFalsy("0")).to.be.false
  })

  it("should return false for numbers other than 0", () => {
    expect(isFalsy(1)).to.be.false
    expect(isFalsy(-1)).to.be.false
    expect(isFalsy(Infinity)).to.be.false
  })

  it("should return false for boolean true", () => {
    expect(isFalsy(true)).to.be.false
  })

  it("should return false for non-empty objects", () => {
    expect(isFalsy({})).to.be.false
    expect(isFalsy({ a: 1 })).to.be.false
  })

  it("should return false for arrays", () => {
    expect(isFalsy([])).to.be.false
    expect(isFalsy([1, 2, 3])).to.be.false
  })
})
