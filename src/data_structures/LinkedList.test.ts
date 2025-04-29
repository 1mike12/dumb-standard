import { expect } from "chai"
import { LinkedList, LL_Node } from "./LinkedList"

describe("LinkedList", () => {
  let list: LinkedList<number>

  beforeEach(() => {
    list = new LinkedList()
  })

  describe("constructor", () => {
    it("initializes head and tail nodes", () => {
      expect(list).to.have.property("head")
      expect(list).to.have.property("tail")
    })

    it("sets head and tail nodes to sentinel nodes", () => {
      expect(list.head!.key).to.be.null
      expect(list.tail!.key).to.be.null
    })
  })

  describe("addToFront", () => {
    it("adds node to front of list", () => {
      const node = new LL_Node(1)
      list.addToFront(node)
      expect(list.head!.next).to.equal(node)
    })

    it("updates prev and next pointers of new node", () => {
      const node = new LL_Node(1)
      list.addToFront(node)
      expect(node.prev).to.equal(list.head)
      expect(node.next).to.equal(list.tail)
    })
  })

  describe("removeNode", () => {
    it("removes node from list", () => {
      const node = new LL_Node(1)
      list.addToFront(node)
      list.removeNode(node)
      expect(list.head!.next).to.equal(list.tail)
    })

    it("updates prev and next pointers of adjacent nodes", () => {
      const node1 = new LL_Node(1)
      const node2 = new LL_Node(2)
      list.addToFront(node1)
      list.addToFront(node2)
      list.removeNode(node2)
      expect(node1.prev).to.equal(list.head)
      expect(node1.next).to.equal(list.tail)
    })
  })

  describe("getTail", () => {
    it("returns tail node", () => {
      expect(list.getTail()).to.equal(list.tail!.prev)
    })
  })
})
