module.exports = {
  collectCoverageFrom: ['**/*.{ts,tsx,js,jsx}'],
  coverageReporters: ['json', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
