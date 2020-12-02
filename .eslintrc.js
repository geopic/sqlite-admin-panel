module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-empty-interface': 1,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-for-in-array': 1,
    '@typescript-eslint/prefer-for-of': 1,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/no-var-requires': 1,
    'arrow-parens': 0,
    'comma-dangle': ['error', 'never'],
    'constructor-super': 1,
    curly: 1,
    'dot-notation': 1,
    'implicit-arrow-linebreak': 'off',
    indent: ['warn', 2],
    'linebreak-style': 'off',
    'lines-around-comment': 'off',
    'max-len': ['warn', { code: 80, tabWidth: 2 }],
    'no-cond-assign': 1,
    'no-empty': 1,
    'no-eval': 1,
    'no-invalid-this': 0,
    'no-multiple-empty-lines': 0,
    'no-new-wrappers': 1,
    'no-sequences': 0,
    'no-template-curly-in-string': 1,
    'no-unreachable': 1,
    'no-var': 1,
    'object-shorthand': 0,
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    'space-before-function-paren': 0,
    'use-isnan': 1
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
};
