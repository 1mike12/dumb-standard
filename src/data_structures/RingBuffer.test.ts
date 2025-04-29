import { expect } from "chai"
import { RingBuffer } from "./RingBuffer"

describe("RingBuffer", () => {
  it("should initialize empty", () => {
    const log = new RingBuffer<string>(3)
    expect(log.size).to.equal(0)
    expect(log.toArray()).to.deep.equal([])
  })

  it("should not infintely increase the index when adding lots of stuff", () => {
    const log = new RingBuffer<number>(1)
    for (let i = 0; i < 100; i++) {
      log.push(i)
    }
    expect(log.currentIndex).lessThan(10)
  })

  it("should maintain order when not full", () => {
    const log = new RingBuffer<string>(3)
    log.push("A")
    log.push("B")
    log.push("C")
    expect(log.toArray()).to.deep.equal(["A", "B", "C"])
  })

  it("should overwrite oldest items when full", () => {
    const log = new RingBuffer<string>(3)
    log.push("A")
    log.push("B")
    log.push("C")
    log.push("D")
    expect(log.size).to.equal(3)
    expect(log.toArray()).to.deep.equal(["B", "C", "D"])
  })

  it("should handle multiple overwrites", () => {
    const log = new RingBuffer<string>(3)
    log.push("A")
    log.push("B")
    log.push("C")
    log.push("D")
    log.push("E")
    expect(log.toArray()).to.deep.equal(["C", "D", "E"])
  })

  it("should work with different data types", () => {
    const numLog = new RingBuffer<number>(2)
    numLog.push(1)
    numLog.push(2)
    numLog.push(3)
    expect(numLog.toArray()).to.deep.equal([2, 3])
  })

  it("should return less elements if not at capacity", () => {
    const log = new RingBuffer<string>(3)
    log.push("A")
    expect(log.toArray()).to.deep.equal(["A"])
  })

  describe("map", () => {
    it("should map elements in order from oldest to newest", () => {
      const buffer = new RingBuffer<number>(5)

      // Add elements
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)

      // Map each element to its square
      const result = buffer.map((item) => item * item)

      expect(result).to.deep.equal([1, 4, 9])
    })

    it("should handle a full buffer", () => {
      const buffer = new RingBuffer<number>(3)

      // Fill the buffer
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)
      buffer.push(4) // This will overwrite 1

      // Map each element to its square
      const result = buffer.map((item) => item * item)

      expect(result).to.deep.equal([4, 9, 16])
    })
  })

  describe("mapReverse", () => {
    it("should map elements in reverse order from newest to oldest", () => {
      const buffer = new RingBuffer<number>(5)

      // Add elements
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)

      // Map each element to its square in reverse order
      const result = buffer.mapReverse((item) => item * item)

      expect(result).to.deep.equal([9, 4, 1])
    })

    it("should handle a full buffer", () => {
      const buffer = new RingBuffer<number>(3)

      // Fill the buffer
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)
      buffer.push(4) // This will overwrite 1

      // Map each element to its square in reverse order
      const result = buffer.mapReverse((item) => item * item)

      expect(result).to.deep.equal([16, 9, 4])
    })
  })

  describe("reverse()", () => {
    it("should iterate empty buffer correctly", () => {
      const buffer = new RingBuffer<number>(5)
      const result = [...buffer.reverse()]
      expect(result).to.deep.equal([])
    })

    it("should iterate partially filled buffer in reverse", () => {
      const buffer = new RingBuffer<number>(5)
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)

      const result = [...buffer.reverse()]
      expect(result).to.deep.equal([3, 2, 1])
    })

    it("should iterate fully filled buffer in reverse", () => {
      const buffer = new RingBuffer<number>(3)
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)

      const result = [...buffer.reverse()]
      expect(result).to.deep.equal([3, 2, 1])
    })

    it("should iterate wrapped buffer in reverse", () => {
      const buffer = new RingBuffer<number>(3)
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)
      buffer.push(4)
      buffer.push(5)

      // After pushing [1,2,3,4,5] into a buffer of size 3:
      // The buffer should contain [4,5,3] with currentIndex at 2
      // When iterating in reverse order, it should return [2,1,0] indices
      // which correspond to [3,5,4] in the buffer
      const result = [...buffer.reverse()]
      expect(result).to.deep.equal([5, 4, 3])
    })
  })

  describe("forEachReverse()", () => {
    it("should iterate empty buffer correctly", () => {
      const buffer = new RingBuffer<number>(5)
      const result: number[] = []
      const indices: number[] = []

      buffer.forEachReverse((item, index) => {
        result.push(item)
        indices.push(index)
      })

      expect(result).to.deep.equal([])
      expect(indices).to.deep.equal([])
    })

    it("should iterate partially filled buffer in reverse with index", () => {
      const buffer = new RingBuffer<number>(5)
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)

      const result: number[] = []
      const indices: number[] = []

      buffer.forEachReverse((item, index) => {
        result.push(item)
        indices.push(index)
      })

      expect(result).to.deep.equal([3, 2, 1])
      expect(indices).to.deep.equal([0, 1, 2])
    })

    it("should iterate fully filled buffer in reverse with index", () => {
      const buffer = new RingBuffer<number>(3)
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)

      const result: number[] = []
      const indices: number[] = []

      buffer.forEachReverse((item, index) => {
        result.push(item)
        indices.push(index)
      })

      expect(result).to.deep.equal([3, 2, 1])
      expect(indices).to.deep.equal([0, 1, 2])
    })

    it("should iterate wrapped buffer in reverse with index", () => {
      const buffer = new RingBuffer<number>(3)
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)
      buffer.push(4)
      buffer.push(5)

      // After pushing [1,2,3,4,5] into a buffer of size 3:
      // The buffer should contain [4,5,3] with currentIndex at 2
      // When iterating in reverse order, it should return [5,4,3]
      const result: number[] = []
      const indices: number[] = []

      buffer.forEachReverse((item, index) => {
        result.push(item)
        indices.push(index)
      })

      expect(result).to.deep.equal([5, 4, 3])
      expect(indices).to.deep.equal([0, 1, 2])
    })
  })

  describe("forEach", () => {
    it("should execute callback for each element in order from oldest to newest", () => {
      const buffer = new RingBuffer<number>(5)
      const results: number[] = []

      // Add elements
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)

      // Execute callback for each element
      buffer.forEach((item, index) => {
        results.push(item * (index + 1))
      })

      expect(results).to.deep.equal([1, 4, 9])
    })

    it("should handle a full buffer", () => {
      const buffer = new RingBuffer<number>(3)
      const results: number[][] = []

      // Fill the buffer
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)
      buffer.push(4) // This will overwrite 1

      // Execute callback for each element
      buffer.forEach((item, index) => {
        results.push([index, item])
      })

      expect(results).to.deep.equal([
        [0, 2],
        [1, 3],
        [2, 4],
      ])
    })
  })
  describe("RingBuffer first() and last()", () => {
    it("should be replaced with peekOldest and peekNewest tests", () => {
      expect(true).to.be.true
    })
  })

  describe("RingBuffer peekOldest and peekNewest", () => {
    it("should return undefined for peekOldest and peekNewest when buffer is empty", () => {
      const buffer = new RingBuffer<number>(3)
      expect(buffer.peekOldest()).to.be.undefined
      expect(buffer.peekNewest()).to.be.undefined
    })

    it("should return the same value for peekOldest and peekNewest when buffer has one element", () => {
      const buffer = new RingBuffer<number>(3)
      buffer.push(42)
      expect(buffer.peekOldest()).to.equal(42)
      expect(buffer.peekNewest()).to.equal(42)
    })

    it("should return correct peekOldest and peekNewest for partially filled buffer", () => {
      const buffer = new RingBuffer<number>(5)
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)

      expect(buffer.peekOldest()).to.equal(1)
      expect(buffer.peekNewest()).to.equal(3)
    })

    it("should return correct peekOldest and peekNewest for full buffer", () => {
      const buffer = new RingBuffer<number>(3)
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)

      expect(buffer.peekOldest()).to.equal(1)
      expect(buffer.peekNewest()).to.equal(3)
    })

    it("should return correct peekOldest and peekNewest for wrapped buffer", () => {
      const buffer = new RingBuffer<number>(3)
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)
      buffer.push(4)
      buffer.push(5)

      // After pushing [1,2,3,4,5] into a buffer of size 3:
      // The buffer should contain [3,4,5] with currentIndex at 0
      expect(buffer.peekOldest()).to.equal(3)
      expect(buffer.peekNewest()).to.equal(5)
    })

    it("should handle edge case when currentIndex is at the beginning", () => {
      const buffer = new RingBuffer<number>(3)
      buffer.push(1)
      buffer.push(2)
      buffer.push(3)
      buffer.push(4)

      // After pushing [1,2,3,4] into a buffer of size 3:
      // The buffer should contain [2,3,4] with currentIndex at 1
      expect(buffer.peekOldest()).to.equal(2)
      expect(buffer.peekNewest()).to.equal(4)
    })
  })

  describe("getOldestIndex", () => {
    it("should work", () => {
      const buffer = new RingBuffer<number>(3)
      expect(buffer.getOldestIndex()).equal(0)
      buffer.push(1)
      buffer.push(2)
      expect(buffer.getOldestIndex()).equal(0)
      buffer.push(3)
      expect(buffer.getOldestIndex()).equal(0)
      buffer.push(4)
      expect(buffer.getOldestIndex()).equal(1)
      buffer.push(5)
      expect(buffer.getOldestIndex()).equal(2)
      buffer.push(6)
      expect(buffer.getOldestIndex()).equal(0)
    })
  })

  describe("getNewestIndex", () => {
    it("should work", () => {
      const buffer = new RingBuffer<number>(3)
      expect(buffer.getNewestIndex()).equal(0)
      buffer.push(1)
      expect(buffer.getNewestIndex()).equal(0)
      buffer.push(2)
      expect(buffer.getNewestIndex()).equal(1)
      buffer.push(3)
      expect(buffer.getNewestIndex()).equal(2)
      buffer.push(4)
      expect(buffer.getNewestIndex()).equal(0)
    })
  })
})
