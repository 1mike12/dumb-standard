import { expect } from "chai"
import { isInInterval } from "./isInInterval"

describe("isInInterval", () => {
  it("should return true if date is within regular interval", () => {
    const date = new Date()
    date.setHours(14)
    date.setMinutes(30)
    expect(isInInterval(date, "12:00", "18:00")).to.be.true
  })

  it("should return false if date is outside regular interval", () => {
    const date = new Date()
    date.setHours(20)
    date.setMinutes(0)
    expect(isInInterval(date, "12:00", "18:00")).to.be.false
  })

  it("should handle wrap-around intervals (overnight)", () => {
    const nightDate = new Date()
    nightDate.setHours(23)
    nightDate.setMinutes(30)
    expect(isInInterval(nightDate, "22:00", "06:00")).to.be.true

    const morningDate = new Date()
    morningDate.setHours(5)
    morningDate.setMinutes(0)
    expect(isInInterval(morningDate, "22:00", "06:00")).to.be.true

    const middayDate = new Date()
    middayDate.setHours(12)
    middayDate.setMinutes(0)
    expect(isInInterval(middayDate, "22:00", "06:00")).to.be.false
  })

  it("should return false if date is at the end boundary", () => {
    const date = new Date()
    date.setHours(18)
    date.setMinutes(0)
    expect(isInInterval(date, "12:00", "18:00")).to.be.false
  })

  it("should return true if date is at the start boundary", () => {
    const date = new Date()
    date.setHours(12)
    date.setMinutes(0)
    expect(isInInterval(date, "12:00", "18:00")).to.be.true
  })

  it("should throw if start and end times are equal", () => {
    const date = new Date()
    expect(() => isInInterval(date, "12:00", "12:00")).to.throw()
  })
})
