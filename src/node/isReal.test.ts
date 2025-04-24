import { expect } from "chai";
import { isReal } from "./isReal";

describe("isReal", () => {
    it("should return true for 0", () => {
        expect(isReal(0)).to.be.true;
    });

    it("should return true for non-empty objects", () => {
        expect(isReal({})).to.be.true;
        expect(isReal({ a: 1 })).to.be.true;
    });

    it("should return true for non-empty strings", () => {
        expect(isReal("test")).to.be.true;
        expect(isReal("0")).to.be.true;
    });

    it("should return true for non-empty arrays", () => {
        expect(isReal([1, 2, 3])).to.be.true;
    });

    it("should return true for boolean true", () => {
        expect(isReal(true)).to.be.true;
    });

    it("should return true for numbers other than 0", () => {
        expect(isReal(1)).to.be.true;
        expect(isReal(-1)).to.be.true;
        expect(isReal(Infinity)).to.be.true;
    });

    it("should return false for null", () => {
        expect(isReal(null)).to.be.false;
    });

    it("should return false for undefined", () => {
        expect(isReal(undefined)).to.be.false;
    });

    it("should return false for empty string", () => {
        expect(isReal("")).to.be.false;
    });

    it("should return false for empty array", () => {
        expect(isReal([])).to.be.false;
    });

    it("should return false for NaN", () => {
        expect(isReal(NaN)).to.be.false;
    });

    it("should return false for boolean false", () => {
        expect(isReal(false)).to.be.false;
    });
}); 