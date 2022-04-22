module.exports = {
  clearMocks: true,
  displayName: '@one-dev/ui',
  setupFilesAfterEnv: ['./.jest/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
}
