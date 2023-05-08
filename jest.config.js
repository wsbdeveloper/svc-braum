/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  collectCoverageFrom: ["src/**/*.ts"],
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 98,
      statements: -10,
    },
  },
};
