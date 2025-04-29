import { formatLocalFloat } from "./formatLocalFloat"
import { expect } from "chai"

describe("localizeFloat", () => {
  it("should respect the precision", () => {
    expect(formatLocalFloat(123456.789, "en-US", 2)).equal("123456.79")
    expect(formatLocalFloat(123456.789, "en-US", 0)).equal("123457")
  })

  it("should respect the locale", () => {
    expect(formatLocalFloat(123456.789, "en-US", 2)).equal("123456.79")
    expect(formatLocalFloat(123456.789, "fr-FR", 2)).equal("123456,79")
  })

  it("should not show any trailing zeros", () => {
    expect(formatLocalFloat(123456.00001, "en-US", 2)).equal("123456")
  })

  it("should respect not showing any trailing zeros", () => {
    expect(formatLocalFloat(123456.00001, "en-US", 2)).equal("123456")
  })
})
