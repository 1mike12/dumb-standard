export function isValidTimeZone(tz: string) {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz })
    return true
  } catch (e) {
    if (e.message.includes("Invalid time zone specified")) {
      return false
    }
  }
  throw new Error("uh oh")
}
