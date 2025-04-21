/**
 *
 * @param start - performance.now() number
 * @param end - performance.now() number
 * @param significantDigits
 */
export const formatDuration = (
   start: number,
   end: number = performance.now(),
   significantDigits: number = 1
): string => {
   const durationMs = end - start;

   if (durationMs < 1) {
      return `${(durationMs * 1000).toFixed(significantDigits)}μs`;
   }

   if (durationMs < 1e3) {
      return `${durationMs.toFixed(significantDigits)}ms`;
   }

   if (durationMs < 60 * 1e3) {
      return `${(durationMs / 1000).toFixed(significantDigits)}s`;
   }

   if (durationMs < 60 * 60 * 1e3) {
      return `${(durationMs / 60 * 1e3).toFixed(significantDigits)}h`;
   }
};
