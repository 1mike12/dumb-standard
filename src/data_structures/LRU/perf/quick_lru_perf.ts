import { LRU_Single_Map } from "./LRU_Single_Map";
import { LRU } from "../LRU";
import QuickLRU from "quick-lru";
import { Bench } from "tinybench";

// Configuration
const OPS_PER_ITERATION = 50000;
const ITERATIONS = 20;
const KEY_RANGE = 2000;
const CACHE_SIZE = 1000;

// Setup caches
const quickLRU = new QuickLRU({ maxSize: CACHE_SIZE });
const singleMapLRU = new LRU_Single_Map(CACHE_SIZE);
const originalLRU = new LRU(CACHE_SIZE);

// Generate keys
const keys = Array.from({ length: KEY_RANGE }, (_, i) => `key${i}`);

// Create benchmark functions
function benchmarkQuickLRU() {
    for (let i = 0; i < OPS_PER_ITERATION; i++) {
        const key = keys[Math.floor(Math.random() * KEY_RANGE)];
        if (Math.random() < 0.5) {
            quickLRU.get(key);
        } else {
            quickLRU.set(key, Math.random());
        }
    }
}

function benchmarkSingleMapLRU() {
    for (let i = 0; i < OPS_PER_ITERATION; i++) {
        const key = keys[Math.floor(Math.random() * KEY_RANGE)];
        if (Math.random() < 0.5) {
            singleMapLRU.get(key);
        } else {
            singleMapLRU.set(key, Math.random());
        }
    }
}

function benchmarkOriginalLRU() {
    for (let i = 0; i < OPS_PER_ITERATION; i++) {
        const key = keys[Math.floor(Math.random() * KEY_RANGE)];
        if (Math.random() < 0.5) {
            originalLRU.get(key);
        } else {
            originalLRU.set(key, Math.random());
        }
    }
}

async function runBenchmarks() {
    console.log(`${ITERATIONS} iterations with ${OPS_PER_ITERATION} operations per iteration`);
    console.log(`Cache size: ${CACHE_SIZE}, Key range: ${KEY_RANGE}\n`);

    const bench = new Bench({
        iterations: ITERATIONS,
        name: "LRU Cache Implementations Comparison"
    });

    bench.add("NPM Quick-LRU", benchmarkQuickLRU);
    bench.add("Our Single Map LRU", benchmarkSingleMapLRU);
    bench.add("Our LRU", benchmarkOriginalLRU);

    await bench.run();
    console.log(bench.name);
    console.table(bench.table());
}

runBenchmarks().catch(console.error);
