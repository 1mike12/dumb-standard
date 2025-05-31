export function defaultComparator<T>(a: T, b: T): number {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }
  return (a as number) - (b as number);
}

export type compareFunctionType<T> = (a: T, b: T) => number
