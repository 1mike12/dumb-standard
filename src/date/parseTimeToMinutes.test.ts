import { expect } from "chai";
import { parseTimeToMinutes } from "./parseTimeToMinutes";

describe("parseTime", () => {
  it("should parse a valid time", () => {
    expect(parseTimeToMinutes("00:00")).equals(0)
  });
  it("should parse one minute past midnight", () => {
    expect(parseTimeToMinutes("00:01")).equals(1)
  });
  it("should parse one hour past midnight", () => {
    expect(parseTimeToMinutes("01:00")).equals(60)
  });
});
