/**
 * Returns a function that returns the next item in the array and will loop back to the start indefinitely
 * @param items
 * @param randomStart
 * @returns
 */
export function createArrayLooper<T>(items: T[], randomStart = false) {
    let index: number | undefined;

    function next(): T {
        if (index === undefined) {
            index = randomStart
                ? Math.floor(Math.random() * items.length)
                : 0;
        } else {
            index = (index + 1) % items.length;
        }
        return items[index];
    }

    next.getIndex = function () {
        return index || -1
    };

    return next
}
