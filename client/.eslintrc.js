module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@next/next/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'eslint/consistent-return': 'off',
    'max-len': ['warn', { code: 120 }],
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
};
