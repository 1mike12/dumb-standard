/**
 * Efficiently picks `n` unique random elements from an array.
 *
 * This function uses a variant of the "reservoir sampling" algorithm,
 * which is particularly efficient when the number of elements to be
 * selected (`n`) is much smaller than the size of the array. This
 * method ensures that each element has an equal probability of being
 * chosen without the need to shuffle the entire array.
 */
export function pickRandom<T>(arr: T[], n: number): T[] {
  if (n < 0) throw new RangeError("pickRandom: number of elements cannot be negative")
  if (n > arr.length) throw new RangeError("pickRandom: more elements taken than available")

  const result = arr.slice(0, n)

  for (let i = n; i < arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1))
    if (j < n) {
      result[j] = arr[i]
    }
  }

  return result
}
