import { expect } from "chai"
import { promiseOnce } from "./promiseOnce"

describe("promiseOnce", () => {
  it("should execute the function only once when called multiple times in parallel", async () => {
    let callCount = 0

    const asyncFn = async (): Promise<number> => {
      callCount++
      await new Promise((resolve) => setTimeout(resolve, 2))
      return callCount
    }

    const onceFn = promiseOnce(asyncFn)

    // Call the function multiple times in parallel
    const results = await Promise.all([onceFn(), onceFn(), onceFn()])

    // All calls should have the same result
    expect(results).to.deep.equal([1, 1, 1])
    // The function should only have been called once
    expect(callCount).to.equal(1)
  })

  it("Should give the same value when called repeatedly", async () => {
    let callCount = 0

    const onceFn = promiseOnce(async (): Promise<number> => {
      callCount++
      await new Promise((resolve) => setTimeout(resolve, 0))
      return callCount
    })

    const results1 = await onceFn()
    const results2 = await onceFn()
    const results3 = await onceFn()

    expect(results1).to.equal(1)
    expect(results2).to.equal(1)
    expect(results3).to.equal(1)
  })

  it("should allow a new execution after the first one completes", async () => {
    let callCount = 0

    const asyncFn = async (): Promise<number> => {
      callCount++
      await new Promise((resolve) => setTimeout(resolve, 2))
      return callCount
    }

    const onceFn = promiseOnce(asyncFn)

    // First batch of calls
    const results1 = await Promise.all([onceFn(), onceFn()])

    // Wait for the promise to complete
    await new Promise((resolve) => setTimeout(resolve, 10))

    // Second call after the first batch completes
    const result2 = await onceFn()

    expect(results1).to.deep.equal([1, 1])
    expect(result2).to.equal(1) // Should reuse the cached result
    expect(callCount).to.equal(1) // The function should still only have been called once
  })

  it("should propagate errors to all callers", async () => {
    const error = new Error("Test error")
    let callCount = 0

    const asyncFn = async (): Promise<number> => {
      callCount++
      await new Promise((resolve) => setTimeout(resolve, 2))
      throw error
    }

    const onceFn = promiseOnce(asyncFn)

    // Call multiple times
    const promises = [
      onceFn().catch((e) => e),
      onceFn().catch((e) => e),
      onceFn().catch((e) => e),
    ]

    const errors = await Promise.all(promises)

    // All callers should receive the same error
    expect(errors[0]).to.equal(error)
    expect(errors[1]).to.equal(error)
    expect(errors[2]).to.equal(error)

    // Function should only be called once
    expect(callCount).to.equal(1)

    // Should be able to call again after error
    callCount = 0
    const onceFn2 = promiseOnce(asyncFn)
    const err = await onceFn2().catch((e) => e)
    expect(err).to.equal(error)
    expect(callCount).to.equal(1)
  })
})
