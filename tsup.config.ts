import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.test.ts", "!src/tests/**/*.ts"],
  format: ["cjs", "esm"],
  dts: {
    // By specifying the entry, tsup bundles the declarations
    // into a single index.d.ts file rather than duplicating it.
    entry: "src/index.ts",
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  // outExtension({format}) {
  //    return {
  //       js: format === 'esm' ? '.mjs' : '.js'
  //    }
  // },
})
