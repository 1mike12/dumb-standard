export function promiseOnce<T>(callback: () => Promise<T>): () => Promise<T> {
  let ready = false
  let cachedResult: T
  let cachedError: any
  let hasError = false
  let pendingPromise: Promise<T> | null = null

  return () => {
    if (ready) {
      return hasError
        ? Promise.reject(cachedError)
        : Promise.resolve(cachedResult)
    }

    if (!pendingPromise) {
      pendingPromise = callback()
        .then((result) => {
          cachedResult = result
          ready = true
          pendingPromise = null
          return result
        })
        .catch((error) => {
          cachedError = error
          hasError = true
          ready = true
          pendingPromise = null
          throw error
        })
    }

    return pendingPromise
  }
}
