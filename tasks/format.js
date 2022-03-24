/* eslint-disable import/no-extraneous-dependencies */
const dedent = require('dedent')
const { help, sh } = require('tasksfile')

const fileExtensions =
  '**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|mdx|graphql|vue)'

const format = () => {
  sh(`prettier --write "${fileExtensions}"`, { nopipe: true })
}

help(format, 'Run the code formatter against all packages', {
  examples: dedent`
    yarn format
  `,
})

module.exports = format
