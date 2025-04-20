import {expect} from "chai";
import {LRU_Single_Map} from "./LRU_Single_Map";

describe("LRU", () => {
   it("should bump older values", () => {
      const lru = new LRU_Single_Map(2)
      lru.set("a", 1)
      expect(lru.get("a")).to.equal(1)
      lru.set("b", 2)
      expect(lru.get("b")).to.equal(2)
      lru.set("c", 3)
      expect(lru.get("a")).to.equal(undefined)
   });

   it("should evict the oldest item when the cache is full", () => {
      const lru = new LRU_Single_Map(2);
      lru.set("a", 1);
      lru.set("b", 2);
      lru.set("c", 3);
      expect(lru.get("a")).to.equal(undefined);
      expect(lru.get("b")).to.equal(2);
      expect(lru.get("c")).to.equal(3);
   });

   it("should bump items up just via gets", () => {
      const lru = new LRU_Single_Map(2);
      lru.set("a", 1);
      lru.set("b", 2);
      lru.get("a");
      lru.set("c", 3);
      expect(lru.get("b")).to.equal(undefined);
      expect(lru.get("a")).to.equal(1);
      expect(lru.get("c")).to.equal(3);
   })
});
