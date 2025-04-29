import { generateWebsocketKey } from "./generateWebsocketKey"
import { expect } from "chai"

describe("generateWebsocketKey", () => {
  it("should generate a key of fixed length", () => {
    expect(generateWebsocketKey()).to.have.lengthOf(24)
  })
})
