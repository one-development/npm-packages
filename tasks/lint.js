/* eslint-disable import/no-extraneous-dependencies */
const dedent = require('dedent')
const { help, sh } = require('tasksfile')

const lint = () => {
  sh('eslint . --report-unused-disable-directives', {
    nopipe: true,
  })
}

help(lint, 'Run the linter against all packages', {
  examples: dedent`
    yarn lint
  `,
})

module.exports = lint
