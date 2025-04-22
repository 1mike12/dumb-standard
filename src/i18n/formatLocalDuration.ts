/**
 * Map of locale prefixes to their corresponding time unit abbreviations
 * Each entry contains hour, minute, and second labels
 */
interface TimeUnitLabels {
  hour: string;
  minute: string;
  second: string;
}

const LOCALE_TIME_UNITS: Record<string, TimeUnitLabels> = {
  'zh': { hour: '小时', minute: '分',  second: '秒'  },
  'ja': { hour: '時間', minute: '分',  second: '秒'  },
  'ko': { hour: '시간', minute: '분',  second: '초'  },
  'ru': { hour: 'ч',   minute: 'м',   second: 'с'   },
  'pl': { hour: 'godz',minute: 'min', second: 's'   },
  'default': { hour: 'h', minute: 'm', second: 's' }
};

/**
 * Gets the appropriate time unit labels for a given locale
 *
 * @param locale - The locale string
 * @returns An object containing the hour, minute, and second labels
 */
function getTimeUnitLabels(locale: string): TimeUnitLabels {
  // Extract the language code from the locale
  const langCode = locale.split('-')[0].toLowerCase();

  // Return the time unit labels for the locale if available, otherwise return default
  return LOCALE_TIME_UNITS[langCode] || LOCALE_TIME_UNITS['default'];
}

/**
 * Formats a duration in seconds to a localized string representation.
 * Supports various European locales, Asian languages, and English.
 *
 * @param seconds - The duration in seconds to format
 * @param locale - The locale string (e.g., 'en-US', 'zh-CN', 'fr-FR')
 * @returns A formatted string representing the duration
 */
export function formatLocalDuration(seconds: number, locale: string): string {
  // Input validation
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0s';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Get the appropriate time unit labels for the locale
  const { hour: hourLabel, minute: minuteLabel, second: secondLabel } = getTimeUnitLabels(locale);

  // Format the duration based on the significant units
  if (hours > 0) {
    return `${hours}${hourLabel}${minutes}${minuteLabel}`;
  } else if (minutes > 0) {
    return `${minutes}${minuteLabel}${remainingSeconds}${secondLabel}`;
  } else {
    return `${remainingSeconds}${secondLabel}`;
  }
}

/**
 * Alternative implementation that uses the Intl.NumberFormat for proper number localization
 * while still using the appropriate time unit abbreviations for each locale.
 *
 * @param seconds - The duration in seconds to format
 * @param locale - The locale string (e.g., 'en-US', 'zh-CN', 'fr-FR')
 * @returns A formatted string representing the duration
 */
export function formatLocalDurationWithLocalizedNumbers(seconds: number, locale: string): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0s';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Format numbers according to locale
  const formatter = new Intl.NumberFormat(locale, {
    useGrouping: false // Don't use thousand separators
  });

  // Get the appropriate time unit labels for the locale
  const { hour: hourLabel, minute: minuteLabel, second: secondLabel } = getTimeUnitLabels(locale);

  if (hours > 0) {
    return `${formatter.format(hours)}${hourLabel}${formatter.format(minutes)}${minuteLabel}`;
  } else if (minutes > 0) {
    return `${formatter.format(minutes)}${minuteLabel}${formatter.format(remainingSeconds)}${secondLabel}`;
  } else {
    return `${formatter.format(remainingSeconds)}${secondLabel}`;
  }
}
