/**
 * we use this so that tweets that we see dont grow infinitely since we only need to blacklist ids for the short term
 */
export class ExpiringSet<T> {
  private items: Map<T, number> = new Map()
  private evictionQueue: Array<[T, number]> = []
  private readonly ttlMs: number

  constructor(ttlMS: number) {
    this.ttlMs = ttlMS
  }

  add(item: T): void {
    this.evictStale()
    const timestamp = Date.now()
    this.items.set(item, timestamp)
    this.evictionQueue.push([item, timestamp])
  }

  addAll(items: T[]): void {
    for (const item of items) {
      this.add(item)
    }
  }

  has(item: T): boolean {
    this.evictStale()
    return this.items.has(item)
  }

  delete(item: T): boolean {
    return this.items.delete(item)
  }

  private evictStale(): void {
    const now = Date.now()
    while (
      this.evictionQueue.length > 0 &&
      now - this.evictionQueue[0][1] > this.ttlMs
    ) {
      const [item] = this.evictionQueue.shift()!
      this.items.delete(item)
    }
  }

  get size(): number {
    this.evictStale()
    return this.items.size
  }
}
