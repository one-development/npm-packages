/* eslint-disable import/no-extraneous-dependencies, no-console */
const dedent = require('dedent')
const fs = require('fs')
const path = require('path')
const yarnDeduplicate = require('yarn-deduplicate')
const { help } = require('tasksfile')

const deduplicate = (args = {}) => {
  const lockFile = path.resolve(__dirname, '../yarn.lock')
  const resolvedDependencies = fs.readFileSync(lockFile, 'utf8')
  const duplicateDependencies = yarnDeduplicate.listDuplicates(
    resolvedDependencies
  )
  const count = duplicateDependencies.length

  if (count === 0) {
    console.log('No duplicate packages found')
    return
  }

  console.log(
    `${duplicateDependencies.length} duplicated package${
      count > 1 ? 's' : ''
    } found:`
  )
  console.log(`${duplicateDependencies.map(x => `  ${x}`).join('\n')}`)

  if (args.ci) {
    throw new Error([
      `Error: There ${count > 1 ? 'are' : 'is'} currently ${
        duplicateDependencies.length
      } duplicated package${count > 1 ? 's' : ''}.`,
      `To deduplicate run "yarn deduplicate" and commit the changes`,
    ])
  }

  console.log(`Fixing duplicate package${count > 1 ? 's' : ''}...`)

  fs.writeFileSync(
    lockFile,
    yarnDeduplicate.fixDuplicates(resolvedDependencies)
  )
}

help(deduplicate, 'Deduplicate NPM dependencies across packages', {
  examples: dedent`
    yarn deduplicate
  `,
})

module.exports = deduplicate
