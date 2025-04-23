import {expect} from "chai";
import {runOnce} from "./runOnce";

describe("runOnce", () => {
    it("should run only once", () => {
         let count = 0;
         const func = runOnce(() => {
            count++
            return count
         });
         for (let i = 0; i < 10; i++) {
            expect(func()).to.equal(1);
         }
         expect(count).to.equal(1);
    });
});
