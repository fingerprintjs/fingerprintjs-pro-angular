/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  roots: ['projects/fingerprintjs-pro-angular/src/'],
  setupFilesAfterEnv: ['./test.ts'],
  testRegex: '.+spec.ts$',
  collectCoverageFrom: ['projects/fingerprintjs-pro-angular/**/**.{ts,tsx}'],
  coverageReporters: ['lcov', 'json-summary', ['text', { file: 'coverage.txt', path: './' }]],
}
