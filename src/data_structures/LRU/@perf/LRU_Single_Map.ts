export class LRU_Single_Map<K, V> {
   public cache = new Map<K, V>()

   constructor(public maxSize: number) {
   }

   get(key: K) {
      const val = this.cache.get(key);
      if (val === undefined) return undefined
      // “Refresh” the key by reinserting it at the back
      this.cache.delete(key);
      this.cache.set(key, val);
      return val;
   }

   set(key: K, value: V) {
      if (this.cache.has(key)) {
         // overwrite and move to back
         this.cache.delete(key);
      }

      if (this.cache.size >= this.maxSize) this.evictOldest()
      this.cache.set(key, value);
   }

   evictOldest() {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
   }
}
