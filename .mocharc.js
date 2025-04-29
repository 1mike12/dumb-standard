process.env.NODE_ENV = "test"

// Check if specific test files were provided on the command line
// this prevents all tests being run when we are targeting a single file via the
// command flag `-t`
const hasSpecificTestFiles = process.argv
  .slice(2)
  .some((arg) => arg.endsWith(".ts") || arg.endsWith(".js"))

module.exports = {
  spec: hasSpecificTestFiles ? [] : ["src/**/*.test.ts", "tests/**/*.test.ts"],
  require: ["@swc-node/register"],
  recursive: true,
  timeout: 5000,
  ignore: ["node_modules"],
}
