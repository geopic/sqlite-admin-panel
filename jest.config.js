module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  testMatch: ['**/tests/**/*.spec.ts'],
  verbose: true
};
