import { expect } from 'chai';
import { PubSubBus, OnPublish } from './PubSubBus';

describe('PubSubBus', () => {
  let bus: PubSubBus<string, number>;
  
  beforeEach(() => {
    bus = new PubSubBus<string, number>();
  });

  describe('subscribe', () => {
    it('should add a subscriber to a topic', () => {
      const subscriber  = (topic: string, msg: number) => {};
      bus.subscribe('test', subscriber);
      expect(bus.hasSubscribers('test')).to.be.true;
    });

    it('should create a new Set for first subscriber of a topic', () => {
      const subscriber = (topic: string, msg: number) => {};
      bus.subscribe('test', subscriber);
      expect(bus.hasSubscribers('test')).to.be.true;
    });
  });

  describe('unsubscribe', () => {
    it('should remove a subscriber from a topic', () => {
      const subscriber = (topic: string, msg: number) => {};
      bus.subscribe('test', subscriber);
      bus.unsubscribe('test', subscriber);
      expect(bus.hasSubscribers('test')).to.be.false;
    });

    it('should throw error when unsubscribing non-existent subscriber', () => {
      const subscriber = (topic: string, msg: number) => {};
      expect(() => bus.unsubscribe('test', subscriber)).to.throw('No such subscriber for topic test');
    });

    it('should remove topic when last subscriber is removed', () => {
      const subscriber = (topic: string, msg: number) => {};
      bus.subscribe('test', subscriber);
      bus.unsubscribe('test', subscriber);
      expect(bus.hasSubscribers('test')).to.be.false;
    });
  });

  describe('publish', () => {
    it('should call all subscribers with the topic and message', () => {
      let receivedTopic: string | undefined;
      let receivedMessage: number | undefined;
      const subscriber = (topic: string, msg: number) => { 
        receivedTopic = topic;
        receivedMessage = msg; 
      };
      
      bus.subscribe('test', subscriber);
      bus.publish('test', 42);
      
      expect(receivedTopic).to.equal('test');
      expect(receivedMessage).to.equal(42);
    });

    it('should handle multiple subscribers', () => {
      const results: Array<{topic: string, value: number}> = [];
      const subscriber1 = (topic: string, msg: number) => { 
        results.push({topic, value: msg}); 
      };
      const subscriber2 = (topic: string, msg: number) => { 
        results.push({topic, value: msg * 2}); 
      };
      
      bus.subscribe('test', subscriber1);
      bus.subscribe('test', subscriber2);
      bus.publish('test', 42);
      
      expect(results).to.deep.equal([
        {topic: 'test', value: 42},
        {topic: 'test', value: 84}
      ]);
    });

    it('should do nothing when no subscribers exist', () => {
      expect(() => bus.publish('test', 42)).to.not.throw();
    });

    it('should catch and log subscriber errors', () => {
      const error = new Error('Test error');
      const subscriber = (topic: string, msg: number) => { throw error; };
      
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
      const subscriber = (topic: string, msg: number) => {};
      bus.subscribe('test1', subscriber);
      bus.subscribe('test2', subscriber);
      
      bus.clear();
      
      expect(bus.hasSubscribers('test1')).to.be.false;
      expect(bus.hasSubscribers('test2')).to.be.false;
    });

    it('should clear specific topic when specified', () => {
      const subscriber = (topic: string, msg: number) => {};
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
        onMessage(topic: string, msg: string) {
          expect(topic).to.equal("my-topic");
          expect(msg).to.equal("test");
        }
      }
      const bus = new PubSubBus<string, string>();
      const topic = "my-topic";
      const myClass = new MyClass("test");
      bus.subscribe(topic, myClass.onMessage.bind(myClass));

      bus.publish(topic, "test");
    });
  });
}); 