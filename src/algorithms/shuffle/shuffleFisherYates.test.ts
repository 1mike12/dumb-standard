import {expect} from 'chai';
import {shuffleFisherYates} from "./shuffleFisherYates";

function generateOrderedArray(size: number): number[] {
   const array: number[] = [];
   for (let i = 0; i < size; i++) {
      array.push(i);
   }
   return array;
}

describe('shuffleFisherYates', () => {
   it('should shuffle the array with a given seed', () => {
      const seed = 12345;
      const shuffledArray = shuffleFisherYates(generateOrderedArray(100), seed);
      const shuffledArray2 = shuffleFisherYates(generateOrderedArray(100), seed);
      expect(shuffledArray).to.deep.equal(shuffledArray2);
   });

   it('should shuffle the array without a seed', () => {
      const array = [1, 2, 3, 4, 5];
      const shuffledArray = shuffleFisherYates(array);
      expect(shuffledArray).to.not.deep.equal([1, 2, 3, 4, 5]);
      expect(shuffledArray.sort()).to.deep.equal([1, 2, 3, 4, 5]);
   });

   it('should return an empty array when input is empty', () => {
      const array: any[] = [];
      const shuffledArray = shuffleFisherYates(array);
      expect(shuffledArray).to.deep.equal([]);
   });

   it('should return the same array when input has one element', () => {
      const array = [1];
      const shuffledArray = shuffleFisherYates(array);
      expect(shuffledArray).to.deep.equal([1]);
   });
});
