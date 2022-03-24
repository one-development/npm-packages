/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')
const dedent = require('dedent')
const pkgUp = require('pkg-up')
const { help } = require('tasksfile')
const build = require('./build')

// eslint-disable-next-line no-console
const log = console.log.bind(console)

const parseManifest = (filePath = `${process.cwd()}/package.json`) =>
  JSON.parse(
    fs.readFileSync(filePath, {
      encoding: 'utf8',
    })
  )

const makeChangeHandler = label => pathname => {
  log(`${label}${pathname}`)
  const packageManifestPath = pkgUp.sync({ cwd: path.dirname(pathname) })
  const packageManifest = parseManifest(packageManifestPath)
  build({ scope: packageManifest.name })
}

const initializeWatcher = () => {
  return chokidar
    .watch('packages/**/src/**', {
      // Allow file to finish writing before firing add and change events
      awaitWriteFinish: true,
      ignored: [
        '**/node_modules',
        '**/__tests__',
        '**/*.test.js',
        '**/*.spec.js',
      ],
      ignoreInitial: true, // Do not fire add events for files that already exist
    })
    .on('add', makeChangeHandler('File added: '))
    .on('change', makeChangeHandler('File changed: '))
    .on('unlink', makeChangeHandler('File deleted: '))
}

const dev = () => {
  try {
    initializeWatcher()
    log('> Dev mode started...')
    log('> Watching for file changes...')
  } catch (error) {
    log('> Encountered an error starting "dev" task. Exiting...')
    throw error
  }
}

help(dev, 'Watch all packages and rebuild when any src file changes', {
  examples: dedent`
    yarn dev
  `,
})

module.exports = dev
