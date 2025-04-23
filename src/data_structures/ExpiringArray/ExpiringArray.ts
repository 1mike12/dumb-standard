export class ExpiringArray<T> implements Iterable<[number, T]> {
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

   /** Iterate over [timestamp, value] tuples in chronological order */
   *[Symbol.iterator](): IterableIterator<[number, T]> {
      this.evict();
      for (const entry of this.data) {
         yield entry;
      }
   }


   /** Snapshot of current window as a new array */
   toArray(): T[] {
      this.evict()
      return this.data.slice().map(x => x[1])
   }

   get length(): number {
      this.evict()
      return this.data.length;
   }

   forEach(callback: (value: T, timestamp: number, index: number) => void): void {
      this.evict();
      this.data.forEach(([timestamp, value], index) => {
         callback(value, timestamp, index);
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

   clear(): void {
      this.data = [];
   }
}
