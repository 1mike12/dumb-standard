import { prettyRound } from "./prettyRound"
import { expect } from "chai"

it("should format", () => {
  expect(prettyRound(1.23456789, 2)).equal("1.23")
  expect(prettyRound(1.0, 2)).equal("1")
})
