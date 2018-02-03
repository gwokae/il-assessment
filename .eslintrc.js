module.exports = {
  extends: ['airbnb', 'plugin:react/recommended'],
  env: {
    browser: true
  },
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/forbid-prop-types': [0],
    'react/require-default-props': [0],
  },
  plugins: [
    'import',
    'react',
    'jsx'
  ],
  parser: 'babel-eslint',
};
