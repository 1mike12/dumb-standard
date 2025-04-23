import { expect } from 'chai';
import sinon from 'sinon';
import {LogBook} from "./LogBook";

describe('LogBook', () => {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    // Use Sinon to create a fixed timestamp for testing
    clock = sinon.useFakeTimers(new Date('2023-05-15T12:00:00Z').getTime());
  });

  afterEach(() => {
    // Restore the clock after each test
    clock.restore();
  });

  it('should respect the timezone set in constructor', () => {

    // Create logbooks with different timezones
    const newYorkLogbook = new LogBook('America/New_York');
    const tokyoLogbook = new LogBook('Asia/Tokyo');
    const londonLogbook = new LogBook('Europe/London');

    // Log the same message in all logbooks at the same time
    newYorkLogbook.add('Test message');
    tokyoLogbook.add('Test message');
    londonLogbook.add('Test message');

    // Check that the time portion differs according to timezone
    const newYorkOutput = newYorkLogbook.toString();
    const tokyoOutput = tokyoLogbook.toString();
    const londonOutput = londonLogbook.toString();

    // Extract formatted dates
    const newYorkDate = newYorkOutput.split(' ')[0];
    const tokyoDate = tokyoOutput.split(' ')[0];
    const londonDate = londonOutput.split(' ')[0];

    // Verify timezone offsets are different
    expect(newYorkDate).to.include('-04:00'); // New York (EDT)
    expect(tokyoDate).to.include('+09:00');   // Tokyo
    expect(londonDate).to.include('+01:00');  // London (BST)

    // Verify time components
    // For a 12:00 UTC time:
    // New York should be 08:00 (UTC-4 during DST)
    // Tokyo should be 21:00 (UTC+9)
    // London should be 13:00 (UTC+1 during DST)
    expect(newYorkDate).to.include('2023-05-15T08:00:00');
    expect(tokyoDate).to.include('2023-05-15T21:00:00');
    expect(londonDate).to.include('2023-05-15T13:00:00');
  });

  it('should use America/New_York timezone by default', () => {
    const logbook = new LogBook();
    logbook.add('Default timezone test');

    const output = logbook.toString();

    // For a 12:00 UTC time, New York should be 08:00 (UTC-4 during DST)
    expect(output).to.include('2023-05-15T08:00:00-04:00');
  });

  it('should correctly format multiple log entries', () => {
    const logbook = new LogBook('UTC');

    // Log first message
    logbook.add('First message');

    // Advance time by 1 hour
    clock.tick(60 * 60 * 1000);

    // Log second message
    logbook.add('Second message');

    const output = logbook.toString();
    const lines = output.split('\n');

    // Should have two lines
    expect(lines).to.have.length(2);

    // First line should have the initial time
    expect(lines[0]).to.include('2023-05-15T12:00:00');
    expect(lines[0]).to.include('First message');

    // Second line should have time one hour later
    expect(lines[1]).to.include('2023-05-15T13:00:00');
    expect(lines[1]).to.include('Second message');
  });
});
