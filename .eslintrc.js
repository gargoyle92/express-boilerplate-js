// module.exports = {
//   extends: ['plugin:prettier/recommended']
// };

module.exports = {
  parser: 'babel-eslint',
  extends: ['semistandard', 'standard-jsx'],
  rules: {
    'no-multiple-empty-lines': [1, { max: 2 }],
    'no-trailing-spaces': [2],
    'no-return-assign': [0],
    'comma-dangle': [2, 'always-multiline'],
    'space-before-function-paren': [2, 'never'],
    'no-throw-literal': [0],
  },
  env: {
    browser: true,
    node: true,
  },
};
