import {shapiroWilk} from "./shapiroWilk"
import {expect} from "chai";

describe("calculateShapiroWilk", function () {
   it("should return badly for uniform distribution", function () {
      const data: number[] = []
      for (let i = 0; i < 100; i++) {
         data.push(Math.random() * 100)
      }
      const w = shapiroWilk(data)
      const criticalValue = 200
      expect(w).lessThanOrEqual(criticalValue)
   })
})
