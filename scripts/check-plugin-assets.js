const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredAssets = [
  'manifest.json',
  'styles.css',
  path.join('dist', 'main.js'),
];

function fail(message) {
  console.error(`Asset check failed: ${message}`);
  process.exitCode = 1;
}

for (const relativePath of requiredAssets) {
  const assetPath = path.join(root, relativePath);
  if (!fs.existsSync(assetPath)) {
    fail(`missing ${relativePath}`);
    continue;
  }

  const stat = fs.statSync(assetPath);
  if (!stat.isFile() || stat.size === 0) {
    fail(`${relativePath} is empty or not a file`);
  }
}

const manifestPath = path.join(root, 'manifest.json');
const packagePath = path.join(root, 'package.json');

try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  for (const field of ['id', 'name', 'version']) {
    if (!manifest[field]) {
      fail(`manifest.json is missing "${field}"`);
    }
  }

  if (manifest.version !== packageJson.version) {
    fail(`manifest version ${manifest.version} does not match package version ${packageJson.version}`);
  }
} catch (error) {
  fail(error.message);
}

if (!process.exitCode) {
  console.log('Plugin assets are present.');
}
