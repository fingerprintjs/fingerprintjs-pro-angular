const packageInfo = require('../projects/ng-fingerprintjs-pro/package.json');
const { writeFileSync } = require('fs');

const filePath = './projects/ng-fingerprintjs-pro/src/lib/version.ts';

const versionContent = `export const packageVersion = '${packageInfo.version}';`

writeFileSync(filePath, versionContent);

console.log('Version generated successfully');
