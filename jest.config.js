module.exports = {
  collectCoverageFrom: ['**/src/**/*.{js,jsx}', '!**/node_modules/**'],
  coverageDirectory: '<rootDir>/reports/coverage',
  projects: [
    '<rootDir>/packages/*',
    {
      displayName: 'integration',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/test/integration/*.js'],
    },
  ],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: 'reports/test-report.html',
        pageTitle: 'PARKCORE!',
        sort: 'titleAsc',
      },
    ],
    [
      'jest-junit',
      {
        outputDirectory: 'reports/test-results/jest',
        outputName: 'results.xml',
      },
    ],
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
}
