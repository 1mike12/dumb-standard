import { expect } from 'chai';
import { PubSubBus, OnPublish } from './PubSubBus';

describe('PubSubBus', () => {
  let bus: PubSubBus<string, number>;
  
  beforeEach(() => {
    bus = new PubSubBus<string, number>();
  });

  describe('subscribe', () => {
    it('should add a subscriber to a topic', () => {
      const subscriber: OnPublish<number> = (msg) => {};
      bus.subscribe('test', subscriber);
      expect(bus.hasSubscribers('test')).to.be.true;
    });

    it('should create a new Set for first subscriber of a topic', () => {
      const subscriber: OnPublish<number> = (msg) => {};
      bus.subscribe('test', subscriber);
      expect(bus.hasSubscribers('test')).to.be.true;
    });
  });

  describe('unsubscribe', () => {
    it('should remove a subscriber from a topic', () => {
      const subscriber: OnPublish<number> = (msg) => {};
      bus.subscribe('test', subscriber);
      bus.unsubscribe('test', subscriber);
      expect(bus.hasSubscribers('test')).to.be.false;
    });

    it('should throw error when unsubscribing non-existent subscriber', () => {
      const subscriber: OnPublish<number> = (msg) => {};
      expect(() => bus.unsubscribe('test', subscriber)).to.throw('No such subscriber for topic test');
    });

    it('should remove topic when last subscriber is removed', () => {
      const subscriber: OnPublish<number> = (msg) => {};
      bus.subscribe('test', subscriber);
      bus.unsubscribe('test', subscriber);
      expect(bus.hasSubscribers('test')).to.be.false;
    });
  });

  describe('publish', () => {
    it('should call all subscribers with the message', () => {
      let receivedMessage: number | undefined;
      const subscriber: OnPublish<number> = (msg) => { receivedMessage = msg; };
      
      bus.subscribe('test', subscriber);
      bus.publish('test', 42);
      
      expect(receivedMessage).to.equal(42);
    });

    it('should handle multiple subscribers', () => {
      const messages: number[] = [];
      const subscriber1: OnPublish<number> = (msg) => { messages.push(msg); };
      const subscriber2: OnPublish<number> = (msg) => { messages.push(msg * 2); };
      
      bus.subscribe('test', subscriber1);
      bus.subscribe('test', subscriber2);
      bus.publish('test', 42);
      
      expect(messages).to.deep.equal([42, 84]);
    });

    it('should do nothing when no subscribers exist', () => {
      expect(() => bus.publish('test', 42)).to.not.throw();
    });

    it('should catch and log subscriber errors', () => {
      const error = new Error('Test error');
      const subscriber: OnPublish<number> = () => { throw error; };
      
      // Spy on console.error
      const originalError = console.error;
      let loggedError: any;
      console.error = (...args: any[]) => { loggedError = args[1]; };
      
      bus.subscribe('test', subscriber);
      bus.publish('test', 42);
      
      expect(loggedError).to.equal(error);
      
      // Restore console.error
      console.error = originalError;
    });
  });

  describe('clear', () => {
    it('should clear all topics when no topic specified', () => {
      const subscriber: OnPublish<number> = (msg) => {};
      bus.subscribe('test1', subscriber);
      bus.subscribe('test2', subscriber);
      
      bus.clear();
      
      expect(bus.hasSubscribers('test1')).to.be.false;
      expect(bus.hasSubscribers('test2')).to.be.false;
    });

    it('should clear specific topic when specified', () => {
      const subscriber: OnPublish<number> = (msg) => {};
      bus.subscribe('test1', subscriber);
      bus.subscribe('test2', subscriber);
      
      bus.clear('test1');
      
      expect(bus.hasSubscribers('test1')).to.be.false;
      expect(bus.hasSubscribers('test2')).to.be.true;
    });
  });

  describe("other stuff", () => {
    it("should be able to pass in my custom class", () => {
      class MyClass {
        constructor(public readonly name: string) {}
        onMessage(msg: string) {
          expect(msg).to.equal("test");
        }
      }
      const bus = new PubSubBus<string, string>();
      const topic = "my-topic";
      const myClass = new MyClass("test");
      bus.subscribe(topic, myClass.onMessage);

      bus.publish(topic, "test");
    });
  });
}); 