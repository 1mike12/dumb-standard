import { expect } from "chai";
import sinon from "sinon";
import { waitGaussian } from "./waitGaussian";

describe("waitGaussian", () => {
    let clock: sinon.SinonFakeTimers;

    beforeEach(() => {
        // Use fake timers to control setTimeout
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        // Restore original behavior
        clock.restore();
    });

    it("should eventually resolve after waiting", async () => {
        const promise = waitGaussian(50, 0); // With std=0, should return exactly mean=50

        // Let the timer complete
        clock.tick(100); // Tick enough time to ensure resolution

        // Now the promise should resolve
        const result = await promise;
        expect(result).to.be.approximately(50, 5); // Allow for small variations
    });

    it("should return a value approximately around the mean when std=0", async () => {
        const mean = 100;

        // With std=0, we should get exactly the mean value
        const waitPromise = waitGaussian(mean, 0);
        clock.tick(mean);
        const result = await waitPromise;

        // The returned value should be very close to the mean
        expect(result).to.be.approximately(mean, 1); // Allow tiny floating point differences
    });

    it("should handle the case when delay is negative", async () => {
        // This tests the case when boxMuller might return a negative value
        // We can't force it directly without stubbing, but we'll set mean very low
        // to increase the chance of a negative value
        const promise = waitGaussian(-10, 0); // Should generate a negative value

        // Immediate resolution should happen for negative values
        clock.tick(0);
        const result = await promise;

        // The function should still return the generated value even if negative
        expect(result).to.be.approximately(-10, 1);
    });
}); 