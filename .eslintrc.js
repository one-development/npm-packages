module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['fp', 'jsx-a11y', 'react', 'react-hooks'],
  root: true,
  rules: {
    'arrow-parens': [0, 'always'],
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: ['render'],
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    'fp/no-arguments': 'error',
    'fp/no-delete': 'error',
    'fp/no-get-set': 'error',
    'fp/no-let': 'error',
    'fp/no-loops': 'error',
    'fp/no-mutating-assign': 'error',
    'import/no-anonymous-default-export': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/.storybook/*', '**/*.stories.js', '**/*.test.js'],
      },
    ],
    'import/no-namespace': 'error',
    'import/no-unassigned-import': 'error',
    'linebreak-style': 0,
    'max-lines': [
      'error',
      { max: 350, skipBlankLines: true, skipComments: true },
    ],
    'new-cap': 0,
    'no-alert': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-nested-ternary': 0,
    'no-use-before-define': ['error', { classes: true, functions: false }],
    'object-curly-newline': [
      'error',
      {
        ExportDeclaration: {
          consistent: true,
          minProperties: 6,
          multiline: true,
        },
        ImportDeclaration: {
          consistent: true,
          minProperties: 6,
          multiline: true,
        },
        ObjectExpression: {
          consistent: true,
          minProperties: 6,
          multiline: true,
        },
        ObjectPattern: { consistent: true, minProperties: 6, multiline: true },
      },
    ],
    'react/no-unused-prop-types': 1,
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    semi: ['error', 'never'],
    'sort-keys': 1,
    strict: ['error', 'safe'],
  },
}
