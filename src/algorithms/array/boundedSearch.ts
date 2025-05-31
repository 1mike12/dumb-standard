import {compareFunctionType, defaultComparator} from "./defaultComparator";

/**
 * If `findLower` is true, this returns the first index i such that arr[i] ≥ target
 * (a.k.a. lower_bound). Otherwise it returns the first index i such that arr[i] > target
 * (a.k.a. upper_bound).
 *
 * Assumes `arr` is sorted in ascending order and `compare(a,b)` returns:
 *   <0 if a<b,  0 if a===b,  >0 if a>b.
 */
function boundSearch<T>(
  arr: T[],
  target: T,
  compare: compareFunctionType<T>,
  findLower: boolean
): number {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    const cmp = compare(arr[mid], target);

    if (findLower) {
      // "lower_bound" logic: move hi when arr[mid] ≥ target
      if (cmp < 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    } else {
      // "upper_bound" logic: move hi when arr[mid] ≤ target
      if (cmp <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
  }
  return lo;
}

/**
 * Returns the first index i such that arr[i] >= target (lower bound).
 * If no such element exists, returns arr.length (insertion point at end).
 * @param arr
 * @param target
 * @param compare
 */
export function lowerBoundSearch<T>(arr: T[], target: T, compare: compareFunctionType<T> = defaultComparator): number {
  return boundSearch(arr, target, compare, true);
}

/**
 * Returns the first index i such that arr[i] > target (upper bound).
 * If no such element exists, returns arr.length (insertion point at end).
 * @param arr
 * @param target
 * @param compare
 */
export function upperBoundSearch<T>(arr: T[], target: T, compare: compareFunctionType<T> = defaultComparator): number {
  return boundSearch(arr, target, compare, false);
}
