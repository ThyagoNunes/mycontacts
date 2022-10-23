module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    camelcase: 0,
    'no-console': 0,
    'prefer-const': 0,
    'import/extensions': 0,
    'consistent-return': 0,
    'class-methods-use-this': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
