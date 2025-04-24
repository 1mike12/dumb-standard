import { expect } from 'chai';
import sinon from "sinon"
import { ExpiringArray } from "./ExpiringArray";

describe('ExpiringArray', () => {
   let clock: sinon.SinonFakeTimers;

   beforeEach(() => {
      // Use sinon fake timers to control Date.now()
      clock = sinon.useFakeTimers();
   });

   afterEach(() => {
      // Restore the timer after each test
      clock.restore();
   });

   describe('constructor', () => {
      it('should create an empty array with specified window', () => {
         const arr = new ExpiringArray<number>(1000);
         expect(arr.length).to.equal(0);
         expect(arr.toArray()).to.deep.equal([]);
      });
   });

   describe('push', () => {
      it('should add items with timestamps', () => {
         const arr = new ExpiringArray<string>(5000);
         const now = Date.now();

         arr.push('item1');
         expect(arr.length).to.equal(1);

         const items = arr.toArray();
         expect(items.length).to.equal(1);
         expect(items[0]).to.equal('item1');
      });

      it('should evict expired items when pushing new ones', () => {
         const arr = new ExpiringArray<string>(1000);

         // Add first item at t=0
         arr.push('item1');
         expect(arr.length).to.equal(1);

         // Move time forward 500ms and add another item
         clock.tick(500);
         arr.push('item2');
         expect(arr.length).to.equal(2);

         // Move time forward 600ms (item1 should expire) and add item3
         clock.tick(600);
         arr.push('item3');

         // item1 should be evicted (older than 1000ms), item2 and item3 remain
         expect(arr.length).to.equal(2);

         const items = arr.toArray();
         expect(items.length).to.equal(2);
         expect(items[0]).to.equal('item2');
         expect(items[1]).to.equal('item3');
      });
   });

   describe("clear", () => {
      it("should clear the array", () => {
         const arr = new ExpiringArray<number>(1000);
         arr.push(1);
         arr.clear();
         expect(arr.length).to.equal(0);
      });
   });

   describe('iterator', () => {
      it('should iterate over all items in chronological order', () => {
         const arr = new ExpiringArray<number>(2000);

         arr.push(1);
         clock.tick(100);
         arr.push(2);
         clock.tick(100);
         arr.push(3);

         const values: number[] = [];
         for (const value of arr) {
            values.push(value);
         }

         expect(values).to.deep.equal([1, 2, 3]);
      });

      it('should evict expired items before iteration', () => {
         const arr = new ExpiringArray<number>(1000);

         arr.push(1);
         clock.tick(500);
         arr.push(2);
         clock.tick(600); // item1 should now be expired (1100ms old)
         arr.push(3);

         // Move forward so item2 is also expired
         clock.tick(500); // item2 is now 1100ms old

         const values: number[] = [];
         for (const value of arr) {
            values.push(value);
         }

         // Only item3 should remain
         expect(values).to.deep.equal([3]);
      });
   });

   describe('toArray', () => {
      it('should return a copy of the internal array', () => {
         const arr = new ExpiringArray<string>(1000);

         arr.push('item1');
         arr.push('item2');

         const copy = arr.toArray();
         expect(copy.length).to.equal(2);

         copy.push('item3');
         expect(arr.length).to.equal(2);
      });
   });

   describe('length', () => {
      it('should return the current number of items', () => {
         const arr = new ExpiringArray<number>(1000);

         expect(arr.length).to.equal(0);

         arr.push(1);
         expect(arr.length).to.equal(1);

         arr.push(2);
         expect(arr.length).to.equal(2);

         // Move time forward to expire the first item
         clock.tick(1100);
         expect(arr.length).to.equal(0);
      });
   });

   describe("arrayLikeMethods", () => {
      it("should be able to iterate over the array", () => {
         const arr = new ExpiringArray<number>(1000);
         arr.push(1);
         arr.push(2);
         const result: number[] = [];
         for (const value of arr) {
            result.push(value);
         }
         expect(result).to.deep.equal([1, 2]);
      });

      it("should be able to iterate over the array with forEach", () => {
         const arr = new ExpiringArray<number>(1000);
         arr.push(1);
         arr.push(2);
         const result: number[] = [];
         arr.forEach((value, index, timestamp) => {
            result.push(value);
         });
         expect(result).to.deep.equal([1, 2]);
      });

      it("should be able to iterate over the array with map", () => {
         const arr = new ExpiringArray<number>(1000);
         arr.push(1);
         arr.push(2);
         const result: number[] = [];
         arr.map((value, index, timestamp) => {
            result.push(value);
         });
         expect(result).to.deep.equal([1, 2]);
      });

      it("should be able to iterate over the array with filter", () => {
         const arr = new ExpiringArray<number>(1000);
         arr.push(1);
         arr.push(2);
         const result = arr.filter((value, index, timestamp) => {
            return value > 1;
         });
         expect(result).to.deep.equal([2]);
      });
   });

   describe("find", () => {
      it("should find an item in the array", () => {
         const arr = new ExpiringArray<number>(1000);
         arr.push(1);
         arr.push(2);
         const result = arr.find((value, index, timestamp) => {
            return value === 2;
         });
         expect(result).to.equal(2);
      });
   });

   describe("findIndex", () => {
      it("should find the index of an item in the array", () => {
         const arr = new ExpiringArray<number>(1000);
         arr.push(1);
         arr.push(2);
         const result = arr.findIndex((value, index, timestamp) => {
            return value === 2;
         });
         expect(result).to.equal(1);
      });
   });

});