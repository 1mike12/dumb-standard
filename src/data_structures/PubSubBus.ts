// PubSubBus.ts

/**
 * A simple callback type that receives a message of type M
 */
export type OnPublish<M> = (message: M) => void;

/**
 * A pub/sub bus keyed by topics of type K,
 * letting you subscribe callbacks that get invoked
 * whenever you publish an M on that K.
 * 
 * @typeParam K - The topic key type (e.g., string, number, enum)
 * @typeParam M - The message type that will be published and received by subscribers
 */
export class PubSubBus<K, M> {
  private topics = new Map<K, Set<OnPublish<M>>>();

  /**
   * Start listening on `topic`.  If this is the first
   * subscriber for that key, a new Set is created.
   */
  subscribe(topic: K, fn: OnPublish<M>): void {
    let subs = this.topics.get(topic);
    if (!subs) {
      subs = new Set();
      this.topics.set(topic, subs);
    }
    subs.add(fn);
  }

  /**
   * Stop listening.  If it was the last subscriber,
   * the topic is removed altogether.
   */
  unsubscribe(topic: K, fn: OnPublish<M>): void {
    const subs = this.topics.get(topic);
    if (!subs || !subs.has(fn)) {
      throw new Error(`No such subscriber for topic ${String(topic)}`);
    }
    subs.delete(fn);
    if (subs.size === 0) {
      this.topics.delete(topic);
    }
  }

  /**
   * Broadcast `message` to all subscribers of that `topic`.
   * If no one's listening, silently does nothing.
   */
  publish(topic: K, message: M): void {
    const subs = this.topics.get(topic);
    if (!subs) return;
    for (const fn of subs) {
      try {
        fn(message);
      } catch (err) {
        console.error("Subscriber threw:", err);
      }
    }
  }

  /**
   * Optional helpers
   */
  hasSubscribers(topic: K): boolean {
    return (this.topics.get(topic)?.size ?? 0) > 0;
  }

  clear(topic?: K): void {
    if (topic === undefined) {
      this.topics.clear();
    } else {
      this.topics.delete(topic);
    }
  }
}
