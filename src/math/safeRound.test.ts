import { expect } from "chai"
import { safeRound } from "./safeRound"

describe("safeRound", () => {
  it("should round numbers to specified decimal places", () => {
    expect(safeRound(3.14159, 2)).to.equal(3.14)
    expect(safeRound(3.14159, 3)).to.equal(3.142)
    expect(safeRound(3.14159, 4)).to.equal(3.1416)
    expect(safeRound(3.14159, 0)).to.equal(3)
  })

  it("should handle floating-point issues correctly", () => {
    // Common floating point issues
    expect(safeRound(0.1 + 0.2, 1)).to.equal(0.3)
    expect(safeRound(1.005, 2)).to.equal(1.01)
    expect(safeRound(2.675, 2)).to.equal(2.68)
  })

  it("should handle negative numbers", () => {
    expect(safeRound(-1.234, 2)).to.equal(-1.23)
    expect(safeRound(-1.235, 2)).to.equal(-1.24)
    expect(safeRound(-1.005, 2)).to.equal(-1.01)
  })

  it("should handle edge cases", () => {
    // Zero
    expect(safeRound(0, 2)).to.equal(0)

    // Large numbers
    expect(safeRound(123456789.123456789, 2)).to.equal(123456789.12)

    // Very small decimals
    expect(safeRound(0.000000001, 8)).to.equal(0)
    expect(safeRound(0.000000001, 9)).to.equal(0.000000001)

    // Numbers that are already rounded
    expect(safeRound(5.5, 0)).to.equal(6)
    expect(safeRound(5.4, 0)).to.equal(5)
  })
})
