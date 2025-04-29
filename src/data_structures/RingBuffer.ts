/**
 * A fixed-size circular buffer that automatically overwrites the oldest elements
 * when the buffer reaches capacity. Provides efficient memory usage for
 * scenarios requiring a fixed window of recent items.
 * @template T The type of elements stored in the buffer
 */
export class RingBuffer<T> {
    private readonly buffer: T[];
    public currentIndex: number = 0;
    private isFull: boolean = false;

    /**
     * Creates a new RingBuffer with the specified capacity
     * @param capacity The maximum number of elements the buffer can hold
     */
    constructor(private capacity: number) {
        this.buffer = new Array<T>(capacity);
    }

    /**
     * Adds an item to the buffer. If the buffer is at capacity,
     * the oldest item will be overwritten.
     * @param item The item to add to the buffer
     * @return new length
     */
    push(item: T): number {
        this.buffer[this.currentIndex] = item;
        this.currentIndex++;

        if (this.currentIndex === this.capacity) {
            this.currentIndex = 0;
            this.isFull = true;
        }
        return this.size
    }

    /**
     * Returns all items in the buffer in the order they were added,
     * from oldest to newest.
     * @returns An array containing all items in the buffer
     */
    toArray(): T[] {
        return Array.from(this);
    }

    /**
     * Implements the iterable protocol, allowing the buffer to be used
     * in for...of loops and with the spread operator.
     * Items are yielded from oldest to newest.
     */
    *[Symbol.iterator](): IterableIterator<T> {
        if (!this.isFull) {
            // Not full yet, iterate from 0 to currentIndex
            for (let i = 0; i < this.currentIndex; i++) {
                yield this.buffer[i];
            }
        } else {
            // Buffer is full, start from currentIndex to end
            for (let i = this.currentIndex; i < this.capacity; i++) {
                yield this.buffer[i];
            }
            // Then from beginning to currentIndex
            for (let i = 0; i < this.currentIndex; i++) {
                yield this.buffer[i];
            }
        }
    }

    /**
     * Creates an iterator that yields items in reverse order (newest to oldest).
     * This is the opposite of the default iteration order.
     * @returns An iterator that yields items from newest to oldest
     */
    * reverse(): IterableIterator<T> {
        if (!this.isFull) {
            // First yield items from currentIndex-1 down to 0 (reverse of the second part of getAll)
            for (let i = this.currentIndex - 1; i >= 0; i--) {
                yield this.buffer[i];
            }
        } else {
            // First yield items from currentIndex-1 down to 0 (reverse of the second part of getAll)
            for (let i = this.currentIndex - 1; i >= 0; i--) {
                yield this.buffer[i];
            }
            // Then yield items from capacity-1 down to currentIndex (reverse of the first part of getAll)
            for (let i = this.capacity - 1; i >= this.currentIndex; i--) {
                yield this.buffer[i];
            }
        }
    }

    /**
     * Executes a callback function on each element in the buffer in order
     * (oldest to newest) with the element's index in the sequence.
     * @param callback Function to execute on each element with (item, index) parameters
     */
    forEach(callback: (item: T, index: number) => void): void {
        let i = 0;
        for (const v of this) callback(v, i++);
    }

    /**
     * Executes a callback function on each element in the buffer in reverse order
     * (newest to oldest) with the element's index in the reversed sequence.
     * @param callback Function to execute on each element with (item, index) parameters
     */
    forEachReverse(callback: (item: T, index: number) => void): void {
        let i = 0;
        for (const item of this.reverse()) {
            callback(item, i++);
        }
    }

    /**
     * Maps each element in the buffer to a new value using the provided callback function.
     * @param callback Function to execute on each element with (item, index) parameters
     * @returns An array of the results of the callback function
     */
    map<U>(callback: (item: T, index: number) => U): U[] {
        let i = 0;
        return Array.from(this, v => callback(v, i++));
    }

    /** Non-destructive peek at the oldest element (front) */
    peekOldest(): T | undefined {
        // empty buffer
        if (this.size === 0) return undefined;
        // once full, the oldest lives at writeIndex; otherwise it's at 0
        return this.isFull
            ? this.buffer[this.currentIndex]
            : this.buffer[0];
    }

    /** Non-destructive peek at the newest element (back) */
    peekNewest(): T | undefined {
        // empty buffer
        if (this.size === 0) return undefined;
        // if writeIndex > 0, newest is writeIndex-1; if it wrapped, it's at capacity-1
        const idx = this.currentIndex > 0
            ? this.currentIndex - 1
            : this.capacity - 1;
        return this.buffer[idx];
    }

    /** alias for peekOldest */
    front(): T | undefined {
        return this.peekOldest();
    }

    /** alias for peekNewest */
    back(): T | undefined {
        return this.peekNewest();
    }

    /**
     * Maps each element in the buffer to a new value using the provided callback function in reverse order.
     * @param callback Function to execute on each element with (item, index) parameters
     * @returns An array of the results of the callback function
     */
    mapReverse<U>(callback: (item: T, index: number) => U): U[] {
        let i = 0;
        return Array.from(this.reverse(), v => callback(v, i++));
    }

    /**
     * Gets the current number of elements in the buffer
     * @returns The number of elements currently in the buffer
     */
    get size(): number {
        return this.isFull ? this.capacity : this.currentIndex;
    }

    /**
     * Resets the buffer to its initial empty state, clearing all elements
     */
    reset(): void {
        this.currentIndex = 0;
        this.isFull = false;
        // @ts-ignore
        this.buffer.fill(undefined);
    }
}
