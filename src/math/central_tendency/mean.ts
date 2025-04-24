/**
 * Calculate the mean (average) of an array of numbers
 * @param input - The array of numbers to calculate the mean of
 * @returns The mean of the array
 */
export function mean(input: number[]) {
   let total = 0
   for (const x of input) {
      total += x
   }
   return total / input.length
}
