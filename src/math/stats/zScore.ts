import { mean as meanFn } from "../central_tendency/mean";
import { standardDeviation } from "./standardDeviation";

/**
 * Calculates the z-score for each element in the data array.
 * The z-score is the number of standard deviations away from the mean.
 * 
 * @param data - The data array to calculate the z-score for.
 * @param mean - The mean of the data array.
 * @param stdDev - The standard deviation of the data array.
 * @returns An array of z-scores.
 */
export function zScore(data: number[], mean: number = meanFn(data), stdDev: number = standardDeviation(data, mean)): number[] {
    return data.map(x => (x - mean) / stdDev);
}