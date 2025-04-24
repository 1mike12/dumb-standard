import { mean as meanFn } from "../central_tendency/mean";

export function variance(data: number[], mean: number = meanFn(data)): number {
    const variance = data.reduce((acc, x) => acc + (x - mean) ** 2, 0) / data.length;
    return variance;
}