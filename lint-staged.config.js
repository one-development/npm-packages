module.exports = {
  linters: {
    '**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|mdx|graphql|vue)': [
      'prettier --write',
      'git add',
    ],
    '*.js': ['eslint --report-unused-disable-directives'],
  },
}
