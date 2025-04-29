import { expect } from "chai"
import { getISODateDelta } from "./getISODateDelta"

describe("getISODateDelta", () => {
  it("should calculate positive time difference between two dates", () => {
    const start = "2023-01-01T00:00:00Z"
    const end = "2023-01-01T01:00:00Z"
    const result = getISODateDelta(start, end)

    // 1 hour = 3600000 milliseconds
    expect(result).to.equal(3600000)
  })

  it("should calculate negative time difference when end date is earlier", () => {
    const start = "2023-01-01T01:00:00Z"
    const end = "2023-01-01T00:00:00Z"
    const result = getISODateDelta(start, end)

    // -1 hour = -3600000 milliseconds
    expect(result).to.equal(-3600000)
  })

  it("should return zero when dates are identical", () => {
    const date = "2023-01-01T00:00:00Z"
    const result = getISODateDelta(date, date)

    expect(result).to.equal(0)
  })

  it("should handle date strings in different formats", () => {
    const start = "2023-01-01"
    const end = "2023-01-02"
    const result = getISODateDelta(start, end)

    // 24 hours = 86400000 milliseconds
    expect(result).to.equal(86400000)
  })
})
