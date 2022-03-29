/* eslint-disable import/no-extraneous-dependencies */
const dedent = require('dedent')
const { help, sh } = require('tasksfile')

const build = (options = {}) => {
  const { scope } = options

  if (scope) {
    sh(`lerna run build --scope ${scope}`, { nopipe: true })
  } else {
    sh('lerna run build', { nopipe: true })
  }
}

help(build, 'Build one or more packages for deployment', {
  examples: dedent`
    yarn build
    yarn build --scope=@one/ui
  `,
  options: {
    scope: 'The name of a single package to build',
  },
})

module.exports = build
