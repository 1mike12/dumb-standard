const romanToArabic: { [key: string]: number } = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
}

export function replaceRomanWithArabic(input: string): string {
  // Regular expression to match a space followed by Roman numerals from I to IX at the end of the string
  const regex = /\s(I{1,3}|IV|V|VI{1,3}|IX)$/

  return input.replace(regex, (match) => {
    match = match.trim()
    const arabic = romanToArabic[match].toString()
    return ` ${arabic}`
  })
}
