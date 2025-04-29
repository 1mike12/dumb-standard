import { parseTime, TimeUnit } from "./parseTime"

/**
 * Parses "HH:mm" into minutes since midnight (0–1439). Throws on invalid format.
 * @deprecated Use parseTime with TimeUnit.MINUTES instead
 */
export function parseTimeToMinutes(time: string): number {
  return parseTime(time, TimeUnit.MINUTES)
}
