/* eslint-disable import/no-extraneous-dependencies */
const dedent = require('dedent')
const { help, sh } = require('tasksfile')

const deploy = () => {
  const flags = [
    ' --yes',
    ' --preid alpha',
    ' --no-commit-hooks',
    ' --conventional-commits',
    ` --registry ${process.env.NPM_REGISTRY}`,
  ].join('')

  sh(`lerna publish ${flags}`, { nopipe: true })

  // Packages shouldn't deploy assets (i.e. docs) until after publish has succeeded
  sh('lerna run deploy', { nopipe: true })
}

help(
  deploy,
  'Deploy all packages to NPM registry and publish package-specific files',
  {
    examples: dedent`
      yarn deploy
    `,
  }
)

module.exports = deploy
