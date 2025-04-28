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
     */
    push(item: T): void {
        this.buffer[this.currentIndex] = item;
        this.currentIndex++;

        if (this.currentIndex === this.capacity) {
            this.currentIndex = 0;
            this.isFull = true;
        }
    }

    /**
     * Returns all items in the buffer in the order they were added,
     * from oldest to newest.
     * @returns An array containing all items in the buffer
     */
    getAll(): T[] {
        if (!this.isFull) {
            return this.buffer.slice(0, this.currentIndex);
        }

        return [
            ...this.buffer.slice(this.currentIndex),
            ...this.buffer.slice(0, this.currentIndex)
        ];
    }

    /**
     * Implements the iterable protocol, allowing the buffer to be used
     * in for...of loops and with the spread operator.
     * Items are yielded from oldest to newest.
     */
    *[Symbol.iterator]() {
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
     * Resets the buffer to its initial empty state, clearing all elements
     */
    reset(): void {
        this.currentIndex = 0;
        this.isFull = false;
        // @ts-ignore
        this.buffer.fill(undefined);
    }

    /**
     * Creates an iterator that yields items in reverse order (newest to oldest).
     * This is the opposite of the default iteration order.
     * @returns An iterator that yields items from newest to oldest
     */
    *reverse() {
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
     * Executes a callback function on each element in the buffer in reverse order
     * (newest to oldest) with the element's index in the reversed sequence.
     * @param callback Function to execute on each element with (item, index) parameters
     */
    forEachReverse(callback: (item: T, index: number) => void): void {
        let idx = 0;
        for (const item of this.reverse()) {
            callback(item, idx++);
        }
    }

    /**
     * Gets the current number of elements in the buffer
     * @returns The number of elements currently in the buffer
     */
    get size(): number {
        return this.isFull ? this.capacity : this.currentIndex;
    }
}
