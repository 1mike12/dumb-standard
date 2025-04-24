import { expect } from "chai";
import { randomBoolean } from "./randomBoolean";

describe("randomBoolean", () => {
  it("should return true or false", () => {
    const result = randomBoolean();
    expect(result).to.be.oneOf([true, false]);
  });

  it("should return a fairly even distribution of true and false", () => {
    const iterations = 1e4;
    const results = new Array(iterations).fill(0).map(() => randomBoolean());
    const trueCount = results.filter(result => result).length;
    const falseCount = results.filter(result => !result).length;
    const percentTrue = trueCount / iterations;
    const percentFalse = falseCount / iterations;
    expect(percentTrue).to.be.closeTo(0.5, 0.2);
    expect(percentFalse).to.be.closeTo(0.5, 0.2);
  });
});
