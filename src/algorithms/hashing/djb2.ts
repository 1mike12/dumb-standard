/**
 * this is a fast hashing algo that is not cryptographically secure but can uniformly map any string to a number bounded by 2^32
 * @param str
 */
export function djb2(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }
  return hash >>> 0
}
