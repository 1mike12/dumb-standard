import { expect } from "chai";
import { mode } from "./mode";

describe("mode", () => {
  it("should return the mode of an array of numbers", () => {
    expect(mode([1, 2, 3])).to.equal([1]);
  });

  it("should return the mode of an array of numbers with multiple modes", () => {
    expect(mode([1, 2, 2, 3, 3])).to.equal([2, 3]);
  });

  it("should return the mode of an array of numbers with a single mode", () => {
    expect(mode([1, 2, 2, 3, 3, 3])).to.equal([3]);
  });
});
