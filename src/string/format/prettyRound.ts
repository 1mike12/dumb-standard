/**
 * rounds numbers to precision points, but always returns whole numbers, or numbers pretty close to whole numbers without any decimals
 * @param number
 * @param precision
 */
export const prettyRound = (number: number, precision: number) => {
  if (Number.isSafeInteger(number)) {
    return number + ""
  }
  const fractionalComponent = number - parseInt(number + "")
  if (fractionalComponent > 0.999 || fractionalComponent < 0.001) {
    return Math.round(number) + ""
  }
  return number.toFixed(precision)
}
