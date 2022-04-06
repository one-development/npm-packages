/* eslint-disable import/no-extraneous-dependencies */
const dedent = require('dedent')
const { help, sh } = require('tasksfile')

const deploy = (options = {}) => {
  const { preview = false } = options

  if (!preview) {
    const publishFlags = [
      ' --yes',
      ' --canary',
      ' --preid alpha',
      ' --no-commit-hooks',
      ' --conventional-commits',
    ].join('')

    sh(`lerna publish ${publishFlags}`, { nopipe: true })
  }

  // Packages shouldn't deploy assets (i.e. docs) until after publish has succeeded
  sh(`lerna run deploy ${preview ? '-- --preview' : ''}`, { nopipe: true })
}

help(
  deploy,
  'Deploy all packages to NPM registry and publish package-specific files',
  {
    examples: dedent`
      yarn deploy
      yarn deploy --preview
    `,
    options: {
      preview: 'Determines if the deploy is to a preview environment',
    },
  }
)

module.exports = deploy
