/**
 * Firebase tests only. Angular-cli uses Karma.
 */

module.exports = {
  transform: {
    '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  testRegex: 'firebase/.*\\.(spec|test)\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};
