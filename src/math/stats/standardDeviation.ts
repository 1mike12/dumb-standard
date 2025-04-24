import { mean as meanFn } from "../central_tendency/mean";
import { variance } from "./variance";

/**
 * Calculate the standard deviation of an array of numbers
 * @param data - The array of numbers to calculate the standard deviation of
 * @returns The standard deviation of the array
 */
export function standardDeviation(data: number[], mean: number = meanFn(data)): number {
    const v = variance(data, mean);
    return Math.sqrt(v);
}