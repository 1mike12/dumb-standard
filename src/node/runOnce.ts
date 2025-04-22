/**
 * Wraps a function so that it can only be called once.
 * Subsequent calls to the wrapped function will return a cached result.
 *
 * @template T The type of the function to be wrapped
 * @param {T} fn The function to execute only once
 * @returns {(...args: Parameters<T>) => ReturnType<T>} A wrapped function that calls the original function only once
 */
export function runOnce<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> {
    let ran = false;
    let result: ReturnType<T>;
    return function (...args: Parameters<T>): ReturnType<T> {
        if (!ran) {
            ran = true;
            result = fn(...args);
        }
        return result;
    };
}
