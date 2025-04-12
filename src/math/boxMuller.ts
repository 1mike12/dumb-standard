/**
 * Generates a random number following a normal distribution with the specified mean and standard deviation.
 * 
 * @param mean - The mean (μ) of the normal distribution
 * @param std - The standard deviation (σ) of the normal distribution
 * @returns A random number following a normal distribution with the specified parameters
 */
export function boxMuller(mean: number, std: number): number {
   // Generate two uniform random numbers between 0 and 1
   let u = 0, v = 0;
   while (u === 0) u = Math.random();
   while (v === 0) v = Math.random();
   
   // Implementation of the Box-Muller transform
   // Note: The standard transform produces two independent normal random numbers:
   // z₁ = √(-2·ln(u))·cos(2π·v) and z₂ = √(-2·ln(u))·sin(2π·v)
   // Here we only use the first formula (z₁) and discard the second one
   return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
