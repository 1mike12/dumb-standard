/**
 * Time unit for return value of parseTime.
 */
export enum TimeUnit {
    SECONDS,
    MINUTES
}

/**
 * Parses time strings into seconds or minutes since midnight.
 * Supports "HH:mm" (0-1439 minutes) and "HH:mm:ss" formats.
 * Throws on invalid format.
 */
export function parseTime(time: string, unit: TimeUnit = TimeUnit.SECONDS): number {
    if (!(unit in TimeUnit)) {
        throw new Error(`Invalid unit: '${unit}'. Expected 'SECONDS' or 'MINUTES'.`);
    }

    // make a regex that tests for if the string contains anyting other than numbers and colons
    const regex = /^[0-9:]+$/;
    if (!regex.test(time)) {
        throw new Error(`Invalid time: '${time}'. Expected 'HH:mm' or 'HH:mm:ss'.`);
    }

    const parts = time.split(":");
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (parts.length === 2) {
        hours = Number(parts[0]);
        minutes = Number(parts[1]);

    } else if (parts.length === 3) {
        hours = Number(parts[0]);
        minutes = Number(parts[1]);
        seconds = Number(parts[2]);
    } else {
        throw new Error(`Invalid time: '${time}'. Expected 'HH:mm' or 'HH:mm:ss'.`);
    }

    if (hours < 0 || hours > 23) {
        throw new Error(`Invalid hours: '${hours}'. Expected 0-23.`);
    }
    if (minutes < 0 || minutes > 59) {
        throw new Error(`Invalid minutes: '${minutes}'. Expected 0-59.`);
    }
    if (seconds < 0 || seconds > 59) {
        throw new Error(`Invalid seconds: '${seconds}'. Expected 0-59.`);
    }

    if (unit === TimeUnit.SECONDS) {
        return hours * 3600 + minutes * 60 + seconds;
    }
    if (unit === TimeUnit.MINUTES) {
        return hours * 60 + minutes + seconds / 60;
    }
    throw new Error(`shouldn't reach here`);
} 