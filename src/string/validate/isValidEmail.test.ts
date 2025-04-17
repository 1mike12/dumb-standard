import {isValidEmail} from "./isValidEmail"
import {expect} from "chai";

describe("isValidEmail", () => {
   it("returns true for a valid email address", () => {
      expect(isValidEmail("test@example.com")).equal(true)
      expect(isValidEmail("qe2a5e@gmail.co")).equal(true)
   })

   it("returns false for an invalid email address", () => {
      expect(isValidEmail("not_a_valid_email")).equal(false)
   })

   it("returns false for an empty email address", () => {
      expect(isValidEmail("")).equal(false)
   })
})
