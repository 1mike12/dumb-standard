import { expect } from "chai";
import { formatDuration } from "./formatDuration";

describe("formatDuration", () => {
    it("should format microseconds", () => {
        expect(formatDuration(0.001, 0)).equal("1μs");
    });

    it("should format milliseconds", () => {
        expect(formatDuration(5, 0)).equal("5ms");
    });

    it("should format seconds", () => {
        expect(formatDuration(1500, 0, false)).equal("2s");
    });

    it("should format minutes", () => {
        expect(formatDuration(90000, 0, false)).equal("2m");
    });

    it("should format hours", () => {
        expect(formatDuration(7200000, 0)).equal("2h");
    });

    it("should format days", () => {
        expect(formatDuration(172800000, 0)).equal("2d");
    });

    describe("two-unit format", () => {
        it("should format seconds with milliseconds", () => {
            expect(formatDuration(1500, 0, true)).equal("1s500ms");
        });

        it("should not show second unit when remainder is zero", () => {
            expect(formatDuration(2000, 0, true)).equal("2s");
        });

        it("should format minutes with seconds", () => {
            expect(formatDuration(62000, 0, true)).equal("1m2s");
        });

        it("should format hours with minutes", () => {
            expect(formatDuration(3720000, 0, true)).equal("1h2m");
        });

        it("should format days with hours", () => {
            expect(formatDuration(93600000, 0, true)).equal("1d2h");
        });

        it("should handle edge cases around unit thresholds", () => {
            expect(formatDuration(999, 0, true)).equal("999ms");
            expect(formatDuration(1000, 0, true)).equal("1s");
            expect(formatDuration(59999, 0, true)).equal("59s999ms");
            expect(formatDuration(60000, 0, true)).equal("1m");
        });
    });
});
