// eslint-disable-next-line import/no-extraneous-dependencies
const { cli } = require('tasksfile')
const build = require('./tasks/build')
const deduplicate = require('./tasks/deduplicate')
const deploy = require('./tasks/deploy')
const dev = require('./tasks/dev')
const format = require('./tasks/format')
const lint = require('./tasks/lint')
const release = require('./tasks/release')
const test = require('./tasks/test')

cli({
  build,
  deduplicate,
  deploy,
  dev,
  format,
  lint,
  release,
  test,
})
