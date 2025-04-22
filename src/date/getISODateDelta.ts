/**
 * Calculates the time difference in milliseconds between two ISO date strings
 * 
 * @param start - The starting ISO date string
 * @param end - The ending ISO date string
 * @returns The time difference in milliseconds
 * 
 * @example
 * // Returns 3600000 (1 hour in milliseconds)
 * getISODateDelta('2023-01-01T00:00:00Z', '2023-01-01T01:00:00Z');
 */
export function getISODateDelta(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return endDate.getTime() - startDate.getTime();
}
