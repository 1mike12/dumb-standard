export function randomIntegerBetween(min: number, max: number): number {
  if (min > max) {
    throw new RangeError("min must be less than or equal to max")
  }
  return Math.floor(Math.random() * (max - min + 1) + min)
}
