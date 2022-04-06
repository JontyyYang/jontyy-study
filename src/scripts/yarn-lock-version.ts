import fs = require('fs');

const parse = require('parse-yarn-lock').default;
const lockfile = fs.readFileSync('yarn.lock').toString();
const parsed = parse(lockfile);

const {dependencies = {}, devDependencies = {}} = JSON.parse(
  fs.readFileSync('package.json').toString()
);
const allDependence = Object.keys(parsed.object);

const dependenciesVersion: string[] = [];
const devDependenciesVersion: string[] = [];

for (const key of Object.keys(dependencies)) {
  allDependence.forEach(item => {
    if (item.startsWith(`${key}@`)) {
      dependenciesVersion.push(item);
    }
  });
}
for (const key of Object.keys(devDependencies)) {
  allDependence.forEach(item => {
    if (item.startsWith(`${key}@`)) {
      devDependenciesVersion.push(item);
    }
  });
}

const fileContent = `const dependenciesVersion= ${JSON.stringify(
  dependenciesVersion
)};const devDependenciesVersion= ${JSON.stringify(devDependenciesVersion)};`;

// 查看yarn.lock中具体依赖的版本
fs.writeFileSync('./scripts/version.ts', fileContent);
export {};
