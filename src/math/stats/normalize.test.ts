import { expect } from 'chai';
import { normalize } from './normalize';

describe('normalize', () => {
    it('should normalize values to range [0, 1]', () => {
        const data = [10, 20, 30, 40, 50];
        const result = normalize(data);

        expect(result[0]).to.equal(0);    // min value becomes 0
        expect(result[4]).to.equal(1);    // max value becomes 1
        expect(result[1]).to.equal(0.25); // (20-10)/(50-10) = 0.25
        expect(result[2]).to.equal(0.5);  // (30-10)/(50-10) = 0.5
        expect(result[3]).to.equal(0.75); // (40-10)/(50-10) = 0.75
    });

    it('should handle equally spaced values', () => {
        const data = [0, 25, 50, 75, 100];
        const result = normalize(data);

        expect(result[0]).to.equal(0);
        expect(result[1]).to.equal(0.25);
        expect(result[2]).to.equal(0.5);
        expect(result[3]).to.equal(0.75);
        expect(result[4]).to.equal(1);
    });

    it('should handle negative and positive values', () => {
        const data = [-50, -25, 0, 25, 50];
        const result = normalize(data);

        expect(result[0]).to.equal(0);
        expect(result[1]).to.equal(0.25);
        expect(result[2]).to.equal(0.5);
        expect(result[3]).to.equal(0.75);
        expect(result[4]).to.equal(1);
    });
}); 