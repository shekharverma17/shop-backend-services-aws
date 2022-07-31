module.exports = {
  clearMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  testEnvironment: "node",
  testMatch: [
    "**/functions/**/**/*.test.ts" //"**/unit/**/*.test.ts"
  ],
};
