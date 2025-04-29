import { expect } from "chai"
import { parseLocalFloat } from "./parseLocalFloat"

describe("parseLocalFloat", () => {
  it("should parse numbers with decimal point (en-US)", () => {
    expect(parseLocalFloat("123.45", "en-US")).to.equal(123.45)
    expect(parseLocalFloat("0.5", "en-US")).to.equal(0.5)
  })

  it("should parse numbers with comma as decimal separator (fr-FR)", () => {
    expect(parseLocalFloat("123,45", "fr-FR")).to.equal(123.45)
    expect(parseLocalFloat("0,5", "fr-FR")).to.equal(0.5)
  })

  it("should parse numbers with thousands separators (en-IN)", () => {
    expect(parseLocalFloat("1,23,456.78", "en-IN")).to.equal(123456.78)
  })

  it("should parse numbers with apostrophe as thousands separator (de-CH)", () => {
    expect(parseLocalFloat("123'456.78", "de-CH")).to.equal(123456.78)
  })

  it("should parse numbers with space as thousands separator (fr-FR)", () => {
    expect(parseLocalFloat("123 456,78", "fr-FR")).to.equal(123456.78)
  })

  it("should handle NaN cases", () => {
    expect(isNaN(parseLocalFloat("", "en-US"))).to.be.true
    expect(isNaN(parseLocalFloat(null as any, "en-US"))).to.be.true
    expect(isNaN(parseLocalFloat(undefined as any, "en-US"))).to.be.true
  })

  it("should handle invalid characters", () => {
    expect(parseLocalFloat("123a45.67", "en-US")).to.equal(12345.67)
    expect(parseLocalFloat("€123,45", "fr-FR")).to.equal(123.45)
  })
})
