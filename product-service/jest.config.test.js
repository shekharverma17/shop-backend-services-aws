module.exports = {
  clearMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  testEnvironment: "node",
  preset: 'ts-jest',
  testMatch: [
    "**/*.spec.ts" 
  ],
};
