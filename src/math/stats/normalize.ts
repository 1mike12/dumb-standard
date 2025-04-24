export function normalize(data: number[]): number[] {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return data.map(x => (x - min) / (max - min));
}