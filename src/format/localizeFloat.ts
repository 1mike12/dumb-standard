const formatters = new Map<string, Intl.NumberFormat>()

export function localizeFloat(float: number, locale: string, maxPrecision: number = 2, cacheFormatter = true) {
   const key = locale + maxPrecision
   let f = formatters[key]
   if (f === undefined) {
      f = new Intl.NumberFormat(locale, {
         minimumFractionDigits: 0,
         maximumFractionDigits: maxPrecision,
         useGrouping: false
      })
      if (cacheFormatter) {
         formatters[key] = f
      }
   }
   return f.format(float)
}
