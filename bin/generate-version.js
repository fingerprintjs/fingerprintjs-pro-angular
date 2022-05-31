const packageInfo = require('../projects/fingerprintjs-pro-angular/package.json');
const { writeFileSync } = require('fs');

const filePath = './projects/fingerprintjs-pro-angular/src/lib/version.ts';

const versionContent = `export const packageVersion = '${packageInfo.version}';`;

writeFileSync(filePath, versionContent);

console.log('Version generated successfully');
