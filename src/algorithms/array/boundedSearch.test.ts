import { expect } from 'chai';
import {lowerBoundSearch, upperBoundSearch} from "./boundedSearch";

describe('lowerBoundSearch', () => {
  const compareNumbers = (a: number, b: number) => a - b;

  it('returns 0 for an empty array', () => {
    const arr: number[] = [];
    const idx = lowerBoundSearch(arr, 5, compareNumbers);
    expect(idx).to.equal(0);
  });

  it('returns length when all elements are < target', () => {
    const arr = [1, 2, 3];
    const idx = lowerBoundSearch(arr, 5, compareNumbers);
    expect(idx).to.equal(arr.length);
  });

  it('returns 0 when first element ≥ target', () => {
    const arr = [3, 4, 5];
    const idx = lowerBoundSearch(arr, 2, compareNumbers);
    expect(idx).to.equal(0);
  });

  it('finds the first index of a matching element', () => {
    const arr = [1, 2, 2, 2, 3, 4];
    const idx = lowerBoundSearch(arr, 2, compareNumbers);
    expect(idx).to.equal(1);
  });

  it('returns index of first element ≥ target when no exact match', () => {
    const arr = [1, 3, 5, 7];
    const idx = lowerBoundSearch(arr, 4, compareNumbers);
    // 5 is the first element ≥ 4, at index 2
    expect(idx).to.equal(2);
  });

  it('works when target equals the largest element', () => {
    const arr = [1, 2, 3, 5];
    const idx = lowerBoundSearch(arr, 5, compareNumbers);
    expect(idx).to.equal(3);
  });
});

describe('upperBoundSearch', () => {
  const compareNumbers = (a: number, b: number) => a - b;

  it('returns 0 for an empty array', () => {
    const arr: number[] = [];
    const idx = upperBoundSearch(arr, 10, compareNumbers);
    expect(idx).to.equal(0);
  });

  it('returns length when all elements ≤ target', () => {
    const arr = [1, 2, 3];
    const idx = upperBoundSearch(arr, 3, compareNumbers);
    expect(idx).to.equal(arr.length);
  });

  it('returns 0 when first element > target', () => {
    const arr = [5, 6, 7];
    const idx = upperBoundSearch(arr, 2, compareNumbers);
    expect(idx).to.equal(0);
  });

  it('finds the first index of element > target when there are duplicates', () => {
    const arr = [1, 2, 2, 2, 3, 4];
    const idx = upperBoundSearch(arr, 2, compareNumbers);
    // The first element strictly > 2 is 3 at index 4
    expect(idx).to.equal(4);
  });

  it('returns index of first element > target when no exact match', () => {
    const arr = [1, 3, 5, 7];
    const idx = upperBoundSearch(arr, 4, compareNumbers);
    // 5 is the first element > 4, at index 2
    expect(idx).to.equal(2);
  });

  it('works when target is less than all elements', () => {
    const arr = [10, 20, 30];
    const idx = upperBoundSearch(arr, 5, compareNumbers);
    expect(idx).to.equal(0);
  });

  it('works when target is equal to the largest element', () => {
    const arr = [1, 2, 3, 4, 5];
    const idx = upperBoundSearch(arr, 5, compareNumbers);
    expect(idx).to.equal(arr.length);
  });
});
