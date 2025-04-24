/**
 *
 * @param durationMs - duration in milliseconds
 * @param significantDigits - number of significant digits to show
 * @param showSecondUnit - whether to show the second smaller unit (e.g. "3s42ms" vs "3s")
 */
export const formatDuration = (
   durationMs: number,
   significantDigits: number = 0,
   showSecondUnit: boolean = true
): string => {
   // Microseconds (μs)
   if (durationMs < 1) {
      return `${(durationMs * 1000).toFixed(significantDigits)}μs`;
   }

   // Milliseconds (ms)
   if (durationMs < 1e3) {
      return `${durationMs.toFixed(significantDigits)}ms`;
   }

   // Seconds (s) and milliseconds
   if (durationMs < 60 * 1000) {
      const seconds = Math.floor(durationMs / 1000);
      if (showSecondUnit) {
         const remainingMs = Math.round(durationMs % 1000);
         return remainingMs > 0 ? `${seconds}s${remainingMs}ms` : `${seconds}s`;
      }
      return `${(durationMs / 1000).toFixed(significantDigits)}s`;
   }

   // Minutes (m) and seconds
   if (durationMs < 60 * 60 * 1000) {
      const minutes = Math.floor(durationMs / (60 * 1000));
      if (showSecondUnit) {
         const remainingSeconds = Math.round((durationMs % (60 * 1000)) / 1000);
         return remainingSeconds > 0 ? `${minutes}m${remainingSeconds}s` : `${minutes}m`;
      }
      return `${(durationMs / (60 * 1000)).toFixed(significantDigits)}m`;
   }

   // Hours (h) and minutes
   if (durationMs < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(durationMs / (60 * 60 * 1000));
      if (showSecondUnit) {
         const remainingMinutes = Math.round((durationMs % (60 * 60 * 1000)) / (60 * 1000));
         return remainingMinutes > 0 ? `${hours}h${remainingMinutes}m` : `${hours}h`;
      }
      return `${(durationMs / (60 * 60 * 1000)).toFixed(significantDigits)}h`;
   }

   // Days (d) and hours
   const days = Math.floor(durationMs / (24 * 60 * 60 * 1000));
   if (showSecondUnit) {
      const remainingHours = Math.round((durationMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      return remainingHours > 0 ? `${days}d${remainingHours}h` : `${days}d`;
   }
   return `${(durationMs / (24 * 60 * 60 * 1000)).toFixed(significantDigits)}d`;
};
