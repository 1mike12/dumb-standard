export function percentile(data: number[], p: number): number {
    const sorted = data.sort((a, b) => a - b);
    const position = (p / 100) * (sorted.length - 1);
    return sorted[Math.floor(position)];
}