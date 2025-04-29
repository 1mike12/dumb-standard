/**
 * A fixed-size circular buffer that automatically overwrites the oldest elements
 * when the buffer reaches capacity. Provides efficient memory usage for
 * scenarios requiring a fixed window of recent items.
 * @template T The type of elements stored in the buffer
 */
export class RingBuffer<T> {
  private buffer: T[]
  public currentIndex: number = 0
  private isFull: boolean = false

  /**
   * Creates a new RingBuffer with the specified capacity
   * @param capacity The maximum number of elements the buffer can hold
   */
  constructor(private capacity: number) {
    this.buffer = new Array<T>(capacity)
  }

  /**
   * Adds an item to the buffer. If the buffer is at capacity,
   * the oldest item will be overwritten.
   * @param item The item to add to the buffer
   * @return new length
   */
  push(item: T): number {
    this.buffer[this.currentIndex] = item
    this.currentIndex++

    if (this.currentIndex === this.capacity) {
      this.currentIndex = 0
      this.isFull = true
    }
    return this.size
  }

  /**
   * Returns all items in the buffer in the order they were added,
   * from oldest to newest.
   * @returns An array containing all items in the buffer
   */
  toArray(): T[] {
    return Array.from(this)
  }

  /**
   * Implements the iterable protocol, allowing the buffer to be used
   * in for...of loops and with the spread operator.
   * Items are yielded from oldest to newest.
   */
  *[Symbol.iterator](): IterableIterator<T> {
    const count = this.size
    const start = this.isFull ? this.currentIndex : 0

    for (let i = start; i < start + count; i++) {
      yield this.buffer[i % this.capacity]
    }
  }

  /**
   * Creates an iterator that yields items in reverse order (newest to oldest).
   * This is the opposite of the default iteration order.
   * @returns An iterator that yields items from newest to oldest
   */
  *reverse(): IterableIterator<T> {
    const count = this.size
    const start = (this.currentIndex - 1 + this.capacity) % this.capacity
    for (let i = start; i > start - count; i--) {
      yield this.buffer[(i + this.capacity) % this.capacity]
    }
  }

  /**
   * Executes a callback function on each element in the buffer in order
   * (oldest to newest) with the element's index in the sequence.
   * @param callback Function to execute on each element with (item, index) parameters
   */
  forEach(callback: (item: T, index: number) => void): void {
    let i = 0
    for (const v of this) callback(v, i++)
  }

  /**
   * Executes a callback function on each element in the buffer in reverse order
   * (newest to oldest) with the element's index in the reversed sequence.
   * @param callback Function to execute on each element with (item, index) parameters
   */
  forEachReverse(callback: (item: T, index: number) => void): void {
    let i = 0
    for (const item of this.reverse()) {
      callback(item, i++)
    }
  }

  /**
   * Maps each element in the buffer to a new value using the provided callback function.
   * @param callback Function to execute on each element with (item, index) parameters
   * @returns An array of the results of the callback function
   */
  map<U>(callback: (item: T, index: number) => U): U[] {
    let i = 0
    return Array.from(this, (v) => callback(v, i++))
  }

  /** Non-destructive peek at the oldest element (front) */
  peekOldest(): T | undefined {
    return this.buffer[this.getOldestIndex()]
  }

  /**
   * gets the index of the oldest item in the buffer
   */
  getOldestIndex() {
    return this.isFull ? this.currentIndex : 0
  }

  /**
   * gets the index of the newest item in the buffer
   */
  getNewestIndex(): number {
    if (this.size === 0) return 0
    if (!this.isFull) {
      return this.currentIndex - 1
    }
    return (this.currentIndex - 1 + this.capacity) % this.capacity
  }

  /** Non-destructive peek at the newest element (back) */
  peekNewest(): T | undefined {
    return this.buffer[this.getNewestIndex()]
  }

  /** alias for peekOldest */
  front(): T | undefined {
    return this.peekOldest()
  }

  /** alias for peekNewest */
  back(): T | undefined {
    return this.peekNewest()
  }

  /**
   * Maps each element in the buffer to a new value using the provided callback function in reverse order.
   * @param callback Function to execute on each element with (item, index) parameters
   * @returns An array of the results of the callback function
   */
  mapReverse<U>(callback: (item: T, index: number) => U): U[] {
    let i = 0
    return Array.from(this.reverse(), (v) => callback(v, i++))
  }

  /**
   * Gets the current number of elements in the buffer
   * @returns The number of elements currently in the buffer
   */
  get size(): number {
    return this.isFull ? this.capacity : this.currentIndex
  }

  /**
   * Resets the buffer to its initial empty state, clearing all elements
   */
  reset(): void {
    this.currentIndex = 0
    this.isFull = false
    this.buffer = new Array<T>(this.capacity)
  }
}
