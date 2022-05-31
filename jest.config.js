/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  roots: ['projects/fingerprintjs-pro-angular/src/'],
  setupFilesAfterEnv: ['./test.ts'],
  testRegex: '.+spec.ts$',
};
