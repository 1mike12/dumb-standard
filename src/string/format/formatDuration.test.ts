import {expect} from "chai";
import {formatDuration} from "./formatDuration";

describe("formatDuration", () => {
    it("should format us", () => {
        expect(formatDuration(.001,.002, 0)).equal("1μs")
    });

    it('should be very small diffeernece', ()=> {
       const start = performance.now()
       const end = performance.now()
       expect(formatDuration(start, end, 0)).contain("μs")
    })
});
