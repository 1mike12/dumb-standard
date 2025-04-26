/**
 * a truthy tester but also includes 0 as true. Useful when we want to conditionally render things like 0 degree C, instead
 * of rendering a "-" or "N/A"
 *
 * - `0` - true
 * - `{}` - true
 * - `null` - false
 * - `undefined` - false
 * - `""` - false
 * - `[]` - false
 * - `NaN` - false
 *
 */
export function isReal(value: any): value is number | string | true | object | Array<any> {
  if (value === 0) return true
  if (Array.isArray(value) && value.length === 0) return false
  return !!value
}
