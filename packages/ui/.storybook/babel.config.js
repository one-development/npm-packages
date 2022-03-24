module.exports = {
  env: {
    production: {
      plugins: [
        ['babel-plugin-optimize-clsx'],
        [
          'babel-plugin-transform-react-remove-prop-types',
          {
            mode: 'unsafe-wrap',
          },
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: true,
          },
        ],
      ],
    },
  },
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    'lodash',
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
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
      },
    ],
    ['@babel/preset-react'],
  ],
}
