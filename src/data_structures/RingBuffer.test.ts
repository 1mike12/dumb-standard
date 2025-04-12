import {expect} from 'chai';
import {RingBuffer} from "./RingBuffer";

describe('CircularLog', () => {

    it('should initialize empty', () => {
        const log = new RingBuffer<string>(3);
        expect(log.size).to.equal(0);
        expect(log.getAll()).to.deep.equal([]);
    });

    it("should not infintely increase the index when adding lots of stuff", ()=> {
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
