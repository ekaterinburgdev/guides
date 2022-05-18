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

    // TODO Вернуть правила
    "no-unused-vars": "off",
    "react/jsx-wrap-multilines": "off",
    "react/jsx-closing-tag-location": "off",
    "block-spacing": "off",
    "brace-style": "off",
    "semi": "off"
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
};
