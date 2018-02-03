module.exports = {
  extends: ['airbnb', 'plugin:react/recommended'],
  env: {
    browser: true
  },
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/forbid-prop-types': [false],
  },
  plugins: [
    'import',
    'react',
    'jsx'
  ],
  parser: 'babel-eslint',
};
