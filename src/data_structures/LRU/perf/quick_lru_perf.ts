import { LRU_Single_Map } from "./LRU_Single_Map";
import { LRU } from "../LRU";
import QuickLRU from "quick-lru";

// Performance test
function benchmark(CacheClass: any, ops = 1e6, keyRange = 2000, cacheSize = 1000) {
    let cache;

    if (CacheClass === QuickLRU) {
        cache = new CacheClass({ maxSize: cacheSize });
    } else {
        cache = new CacheClass(cacheSize);
    }

    const keys = Array.from({ length: keyRange }, (_, i) => `key${i}`);
    const start = process.hrtime.bigint();
    for (let i = 0; i < ops; i++) {
        const key = keys[Math.floor(Math.random() * keyRange)];
        if (Math.random() < 0.5) {
            cache.get(key);
        } else {
            cache.set(key, i);
        }
    }
    const end = process.hrtime.bigint();
    return Number(end - start) / 1e6; // ms
}

// Run benchmarks
const OPS = 1e7;
const KEY_RANGE = 2000;
const CACHE_SIZE = 1000;

console.log(`Running ${OPS} operations on caches with size ${CACHE_SIZE} and key range ${KEY_RANGE}`);

const quickTime = benchmark(QuickLRU, OPS, KEY_RANGE, CACHE_SIZE);
const singleMapTime = benchmark(LRU_Single_Map, OPS, KEY_RANGE, CACHE_SIZE);
const originalTime = benchmark(LRU, OPS, KEY_RANGE, CACHE_SIZE);

// Find the slowest implementation to use as baseline
const maxTime = Math.max(quickTime, singleMapTime, originalTime);

// Calculate relative speeds
const quickSpeed = maxTime / quickTime;
const singleMapSpeed = maxTime / singleMapTime;
const originalSpeed = maxTime / originalTime;

// Output results with relative speeds
console.log(`NPM Quick-LRU: (${quickTime.toFixed(2)}ms) ${quickSpeed.toFixed(2)}x faster`);
console.log(`Our Single Map LRU: (${singleMapTime.toFixed(2)}ms) ${singleMapSpeed.toFixed(2)}x faster`);
console.log(`Our LRU: (${originalTime.toFixed(2)}ms) ${originalSpeed.toFixed(2)}x faster`);
