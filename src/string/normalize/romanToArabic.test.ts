import { expect } from "chai"
import { replaceRomanWithArabic } from "./romanToArabic"

describe("romanToArabic", () => {
  it("should replace ending roman numerals with arabic numerals", () => {
    expect(replaceRomanWithArabic("Reef IV")).to.equal("Reef 4")
    expect(replaceRomanWithArabic("Reef VIII")).to.equal("Reef 8")
  })

  it("shouldn't replace roman numerals touching other characters", () => {
    expect(replaceRomanWithArabic("CENTAURII")).to.equal("CENTAURII")
    expect(replaceRomanWithArabic("CIV")).to.equal("CIV")
  })

  it("shouldn't replace roman numerals not in the end of the string", () => {
    expect(replaceRomanWithArabic("IV Reef")).to.equal("IV Reef")
    expect(replaceRomanWithArabic("VIII Reef")).to.equal("VIII Reef")
  })
})
