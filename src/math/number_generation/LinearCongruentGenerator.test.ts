import {expect} from 'chai';
import {LinearCongruentGenerator} from './LinearCongruentGenerator';

describe('LCG', () => {
   it('should generate a sequence of integers', () => {
      const seed = 12345;
      const lcg = new LinearCongruentGenerator(seed);
      const firstInt = lcg.nextInt();
      const secondInt = lcg.nextInt();
      expect(firstInt).to.be.a('number');
      expect(secondInt).to.be.a('number');
      expect(firstInt).to.not.equal(secondInt);
   });

   it('should generate a sequence of floats between 0 and 1', () => {
      const lcg = new LinearCongruentGenerator(12345);
      for (let i = 0; i < 50; i++) {
         const float = lcg.nextFloat();
         expect(float).to.be.at.least(0);
         expect(float).to.be.below(1);
      }
   });

   it('should generate the same sequence with the same seed', () => {
      const seed = 12345;
      const lcg1 = new LinearCongruentGenerator(seed);
      const lcg2 = new LinearCongruentGenerator(seed);
      const sequence1: number[] = [];
      const sequence2: number[] = [];
      for (let i = 0; i < 50; i++) {
         sequence1.push(lcg1.nextInt());
         sequence2.push(lcg2.nextInt());
      }
      expect(sequence1).to.deep.equal(sequence2);
   });

   it('should generate different sequences with different seeds', () => {
      const lcg1 = new LinearCongruentGenerator(12345);
      const lcg2 = new LinearCongruentGenerator(54321);
      const sequence1: number[] = [];
      const sequence2: number[] = [];
      for (let i = 0; i < 50; i++) {
         sequence1.push(lcg1.nextInt());
         sequence2.push(lcg2.nextInt());
      }
      expect(sequence1).to.not.deep.equal(sequence2);
   });
});
