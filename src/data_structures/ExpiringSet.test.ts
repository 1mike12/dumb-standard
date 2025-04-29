import { expect } from "chai"
import sinon from "sinon"
import { ExpiringSet } from "./ExpiringSet"

describe("ExpiringSet", () => {
  let set: ExpiringSet<string>
  let clock: sinon.SinonFakeTimers
  const TTL = 1000

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    set = new ExpiringSet<string>(TTL)
  })

  afterEach(() => {
    clock.restore()
  })

  it("should add and check items", () => {
    set.add("test1")
    expect(set.has("test1")).to.be.true
    expect(set.has("nonexistent")).to.be.false
  })

  it("should maintain correct size", () => {
    set.add("test1")
    set.add("test2")
    expect(set.size).to.equal(2)

    set.delete("test1")
    expect(set.size).to.equal(1)
  })

  it("should expire items after TTL", () => {
    set.add("test1")
    clock.tick(TTL + 100)
    expect(set.has("test1")).to.be.false
    expect(set.size).to.equal(0)
  })

  it("should handle multiple items with different expiry times", () => {
    set.add("test1")
    clock.tick(TTL / 2)

    set.add("test2")
    expect(set.has("test1")).to.be.true
    expect(set.has("test2")).to.be.true
    expect(set.size).to.equal(2)

    clock.tick(TTL / 2 + 100)
    expect(set.has("test1")).to.be.false
    expect(set.has("test2")).to.be.true
    expect(set.size).to.equal(1)
  })

  it("should handle adding same item multiple times", () => {
    set.add("test1")
    const firstTimestamp = (set as any).items.get("test1")

    clock.tick(100)
    set.add("test1")
    const secondTimestamp = (set as any).items.get("test1")
    expect(secondTimestamp).to.be.greaterThan(firstTimestamp)
  })
})
