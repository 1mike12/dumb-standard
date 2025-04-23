import * as process from "process"

export class MemoryDebugger {
  private maxMemoryUsage: Record<string, number>
  private memoryCheckInterval: NodeJS.Timeout | null
  private intervalMillis: number

  constructor(intervalMillis: number) {
    this.maxMemoryUsage = { rss: 0, heapTotal: 0, heapUsed: 0, external: 0, arrayBuffers: 0 }
    this.memoryCheckInterval = null
    this.intervalMillis = intervalMillis
  }

  private updateMaxMemoryUsage(): void {
    const currentMemoryUsage = process.memoryUsage()
    for (let key in currentMemoryUsage) {
      if (currentMemoryUsage[key as keyof NodeJS.MemoryUsage] > this.maxMemoryUsage[key]) {
        this.maxMemoryUsage[key] = currentMemoryUsage[key as keyof NodeJS.MemoryUsage]
      }
    }
  }

  startMonitoring() {
    if (this.memoryCheckInterval === null) {
      this.memoryCheckInterval = setInterval(() => this.updateMaxMemoryUsage(), this.intervalMillis)
    }
    return this
  }

  stopMonitoring(){
    if (this.memoryCheckInterval) {
      clearInterval(this.memoryCheckInterval)
      this.memoryCheckInterval = null
    }
    return this
  }

  print(): void {
    if (this.memoryCheckInterval) {
      clearInterval(this.memoryCheckInterval)
      this.memoryCheckInterval = null
    }
    console.log("Maximum memory usage:")
    for (let key in this.maxMemoryUsage) {
      console.log(`${key}: ${Math.round(this.maxMemoryUsage[key] / 1024 / 1024 * 100) / 100} MB`)
    }
  }
}
