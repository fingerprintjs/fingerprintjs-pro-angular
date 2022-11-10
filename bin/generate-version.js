/**
 * Angular builder uses an src folder as rootDir for the code
 * So if we will try to import package.json that is situated outside the src folder, we will get an error
 * Similar problem is described here https://stackoverflow.com/questions/51850063/rootdir-is-expected-to-contain-all-source-files
 */
const { writeFileSync, readFileSync } = require('fs');

const packageFilePath = './projects/fingerprintjs-pro-angular/package.json';
const versionFilePath =
  './projects/fingerprintjs-pro-angular/src/lib/version.ts';
const newVersion = process.argv[2];

if (!newVersion) {
  console.error('You should provide new version number');
  process.exit(1);
}

const packageInfo = JSON.parse(readFileSync(packageFilePath).toString());
packageInfo.version = newVersion;
writeFileSync(packageFilePath, JSON.stringify(packageInfo, null, '  '));

const versionContent = `export const packageVersion = '${packageInfo.version}';\n`;

writeFileSync(versionFilePath, versionContent);

console.log('Version generated successfully');
