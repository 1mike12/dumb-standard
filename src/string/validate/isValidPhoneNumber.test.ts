import { isValidPhoneNumber } from "./isValidPhoneNumber"
import {expect} from "chai";

describe("isValidPhoneNumber", () => {
  it("returns true for a valid phone number", () => {
    expect(isValidPhoneNumber("+1 123-456-7890")).equal(true)
  })

  it("returns true for an empty phone number", () => {
    expect(isValidPhoneNumber("")).equal(true)
  })

  it("returns false for an invalid phone number", () => {
    expect(isValidPhoneNumber("not_a_valid_phone_number")).equal(false)
  })
})
