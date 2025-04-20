export class LRU<K, V> {
   private current: Map<any, any>;
   private previous: Map<any, any>;

   constructor(public maxSize: number) {
      this.current = new Map();
      this.previous = new Map();
   }

   get(key: K) {
      if (this.current.has(key)) {
         return this.current.get(key);
      }
      if (this.previous.has(key)) {
         const val = this.previous.get(key);
         // Promote to current
         this.current.set(key, val);
         this.previous.delete(key);
         return val;
      }
      return undefined;
   }

   set(key: K, value: V) {
      if (this.current.has(key)) {
         this.current.set(key, value);
         return;
      }
      this.current.set(key, value);
      if (this.current.size > this.maxSize) {
         // Drop the oldest generation entirely
         this.previous = this.current;
         this.current = new Map();
      }
   }
}
