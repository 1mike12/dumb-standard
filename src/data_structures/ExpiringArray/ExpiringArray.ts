export class ExpiringArray<T> implements Iterable<T> {
   private data: [number, T][] = [];

   constructor(private readonly windowMs: number) {
   }

   /**
    * Add a new value
    * then evict anything older than windowMs.
    */
   push(value: T): number {
      this.evict();
      const timestamp = Date.now()
      this.data.push([timestamp, value])
      return this.data.length
   }

   /** Remove all entries with ts < now - windowMs */
   private evict() {
      const now = Date.now()
      const cutoff = now - this.windowMs;
      let removeCount = 0;
      while (removeCount < this.data.length && this.data[removeCount][0] < cutoff) {
         removeCount++;
      }
      if (removeCount) {
         this.data.splice(0, removeCount);
      }
   }

   /** Iterate over values in chronological order */
   *[Symbol.iterator](): IterableIterator<T> {
      this.evict();
      for (const entry of this.data) {
         yield entry[1]
      }
   }


   /** Snapshot of current window as a new array */
   toArray(): T[] {
      this.evict()
      const output = new Array(this.data.length)
      for (let i = 0; i < this.data.length; i++) {
         output[i] = this.data[i][1]
      }
      return output
   }

   get length(): number {
      this.evict()
      return this.data.length;
   }

   forEach(callback: (value: T, index: number, timestamp: number) => void): void {
      this.evict();
      this.data.forEach(([timestamp, value], index) => {
         callback(value, index, timestamp);
      });
   }

   map<U>(callback: (value: T, timestamp: number, index: number) => U): U[] {
      this.evict();
      return this.data.map(([timestamp, value], index) => {
         return callback(value, timestamp, index);
      });
   }

   filter(predicate: (value: T, timestamp: number, index: number) => boolean): T[] {
      this.evict();
      return this.data
         .filter(([timestamp, value], index) => predicate(value, timestamp, index))
         .map(([_, value]) => value);
   }

   find(predicate: (value: T, timestamp: number, index: number) => boolean): T | undefined {
      this.evict();
      const entry = this.data.find(([timestamp, value], index) =>
         predicate(value, timestamp, index)
      );
      return entry ? entry[1] : undefined;
   }

   findIndex(predicate: (value: T, timestamp: number, index: number) => boolean): number {
      this.evict();
      return this.data.findIndex(([timestamp, value], index) =>
         predicate(value, timestamp, index)
      );
   }

   last(): T | undefined {
      this.evict();
      return this.data.length > 0 ? this.data[this.data.length - 1][1] : undefined;
   }

   first(): T | undefined {
      this.evict();
      return this.data.length > 0 ? this.data[0][1] : undefined;
   }

   clear(): void {
      this.data = [];
   }
}
