const prettierConfig = require('../../../prettier.config')

const isTest = process.env.NODE_ENV === 'test'

module.exports = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    'storybook-addon-themes',
  ],
  staticDirs: ['./assets'],
  stories: [
    // TODO: Figure out why Jest can't load MDX files, and remove this temporary fix
    isTest ? null : '../src/**/*.stories.mdx',
    isTest ? null : '../docs/**/*.stories.mdx',
    '../src/**/*.stories.js',
  ].filter(Boolean),
  webpackFinal: config => {
    config.module.rules.push({
      enforce: 'pre',
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { prettierConfig },
        },
      ],
      test: /\.stories\.jsx?$/,
    })

    return config
  },
}
