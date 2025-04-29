/**
 * Returns a random date between two dates. If no end date is provided, the current date is used.
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns A random date between the start and end dates
 */
export function randomDateBetween(
  startDate: Date,
  endDate: Date = new Date()
): Date {
  const startTimestamp = startDate.getTime()
  const endTimestamp = endDate.getTime()

  const timeRange = endTimestamp - startTimestamp
  const randomOffset = Math.floor(Math.random() * timeRange)

  const randomTimestamp = startTimestamp + randomOffset
  const randomDate = new Date(randomTimestamp)

  return randomDate
}
