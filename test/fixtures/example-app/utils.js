/* eslint-disable import/no-extraneous-dependencies  */
const nodeResolve = require('@rollup/plugin-node-resolve')
const { vol } = require('memfs')
const webpack = require('webpack')
const rollup = require('rollup')
const path = require('path')
const { sh } = require('tasksfile')
const joinPath = require('memory-fs/lib/join')
const packageUtils = require('../example-package/utils')
/* eslint-enable */

const appDir = path.join(__dirname, 'app')
const appEntry = path.join(appDir, 'index.js')

const compileWithRollup = () =>
  rollup
    .rollup({
      input: appEntry,
      plugins: [nodeResolve()],
    })
    .then(bundle => bundle.generate({ format: 'es' }))
    .then(({ output }) => output[0].code)

const compileWithWebpack = ({ optimization }) =>
  new Promise((resolve, reject) => {
    const compiler = buildWebpackCompiler(vol, {
      entry: appEntry,
      mode: 'none',
      optimization,
      output: {
        filename: 'bundle.js',
        path: '/',
      },
    })

    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }

      const info = stats.toJson()

      if (stats.hasErrors()) {
        return reject(
          new Error(
            `Webpack build errors: ${JSON.stringify(info.errors, null, 2)}`
          )
        )
      }

      if (stats.hasWarnings()) {
        return reject(
          new Error(
            `Webpack build warnings: ${JSON.stringify(info.warnings, null, 2)}`
          )
        )
      }

      const contents = vol.readFileSync('/bundle.js', 'utf8')

      return resolve(contents)
    })
  })

const setUpFixture = () => {
  sh('yarn install --offline', { nopipe: true })
  packageUtils.setUpFixture()
}

const teardownFixture = () => {
  packageUtils.teardownFixture()
}

// Need to monkeypatch fs for Webpack, or else it will throw an error that join doesn't exist.
function getWebpackFs(fs) {
  if (fs.join) {
    return fs
  }

  const nextFs = Object.create(fs)
  nextFs.join = joinPath

  return nextFs
}

function buildWebpackCompiler(fs, webpackConfig) {
  const webpackFs = getWebpackFs(fs)

  const compiler = webpack(webpackConfig)

  compiler.outputFileSystem = webpackFs
  compiler.resolvers.context.fileSystem = webpackFs

  return compiler
}

module.exports = {
  compileWithRollup,
  compileWithWebpack,
  setUpFixture,
  teardownFixture,
}
