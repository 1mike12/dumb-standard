import { expect } from "chai";
import { mean } from "./mean";

describe('mean', () => {
   it('should return the mean of an array of numbers', () => {
      expect(mean([1, 2, 3])).to.equal(2);
   });
});

