/**
 * Angular builder uses an src folder as rootDir for the code
 * So if we will try to import package.json that is situated outside the src folder, we will get an error
 * Similar problem is described here https://stackoverflow.com/questions/51850063/rootdir-is-expected-to-contain-all-source-files
 */

const packageInfo = require('../projects/fingerprintjs-pro-angular/package.json');
const { writeFileSync } = require('fs');

const filePath = './projects/fingerprintjs-pro-angular/src/lib/version.ts';

const versionContent = `export const packageVersion = '${packageInfo.version}';\n`;

writeFileSync(filePath, versionContent);

console.log('Version generated successfully');
