import { expect } from 'chai';
import { skewness } from './skewness';

describe('skewness', () => {
    it('should calculate the skewness correctly for a symmetric distribution', () => {
        const data = [1, 2, 3, 3, 3, 4, 5]; // Symmetric around 3
        const result = skewness(data);
        expect(result).to.be.closeTo(0, 0.0001); // Symmetric distributions have skewness close to 0
    });

    it('should calculate the skewness correctly for a right-skewed distribution', () => {
        const data = [1, 2, 2, 3, 3, 3, 10]; // Skewed to the right
        const result = skewness(data);
        expect(result).to.be.closeTo(1.77, 0.01); // Use the actual value from the implementation
    });
}); 