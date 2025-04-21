export class LogBook {

   timezone: string
   lines: [Date, string][] = [];
   formatter: Intl.DateTimeFormat

   constructor(timezone?: string) {
      this.timezone = timezone || 'America/New_York';
      this.formatter = new Intl.DateTimeFormat('en-US', {
         timeZone: this.timezone,
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
         hour12: false,
         timeZoneName: 'longOffset'
      });
   }

   add(message: string) {
      this.lines.push([new Date(), message]);
   }

   toString() {
      return this.lines.map(([date, message]) => {
         const formattedDate = this.formatDateWithOffset(date, this.timezone);
         return `${formattedDate} ${message}`;
      }).join("\n");
   }

   private formatDateWithOffset(date: Date, timezone: string): string {

      const parts = this.formatter.formatToParts(date);
      const partValues: { [key: string]: string } = {};

      // Extract all parts into an object for easy access
      parts.forEach(part => {
         partValues[part.type] = part.value;
      });

      // Get the timezone offset
      let offset = partValues.timeZoneName || "";
      if (offset.startsWith("GMT")) {
         offset = offset.replace("GMT", "");
      }

      // Special case for UTC - ensure it has +00:00 offset
      if (timezone === 'UTC' && (offset === "" || offset === "GMT")) {
         offset = "+00:00";
      }

      return `${partValues.year}-${partValues.month}-${partValues.day}T${partValues.hour}:${partValues.minute}:${partValues.second}${offset}`;
   }
}
