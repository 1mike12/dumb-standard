import { isValidUUIDv4 } from "./isValidUUIDv4"
import {expect} from "chai";

describe("isValidUUID", () => {
  it("should return true for valid UUIDs", () => {
    expect(isValidUUIDv4("ca50c376-0f02-4c2d-ac56-10e976339336")).equals(true)
    expect(isValidUUIDv4("611f3056-165f-40af-ae9d-040703d7f457")).equals(true)
  })

  it("should return false for invalid UUIDs", () => {
    expect(isValidUUIDv4(null)).equals(false)
    expect(isValidUUIDv4(undefined)).equals(false)
    expect(isValidUUIDv4("")).equals(false)
    expect(isValidUUIDv4("123")).equals(false)
    expect(isValidUUIDv4("123e4567-e89b-12d3-a456-4266")).equals(false)
    //uuid v1
    expect(isValidUUIDv4("123e4567-e89b-12d3-a456-4266141740000")).equals(false)
    expect(isValidUUIDv4("123e4567-e89b-12d3-a456-42661417400")).equals(false)
    expect(isValidUUIDv4("not-a-uuid")).equals(false)
  })

  it("should return false for non-string", () => {
    expect(isValidUUIDv4(123)).equals(false)
    expect(isValidUUIDv4(true)).equals(false)
    expect(isValidUUIDv4([])).equals(false)
    expect(isValidUUIDv4({})).equals(false)
    expect(isValidUUIDv4(() => {})).equals(false)
  })

  it("should return true for simplest v4 uuid", () => {
    expect(isValidUUIDv4("00000000-0000-4000-8000-000000000000")).equals(true)
  })
})
