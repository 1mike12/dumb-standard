import { expect } from "chai";
import { mode } from "./mode";

describe("mode", () => {
  it("should return the mode of an array of numbers", () => {
    expect(mode([1, 2, 3])).to.deep.equal([1, 2, 3]);
  });

  it("should return the mode of an array of numbers with multiple modes", () => {
    expect(mode([1, 2, 2, 3, 3])).to.deep.equal([2, 3]);
  });

  it("should return the mode of an array of numbers with a single mode", () => {
    expect(mode([1, 2, 2, 3, 3, 3])).to.deep.equal([3]);
  });
});
