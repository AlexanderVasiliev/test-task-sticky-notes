module.exports = {
  extends: ['@n3/eslint-config/typescript'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
