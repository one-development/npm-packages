/* eslint-disable import/no-extraneous-dependencies */
const dedent = require('dedent')
const { help, sh } = require('tasksfile')

const release = (options = {}) => {
  const { canary = false } = options

  const releaseFlags = [
    ' --yes',
    ' --preid alpha',
    ' --no-commit-hooks',
    ' --conventional-commits',
    // Needed for NPM automation tokens: https://github.com/lerna/lerna/issues/2788
    ' --no-verify-access',
    canary ? ' --canary' : '',
  ].join('')

  sh(`lerna publish ${releaseFlags}`, { nopipe: true })
}

help(
  release,
  'release all packages to NPM registry and release package-specific files',
  {
    examples: dedent`
      yarn release
      yarn release --canary
    `,
    options: {
      canary: 'Determines if the release is for a pre-release',
    },
  }
)

module.exports = release
