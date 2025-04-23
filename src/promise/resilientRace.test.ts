import {expect} from 'chai';
import sinon from 'sinon';
import {resilientRace} from "./resilientRace";

// Helper to create a delayed promise
const delayedPromise = <T>(value: T, delay: number, shouldReject = false): Promise<T> => {
    return new Promise((resolve, reject) =>
        setTimeout(() => shouldReject ? reject(new Error(`Error: ${value}`)) : resolve(value), delay)
    );
}

describe('resilientRace', () => {

    it('should resolve with first successful result', async () => {
        const result = await resilientRace(() => Promise.resolve('success'), 3);
        expect(result).to.equal('success');
    });

    it('should reject if all attempts fail', async () => {
        const error = new Error('test error');
        try {
            await resilientRace(() => Promise.reject(error), 3);
            expect.fail('Should have thrown an error');
        } catch (e) {
            expect(e.message).to.include('All 3 attempts failed');
            expect(e.message).to.include('test error');
        }
    });

    it('should resolve even if some attempts fail', async () => {
        let callCount = 0;
        const factory = () => {
            callCount++;
            return callCount === 3 ? Promise.resolve('success') : Promise.reject(new Error('fail'));
        };

        const result = await resilientRace(factory, 3);
        expect(result).to.equal('success');
    });

    it('should handle timing correctly', async () => {
        const factory = () => {
            const delays = [30, 10, 20];
            return delayedPromise(`result-${delays[callCount++]}`, delays[callCount - 1]);
        };
        let callCount = 0;

        const result = await resilientRace(factory, 3);
        expect(result).to.equal('result-10');
    });

    it('should handle mixed timing and failures', async () => {
        const factory = () => {
            const outcomes = [
                {delay: 30, value: 'slow', fail: false},
                {delay: 1, value: 'fast', fail: true},
                {delay: 15, value: 'medium', fail: false}
            ];
            const current = outcomes[callCount++];
            return delayedPromise(current.value, current.delay, current.fail);
        };
        let callCount = 0;

        const result = await resilientRace(factory, 3);
        expect(result).to.equal('medium');
    });

    it('should respect the number of instances', async () => {
        const spy = sinon.spy(() => Promise.resolve('success'));
        await resilientRace(spy, 3);
        expect(spy.callCount).to.equal(3);
    });

    it('should maintain error collection order', async () => {
        let callCount = 0;
        const factory = () => {
            const delays = [30, 10, 20];
            return delayedPromise(`error-${delays[callCount++]}`, delays[callCount - 1], true);
        };

        try {
            await resilientRace(factory, 3);
            expect.fail('Should have thrown an error');
        } catch (e) {
            expect(e.message).to.include('error-10'); // First error should be from fastest rejection
        }
    });

    it("should have the right typing for a custom function", async () => {
        type MyType = {
            a: number;
        };
        function myCustomFunction () : Promise<MyType> {
            return Promise.resolve({a: 5});
        }
        const result = await resilientRace(myCustomFunction, 3);
        expect(result.a).to.equal(5);
    });
});
