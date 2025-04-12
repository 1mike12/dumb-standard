export function promiseOnce<T>(callback: () => Promise<T>): () => Promise<T> {
   const handlers: Array<[(value: T) => void, (error: any) => void]> = [];
   let ready = false;
   let cachedResult: T;
   let cachedError: any;
   let hasError = false;

   return () => {
      if (ready) {
         return hasError ? Promise.reject(cachedError) : Promise.resolve(cachedResult);
      }

      return new Promise<T>((resolve, reject) => {
         if (handlers.length === 0) {
            callback()
            .then((result) => {
               cachedResult = result;
               ready = true;
               for (const [r] of handlers) {
                  r(result);
               }
            })
            .catch((error) => {
               cachedError = error;
               hasError = true;
               ready = true;
               for (const [, r] of handlers) {
                  r(error);
               }
            });
         }
         handlers.push([resolve, reject]);
      });
   };
}
