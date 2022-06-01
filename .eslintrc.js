module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:@typescript-eslint/eslint-recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    // project: ['./tsconfig.app.json'],
  },
  settings: {},
  plugins: ['@typescript-eslint', 'prettier', '@angular-eslint/eslint-plugin'],
  ignorePatterns: ['build/*'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'prefer-const': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    curly: [2, 'all'],
    'prettier/prettier': 'error',
  },
};
