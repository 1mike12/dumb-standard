import { expect } from "chai";
import { formatShortDateTime } from "./formatShortDateTime";

describe("formatShortDateTime", () => {
   describe('formatShortDateTime', () => {
      it('should format a date with default en-US locale', () => {
         // Create a fixed test date (January 15, 2023, 14:30)
         const testDate = new Date(2023, 0, 15, 14, 30);

         const result = formatShortDateTime(testDate);

         // Less stringent check for en-US format
         expect(result).to.include('January');
         expect(result).to.include('15');
         expect(result).to.include('2023');
         expect(result).to.match(/2:30|14:30/); // Allow either 12h or 24h format
      });

      it('should format a date with fr-FR locale', () => {
         // Create a fixed test date (January 15, 2023, 14:30)
         const testDate = new Date(2023, 0, 15, 14, 30);

         const result = formatShortDateTime(testDate, 'fr-FR');

         // Less stringent check for fr-FR format
         expect(result).to.include('15');
         expect(result).to.include('2023');
         // French month name might vary by implementation
         expect(result).to.match(/janvier|janv/i);
         expect(result).to.match(/14[.:h]30/); // Allow different time separators
      });

      it('should format a date with ja-JP locale', () => {
         // Create a fixed test date (January 15, 2023, 14:30)
         const testDate = new Date(2023, 0, 15, 14, 30);

         const result = formatShortDateTime(testDate, 'ja-JP');

         // Just check for the presence of key components
         expect(result).to.include('2023');
         // Allow for different ways to represent the month and day
         expect(result).to.match(/1[月日]/);
         expect(result).to.match(/15[月日]/);
         expect(result).to.match(/14[.:時]30/);
      });

      it('should handle midnight correctly', () => {
         // Test midnight edge case - 00:00
         const testDate = new Date(2023, 0, 15, 0, 0);

         const result = formatShortDateTime(testDate);

         // Less stringent check for midnight
         expect(result).to.include('January');
         expect(result).to.include('15');
         expect(result).to.include('2023');
         expect(result).to.match(/12:00\s*AM|00:00/i); // Allow for AM/PM or 24h
      });

      it('should handle noon correctly', () => {
         // Test noon edge case - 12:00
         const testDate = new Date(2023, 0, 15, 12, 0);

         const result = formatShortDateTime(testDate);

         // Less stringent check for noon
         expect(result).to.include('January');
         expect(result).to.include('15');
         expect(result).to.include('2023');
         expect(result).to.match(/12:00\s*PM|12:00/i); // Allow for PM or without
      });
   });
});
