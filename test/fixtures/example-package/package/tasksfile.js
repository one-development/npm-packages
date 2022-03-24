// eslint-disable-next-line import/no-extraneous-dependencies
const { cli, sh } = require('tasksfile')

const build = () => {
  sh('rm -fr ./dist', { nopipe: true })
  sh(
    `cross-env NODE_ENV=production BABEL_ENV=cjs babel --config-file ../../../../babel.config.js --verbose ./src -d ./dist`,
    {
      nopipe: true,
    }
  )
  sh(
    `cross-env NODE_ENV=production BABEL_ENV=esm babel --config-file ../../../../babel.config.js --verbose ./src -d ./dist/esm`,
    {
      nopipe: true,
    }
  )
}

cli({
  build,
})
