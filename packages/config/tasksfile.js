/* eslint-disable import/no-extraneous-dependencies */
const dedent = require('dedent')
const { cli, help, sh } = require('tasksfile')
const { name } = require('./package.json')

const build = () => {
  sh('rm -fr ./dist', { nopipe: true })
  sh(
    `cross-env NODE_ENV=production BABEL_ENV=cjs babel --config-file ../../babel.config.js --verbose ./src -d ./dist`,
    {
      nopipe: true,
    }
  )
}

help(
  build,
  'Compile the src files for this project into a dist folder before publish/deploy',
  {
    examples: dedent`
    yarn workspace ${name} build
  `,
  }
)

cli({
  build,
})
