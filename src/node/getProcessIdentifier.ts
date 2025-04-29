import os from "os"

/**
 * We use this for distributed job workers to identify themselves in the queue system.
 * This helps track which worker is processing which job, particularly useful for debugging
 * and monitoring in a multi-worker environment.
 *
 * @returns A string identifier that uniquely identifies this process
 */
export function getProcessIdentifier() {
  // Try Fly.io identifier first
  // Example: "fly-1a2b3c4d5e6f"
  if (process.env.FLY_ALLOC_ID) {
    return `fly-${process.env.FLY_ALLOC_ID}`
  }

  // Docker by default sets HOSTNAME to the short container ID (first 12 chars)
  // Example: "docker-7df3b20a54e9"
  if (process.env.HOSTNAME) {
    return `docker-${process.env.HOSTNAME}`
  }

  // Fallback to hostname + pid for local development
  // Example: "local-macbook-pro-12345" or "local-dev-machine-3857"
  return `local-${os.hostname()}-${process.pid}`
}
