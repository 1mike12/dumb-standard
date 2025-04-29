export class LinkedList<K> {
  head: LL_Node<K | null> | null
  tail: LL_Node<K | null> | null

  constructor() {
    this.head = new LL_Node(null)
    this.tail = new LL_Node(null)
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  addToFront(node: LL_Node<K>): void {
    node.prev = this.head
    node.next = this.head!.next
    this.head!.next!.prev = node
    this.head!.next = node
  }

  removeNode(node: LL_Node<K>): void {
    node.prev!.next = node.next
    node.next!.prev = node.prev
  }

  getTail() {
    return this.tail!.prev
  }
}

export class LL_Node<K> {
  public key: K
  public value: any
  public prev: LL_Node<K | null> | null
  public next: LL_Node<K | null> | null

  constructor(key: K, value?: any) {
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}
