export const formatDuration = (
    startTime: number,
    endTime: number = performance.now(),
    significantDigits: number = 1
): string => {
    const durationMs = endTime - startTime;

    if (durationMs < 1) {
        return `${(durationMs * 1000).toFixed(significantDigits)}μs`;
    }

    if (durationMs < 1000) {
        return `${durationMs.toFixed(significantDigits)}ms`;
    }

    return `${(durationMs / 1000).toFixed(significantDigits)}s`;
};
