const { BABEL_ENV } = process.env

const ignore = [
  '__tests__',
  '**/*.test.js',
  '**/*.spec.js',
  '__snapshots__',
  '**/*.stories.js',
]

const isEsm = ['es', 'esm'].includes(BABEL_ENV)
const presets = [
  [
    '@babel/preset-env',
    {
      modules: isEsm ? false : 'cjs',
    },
  ],
  ['@babel/preset-react'],
]

const productionPlugins = [
  'babel-plugin-optimize-clsx',
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap',
    },
  ],
]

const transformRuntimePlugin = [
  '@babel/plugin-transform-runtime',
  {
    corejs: 3,
    helpers: true,
    regenerator: true,
    useESModules: true,
  },
]

module.exports = api => {
  /* Permacache the computed config to prevent Babel from re-executing any plugin/preset functions every time a file is compiled.
   * https://babeljs.io/docs/en/config-files#apicache
   */
  api.cache.forever()

  return {
    /* Babel-jest doesn't recognize the packages' babelrc files since babel-jest will by default only see the root config.
     * Need to be explicit with babelrcRoots for babel-jest to recognize the packages' babelrc files.
     * https://babeljs.io/docs/en/options#babelrcroots
     */
    babelrcRoots: [
      // Keep the root as a root
      '.',

      // Also consider monorepo packages "root" and load their .babelrc files.
      'packages/*',
    ],
    env: {
      cjs: {
        ignore,
        plugins: productionPlugins,
      },
      development: {
        ignore,
        plugins: [transformRuntimePlugin],
      },
      es: {
        ignore,
        plugins: [...productionPlugins, transformRuntimePlugin],
      },
      esm: {
        ignore,
        plugins: [...productionPlugins, transformRuntimePlugin],
      },
      production: {
        ignore,
        plugins: [...productionPlugins, transformRuntimePlugin],
      },
      test: {
        plugins: [
          'babel-plugin-require-context-hook',
          '@babel/plugin-transform-runtime',
        ],
        sourceMaps: 'both',
      },
    },
    plugins: [
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
      [
        'babel-plugin-styled-components',
        {
          displayName: true,
          fileName: true,
          minify: true,
          pure: true,
          ssr: true,
          transpileTemplateLiterals: true,
        },
      ],
      'lodash',
    ],
    presets,
  }
}
