import { expect } from "chai";
import { createArrayLooper } from "./createArrayLooper";

describe('createArrayLooper', () => {
    it('should return items in sequence', () => {
        const items = [1, 2, 3];
        const next = createArrayLooper(items);

        expect(next()).to.equal(1);
        expect(next()).to.equal(2);
        expect(next()).to.equal(3);
        expect(next()).to.equal(1); // loops back to beginning
        expect(next()).to.equal(2);
    });

    it('should handle empty arrays', () => {
        const items: number[] = [];
        const next = createArrayLooper(items);

        expect(next()).to.be.undefined;
    });

    it('should handle single-item arrays', () => {
        const items = ['test'];
        const next = createArrayLooper(items);

        expect(next()).to.equal('test');
        expect(next()).to.equal('test'); // keeps returning the same item
        expect(next()).to.equal('test');
    });

    it('should start at random index when randomStart is true', () => {
        // We can't test randomness directly, but we can verify it doesn't always start at the first item
        const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let differentStartFound = false;

        // Try multiple times to account for randomness
        for (let i = 0; i < 20; i++) {
            const next = createArrayLooper(items, true);
            const firstValue = next();

            if (firstValue !== 1) {
                differentStartFound = true;
                break;
            }
        }

        expect(differentStartFound).to.be.true;
    });

    it('should loop through all items regardless of starting point', () => {
        const items = ['a', 'b', 'c', 'd'];
        const next = createArrayLooper(items, true);

        // Get the first value (which might be random)
        const firstValue = next();
        const seen = new Set([firstValue]);

        // Call enough times to see all values multiple times
        for (let i = 0; i < 12; i++) {
            seen.add(next());
        }

        // Should have seen all items
        expect(seen.size).to.equal(items.length);
    });

    it('should handle complex object types', () => {
        const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const next = createArrayLooper(items);

        expect(next()).to.deep.equal({ id: 1 });
        expect(next()).to.deep.equal({ id: 2 });
        expect(next()).to.deep.equal({ id: 3 });
        expect(next()).to.deep.equal({ id: 1 });
    });

    it('should not grow the index indefinitely', () => {
        const items = [1, 2, 3];
        const next = createArrayLooper(items);

        // First call to initialize the index
        next();

        // Call next multiple times
        for (let i = 0; i < 100; i++) {
            next();
        }

        // After 100 calls, index should still be within bounds of the array
        expect(next.getIndex()).to.be.lessThan(items.length);

        // The key is that after many iterations, the index is still within array bounds
        const currentIndex = next.getIndex();
        expect(currentIndex >= 0 && currentIndex < items.length).to.be.true;

        // Verify that next() correctly increments index and wraps around
        const expectedNextIndex = (currentIndex + 1) % items.length;
        next();
        expect(next.getIndex()).to.equal(expectedNextIndex);
    });
});
