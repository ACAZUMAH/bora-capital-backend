/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The glob patterns Jest uses to detect test files
  testMatch: ["<rootDir>/tests/unit/**", "<rootDir>/tests/integration/**"],

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  watchPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
  },
};
