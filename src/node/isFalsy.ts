/**
 * A test that allows 0 and empty string to not count. IE we have 0 values
 * coming from latitude, distance, or depth, and should be displayed
 * which is distinguishing from null or undefined
 * @param value
 */
export function isFalsy(value: any): value is null | undefined | false {
  if (value === 0) return false
  if (value === "") return false
  return !value
}
