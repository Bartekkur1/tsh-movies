/*eslint-disable */
export default {
  clearMocks: true,
  coverageProvider: "v8",
  rootDir: "./",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)"
  ]
};
/*eslint-enable */