export class RingBuffer<T> {
    private readonly buffer: T[];
    public currentIndex: number = 0;
    private isFull: boolean = false;

    constructor(private capacity: number) {
        this.buffer = new Array<T>(capacity);
    }

    push(item: T): void {
        this.buffer[this.currentIndex] = item;
        this.currentIndex++;

        if (this.currentIndex === this.capacity) {
            this.currentIndex = 0;
            this.isFull = true;
        }
    }

    getAll(): T[] {
        if (!this.isFull) {
            return this.buffer.slice(0, this.currentIndex);
        }

        return [
            ...this.buffer.slice(this.currentIndex),
            ...this.buffer.slice(0, this.currentIndex)
        ];
    }

    get size(): number {
        return this.isFull ? this.capacity : this.currentIndex;
    }
}
