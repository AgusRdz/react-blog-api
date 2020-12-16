module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {}
}
