import {getDecimalSeparator} from "./getDecimalSeparator";

/**
 * Parses a string to a float using the given locale, in order to support mainly different decimal separators like in
 * france, where 3,14 which will be the only values that a French decimal keyboard on the iOS will be able to input
 *
 * @param value
 * @param locale
 */
export function parseLocalFloat(value: string, locale: string | string[]) {
  if (value === undefined || value === null) {
    return NaN
  }
  const decimalSeparator = getDecimalSeparator(locale)
  const nonDigitsOrPeriod = new RegExp(`[^0-9${decimalSeparator}]`, "g")
  const standardized = value.replace(nonDigitsOrPeriod, "").replace(decimalSeparator, ".")

  return parseFloat(standardized)
}
