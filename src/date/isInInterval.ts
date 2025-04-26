import { parseTime, TimeUnit } from "./parseTime";

/**
 * Returns true if the local time of `date` falls within the interval [start, end).
 * Supports wrap-around (e.g. start="22:00", end="06:00").
 * Throws if start and end are equal.
 */
export function isInInterval(
  date: Date,
  startString: string,
  endString: string
): boolean {
  const start = parseTime(startString, TimeUnit.SECONDS);
  const end = parseTime(endString, TimeUnit.SECONDS);
  if (start === end) {
    throw new Error(`Invalid interval: start ('${startString}') and end ('${endString}') must differ.`);
  }
  const t = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  if (start < end) {
    return t >= start && t < end;
  }
  return t >= start || t < end;
}
