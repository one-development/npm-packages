/* eslint-disable import/no-extraneous-dependencies  */
const { sh } = require('tasksfile')
const path = require('path')
/* eslint-enable */

const packageDir = path.join(__dirname, 'package')
const rootDir = process.cwd()
const packagesDir = path.join(rootDir, 'packages')

const setUpFixture = () => {
  sh('lerna run build --scope=example-package', { nopipe: true })
}

const teardownFixture = () => {
  sh(`rm -fr ${path.join(packageDir, './dist')}`, { nopipe: true })
}

module.exports = {
  packagesDir,
  setUpFixture,
  teardownFixture,
}
