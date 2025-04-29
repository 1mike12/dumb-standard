import { expect } from "chai"
import { getDecimalSeparator } from "./getDecimalSeparator"

describe("getDecimalSeparator", () => {
  it("should get a decimal", () => {
    expect(getDecimalSeparator("en-CA")).equal(".")
  })

  it("should get a comma", () => {
    expect(getDecimalSeparator("fr-FR")).equal(",")
  })

  it("should get an arabic decimal", () => {
    expect(getDecimalSeparator("ar-SA")).equal("٫")
  })
})
