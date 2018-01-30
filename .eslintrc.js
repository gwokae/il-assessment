module.exports = {
  extends: ['airbnb', 'plugin:react/recommended'],
  env: {
    browser: true
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  },
  plugins: [
    'import',
    'react',
    'jsx'
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
};
