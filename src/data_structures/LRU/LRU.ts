export class LRU<K, V> {
  private _size = 0
  private cache = new Map<K, V>()
  private oldCache = new Map<K, V>()
  private _maxSize: number
  private onEviction?: (key: K, value: V) => void

  constructor(maxSize: number, onEviction?: (key: K, value: V) => void) {
    if (!(maxSize && maxSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0")
    }

    this._maxSize = maxSize
    this.onEviction = onEviction
  }

  private emitEvictions(cache: Map<K, V>): void {
    if (typeof this.onEviction !== "function") {
      return
    }

    for (const [key, value] of cache) {
      this.onEviction(key, value)
    }
  }

  private setInternal(key: K, value: V): void {
    this.cache.set(key, value)
    this._size++

    if (this._size >= this._maxSize) {
      this._size = 0
      this.emitEvictions(this.oldCache)
      this.oldCache = this.cache
      this.cache = new Map<K, V>()
    }
  }

  private moveToRecent(key: K, value: V): void {
    this.oldCache.delete(key)
    this.setInternal(key, value)
  }

  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }

    if (this.oldCache.has(key)) {
      const value = this.oldCache.get(key)
      if (value !== undefined) {
        this.moveToRecent(key, value)
        return value
      }
    }

    return undefined
  }

  set(key: K, value: V): this {
    if (this.cache.has(key)) {
      this.cache.set(key, value)
    } else {
      this.setInternal(key, value)
    }

    return this
  }

  has(key: K): boolean {
    return this.cache.has(key) || this.oldCache.has(key)
  }

  peek(key: K): V | undefined {
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }

    if (this.oldCache.has(key)) {
      return this.oldCache.get(key)
    }

    return undefined
  }

  delete(key: K): boolean {
    const deleted = this.cache.delete(key)
    if (deleted) {
      this._size--
    }

    return this.oldCache.delete(key) || deleted
  }

  clear(): void {
    this.cache.clear()
    this.oldCache.clear()
    this._size = 0
  }

  resize(newSize: number): void {
    if (!(newSize && newSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0")
    }

    const items = [...this.entries()]
    const removeCount = items.length - newSize

    if (removeCount < 0) {
      this.cache = new Map(items)
      this.oldCache = new Map()
      this._size = items.length
    } else {
      if (removeCount > 0) {
        this.emitEvictions(new Map(items.slice(0, removeCount)))
      }

      this.oldCache = new Map(items.slice(removeCount))
      this.cache = new Map()
      this._size = 0
    }

    this._maxSize = newSize
  }

  *entries(): Generator<[K, V], void, unknown> {
    for (const [key, value] of this.cache) {
      yield [key, value]
    }

    for (const [key, value] of this.oldCache) {
      if (!this.cache.has(key)) {
        yield [key, value]
      }
    }
  }

  *keys(): Generator<K, void, unknown> {
    for (const [key] of this) {
      yield key
    }
  }

  *values(): Generator<V, void, unknown> {
    for (const [, value] of this) {
      yield value
    }
  }

  *[Symbol.iterator](): Generator<[K, V], void, unknown> {
    yield* this.entries()
  }

  get size(): number {
    if (!this._size) {
      return this.oldCache.size
    }

    let oldCacheSize = 0
    for (const key of this.oldCache.keys()) {
      if (!this.cache.has(key)) {
        oldCacheSize++
      }
    }

    return Math.min(this._size + oldCacheSize, this._maxSize)
  }

  get maxSize(): number {
    return this._maxSize
  }

  forEach(
    callback: (value: V, key: K, map: LRU<K, V>) => void,
    thisArg?: any
  ): void {
    for (const [key, value] of this.entries()) {
      callback.call(thisArg, value, key, this)
    }
  }

  toString(): string {
    return `QuickLRU_Optimized(${this.size}/${this._maxSize})`
  }
}
