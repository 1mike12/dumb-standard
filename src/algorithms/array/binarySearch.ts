import {compareFunctionType, defaultComparator} from "./defaultComparator";

/**
 * finds the index of the first element in the array that is greater than or equal to the target
 * @param arr
 * @param target
 * @param comparator
 */
export function binarySearch<T>(
  arr: T[],
  target: any,
  comparator : compareFunctionType<T> = defaultComparator
) {
  let lo = 0
  let hi = arr.length - 1
  let mid: number, cmp: number

  while (lo <= hi) {
    mid = Math.floor((lo + hi) / 2)
    cmp = comparator(arr[mid], target)

    if (cmp < 0) {
      lo = mid + 1
    } else if (cmp > 0) {
      hi = mid - 1
    } else {
      return mid
    }
  }
  return lo
}
