import { expect } from "chai"
import { parseTime, TimeUnit } from "./parseTime"

describe("parseTime", () => {
  describe("HH:mm format", () => {
    it("should parse midnight in seconds", () => {
      expect(parseTime("00:00")).equals(0)
    })

    it("should parse midnight in minutes", () => {
      expect(parseTime("00:00", TimeUnit.MINUTES)).equals(0)
    })

    it("should parse one minute past midnight", () => {
      expect(parseTime("00:01")).equals(60) // 60 seconds
      expect(parseTime("00:01", TimeUnit.MINUTES)).equals(1) // 1 minute
    })

    it("should parse one hour past midnight", () => {
      expect(parseTime("01:00")).equals(3600) // 3600 seconds
      expect(parseTime("01:00", TimeUnit.MINUTES)).equals(60) // 60 minutes
    })

    it("should parse noon", () => {
      expect(parseTime("12:00")).equals(12 * 3600) // 43200 seconds
      expect(parseTime("12:00", TimeUnit.MINUTES)).equals(12 * 60) // 720 minutes
    })

    it("should parse 23:59", () => {
      expect(parseTime("23:59")).equals(23 * 3600 + 59 * 60) // 86340 seconds
      expect(parseTime("23:59", TimeUnit.MINUTES)).equals(23 * 60 + 59) // 1439 minutes
    })
  })

  describe("HH:mm:ss format", () => {
    it("should parse midnight with seconds in seconds", () => {
      expect(parseTime("00:00:00")).equals(0)
    })

    it("should parse midnight with seconds in minutes", () => {
      expect(parseTime("00:00:00", TimeUnit.MINUTES)).equals(0)
    })

    it("should parse one second past midnight", () => {
      expect(parseTime("00:00:01")).equals(1) // 1 second
      expect(parseTime("00:00:01", TimeUnit.MINUTES)).equals(1 / 60) // 1/60 minute
    })

    it("should parse complex time", () => {
      expect(parseTime("12:34:56")).equals(12 * 3600 + 34 * 60 + 56) // 45296 seconds
      expect(parseTime("12:34:56", TimeUnit.MINUTES)).equals(
        12 * 60 + 34 + 56 / 60
      ) // 754.9333... minutes
    })
  })

  describe("error handling", () => {
    it("should throw on invalid format", () => {
      expect(() => parseTime("invalid")).to.throw()
      expect(() => parseTime("24:00")).to.throw()
      expect(() => parseTime("12:60")).to.throw()
      expect(() => parseTime("12:34:60")).to.throw()
    })
  })
})
