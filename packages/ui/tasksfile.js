/* eslint-disable import/no-extraneous-dependencies */
const dedent = require('dedent')
const { cli, help, sh } = require('tasksfile')
const { name } = require('./package.json')

const taskPrefix = `yarn workspace ${name}`

function build() {
  sh('rm -fr ./dist', { nopipe: true })
  sh(
    `cross-env NODE_ENV=production BABEL_ENV=cjs babel --config-file ../../babel.config.js --verbose ./src -d ./dist`,
    {
      nopipe: true,
    }
  )
  sh(
    `cross-env NODE_ENV=production BABEL_ENV=esm babel --config-file ../../babel.config.js --verbose ./src -d ./dist/esm`,
    {
      nopipe: true,
    }
  )
  sh('build-storybook -c .storybook -o .docs', {
    nopipe: true,
  })
}

help(
  build,
  'Compile the src files for this project into a dist folder before publish/deploy',
  {
    examples: dedent`
    ${taskPrefix} build
  `,
  }
)

function deploy() {
  // Deploy Chromatic snapshots
  const chromaticToken = process.env.CHROMATIC_PROJECT_TOKEN
  const chromaticArgs = [
    '-d ./.docs',
    '--exit-once-uploaded',
    "--skip 'dependabot/**'",
    `--project-token ${chromaticToken}`,
  ].join(' ')
  sh(`npx chromatic ${chromaticArgs}`, {
    nopipe: true,
  })
}

help(
  deploy,
  'Run the required deploy steps (i.e. publish docs) for this package',
  {
    examples: dedent`
      ${taskPrefix} deploy
    `,
  }
)

// eslint-disable-next-line no-unused-vars
async function generate(options = {}, type) {
  await sh(`plop ${type}`, { async: true })
}

help(generate, 'Generate a new component', {
  examples: dedent`
    yarn generate component
  `,
  params: ['type'],
})

function storybook() {
  const installCommand = 'yarn install --offline'
  const storybookCommand = 'start-storybook -p 9001 -c .storybook'
  sh(installCommand, { nopipe: true })
  sh(storybookCommand, { nopipe: true })
}

help(
  storybook,
  'Start the storybook website for this package to view your component demos and docs',
  {
    examples: dedent`
    ${taskPrefix} storybook
  `,
  }
)

cli({
  build,
  deploy,
  generate,
  storybook,
})
