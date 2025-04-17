/**
 * All possible decimal separators (radices) returned by Intl.NumberFormat today.
 */
export type Radix = '.' | ',' | '٫';

/**
 * Get the decimal separator for a given locale
 * @param locale
 */
export function getDecimalSeparator(locale: string | string[]): Radix {
   // we use this pattern of 2 repeating nums, radix, 2 more repeating nums to elicit the radix
   // fr-FR: 11,22
   // ar-EG: ٢٢٫١١
   const exampleNumber = 11.22
   const pattern = /.{2}(.).{2}/
   const formatted = new Intl.NumberFormat(locale).format(exampleNumber)
   const match = formatted.match(pattern)
   if (!match) {
      throw new Error("failed to find the radix point in the formatted number for locale " + locale)
   }
   return match[1] as Radix
}
