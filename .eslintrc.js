module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'prettier',
    'prettier/prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    semi: 0, // default rails files
    'max-len': ['error', {ignoreComments: true}], // deault rails files
    'react/jsx-filename-extension': 0, // just a preference
    'prettier/prettier': 'error', // run prettier as an eslint rule
  },
}
