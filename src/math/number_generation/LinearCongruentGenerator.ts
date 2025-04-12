/**
 * Simple Linear Congruential Generator (LCG) for deterministic random numbers.
 */
export class LinearCongruentGenerator {
    private m: number = 0x80000000;
    private a: number = 1103515245;
    private c: number = 12345;
    private state: number;

    /**
     * @param {number} seed - The seed value.
     */
    constructor(seed: number) {
        this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
    }

    /**
     * Generates the next integer in the sequence.
     *
     * @returns {number} - Next integer.
     */
    nextInt() {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }

    /**
     * Generates a float between 0 (inclusive) and 1 (exclusive).
     *
     * @returns {number} - Next float.
     */
    nextFloat() {
        return this.nextInt() / (this.m - 1);
    }
}
