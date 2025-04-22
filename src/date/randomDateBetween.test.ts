import { expect } from "chai";
import { randomDateBetween } from "./randomDateBetween";

describe('randomDateBetween', () => {
  it('should return a date between two dates', () => {
    const startDate = new Date('2021-01-01');
    const endDate = new Date('2021-01-05');
    const randomDate = randomDateBetween(startDate, endDate);
    expect(randomDate).to.be.greaterThan(startDate);
    expect(randomDate).to.be.lessThan(endDate);
  });

  it('should return a date between two dates with no end date', () => {
    const startDate = new Date('2021-01-01');
    const randomDate = randomDateBetween(startDate);
    expect(randomDate).to.be.greaterThan(startDate);
    expect(randomDate).to.be.lessThan(new Date());
  });
});
