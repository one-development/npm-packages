module.exports = {
  clearMocks: true,
  displayName: '@one/ui',
  setupFilesAfterEnv: ['./.jest/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
}
