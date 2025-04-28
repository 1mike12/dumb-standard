import { expect } from 'chai';
import { RingBuffer } from "./RingBuffer";

describe('CircularLog', () => {

    it('should initialize empty', () => {
        const log = new RingBuffer<string>(3);
        expect(log.size).to.equal(0);
        expect(log.getAll()).to.deep.equal([]);
    });

    it("should not infintely increase the index when adding lots of stuff", () => {
        const log = new RingBuffer<number>(1);
        for (let i = 0; i < 100; i++) {
            log.push(i);
        }
        expect(log.currentIndex).lessThan(10);
    })

    it('should maintain order when not full', () => {
        const log = new RingBuffer<string>(3);
        log.push('A');
        log.push('B');
        log.push('C');
        expect(log.getAll()).to.deep.equal(['A', 'B', 'C']);
    });

    it('should overwrite oldest items when full', () => {
        const log = new RingBuffer<string>(3);
        log.push('A');
        log.push('B');
        log.push('C');
        log.push('D');
        expect(log.size).to.equal(3);
        expect(log.getAll()).to.deep.equal(['B', 'C', 'D']);
    });

    it('should handle multiple overwrites', () => {
        const log = new RingBuffer<string>(3);
        log.push('A');
        log.push('B');
        log.push('C');
        log.push('D');
        log.push('E');
        expect(log.getAll()).to.deep.equal(['C', 'D', 'E']);
    });

    it('should work with different data types', () => {
        const numLog = new RingBuffer<number>(2);
        numLog.push(1);
        numLog.push(2);
        numLog.push(3);
        expect(numLog.getAll()).to.deep.equal([2, 3]);
    });

    it("should return less elements if not at capacity", () => {
        const log = new RingBuffer<string>(3);
        log.push('A');
        expect(log.getAll()).to.deep.equal(['A']);
    })
});

describe('RingBuffer', () => {
    describe('reverse()', () => {
        it('should iterate empty buffer correctly', () => {
            const buffer = new RingBuffer<number>(5);
            const result = [...buffer.reverse()];
            expect(result).to.deep.equal([]);
        });

        it('should iterate partially filled buffer in reverse', () => {
            const buffer = new RingBuffer<number>(5);
            buffer.push(1);
            buffer.push(2);
            buffer.push(3);

            const result = [...buffer.reverse()];
            expect(result).to.deep.equal([3, 2, 1]);
        });

        it('should iterate fully filled buffer in reverse', () => {
            const buffer = new RingBuffer<number>(3);
            buffer.push(1);
            buffer.push(2);
            buffer.push(3);

            const result = [...buffer.reverse()];
            expect(result).to.deep.equal([3, 2, 1]);
        });

        it('should iterate wrapped buffer in reverse', () => {
            const buffer = new RingBuffer<number>(3);
            buffer.push(1);
            buffer.push(2);
            buffer.push(3);
            buffer.push(4);
            buffer.push(5);

            // After pushing [1,2,3,4,5] into a buffer of size 3:
            // The buffer should contain [4,5,3] with currentIndex at 2
            // When iterating in reverse order, it should return [2,1,0] indices
            // which correspond to [3,5,4] in the buffer
            const result = [...buffer.reverse()];
            expect(result).to.deep.equal([5, 4, 3]);
        });
    });

    describe('forEachReverse()', () => {
        it('should iterate empty buffer correctly', () => {
            const buffer = new RingBuffer<number>(5);
            const result: number[] = [];
            const indices: number[] = [];

            buffer.forEachReverse((item, index) => {
                result.push(item);
                indices.push(index);
            });

            expect(result).to.deep.equal([]);
            expect(indices).to.deep.equal([]);
        });

        it('should iterate partially filled buffer in reverse with index', () => {
            const buffer = new RingBuffer<number>(5);
            buffer.push(1);
            buffer.push(2);
            buffer.push(3);

            const result: number[] = [];
            const indices: number[] = [];

            buffer.forEachReverse((item, index) => {
                result.push(item);
                indices.push(index);
            });

            expect(result).to.deep.equal([3, 2, 1]);
            expect(indices).to.deep.equal([0, 1, 2]);
        });

        it('should iterate fully filled buffer in reverse with index', () => {
            const buffer = new RingBuffer<number>(3);
            buffer.push(1);
            buffer.push(2);
            buffer.push(3);

            const result: number[] = [];
            const indices: number[] = [];

            buffer.forEachReverse((item, index) => {
                result.push(item);
                indices.push(index);
            });

            expect(result).to.deep.equal([3, 2, 1]);
            expect(indices).to.deep.equal([0, 1, 2]);
        });

        it('should iterate wrapped buffer in reverse with index', () => {
            const buffer = new RingBuffer<number>(3);
            buffer.push(1);
            buffer.push(2);
            buffer.push(3);
            buffer.push(4);
            buffer.push(5);

            // After pushing [1,2,3,4,5] into a buffer of size 3:
            // The buffer should contain [4,5,3] with currentIndex at 2
            // When iterating in reverse order, it should return [5,4,3]
            const result: number[] = [];
            const indices: number[] = [];

            buffer.forEachReverse((item, index) => {
                result.push(item);
                indices.push(index);
            });

            expect(result).to.deep.equal([5, 4, 3]);
            expect(indices).to.deep.equal([0, 1, 2]);
        });
    });
});
