/* eslint-disable import/no-extraneous-dependencies */
const dedent = require('dedent')
const { help, sh } = require('tasksfile')

const deploy = (options = {}) => {
  const { preview = false } = options

  if (preview) {
    sh('lerna run deploy -- --preview', {
      nopipe: true,
    })
  } else {
    sh('lerna run deploy ', { nopipe: true })
  }
}

help(
  deploy,
  'Deploy all package-specific assets, such as storybook, docs, etc.',
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
