import { mean as meanFn } from "../central_tendency/mean";

/**
 * Calculate the population variance of a dataset.
 * This variance is used when the entire population is known.
 * @param data - The dataset to calculate the variance of
 * @param mean - The mean of the dataset
 * @returns The variance of the dataset
 */
export function variance(data: number[], mean: number = meanFn(data)): number {
    const variance = data.reduce((acc, x) => acc + (x - mean) ** 2, 0) / data.length;
    return variance;
}