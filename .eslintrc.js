module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  extends: 'airbnb',
  // required to lint *.vue files
  plugins: ['sort-requires'],
  // add your custom rules here
  rules: {
    'max-len': ['error', { code: 140 }],
    'linebreak-style': 0,
    'sort-requires/sort-requires': 2,
    'prefer-promise-reject-errors': 0,
    'no-debugger': 0,
    'arrow-parens': 0,
  },
  globals: {
    describe: 0,
    it: 0,
  },
};
