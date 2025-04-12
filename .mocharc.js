process.env.NODE_ENV = 'test';

module.exports = {
    "spec": ["src/**/*.test.ts", "tests/**/*.test.ts"],
    "require": [
        "@swc-node/register"
    ],
    "recursive": true,
    "timeout": 5000,
    "ignore": [
        "node_modules"
    ]
}
