/* eslint-disable import/no-extraneous-dependencies */
const dedent = require('dedent')
const { help, sh } = require('tasksfile')

const test = (options = {}, pattern = '') => {
  const {
    ci = false,
    coverage = false,
    once = false,
    only = null,
    updateSnapshot = false,
  } = options
  const opts = [
    only === 'unit' ? '.test.js' : null,
    only === 'integration' ? '.integration.js' : null,
    only === 'e2e' ? '.e2e.test.js' : null,
    ci ? '--ci' : '',
    coverage ? '--coverage' : '',
    once ? '' : '--watch',
    updateSnapshot ? '--updateSnapshot' : '',
    pattern,
  ].join(' ')

  sh(`cross-env BABEL_ENV=test NODE_ENV=test jest ${opts}`, { nopipe: true })
}

help(test, 'Run tests for all packages', {
  examples: dedent`
    yarn test
    yarn test --ci
    yarn test --coverage
    yarn test --once
    yarn test --only=unit
    yarn test --updateSnapshot
    yarn test --once --only=unit --updateSnapshot
    yarn test themes/utils
  `,
  options: {
    ci: 'Determines if tests are running in CI mode',
    coverage: 'Determines if code coverage should be generated',
    once: 'Determines if tests should run in watch more or just once',
    only: 'Determines if tests should be restricted to a specific type',
    updateSnapshot: 'Determines if React snapshots should be updated',
  },
  params: ['pattern'],
})

module.exports = test
