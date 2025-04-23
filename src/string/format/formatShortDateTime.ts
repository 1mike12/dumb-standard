export function formatShortDateTime(date: Date, locale: string = "en-US") {
  const options: Intl.DateTimeFormatOptions = {
    weekday: undefined,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }
  return date.toLocaleDateString(locale, options)
}
