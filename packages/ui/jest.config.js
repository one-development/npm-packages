/* eslint-disable sort-keys */
module.exports = {
  clearMocks: true,
  displayName: '@one/ui',
  setupFilesAfterEnv: ['./.jest/setupTests.js'],
  transform: {
    '^.+\\.stories\\.jsx?$': '@storybook/addon-storyshots/injectFileName',
    '^.+\\.jsx?$': 'babel-jest',
  },
}
/* eslint-enable */
