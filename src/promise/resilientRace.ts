/**
 * Creates multiple instances of a promise-returning function and resolves with the result of the first successful promise.
 * If all instances fail, rejects with an error containing the first error message.
 * 
 * @param factory A function that returns a Promise
 * @param instances The number of concurrent promise instances to create
 * @returns A promise that resolves with the first successful result or rejects if all promises fail
 * @throws Error if instances is zero or if all promise instances fail
 */
export function resilientRace<T>(factory: () => Promise<T>, instances: number): Promise<T> {
   if (instances === 0) {
      return Promise.reject(new Error('Cannot race with zero instances'));
   }

   return new Promise<T>((resolve, reject) => {
      let settled = false;
      const errors: Error[] = [];

      const promises = Array.from({ length: instances }, () =>
         factory()
            .then(result => {
               if (!settled) {
                  settled = true;
                  resolve(result);
               }
            })
            .catch(e => {
               // Store errors in the order they occur
               errors.push(e);

               // If all promises have failed, reject with the collected errors
               if (errors.length === instances && !settled) {
                  settled = true;
                  reject(new Error(`All ${instances} attempts failed. First error message: ${errors[0].message}`));
               }
            })
      );
   });
}
