import { mean as meanFn } from "../central_tendency/mean";

/**
 * Calculate the sample variance of a dataset.
 * This variance is used when only a sample of the population is known.
 * Uses n-1 in the denominator (Bessel's correction).
 * @param data - The dataset to calculate the sample variance of
 * @param mean - The mean of the dataset
 * @returns The sample variance of the dataset
 */
export function sampleVariance(data: number[], mean: number = meanFn(data)): number {
    if (data.length <= 1) {
        throw new Error("Sample variance requires at least two data points");
    }

    let sumSquaredDiffs = 0;
    for (let i = 0; i < data.length; i++) {
        sumSquaredDiffs += (data[i] - mean) ** 2;
    }

    return sumSquaredDiffs / (data.length - 1);
} 